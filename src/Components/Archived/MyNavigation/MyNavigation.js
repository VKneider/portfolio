export default class MyNavigation extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);
      
      this.$container = this.querySelector('.navigation-container');
      this.currentPage = null;
      
      slice.controller.setComponentProps(this, props);
      this.debuggerProps = ['page'];
   }

   init() {
      if (this.page) {
         this.currentPage = this.page;
         this.$container.appendChild(this.page);
      }
   }

   get page() {
      return this._page;
   }

   set page(value) {
      this._page = value;
      
      if (this.currentPage) {
         this.$container.removeChild(this.currentPage);
      }
      
      this.currentPage = value;
      this.$container.appendChild(value);
   }
}

customElements.define('slice-mynavigation', MyNavigation);