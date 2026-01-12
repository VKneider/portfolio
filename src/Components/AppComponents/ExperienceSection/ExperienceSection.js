import experienceData from '../ExperienceSection/data.js';

export default class ExperienceSection extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);
      
      this.$container = this.querySelector('.experience-container');
      this.$timeline = this.querySelector('.experience-timeline');
      
      slice.controller.setComponentProps(this, props);
      this.debuggerProps = [];
      this.experienceData = experienceData  || [];
   }

   async init() {
      // Define experience data
      

      // Create timeline directly without filters
      await this.createTimeline();
   }

   async createTimeline() {
      // Clear existing timeline
      this.$timeline.innerHTML = '';

      const timelineTitle = document.createElement('h2');
      timelineTitle.textContent = 'Professional Experience';
      timelineTitle.classList.add('section-title');
      this.$timeline.appendChild(timelineTitle);

      const timelineContainer = document.createElement('div');
      timelineContainer.classList.add('timeline-container');

      // Sort by date (most recent first)
      const sortedExperience = [...this.experienceData].sort((a, b) => {
         const getYear = (str) => {
             const match = str && str.match(/\d{4}/);
             return match ? parseInt(match[0]) : 0;
         };
         // If IDs are chronological, use IDs? But date parsing is safer if IDs are arbitrary
         // Assuming b is more recent
         return getYear(b.period) - getYear(a.period);
      });

      // Prepare items for Timeline component
      const timelineItems = sortedExperience.map(exp => ({
          id: exp.id,
          date: exp.period ? exp.period.split(' - ')[0] : '', // E.g. "2024"
          label: exp.company,
          fullData: exp
      }));

      // Build Timeline
      const timeline = await slice.build('Timeline', {
         items: timelineItems,
         orientation: 'horizontal',
         title: 'My Journey Map',
         description: 'Explore my professional path. Drag nodes to reshape the timeline or click to view details.'
      });

      // Create Tabs/Carousel for detailed view
      const cards = [];
      for (const [index, experience] of sortedExperience.entries()) {
         const experienceCard = await slice.build('ExperienceCard', {
            experience: experience,
         });
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
      
      // Layout: Tabs on TOP, Timeline on BOTTOM
      this.$timeline.appendChild(tabs);
      
      const timelineWrapper = document.createElement('div');
      timelineWrapper.style.marginTop = '2rem'; // Reduced space from 4rem
      timelineWrapper.style.width = '100%';
      timelineWrapper.appendChild(timeline);
      
      this.$timeline.appendChild(timelineWrapper);
      
      // Bi-directional sync
      timeline.addEventListener('timeline-select', (e) => {
          console.log('Caught timeline-select', e.detail.index);
          tabs.activateTab(e.detail.index);
      });
      
      tabs.addEventListener('tab-change', (e) => {
          timeline.setActive(e.detail.index);
      });

      // Select first by default
      /*
      if (sortedExperience.length > 0) {
          // Tabs selects first by default usually, so we just sync timeline
          timeline.setActive(0);
      }
      */
   }

   // Removed showExperience as it's handled by Tabs now


}

customElements.define('slice-experience-section', ExperienceSection);