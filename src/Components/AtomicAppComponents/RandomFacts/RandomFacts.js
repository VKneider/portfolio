import factsData from './data.js';

export default class RandomFacts extends HTMLElement {
    static props = {
        maxNotes: { type: 'number', default: 6 },
        refreshInterval: { type: 'number', default: 4000 }
    };

    constructor(props) {
        super();
        slice.attachTemplate(this);
        this.notes = []; 
        this.slots = []; 
        this.zIndexCounter = 10;
        this.cycleIntervalId = null;
        this.userNotes = [];
        slice.controller.setComponentProps(this, props);
    }

    async init() {
        this.$board = this.querySelector('#corkboard');
        this.$addBtn = this.querySelector('#add-note-btn');
        this.$trashCan = this.querySelector('#trash-can');
        requestAnimationFrame(() => {
            this.loadUserNotes();
            this.initializeSlots();
            this.initialRender();
            this.addDragFunctionality();
            this.startCycle();
            this.setupControls();
        });
    }

    disconnectedCallback() {
        if (this.cycleIntervalId) clearInterval(this.cycleIntervalId);
    }

    initializeSlots() {
        const board = this.$board;
        const boardWidth = board.offsetWidth || 800;
        const boardHeight = board.offsetHeight || 600;
        const cols = 3;
        const rows = Math.ceil(this.maxNotes / cols);
        const sectionWidth = boardWidth / cols;
        const sectionHeight = boardHeight / rows;

        this.slots = [];
        for (let i = 0; i < this.maxNotes; i++) {
            const colIndex = i % cols;
            const rowIndex = Math.floor(i / cols);
            this.slots.push({
                index: i,
                xBase: colIndex * sectionWidth,
                yBase: rowIndex * sectionHeight,
                width: sectionWidth,
                height: sectionHeight,
                note: null
            });
        }
    }

    getRandomFact(excludeFacts = []) {
        const displayedTexts = this.slots
            .map(s => s.note ? s.note.querySelector('span')?.textContent : '')
            .filter(t => t);
        const availableFacts = factsData.filter(f => !displayedTexts.includes(f.text));
        if (availableFacts.length === 0) return factsData[Math.floor(Math.random() * factsData.length)];
        return availableFacts[Math.floor(Math.random() * availableFacts.length)];
    }

