export default class ProjectCard extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);
      
      this.$card = this.querySelector('.project-card');
      this.$imageContainer = this.querySelector('.project-image-container');
      this.$image = this.querySelector('.project-image');
      this.$statusBadge = this.querySelector('.status-badge');
      this.$featuredBadge = this.querySelector('.featured-badge');
      this.$title = this.querySelector('.project-title');
      this.$description = this.querySelector('.project-description');
      this.$techStack = this.querySelector('.tech-stack');
      this.$actions = this.querySelector('.project-actions');
      
      slice.controller.setComponentProps(this, props);
      this.debuggerProps = ['project', 'animationDelay'];
   }

   async init() {
      if (this.project) {
         await this.renderProjectCard();
      }
      
      if (this.animationDelay) {
         this.$card.style.animationDelay = `${this.animationDelay}s`;
      }
   }

   get project() {
      return this._project;
   }

   set project(value) {
      this._project = value;
   }

   get animationDelay() {
      return this._animationDelay;
   }

   set animationDelay(value) {
      this._animationDelay = value;
   }

   async renderProjectCard() {
      const project = this._project;
      
      // Configure featured class
      if (project.featured) {
         this.$card.classList.add('featured');
         this.$featuredBadge.style.display = 'block';
         this.$featuredBadge.textContent = '⭐ Featured';
      } else {
         this.$card.classList.remove('featured');
         this.$featuredBadge.style.display = 'none';
      }

      // Configure image with better error handling
      this.loadProjectImage(project);

      // Configure status badge
      this.$statusBadge.className = `status-badge status-${project.status.toLowerCase().replace(' ', '-')}`;
      this.$statusBadge.textContent = project.status;

      // Configure title and description
      this.$title.textContent = project.title;
      this.$description.textContent = project.description;

      // Configure tech stack
      this.renderTechStack(project.technologies);

      // Configure actions
      await this.renderActions(project);
   }

   loadProjectImage(project) {
      // Crear una nueva imagen para precargar
      const tempImg = new Image();
      
      tempImg.onload = () => {
         // Si la imagen se carga correctamente, asignarla al elemento
         this.$image.src = project.image;
         this.$image.alt = project.title;
         console.log(`Imagen cargada correctamente: ${project.title}`);
      };
      
      tempImg.onerror = () => {
         // Si hay error, usar imagen placeholder
         console.warn(`Error cargando imagen para: ${project.title}`);
         this.$image.src = '/images/projects/placeholder.png';
         this.$image.alt = `${project.title} - Placeholder`;
         
         // Si el placeholder también falla, mostrar un color de fondo
         this.$image.onerror = () => {
            this.$image.style.display = 'none';
            this.$imageContainer.style.backgroundColor = 'var(--primary-color)';
            this.$imageContainer.innerHTML += `<div style="color: white; font-weight: bold; text-align: center; padding: 2rem;">${project.title}</div>`;
         };
      };
      
      // Iniciar la carga de la imagen
      tempImg.src = project.image;
   }

   renderTechStack(technologies) {
      this.$techStack.innerHTML = '';
      
      technologies.forEach(tech => {
         const techTag = document.createElement('span');
         techTag.classList.add('tech-tag');
         techTag.textContent = tech;
         techTag.setAttribute('tabindex', '-1'); // Eliminar del tab order
         this.$techStack.appendChild(techTag);
      });
   }

   async renderActions(project) {
      // Limpiar acciones existentes
      this.$actions.innerHTML = '';

      // GitHub button
      if (project.githubUrl) {
         const githubBtn = await slice.build('Button', {
            value: '⭐ GitHub',
            customColor: {
               button: '#24292e',
               label: '#ffffff'
            },
            onClickCallback: () => window.open(project.githubUrl, '_blank')
         });
         githubBtn.classList.add('action-button');
         this.$actions.appendChild(githubBtn);
      }

      // Live demo button
      if (project.liveUrl) {
         const liveBtn = await slice.build('Button', {
            value: 'Live Demo',
            customColor: {
               button: 'var(--primary-color)',
               label: 'var(--primary-color-contrast)'
            },
            onClickCallback: () => window.open(project.liveUrl, '_blank')
         });
         liveBtn.classList.add('action-button');
         this.$actions.appendChild(liveBtn);
      }
   }
}

customElements.define('slice-project-card', ProjectCard);