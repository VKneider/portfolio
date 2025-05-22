export default class MainMenu extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);
      
      this.$container = this.querySelector('.mainmenu-container');
      
      slice.controller.setComponentProps(this, props);
      this.debuggerProps = [];
   }

   init() {
      // Setup responsive behavior
      this.setupResponsiveMenu();
   }

   add(component) {
      this.$container.appendChild(component);
   }

   setupResponsiveMenu() {
      // Hide/show menu on mobile
      const mediaQuery = window.matchMedia('(max-width: 768px)');
      
      const handleMediaQuery = (e) => {
         if (e.matches) {
            this.style.transform = 'translateX(-100%)';
         } else {
            this.style.transform = 'translateX(0)';
         }
      };

      mediaQuery.addListener(handleMediaQuery);
      handleMediaQuery(mediaQuery);
   }

   toggle() {
      const isHidden = this.style.transform === 'translateX(-100%)';
      this.style.transform = isHidden ? 'translateX(0)' : 'translateX(-100%)';
   }
}

customElements.define('slice-mainmenu', MainMenu);