    createNoteElement(fact, isUser = false) {
        const note = document.createElement('div');
        note.classList.add('sticky-note');
        
        // Define textContainer first so we can reference it in event listeners
        const textContainer = document.createElement(isUser ? 'div' : 'span');

        if (isUser) {
            note.classList.add('user-note');
            note.dataset.id = fact.id;

            // Edit Button (Pencil)
            const editBtn = document.createElement('div');
            editBtn.className = 'edit-note-btn';
            editBtn.title = 'Edit Note';
            editBtn.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`;
            editBtn.addEventListener('click', (e) => {
                e.preventDefault(); 
                e.stopPropagation();
                textContainer.focus();
            });
            note.appendChild(editBtn); // Append button to note

        } else {
            note.classList.add(`type-${fact.type}`);
            const pin = document.createElement('div');
            pin.className = 'pin-indicator';
            pin.title = 'Click to pin this fact';
            note.appendChild(pin);
        }

        if (isUser) {
            textContainer.className = 'editable-content';
            textContainer.contentEditable = true;
            textContainer.innerText = fact.text;
            textContainer.addEventListener('input', () => {
                const noteId = note.dataset.id;
                const userNote = this.userNotes.find(n => n.id === noteId);
                if (userNote) {
                    userNote.text = textContainer.innerText;
                    this.saveUserNotes();
                }
            });
        } else {
            textContainer.textContent = fact.text;
        }
        note.appendChild(textContainer);

        note.dataset.rotation = fact.rotation || (Math.random() * 10 - 5);
        note.style.transform = `scale(0) rotate(0deg)`;
        note.style.opacity = '0';
        return note;
    }

    positionNoteInSlot(note, slot) {
        const noteWidth = 200;
        const noteHeight = 200;
        const maxOffsetX = slot.width - noteWidth - 20;
        const maxOffsetY = slot.height - noteHeight - 20;
        const rangeX = Math.max(0, maxOffsetX);
        const rangeY = Math.max(0, maxOffsetY);
        const offsetX = Math.random() * rangeX + 10;
        const offsetY = Math.random() * rangeY + 10;
        const left = slot.xBase + offsetX;
        const top = slot.yBase + offsetY;
        note.style.left = `${left}px`;
        note.style.top = `${top}px`;
    }

    animateEntrance(note, rotation) {
        note.animate([
            { transform: 'scale(0) rotate(0deg)', opacity: 0 },
            { transform: `scale(1) rotate(${rotation}deg)`, opacity: 1 }
        ], { duration: 500, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' });
    }

    async animateExit(note) {
        const animation = note.animate([
            { transform: note.style.transform || 'scale(1)', opacity: 1 },
            { transform: 'scale(0) rotate(0deg)', opacity: 0 }
        ], { duration: 400, easing: 'ease-in', fill: 'forwards' });
        await animation.finished;
        note.remove();
    }

    initialRender() {
        if (!this.$board) return;
        this.$board.querySelectorAll('.sticky-note').forEach(n => n.remove());
        
        this.slots.forEach((slot, index) => {
            const fact = this.getRandomFact();
            const note = this.createNoteElement(fact);
            this.positionNoteInSlot(note, slot);
            this.$board.appendChild(note);
            slot.note = note;
            setTimeout(() => { this.animateEntrance(note, fact.rotation); }, index * 100);
        });

        this.userNotes.forEach((uNote, index) => {
            const note = this.createNoteElement(uNote, true);
            note.style.left = uNote.x + 'px';
            note.style.top = uNote.y + 'px';
            this.$board.appendChild(note);
            setTimeout(() => { this.animateEntrance(note, uNote.rotation); }, (this.slots.length + index) * 100);
        });
    }

    startCycle() {
        this.cycleIntervalId = setInterval(async () => {
            await this.cycleRandomNote();
        }, this.refreshInterval);
    }

    async cycleRandomNote() {
        if (this.slots.length === 0) return;
        const slotIndex = Math.floor(Math.random() * this.slots.length);
        const slot = this.slots[slotIndex];
        
        if (slot.note) {
            if (slot.note.classList.contains('dragging')) return;
            if (slot.note.dataset.pinned === 'true') return;
            const oldNote = slot.note;
            this.animateExit(oldNote);
            slot.note = null; 
        }

        const fact = this.getRandomFact();
        const note = this.createNoteElement(fact);
        this.zIndexCounter++;
        note.style.zIndex = this.zIndexCounter;
        this.positionNoteInSlot(note, slot);
        this.$board.appendChild(note);
        slot.note = note;
        this.animateEntrance(note, fact.rotation);
    }

    setupControls() {
        if (this.$addBtn) {
            this.$addBtn.addEventListener('click', () => { this.createNewUserNote(); });
        }
    }

    loadUserNotes() {
        try {
            const data = sessionStorage.getItem('slice_user_notes');
            this.userNotes = data ? JSON.parse(data) : [];
        } catch (e) { this.userNotes = []; }
    }
  
    saveUserNotes() {
        sessionStorage.setItem('slice_user_notes', JSON.stringify(this.userNotes));
    }

    createNewUserNote() {
        const id = Date.now().toString();
        const rotation = Math.random() * 6 - 3;
        const boardWidth = this.$board.offsetWidth;
        const boardHeight = this.$board.offsetHeight;
        const x = boardWidth / 2 - 100 + (Math.random() * 40 - 20);
        const y = boardHeight / 2 - 100 + (Math.random() * 40 - 20);

        const newNoteData = { id, text: 'Type here...', type: 'user', x, y, rotation };
        this.userNotes.push(newNoteData);
        this.saveUserNotes();

        const note = this.createNoteElement(newNoteData, true);
        note.style.left = `${x}px`;
        note.style.top = `${y}px`;
        this.zIndexCounter++;
        note.style.zIndex = this.zIndexCounter;
        this.$board.appendChild(note);
        this.animateEntrance(note, rotation);
    }

    addDragFunctionality() {
        const board = this.$board;
        if (!board) return;
        
        board.addEventListener('click', (e) => {
            if (e.target.classList.contains('pin-indicator')) {
                e.stopPropagation();
                const note = e.target.closest('.sticky-note');
                if (note) {
                    const isPinned = note.dataset.pinned === 'true';
                    note.dataset.pinned = !isPinned;
                    e.target.classList.toggle('pinned', !isPinned);
                }
            }
        });

        let activeNote = null;
        let initialX, initialY;
        
        const startDrag = (e, clientX, clientY) => {
            if (e.target.classList.contains('pin-indicator')) return;
            if (e.target.closest('.edit-note-btn')) return; // Allow edit button click w/o drag

            const note = e.target.closest('.sticky-note');
            
            // Allow text selection interaction
            if (e.target.classList.contains('editable-content')) {
                return;
            }

            if (note) {
               activeNote = note;
               this.zIndexCounter++;
               activeNote.style.zIndex = this.zIndexCounter;
               initialX = clientX - note.offsetLeft;
               initialY = clientY - note.offsetTop;
               activeNote.classList.add('dragging');
            }
        };

        board.addEventListener('mousedown', (e) => startDrag(e, e.clientX, e.clientY));
        board.addEventListener('touchstart', (e) => {
             const touch = e.touches[0];
             startDrag(e, touch.clientX, touch.clientY);
        }, { passive: false });

        const endDrag = () => {
             if (activeNote) {
                if (this.$trashCan) {
                    const trashRect = this.$trashCan.getBoundingClientRect();
                    // Check if mouse point is inside trash rect (more stable than element overlap during transform)
                    // We use last known client coords if passed, or we rely on the visual state set in moveDrag for feedback
                    // Actually, simpler: check if the 'trash-hover' class is present on the note? 
                    // No, safe is to re-check coords or rely on state.
                    // Let's check mouse pos if we can, but endDrag doesn't get coords easily.
                    // BUT, moveDrag sets the state. If activeNote has 'trash-hover', it's in the trash.
                    
                    if (activeNote.classList.contains('trash-hover')) {
                        this.deleteNote(activeNote);
                        activeNote = null;
                        this.$trashCan.classList.remove('drag-over');
                        return;
                    }
                }

                activeNote.classList.remove('dragging');
                activeNote.classList.remove('trash-hover'); // Ensure trash-hover is removed
                if (activeNote && activeNote.classList.contains('user-note')) {
                     const id = activeNote.dataset.id;
                     const uNote = this.userNotes.find(n => n.id === id);
                     if (uNote) {
                         uNote.x = parseFloat(activeNote.style.left);
                         uNote.y = parseFloat(activeNote.style.top);
                         this.saveUserNotes();
                     }
                }
                activeNote = null;
            }
            if (this.$trashCan) this.$trashCan.classList.remove('drag-over');
        };

        board.addEventListener('mouseup', endDrag);
        board.addEventListener('touchend', endDrag);

        const moveDrag = (e, clientX, clientY) => {
            if (activeNote) {
                e.preventDefault();
                const currentX = clientX - initialX;
                const currentY = clientY - initialY;
                const boardWidth = board.offsetWidth;
                const boardHeight = board.offsetHeight;
                const noteWidth = activeNote.offsetWidth;
                const noteHeight = activeNote.offsetHeight;
                let newLeft = Math.max(0, Math.min(currentX, boardWidth - noteWidth));
                let newTop = Math.max(0, Math.min(currentY, boardHeight - noteHeight));

                activeNote.style.left = `${newLeft}px`;
                activeNote.style.top = `${newTop}px`;

                if (this.$trashCan) {
                     const trashRect = this.$trashCan.getBoundingClientRect();
                     const mouseX = clientX;
                     const mouseY = clientY;
                     
                     const isOver = (mouseX >= trashRect.left && mouseX <= trashRect.right &&
                                   mouseY >= trashRect.top && mouseY <= trashRect.bottom);

                     if (isOver) {
                        this.$trashCan.classList.add('drag-over');
                        activeNote.classList.add('trash-hover');
                     } else {
                        this.$trashCan.classList.remove('drag-over');
                        activeNote.classList.remove('trash-hover');
                     }
                }
            }
        };

        board.addEventListener('mousemove', (e) => moveDrag(e, e.clientX, e.clientY));
        board.addEventListener('touchmove', (e) => {
            const touch = e.touches[0];
            moveDrag(e, touch.clientX, touch.clientY);
        }, { passive: false });
    }

    async deleteNote(note) {
        const db = note.animate([
            { transform: note.style.transform, opacity: 1 },
            { transform: 'scale(0.1) rotate(720deg)', opacity: 0 }
        ], { duration: 300, easing: 'ease-in', fill: 'forwards' });
        await db.finished;
        
        if (note.classList.contains('user-note')) {
            const id = note.dataset.id;
            this.userNotes = this.userNotes.filter(n => n.id !== id);
            this.saveUserNotes();
        } else {
            const slot = this.slots.find(s => s.note === note);
            if (slot) {
                slot.note = null;
                this.spawnFactInSlot(slot);
            }
        }
        note.remove();
    }

    spawnFactInSlot(slot) {
        const fact = this.getRandomFact();
        const note = this.createNoteElement(fact);
        this.positionNoteInSlot(note, slot);
        this.$board.appendChild(note);
        slot.note = note;
        this.animateEntrance(note, fact.rotation);
    }
}


customElements.define('random-facts', RandomFacts);