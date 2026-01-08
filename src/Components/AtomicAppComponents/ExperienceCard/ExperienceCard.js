export default class ExperienceCard extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);
      
      // Get template elements
      this.$card = this.querySelector('.experience-card');
      this.$logo = this.querySelector('.company-logo');
      this.$initials = this.querySelector('.company-initials');
      this.$position = this.querySelector('.position');
      this.$company = this.querySelector('.company');
      this.$period = this.querySelector('.period');
      this.$type = this.querySelector('.type');
      this.$location = this.querySelector('.location');
      this.$description = this.querySelector('.experience-description');
      this.$responsibilitiesList = this.querySelector('.responsibilities-list');
      this.$techList = this.querySelector('.tech-list');
      // this.$achievementsList removed in favor of grid
      
      slice.controller.setComponentProps(this, props);
      this.debuggerProps = ['experience', 'animationDelay'];
   }

   async init() {
      if (!this.experience) return;
      
      // Set animation delay
      if (this.animationDelay) {
         this.$card.style.animationDelay = `${this.animationDelay}s`;
      }
      
      // Populate template with data
      this.populateTemplate();
   }

   populateTemplate() {
      // Set logo with fallback to initials
      this.$logo.src = this.experience.logo;
      this.$logo.alt = `${this.experience.company} logo`;
      this.$logo.onerror = () => {
         this.$logo.style.display = 'none';
         this.$initials.style.display = 'flex';
         this.$initials.textContent = this.experience.company
            .split(' ')
            .map(word => word[0])
            .join('')
            .substring(0, 2);
      };

      // Set basic info
      this.$position.textContent = this.experience.position;
      this.$company.textContent = this.experience.company;
      this.$period.textContent = this.experience.period;
      this.$type.textContent = this.experience.type;
      this.$location.textContent = this.experience.location;
      this.$description.textContent = this.experience.description;

      // Populate responsibilities
      this.$responsibilitiesList.innerHTML = '';
      this.experience.responsibilities.forEach(responsibility => {
         const li = document.createElement('li');
         li.textContent = responsibility;
         this.$responsibilitiesList.appendChild(li);
      });

      // Populate technologies
      this.$techList.innerHTML = '';
      this.experience.technologies.forEach(tech => {
         const techTag = document.createElement('span');
         techTag.classList.add('tech-tag');
         techTag.textContent = tech;
         this.$techList.appendChild(techTag);
      });

      // Populate achievements
      const achievementsGrid = this.querySelector('.achievements-grid');
      achievementsGrid.innerHTML = '';
      
      this.experience.achievements.forEach(achievement => {
         const card = document.createElement('div');
         card.className = 'achievement-item';
         card.innerHTML = `
            <span class="achievement-icon">🚀</span>
            <span class="achievement-text">${achievement}</span>
         `;
         achievementsGrid.appendChild(card);
      });
   }

   // Getters and setters
   get experience() {
      return this._experience;
   }

   set experience(value) {
      this._experience = value;
      if (this.$card) {
         this.populateTemplate();
      }
   }

   get animationDelay() {
      return this._animationDelay;
   }

   set animationDelay(value) {
      this._animationDelay = value;
      if (this.$card) {
         this.$card.style.animationDelay = `${value}s`;
      }
   }
}

customElements.define('slice-experience-card', ExperienceCard);