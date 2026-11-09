export default class ExperienceSection extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);

      this.$container = this.querySelector('.experience-container');
      this.$content = this.querySelector('.experience-content');

      slice.controller.setComponentProps(this, props);
      this.debuggerProps = [];
      this.experienceData = [];
      this.activeIndex = 0;
   }

   async init() {
      await this.loadContent();
      await this.createExperience();

      // Content is data, not `data-t`: it has to be read again for the new locale.
      slice.translator.watch(this, async () => {
         await this.loadContent();
         await this.createExperience();
      });
   }

   async loadContent() {
      const document = await slice.t.content('experience');
      this.experienceData = Array.isArray(document?.records) ? document.records : [];
   }

   async createExperience() {
      // Destroy the components built inside the section before clearing it.
      slice.controller.destroyByContainer(this.$content);
      this.$content.innerHTML = '';

      const title = await slice.build('SectionTitle', { text: slice.t('experience.title') });
      this.$content.appendChild(title);

      // Most recent first, without parsing the display string.
      const sortedExperience = [...this.experienceData].sort((a, b) => (b.startYear || 0) - (a.startYear || 0));

      const cards = [];
      for (const experience of sortedExperience) {
         const experienceCard = await slice.build('ExperienceCard', { experience });
         experienceCard.style.width = '100%';
         experienceCard.style.maxWidth = '900px';
         cards.push(experienceCard);
      }

      const tabs = await slice.build('Tabs', {
         items: cards.map((card, index) => ({
            label: sortedExperience[index].shortCompany || sortedExperience[index].company,
            content: card
         })),
         orientation: 'horizontal'
      });

      this.$content.appendChild(tabs);

      // Restore the tab the visitor was reading before the locale changed.
      if (this.activeIndex > 0 && this.activeIndex < cards.length) {
         tabs.activateTab(this.activeIndex);
      }

      tabs.addEventListener('tab-change', (event) => {
         this.activeIndex = event.detail.index;
      });
   }
}

customElements.define('slice-experience-section', ExperienceSection);
