export default class StudyCard extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);
      
      // Get template elements
      this.$card = this.querySelector('.study-card');
      this.$logo = this.querySelector('.institution-logo');
      this.$initials = this.querySelector('.institution-initials');
      this.$degree = this.querySelector('.degree');
      this.$institution = this.querySelector('.institution');
      this.$period = this.querySelector('.period');
      this.$location = this.querySelector('.location');
      this.$description = this.querySelector('.study-description');
      this.$achievementsList = this.querySelector('.achievements-list');
      this.$courseworkList = this.querySelector('.coursework-list');
      
      slice.controller.setComponentProps(this, props);
      this.debuggerProps = ['study', 'animationDelay'];
   }

   async init() {
      if (!this.study) return;
      
      // Set animation delay
      if (this.animationDelay) {
         this.$card.style.animationDelay = `${this.animationDelay}s`;
      }
      
      // Populate template with data
      this.populateTemplate();
   }

   populateTemplate() {
      // Set logo with fallback to initials
      this.$logo.src = this.study.logo;
      this.$logo.alt = `${this.study.institution} logo`;
      this.$logo.onerror = () => {
         this.$logo.style.display = 'none';
         this.$initials.style.display = 'flex';
         this.$initials.textContent = this.study.institution
            .split(' ')
            .map(word => word[0])
            .join('')
            .substring(0, 2);
      };

      // Set basic info
      this.$degree.textContent = this.study.degree;
      this.$institution.textContent = this.study.institution;
      this.$period.textContent = this.study.period;
      this.$location.textContent = this.study.location;
      this.$description.textContent = this.study.description;

      // Populate achievements
      this.$achievementsList.innerHTML = '';
      this.study.achievements.forEach(achievement => {
         const li = document.createElement('li');
         li.textContent = achievement;
         this.$achievementsList.appendChild(li);
      });

      // Populate coursework
      this.$courseworkList.innerHTML = '';
      this.study.coursework.forEach(course => {
         const courseTag = document.createElement('span');
         courseTag.classList.add('course-tag');
         courseTag.textContent = course;
         this.$courseworkList.appendChild(courseTag);
      });
   }

   // Getters and setters
   get study() {
      return this._study;
   }

   set study(value) {
      this._study = value;
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

customElements.define('slice-study-card', StudyCard);