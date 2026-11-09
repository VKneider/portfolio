import { techExpertiseData } from './data/techExpertise.js';

export default class AboutSection extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);

      this.$hero = this.querySelector('.hero-section');
      this.$heroContent = this.querySelector('.hero-content');
      this.$about = this.querySelector('.about-content');
      this.$currently = this.querySelector('.currently-section');
      this.$outcomes = this.querySelector('.outcomes-section');
      this.$selectedWork = this.querySelector('.selected-work-section');
      this.$skills = this.querySelector('.skills-section');
      this.$values = this.querySelector('.values-section');
      this.$closing = this.querySelector('.about-closing-section');

      this.projects = [];
      this.debuggerProps = [];
   }

   async init() {
      this.AnimationsProvider = slice.getComponent('animations-provider');

      // Set up enhanced hero section
      await this.setupEnhancedHero();

      // El hero debe caber completo en la primera pantalla. Las reglas CSS
      // cubren los tamaños habituales; este auto-fit es la red de seguridad
      // para proporciones extremas (poca altura, zoom de texto, etc.).
      this._fitHeroFrame = null;
      this._fitHero = () => {
         if (this._fitHeroFrame) cancelAnimationFrame(this._fitHeroFrame);
         this._fitHeroFrame = requestAnimationFrame(() => {
            this._fitHeroFrame = null;
            this.fitHeroToViewport();
         });
      };
      window.addEventListener('resize', this._fitHero);
      window.addEventListener('orientationchange', this._fitHero);
      if ('ResizeObserver' in window) {
         this._heroResizeObserver = new ResizeObserver(this._fitHero);
         this._heroResizeObserver.observe(this.$hero);
         if (this.$heroContent) this._heroResizeObserver.observe(this.$heroContent);
      }
      this._fitHero();
      this.fitHeroToViewport();
      if (document.fonts?.ready) {
         document.fonts.ready.then(() => this._fitHero());
      }

      // Create what I do cards
      await this.createEnhancedAboutCards();

      // Create selected work
      await this.loadProjects();
      await this.createSelectedWorkSection();

      // Create toolbox
      await this.createTechnicalSkillsSection();

      // Create beyond-the-code section
      await this.createCarruselSection();

      // Create closing (how I work + contact)
      await this.createClosingSection();

      this.addEventListener('click', (event) => {
         const link = event.target.closest?.('a[data-route]');
         if (!link) return;
         event.preventDefault();
         slice.router.navigate(link.dataset.route);
      });

      // Reveal de las secciones secundarias al hacer scroll.
      // Cada sección entra con un fade + slide-up cuando entra al viewport.
      this.AnimationsProvider.revealOnScroll(
         [this.$about, this.$currently, this.$outcomes, this.$selectedWork, this.$skills, this.$values, this.$closing]
            .filter(section => section instanceof Node),
         { direction: 'up', duration: 700, distance: 40, delayStep: 0 }
      );

      slice.translator.watch(this, async () => {
         if (this.$profileImage) this.$profileImage.alt = slice.t('about.hero.alt');
         this.renderHeroText();
         await this.loadProjects();
         await this.createSelectedWorkSection();
         this.updateToolbox();
      });
   }

   beforeDestroy() {
      if (this._onResize) window.removeEventListener('resize', this._onResize);
      if (this._fitHeroFrame) cancelAnimationFrame(this._fitHeroFrame);
      if (this._fitHero) {
         window.removeEventListener('resize', this._fitHero);
         window.removeEventListener('orientationchange', this._fitHero);
      }
      this._heroResizeObserver?.disconnect();
   }

   async setupEnhancedHero() {
      const heroContent = this.$hero.querySelector('.hero-content');

      // Profile image
      const profileContainer = document.createElement('div');
      profileContainer.classList.add('profile-container');

      const profileImage = document.createElement('img');
      profileImage.src = "https://avatars.githubusercontent.com/u/103617388?v=4";
      profileImage.alt = slice.t('about.hero.alt');
      profileImage.classList.add('profile-image');
      profileContainer.appendChild(profileImage);

      // Brand lockup + identity + dimension tabs
      const heroText = document.createElement('div');
      heroText.classList.add('hero-text');
      heroText.innerHTML = `
         <p class="hero-brand">vkneider.dev</p>
         <div class="title-container">
            <h1>Victor Kneider</h1>
            <div class="title-accent"></div>
         </div>
         <p class="hero-lede"></p>
         <div class="hero-dimensions">
            <div class="hero-tablist" role="tablist"></div>
            <div class="hero-panel" role="tabpanel" id="hero-dimension-panel" tabindex="0">
               <p class="hero-panel-text"></p>
               <a class="hero-panel-link" href="#"></a>
            </div>
         </div>
      `;

      // CTA buttons: contact goes to /contact (the page closes on LinkedIn)
      const ctaButtons = document.createElement('div');
      ctaButtons.classList.add('cta-buttons');

      const contactBtn = await slice.build('Button', {
         value: slice.t.ref('about.cta.contact'),
         customColor: {
            button: 'var(--accent)',
            label: 'var(--on-accent)'
         },
         onClickCallback: () => slice.router.navigate('/contact')
      });
      contactBtn.classList.add('cta-primary');

      const cvBtn = await slice.build('Button', {
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
      cvBtn.classList.add('cta-ghost');

      ctaButtons.appendChild(contactBtn);
      ctaButtons.appendChild(cvBtn);

      // Assemble hero content
      heroContent.appendChild(profileContainer);
      heroContent.appendChild(heroText);
      heroContent.appendChild(ctaButtons);

      // Dimension tabs — Engineering first, all three visible at once.
      this.dimensions = {
         engineering: {
            labelKey: 'about.hero.tabs.engineering.label',
            textKey: 'about.hero.tabs.engineering.text',
            linkKey: 'about.hero.tabs.engineering.link',
            path: '/experience'
         },
         teaching: {
            labelKey: 'about.hero.tabs.teaching.label',
            textKey: 'about.hero.tabs.teaching.text',
            linkKey: 'about.hero.tabs.teaching.link',
            path: '/teaching'
         },
         research: {
            labelKey: 'about.hero.tabs.research.label',
            textKey: 'about.hero.tabs.research.text',
            linkKey: 'about.hero.tabs.research.link',
            path: '/slice-js'
         }
      };
      this.activeDimension = 'engineering';
      this.$tablist = heroText.querySelector('.hero-tablist');
      this.$panel = heroText.querySelector('.hero-panel');
      this.$panelText = heroText.querySelector('.hero-panel-text');
      this.$panelLink = heroText.querySelector('.hero-panel-link');
      this.$lede = heroText.querySelector('.hero-lede');
      this.$tabButtons = [];

      for (const key of Object.keys(this.dimensions)) {
         const tab = document.createElement('button');
         tab.type = 'button';
         tab.className = 'hero-tab';
         tab.id = `hero-tab-${key}`;
         tab.dataset.dimension = key;
         tab.setAttribute('role', 'tab');
         tab.setAttribute('aria-controls', 'hero-dimension-panel');
         tab.addEventListener('click', () => this.activateDimension(key));
         this.$tablist.appendChild(tab);
         this.$tabButtons.push(tab);
      }

      this.$tablist.addEventListener('keydown', (event) => {
         const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];
         if (!keys.includes(event.key)) return;
         event.preventDefault();
         const current = this.$tabButtons.indexOf(document.activeElement);
         let next = current < 0 ? 0 : current;
         if (event.key === 'ArrowRight') next = (next + 1) % this.$tabButtons.length;
         if (event.key === 'ArrowLeft') next = (next - 1 + this.$tabButtons.length) % this.$tabButtons.length;
         if (event.key === 'Home') next = 0;
         if (event.key === 'End') next = this.$tabButtons.length - 1;
         this.activateDimension(this.$tabButtons[next].dataset.dimension, true);
      });

      this.$panelLink.addEventListener('click', (event) => {
         event.preventDefault();
         const path = this.$panelLink.dataset.path;
         if (path) slice.router.navigate(path);
      });

      this.renderHeroText();

      // Animaciones al aparecer
      this.AnimationsProvider.fadeIn(profileContainer, { duration: 900, delay: 100 });
      this.AnimationsProvider.slideInLeft(heroText, { duration: 900, delay: 300 });
      [contactBtn, cvBtn].forEach((btn, idx) => {
         this.AnimationsProvider.fadeIn(btn, { duration: 700, delay: 600 + idx * 120, translateY: ['20px', '0px'] });
      });

      this.$heroText = heroText;
      this.$profileImage = profileImage;
   }

   renderHeroText() {
      if (!this.$tablist || !this.$lede) return;
      this.$tablist.setAttribute('aria-label', slice.t('about.hero.tabs.ariaLabel'));
      this.$lede.textContent = slice.t('about.hero.lede');
      for (const tab of this.$tabButtons) {
         tab.textContent = slice.t(this.dimensions[tab.dataset.dimension].labelKey);
      }
      this.activateDimension(this.activeDimension || 'engineering');
   }

   activateDimension(key, focus = false) {
      const dimension = this.dimensions?.[key];
      if (!dimension) return;
      this.activeDimension = key;
      const order = Object.keys(this.dimensions);
      const activeIndex = order.indexOf(key);

      this.$tabButtons.forEach((tab, index) => {
         const isActive = index === activeIndex;
         tab.classList.toggle('is-active', isActive);
         tab.setAttribute('aria-selected', String(isActive));
         tab.tabIndex = isActive ? 0 : -1;
      });

      const activeTab = this.$tabButtons[activeIndex];
      if (this.$panel && activeTab) this.$panel.setAttribute('aria-labelledby', activeTab.id);
      if (this.$panelText) this.$panelText.textContent = slice.t(dimension.textKey);
      if (this.$panelLink) {
         this.$panelLink.textContent = slice.t(dimension.linkKey);
         this.$panelLink.dataset.path = dimension.path;
         this.$panelLink.href = slice.href(dimension.path);
      }
      if (focus) activeTab?.focus();
      this._fitHero?.();
   }

   /**
    * Garantiza que el contenido del hero quepa dentro de la primera pantalla.
    *
    * La altura del hero es fija (100svh - navbar) y el CSS ya compacta
    * tipografía, foto y espaciados en viewports bajos. Si aun así el contenido
    * natural supera el alto disponible (proporciones extremas o zoom de texto),
    * se escala el bloque completo lo justo para que vuelva a entrar.
    */
   fitHeroToViewport() {
      const hero = this.$hero;
      const content = this.$heroContent;
      if (!hero?.isConnected || !content?.isConnected) return;

      // Medimos siempre sin la escala aplicada (offsetHeight ya ignora
      // transforms, pero el reset mantiene la intención explícita).
      content.style.removeProperty('--hero-fit-scale');

      const heroStyle = getComputedStyle(hero);
      const verticalPadding =
         parseFloat(heroStyle.paddingTop) + parseFloat(heroStyle.paddingBottom);
      const available = hero.clientHeight - verticalPadding;
      const needed = content.offsetHeight;

      if (available <= 2 || needed <= 0) return;

      if (needed > available) {
         // El suelo de 0.35 evita que un caso absurdamente pequeño deje el
         // texto ilegible; por debajo de eso ya no hay diseño posible.
         const scale = Math.max(0.35, (available - 1) / needed);
         content.style.setProperty('--hero-fit-scale', scale.toFixed(3));
      }
   }

   async createEnhancedAboutCards() {
      const aboutTitle = await slice.build('SectionTitle', { text: slice.t.ref('about.sections.whatIDo') });
      this.$about.appendChild(aboutTitle);

      // La Card actual de la librería usa la anatomía media → header → body.
      // El icono se resuelve con el componente Icon del portfolio.
      const aboutData = [
         {
            title: slice.t.ref('about.cards.engineering.title'),
            text: slice.t.ref('about.cards.engineering.text'),
            headerIcon: { name: 'cloud-arrow-up', color: 'var(--on-accent)', iconStyle: 'outlined' },
            path: '/experience'
         },
         {
            title: slice.t.ref('about.cards.teaching.title'),
            text: slice.t.ref('about.cards.teaching.text'),
            headerIcon: { name: 'book-open', color: 'var(--on-accent)', iconStyle: 'outlined' },
            path: '/teaching'
         },
         {
            title: slice.t.ref('about.cards.research.title'),
            text: slice.t.ref('about.cards.research.text'),
            headerIcon: { name: 'wand-magic-sparkles', color: 'var(--on-accent)', iconStyle: 'outlined' },
            path: '/slice-js'
         }
      ];

      const grid = await slice.build('Grid', {
         columns: 3,
         rows: 1,
         centerItems: false
      });

      for (const cardData of aboutData) {
         const aboutCard = await slice.build('Card', {
            title: cardData.title,
            text: cardData.text,
            headerIcon: cardData.headerIcon,
            variant: 'elevated',
            size: 'lg',
            headingLevel: 3,
            onClick: () => slice.router.navigate(cardData.path)
         });

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
      this.AnimationsProvider.revealOnScroll(grid.querySelectorAll('slice-card'), {
         direction: 'left',
         delayStep: 180,
         duration: 700,
         distance: 30
      });
   }

   async loadProjects() {
      const document = await slice.t.content('projects');
      this.projects = Array.isArray(document?.records) ? document.records : [];
   }

   async createSelectedWorkSection() {
      if (!this.$selectedWork) return;

      slice.controller.destroyByContainer(this.$selectedWork);
      this.$selectedWork.innerHTML = '';

      const projects = [...this.projects]
         .sort((a, b) => (a.order || 0) - (b.order || 0))
         .slice(0, 3);

      if (!projects.length) return;

      const list = await slice.build('SelectedWork', { projects });

      if (list) this.$selectedWork.appendChild(list);
   }

   getSkillsData() {
      return techExpertiseData.map((group) => ({
         ...group,
         category: slice.t(`about.tech.${group.key}`),
         summary: slice.t(`about.tech.summary.${group.key}`)
      }));
   }

   async createTechnicalSkillsSection() {
      const title = await slice.build('SectionTitle', { text: slice.t.ref('about.sections.skills') });
      if (title) this.$skills.appendChild(title);

      const subtitle = document.createElement('p');
      subtitle.className = 'about-skills-subtitle';
      subtitle.textContent = slice.t('about.sections.skillsSubtitle');
      this.$skills.appendChild(subtitle);

      this.$toolboxSpec = await slice.build('ToolboxSpec', {
         groups: this.getSkillsData()
      });

      if (!this.$toolboxSpec) {
         console.error('Error: ToolboxSpec component not built correctly');
         return;
      }

      this.$skills.appendChild(this.$toolboxSpec);
   }

   updateToolbox() {
      const subtitle = this.$skills?.querySelector('.about-skills-subtitle');
      if (subtitle) subtitle.textContent = slice.t('about.sections.skillsSubtitle');
      if (this.$toolboxSpec) this.$toolboxSpec.groups = this.getSkillsData();
   }

   async createClosingSection() {
      if (!this.$closing) return;

      slice.controller.destroyByContainer(this.$closing);
      this.$closing.innerHTML = '';

      const closing = await slice.build('AboutClosing');
      if (closing) this.$closing.appendChild(closing);
   }

   async createCarruselSection() {
      const valuesTitle = await slice.build('SectionTitle', { text: slice.t.ref('about.sections.beyond') });

      // Contenedor principal con grid 60/40
      const mainContainer = document.createElement('div');
      mainContainer.classList.add('journey-container');

      // Carrusel de imágenes
      const carouselSection = document.createElement('div');
      carouselSection.classList.add('carousel-section');

      const carousel = await slice.build('ImageCarrousel', {
         images: [
            {
               url: '/images/aboutSection/docencia-uru.jpg',
               label: slice.t.ref('about.carousel.teaching.label'),
               date: slice.t.ref('about.carousel.teaching.date'),
               alt: slice.t.ref('about.carousel.teaching.alt')
            },
            {
               url: '/images/aboutSection/defensa-tesis-uru.jpg',
               label: slice.t.ref('about.carousel.thesis.label'),
               date: slice.t.ref('about.carousel.thesis.date'),
               alt: slice.t.ref('about.carousel.thesis.alt')
            },
            {
               url: '/images/aboutSection/clase-ia-uru.jpg',
               label: slice.t.ref('about.carousel.aiFaculty.label'),
               date: slice.t.ref('about.carousel.aiFaculty.date'),
               alt: slice.t.ref('about.carousel.aiFaculty.alt')
            },
            {
               url: '/images/aboutSection/estudiantes.jpeg',
               label: slice.t.ref('about.carousel.showcase.label'),
               date: slice.t.ref('about.carousel.showcase.date'),
               alt: slice.t.ref('about.carousel.showcase.alt')
            },
            {
               url: '/images/aboutSection/firma.jpeg',
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
         { number: '120+', key: 'students' },
         { number: '1', key: 'papers' },
         { number: '1', key: 'framework' },
      ];

      stats.forEach(stat => {
         const statItem = document.createElement('div');
         statItem.classList.add('stat-item');

         const number = document.createElement('div');
         number.classList.add('stat-number');
         number.textContent = stat.number;

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
}

customElements.define('slice-about-section', AboutSection);
