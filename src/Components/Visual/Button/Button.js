export default class Button extends HTMLElement {

   static props = {
      value: { 
         type: 'string', 
         default: 'Button', 
         required: false 
      },
      onClickCallback: { 
         type: 'function', 
         default: null 
      },
      customColor: { 
         type: 'object', 
         default: null 
      },
      icon: { 
         type: 'object', 
         default: null 
      },
      audioOnClickEnabled: {
         type: 'boolean',
         default: false
      }
   };

   constructor(props) {
      super();
      slice.attachTemplate(this);
      this.$value = this.querySelector('.slice_button_value');
      this.$button = this.querySelector('.slice_button');
      
      if (props.onClickCallback) {
         this.onClickCallback = props.onClickCallback;
          this.addEventListener('click', async () => {
             if (props.audioOnClickEnabled && localStorage.getItem('imposterClickSoundMuted') !== 'true') {
                const clickAudio = document.getElementById('click-audio');
                if (clickAudio) {
                   clickAudio.currentTime = 0;
                   clickAudio.play();
                }
             }
             await this.onClickCallback();
          });
      }

      slice.controller.setComponentProps(this, props);
   }

   async init() {
      if (this.icon) {
         this.$icon = await slice.build('Icon', {
            name: this.icon.name,           // ✅ CORREGIDO: usar this.icon.name
            iconStyle: this.icon.iconStyle, // ✅ AÑADIDO: pasar también iconStyle
            size: '20px',
            color: 'currentColor',
         });
         this.$button.insertBefore(this.$icon, this.$value);
      }
   }

   get icon() {
      return this._icon;
   }


   set icon(value) {
      this._icon = value;
      if (!this.$icon) return;
      this.$icon.name = value.name;
      this.$icon.iconStyle = value.iconStyle;
   }

   get audioOnClickEnabled() {
      return this._audioOnClickEnabled;
   }

   set audioOnClickEnabled(value) {
      this._audioOnClickEnabled = value;
   }

   get value() {
      return this._value;
   }

    set value(value) {
       this._value = value;
       this.$value.textContent = value;
    }

    get onClickCallback() {
       return this._onClickCallback;
    }

    set onClickCallback(value) {
       this._onClickCallback = value;
    }

   get customColor() {
      return this._customColor;
   }

   set customColor(value) {
      this._customColor = value;
      
      if (!value) {
         this.style.removeProperty('--btn-bg');
         this.style.removeProperty('--btn-border-color');
         this.style.removeProperty('--btn-text-color');
         return;
      }

      // Modern CSS Variable approach
      if (value.button) {
         this.style.setProperty('--btn-bg', value.button);
         this.style.setProperty('--btn-border-color', value.button);
      }
      if (value.label) {
         this.style.setProperty('--btn-text-color', value.label);
      }
   }

}

customElements.define('slice-button', Button);