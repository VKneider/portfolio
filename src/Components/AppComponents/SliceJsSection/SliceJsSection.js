export default class SliceJsSection extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);
      
      this.$hero = this.querySelector('.slicejs-hero');
      this.$features = this.querySelector('.slicejs-features');
      this.$showcase = this.querySelector('.slicejs-showcase');
      this.$stats = this.querySelector('.slicejs-stats');
      this.$roadmap = this.querySelector('.slicejs-roadmap');
      
      slice.controller.setComponentProps(this, props);
      this.debuggerProps = [];
   }

   async init() {
      await this.createHeroSection();
      await this.createFeaturesSection();
      await this.createShowcaseSection();
      await this.createStatsSection();
      await this.createRoadmapSection();
   }

   async createHeroSection() {
      const heroContent = document.createElement('div');
      heroContent.classList.add('hero-content');

      // Logo and branding
      const logoContainer = document.createElement('div');
      logoContainer.classList.add('logo-container');
      
      const logo = document.createElement('img');
      logo.src = '/images/Slice.js-logo.png';
      logo.alt = 'Slice.js Framework Logo';
      logo.classList.add('slicejs-logo');
      
      logoContainer.appendChild(logo);

      // Main content
      const mainContent = document.createElement('div');
      mainContent.classList.add('hero-main-content');
      mainContent.innerHTML = `
         <h1>Slice.js Framework</h1>
         <h2>Build Your Web App One Slice at a Time</h2>
         <p class="hero-description">
            A modern, lightweight component-based framework for building web applications 
            using vanilla JavaScript and web standards. Created to simplify development 
            while maintaining performance and flexibility.
         </p>
      `;

      // CTA Buttons
      const ctaButtons = document.createElement('div');
      ctaButtons.classList.add('cta-buttons');
      
      const githubBtn = await slice.build('Button', {
         value: 'View on GitHub',
         customColor: {
            button: 'var(--primary-color)',
            label: 'var(--primary-color-contrast)'
         },
         onClickCallback: () => {
            window.open('https://github.com/victorkneider/slice-js', '_blank');
         }
      });

      const docsBtn = await slice.build('Button', {
         value: 'Documentation',
         customColor: {
            button: 'var(--secondary-color)',
            label: 'var(--secondary-color-contrast)'
         },
         onClickCallback: () => {
            window.open('https://slice-js-docs.vercel.app', '_blank');
         }
      });

      const demoBtn = await slice.build('Button', {
         value: 'Live Demo',
         customColor: {
            button: 'var(--success-color)',
            label: 'var(--success-contrast)'
         },
         onClickCallback: () => {
            window.open('https://slice-js-demo.vercel.app', '_blank');
         }
      });

      ctaButtons.appendChild(githubBtn);
      ctaButtons.appendChild(docsBtn);
      ctaButtons.appendChild(demoBtn);

      heroContent.appendChild(logoContainer);
      heroContent.appendChild(mainContent);
      heroContent.appendChild(ctaButtons);
      
      this.$hero.appendChild(heroContent);
   }

   async createFeaturesSection() {
      const sectionTitle = document.createElement('h2');
      sectionTitle.textContent = 'Key Features';
      sectionTitle.classList.add('section-title');

      const featuresData = [
         {
            title: 'Component-Based Architecture',
            description: 'Build reusable components using Web Components API with encapsulated logic and styling.',
            icon: '🧩'
         },
         {
            title: 'Zero Dependencies',
            description: 'Pure vanilla JavaScript with no external dependencies. Lightweight and fast.',
            icon: '⚡'
         },
         {
            title: 'Modern Routing',
            description: 'Powerful routing system with support for nested routes and parameters.',
            icon: '🛣️'
         },
         {
            title: 'Theme System',
            description: 'Built-in theming with CSS variables and easy customization.',
            icon: '🎨'
         },
         {
            title: 'Developer Tools',
            description: 'Integrated debugging, logging, and development tools for better DX.',
            icon: '🔧'
         },
         {
            title: 'TypeScript Ready',
            description: 'Full TypeScript support with type definitions included.',
            icon: '📝'
         }
      ];

      const featuresGrid = document.createElement('div');
      featuresGrid.classList.add('features-grid');

      featuresData.forEach(feature => {
         const featureCard = document.createElement('div');
         featureCard.classList.add('feature-card');
         featureCard.innerHTML = `
            <div class="feature-icon">${feature.icon}</div>
            <h3 class="feature-title">${feature.title}</h3>
            <p class="feature-description">${feature.description}</p>
         `;
         featuresGrid.appendChild(featureCard);
      });

      this.$features.appendChild(sectionTitle);
      this.$features.appendChild(featuresGrid);
   }

   async createShowcaseSection() {
      const sectionTitle = document.createElement('h2');
      sectionTitle.textContent = 'Code Example';
      sectionTitle.classList.add('section-title');

      const showcaseContent = document.createElement('div');
      showcaseContent.classList.add('showcase-content');

      // Code example
      const codeExample = await slice.build('CodeVisualizer', {
         language: 'javascript',
         value: `// Create a new component
export default class MyComponent extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);
      slice.controller.setComponentProps(this, props);
   }

   async init() {
      // Component initialization logic
      this.setupEventListeners();
   }

   setupEventListeners() {
      this.querySelector('.my-button').addEventListener('click', () => {
         console.log('Button clicked!');
      });
   }
}

customElements.define('slice-my-component', MyComponent);

// Use the component
const myComponent = await slice.build('MyComponent', {
   title: 'Hello World',
   onClick: () => console.log('Clicked!')
});

document.body.appendChild(myComponent);`
      });

      // Features list
      const featuresList = document.createElement('div');
      featuresList.classList.add('features-list');
      featuresList.innerHTML = `
         <h3>What makes Slice.js special:</h3>
         <ul>
            <li>✅ Simple and intuitive API</li>
            <li>✅ Automatic template attachment</li>
            <li>✅ Built-in property management</li>
            <li>✅ Component lifecycle hooks</li>
            <li>✅ Integrated styling system</li>
            <li>✅ Easy state management</li>
         </ul>
      `;

      showcaseContent.appendChild(codeExample);
      showcaseContent.appendChild(featuresList);

      this.$showcase.appendChild(sectionTitle);
      this.$showcase.appendChild(showcaseContent);
   }

   async createStatsSection() {
      const sectionTitle = document.createElement('h2');
      sectionTitle.textContent = 'Project Statistics';
      sectionTitle.classList.add('section-title');

      const statsData = [
         { label: 'GitHub Stars', value: '1.2k+', icon: '⭐' },
         { label: 'Weekly Downloads', value: '500+', icon: '📦' },
         { label: 'Bundle Size', value: '<50KB', icon: '📏' },
         { label: 'Browser Support', value: '98%+', icon: '🌐' },
         { label: 'Projects Using', value: '25+', icon: '🚀' },
         { label: 'Contributors', value: '8', icon: '👥' }
      ];

      const statsGrid = document.createElement('div');
      statsGrid.classList.add('stats-grid');

      statsData.forEach(stat => {
         const statCard = document.createElement('div');
         statCard.classList.add('stat-card');
         statCard.innerHTML = `
            <div class="stat-icon">${stat.icon}</div>
            <div class="stat-value">${stat.value}</div>
            <div class="stat-label">${stat.label}</div>
         `;
         statsGrid.appendChild(statCard);
      });

      this.$stats.appendChild(sectionTitle);
      this.$stats.appendChild(statsGrid);
   }

   async createRoadmapSection() {
      const sectionTitle = document.createElement('h2');
      sectionTitle.textContent = 'Roadmap';
      sectionTitle.classList.add('section-title');

      const roadmapData = [
         {
            version: 'v2.1',
            status: 'completed',
            title: 'Enhanced Component System',
            description: 'Improved component lifecycle and better error handling.',
            date: 'Q4 2024'
         },
         {
            version: 'v2.2',
            status: 'in-progress',
            title: 'Advanced Routing',
            description: 'Nested routes, route guards, and lazy loading support.',
            date: 'Q1 2025'
         },
         {
            version: 'v2.3',
            status: 'planned',
            title: 'CLI Improvements',
            description: 'Enhanced CLI tools with better scaffolding and testing utilities.',
            date: 'Q2 2025'
         },
         {
            version: 'v3.0',
            status: 'planned',
            title: 'Performance Optimizations',
            description: 'Virtual DOM implementation and server-side rendering support.',
            date: 'Q3 2025'
         }
      ];

      const roadmapContainer = document.createElement('div');
      roadmapContainer.classList.add('roadmap-container');

      roadmapData.forEach((item, index) => {
         const roadmapItem = document.createElement('div');
         roadmapItem.classList.add('roadmap-item', `status-${item.status}`);
         roadmapItem.style.animationDelay = `${index * 0.1}s`;
         
         roadmapItem.innerHTML = `
            <div class="roadmap-header">
               <span class="version-badge">${item.version}</span>
               <span class="status-badge">${item.status.replace('-', ' ')}</span>
               <span class="date-badge">${item.date}</span>
            </div>
            <h3 class="roadmap-title">${item.title}</h3>
            <p class="roadmap-description">${item.description}</p>
         `;
         
         roadmapContainer.appendChild(roadmapItem);
      });

      this.$roadmap.appendChild(sectionTitle);
      this.$roadmap.appendChild(roadmapContainer);
   }
}

customElements.define('slice-slicejs-section', SliceJsSection);