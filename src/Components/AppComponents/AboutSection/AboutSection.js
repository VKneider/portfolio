export default class AboutSection extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);

      this.$hero = this.querySelector('.hero-section');
      this.$about = this.querySelector('.about-content');
      this.$skills = this.querySelector('.skills-section');
      this.$values = this.querySelector('.values-section');
      this.$interests = this.querySelector('.interests-section');
      this.$teaching = this.querySelector('.teaching-section');

      this.$randomFacts = this.querySelector('.random-facts-section');
      this.debuggerProps = [];
   }

   async init() {
      this.AnimationsProvider = slice.getComponent('animations-provider');
      console.log('AnimationsProvider instance in AboutSection:', this.AnimationsProvider);

      // Set up enhanced hero section
      await this.setupEnhancedHero();

      // Create enhanced about content cards
      await this.createEnhancedAboutCards();

      // Create technical skills section
      await this.createTechnicalSkillsSection();

      // Create values section
      await this.createCarruselSection();

      // Create random facts section
      await this.createRandomFactsSection();

      // Reveal de las secciones secundarias al hacer scroll.
      // Cada sección entra con un fade + slide-up cuando entra al viewport.
      this.AnimationsProvider.revealOnScroll(
         [this.$about, this.$skills, this.$values, this.$interests, this.$teaching, this.$randomFacts]
            .filter(section => section instanceof Node),
         { direction: 'up', duration: 700, distance: 40, delayStep: 0 }
      );

      slice.translator.watch(this, () => {
         if (this.$profileImage) this.$profileImage.alt = slice.t('about.hero.alt');
         this.AnimationsProvider.stopSwitcher('roleSwitcher');
         this.AnimationsProvider.roleSwitcher(
            this.$heroText?.querySelector('.role-switcher'),
            slice.t.list('about.hero.roles'),
            { interval: 3000 }
         );
      });
   }

   beforeDestroy() {
      if (this._onResize) window.removeEventListener('resize', this._onResize);
      this.AnimationsProvider?.stopSwitcher('roleSwitcher');
      this.AnimationsProvider?.stopSwitcher('brandSwitcher');
   }

   async setupEnhancedHero() {
      const heroContent = this.$hero.querySelector('.hero-content');

      // Profile image with enhanced styling
      const profileContainer = document.createElement('div');
      profileContainer.classList.add('profile-container');

      const profileImage = document.createElement('img');
      profileImage.src = "https://avatars.githubusercontent.com/u/103617388?v=4";
      profileImage.alt = slice.t('about.hero.alt');
      profileImage.classList.add('profile-image');

      profileContainer.appendChild(profileImage);

      // Hero text — el <h1> alterna entre "Victor Kneider" y "vkneider.dev",
      // y debajo el role-switcher cicla los roles profesionales.
      const heroText = document.createElement('div');
      heroText.classList.add('hero-text');
      heroText.innerHTML = `
         <div class="title-container">
            <h1>
               <span class="brand-switcher">Victor Kneider</span>
            </h1>
            <div class="title-accent"></div>
         </div>
         <div class="roles-container">
            <h2 class="role-title">
               <span class="role-switcher">${slice.t.list('about.hero.roles')[0] || ''}</span>
            </h2>
         </div>
          <p class="hero-description" data-t="about.hero.description"></p>
      `;

       // Enhanced CTA Buttons
       const ctaButtons = document.createElement('div');
       ctaButtons.classList.add('cta-buttons');

       // Skill §3 3.5 caso 2: solo 2 estilos de botón (primary + ghost).
       // Los dos CTA principales representan contacto profesional y CV.
       const contactBtn = await slice.build('Button', {
          value: slice.t.ref('about.cta.contact'),
          customColor: {
             button: 'var(--accent)',
             label: 'var(--on-accent)'
          },
          onClickCallback: () => {
             window.open('https://www.linkedin.com/in/vkneider/', '_blank', 'noopener,noreferrer');
          }
       });
       contactBtn.classList.add('cta-primary');

       const projectsBtn = await slice.build('Button', {
          value: slice.t.ref('about.cta.cv'),
          customColor: {
             button: 'transparent',
             label: 'var(--text-1)'
          },
          onClickCallback: () => {
             const file = slice.locale === 'es' ? 'Victor_Kneider_CV_es.pdf' : 'Victor_Kneider_CV_en.pdf';
             window.open(`https://vkneider.dev/cv/${file}`, '_blank', 'noopener,noreferrer');
          }
       });

       projectsBtn.classList.add('cta-ghost');

       ctaButtons.appendChild(contactBtn);
       ctaButtons.appendChild(projectsBtn);

      // Assemble hero content
      heroContent.appendChild(profileContainer);
      heroContent.appendChild(heroText);
      heroContent.appendChild(ctaButtons);

      // Animaciones al aparecer
      this.AnimationsProvider.fadeIn(profileContainer, { duration: 900, delay: 100 });
      this.AnimationsProvider.slideInLeft(heroText, { duration: 900, delay: 300 });

      // Animar los botones de CTA
       [contactBtn, projectsBtn].forEach((btn, idx) => {
         this.AnimationsProvider.fadeIn(btn, { duration: 700, delay: 600 + idx * 120, translateY: ['20px', '0px'] });
      });

      // Brand switcher: alterna "Victor Kneider" ↔ "vkneider.dev" cada 4s,
      // con el sufijo ".dev" en color secundario (firma visual del manual de marca).
      this.AnimationsProvider.brandSwitcher(
         heroText.querySelector('.brand-switcher'),
         {
            personal: 'Victor Kneider',
            brand: 'vkneider.dev',
            suffix: '.dev',
            suffixClass: 'dev-suffix',
            interval: 4000
         }
      );

      // Role switcher: cicla los roles profesionales cada 3s.
      this.$heroText = heroText;
      this.$profileImage = profileImage;
      const roles = slice.t.list('about.hero.roles');
      this.AnimationsProvider.roleSwitcher(
         heroText.querySelector('.role-switcher'),
         roles,
         { interval: 3000 }
      );
   }

   async createEnhancedAboutCards() {
      const aboutTitle = await slice.build('SectionTitle', { text: slice.t.ref('about.sections.about') });
      this.$about.appendChild(aboutTitle);

      // Skill §3 3.3 r.1 + §3 4.5: cards en surface-1, sin emojis/slice-icons.
      // Iconos Lucide inline (única biblioteca permitida por la marca).
      const cardSurface = { card: 'var(--surface-1)' };

      // Lucide path data — stroke 2, viewBox 0 0 24 24.
      const lucide = {
         cloud:    '<path d="M17.5 19a4.5 4.5 0 1 0 0-9h-1.8A7 7 0 1 0 9 19h8.5Z"/>',
         book:     '<path d="M22 9 12 5 2 9l10 4 10-4v6"/><path d="M6 10.6V16a6 3 0 0 0 12 0v-5.4"/>',
         sparkles: '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>'
      };

      const aboutData = [
         {
            title: slice.t.ref('about.cards.engineering.title'),
            text: slice.t.ref('about.cards.engineering.text'),
            lucide: lucide.cloud,
            customColor: cardSurface
         },
         {
            title: slice.t.ref('about.cards.teaching.title'),
            text: slice.t.ref('about.cards.teaching.text'),
            lucide: lucide.book,
            customColor: cardSurface
         },
         {
            title: slice.t.ref('about.cards.research.title'),
            text: slice.t.ref('about.cards.research.text'),
            lucide: lucide.sparkles,
            customColor: cardSurface
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
            customColor: cardData.customColor,
         });

         // Inyectar Lucide SVG en card-media-content (reemplaza al slice-icon default).
         const mediaContent = aboutCard.querySelector('.card-media-content');
         if (mediaContent) {
            mediaContent.innerHTML = `
               <svg class="card-lucide-icon" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"
                    aria-hidden="true">${cardData.lucide}</svg>
            `;
         }
         const media = aboutCard.querySelector('.card-media');
         if (media) media.style.display = 'flex';

         await grid.setItem(aboutCard);
      }

      // Make responsive for mobile
      this._onResize = () => {
         if (window.innerWidth <= 768) {
            grid.columns = 1;
            grid.rows = 3;
         } else {
            grid.columns = 3;
            grid.rows = 1;
         }
      };
      window.addEventListener('resize', this._onResize);

      if (window.innerWidth <= 768) {
         grid.columns = 1;
         grid.rows = 3;
      }

      this.$about.appendChild(grid);

      // Stagger de las tres cards al entrar al viewport (entrada en cascada).
      this.AnimationsProvider.revealOnScroll(grid.querySelectorAll('.card'), {
         direction: 'left',
         delayStep: 180,
         duration: 700,
         distance: 30
      });
   }

   async createTechnicalSkillsSection() {
      const techExpertise = await slice.build('TechExpertise', {
         title: slice.t.ref('about.sections.skills'),
         subtitle: slice.t.ref('about.sections.skillsSubtitle'),
         marqueeSpeed: 15
      });

      if (techExpertise && this.$skills) {
         this.$skills.appendChild(techExpertise);
      } else {
         console.error('Error: TechExpertise component not built correctly');
      }
   }

   async createCarruselSection() {
      const valuesTitle = await slice.build('SectionTitle', { text: slice.t.ref('about.sections.journey') });

      // Contenedor principal con grid 60/40
      const mainContainer = document.createElement('div');
      mainContainer.classList.add('journey-container');

      // Carrusel de imágenes
      const carouselSection = document.createElement('div');
      carouselSection.classList.add('carousel-section');

      const carousel = await slice.build('ImageCarrousel', {
         images: [
            {
               url: './images/aboutSection/estudiantes.jpeg',
               label: slice.t.ref('about.carousel.showcase.label'),
               date: slice.t.ref('about.carousel.showcase.date'),
               alt: slice.t.ref('about.carousel.showcase.alt')
            },
            {
               url: './images/aboutSection/firma.jpeg',
               label: slice.t.ref('about.carousel.graduation.label'),
               date: slice.t.ref('about.carousel.graduation.date'),
               alt: slice.t.ref('about.carousel.graduation.alt')
            }
         ],
         autoplay: true,
         autoplaySpeed: 4000,
         showIndicators: true,
         showNavigation: true
      });

      carouselSection.appendChild(carousel);

      // Footer del carrusel con estadísticas
      const carouselFooter = document.createElement('div');
      carouselFooter.classList.add('carousel-footer');

      const statsContainer = document.createElement('div');
      statsContainer.classList.add('stats-container');

      const stats = [
         { number: '4+', key: 'years' },
         { number: '10+', key: 'projects' },
         { number: '120+', key: 'students' },
         { number: '1', key: 'framework' },
         { number: '100+', key: 'features' },
         { number: '0', key: 'refactors' },
         { number: 'Early', key: 'adoption' },
         { number: '∞', key: 'logs' },
      ];

      stats.forEach(stat => {
         const statItem = document.createElement('div');
         statItem.classList.add('stat-item');

         const number = document.createElement('div');
         number.classList.add('stat-number');
         if (stat.key === 'adoption') {
            number.dataset.t = 'about.stats.adoption.number';
         } else {
            number.textContent = stat.number;
         }

         const label = document.createElement('div');
         label.classList.add('stat-label');
         label.dataset.t = `about.stats.${stat.key}.label`;

         statItem.appendChild(number);
         statItem.appendChild(label);
         statsContainer.appendChild(statItem);
      });

      carouselFooter.appendChild(statsContainer);
      carouselSection.appendChild(carouselFooter);

      // Sección de texto (40%)
      const textSection = document.createElement('div');
      textSection.classList.add('text-section');

      const personalTitle = document.createElement('h3');
      personalTitle.classList.add('personal-title');
      personalTitle.dataset.t = 'about.journey.title';

      const personalDescription = document.createElement('p');
      personalDescription.classList.add('personal-description');
      personalDescription.dataset.t = 'about.journey.description';

      const highlightsList = document.createElement('div');
      highlightsList.classList.add('highlights-list');

      // Skill §3 4.5: la marca no usa emojis. Cada highlight se numera en mono (§3 3.2 G).
      const highlights = [
         { key: 'community' },
         { key: 'openSource' },
         { key: 'knowledge' },
         { key: 'mentorship' }
      ];

      highlights.forEach((highlight, index) => {
         const highlightItem = document.createElement('div');
         highlightItem.classList.add('highlight-item');

         const num = String(index + 1).padStart(2, '0');
         highlightItem.innerHTML = `
            <div class="highlight-num">${num}</div>
            <div class="highlight-content">
               <h4 class="highlight-title" data-t="about.highlights.${highlight.key}.title"></h4>
               <p class="highlight-description" data-t="about.highlights.${highlight.key}.description"></p>
            </div>
         `;

         highlightsList.appendChild(highlightItem);
      });

      textSection.appendChild(personalTitle);
      textSection.appendChild(personalDescription);
      textSection.appendChild(highlightsList);

      mainContainer.appendChild(carouselSection);
      mainContainer.appendChild(textSection);

      this.$values.appendChild(valuesTitle);
      this.$values.appendChild(mainContainer);

      // Stagger de stats al hacer scroll: cada stat entra con 60ms de delay
      this.AnimationsProvider.revealOnScroll(statsContainer.querySelectorAll('.stat-item'), {
         direction: 'up',
         delayStep: 60,
         duration: 500,
         distance: 20
      });

      // Stagger de highlights al hacer scroll: cada highlight entra con 100ms de delay
      this.AnimationsProvider.revealOnScroll(highlightsList.querySelectorAll('.highlight-item'), {
         direction: 'right',
         delayStep: 100,
         duration: 600,
         distance: 30
      });
   }

   async createRandomFactsSection() {
      const randomFacts = await slice.build('RandomFacts', {});

      if (randomFacts && this.$randomFacts) {
         this.$randomFacts.appendChild(randomFacts);
      } else {
         console.error('Error: RandomFacts component not built correctly');
      }
   }
}

customElements.define('slice-about-section', AboutSection);
