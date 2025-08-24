export default class AboutCard extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);
      
      slice.controller.setComponentProps(this, props);
      this.debuggerProps = ['title', 'text', 'icon', 'customColor', 'animationDelay'];
   }

   async init() {
      await this.render();
   }

   async render() {
      // Create the card using the Visual Card component
      const card = await slice.build('Card', {
         title: this.title,
         text: this.text,
         icon: this.icon,
         customColor: this.customColor
      });
      
      // Apply animation delay if provided
      if (this.animationDelay) {
         card.style.animationDelay = `${this.animationDelay}s`;
      }
      
      // Add specific styling class for about cards
      card.classList.add('about-slice-card');
      
      // Append the card to this component
      this.appendChild(card);
   }
}

customElements.define('slice-about-card', AboutCard);