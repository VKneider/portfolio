export default class Timeline extends HTMLElement {

  static props = {
    // Expected items format: [{ id, date, label, ... }]
    "items": { 
         type: 'array', 
         default: [], 
         required: true 
      },
    "orientation": {
        type: 'string', // 'horizontal' or 'vertical'
        default: 'horizontal',
        required: false
    },
    // Add title props
    "title": { type: 'string', default: '', required: false },
    "description": { type: 'string', default: '', required: false },
    "onSelect": {
        type: 'function',
        required: false
    }
  }

  constructor(props) {
    super();
    slice.attachTemplate(this);
    this.$container = this.querySelector('.slice-timeline-wrapper');
    this.$list = this.querySelector('.timeline-list');
    this.$svg = this.querySelector('.timeline-svg');
    this.$style = null; 
    
    // Default state
    this._items = [];
    this.activeIndex = 0;
    this.offsets = [];
    this.orientation = 'horizontal';

    // Drag State
    this.isDragging = false;
    this.draggedIndex = -1;
    this.dragStartY = 0;
    this.dragStartX = 0;
    this.initialOffsetX = 0;
    this.initialOffsetY = 0;

    // Bind methods
    this.drawLines = this.drawLines.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragMove = this.handleDragMove.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    
    // Configurable ResizeObserver
    this.resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(this.drawLines);
    });

    slice.controller.setComponentProps(this, props);
  }

  set items(value) {
      if (!Array.isArray(value)) return;
      this._items = value;
      // Pre-calculate random offsets
      this.generateOffsets();
      this.render();
  }

  generateOffsets() {
      // Initialize with X and Y offsets
      // Use reasonable random range for initial scattering if desired
      this.offsets = this._items.map(() => {
          return {
              x: Math.floor(Math.random() * 40) - 20,
              // Favor downward dispersion to avoid hitting the title above
              // Range: -20px (slight up) to +100px (deep down)
              y: Math.floor(Math.random() * 120) - 20
          };
      });
  }

  get items() {
      return this._items || [];
  }

  init() {
    this.render();
    if(this.$container) {
        this.resizeObserver.observe(this.$container);
    }
    
    // Add global move/up listeners for drag
    window.addEventListener('mousemove', this.handleDragMove);
    window.addEventListener('mouseup', this.handleDragEnd);
    // Touch support could be added similarly
  }

  disconnectedCallback() {
      if(this.resizeObserver) {
          this.resizeObserver.disconnect();
      }
      window.removeEventListener('resize', this.drawLines);
      window.removeEventListener('mousemove', this.handleDragMove);
      window.removeEventListener('mouseup', this.handleDragEnd);
  }

  render() {
    this.$container.innerHTML = ''; // Clear container to rebuild structure
    
    // Add Header if props exist
    if (this.title || this.description) {
        const header = document.createElement('div');
        header.className = 'timeline-header';
        header.style.textAlign = 'center';
        header.style.marginBottom = '3rem'; // Enough clearance for -20px offset + padding
        header.style.zIndex = '5';
        header.style.position = 'relative'; 
        
        if(this.title) {
            const h3 = document.createElement('h3');
            h3.textContent = this.title;
            h3.style.color = 'var(--primary-color)';
            h3.style.marginBottom = '0.5rem';
            header.appendChild(h3);
        }
        if(this.description) {
            const p = document.createElement('p');
            p.textContent = this.description;
            p.style.opacity = '0.8';
            p.style.fontSize = '0.9rem';
            p.style.maxWidth = '600px';
            p.style.margin = '0 auto';
            header.appendChild(p);
        }
        this.$container.appendChild(header);
    }

    // Re-add SVG and List to container
    this.$container.appendChild(this.$svg);
    this.$container.appendChild(this.$list);

    if (!this.items || this.items.length === 0) return;
    
    // Apply orientation class
    this.$container.classList.remove('horizontal', 'vertical');
    this.$container.classList.add(this.orientation);

    this.$list.innerHTML = '';
    
    this.items.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add('timeline-item');
        if (index === this.activeIndex) li.classList.add('active');
        
        // Random offset
        const offset = this.offsets[index] || { x: 0, y: 0 };
        
        // Apply 2D transform
        li.style.transform = `translate(${offset.x}px, ${offset.y}px)`;

        // Interaction
        li.addEventListener('click', (e) => {
             // Avoid selecting if we were dragging
             if (this.wasDragging) {
                 this.wasDragging = false;
                 return;
             }
             this.selectItem(index);
        });
        
        // Drag Start
        li.addEventListener('mousedown', (e) => this.handleDragStart(e, index));

        // Structure
        const dateSpan = document.createElement('span');
        dateSpan.className = 'timeline-date';
        dateSpan.textContent = item.date;

        const dot = document.createElement('div');
        dot.className = 'timeline-dot';

        const labelSpan = document.createElement('span');
        labelSpan.className = 'timeline-label';
        labelSpan.textContent = item.label;

        li.appendChild(dateSpan);
        li.appendChild(dot);
        li.appendChild(labelSpan);
        
        this.$list.appendChild(li);
    });
    
    requestAnimationFrame(() => this.drawLines());
  }
  
  handleDragStart(e, index) {
      // Prevent drag if using right click or something
      if (e.button !== 0) return;
      
      this.isDragging = true;
      this.draggedIndex = index;
      this.dragStartY = e.clientY;
      this.dragStartX = e.clientX;
      
      const currentOffset = this.offsets[index] || { x: 0, y: 0 };
      this.initialOffsetX = currentOffset.x;
      this.initialOffsetY = currentOffset.y;
      
      // Calculate constraints
      const li = this.$list.children[index];
      const containerRect = this.$container.getBoundingClientRect();
      const liRect = li.getBoundingClientRect();
      
      // Calculate Max Deltas based on current visual position vs container bounds
      // Left Edge: liRect.left + delta >= containerRect.left
      const minDeltaX = containerRect.left - liRect.left + 10; // +10 padding
      const maxDeltaX = containerRect.right - liRect.right - 10;
      
      const minDeltaY = containerRect.top - liRect.top + 10;
      const maxDeltaY = containerRect.bottom - liRect.bottom - 10;
      
      this.dragConstraints = { minX: minDeltaX, maxX: maxDeltaX, minY: minDeltaY, maxY: maxDeltaY };
      
      this.wasDragging = false;
      
      li.style.transition = 'none'; // Disable transition for instant follow
      li.classList.add('dragging');
  }
  
  handleDragMove(e) {
      if (!this.isDragging || this.draggedIndex === -1) return;
      
      e.preventDefault(); // Stop text selection
      this.wasDragging = true; // Mark as drag action
      
      const rawDeltaX = e.clientX - this.dragStartX;
      const rawDeltaY = e.clientY - this.dragStartY;
      
      // Apply Constraints
      const deltaX = Math.max(this.dragConstraints.minX, Math.min(rawDeltaX, this.dragConstraints.maxX));
      const deltaY = Math.max(this.dragConstraints.minY, Math.min(rawDeltaY, this.dragConstraints.maxY));
      
      const newX = this.initialOffsetX + deltaX;
      const newY = this.initialOffsetY + deltaY;
      
      // Update State
      this.offsets[this.draggedIndex] = { x: newX, y: newY };
      
      // Update DOM
      const li = this.$list.children[this.draggedIndex];
      li.style.transform = `translate(${newX}px, ${newY}px)`;
      
      // Redraw lines instantly
      this.drawLines();
  }
  
  handleDragEnd(e) {
      if (!this.isDragging) return;
      
      this.isDragging = false;
      const li = this.$list.children[this.draggedIndex];
      if(li) {
          li.style.transition = ''; // Re-enable transition
          li.classList.remove('dragging');
      }
      this.draggedIndex = -1;
      
      // Maybe snap back if desired? Current request implies "react to movement", 
      // likely they want the position to stay.
  }
  
  selectItem(index) {
       // If clicking the same item, we still might want to ensure tabs are synced
       // But usually we don't need to do anything.
       // However, if the user clicked a tab then clicked the node, activeIndex matches.
       // If we clicked a node, activeIndex changes.
       
       const previousIndex = this.activeIndex;
       this.activeIndex = index;
       
       const items = this.$list.querySelectorAll('.timeline-item');
       items.forEach((item, i) => {
           if (i === index) item.classList.add('active');
           else item.classList.remove('active');
       });
       
       // Call prop callback if exists
       if (this.onSelect && typeof this.onSelect === 'function') {
           this.onSelect(this.items[index], index);
       }
       
       // Always dispatch event on user interaction
       console.log('Dispatching timeline-select', index);
       this.dispatchEvent(new CustomEvent('timeline-select', { 
           detail: { item: this.items[index], index },
           bubbles: true,
           composed: true
       }));
  }
  
  setActive(index) {
      // Determine if we need to redraw/reselect
      // Just update UI class
       this.activeIndex = index;
       const items = this.$list.querySelectorAll('.timeline-item');
       items.forEach((item, i) => {
           if (i === index) item.classList.add('active');
           else item.classList.remove('active');
       });
  }

  drawLines() {
      // Guard clauses
      if (!this.$container || !this.$svg) return;
      
      const dots = this.$list.querySelectorAll('.timeline-dot');
      if (dots.length < 2) {
          this.$svg.innerHTML = '';
          return;
      }
      
      const containerRect = this.$container.getBoundingClientRect();
      
      // If container is hidden (e.g. tabs), rect might be zero. Check width/height.
      if (containerRect.width === 0 || containerRect.height === 0) return;

      const points = [];

      dots.forEach(dot => {
          const rect = dot.getBoundingClientRect();
          // Calculate center relative to SVG container
          const x = rect.left + rect.width / 2 - containerRect.left;
          const y = rect.top + rect.height / 2 - containerRect.top;
          points.push({ x, y });
      });

      // Generate Path
      if (points.length === 0) return;

      let d = `M ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
          d += ` L ${points[i].x} ${points[i].y}`;
      }

      this.$svg.innerHTML = `
        <path d="${d}" 
              stroke="var(--primary-color)" 
              stroke-width="2" 
              fill="none" 
              stroke-linecap="round"
              stroke-linejoin="round" />
      `;
  }
}

customElements.define("slice-timeline", Timeline);
