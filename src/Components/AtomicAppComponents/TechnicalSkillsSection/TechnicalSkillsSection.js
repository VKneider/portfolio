export default class TechnicalSkillsSection extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);
      
      this.$mainContainer = this.querySelector('.technical-skills-section');
      this.$skillsContainer = this.querySelector('.technical-skills-container');
            this.setDefaults();

      slice.controller.setComponentProps(this, props);
      this.debuggerProps = ['skillsData', 'title', 'maxSkillsPerCard', 'showLevelBadges'];
   }

   async init() {
      // Configurar valores por defecto
      
      // Crear el título
      await this.createTitle();
      
      // Crear las tarjetas de skills
      await this.createSkillCards();
   }

   setDefaults() {
      if (!this.skillsData) {
         this.skillsData = this.getDefaultSkillsData();
      }
      if (!this.title) {
         this.title = '💻 Technical Expertise';
      }
      if (this.maxSkillsPerCard === undefined) {
         this.maxSkillsPerCard = 6;
      }
      if (this.showLevelBadges === undefined) {
         this.showLevelBadges = true;
      }
   }

   getDefaultSkillsData() {
      return [
         { 
            category: 'Frontend', 
            icon: '🎨',
            color: 'var(--primary-color)',
            skills: ['JavaScript', 'TypeScript', 'React', 'Vue.js', 'HTML5', 'CSS3', 'Slice.js'],
            level: 'Expert'
         },
         { 
            category: 'Backend', 
            icon: '⚙️',
            color: 'var(--secondary-color)',
            skills: ['Node.js', 'Express', 'Python', 'PHP', 'RESTful APIs', 'GraphQL'],
            level: 'Advanced'
         },
         { 
            category: 'Database & Cloud', 
            icon: '☁️',
            color: 'var(--success-color)',
            skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'AWS', 'Docker'],
            level: 'Advanced'
         },
         { 
            category: 'DevOps & Tools', 
            icon: '🛠️',
            color: 'var(--warning-color)',
            skills: ['Git', 'CI/CD', 'Kubernetes', 'Testing', 'Agile', 'Scrum'],
            level: 'Intermediate'
         },
         { 
            category: 'Mobile & Desktop', 
            icon: '📱',
            color: 'var(--accent-color)',
            skills: ['React Native', 'Electron', 'PWA', 'Ionic', 'Flutter'],
            level: 'Intermediate'
         },
         { 
            category: 'AI & Data', 
            icon: '🤖',
            color: 'var(--danger-color)',
            skills: ['Machine Learning', 'TensorFlow', 'Python', 'Data Analysis', 'APIs'],
            level: 'Beginner'
         }
      ];
   }

   async createTitle() {
      const titleElement = document.createElement('h2');
      titleElement.innerHTML = this.title;
      titleElement.classList.add('technical-skills-title');
      
      // Insertar el título al inicio del contenedor principal
      this.$mainContainer.insertBefore(titleElement, this.$skillsContainer);
   }

   async createSkillCards() {
      // Limpiar contenedor
      this.$skillsContainer.innerHTML = '';

      this.skillsData.forEach((skillGroup, index) => {
         const skillCard = this.createSkillCard(skillGroup, index);
         this.$skillsContainer.appendChild(skillCard);
      });
   }

   createSkillCard(skillGroup, index) {
      const skillCard = document.createElement('div');
      skillCard.classList.add('technical-skill-card');
      skillCard.style.animationDelay = `${index * 0.1}s`;
      
      // Header con icono y categoría
      const header = this.createSkillHeader(skillGroup);
      
      // Lista de skills más compacta
      const skillsList = this.createSkillsList(skillGroup);
      
      skillCard.appendChild(header);
      skillCard.appendChild(skillsList);
      
      return skillCard;
   }

   createSkillHeader(skillGroup) {
      const header = document.createElement('div');
      header.classList.add('skill-header');
      header.style.borderLeft = `4px solid ${skillGroup.color}`;
      
      const iconElement = document.createElement('div');
      iconElement.classList.add('skill-icon');
      iconElement.textContent = skillGroup.icon;
      iconElement.style.background = skillGroup.color;
      
      const headerInfo = document.createElement('div');
      headerInfo.classList.add('skill-header-info');
      
      const categoryTitle = document.createElement('h3');
      categoryTitle.textContent = skillGroup.category;
      categoryTitle.classList.add('skill-category');
      
      headerInfo.appendChild(categoryTitle);
      
      // Badge de nivel si está habilitado
      if (this.showLevelBadges && skillGroup.level) {
         const levelBadge = document.createElement('span');
         levelBadge.textContent = skillGroup.level;
         levelBadge.classList.add('skill-level-badge');
         levelBadge.style.background = skillGroup.color;
         headerInfo.appendChild(levelBadge);
      }
      
      header.appendChild(iconElement);
      header.appendChild(headerInfo);
      
      return header;
   }

   createSkillsList(skillGroup) {
      const skillsList = document.createElement('div');
      skillsList.classList.add('skills-compact-list');
      
      // Mostrar solo los primeros N skills
      const skillsToShow = skillGroup.skills.slice(0, this.maxSkillsPerCard);
      
      skillsToShow.forEach(skill => {
         const skillTag = document.createElement('span');
         skillTag.classList.add('skill-tag-compact');
         skillTag.textContent = skill;
         skillTag.style.borderColor = skillGroup.color;
         skillsList.appendChild(skillTag);
      });
      
      // Indicador si hay más skills
      if (skillGroup.skills.length > this.maxSkillsPerCard) {
         const moreIndicator = document.createElement('span');
         moreIndicator.classList.add('skill-more-indicator');
         moreIndicator.textContent = `+${skillGroup.skills.length - this.maxSkillsPerCard} more`;
         skillsList.appendChild(moreIndicator);
      }
      
      return skillsList;
   }

   // Getters y Setters
   get skillsData() {
      return this._skillsData;
   }

   set skillsData(value) {
      this._skillsData = value;
      if (this.$skillsContainer) {
         this.createSkillCards();
      }
   }

   get title() {
      return this._title;
   }

   set title(value) {
      this._title = value;
      const titleElement = this.querySelector('.technical-skills-title');
      if (titleElement) {
         titleElement.innerHTML = value;
      }
   }

   get maxSkillsPerCard() {
      return this._maxSkillsPerCard;
   }

   set maxSkillsPerCard(value) {
      this._maxSkillsPerCard = value;
      if (this.$skillsContainer) {
         this.createSkillCards();
      }
   }

   get showLevelBadges() {
      return this._showLevelBadges;
   }

   set showLevelBadges(value) {
      this._showLevelBadges = value;
      if (this.$skillsContainer) {
         this.createSkillCards();
      }
   }

   // Métodos públicos para interacción
   addSkillCategory(categoryData) {
      if (!this._skillsData) {
         this._skillsData = [];
      }
      this._skillsData.push(categoryData);
      this.createSkillCards();
   }

   removeSkillCategory(categoryName) {
      if (!this._skillsData) return;
      
      this._skillsData = this._skillsData.filter(
         category => category.category !== categoryName
      );
      this.createSkillCards();
   }

   updateSkillCategory(categoryName, newData) {
      if (!this._skillsData) return;
      
      const categoryIndex = this._skillsData.findIndex(
         category => category.category === categoryName
      );
      
      if (categoryIndex !== -1) {
         this._skillsData[categoryIndex] = { ...this._skillsData[categoryIndex], ...newData };
         this.createSkillCards();
      }
   }
}

customElements.define('slice-technical-skills-section', TechnicalSkillsSection);