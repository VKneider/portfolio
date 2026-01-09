export default class Icon extends HTMLElement {

   static props = {
      name: { 
         type: 'string', 
         default: 'youtube', 
         required: false 
      },
      size: { 
         type: 'string', 
         default: 'small' 
      },
      color: { 
         type: 'string', 
         default: 'black' 
      },
      iconStyle: { 
         type: 'string', 
         default: 'filled' 
      }
   };

   constructor(props) {
      super();

      slice.attachTemplate(this);
      this.$icon = this;

      slice.controller.setComponentProps(this, props);
   }

   get random() {
      return this.classList;
   }

   set random(value) {}

   init() {
      // Static props ensure all properties have default values
      // No need for manual default checking
   }

   get name() {
      return this._name;
   }

   set name(value) {
      // Remove previous icon class if exists
      if (this._name && this._iconStyle) {
         this.classList.remove(`slc-${styleTypes[this._iconStyle]}${this._name}`);
      }
      
      this._name = value;
      // Add new icon class
      this.classList.add(`slc-${styleTypes[this._iconStyle]}${value}`);
   }

   get iconStyle() {
      return this._iconStyle;
   }

   set iconStyle(value) {
      if (value !== 'filled' && value !== 'outlined') value = 'filled';
      
      // Remove old style class
      if (this._name && this._iconStyle) {
         this.classList.remove(`slc-${styleTypes[this._iconStyle]}${this._name}`);
      }

      this._iconStyle = value;
      
      // Add new style class
      if (this._name) {
         this.classList.add(`slc-${styleTypes[this._iconStyle]}${this._name}`);
      }
   }

   get size() {
      return this._size;
   }

   set size(value) {
      if (!value) return;
      
      let pixelValue = value;
      switch (value) {
         case 'small':
            pixelValue = '16px';
            break;
         case 'medium':
            pixelValue = '20px';
            break;
         case 'large':
            pixelValue = '24px';
            break;
      }
      this._size = pixelValue;
      this.style.fontSize = pixelValue;
   }

   get color() {
      return this._color;
   }

   set color(value) {
      this._color = value;
      this.style.color = value;
   }
}

const styleTypes = { outlined: 'out', filled: 'fil' };
customElements.define('slice-icon', Icon);
