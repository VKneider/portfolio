export default class AboutSection extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);
      
      this.$hero = this.querySelector('.hero-section');
      this.$about = this.querySelector('.about-content');
      this.$skills = this.querySelector('.skills-section');
      this.$values = this.querySelector('.values-section');
      this.$interests = this.querySelector('.interests-section');
      
      slice.controller.setComponentProps(this, props);
      this.debuggerProps = [];
   }

   async init() {
      // Set up enhanced hero section
      await this.setupEnhancedHero();
      
      // Create enhanced about content cards
      await this.createEnhancedAboutCards();
      
      // Create technical skills section
      await this.createTechnicalSkillsSection();
      
      // Create values section
      await this.createCarruselSection();
      
   }

   async setupEnhancedHero() {
      const heroContent = this.$hero.querySelector('.hero-content');
      
      // Profile image with enhanced styling
      const profileContainer = document.createElement('div');
      profileContainer.classList.add('profile-container');
      
      const profileImage = document.createElement('img');
      profileImage.src = "https://avatars.githubusercontent.com/u/103617388?v=4";
      profileImage.alt = 'Victor Kneider - Computer Engineer & University Professor';
      profileImage.classList.add('profile-image');
      
      const profileRing = document.createElement('div');
      profileRing.classList.add('profile-ring');
      
      profileContainer.appendChild(profileRing);
      profileContainer.appendChild(profileImage);
      
      // Enhanced hero text with typewriter effect
      const heroText = document.createElement('div');
      heroText.classList.add('hero-text');
      heroText.innerHTML = `
         <div class="title-container">
            <h1>Victor Kneider</h1>
            <div class="title-accent"></div>
         </div>
         <div class="roles-container">
            <h2 class="role-title">
               <span class="role-switcher" data-roles='["Computer Engineer", "Full-Stack Developer", "Tech Innovator", "Open Source Contributor", "Solution Architect"]'>Computer Engineer</span>
            </h2>
         </div>
         <p class="hero-description">
            Passionate about creating innovative technology solutions and sharing knowledge. 
            I combine deep technical expertise with a drive for continuous learning to build 
            scalable applications and contribute to the developer community.
         </p>
      `;

      // Enhanced CTA Buttons
      const ctaButtons = document.createElement('div');
      ctaButtons.classList.add('cta-buttons');
      
      const contactBtn = await slice.build('Button', {
         value: '📧 Get In Touch',
         customColor: {
            button: 'var(--primary-color)',
            label: 'var(--primary-color-contrast)'
         },
         onClickCallback: () => {
              window.location.href = 'mailto:victorkneider@gmail.com';
         }
      });

      const projectsBtn = await slice.build('Button', {
         value: '🚀 View Projects',
         customColor: {
            button: 'var(--secondary-color)',
            label: 'var(--secondary-color-contrast)'
         },
         onClickCallback: async () => {
            await slice.router.navigate('/projects');
         }
      });

      const cvBtn = await slice.build('Button', {
         value: '📄 Download CV',
         customColor: {
            button: 'var(--success-color)',
            label: 'var(--success-contrast)'
         },
         onClickCallback: () => {
            // Create download link for CV
            const link = document.createElement('a');
            link.href = '/assets/Victor_Kneider_CV.pdf';
            link.download = 'Victor_Kneider_CV.pdf';
            link.click();
         }
      });

      ctaButtons.appendChild(contactBtn);
      ctaButtons.appendChild(projectsBtn);
      ctaButtons.appendChild(cvBtn);
      
      // Assemble hero content
      heroContent.appendChild(profileContainer);
      heroContent.appendChild(heroText);
      heroContent.appendChild(ctaButtons);
      
      // Initialize role switcher animation
      this.initRoleSwitcher();
   }

   initRoleSwitcher() {
      const roleSwitcher = this.$hero.querySelector('.role-switcher');
      if (!roleSwitcher) return;
      
      const roles = JSON.parse(roleSwitcher.dataset.roles);
      let currentIndex = 0;
      
      setInterval(() => {
         currentIndex = (currentIndex + 1) % roles.length;
         roleSwitcher.style.opacity = '0';
         
         setTimeout(() => {
            roleSwitcher.textContent = roles[currentIndex];
            roleSwitcher.style.opacity = '1';
         }, 300);
      }, 3000);
   }

   async createEnhancedAboutCards() {
      const aboutData = [
         {
            title: 'Engineering Excellence',
            text: 'Computer Engineer with 5+ years creating robust, scalable web applications. Expert in modern JavaScript frameworks, cloud architecture, and agile methodologies. Creator of Slice.js framework.',
            icon: { name: 'file-code', iconStyle: 'filled' },
            customColor: {
               card: 'var(--primary-color)',
               icon: 'var(--primary-color-contrast)'
            }
         },
         {
            title: 'Educational Leadership',
            text: 'University Professor passionate about making complex technology concepts accessible. Experienced in curriculum development, innovative teaching methodologies, and mentoring the next generation of developers.',
            icon: { name: 'book-open', iconStyle: 'filled' },
            customColor: {
               card: 'var(--secondary-color)',
               icon: 'var(--secondary-color-contrast)'
            }
         },
         {
            title: 'Innovation & Research',
            text: 'Dedicated to continuous learning and innovation. Active in open-source development, technical research, and bridging the gap between academic theory and industry practice.',
            icon: { name: 'lightbulb', iconStyle: 'filled' },
            customColor: {
               card: 'var(--success-color)',
               icon: 'var(--success-contrast)'
            }
         }
      ];

      const grid = await slice.build('Grid', {
         columns: 3,
         rows: 1
      });

      for (const [index, cardData] of aboutData.entries()) {
         const aboutCard = await slice.build('Card', {
            title: cardData.title,
            text: cardData.text,
            icon: cardData.icon,
            customColor: cardData.customColor,
            animationDelay: index * 0.2
         });
         
         await grid.setItem(aboutCard);
      }

      // Make responsive for mobile
      window.addEventListener('resize', () => {
         if (window.innerWidth <= 768) {
            grid.columns = 1;
            grid.rows = 3;
         } else {
            grid.columns = 3;
            grid.rows = 1;
         }
      });
      
      if (window.innerWidth <= 768) {
         grid.columns = 1;
         grid.rows = 3;
      }

      this.$about.appendChild(grid);
   }

   async createTechnicalSkillsSection() {
   const technicalSkillsSection = await slice.build('TechnicalSkillsSection', {
      title: '💻 Technical Expertise',
      maxSkillsPerCard: 8,
      showLevelBadges: true
   });
   
   // Asegúrate de que el componente se construyó correctamente
   if (technicalSkillsSection && this.$skills) {
      this.$skills.appendChild(technicalSkillsSection);
   } else {
      console.error('Error: TechnicalSkillsSection component not built correctly');
   }
}
   async createCarruselSection() {
      const valuesTitle = document.createElement('h2');
      valuesTitle.innerHTML = '🌟 My Journey & Experiences';
      valuesTitle.classList.add('section-title');

      // Crear contenedor principal con grid 60/40
      const mainContainer = document.createElement('div');
      mainContainer.classList.add('journey-container');

      // Carrusel de imágenes (60%)
      const carouselSection = document.createElement('div');
      carouselSection.classList.add('carousel-section');

      const carousel = await slice.build('ImageCarrousel', {
         images: [
            {
               url: './images/aboutSection/estudiantes.jpeg',
               label: 'Computer Engineering Project Showcase',
               date: 'July 2025',
               alt: 'Eng. Ing. Victor Kneiders Project exposition for the Engineering Faculty in Universidad Rafael Urdaneta'
            },
            {
               url: './images/aboutSection/firma.jpeg',
               label: 'Professional Development',
               date: 'August 2024',
               alt: 'My graduation day at Universidad Rafael Urdaneta Victor Kneider'
            }
         ],
         autoplay: true,
         autoplaySpeed: 4000,
         showIndicators: true,
         showNavigation: true
      });

      carouselSection.appendChild(carousel);

      // Contenido adicional debajo del carrusel para PC
      const carouselFooter = document.createElement('div');
      carouselFooter.classList.add('carousel-footer');
      
      const statsContainer = document.createElement('div');
      statsContainer.classList.add('stats-container');
      
      const stats = [
         { number: '5+', label: 'Years Experience' },
         { number: '50+', label: 'Projects Completed' },
         { number: '100+', label: 'Students Taught' },
         { number: '15+', label: 'Open Source Contributions' }
      ];
      
      stats.forEach(stat => {
         const statItem = document.createElement('div');
         statItem.classList.add('stat-item');
         
         statItem.innerHTML = `
            <div class="stat-number">${stat.number}</div>
            <div class="stat-label">${stat.label}</div>
         `;
         
         statsContainer.appendChild(statItem);
      });
      
      carouselFooter.appendChild(statsContainer);
      carouselSection.appendChild(carouselFooter);

      // Sección de texto (40%)
      const textSection = document.createElement('div');
      textSection.classList.add('text-section');

      const personalTitle = document.createElement('h3');
      personalTitle.textContent = 'Beyond the Code';
      personalTitle.classList.add('personal-title');

      const personalDescription = document.createElement('p');
      personalDescription.innerHTML = `
         My journey in technology goes far beyond writing code. I'm passionate about 
         <strong>sharing knowledge</strong> and <strong>building communities</strong> that drive innovation forward.
      `;
      personalDescription.classList.add('personal-description');

      const highlightsList = document.createElement('div');
      highlightsList.classList.add('highlights-list');

      const highlights = [
         {
            icon: '🎯',
            title: 'Community Building',
            description: 'Creating spaces where developers can learn, grow, and collaborate together.'
         },
         {
            icon: '🚀',
            title: 'Innovation Leadership',
            description: 'Leading by example in adopting and promoting cutting-edge technologies.'
         },
         {
            icon: '💡',
            title: 'Knowledge Sharing',
            description: 'Committed to making complex concepts accessible to everyone.'
         },
         {
            icon: '🌟',
            title: 'Mentorship',
            description: 'Guiding the next generation of developers and engineers.'
         }
      ];

      highlights.forEach(highlight => {
         const highlightItem = document.createElement('div');
         highlightItem.classList.add('highlight-item');
         
         highlightItem.innerHTML = `
            <div class="highlight-icon">${highlight.icon}</div>
            <div class="highlight-content">
               <h4 class="highlight-title">${highlight.title}</h4>
               <p class="highlight-description">${highlight.description}</p>
            </div>
         `;
         
         highlightsList.appendChild(highlightItem);
      });

      textSection.appendChild(personalTitle);
      textSection.appendChild(personalDescription);
      textSection.appendChild(highlightsList);

      // Ensamblar el contenedor principal
      mainContainer.appendChild(carouselSection);
      mainContainer.appendChild(textSection);

      this.$values.appendChild(valuesTitle);
      this.$values.appendChild(mainContainer);
   }

   
}

customElements.define('slice-about-section', AboutSection);