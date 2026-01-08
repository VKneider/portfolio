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
         // Assuming format like "2024 - Present" or "2023"
         // Simple parsing to force most recent first
         return a.id - b.id; // Or keep original order since data.js seems ordered
      });

      const cards = [];
      for (const [index, experience] of sortedExperience.entries()) {
         const experienceCard = await slice.build('ExperienceCard', {
            experience: experience,
            // Remove huge margin/padding in card if handled by carousel slide
         });
         // Ensure card takes full width needed
         experienceCard.style.width = '100%';
         experienceCard.style.maxWidth = '800px'; 
         cards.push(experienceCard);
      }

      const carousel = await slice.build('Tabs', {
         items: cards.map((card, index) => ({
             label: sortedExperience[index].company, // Use company name as tab label
             content: card
         })),
         orientation: 'horizontal'
      });
      
      this.$timeline.appendChild(carousel);
   }

}

customElements.define('slice-experience-section', ExperienceSection);