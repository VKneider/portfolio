export default class ProjectsSection extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);
      
      this.$container = this.querySelector('.projects-container');
      this.$grid = this.querySelector('.projects-grid');
      
      slice.controller.setComponentProps(this, props);
      this.debuggerProps = [];
      this.projectsData = [];
   }

   async init() {
      // Define projects data
      this.projectsData = [
         {
            id: 1,
            title: 'Slice.js Framework',
            description: 'A modern, lightweight component-based framework for building web applications using vanilla JavaScript and web standards.',
            image: '/images/projects/slice-js.png',
            technologies: ['JavaScript', 'Web Components', 'CSS3', 'HTML5'],
            category: 'Framework',
            status: 'Active',
            githubUrl: 'https://github.com/victorkneider/slice-js',
            liveUrl: 'https://slice-js-demo.vercel.app',
            featured: true,
            date: '2024-01-15'
         },
         {
            id: 2,
            title: 'E-Commerce Platform',
            description: 'Full-stack e-commerce solution with modern payment integration, inventory management, and admin dashboard.',
            image: '/images/projects/ecommerce.png',
            technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redux'],
            category: 'Web App',
            status: 'Active',
            githubUrl: 'https://github.com/victorkneider/ecommerce-platform',
            liveUrl: 'https://ecommerce-demo.vercel.app',
            featured: true,
            date: '2023-08-20'
         },
         {
            id: 3,
            title: 'Task Management App',
            description: 'Collaborative task management application with real-time updates, team management, and project tracking.',
            image: '/images/projects/task-manager.png',
            technologies: ['Vue.js', 'Express', 'MongoDB', 'Socket.io', 'JWT'],
            category: 'Web App',
            status: 'Active',
            githubUrl: 'https://github.com/victorkneider/task-manager',
            liveUrl: 'https://task-manager-demo.vercel.app',
            featured: false,
            date: '2023-05-10'
         },
         {
            id: 4,
            title: 'Weather Dashboard',
            description: 'Modern weather application with location-based forecasts, interactive maps, and weather alerts.',
            image: '/images/projects/weather-app.png',
            technologies: ['React', 'TypeScript', 'OpenWeather API', 'Mapbox'],
            category: 'Web App',
            status: 'Completed',
            githubUrl: 'https://github.com/victorkneider/weather-dashboard',
            liveUrl: 'https://weather-dashboard-demo.vercel.app',
            featured: false,
            date: '2023-03-15'
         },
         {
            id: 5,
            title: 'Portfolio Website Builder',
            description: 'Drag-and-drop portfolio website builder with customizable templates and hosting integration.',
            image: '/images/projects/portfolio-builder.png',
            technologies: ['React', 'Node.js', 'MySQL', 'AWS S3', 'Docker'],
            category: 'Tool',
            status: 'In Development',
            githubUrl: 'https://github.com/victorkneider/portfolio-builder',
            liveUrl: null,
            featured: false,
            date: '2024-02-01'
         },
         {
            id: 6,
            title: 'API Gateway Service',
            description: 'Microservices API gateway with rate limiting, authentication, and request/response transformation.',
            image: '/images/projects/api-gateway.png',
            technologies: ['Node.js', 'Express', 'Redis', 'JWT', 'Docker', 'Nginx'],
            category: 'Backend',
            status: 'Completed',
            githubUrl: 'https://github.com/victorkneider/api-gateway',
            liveUrl: null,
            featured: false,
            date: '2023-11-20'
         }
      ];
      
      await this.renderProjects();
   }

   async renderProjects() {
      // Clear existing content
      this.$grid.innerHTML = '';

      const sectionTitle = document.createElement('h2');
      sectionTitle.textContent = `My Projects (${this.projectsData.length})`;
      sectionTitle.classList.add('section-title');

      const projectsGrid = document.createElement('div');
      projectsGrid.classList.add('projects-grid-container');

      // Sort projects: featured first, then by date
      const sortedProjects = [...this.projectsData].sort((a, b) => {
         if (a.featured !== b.featured) {
            return b.featured - a.featured;
         }
         return new Date(b.date) - new Date(a.date);
      });

      for (const [index, project] of sortedProjects.entries()) {
         const projectCard = await this.createProjectCard(project, index);
         projectsGrid.appendChild(projectCard);
      }

      this.$grid.appendChild(sectionTitle);
      this.$grid.appendChild(projectsGrid);
   }

   async createProjectCard(project, index) {
      const card = document.createElement('div');
      card.classList.add('project-card');
      if (project.featured) {
         card.classList.add('featured');
      }
      card.style.animationDelay = `${index * 0.1}s`;

      // Project image
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('project-image-container');
      
      const image = document.createElement('img');
      image.src = project.image;
      image.alt = project.title;
      image.classList.add('project-image');
      image.loading = 'lazy';
      image.onerror = () => {
         // Fallback to placeholder
         image.src = '/images/projects/placeholder.png';
      };

      // Status badge
      const statusBadge = document.createElement('span');
      statusBadge.classList.add('status-badge', `status-${project.status.toLowerCase().replace(' ', '-')}`);
      statusBadge.textContent = project.status;

      // Featured badge
      if (project.featured) {
         const featuredBadge = document.createElement('span');
         featuredBadge.classList.add('featured-badge');
         featuredBadge.textContent = '⭐ Featured';
         imageContainer.appendChild(featuredBadge);
      }

      imageContainer.appendChild(image);
      imageContainer.appendChild(statusBadge);

      // Project content
      const content = document.createElement('div');
      content.classList.add('project-content');

      // Title
      const title = document.createElement('h3');
      title.classList.add('project-title');
      title.textContent = project.title;

      // Description
      const description = document.createElement('p');
      description.classList.add('project-description');
      description.textContent = project.description;

      // Tech stack
      const techStack = document.createElement('div');
      techStack.classList.add('tech-stack');
      
      project.technologies.forEach(tech => {
         const techTag = document.createElement('span');
         techTag.classList.add('tech-tag');
         techTag.textContent = tech;
         techStack.appendChild(techTag);
      });

      // Actions
      const actions = document.createElement('div');
      actions.classList.add('project-actions');

      // GitHub button
      if (project.githubUrl) {
         const githubBtn = await slice.build('Button', {
            value: 'GitHub',
            customColor: {
               button: 'var(--secondary-background-color)',
               label: 'var(--font-primary-color)'
            },
            onClickCallback: () => window.open(project.githubUrl, '_blank')
         });
         githubBtn.classList.add('action-button');
         actions.appendChild(githubBtn);
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
         actions.appendChild(liveBtn);
      }

      // Assemble card
      content.appendChild(title);
      content.appendChild(description);
      content.appendChild(techStack);
      content.appendChild(actions);

      card.appendChild(imageContainer);
      card.appendChild(content);

      return card;
   }
}

customElements.define('slice-projects-section', ProjectsSection);