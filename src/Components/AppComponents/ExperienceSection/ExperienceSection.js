export default class ExperienceSection extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);

      this.$container = this.querySelector('.experience-container');
      this.$timeline = this.querySelector('.experience-timeline');

      slice.controller.setComponentProps(this, props);
      this.debuggerProps = [];
      this.experienceData = [];
      this.activeIndex = 0;
   }

   async init() {
      await this.loadContent();
      await this.createTimeline();

      // Content is data, not `data-t`: it has to be read again for the new locale.
      slice.translator.watch(this, async () => {
         await this.loadContent();
         await this.createTimeline();
      });
   }

   async loadContent() {
      const document = await slice.t.content('experience');
      this.experienceData = Array.isArray(document?.records) ? document.records : [];
   }

   async createTimeline() {
      // Destroy the components built inside the timeline before clearing it.
      slice.controller.destroyByContainer(this.$timeline);
      this.$timeline.innerHTML = '';

      const timelineTitle = await slice.build('SectionTitle', { text: slice.t('experience.title') });
      this.$timeline.appendChild(timelineTitle);

      const timelineContainer = document.createElement('div');
      timelineContainer.classList.add('timeline-container');

      // Most recent first, without parsing the display string.
      const sortedExperience = [...this.experienceData].sort((a, b) => (b.startYear || 0) - (a.startYear || 0));

      const timelineItems = sortedExperience.map((experience) => ({
         id: experience.id,
         date: experience.startYear ? String(experience.startYear) : '',
         label: experience.company,
         fullData: experience
      }));

      const timeline = await slice.build('Timeline', {
         items: timelineItems,
         orientation: 'horizontal',
         title: slice.t('experience.timeline.title'),
         description: slice.t('experience.timeline.description')
      });

      const cards = [];
      for (const experience of sortedExperience) {
         const experienceCard = await slice.build('ExperienceCard', { experience });
         experienceCard.style.width = '100%';
         experienceCard.style.maxWidth = '900px';
         cards.push(experienceCard);
      }

      const tabs = await slice.build('Tabs', {
         items: cards.map((card, index) => ({
            label: sortedExperience[index].company,
            content: card
         })),
         orientation: 'horizontal'
      });

      this.$timeline.appendChild(tabs);

      const timelineWrapper = document.createElement('div');
      timelineWrapper.style.marginTop = '2rem';
      timelineWrapper.style.width = '100%';
      timelineWrapper.appendChild(timeline);
      this.$timeline.appendChild(timelineWrapper);

      // Restore the tab the visitor was reading before the locale changed.
      if (this.activeIndex > 0 && this.activeIndex < cards.length) {
         tabs.activateTab(this.activeIndex);
         timeline.setActive(this.activeIndex);
      }

      timeline.addEventListener('timeline-select', (event) => {
         this.activeIndex = event.detail.index;
         tabs.activateTab(event.detail.index);
      });

      tabs.addEventListener('tab-change', (event) => {
         this.activeIndex = event.detail.index;
         timeline.setActive(event.detail.index);
      });
   }
}

customElements.define('slice-experience-section', ExperienceSection);
