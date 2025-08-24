import {experienceData} from './data.js';

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
         return new Date(b.date) - new Date(a.date);
      });

      for (const [index, experience] of sortedExperience.entries()) {
         const experienceCard = await slice.build('ExperienceCard', {
            experience: experience,
            animationDelay: index * 0.1
         });
         timelineContainer.appendChild(experienceCard);
      }

      this.$timeline.appendChild(timelineContainer);
   }

}

customElements.define('slice-experience-section', ExperienceSection);