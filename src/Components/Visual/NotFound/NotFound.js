export default class NotFound extends HTMLElement {

   static props = {
      // No props needed for this component
   };

   constructor(props) {
      super();
      slice.attachTemplate(this);

      slice.controller.setComponentProps(this, props);
   }

   init() {
      const links = [...this.querySelectorAll('a[data-route]')];
      const applyHrefs = () => {
         for (const link of links) link.href = slice.href(link.dataset.route);
      };
      applyHrefs();

      this.addEventListener('click', (event) => {
         const link = event.target.closest?.('a[data-route]');
         if (!link) return;
         event.preventDefault();
         slice.router.navigate(link.dataset.route);
      });

      slice.translator.watch(this, applyHrefs);
   }
}

customElements.define('slice-notfound', NotFound);
