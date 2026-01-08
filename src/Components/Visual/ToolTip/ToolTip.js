export default class ToolTip extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);
      
      this.$trigger = this.querySelector('.tooltip-trigger');
      this.bubble = null;
      this._text = '';

      slice.controller.setComponentProps(this, props);
      
      // Bind methods
      this.show = this.show.bind(this);
      this.hide = this.hide.bind(this);
   }

   set text(value) {
      this._text = value;
   }

   get text() {
      return this._text;
   }

   async init() {
      this.addEventListener('mouseenter', this.show);
      this.addEventListener('mouseleave', this.hide);
      this.addEventListener('focusin', this.show);
      this.addEventListener('focusout', this.hide);
   }

   disconnectedCallback() {
      this.removeBubble();
   }

   createBubble() {
      if (this.bubble) return;

      this.bubble = document.createElement('div');
      this.bubble.classList.add('slice-tooltip-bubble');
      this.bubble.textContent = this._text;
      document.body.appendChild(this.bubble);
   }

   removeBubble() {
      if (this.bubble && this.bubble.parentNode) {
         this.bubble.parentNode.removeChild(this.bubble);
      }
      this.bubble = null;
   }

   show() {
      if (!this._text) return;
      
      this.createBubble();
      this.updatePosition();
      
      // Small delay to allow transition
      requestAnimationFrame(() => {
         if (this.bubble) this.bubble.classList.add('visible');
      });
   }

   hide() {
      if (this.bubble) {
         this.bubble.classList.remove('visible');
         // Wait for transition to finish before removing
         setTimeout(() => {
             this.removeBubble();
         }, 200);
      }
   }

   updatePosition() {
      if (!this.bubble) return;

      const triggerRect = this.getBoundingClientRect();
      const bubbleRect = this.bubble.getBoundingClientRect();
      
      // Default top position
      let top = triggerRect.top - bubbleRect.height - 10;
      let left = triggerRect.left + (triggerRect.width / 2) - (bubbleRect.width / 2);

      // Boundary checks
      if (top < 0) {
         // Flip to bottom if no space on top
         top = triggerRect.bottom + 10;
      }
      
      if (left < 0) left = 10;
      if (left + bubbleRect.width > window.innerWidth) {
         left = window.innerWidth - bubbleRect.width - 10;
      }

      this.bubble.style.top = `${top}px`;
      this.bubble.style.left = `${left}px`;
   }
}

customElements.define("slice-tooltip", ToolTip);
