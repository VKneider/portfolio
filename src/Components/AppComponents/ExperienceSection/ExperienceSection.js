import {experienceData} from './data.js';

export default class ExperienceSection extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);
      
      this.$container = this.querySelector('.experience-container');
      this.$timeline = this.querySelector('.experience-timeline');
      
      slice.controller.setComponentProps(this, props);
      this.debuggerProps = [];
      this.experienceData = [];
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
         const experienceCard = await this.createExperienceCard(experience, index);
         timelineContainer.appendChild(experienceCard);
      }

      this.$timeline.appendChild(timelineContainer);
   }

   async createExperienceCard(experience, index) {
      const card = document.createElement('div');
      card.classList.add('experience-card');
      card.style.animationDelay = `${index * 0.1}s`;

      // Company logo and basic info
      const header = document.createElement('div');
      header.classList.add('experience-header');
      
      const logo = document.createElement('img');
      logo.src = experience.logo;
      logo.alt = `${experience.company} logo`;
      logo.classList.add('company-logo');
      logo.onerror = () => {
         // Fallback to initials if logo fails to load
         const initials = document.createElement('div');
         initials.classList.add('company-initials');
         initials.textContent = experience.company.split(' ').map(word => word[0]).join('').substring(0, 2);
         logo.parentNode.replaceChild(initials, logo);
      };

      const basicInfo = document.createElement('div');
      basicInfo.classList.add('basic-info');
      basicInfo.innerHTML = `
         <h3 class="position">${experience.position}</h3>
         <h4 class="company">${experience.company}</h4>
         <div class="meta-info">
            <span class="period">${experience.period}</span>
            <span class="type">${experience.type}</span>
            <span class="location">${experience.location}</span>
         </div>
      `;

      header.appendChild(logo);
      header.appendChild(basicInfo);

      // Description
      const description = document.createElement('p');
      description.classList.add('experience-description');
      description.textContent = experience.description;

      // Responsibilities
      const responsibilitiesSection = document.createElement('div');
      responsibilitiesSection.classList.add('responsibilities-section');
      
      const responsibilitiesTitle = document.createElement('h5');
      responsibilitiesTitle.textContent = 'Key Responsibilities:';
      
      const responsibilitiesList = document.createElement('ul');
      responsibilitiesList.classList.add('responsibilities-list');
      
      experience.responsibilities.forEach(responsibility => {
         const li = document.createElement('li');
         li.textContent = responsibility;
         responsibilitiesList.appendChild(li);
      });

      responsibilitiesSection.appendChild(responsibilitiesTitle);
      responsibilitiesSection.appendChild(responsibilitiesList);

      // Technologies
      const techSection = document.createElement('div');
      techSection.classList.add('tech-section');
      
      const techTitle = document.createElement('h5');
      techTitle.textContent = 'Technologies:';
      
      const techList = document.createElement('div');
      techList.classList.add('tech-list');
      
      experience.technologies.forEach(tech => {
         const techTag = document.createElement('span');
         techTag.classList.add('tech-tag');
         techTag.textContent = tech;
         techList.appendChild(techTag);
      });

      techSection.appendChild(techTitle);
      techSection.appendChild(techList);

      // Achievements
      const achievementsSection = document.createElement('div');
      achievementsSection.classList.add('achievements-section');
      
      const achievementsTitle = document.createElement('h5');
      achievementsTitle.textContent = 'Key Achievements:';
      
      const achievementsList = document.createElement('ul');
      achievementsList.classList.add('achievements-list');
      
      experience.achievements.forEach(achievement => {
         const li = document.createElement('li');
         li.textContent = achievement;
         achievementsList.appendChild(li);
      });

      achievementsSection.appendChild(achievementsTitle);
      achievementsSection.appendChild(achievementsList);

      // Assemble card
      card.appendChild(header);
      card.appendChild(description);
      card.appendChild(responsibilitiesSection);
      card.appendChild(techSection);
      card.appendChild(achievementsSection);

      return card;
   }
}

customElements.define('slice-experience-section', ExperienceSection);