/**
 * Slice.js Bundle
 * Type: route
 * Generated: 2026-04-04T18:21:00.004Z
 * Strategy: hybrid
 * Components: 26
 * Total Size: 1753.8 KB
 */

const SLICE_BUNDLE_DEPENDENCIES = {};
// Dependency: Components/AtomicAppComponents/TechExpertise/data.js
const __sliceDepExports0 = {};
__sliceDepExports0.techExpertiseData = [
         { 
            category: 'Frontend', 
            color: 'var(--primary-color)',
            skills: ['HTML5', 'CSS3','JavaScript','TypeScript', 'React', "Shadcn",'NextJs' ,'Slice.js', 'Chakra UI', 'Tailwind CSS', 'Web Components']
            // ELIMINADO: level: 'Expert'
         },
         { 
            category: 'Backend', 
            color: 'var(--secondary-color)',
            skills: ['Node.js', 'Express', 'Python', 'FastAPI', "Restful", "GRPC", "TRPC", "Uvicorn", "Gunicorn", "Workers"]
         },
         { 
            category: 'Cloud & Environments', 
            color: 'var(--success-color)',
            skills: ['Azure', 'PostgreSQL', 'MongoDB', 'Docker', 'Redis']
         },
         { 
            category: 'AI & Modern Tools', 
            color: 'var(--warning-color)',
            skills: ['MCP Use & Development', 'Claude Code', 'Cursor', 'GenAI', 'Prompt Engineering']
         },
         { 
            category: 'Other', 
            color: 'var(--danger-color)',
            skills: ['SSH', 'Linux', 'Putty', 'CI/CD', 'Pull Requests', 'Makefiles']
         }
      ];
SLICE_BUNDLE_DEPENDENCIES["Components/AtomicAppComponents/TechExpertise/data.js"] = __sliceDepExports0;
// Dependency: Components/AtomicAppComponents/RandomFacts/data.js
const __sliceDepExports1 = {};
const factsData = [
    { text: "I save JWTs in HttpOnly cookies", type: "tech", rotation: -5 },
    { text: "I treat warnings like errors (lots of try catch)", type: "personal", rotation: 4 },
    { text: "I actually read the documentation (context7 jk)", type: "personal", rotation: -4 },
    { text: "Div centering is (not) my superpower", type: "fun", rotation: 2 },
    { text: "I prefer const over let", type: "tech", rotation: 5 },
    { text: "Works on my machine (and yours)", type: "fun", rotation: -3 },
    { text: "Yes, the bug was a missing semicolon", type: "fun", rotation: -2 },
    { text: "Component architecture everywhere", type: "tech", rotation: -4 },
    { text: "Teaching code means teaching thinking", type: "personal", rotation: 1 },
    { text: "All of this is built with Slice.js", type: "tech", rotation: 3 },
    { text: "I speak english, spanish, some germand and arabic", type: "personal", rotation: -1 },
    { text: "In love with my coffee machine", type: "personal", rotation: 4 },
    {text: "Numpad keyboards are life", type: "fun", rotation: -5 },
    {text: "Do you have the light theme? are you ok?", type: "fun", rotation: -5 },
    


];



__sliceDepExports1.dataData = factsData;
SLICE_BUNDLE_DEPENDENCIES["Components/AtomicAppComponents/RandomFacts/data.js"] = __sliceDepExports1;
// Dependency: Components/AppComponents/ExperienceSection/data.js
const __sliceDepExports2 = {};
const experienceData = [
  /*
  {
    id: 1,
    company: 'Automation Labs',
    position: 'Full Stack Engineer & Cloud Specialist',
    logo: '/images/companies/cloud.png',
    period: '2025 - Present',
    type: 'Full-time',
    location: 'Remote',
    description:
      'Remote engineer architecting robust full-stack solutions on Azure. Specializing in high-performance backends using FastAPI/Fastify and process automation, while leveraging MCP and Generative AI for accelerated development.',
    responsibilities: [
      'Develop scalable backend services using FastAPI, Fastify, and Express',
      'Configure production-grade servers with Uvicorn/Gunicorn and Cloud Workers',
      'Design and implement cloud infrastructure solutions on Azure',
      'Integrate Model Context Protocol (MCP) in development workflows',
      'Utilize advanced AI coding assistants (Claude Code, Cursor) for rapid development'
    ],
    technologies: ['Azure', 'FastAPI', 'Fastify', 'Express', 'Uvicorn', 'MCP', 'Python', 'Node.js'],
    achievements: [
      'Accelerated delivery timelines using AI-assisted development',
      'Architected reliable cloud automation systems on Azure',
      'Built high-performance APIs utilizing modern ASGI/WSGI servers'
    ]
  },
  */
  {
    id: 2,
    company: 'Universidad Rafael Urdaneta (URU)',
    position: 'Computer Engineer Professor',
    logo: '/images/uru-logo-seo.png',
    period: '2024 - Present',
    type: 'Full-time',
    location: 'Maracaibo, Venezuela',
    description:
      'University professor in computer engineering programs. Teaching software development, web programming, and supervising undergraduate thesis projects. Focused on modern web technologies and active learning methodologies.',
    responsibilities: [
      'Teach Programming I, Programming II, Component-Based Programming, and Web Client Languages',
      'Develop and maintain academic tools using Node.js and PostgreSQL',
      'Create responsive frontend projects for academic and research purposes',
      'Supervise student projects and implement active learning methodologies',
      'Research and development of Slice.js web framework'
    ],
    technologies: ['JavaScript', 'Web Components', 'Node.js', 'PostgreSQL', 'HTML5', 'CSS3', 'Slice.js'],
    achievements: [
      'Slice.js framework adopted in multiple academic and personal projects',
      'Streamlined course content delivery with reusable code repositories',
      'Implemented modern web development practices in curriculum'
    ]
  },
  {
    id: 3,
    company: 'Polipopileno de Venezuela (PROPILVEN S.A.)',
    position: 'Computer Engineer - AIT Department Internship',
    logo: '/images/companies/propilven.png',
    period: '2023',
    type: 'Internship',
    location: 'Venezuela',
    description:
      'Internship in the Information and Technology Department, working on automation systems and software solutions for industrial processes.',
    responsibilities: [
      'Developed and maintained automation software systems',
      'Assisted in IT infrastructure management and troubleshooting',
      'Created documentation for technical processes and procedures',
      'Participated in system analysis and optimization projects'
    ],
    technologies: ['Python', 'SQL', 'Windows Server', 'Industrial Automation', 'System Administration'],
    achievements: [
      'Successfully completed 6-month internship program',
      'Contributed to process automation improvements',
      'Gained valuable experience in industrial IT environments'
    ]
  },
  {
    id: 4,
    company: 'Freelance / Personal Projects',
    position: 'Full-Stack Developer & Framework Creator',
    logo: '/images/companies/freelance.png',
    period: '2020 - Present',
    type: 'Self-employed',
    location: 'Remote',
    description:
      'Creator and maintainer of Slice.js web framework. Developing innovative web solutions and contributing to open-source projects.',
    responsibilities: [
      'Design and develop Slice.js web framework architecture',
      'Create responsive web applications using modern JavaScript',
      'Develop educational tools and games for academic use',
      'Maintain open-source repositories and documentation',
      'Research and implement new web technologies and patterns'
    ],
    technologies: ['JavaScript', 'Node.js', 'Express', 'HTML5', 'CSS3', 'Git', 'Web Components', 'MongoDB'],
    achievements: [
      'Created Slice.js - component-based web framework',
      'Built various educational and entertainment web applications',
      'Active contributor to the developer community through open source'
    ]
  }
];

__sliceDepExports2.dataData = experienceData;
SLICE_BUNDLE_DEPENDENCIES["Components/AppComponents/ExperienceSection/data.js"] = __sliceDepExports2;
// Dependency: Components/AppComponents/EducationSection/data.js
const __sliceDepExports3 = {};
__sliceDepExports3.studiesData = [
  {
  id: 1,
  institution: 'Universidad Rafael Urdaneta (URU)',
  degree: 'Computer Engineering',
  period: '2020 - 2024',
  location: 'Maracaibo, Venezuela',
  description: 'Bachelor\'s degree in Computer Engineering with focus on software development, algorithms, data structures, and system design. Graduated Magna Cum Laude with academic honors.',
  achievements: [
    'Graduated Magna Cum Laude with academic honors',
    'Maintained excellent academic performance throughout the program',
    'Developed expertise in modern web technologies and framework development',
    'Created Slice.js framework as part of academic and research work',
    'Recognized for outstanding academic achievement and technical innovation'
  ],
  coursework: [
    'Programming Fundamentals',
    'Data Structures and Algorithms', 
    'Software Engineering',
    'Database Systems',
    'Web Development Technologies',
    'Computer Networks',
    'Systems Analysis and Design',
    'Component-Based Programming'
  ],
  logo: '/images/education/uru-logo.png'
},
  {
    id: 2,
    institution: 'Centro Electrónico de Idiomas',
    degree: 'Advanced C1 English Program',
    period: 'Completed',
    location: 'Maracaibo, Venezuela',
    description: 'Advanced English language certification program achieving C1 level proficiency.',
    achievements: [
      'Achieved C1 (Advanced) level English proficiency',
      'Completed comprehensive language program',
      'Enhanced technical communication skills in English'
    ],
    coursework: [
      'Advanced Grammar and Syntax',
      'Technical English Communication',
      'Academic Writing',
      'Professional Presentation Skills'
    ],
    logo: '/images/education/idiomas-logo.png'
  }
];

__sliceDepExports3.certificatesData = [
  {
    id: 1,
    title: '2nd Place ChatBOT Hackathon',
    issuer: 'Social Oplesk',
    date: '2024-01-01',
    credentialId: 'CHATBOT-HACKATHON-2024',
    description: 'Second place achievement in ChatBOT development hackathon, demonstrating conversational user experience development skills.',
    skills: ['AI Development', 'Chatbot Design', 'Natural Language Processing', 'JavaScript', 'Problem Solving'],
    certificateUrl: 'https://www.socialoplesk.com/certificates/chatbot-hackathon-2024-victor-kneider',
    verified: true,
    logo: '/images/certificates/social-oplesk.png'
  },
  {
    id: 2,
    title: 'FullStack Development',
    issuer: 'Social Oplesk',
    date: '2024-01-01',
    credentialId: 'FULLSTACK-DEV-2024',
    description: 'Comprehensive full-stack development certification covering frontend and backend technologies.',
    skills: ['Full-Stack Development', 'JavaScript', 'Node.js', 'Database Design', 'Web APIs'],
    certificateUrl: 'https://www.socialoplesk.com/certificates/fullstack-development-victor-kneider',
    verified: true,
    logo: '/images/certificates/social-oplesk.png'
  },
  {
    id: 4,
    title: 'Catholic Leadership',
    issuer: 'Acción Católica de Venezuela',
    date: '2023-12-01',
    credentialId: 'CATHOLIC-LEADERSHIP-2023',
    description: 'Leadership development program focused on community service, organizational management, and ethical leadership principles.',
    skills: ['Leadership', 'Team Management', 'Community Service', 'Project Coordination', 'Ethics'],
    certificateUrl: 'https://accioncatolica.org.ve/certificates/leadership-victor-kneider-2023',
    verified: true,
    logo: '/images/certificates/accion-catolica.png'
  },
  {
    id: 5,
    title: 'Advanced C1 English Program',
    issuer: 'Centro Electrónico de Idiomas',
    date: '2023-11-01',
    credentialId: 'ADVANCED-ENGLISH-C1-2023',
    description: 'Advanced English language certification achieving C1 level proficiency in reading, writing, speaking, and listening.',
    skills: ['Advanced English', 'Technical Communication', 'Academic Writing', 'Professional Presentation'],
    certificateUrl: 'https://centroelectronicodeidiomas.com/certificates/advanced-english-c1-victor-kneider',
    verified: true,
    logo: '/images/certificates/centro-idiomas.png'
  },
  {
    id: 6,
    title: 'National Deutsch Competition',
    issuer: 'Goethe Institut',
    date: '2023-10-01',
    credentialId: 'DEUTSCH-COMPETITION-2023',
    description: 'Participation in the National German Language Competition, demonstrating proficiency in German language and cross-cultural communication skills.',
    skills: ['German Language', 'Cross-cultural Communication', 'Language Proficiency', 'Cultural Awareness'],
    certificateUrl: 'https://www.goethe.de/certificates/deutsch-competition-venezuela-2023-victor-kneider',
    verified: true,
    logo: '/images/certificates/goethe-institut.png'
  },
    {
    id: 3,
    title: 'Python Basics',
    issuer: 'Social Oplesk',
    date: '2024-01-01',
    credentialId: 'PYTHON-BASICS-2024',
    description: 'Fundamental Python programming certification covering core concepts and practical applications.',
    skills: ['Python Programming', 'Data Structures', 'Object-Oriented Programming', 'Algorithm Design'],
    certificateUrl: 'https://www.socialoplesk.com/certificates/python-basics-victor-kneider',
    verified: true,
    logo: '/images/certificates/social-oplesk.png'
  },
];
SLICE_BUNDLE_DEPENDENCIES["Components/AppComponents/EducationSection/data.js"] = __sliceDepExports3;
// Dependency: Components/AppComponents/ProjectsSection/data.js
const __sliceDepExports4 = {};
const projectsData = [
         {
            id: 1,
            title: 'Slice.js Framework',
            description: 'A dedicated Custom Web Component framework built to master the fundamentals of modern frontend architecture. Features a reactive state system without VDOM overhead, scoped styling, and a component-based dependency injection system. Includes a custom CLI for scaffolding and bundling, proving that you don\'t need React to build complex, scalable applications.',
            image: 'https://raw.githubusercontent.com/VKneider/slice.js/refs/heads/master/readme_images/screenshot.JPG',
            images: [
                'https://raw.githubusercontent.com/VKneider/slice.js/refs/heads/master/readme_images/screenshot.JPG',
                './images/projects/slice2.png',
                'https://raw.githubusercontent.com/VKneider/slice.js/refs/heads/master/readme_images/code-example.JPG' 
            ],
            technologies: ['JavaScript', 'Web Components', 'CSS3', 'HTML5'],
            category: 'Framework',
            status: 'Active',
            githubUrl: 'https://github.com/vkneider/slice.js',
            liveUrl: 'https://slice-js-demo.vercel.app',
            featured: true,
            date: '2024-01-15'
         },
         {
            id: 2,
            title: 'Parish Automated Ecosystem',
            description: 'Zero-cost digital ecosystem for San Ramón Nonato Parish. Engineered an automated content pipeline using Google Sheets/Forms as a Headless CMS. Custom ETL scripts transform administration data into a performant web experience, streamlining information flow for parish groups without recurring costs.',
            image: './images/projects/sanramonmcbo.png',
            images: [
                './images/projects/sanramonmcbo.png',
                './images/projects/sanramonmcbo2.png'
            ],
            technologies: ['Google Apps Script', 'Process Automation', 'ETL Pipelines', 'Cost Optimization', 'Vercel'],
            category: 'Engineering & Automation',
            status: 'Live',
            liveUrl: 'https://sanramonmcbo.vercel.app',
            featured: true,
            date: '2024-06-01'
         }
      ];

__sliceDepExports4.dataData = projectsData;
SLICE_BUNDLE_DEPENDENCIES["Components/AppComponents/ProjectsSection/data.js"] = __sliceDepExports4;
const SliceComponent_Portfolio = (() => {

class Portfolio extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);
      
      this.$main = this.querySelector('.portfolio-main');
      this.$content = this.querySelector('.portfolio-content');
      this.$footer = this.querySelector('.portfolio-footer');
      this.$socialLinks = this.querySelector('.social-links');
      this.$copyright = this.querySelector('.copyright');
      
      slice.controller.setComponentProps(this, props);
      this.debuggerProps = [];
      this.currentSection = null;
   }

   async init() {
      // Create navigation bar
      const themes = [
         {
            name: 'EmeraldLight',
            colors: { primary: '#10B981', secondary: '#FEFFFE' },
            description: 'Official Slice.js theme'
         },
         {
            name: 'Light',
            colors: { primary: '#F3F4F6', secondary: '#374151' },
            description: 'Clean and bright'
         },
         {
            name: 'Dark',
            colors: { primary: '#18181B', secondary: '#F3F4F6' },
            description: 'Easy on the eyes'
         },
         {
            name: 'CobaltBlue',
            colors: { primary: '#1D4ED8', secondary: '#F97316' },
            description: 'Professional blue with orange accents and light background'
         },
         {
            name: 'Purple',
            colors: { primary: '#9333EA', secondary: '#10B981' },
            description: 'Creative purple'
         },
         {
            name: "NavyYellow",
            colors: { primary: '#020617', secondary: '#FCD34D' },
            description: 'Navy blue with yellow accents'
         },
         {
            name: "CrimsonRed",
            colors: { primary: '#990000', secondary: '#4A4A4A' },
            description: 'Elegant deep crimson'
         },
         {
            name: "NeonCyberpunk",
            colors: { primary: '#FF00FF', secondary: '#00FFFF' },
            description: 'High contrast neon madness'
         },
         {
            name: "CandyPop",
            colors: { primary: '#FF69B4', secondary: '#87CEEB' },
            description: 'Sweet and bubbly pastels'
         },
         {
            name: "ToxicSlime",
            colors: { primary: '#CCFF00', secondary: '#9D00FF' },
            description: 'Warning: Radioactive colors'
         },
         {
            name: "RetroVapor",
            colors: { primary: '#FF71CE', secondary: '#01CDFE' },
            description: 'Aesthetic 80s vibes'
         }
      ];

      const themeSelector = await slice.build('ThemeSelector', {
         themes
      });

      const navbar = await slice.build('Navbar', {
         position: 'fixed',
         logo: {
            src: '/images/Slice.js-logo.png',
            path: '/',
         },
         items: [
            { text: 'About', path: '/' },
            { text: 'Experience', path: '/experience' },
            { text: 'Education', path: '/education' },
            { text: 'Slice.js', path: '/slice-js' },
            { text: 'Projects', path: '/projects' }
         ],
         elements:[{
            element: themeSelector,
            section:"actions"
         }]
      });

      // Create multi-route for content sections
      const portfolioRoutes = await slice.build('MultiRoute', {
         routes: [
            { path: '/', component: 'AboutSection' },
            { path: '/experience', component: 'ExperienceSection' },
            { path: '/education', component: 'EducationSection' },
            { path: '/slice-js', component: 'WhatIsSlice' },
            { path: '/projects', component: 'ProjectsSection' }
         ]
      });

      // Populate footer using template
      this.populateFooter();

      // Create "Built with Slice" badge
      const badge = await slice.build('BuiltWithBadge', {});

      // Append components to layout
      this.insertBefore(navbar, this.firstChild);
      this.$content.appendChild(portfolioRoutes);
      this.appendChild(badge);

      // Handle route changes
      //this.handleRouteChange();
   }

   populateFooter() {
      // Social links data
      const socialData = [
         { 
            name: 'GitHub', 
            url: 'https://github.com/VKneider', 
            id: 'github',
            svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>'
         },
         { 
            name: 'LinkedIn', 
            url: 'https://www.linkedin.com/in/vkneider/', 
            id: 'linkedin',
            svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>'
         },
         { 
            name: 'Email', 
            url: 'mailto:victorkneider@gmail.com', 
            id: 'email',
            svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>'
         }
      ];

      // Populate social links
      this.$socialLinks.innerHTML = '';
      socialData.forEach(social => {
         const link = document.createElement('a');
         link.href = social.url;
         link.target = '_blank';
         link.rel = 'noopener noreferrer';
         link.classList.add('social-link');
         link.classList.add(`social-link-${social.id}`);
         link.innerHTML = `
            <span class="social-icon">${social.svg}</span>
            <span class="social-text">${social.name}</span>
         `;
         this.$socialLinks.appendChild(link);
      });

      // Set copyright text
      this.$copyright.textContent = `© ${new Date().getFullYear()} Victor Kneider. All rights reserved.`;
   }

   handleRouteChange() {
      // Simplemente añadir una clase CSS para transiciones suaves
      this.$content.classList.add('smooth-transitions');
   }
}

window.Portfolio = Portfolio;
if (!customElements.get('slice-portfolio')) { customElements.define('slice-portfolio', Portfolio); }
return Portfolio;
return Portfolio;
})();

const SliceComponent_ThemeSelector = (() => {

class ThemeSelector extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);
      
      this.$container = this.querySelector('.theme-selector-container');
      this.$currentTheme = this.querySelector('.current-theme');
      this.$themeName = this.querySelector('.theme-name');
      this.$selectorIcon = this.querySelector('.selector-icon');
      this.$dropdown = this.querySelector('.theme-dropdown');
      this.$themesList = this.querySelector('.themes-list');
      this.$dropdownArrow = this.querySelector('.dropdown-arrow');
      
      this.isOpen = false;
      this.currentThemeName = slice.stylesManager?.themeManager?.currentTheme || 'Slice';
      
      this.setupEventListeners();
      slice.controller.setComponentProps(this, props);
      this.debuggerProps = ['themes', 'currentTheme'];
   }

   async init() {
      // Set fixed label instead of current theme
      this.updateSelectorDisplay();
      await this.renderThemesList();
      
      // Listen for theme changes from other sources to update active state in dropdown
      document.addEventListener('themeChanged', (event) => {
         this.currentThemeName = event.detail.themeName;
         this.updateActiveThemeInDropdown();
      });
   }

   get themes(){
      return this._themes;
   }

    set themes(value) {
      this._themes = value;
   }

   setupEventListeners() {
      // Toggle dropdown
      this.$currentTheme.addEventListener('click', (e) => {
         e.stopPropagation();
         this.toggleDropdown();
      });

      // Keyboard navigation
      this.$currentTheme.addEventListener('keydown', (e) => {
         if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.toggleDropdown();
         }
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
         if (!this.$container.contains(e.target)) {
            this.closeDropdown();
         }
      });

      // Handle escape key
      document.addEventListener('keydown', (e) => {
         if (e.key === 'Escape' && this.isOpen) {
            this.closeDropdown();
         }
      });
   }

   updateSelectorDisplay() {
      // Always show "Select Theme" instead of current theme
      this.$themeName.textContent = 'Select Theme';
      
      // Ensure the icon is visible
      if (this.$selectorIcon) {
         this.$selectorIcon.textContent = '🎨';
      }
      
      // Remove any theme-specific styling
      this.$currentTheme.style.removeProperty('--theme-primary');
      this.$currentTheme.style.removeProperty('--theme-secondary');
   }

   updateActiveThemeInDropdown() {
      // Update only the active state in dropdown items
      this.$themesList.querySelectorAll('.theme-item').forEach(item => {
         item.classList.remove('active');
      });
      
      const activeItem = [...this.$themesList.children].find(item => 
         item.querySelector('.theme-item-name').textContent === this.currentThemeName
      );
      
      if (activeItem) {
         activeItem.classList.add('active');
      }
   }

   async renderThemesList() {
      this.$themesList.innerHTML = '';
      
      for (const theme of this.themes) {
         const themeItem = await this.createThemeItem(theme);
         this.$themesList.appendChild(themeItem);
      }
   }

   async createThemeItem(theme) {
      const item = document.createElement('div');
      item.classList.add('theme-item');
      item.setAttribute('role', 'menuitem');
      item.setAttribute('tabindex', '0');
      
      if (theme.name === this.currentThemeName) {
         item.classList.add('active');
      }

      item.innerHTML = `
         <div class="theme-preview">
            <div class="color-indicators">
               <div class="color-dot primary" style="background-color: ${theme.colors.primary}"></div>
               <div class="color-dot secondary" style="background-color: ${theme.colors.secondary}"></div>
            </div>
         </div>
         <div class="theme-info">
            <div class="theme-item-name">${theme.name}</div>
            <div class="theme-description">${theme.description}</div>
         </div>
         <div class="check-icon">✓</div>
      `;

      // Click handler
      item.addEventListener('click', async (e) => {
         e.stopPropagation();
         await this.selectTheme(theme.name);
      });

      // Keyboard handler
      item.addEventListener('keydown', async (e) => {
         if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            await this.selectTheme(theme.name);
         }
      });

      return item;
   }

   async selectTheme(themeName) {
      if (themeName === this.currentThemeName) {
         this.closeDropdown();
         return;
      }

      // Add loading state
      this.$container.classList.add('loading');
      
      try {
         // Apply the theme
         await slice.setTheme(themeName);
         
         // Update current theme reference
         this.currentThemeName = themeName;
         
         // Update active state in dropdown only
         this.updateActiveThemeInDropdown();

         // Dispatch custom event
         document.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { themeName }
         }));
         
      } catch (error) {
         console.error('Error changing theme:', error);
      } finally {
         this.$container.classList.remove('loading');
         this.closeDropdown();
      }
   }

   toggleDropdown() {
      if (this.isOpen) {
         this.closeDropdown();
      } else {
         this.openDropdown();
      }
   }

   openDropdown() {
      this.isOpen = true;
      this.$dropdown.classList.add('open');
      this.$currentTheme.classList.add('active');
      this.$currentTheme.setAttribute('aria-expanded', 'true');
      
      // Focus first theme item
      const firstItem = this.$themesList.querySelector('.theme-item');
      if (firstItem) {
         firstItem.focus();
      }
   }

   closeDropdown() {
      this.isOpen = false;
      this.$dropdown.classList.remove('open');
      this.$currentTheme.classList.remove('active');
      this.$currentTheme.setAttribute('aria-expanded', 'false');
   }

   // Getter/setter for external access
   get currentTheme() {
      return this.currentThemeName;
   }

   set currentTheme(value) {
      this.currentThemeName = value;
      this.updateActiveThemeInDropdown();
   }
}

window.ThemeSelector = ThemeSelector;
if (!customElements.get('slice-theme-selector')) { customElements.define('slice-theme-selector', ThemeSelector); }

return ThemeSelector;
return ThemeSelector;
})();

const SliceComponent_Navbar = (() => {

class Navbar extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);

      this.$header = this.querySelector('.slice_nav_header');
      this.$navBar = this.querySelector('.slice_nav_bar');
      this.$menu = this.querySelector('.nav_bar_menu');
      this.$buttonsContainer = this.querySelector('.nav_bar_buttons');
      this.$logoContainer = this.querySelector('.logo_container');
      this.$mobileMenu = this.querySelector('.slice_mobile_menu');
      this.$mobileButton = this.querySelector('.mobile_menu_button');
      this.$closeMenu = this.querySelector('.mobile_close_menu');

      this.$mobileButton.addEventListener('click', () => {
         this.$navBar.style.transform = 'translateX(0%)';
      });

      this.$closeMenu.addEventListener('click', () => {
         this.closeMobileMenu();
      });

      slice.controller.setComponentProps(this, props);
      this.debuggerProps = ['logo', 'items', 'buttons', 'elements'];
   }

   closeMobileMenu() {
      // Only useful for mobile view
      if (window.innerWidth <= 1024) {
         this.$navBar.style.transform = 'translateX(100%)';
      }
   }

   async init() {
      // Mantener comportamiento original
      if (this.items) {
         await this.addItems(this.items);
      }
      
      if (this.buttons) {
         this.buttons.forEach(async (item) => {
            await this.addButton(item, this.$buttonsContainer);
         });
      }

      // Nueva funcionalidad: elementos personalizados
      if (this.elements) {
         this.addElements(this.elements);
      }

      // Mantener lógica original de ajuste de layout
      if (window.screen.width >= 1020 && this.items && this.logo && (this.buttons || this.elements)) {
         this.$menu.style.maxWidth = '60%';
      }
   }

   /**
    * Nueva funcionalidad: Agregar elementos personalizados
    */
   addElements(elements) {
      elements.forEach(elementConfig => {
         this.addElement(elementConfig);
      });
   }

   /**
    * Agregar un elemento personalizado al navbar
    * @param {Object} config - Configuración del elemento
    * @param {HTMLElement} config.element - El elemento HTML a agregar
    * @param {string} config.section - Sección: 'logo', 'navigation', 'actions', 'start', 'end'
    * @param {boolean} config.asNavItem - Si debe tratarse como item de navegación
    * @param {string} config.className - Clase CSS adicional
    * @param {number} config.order - Orden de inserción
    */
   addElement(config) {
      const { 
         element, 
         section = 'actions', 
         asNavItem = false, 
         className = '', 
         order = null 
      } = config;

      if (!element || !(element instanceof HTMLElement)) {
         console.warn('Navbar: Invalid element provided');
         return;
      }

      const targetSection = this.getTargetSection(section);
      if (!targetSection) {
         console.warn(`Navbar: Invalid section "${section}"`);
         return;
      }

      const processedElement = this.processElement(element, section, asNavItem, className);
      this.insertElement(processedElement, targetSection, order);
   }

   /**
    * Mapeo de secciones con alias para flexibilidad
    */
   getTargetSection(sectionName) {
      const sectionMap = {
         // Secciones principales
         'logo': this.$logoContainer,
         'navigation': this.$menu,
         'actions': this.$buttonsContainer,
         
         // Alias intuitivos
         'nav': this.$menu,
         'center': this.$menu,
         'central': this.$menu,
         'mid': this.$menu,
         'menu': this.$menu,
         
         'buttons': this.$buttonsContainer,  // Retrocompatibilidad
         'right': this.$buttonsContainer,
         'end': this.$buttonsContainer,
         
         'start': this.$header,
         'header': this.$header
      };

      return sectionMap[sectionName];
   }

   processElement(element, section, asNavItem, className) {
      if (className) {
         element.classList.add(className);
      }

      // Close menu on click
      element.addEventListener('click', () => this.closeMobileMenu());

      // Para navegación, envolver en li con efectos
      const navSections = ['navigation', 'nav', 'center', 'central', 'mid', 'menu'];
      if (navSections.includes(section)) {
         const listItem = document.createElement('li');
         element.classList.add('item');
         listItem.appendChild(element);

         if (asNavItem) {
            const hoverEffect = document.createElement('div');
            hoverEffect.classList.add('anim-item');
            listItem.appendChild(hoverEffect);
         }

         return listItem;
      }

      // Para acciones, agregar clase
      const actionSections = ['actions', 'buttons', 'right', 'end'];
      if (actionSections.includes(section)) {
         element.classList.add('navbar-action-item');
      }

      return element;
   }

   insertElement(element, targetSection, order) {
      if (order !== null && order >= 0) {
         const children = targetSection.children;
         if (order < children.length) {
            targetSection.insertBefore(element, children[order]);
         } else {
            targetSection.appendChild(element);
         }
      } else {
         targetSection.appendChild(element);
      }
   }

   /**
    * Métodos de conveniencia para diferentes secciones
    */
   addToLogo(element, options = {}) {
      this.addElement({ element, section: 'logo', ...options });
   }

   addToNavigation(element, options = {}) {
      this.addElement({ 
         element, 
         section: 'navigation', 
         asNavItem: true, 
         ...options 
      });
   }

   addToCenter(element, options = {}) {
      this.addElement({ 
         element, 
         section: 'center', 
         asNavItem: true, 
         ...options 
      });
   }

   addToActions(element, options = {}) {
      this.addElement({ element, section: 'actions', ...options });
   }

   addToStart(element, options = {}) {
      this.addElement({ element, section: 'start', ...options });
   }

   addToEnd(element, options = {}) {
      this.addElement({ element, section: 'end', ...options });
   }

   /**
    * Remover elemento (mantiene compatibilidad)
    */
   removeElement(element) {
      const sections = [this.$logoContainer, this.$menu, this.$buttonsContainer, this.$header];
      
      for (const section of sections) {
         if (section.contains(element)) {
            const parent = element.parentNode;
            element.remove();
            
            if (parent.tagName === 'LI' && parent.children.length === 0) {
               parent.remove();
            }
            return true;
         }
         
         const wrappers = section.querySelectorAll('li');
         for (const wrapper of wrappers) {
            if (wrapper.contains(element)) {
               wrapper.remove();
               return true;
            }
         }
      }
      
      return false;
   }

   // ===============================
   // MÉTODOS ORIGINALES (Sin cambios para retrocompatibilidad)
   // ===============================

   async addItems(items) {
      for (let i = 0; i < items.length; i++) {
         await this.addItem(items[i], this.$menu);
      }
   }

   get position() {
      return this._position;
   }

   set position(value) {
      this._position = value;
      if (value === 'fixed') {
         this.classList.add('nav_bar_fixed');
      }
   }

   get logo() {
      return this._logo;
   }

   set logo(value) {
      this._logo = value;
      const img = document.createElement('img');
      img.src = value.src;
      this.$logoContainer.appendChild(img);
      this.$logoContainer.href = value.path;

      this.$logoContainer.addEventListener('click', (e) => {
         e.preventDefault();
         slice.router.navigate(value.path);
         window.scrollTo({ top: 0, behavior: 'smooth' });
         this.closeMobileMenu();
      });
   }

   get items() {
      return this._items;
   }

   set items(values) {
      this._items = values;
   }

   get buttons() {
      return this._buttons;
   }

   set buttons(values) {
      this._buttons = values;
   }

   get elements() {
      return this._elements;
   }

   set elements(values) {
      this._elements = values;
   }

   get direction() {
      return this._direction;
   }

   set direction(value) {
      this._direction = value;
      if (value === 'reverse') {
         this.$header.classList.add('direction-row-reverse');
      }
   }

   async addItem(value, addTo) {
      const item = document.createElement('li');
      const hover = document.createElement('div');
      hover.classList.add('anim-item');
      if (!value.type) {
         value.type = 'text';
      }
      if (value.type === 'text') {
         const link = await slice.build('Link', {
            text: value.text,
            path: value.path,
            classes: 'item',
         });
         link.addEventListener('click', () => {
            this.closeMobileMenu();
            window.scrollTo({ top: 0, behavior: 'smooth' });
         });
         item.appendChild(link);
      }
      if (value.type === 'dropdown') {
         const d = await slice.build('DropDown', {
            label: value.text,
            options: value.options,
         });
         d.classList.add('item');
         item.appendChild(d);
      }
      item.appendChild(hover);
      addTo.appendChild(item);
   }

   async addButton(value, addTo) {
      if (!value.color) {
         value.color = {
            label: 'var(--primary-color-rgb)',
            button: 'var(--primary-background-color)',
         };
      }
      const button = await slice.build('Button', {
         value: value.value,
         customColor: value.color,
         icon: value.icon,
         onClickCallback: value.onClickCallback,
      });
      addTo.appendChild(button);
   }
}

window.window.Navbar = Navbar;
if (!customElements.get('slice-nav-bar')) { customElements.define('slice-nav-bar', Navbar); }

return Navbar;
return Navbar;
})();

const SliceComponent_Link = (() => {

class Link extends HTMLElement {
  static props = {
    path: { type: 'string', default: '#' },
    classes: { type: 'string', default: '' },
    text: { type: 'string', default: '' }
  };

  constructor(props = {}) {
    super();
    slice.attachTemplate(this);
    this.$anchor = this.querySelector('.slice-link');

    slice.controller.setComponentProps(this, props);
    this.debuggerProps = ['path', 'classes', 'text'];
  }

  async init() {
    this.updateLink();
    this.addEventListener('click', this.onClick.bind(this));
  }

  updateLink() {
    if (!this.$anchor) return;
    this.$anchor.setAttribute('href', this.path || '#');
    this.$anchor.textContent = this.text || '';
    this.$anchor.className = `slice-link ${this.classes || ''}`.trim();
  }

  async onClick(event) {
    event.preventDefault();
    const path = this.path || this.$anchor?.getAttribute('href') || '#';
    slice.router.navigate(path);
  }

  set path(value) {
    this._path = value;
    this.updateLink();
  }

  get path() {
    return this._path;
  }

  set classes(value) {
    this._classes = value;
    this.updateLink();
  }

  get classes() {
    return this._classes;
  }

  set text(value) {
    this._text = value;
    this.updateLink();
  }

  get text() {
    return this._text;
  }
}

window.Link = Link;
if (!customElements.get('slice-link')) { customElements.define('slice-link', Link); }

return Link;
return Link;
})();

const SliceComponent_DropDown = (() => {

class DropDown extends HTMLElement {

   static props = {
      label: { 
         type: 'string', 
         default: '', 
         required: false 
      },
      options: { 
         type: 'array', 
         default: [], 
         required: false 
      }
   };

   constructor(props) {
      super();
      slice.attachTemplate(this);

      this.$dropdown = this.querySelector('.slice_dropdown');
      this.$box = this.querySelector('.slice_dropbox');
      this.$label = this.querySelector('.slice_dropdown_label');
      this.$caret = this.querySelector('.caret');

      this.addEventListener('click', () => {
         this.toggleDrop();
      });

      this.$box.addEventListener('mouseleave', () => {
         this.closeDrop();
      });

      slice.controller.setComponentProps(this, props);
   }

   init() {}

   get label() {
      return this._label;
   }

   set label(value) {
      this._label = value;
      this.$label.textContent = value;
   }

   get options() {
      return this._options;
   }

   set options(values) {
      this._options = values;
      values.forEach((element) => {
         const div = document.createElement('div');
         const e = document.createElement('a');
         e.addEventListener('click', () => {
            this.closeDrop();
         });
         e.textContent = element.text;
         e.href = element.href;
         div.appendChild(e);
         this.$box.appendChild(div);
      });
   }

   toggleDrop() {
      this.$box.classList.toggle('slice_dropbox_open');
      this.$caret.classList.toggle('caret_open');
   }
   closeDrop() {
      this.$box.classList.remove('slice_dropbox_open');
      this.$caret.classList.remove('caret_open');
   }
}

window.DropDown = DropDown;
if (!customElements.get('slice-dropdown')) { customElements.define('slice-dropdown', DropDown); }

return DropDown;
return DropDown;
})();

const SliceComponent_Button = (() => {

class Button extends HTMLElement {

   static props = {
      value: { 
         type: 'string', 
         default: 'Button', 
         required: false 
      },
      onClickCallback: { 
         type: 'function', 
         default: null 
      },
      customColor: { 
         type: 'object', 
         default: null 
      },
      icon: { 
         type: 'object', 
         default: null 
      },
      audioOnClickEnabled: {
         type: 'boolean',
         default: false
      }
   };

   constructor(props) {
      super();
      slice.attachTemplate(this);
      this.$value = this.querySelector('.slice_button_value');
      this.$button = this.querySelector('.slice_button');
      
      if (props.onClickCallback) {
         this.onClickCallback = props.onClickCallback;
          this.addEventListener('click', async () => {
             if (props.audioOnClickEnabled && localStorage.getItem('imposterClickSoundMuted') !== 'true') {
                const clickAudio = document.getElementById('click-audio');
                if (clickAudio) {
                   clickAudio.currentTime = 0;
                   clickAudio.play();
                }
             }
             await this.onClickCallback();
          });
      }

      slice.controller.setComponentProps(this, props);
   }

   async init() {
      if (this.icon) {
         this.$icon = await slice.build('Icon', {
            name: this.icon.name,           // ✅ CORREGIDO: usar this.icon.name
            iconStyle: this.icon.iconStyle, // ✅ AÑADIDO: pasar también iconStyle
            size: '20px',
            color: 'currentColor',
         });
         this.$button.insertBefore(this.$icon, this.$value);
      }
   }

   get icon() {
      return this._icon;
   }


   set icon(value) {
      this._icon = value;
      if (!this.$icon) return;
      this.$icon.name = value.name;
      this.$icon.iconStyle = value.iconStyle;
   }

   get audioOnClickEnabled() {
      return this._audioOnClickEnabled;
   }

   set audioOnClickEnabled(value) {
      this._audioOnClickEnabled = value;
   }

   get value() {
      return this._value;
   }

    set value(value) {
       this._value = value;
       this.$value.textContent = value;
    }

    get onClickCallback() {
       return this._onClickCallback;
    }

    set onClickCallback(value) {
       this._onClickCallback = value;
    }

   get customColor() {
      return this._customColor;
   }

   set customColor(value) {
      this._customColor = value;
      
      if (!value) {
         this.style.removeProperty('--btn-bg');
         this.style.removeProperty('--btn-border-color');
         this.style.removeProperty('--btn-text-color');
         return;
      }

      // Modern CSS Variable approach
      if (value.button) {
         this.style.setProperty('--btn-bg', value.button);
         this.style.setProperty('--btn-border-color', value.button);
      }
      if (value.label) {
         this.style.setProperty('--btn-text-color', value.label);
      }
   }

}

window.Button = Button;
if (!customElements.get('slice-button')) { customElements.define('slice-button', Button); }
return Button;
return Button;
})();

const SliceComponent_Icon = (() => {

class Icon extends HTMLElement {

   static props = {
      name: { 
         type: 'string', 
         default: 'youtube', 
         required: false 
      },
      size: { 
         type: 'string', 
         default: 'small' 
      },
      color: { 
         type: 'string', 
         default: 'black' 
      },
      iconStyle: { 
         type: 'string', 
         default: 'filled' 
      }
   };

   constructor(props) {
      super();

      slice.attachTemplate(this);
      this.$icon = this;

      slice.controller.setComponentProps(this, props);
   }

   get random() {
      return this.classList;
   }

   set random(value) {}

   init() {
      // Static props ensure all properties have default values
      // No need for manual default checking
   }

   get name() {
      return this._name;
   }

   set name(value) {
      // Remove previous icon class if exists
      if (this._name && this._iconStyle) {
         this.classList.remove(`slc-${styleTypes[this._iconStyle]}${this._name}`);
      }
      
      this._name = value;
      // Add new icon class
      this.classList.add(`slc-${styleTypes[this._iconStyle]}${value}`);
   }

   get iconStyle() {
      return this._iconStyle;
   }

   set iconStyle(value) {
      if (value !== 'filled' && value !== 'outlined') value = 'filled';
      
      // Remove old style class
      if (this._name && this._iconStyle) {
         this.classList.remove(`slc-${styleTypes[this._iconStyle]}${this._name}`);
      }

      this._iconStyle = value;
      
      // Add new style class
      if (this._name) {
         this.classList.add(`slc-${styleTypes[this._iconStyle]}${this._name}`);
      }
   }

   get size() {
      return this._size;
   }

   set size(value) {
      if (!value) return;
      
      let pixelValue = value;
      switch (value) {
         case 'small':
            pixelValue = '16px';
            break;
         case 'medium':
            pixelValue = '20px';
            break;
         case 'large':
            pixelValue = '24px';
            break;
      }
      this._size = pixelValue;
      this.style.fontSize = pixelValue;
   }

   get color() {
      return this._color;
   }

   set color(value) {
      this._color = value;
      this.style.color = value;
   }
}

const styleTypes = { outlined: 'out', filled: 'fil' };
window.Icon = Icon;
if (!customElements.get('slice-icon')) { customElements.define('slice-icon', Icon); }

return Icon;
return Icon;
})();

const SliceComponent_MultiRoute = (() => {

class MultiRoute extends HTMLElement {
   constructor(props) {
      super();
      this.props = props;
      this.renderedComponents = new Map(); // Cache para componentes renderizados
   }

   init() {
      if (!this.props.routes || !Array.isArray(this.props.routes)) {
         slice.logger.logError('MultiRoute', 'No valid routes array provided in props.');
         return;
      }

      /*
      this.props.routes.forEach(route => {
         if (!route.path || !route.component) {
            slice.logger.logError('MultiRoute', 'Route must have a path and a component.');
         }

         console.log(route)

         slice.router.verifyDynamicRouteExistence(route)
      });

      // verify if the current route is registered in the routes.js file
      slice.router.verifyDynamicRouteExistence(this.props.routes)
      */
   }

   async render() {
      const currentPath = window.location.pathname;
      const routeMatch = this.props.routes.find((route) => route.path === currentPath);

      if (routeMatch) {
         const { component } = routeMatch;

         if (this.renderedComponents.has(component)) {
            const cachedComponent = this.renderedComponents.get(component);

            // Aquí nos aseguramos de que el contenido se limpie antes de insertar el componente en caché.
            this.innerHTML = '';

            // Si el componente en caché tiene un método update, lo ejecutamos
            if (cachedComponent.update) {
               await cachedComponent.update();
            }

            // Insertamos el componente en caché en el DOM
            this.appendChild(cachedComponent);
         } else {
            if (!slice.controller.componentCategories.has(component)) {
               slice.logger.logError(`${this.sliceId}`, `Component ${component} not found`);
               return;
            }

            // Si el componente no está en caché, lo construimos y lo almacenamos en la caché
            const newComponent = await slice.build(component, { sliceId: component });
            this.innerHTML = '';
            this.appendChild(newComponent);

            // Guardamos el componente recién construido en la caché
            this.renderedComponents.set(component, newComponent);
         }
      } else {
         // Limpiamos el contenido si no hay una coincidencia de ruta
         this.innerHTML = '';
      }
   }

   async renderIfCurrentRoute() {
      const currentPath = window.location.pathname;
      const routeMatch = this.props.routes.find((route) => route.path === currentPath);

      if (routeMatch) {
         await this.render(); // Llamamos a render() para manejar el renderizado desde la caché si es necesario
         return true;
      }
      return false;
   }

   removeComponent() {
      const currentPath = window.location.pathname;
      const routeMatch = this.props.routes.find((route) => route.path === currentPath);

      if (routeMatch) {
         const { component } = routeMatch;
         this.renderedComponents.delete(component);
         this.innerHTML = '';
      }
   }
}

window.MultiRoute = MultiRoute;
if (!customElements.get('slice-multi-route')) { customElements.define('slice-multi-route', MultiRoute); }

return MultiRoute;
return MultiRoute;
})();

const SliceComponent_AboutSection = (() => {

class AboutSection extends HTMLElement {
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
               <span class="role-switcher" data-roles='["Computer Engineer", "Framework Creator", "University Professor", "Software Engineer", "Web Architect"]'>Computer Engineer</span>
            </h2>
         </div>
         <p class="hero-description">
            Computer Engineer, Professor, and creator of Slice.js. 
            I specialize in building efficient software solutions and modern web architectures, bridging academic theory with practical application.
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
            title: 'Cloud & Engineering',
            text: 'Remote Engineer with 1+ year experience in Cloud Platforms (Azure) and Process Automation. Expert in building scalable architectures and leveraging AI tools like Claude Code & Cursor for efficient development.',
            icon: { name: 'cloud', iconStyle: 'filled' },
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
            title: 'AI & Innovation',
            text: 'Early adopter of Model Context Protocol (MCP) and AI-driven development. Dedicated to researching new technologies and bridging the gap between academic theory, cloud infrastructure, and automation.',
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
   const techExpertise = await slice.build('TechExpertise', {
      title: 'Technical Expertise',
      subtitle: 'Technologies & tools I\'ve mastered through years of development',
      showcaseTitle: 'Featured Skills',
      autoPlay: true,
      autoPlaySpeed: 5000,
      marqueeSpeed: 15
   });
   
   // Asegúrate de que el componente se construyó correctamente
   if (techExpertise && this.$skills) {
      this.$skills.appendChild(techExpertise);
   } else {
      console.error('Error: TechExpertise component not built correctly');
   }
}
   async createCarruselSection() {
      const valuesTitle = document.createElement('h2');
      valuesTitle.innerHTML = 'My Journey & Experiences';
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
      { number: '4+', label: 'Years Building Software' },
      { number: '10+', label: 'Academic & Personal Projects' },
      { number: '120+', label: 'Students Mentored' },
      { number: '1', label: 'Custom Framework Built' },
      { number: '100+', label: 'Slice features forgotten (too powerful)' },
      { number: '0', label: 'Fear of refactoring' },
      { number: 'Early', label: 'Technology Adoption' },
      { number: '∞', label: 'Console Logs Written' },
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

   async createRandomFactsSection() {
      const randomFacts = await slice.build('RandomFacts', {});
      
      if (randomFacts && this.$randomFacts) {
         this.$randomFacts.appendChild(randomFacts);
      } else {
         console.error('Error: RandomFacts component not built correctly');
      }
   }

   
}

window.AboutSection = AboutSection;
if (!customElements.get('slice-about-section')) { customElements.define('slice-about-section', AboutSection); }
return AboutSection;
return AboutSection;
})();

const SliceComponent_Grid = (() => {

class Grid extends HTMLElement {

   static props = {
      columns: { 
         type: 'number', 
         default: 1, 
         required: false 
      },
      rows: { 
         type: 'number', 
         default: 1, 
         required: false 
      },
      items: { 
         type: 'array', 
         default: [], 
         required: false 
      },
      centerItems: {
         type: 'boolean',
         default: true,
         required: false
      }
   };

   constructor(props) {
      super();
      slice.attachTemplate(this);

      this.$grid = this.querySelector('.grid-container');

      slice.controller.setComponentProps(this, props);
   }

   async init() {
      // Static props ensure columns and rows have default values
      // No need for manual validation
   }

   set columns(value) {
      this._columns = value;
      this.$grid.style.gridTemplateColumns = `repeat(${value}, 1fr)`;
   }

   get columns() {
      return this._columns;
   }

   set rows(value) {
      this.$grid.style.gridTemplateRows = `repeat(${value}, 1fr)`;
      this._rows = value;
   }

   get rows() {
      return this._rows;
   }

   set items(values) {
      this.setItems(values);
      this._items = values;
   }

   get items() {
      return this._items;
   }

   set centerItems(value) {
      this._centerItems = value;
      this.updateGridItemStyles();
   }

   get centerItems() {
      return this._centerItems;
   }

   async setItem(item) {
      item.classList.add('grid-item');
      this.updateItemStyles(item);
      this.$grid.appendChild(item);
   }

   updateItemStyles(item) {
      if (this._centerItems) {
         item.style.display = 'flex';
         item.style.justifyContent = 'center';
         item.style.alignItems = 'center';
         item.style.width = '100%';
         item.style.height = '100%';
      } else {
         item.style.display = '';
         item.style.justifyContent = '';
         item.style.alignItems = '';
         item.style.width = '';
         item.style.height = '';
      }
   }

   updateGridItemStyles() {
      const gridItems = this.$grid.querySelectorAll('.grid-item');
      gridItems.forEach(item => this.updateItemStyles(item));
   }

   async setItems(items) {
      for (let i = 0; i < items.length; i++) {
         await this.setItem(items[i]);
      }
   }
}

window.Grid = Grid;
if (!customElements.get('slice-grid')) { customElements.define('slice-grid', Grid); }

return Grid;
return Grid;
})();

const SliceComponent_Card = (() => {

class Card extends HTMLElement {

   static props = {
      title: { 
         type: 'string', 
         default: null 
      },
      text: { 
         type: 'string', 
         default: null 
      },
      icon: { 
         type: 'object', 
         default: { name: 'sliceJs', iconStyle: 'filled' } 
      },
      customColor: { 
         type: 'object', 
         default: null 
      },
      image: {
         type: 'string',
         default: null
      },
      actions: {
         type: 'array',
         default: []
      },
      variant: {
         type: 'string',
         default: 'default' // default, elevated, outlined, minimal
      },
      interactive: {
         type: 'boolean',
         default: true
      },
      onClick: {
         type: 'function',
         default: null
      },
      isOpen: { 
         type: 'boolean',
         default: false
      },
      details: {
         type: 'string',
         default: null
      },
      badge: {
         type: 'string',
         default: null
      },
      progress: {
         type: 'number',
         default: null // 0-100
      },
      loading: {
         type: 'boolean',
         default: false
      },
      disabled: {
         type: 'boolean', 
         default: false 
      }
   };

   constructor(props) {
      super();
      slice.attachTemplate(this);

      // Ensure class for CSS (legacy/compatibility)
      this.classList.add('slice-card');
      
      // DOM caching - TODOS los elementos necesarios para setters
      this.$card = this;
      this.$title = this.querySelector('.card-title');
      this.$text = this.querySelector('.card-text');
      this.$textTooltip = this.querySelector('.card-text-tooltip');
      this.$media = this.querySelector('.card-media');
      this.$details = this.querySelector('.card-details');
      this.$detailsContent = this.querySelector('.card-details-content');
      this.$badge = this.querySelector('.card-badge');
      this.$toggle = this.querySelector('.card-toggle');
      this.$progress = this.querySelector('.card-progress');
      // Cache remaining DOM elements (only ones not needed for setters)
      this.$mediaContent = this.querySelector('.card-media-content');
      this.$actions = this.querySelector('.card-actions');
      slice.controller.setComponentProps(this, props);

   }

   async init() {
      // Setup everything
      this.setupVariant();
      this.setupContent();
      
      // Solo configurar media si hay icono o imagen
      if (this._icon || this._image) {
         await this.setupMedia();
      }
      
      await this.setupActions();
      this.setupToggle();
      this.setupEventListeners();
      this.applyCustomStyling();
      this.updateState();
      
      this._initialized = true;
   }

   setupVariant() {
      // Remove all variant classes
      this.$card.classList.remove('card-default', 'card-elevated', 'card-outlined', 'card-minimal');
      
      // Add current variant class
      if (this.variant) {
         this.$card.classList.add(`card-${this.variant}`);
      } else {
         this.$card.classList.add('card-default');
      }
   }

   setupContent() {
      // Set title
      if (this.$title) {
         if (this.title) {
            this.$title.textContent = this.title;
            this.$title.style.display = 'block';
         } else {
            this.$title.style.display = 'none';
         }
      }

      // Set text (simplified for scroll design)
      if (this.$text) {
         if (this.text) {
            this.$text.textContent = this.text;
            this.$text.style.display = 'block';
         } else {
            this.$text.style.display = 'none';
         }
      }

      // Set details
      if (this.$details && this.$detailsContent) {
         if (this.details) {
            this.$detailsContent.textContent = this.details;
            this.$details.style.display = 'block';
         } else {
            this.$details.style.display = 'none';
         }
      }

      // Set badge
      if (this.$badge) {
         if (this.badge) {
            this.$badge.textContent = this.badge;
         } else {
            this.$badge.textContent = '';
         }
      }

      // Set progress
      if (this.$progress) {
         if (this.progress !== null && this.progress >= 0 && this.progress <= 100) {
            this.$progress.style.setProperty('--progress', this.progress);
            this.$progress.setAttribute('data-progress', this.progress);
         } else {
            this.$progress.removeAttribute('data-progress');
            this.$progress.style.removeProperty('--progress');
         }
      }
   }

   setupTextTooltip() {
      // Simplified - no longer needed with scroll design
      return;
   }

   async setupMedia() {
      // Clear previous content to prevent duplicates
      if (this.$mediaContent) {
         this.$mediaContent.innerHTML = '';
      }

      if (this.image) {
         // If image URL is provided
         const img = document.createElement('img');
         img.src = this.image;
         img.alt = this.title || 'Card image';
         img.classList.add('card-image');
         img.onerror = () => {
            // Fallback to icon if image fails to load
            this.setupIconInMedia();
         };
         this.$mediaContent.appendChild(img);
      } else if (this.icon) {
         // Use icon
         await this.setupIconInMedia();
      } else {
         // Hide media section if no content
         if (this.$media) {
            this.$media.style.display = 'none';
         }
         return;
      }

      if (this.$media) {
         this.$media.style.display = 'flex';
      }
   }

   async setupIconInMedia() {
      try {
         // Verificar que el contenedor existe
         if (!this.$mediaContent) {
            console.warn('Card: mediaContent not found');
            return;
         }
         
         // Verificar que no hay iconos existentes antes de limpiar
         const existingIcons = this.$mediaContent.querySelectorAll('slice-icon');
         if (existingIcons.length > 0) {
            console.log(`Card: Found ${existingIcons.length} existing icons, clearing...`);
         }
         
         // Limpiar contenido anterior para evitar duplicados
         this.$mediaContent.innerHTML = '';
         
         // Verificar que el icono existe
         if (!this.icon || !this.icon.name) {
            console.warn('Card: No valid icon provided');
            return;
         }
         
         const iconElement = await slice.build('Icon', {
            name: this.icon.name,
            iconStyle: this.icon.iconStyle || 'filled',
            size: '32px',
            color: 'var(--primary-color-contrast)'
         });
         
         // Verificar que el icono se construyó correctamente
         if (iconElement) {
            this.$mediaContent.appendChild(iconElement);
            console.log(`Card: Icon "${this.icon.name}" added successfully`);
         }
      } catch (error) {
         console.warn('Card: Failed to create icon', error);
      }
   }

   async setupActions() {
      // Clear previous actions
      this.$actions.innerHTML = '';

      if (!this.actions || this.actions.length === 0) {
         this.$actions.style.display = 'none';
         return;
      }

      this.$actions.style.display = 'flex';

      // Create action buttons
      for (const action of this.actions) {
         try {
            const button = await slice.build('Button', {
               text: action.text || 'Action',
               variant: action.variant || 'outlined',
               size: 'small',
               onClick: action.onClick || (() => {})
            });
            this.$actions.appendChild(button);
         } catch (error) {
            console.warn('Card: Failed to create action button', error);
         }
      }
   }

   setupToggle() {
      // Show/hide toggle button based on details availability
      if (this.details) {
         this.$toggle.style.display = 'flex';
      } else {
         this.$toggle.style.display = 'none';
      }
   }

   setupEventListeners() {
      // Remove existing listeners to avoid duplicates
      if (this._toggleListener) {
         this.$toggle.removeEventListener('click', this._toggleListener);
      }
      if (this._cardClickListener) {
         this.$card.removeEventListener('click', this._cardClickListener);
      }
      if (this._keydownListener) {
         this.$card.removeEventListener('keydown', this._keydownListener);
      }

      // Toggle functionality
      this._toggleListener = (e) => {
         e.stopPropagation();
         this.toggleOpen();
      };
      this.$toggle.addEventListener('click', this._toggleListener);

      // Card click handler
      if (this.interactive && this.onClick) {
         this._cardClickListener = (e) => {
            if (!this.disabled && !e.target.closest('.card-toggle') && !e.target.closest('.card-actions')) {
               this.onClick(e);
            }
         };
         this.$card.addEventListener('click', this._cardClickListener);
      }

      // Keyboard navigation
      this._keydownListener = (e) => {
         if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (this.details) {
               this.toggleOpen();
            } else if (this.onClick && this.interactive) {
               this.onClick(e);
            }
         }
      };
      this.$card.addEventListener('keydown', this._keydownListener);

      // Make card focusable if interactive
      if (this.interactive) {
         this.$card.setAttribute('tabindex', '0');
         this.$card.setAttribute('role', 'button');
      }
   }

   toggleOpen() {
      this.isOpen = !this.isOpen;
      this.updateOpenState();
   }

   updateOpenState() {
      if (this.isOpen) {
         this.$card.classList.add('is-open');
         this.$card.setAttribute('aria-expanded', 'true');
      } else {
         this.$card.classList.remove('is-open');
         this.$card.setAttribute('aria-expanded', 'false');
      }
   }

   updateState() {
      // Update loading state
      if (this.loading) {
         this.$card.classList.add('loading');
         this.$card.setAttribute('aria-busy', 'true');
      } else {
         this.$card.classList.remove('loading');
         this.$card.removeAttribute('aria-busy');
      }

      // Update disabled state
      if (this.disabled) {
         this.$card.classList.add('disabled');
         this.$card.setAttribute('aria-disabled', 'true');
         this.$card.style.pointerEvents = 'none';
         this.$card.style.opacity = '0.6';
      } else {
         this.$card.classList.remove('disabled');
         this.$card.removeAttribute('aria-disabled');
         this.$card.style.pointerEvents = '';
         this.$card.style.opacity = '';
      }

      // Update interactive state
      if (this.interactive) {
         this.$card.classList.add('interactive');
      } else {
         this.$card.classList.remove('interactive');
      }

      // Update open state
      this.updateOpenState();
   }

   applyCustomStyling() {
      if (this.customColor) {
         if (this.customColor.accent) {
            this.$card.style.setProperty('--custom-accent', this.customColor.accent);
         }
         if (this.customColor.background) {
            this.$card.style.setProperty('--custom-bg', this.customColor.background);
         }
         if (this.customColor.text) {
            this.$card.style.setProperty('--custom-text', this.customColor.text);
         }
         if (this.customColor.card && this.$media) {
            this.$media.style.background = this.customColor.card;
         }
      }
   }

   // Getters and Setters following Slice pattern
   get title() { return this._title; }
   set title(value) {
      this._title = value;
      if (this.$title) {
         this.setupContent();
      }
   }

   get text() { return this._text; }
   set text(value) {
      this._text = value;
      if (this.$text && this._initialized) {
         this.setupContent();
      }
   }

   get details() { return this._details; }
   set details(value) { 
      this._details = value;
      if (this.$details) {
         this.setupContent();
         this.setupToggle();
      }
   }

   get badge() { return this._badge; }
   set badge(value) { 
      this._badge = value;
      if (this.$badge) {
         this.setupContent();
      }
   }

   get variant() { return this._variant || 'default'; }
   set variant(value) { 
      this._variant = value;
      if (this.$card && this._initialized) {
         this.setupVariant();
      }
   }

   get isOpen() { return this._isOpen || false; }
   set isOpen(value) {
      this._isOpen = Boolean(value);
      if (this.$card) {
      this.updateOpenState();
      }
   }

   get loading() { return this._loading || false; }
   set loading(value) { 
      this._loading = Boolean(value);
      if (this.$card) {
         this.updateState();
      }
   }

   get disabled() { return this._disabled || false; }
   set disabled(value) { 
      this._disabled = Boolean(value);
      if (this.$card) {
         this.updateState();
      }
   }

   get progress() { return this._progress; }
   set progress(value) { 
      this._progress = value;
      if (this.$progress) {
         this.setupContent();
      }
   }

   get interactive() { return this._interactive !== false; }
   set interactive(value) { 
      this._interactive = Boolean(value);
      if (this.$card) {
         this.updateState();
      }
   }

   get customColor() { return this._customColor; }
   set customColor(value) {
      this._customColor = value;
      if (this.$card) {
         this.applyCustomStyling();
      }
   }

   get icon() { return this._icon; }
   set icon(value) {
      this._icon = value;
      // Solo llamar setupMedia si el componente está inicializado, no hay imagen, y no estamos en el constructor
      if (this._initialized && this.$media && !this._image && this.$mediaContent) {
         this.setupMedia();
      }
   }

   get image() { return this._image; }
   set image(value) {
      this._image = value;
      // Solo llamar setupMedia si el componente está inicializado, no hay icono, y no estamos en el constructor
      if (this._initialized && this.$media && !this._icon && this.$mediaContent) {
         this.setupMedia();
      }
   }

   get actions() { return this._actions || []; }
   set actions(value) {
      this._actions = value;
      if (this.$actions) {
         this.setupActions();
      }
   }

   get onClick() { return this._onClick; }
   set onClick(value) {
      this._onClick = value;
      if (this.$card) {
         this.setupEventListeners();
      }
   }

   // Public API methods
   open() {
      this.isOpen = true;
   }

   close() {
      this.isOpen = false;
   }

   toggle() {
      this.toggleOpen();
   }

   setProgress(value) {
      this.progress = Math.max(0, Math.min(100, value));
   }

   updateActions(newActions) {
      this.actions = newActions;
      this.setupActions();
   }

   showLoading() {
      this.loading = true;
   }

   hideLoading() {
      this.loading = false;
   }

   enable() {
      this.disabled = false;
   }

   disable() {
      this.disabled = true;
   }

   // Método para forzar la actualización del media
   async refreshMedia() {
      if (this._initialized && this.$media) {
         await this.setupMedia();
      }
   }

   // Método para cambiar el icono dinámicamente
   async setIcon(iconData) {
      this._icon = iconData;
      if (this._initialized && this.$media && !this._image) {
         await this.setupMedia();
      }
   }

   // Método para cambiar la imagen dinámicamente
   async setImage(imageUrl) {
      this._image = imageUrl;
      if (this._initialized && this.$media && !this._icon) {
         await this.setupMedia();
      }
   }

   
}

window.Card = Card;
if (!customElements.get('slice-card')) { customElements.define('slice-card', Card); }
return Card;
return Card;
})();

const SliceComponent_TechExpertise = (() => {
const techExpertiseData = SLICE_BUNDLE_DEPENDENCIES["Components/AtomicAppComponents/TechExpertise/data.js"].techExpertiseData;
class TechExpertise extends HTMLElement {
  static props = {
    title: { 
      type: 'string', 
      default: 'Technical Expertise', 
      required: false 
    },
    subtitle: { 
      type: 'string', 
      default: 'Technologies & tools I\'ve mastered through years of development', 
      required: false 
    },
    marqueeSpeed: { 
      type: 'number', 
      default: 500, 
      required: false 
    },
    showPauseButton: { 
      type: 'boolean', 
      default: false, 
      required: false 
    }
  };

  constructor(props) {
    super();
    slice.attachTemplate(this);

    // Referencias a elementos del DOM
    this.$expertiseTitle = this.querySelector('.expertise-title');
    this.$expertiseSubtitle = this.querySelector('.expertise-subtitle');

    // Datos para carruseles de badges individuales con colores únicos
    this.badgeCarousels = techExpertiseData;

    slice.controller.setComponentProps(this, props);
  }

  async init() {
    // Inicializar el componente
    this.initializeContent();
    
    // Crear carruseles individuales
    await this.createIndividualCarousels();
    
    // Aplicar animaciones iniciales
    this.animateInitialLoad();
  }

  initializeContent() {
    // Establecer títulos
    this.$expertiseTitle.textContent = this.title;
    this.$expertiseSubtitle.textContent = this.subtitle;
  }

  animateInitialLoad() {
    // Animación de entrada para el header
    this.$expertiseTitle.style.animation = 'fadeInDown 0.8s ease-out forwards';
    this.$expertiseSubtitle.style.animation = 'fadeInUp 0.8s ease-out 0.2s forwards';
  }

  async createIndividualCarousels() {
    // Crear contenedor para carruseles individuales
    const individualCarouselsContainer = document.createElement('div');
    individualCarouselsContainer.className = 'individual-carousels';
    
    // Crear título de la sección
    const sectionTitle = document.createElement('h3');
    sectionTitle.className = 'individual-carousels-title';
    sectionTitle.style.textAlign = 'center';
    sectionTitle.style.fontSize = '1.5rem';
    sectionTitle.style.marginBottom = '2rem';
    sectionTitle.style.color = 'var(--primary-color)';
    
    individualCarouselsContainer.appendChild(sectionTitle);
    
    // Crear cada carrusel de badges individual centrado
    for (let i = 0; i < this.badgeCarousels.length; i++) {
      const carouselData = this.badgeCarousels[i];
      
      const carousel = await slice.build('BadgeCarousel', {
        title: carouselData.category,
        badges: carouselData.skills,
        primaryColor: carouselData.color,
        secondaryColor: carouselData.color,
        accentColor: carouselData.color,
        autoPlay: true,
        marqueeSpeed: this.marqueeSpeed,
        showControls: this.showPauseButton,
        borderRadius: '12px',
        shadow: true
      });
      
      individualCarouselsContainer.appendChild(carousel);
    }
    
    // Agregar al contenido principal
    this.appendChild(individualCarouselsContainer);
  }
}

window.TechExpertise = TechExpertise;
if (!customElements.get("slice-techexpertise")) { customElements.define("slice-techexpertise", TechExpertise); }

return TechExpertise;
return TechExpertise;
})();

const SliceComponent_BadgeCarousel = (() => {

class BadgeCarousel extends HTMLElement {
  static props = {
    title: { 
      type: 'string', 
      default: 'Featured Skills', 
      required: false 
    },
    badges: { 
      type: 'array', 
      default: [], 
      required: false 
    },
    primaryColor: { 
      type: 'string', 
      default: 'var(--primary-color)', 
      required: false 
    },
    secondaryColor: { 
      type: 'string', 
      default: 'var(--secondary-color)', 
      required: false 
    },
    accentColor: { 
      type: 'string', 
      default: 'var(--accent-color)', 
      required: false 
    },
    autoPlay: { 
      type: 'boolean', 
      default: true, 
      required: false 
    },
    marqueeSpeed: { 
      type: 'number', 
      default: 15, 
      required: false 
    },
    showControls: { 
      type: 'boolean', 
      default: false, 
      required: false 
    },
    borderRadius: { 
      type: 'string', 
      default: '12px', 
      required: false 
    },
    shadow: { 
      type: 'boolean', 
      default: true, 
      required: false 
    }
  };

  constructor(props) {
    super();
    slice.attachTemplate(this);

    // Referencias a elementos del DOM
    this.$carouselTitle = this.querySelector('.carousel-title');
    this.$marqueeTrack = this.querySelector('.marquee-track');
    this.$pauseBtn = this.querySelector('[data-action="pause"]');
    this.$playBtn = this.querySelector('[data-action="play"]');

    // Estado del componente
    this.isMarqueePaused = false;
    this.marqueeAnimation = null;
    this.currentPosition = 0;
    this.badgeWidth = 0;
    this.trackWidth = 0;

    slice.controller.setComponentProps(this, props);
    this.debuggerProps = ['title', 'badges', 'primaryColor', 'secondaryColor', 'accentColor', 'autoPlay', 'marqueeSpeed', 'showControls', 'borderRadius', 'shadow'];
  }

  async init() {
    // Inicializar el componente
    this.initializeContent();
    this.setupEventListeners();
    
    // Esperar a que el DOM esté listo
    await this.waitForDOM();
    
    // Aplicar estilos personalizados
    this.applyCustomStyles();
    
    // Iniciar animación
    this.startMarquee();
    
    // Aplicar animaciones iniciales
    this.animateInitialLoad();
  }

  waitForDOM() {
    return new Promise(resolve => {
      if (this.$marqueeTrack.children.length > 0) {
        resolve();
      } else {
        const observer = new MutationObserver(() => {
          if (this.$marqueeTrack.children.length > 0) {
            observer.disconnect();
            resolve();
          }
        });
        observer.observe(this.$marqueeTrack, { childList: true });
      }
    });
  }

  initializeContent() {
    // Establecer título
    this.$carouselTitle.textContent = this.title;

    // Generar badges del marquee con duplicación para efecto infinito
    this.generateMarqueeBadges();
    
    // Ocultar controles si no se requiere
    if (!this.showControls) {
      this.$pauseBtn.style.display = 'none';
      this.$playBtn.style.display = 'none';
    }
  }

  generateMarqueeBadges() {
    this.$marqueeTrack.innerHTML = '';
    
    // Crear múltiples copias para el efecto infinito
    const copies = 4; // Más copias para asegurar continuidad
    
    for (let copy = 0; copy < copies; copy++) {
      this.badges.forEach((badge, index) => {
        const badgeElement = document.createElement('div');
        badgeElement.className = 'skill-badge';
        badgeElement.textContent = badge;
        badgeElement.style.animationDelay = `${index * 0.1}s`;
        this.$marqueeTrack.appendChild(badgeElement);
      });
    }
    
    console.log(`BadgeCarousel generated ${copies} copies of ${this.badges.length} badges`);
  }

  setupEventListeners() {
    // Controles del marquee solo si están habilitados
    if (this.showControls) {
      this.$pauseBtn.addEventListener('click', () => this.pauseMarquee());
      this.$playBtn.addEventListener('click', () => this.playMarquee());
    }
    
    // Hover para pausar auto-play
    this.addEventListener('mouseenter', () => this.pauseAutoPlay());
    this.addEventListener('mouseleave', () => this.resumeAutoPlay());
  }

  startMarquee() {
    if (this.isMarqueePaused) return;
    
    // Calculate duration based on content width to ensure consistent speed across different carousels
    // We use a reference width (e.g., 1000px) and scale the duration linearly.
    // This solves the issue where shorter carousels appear slower and longer ones appear faster
    // when using a fixed duration.
    let duration = this.marqueeSpeed;
    
    // Try to measure the width of the content
    // We divide by 4 because we created 4 copies in generateMarqueeBadges
    const totalWidth = this.$marqueeTrack.scrollWidth;
    const singleSetWidth = totalWidth > 0 ? totalWidth / 4 : 0;
    
    // Default reference width (approximate screen width or standard content width)
    const referenceWidth = 1000;
    
    if (singleSetWidth > 0) {
      // Formula: NewDuration = BaseDuration * (ActualWidth / ReferenceWidth)
      duration = this.marqueeSpeed * (singleSetWidth / referenceWidth);
    }

    // Aplicar animación CSS simple
    this.$marqueeTrack.style.animation = `marquee ${duration}s linear infinite`;
    
    console.log(`BadgeCarousel starting marquee with calculated duration: ${duration.toFixed(2)}s (base: ${this.marqueeSpeed}s, width: ${singleSetWidth}px)`);
  }

  pauseMarquee() {
    if (!this.showControls) return;
    
    this.isMarqueePaused = true;
    this.$marqueeTrack.style.animationPlayState = 'paused';
    
    this.$pauseBtn.style.display = 'none';
    this.$playBtn.style.display = 'block';
  }

  playMarquee() {
    if (!this.showControls) return;
    
    this.isMarqueePaused = false;
    this.$marqueeTrack.style.animationPlayState = 'running';
    
    this.$playBtn.style.display = 'none';
    this.$pauseBtn.style.display = 'block';
  }

  pauseAutoPlay() {
    if (this.autoPlay) {
      this.pauseMarquee();
    }
  }

  resumeAutoPlay() {
    if (this.autoPlay && this.isMarqueePaused) {
      this.playMarquee();
    }
  }

  applyCustomStyles() {
    const carousel = this.querySelector('.badge-carousel');
    
    // Aplicar colores personalizados
    carousel.style.setProperty('--carousel-primary', this.primaryColor);
    carousel.style.setProperty('--carousel-secondary', this.secondaryColor);
    carousel.style.setProperty('--carousel-accent', this.accentColor);
    
    // Aplicar estilos adicionales
    if (this.borderRadius) {
      carousel.style.setProperty('--carousel-radius', this.borderRadius);
    }
    
    if (this.shadow) {
      carousel.style.setProperty('--carousel-shadow', '0 8px 25px rgba(0, 0, 0, 0.1)');
    }
  }

  animateInitialLoad() {
    // Animación de entrada para el header
    this.$carouselTitle.style.animation = 'fadeInDown 0.8s ease-out forwards';
    
    // Animación para los badges
    const badges = this.$marqueeTrack.querySelectorAll('.skill-badge');
    badges.forEach((badge, index) => {
      badge.style.animation = `slideInUp 0.6s ease-out ${0.2 + index * 0.05}s forwards`;
    });
  }

  // Métodos públicos para personalización
  updateBadges(newBadges) {
    this.badges = newBadges;
    this.generateMarqueeBadges();
    
    // Reiniciar el marquee si está activo
    if (!this.isMarqueePaused) {
      this.startMarquee();
    }
  }

  // Getters y Setters
  get configuration() {
    return {
      title: this.title,
      badges: this.badges,
      primaryColor: this.primaryColor,
      secondaryColor: this.secondaryColor,
      accentColor: this.accentColor,
      autoPlay: this.autoPlay,
      marqueeSpeed: this.marqueeSpeed,
      showControls: this.showControls,
      borderRadius: this.borderRadius,
      shadow: this.shadow
    };
  }

  set configuration(value) {
    Object.assign(this, value);
    this.initializeContent();
    this.applyCustomStyles();
  }

  // Métodos de control
  play() {
    this.playMarquee();
  }

  pause() {
    this.pauseMarquee();
  }
}

window.BadgeCarousel = BadgeCarousel;
if (!customElements.get("slice-badge-carousel")) { customElements.define("slice-badge-carousel", BadgeCarousel); }

return BadgeCarousel;
return BadgeCarousel;
})();

const SliceComponent_ImageCarrousel = (() => {

class ImageCarrousel extends HTMLElement {
  static props = {
    images: {
      type: 'array',
      default: [],
      required: false
    },
    autoplay: {
      type: 'boolean',
      default: true,
      required: false
    },
    autoplaySpeed: {
      type: 'number',
      default: 5000,
      required: false
    },
    showIndicators: {
      type: 'boolean',
      default: true,
      required: false
    },
    showNavigation: {
      type: 'boolean',
      default: true,
      required: false
    }
  };

  constructor(props) {
    super();
    slice.attachTemplate(this);

    this.$carousel = this.querySelector('.carousel-container');
    this.$slides = this.querySelector('.carousel-slides');
    this.$indicators = this.querySelector('.carousel-indicators');
    this.$prevBtn = this.querySelector('.carousel-prev');
    this.$nextBtn = this.querySelector('.carousel-next');
    this.$currentSlide = this.querySelector('.current-slide-number');
    this.$totalSlides = this.querySelector('.total-slides');

    slice.controller.setComponentProps(this, props);
    this.debuggerProps = [];
    
    this.currentIndex = 0;
    this.autoplayInterval = null;
    this.isTransitioning = false;
    this._initialized = false;
  }

  async init() {
    if (this.images && this.images.length > 0) {
      this.setupCarousel();
      this.setupEventListeners();
      this.updateSlideDisplay();
      
      // Verificar que el elemento carousel existe
      console.log('Carousel element:', this.$carousel);
      console.log('Autoplay enabled:', this.autoplay);
      
      if (this.autoplay) {
        this.startAutoplay();
      }
      
      this._initialized = true;
    }
  }

  setupCarousel() {
    // Limpiar contenido existente
    this.$slides.innerHTML = '';
    this.$indicators.innerHTML = '';

    // Crear slides
    this.images.forEach((image, index) => {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide';
      
      // Configurar estado inicial
      if (index === 0) {
        slide.style.display = 'block';
        slide.style.opacity = '1';
        slide.classList.add('active');
      } else {
        slide.style.display = 'none';
        slide.style.opacity = '0';
      }
      
      const img = document.createElement('img');
      img.src = image.url;
      img.alt = image.alt || `Slide ${index + 1}`;
      img.className = 'carousel-image';
      
      const overlay = document.createElement('div');
      overlay.className = 'carousel-overlay';
      
      const label = document.createElement('div');
      label.className = 'carousel-label';
      label.textContent = image.label || '';
      
      const date = document.createElement('div');
      date.className = 'carousel-date';
      date.textContent = image.date || '';
      
      overlay.appendChild(label);
      overlay.appendChild(date);
      slide.appendChild(img);
      slide.appendChild(overlay);
      this.$slides.appendChild(slide);

      // Crear indicadores
      if (this.showIndicators) {
        const indicator = document.createElement('button');
        indicator.className = 'carousel-indicator';
        indicator.setAttribute('data-slide', index);
        indicator.addEventListener('click', () => {
          this.goToSlide(index);
          // Resetear autoplay cuando se hace clic en un indicador
          this.resetAutoplayTimer();
        });
        this.$indicators.appendChild(indicator);
      }
    });

    // Activar el primer indicador
    if (this.showIndicators && this.$indicators.children.length > 0) {
      this.$indicators.children[0].classList.add('active');
    }

    // Actualizar contadores
    if (this.$totalSlides) {
      this.$totalSlides.textContent = this.images.length;
    }
  }

  setupEventListeners() {
    if (this.$prevBtn) {
      this.$prevBtn.addEventListener('click', () => {
        this.previousSlide();
        // Resetear autoplay cuando se hace clic en botón anterior
        this.resetAutoplayTimer();
      });
    }
    
    if (this.$nextBtn) {
      this.$nextBtn.addEventListener('click', () => {
        this.nextSlide();
        // Resetear autoplay cuando se hace clic en botón siguiente
        this.resetAutoplayTimer();
      });
    }

    // Usar el elemento raíz del componente para el hover (más confiable)
    this.addEventListener('mouseenter', () => {
      console.log('Mouse enter - pausando autoplay');
      this.pauseAutoplay();
    });
    
    this.addEventListener('mouseleave', () => {
      console.log('Mouse leave - reanudando autoplay');
      if (this.autoplay) {
        this.startAutoplay();
      }
    });
    
    // Añadir soporte para gestos táctiles
    this.setupTouchSupport();
  }

  setupTouchSupport() {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    let touchStartTime = 0;
    
    this.$carousel.addEventListener('touchstart', (e) => {
      if (this.isTransitioning) return;
      
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      touchStartTime = Date.now();
      
      // Pausar autoplay durante el touch
      this.pauseAutoplay();
    });
    
    this.$carousel.addEventListener('touchend', (e) => {
      if (this.isTransitioning) return;
      
      endX = e.changedTouches[0].clientX;
      endY = e.changedTouches[0].clientY;
      
      const diffX = startX - endX;
      const diffY = startY - endY;
      const touchDuration = Date.now() - touchStartTime;
      
      // Solo procesar si el swipe es horizontal, suficientemente largo y rápido
      if (Math.abs(diffX) > Math.abs(diffY) && 
          Math.abs(diffX) > 50 && 
          touchDuration < 500) {
        
        if (diffX > 0) {
          this.nextSlide();
        } else {
          this.previousSlide();
        }
        
        // Resetear autoplay cuando se hace swipe
        this.resetAutoplayTimer();
      } else {
        // Reanudar autoplay después del touch si no hubo swipe
        if (this.autoplay) {
          setTimeout(() => this.startAutoplay(), 1000);
        }
      }
    });
    
    // Prevenir scroll durante el touch en el carrusel
    this.$carousel.addEventListener('touchmove', (e) => {
      if (Math.abs(startX - e.touches[0].clientX) > 10) {
        e.preventDefault();
      }
    }, { passive: false });
  }

  goToSlide(index) {
    if (index < 0 || index >= this.images.length) return;
    if (index === this.currentIndex) return;
    
    this.goToSlideSmooth(index);
  }

  async goToSlideSmooth(index) {
    if (index < 0 || index >= this.images.length) return;
    if (index === this.currentIndex) return;
    
    const currentSlide = this.$slides.children[this.currentIndex];
    const newSlide = this.$slides.children[index];
    
    if (!currentSlide || !newSlide) return;
    
    // Prevenir múltiples transiciones simultáneas
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    
    try {
      // Fade out del slide actual
      currentSlide.style.opacity = '0';
      currentSlide.classList.remove('active');
      
      // Esperar a que termine la transición de opacity
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Ocultar slide actual
      currentSlide.style.display = 'none';
      
      // Preparar nuevo slide
      newSlide.style.display = 'block';
      newSlide.style.opacity = '0';
      
      // Forzar reflow para que la transición funcione correctamente
      newSlide.offsetHeight;
      
      // Fade in del nuevo slide
      newSlide.style.opacity = '1';
      newSlide.classList.add('active');
      
      // Esperar a que termine la transición de opacity
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Actualizar indicadores con transición suave
      this.updateIndicators(index);
      
      this.currentIndex = index;
      this.updateSlideDisplay();
      
    } catch (error) {
      console.error('Error during slide transition:', error);
    } finally {
      this.isTransitioning = false;
    }
  }

  waitForAnimation(element, animationClass) {
    return new Promise((resolve) => {
      const handleAnimationEnd = () => {
        element.removeEventListener('animationend', handleAnimationEnd);
        resolve();
      };
      
      element.addEventListener('animationend', handleAnimationEnd);
      
      // Fallback: si la animación no se ejecuta, resolver después de un tiempo
      setTimeout(resolve, 700);
    });
  }

  updateIndicators(activeIndex) {
    if (!this.showIndicators) return;
    
    const indicators = this.$indicators.children;
    
    // Remover clase active del indicador actual con transición suave
    if (indicators[this.currentIndex]) {
      indicators[this.currentIndex].classList.remove('active');
    }
    
    // Añadir clase active al nuevo indicador con transición suave
    if (indicators[activeIndex]) {
      setTimeout(() => {
        indicators[activeIndex].classList.add('active');
      }, 150);
    }
  }

  nextSlide() {
    if (this.isTransitioning) return;
    const nextIndex = (this.currentIndex + 1) % this.images.length;
    this.goToSlideSmooth(nextIndex);
  }

  previousSlide() {
    if (this.isTransitioning) return;
    const prevIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
    this.goToSlideSmooth(prevIndex);
  }

  updateSlideDisplay() {
    if (this.$currentSlide) {
      this.$currentSlide.textContent = this.currentIndex + 1;
    }
  }

  startAutoplay() {
    // Siempre limpiar el interval existente primero
    this.pauseAutoplay();
    
    if (this.autoplay && !this.isTransitioning) {
      console.log('Iniciando autoplay con velocidad:', this.autoplaySpeed);
      this.autoplayInterval = setInterval(() => {
        if (!this.isTransitioning) {
          console.log('Autoplay: cambiando slide automáticamente');
          this.nextSlide();
        }
      }, this.autoplaySpeed);
    }
  }

  pauseAutoplay() {
    console.log('Pausando autoplay, interval existe:', !!this.autoplayInterval);
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
      console.log('Autoplay pausado correctamente');
    }
  }

  resumeAutoplay() {
    if (this.autoplay && !this.autoplayInterval) {
      this.startAutoplay();
    }
  }

  // Resetear el timer del autoplay
  resetAutoplayTimer() {
    if (this.autoplay && !this.isTransitioning) {
      console.log('Reseteando autoplay timer');
      // Pausa el actual y reinicia uno nuevo
      this.startAutoplay();
    }
  }

  resetTransitionState() {
    this.isTransitioning = false;
    
    // Limpiar todas las clases de animación
    const slides = this.$slides.children;
    for (let slide of slides) {
      slide.classList.remove('fade-in', 'fade-out');
    }
  }

  pauseAllAnimations() {
    this.pauseAutoplay();
    this.isTransitioning = true;
  }

  resumeAllAnimations() {
    this.isTransitioning = false;
    if (this.autoplay) {
      this.startAutoplay();
    }
  }

  // Getters y Setters
  get images() { return this._images || []; }
  set images(value) {
    this._images = value;
    if (this._initialized) {
      this.resetTransitionState();
      this.setupCarousel();
    }
  }

  get autoplay() { return this._autoplay !== false; }
  set autoplay(value) {
    this._autoplay = Boolean(value);
    if (this._autoplay && !this.isTransitioning) {
      this.startAutoplay();
    } else {
      this.pauseAutoplay();
    }
  }

  get autoplaySpeed() { return this._autoplaySpeed || 5000; }
  set autoplaySpeed(value) {
    this._autoplaySpeed = value;
    if (this.autoplay && !this.isTransitioning) {
      this.startAutoplay();
    }
  }

  get showIndicators() { return this._showIndicators !== false; }
  set showIndicators(value) {
    this._showIndicators = Boolean(value);
    if (this._initialized) {
      this.setupCarousel();
    }
  }

  get showNavigation() { return this._showNavigation !== false; }
  set showNavigation(value) {
    this._showNavigation = Boolean(value);
    if (this._initialized) {
      this.setupCarousel();
    }
  }
}

window.ImageCarrousel = ImageCarrousel;
if (!customElements.get("slice-imagecarrousel")) { customElements.define("slice-imagecarrousel", ImageCarrousel); }
return ImageCarrousel;
return ImageCarrousel;
})();

const SliceComponent_RandomFacts = (() => {
const factsData = SLICE_BUNDLE_DEPENDENCIES["Components/AtomicAppComponents/RandomFacts/data.js"].default !== undefined ? SLICE_BUNDLE_DEPENDENCIES["Components/AtomicAppComponents/RandomFacts/data.js"].default : SLICE_BUNDLE_DEPENDENCIES["Components/AtomicAppComponents/RandomFacts/data.js"].dataData;
class RandomFacts extends HTMLElement {
    static props = {
        maxNotes: { type: 'number', default: 6 },
        refreshInterval: { type: 'number', default: 4000 }
    };

    constructor(props) {
        super();
        slice.attachTemplate(this);
        this.notes = []; 
        this.slots = []; 
        this.zIndexCounter = 10;
        this.cycleIntervalId = null;
        this.userNotes = [];
        slice.controller.setComponentProps(this, props);
    }

    async init() {
        this.$board = this.querySelector('#corkboard');
        this.$addBtn = this.querySelector('#add-note-btn');
        this.$trashCan = this.querySelector('#trash-can');
        requestAnimationFrame(() => {
            this.loadUserNotes();
            this.initializeSlots();
            this.initialRender();
            this.addDragFunctionality();
            this.startCycle();
            this.setupControls();
        });
    }

    disconnectedCallback() {
        if (this.cycleIntervalId) clearInterval(this.cycleIntervalId);
    }

    initializeSlots() {
        const board = this.$board;
        const boardWidth = board.offsetWidth || 800;
        const boardHeight = board.offsetHeight || 600;
        const cols = 3;
        const rows = Math.ceil(this.maxNotes / cols);
        const sectionWidth = boardWidth / cols;
        const sectionHeight = boardHeight / rows;

        this.slots = [];
        for (let i = 0; i < this.maxNotes; i++) {
            const colIndex = i % cols;
            const rowIndex = Math.floor(i / cols);
            this.slots.push({
                index: i,
                xBase: colIndex * sectionWidth,
                yBase: rowIndex * sectionHeight,
                width: sectionWidth,
                height: sectionHeight,
                note: null
            });
        }
    }

    getRandomFact(excludeFacts = []) {
        const displayedTexts = this.slots
            .map(s => s.note ? s.note.querySelector('span')?.textContent : '')
            .filter(t => t);
        const availableFacts = factsData.filter(f => !displayedTexts.includes(f.text));
        if (availableFacts.length === 0) return factsData[Math.floor(Math.random() * factsData.length)];
        return availableFacts[Math.floor(Math.random() * availableFacts.length)];
    }

    createNoteElement(fact, isUser = false) {
        const note = document.createElement('div');
        note.classList.add('sticky-note');
        
        // Define textContainer first so we can reference it in event listeners
        const textContainer = document.createElement(isUser ? 'div' : 'span');

        if (isUser) {
            note.classList.add('user-note');
            note.dataset.id = fact.id;

            // Edit Button (Pencil)
            const editBtn = document.createElement('div');
            editBtn.className = 'edit-note-btn';
            editBtn.title = 'Edit Note';
            editBtn.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`;
            editBtn.addEventListener('click', (e) => {
                e.preventDefault(); 
                e.stopPropagation();
                textContainer.focus();
            });
            note.appendChild(editBtn); // Append button to note

        } else {
            note.classList.add(`type-${fact.type}`);
            const pin = document.createElement('div');
            pin.className = 'pin-indicator';
            pin.title = 'Click to pin this fact';
            note.appendChild(pin);
        }

        if (isUser) {
            textContainer.className = 'editable-content';
            textContainer.contentEditable = true;
            textContainer.innerText = fact.text;
            textContainer.addEventListener('input', () => {
                const noteId = note.dataset.id;
                const userNote = this.userNotes.find(n => n.id === noteId);
                if (userNote) {
                    userNote.text = textContainer.innerText;
                    this.saveUserNotes();
                }
            });
        } else {
            textContainer.textContent = fact.text;
        }
        note.appendChild(textContainer);

        note.dataset.rotation = fact.rotation || (Math.random() * 10 - 5);
        note.style.transform = `scale(0) rotate(0deg)`;
        note.style.opacity = '0';
        return note;
    }

    positionNoteInSlot(note, slot) {
        const noteWidth = 200;
        const noteHeight = 200;
        const maxOffsetX = slot.width - noteWidth - 20;
        const maxOffsetY = slot.height - noteHeight - 20;
        const rangeX = Math.max(0, maxOffsetX);
        const rangeY = Math.max(0, maxOffsetY);
        const offsetX = Math.random() * rangeX + 10;
        const offsetY = Math.random() * rangeY + 10;
        const left = slot.xBase + offsetX;
        const top = slot.yBase + offsetY;
        note.style.left = `${left}px`;
        note.style.top = `${top}px`;
    }

    animateEntrance(note, rotation) {
        note.animate([
            { transform: 'scale(0) rotate(0deg)', opacity: 0 },
            { transform: `scale(1) rotate(${rotation}deg)`, opacity: 1 }
        ], { duration: 500, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' });
    }

    async animateExit(note) {
        const animation = note.animate([
            { transform: note.style.transform || 'scale(1)', opacity: 1 },
            { transform: 'scale(0) rotate(0deg)', opacity: 0 }
        ], { duration: 400, easing: 'ease-in', fill: 'forwards' });
        await animation.finished;
        note.remove();
    }

    initialRender() {
        if (!this.$board) return;
        this.$board.querySelectorAll('.sticky-note').forEach(n => n.remove());
        
        this.slots.forEach((slot, index) => {
            const fact = this.getRandomFact();
            const note = this.createNoteElement(fact);
            this.positionNoteInSlot(note, slot);
            this.$board.appendChild(note);
            slot.note = note;
            setTimeout(() => { this.animateEntrance(note, fact.rotation); }, index * 100);
        });

        this.userNotes.forEach((uNote, index) => {
            const note = this.createNoteElement(uNote, true);
            note.style.left = uNote.x + 'px';
            note.style.top = uNote.y + 'px';
            this.$board.appendChild(note);
            setTimeout(() => { this.animateEntrance(note, uNote.rotation); }, (this.slots.length + index) * 100);
        });
    }

    startCycle() {
        this.cycleIntervalId = setInterval(async () => {
            await this.cycleRandomNote();
        }, this.refreshInterval);
    }

    async cycleRandomNote() {
        if (this.slots.length === 0) return;
        const slotIndex = Math.floor(Math.random() * this.slots.length);
        const slot = this.slots[slotIndex];
        
        if (slot.note) {
            if (slot.note.classList.contains('dragging')) return;
            if (slot.note.dataset.pinned === 'true') return;
            const oldNote = slot.note;
            this.animateExit(oldNote);
            slot.note = null; 
        }

        const fact = this.getRandomFact();
        const note = this.createNoteElement(fact);
        this.zIndexCounter++;
        note.style.zIndex = this.zIndexCounter;
        this.positionNoteInSlot(note, slot);
        this.$board.appendChild(note);
        slot.note = note;
        this.animateEntrance(note, fact.rotation);
    }

    setupControls() {
        if (this.$addBtn) {
            this.$addBtn.addEventListener('click', () => { this.createNewUserNote(); });
        }
    }

    loadUserNotes() {
        try {
            const data = sessionStorage.getItem('slice_user_notes');
            this.userNotes = data ? JSON.parse(data) : [];
        } catch (e) { this.userNotes = []; }
    }
  
    saveUserNotes() {
        sessionStorage.setItem('slice_user_notes', JSON.stringify(this.userNotes));
    }

    createNewUserNote() {
        const id = Date.now().toString();
        const rotation = Math.random() * 6 - 3;
        const boardWidth = this.$board.offsetWidth;
        const boardHeight = this.$board.offsetHeight;
        const x = boardWidth / 2 - 100 + (Math.random() * 40 - 20);
        const y = boardHeight / 2 - 100 + (Math.random() * 40 - 20);

        const newNoteData = { id, text: 'Type here...', type: 'user', x, y, rotation };
        this.userNotes.push(newNoteData);
        this.saveUserNotes();

        const note = this.createNoteElement(newNoteData, true);
        note.style.left = `${x}px`;
        note.style.top = `${y}px`;
        this.zIndexCounter++;
        note.style.zIndex = this.zIndexCounter;
        this.$board.appendChild(note);
        this.animateEntrance(note, rotation);
    }

    addDragFunctionality() {
        const board = this.$board;
        if (!board) return;
        
        board.addEventListener('click', (e) => {
            if (e.target.classList.contains('pin-indicator')) {
                e.stopPropagation();
                const note = e.target.closest('.sticky-note');
                if (note) {
                    const isPinned = note.dataset.pinned === 'true';
                    note.dataset.pinned = !isPinned;
                    e.target.classList.toggle('pinned', !isPinned);
                }
            }
        });

        let activeNote = null;
        let initialX, initialY;
        
        const startDrag = (e, clientX, clientY) => {
            if (e.target.classList.contains('pin-indicator')) return;
            if (e.target.closest('.edit-note-btn')) return; // Allow edit button click w/o drag

            const note = e.target.closest('.sticky-note');
            
            // Allow text selection interaction
            if (e.target.classList.contains('editable-content')) {
                return;
            }

            if (note) {
               activeNote = note;
               this.zIndexCounter++;
               activeNote.style.zIndex = this.zIndexCounter;
               initialX = clientX - note.offsetLeft;
               initialY = clientY - note.offsetTop;
               activeNote.classList.add('dragging');
            }
        };

        board.addEventListener('mousedown', (e) => startDrag(e, e.clientX, e.clientY));
        board.addEventListener('touchstart', (e) => {
             const touch = e.touches[0];
             startDrag(e, touch.clientX, touch.clientY);
        }, { passive: false });

        const endDrag = () => {
             if (activeNote) {
                if (this.$trashCan) {
                    const trashRect = this.$trashCan.getBoundingClientRect();
                    // Check if mouse point is inside trash rect (more stable than element overlap during transform)
                    // We use last known client coords if passed, or we rely on the visual state set in moveDrag for feedback
                    // Actually, simpler: check if the 'trash-hover' class is present on the note? 
                    // No, safe is to re-check coords or rely on state.
                    // Let's check mouse pos if we can, but endDrag doesn't get coords easily.
                    // BUT, moveDrag sets the state. If activeNote has 'trash-hover', it's in the trash.
                    
                    if (activeNote.classList.contains('trash-hover')) {
                        this.deleteNote(activeNote);
                        activeNote = null;
                        this.$trashCan.classList.remove('drag-over');
                        return;
                    }
                }

                activeNote.classList.remove('dragging');
                activeNote.classList.remove('trash-hover'); // Ensure trash-hover is removed
                if (activeNote && activeNote.classList.contains('user-note')) {
                     const id = activeNote.dataset.id;
                     const uNote = this.userNotes.find(n => n.id === id);
                     if (uNote) {
                         uNote.x = parseFloat(activeNote.style.left);
                         uNote.y = parseFloat(activeNote.style.top);
                         this.saveUserNotes();
                     }
                }
                activeNote = null;
            }
            if (this.$trashCan) this.$trashCan.classList.remove('drag-over');
        };

        board.addEventListener('mouseup', endDrag);
        board.addEventListener('touchend', endDrag);

        const moveDrag = (e, clientX, clientY) => {
            if (activeNote) {
                e.preventDefault();
                const currentX = clientX - initialX;
                const currentY = clientY - initialY;
                const boardWidth = board.offsetWidth;
                const boardHeight = board.offsetHeight;
                const noteWidth = activeNote.offsetWidth;
                const noteHeight = activeNote.offsetHeight;
                let newLeft = Math.max(0, Math.min(currentX, boardWidth - noteWidth));
                let newTop = Math.max(0, Math.min(currentY, boardHeight - noteHeight));

                activeNote.style.left = `${newLeft}px`;
                activeNote.style.top = `${newTop}px`;

                if (this.$trashCan) {
                     const trashRect = this.$trashCan.getBoundingClientRect();
                     const mouseX = clientX;
                     const mouseY = clientY;
                     
                     const isOver = (mouseX >= trashRect.left && mouseX <= trashRect.right &&
                                   mouseY >= trashRect.top && mouseY <= trashRect.bottom);

                     if (isOver) {
                        this.$trashCan.classList.add('drag-over');
                        activeNote.classList.add('trash-hover');
                     } else {
                        this.$trashCan.classList.remove('drag-over');
                        activeNote.classList.remove('trash-hover');
                     }
                }
            }
        };

        board.addEventListener('mousemove', (e) => moveDrag(e, e.clientX, e.clientY));
        board.addEventListener('touchmove', (e) => {
            const touch = e.touches[0];
            moveDrag(e, touch.clientX, touch.clientY);
        }, { passive: false });
    }

    async deleteNote(note) {
        const db = note.animate([
            { transform: note.style.transform, opacity: 1 },
            { transform: 'scale(0.1) rotate(720deg)', opacity: 0 }
        ], { duration: 300, easing: 'ease-in', fill: 'forwards' });
        await db.finished;
        
        if (note.classList.contains('user-note')) {
            const id = note.dataset.id;
            this.userNotes = this.userNotes.filter(n => n.id !== id);
            this.saveUserNotes();
        } else {
            const slot = this.slots.find(s => s.note === note);
            if (slot) {
                slot.note = null;
                this.spawnFactInSlot(slot);
            }
        }
        note.remove();
    }

    spawnFactInSlot(slot) {
        const fact = this.getRandomFact();
        const note = this.createNoteElement(fact);
        this.positionNoteInSlot(note, slot);
        this.$board.appendChild(note);
        slot.note = note;
        this.animateEntrance(note, fact.rotation);
    }
}


window.RandomFacts = RandomFacts;
if (!customElements.get('random-facts')) { customElements.define('random-facts', RandomFacts); }
return RandomFacts;
return RandomFacts;
})();

const SliceComponent_ExperienceSection = (() => {
const experienceData = SLICE_BUNDLE_DEPENDENCIES["Components/AppComponents/ExperienceSection/data.js"].default !== undefined ? SLICE_BUNDLE_DEPENDENCIES["Components/AppComponents/ExperienceSection/data.js"].default : SLICE_BUNDLE_DEPENDENCIES["Components/AppComponents/ExperienceSection/data.js"].dataData;
class ExperienceSection extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);
      
      this.$container = this.querySelector('.experience-container');
      this.$timeline = this.querySelector('.experience-timeline');
      
      slice.controller.setComponentProps(this, props);
      this.debuggerProps = [];
      this.experienceData = experienceData  || [];
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
         const getYear = (str) => {
             const match = str && str.match(/\d{4}/);
             return match ? parseInt(match[0]) : 0;
         };
         // If IDs are chronological, use IDs? But date parsing is safer if IDs are arbitrary
         // Assuming b is more recent
         return getYear(b.period) - getYear(a.period);
      });

      // Prepare items for Timeline component
      const timelineItems = sortedExperience.map(exp => ({
          id: exp.id,
          date: exp.period ? exp.period.split(' - ')[0] : '', // E.g. "2024"
          label: exp.company,
          fullData: exp
      }));

      // Build Timeline
      const timeline = await slice.build('Timeline', {
         items: timelineItems,
         orientation: 'horizontal',
         title: 'My Journey Map',
         description: 'Explore my professional path. Drag nodes to reshape the timeline or click to view details.'
      });

      // Create Tabs/Carousel for detailed view
      const cards = [];
      for (const [index, experience] of sortedExperience.entries()) {
         const experienceCard = await slice.build('ExperienceCard', {
            experience: experience,
         });
         experienceCard.style.width = '100%';
         experienceCard.style.maxWidth = '900px'; 
         cards.push(experienceCard);
      }

      const tabs = await slice.build('Tabs', {
         items: cards.map((card, index) => ({
             label: sortedExperience[index].company,
             content: card
         })),
         orientation: 'horizontal'
      });
      
      // Layout: Tabs on TOP, Timeline on BOTTOM
      this.$timeline.appendChild(tabs);
      
      const timelineWrapper = document.createElement('div');
      timelineWrapper.style.marginTop = '2rem'; // Reduced space from 4rem
      timelineWrapper.style.width = '100%';
      timelineWrapper.appendChild(timeline);
      
      this.$timeline.appendChild(timelineWrapper);
      
      // Bi-directional sync
      timeline.addEventListener('timeline-select', (e) => {
          console.log('Caught timeline-select', e.detail.index);
          tabs.activateTab(e.detail.index);
      });
      
      tabs.addEventListener('tab-change', (e) => {
          timeline.setActive(e.detail.index);
      });

      // Select first by default
      /*
      if (sortedExperience.length > 0) {
          // Tabs selects first by default usually, so we just sync timeline
          timeline.setActive(0);
      }
      */
   }

   // Removed showExperience as it's handled by Tabs now


}

window.ExperienceSection = ExperienceSection;
if (!customElements.get('slice-experience-section')) { customElements.define('slice-experience-section', ExperienceSection); }
return ExperienceSection;
return ExperienceSection;
})();

const SliceComponent_Timeline = (() => {

class Timeline extends HTMLElement {

  static props = {
    // Expected items format: [{ id, date, label, ... }]
    "items": { 
         type: 'array', 
         default: [], 
         required: true 
      },
    "orientation": {
        type: 'string', // 'horizontal' or 'vertical'
        default: 'horizontal',
        required: false
    },
    // Add title props
    "title": { type: 'string', default: '', required: false },
    "description": { type: 'string', default: '', required: false },
    "onSelect": {
        type: 'function',
        required: false
    }
  }

  constructor(props) {
    super();
    slice.attachTemplate(this);
    this.$container = this.querySelector('.slice-timeline-wrapper');
    this.$list = this.querySelector('.timeline-list');
    this.$svg = this.querySelector('.timeline-svg');
    this.$style = null; 
    
    // Default state
    this._items = [];
    this.activeIndex = 0;
    this.offsets = [];
    this.orientation = 'horizontal';

    // Drag State
    this.isDragging = false;
    this.draggedIndex = -1;
    this.dragStartY = 0;
    this.dragStartX = 0;
    this.initialOffsetX = 0;
    this.initialOffsetY = 0;

    // Bind methods
    this.drawLines = this.drawLines.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragMove = this.handleDragMove.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    
    // Configurable ResizeObserver
    this.resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(this.drawLines);
    });

    slice.controller.setComponentProps(this, props);
  }

  set items(value) {
      if (!Array.isArray(value)) return;
      this._items = value;
      // Pre-calculate random offsets
      this.generateOffsets();
      this.render();
  }

  generateOffsets() {
      // Initialize with X and Y offsets
      // Use reasonable random range for initial scattering if desired
      this.offsets = this._items.map(() => {
          return {
              x: Math.floor(Math.random() * 40) - 20,
              // Favor downward dispersion to avoid hitting the title above
              // Range: -20px (slight up) to +100px (deep down)
              y: Math.floor(Math.random() * 120) - 20
          };
      });
  }

  get items() {
      return this._items || [];
  }

  init() {
    this.render();
    if(this.$container) {
        this.resizeObserver.observe(this.$container);
    }
    
    // Add global move/up listeners for drag
    window.addEventListener('mousemove', this.handleDragMove);
    window.addEventListener('mouseup', this.handleDragEnd);
    // Touch support could be added similarly
  }

  disconnectedCallback() {
      if(this.resizeObserver) {
          this.resizeObserver.disconnect();
      }
      window.removeEventListener('resize', this.drawLines);
      window.removeEventListener('mousemove', this.handleDragMove);
      window.removeEventListener('mouseup', this.handleDragEnd);
  }

  render() {
    this.$container.innerHTML = ''; // Clear container to rebuild structure
    
    // Add Header if props exist
    if (this.title || this.description) {
        const header = document.createElement('div');
        header.className = 'timeline-header';
        header.style.textAlign = 'center';
        header.style.marginBottom = '3rem'; // Enough clearance for -20px offset + padding
        header.style.zIndex = '5';
        header.style.position = 'relative'; 
        
        if(this.title) {
            const h3 = document.createElement('h3');
            h3.textContent = this.title;
            h3.style.color = 'var(--primary-color)';
            h3.style.marginBottom = '0.5rem';
            header.appendChild(h3);
        }
        if(this.description) {
            const p = document.createElement('p');
            p.textContent = this.description;
            p.style.opacity = '0.8';
            p.style.fontSize = '0.9rem';
            p.style.maxWidth = '600px';
            p.style.margin = '0 auto';
            header.appendChild(p);
        }
        this.$container.appendChild(header);
    }

    // Re-add SVG and List to container
    this.$container.appendChild(this.$svg);
    this.$container.appendChild(this.$list);

    if (!this.items || this.items.length === 0) return;
    
    // Apply orientation class
    this.$container.classList.remove('horizontal', 'vertical');
    this.$container.classList.add(this.orientation);

    this.$list.innerHTML = '';
    
    this.items.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add('timeline-item');
        if (index === this.activeIndex) li.classList.add('active');
        
        // Random offset
        const offset = this.offsets[index] || { x: 0, y: 0 };
        
        // Apply 2D transform
        li.style.transform = `translate(${offset.x}px, ${offset.y}px)`;

        // Interaction
        li.addEventListener('click', (e) => {
             // Avoid selecting if we were dragging
             if (this.wasDragging) {
                 this.wasDragging = false;
                 return;
             }
             this.selectItem(index);
        });
        
        // Drag Start
        li.addEventListener('mousedown', (e) => this.handleDragStart(e, index));

        // Structure
        const dateSpan = document.createElement('span');
        dateSpan.className = 'timeline-date';
        dateSpan.textContent = item.date;

        const dot = document.createElement('div');
        dot.className = 'timeline-dot';

        const labelSpan = document.createElement('span');
        labelSpan.className = 'timeline-label';
        labelSpan.textContent = item.label;

        li.appendChild(dateSpan);
        li.appendChild(dot);
        li.appendChild(labelSpan);
        
        this.$list.appendChild(li);
    });
    
    requestAnimationFrame(() => this.drawLines());
  }
  
  handleDragStart(e, index) {
      // Prevent drag if using right click or something
      if (e.button !== 0) return;
      
      this.isDragging = true;
      this.draggedIndex = index;
      this.dragStartY = e.clientY;
      this.dragStartX = e.clientX;
      
      const currentOffset = this.offsets[index] || { x: 0, y: 0 };
      this.initialOffsetX = currentOffset.x;
      this.initialOffsetY = currentOffset.y;
      
      // Calculate constraints
      const li = this.$list.children[index];
      const containerRect = this.$container.getBoundingClientRect();
      const liRect = li.getBoundingClientRect();
      
      // Calculate Max Deltas based on current visual position vs container bounds
      // Left Edge: liRect.left + delta >= containerRect.left
      const minDeltaX = containerRect.left - liRect.left + 10; // +10 padding
      const maxDeltaX = containerRect.right - liRect.right - 10;
      
      const minDeltaY = containerRect.top - liRect.top + 10;
      const maxDeltaY = containerRect.bottom - liRect.bottom - 10;
      
      this.dragConstraints = { minX: minDeltaX, maxX: maxDeltaX, minY: minDeltaY, maxY: maxDeltaY };
      
      this.wasDragging = false;
      
      li.style.transition = 'none'; // Disable transition for instant follow
      li.classList.add('dragging');
  }
  
  handleDragMove(e) {
      if (!this.isDragging || this.draggedIndex === -1) return;
      
      e.preventDefault(); // Stop text selection
      this.wasDragging = true; // Mark as drag action
      
      const rawDeltaX = e.clientX - this.dragStartX;
      const rawDeltaY = e.clientY - this.dragStartY;
      
      // Apply Constraints
      const deltaX = Math.max(this.dragConstraints.minX, Math.min(rawDeltaX, this.dragConstraints.maxX));
      const deltaY = Math.max(this.dragConstraints.minY, Math.min(rawDeltaY, this.dragConstraints.maxY));
      
      const newX = this.initialOffsetX + deltaX;
      const newY = this.initialOffsetY + deltaY;
      
      // Update State
      this.offsets[this.draggedIndex] = { x: newX, y: newY };
      
      // Update DOM
      const li = this.$list.children[this.draggedIndex];
      li.style.transform = `translate(${newX}px, ${newY}px)`;
      
      // Redraw lines instantly
      this.drawLines();
  }
  
  handleDragEnd(e) {
      if (!this.isDragging) return;
      
      this.isDragging = false;
      const li = this.$list.children[this.draggedIndex];
      if(li) {
          li.style.transition = ''; // Re-enable transition
          li.classList.remove('dragging');
      }
      this.draggedIndex = -1;
      
      // Maybe snap back if desired? Current request implies "react to movement", 
      // likely they want the position to stay.
  }
  
  selectItem(index) {
       // If clicking the same item, we still might want to ensure tabs are synced
       // But usually we don't need to do anything.
       // However, if the user clicked a tab then clicked the node, activeIndex matches.
       // If we clicked a node, activeIndex changes.
       
       const previousIndex = this.activeIndex;
       this.activeIndex = index;
       
       const items = this.$list.querySelectorAll('.timeline-item');
       items.forEach((item, i) => {
           if (i === index) item.classList.add('active');
           else item.classList.remove('active');
       });
       
       // Call prop callback if exists
       if (this.onSelect && typeof this.onSelect === 'function') {
           this.onSelect(this.items[index], index);
       }
       
       // Always dispatch event on user interaction
       console.log('Dispatching timeline-select', index);
       this.dispatchEvent(new CustomEvent('timeline-select', { 
           detail: { item: this.items[index], index },
           bubbles: true,
           composed: true
       }));
  }
  
  setActive(index) {
      // Determine if we need to redraw/reselect
      // Just update UI class
       this.activeIndex = index;
       const items = this.$list.querySelectorAll('.timeline-item');
       items.forEach((item, i) => {
           if (i === index) item.classList.add('active');
           else item.classList.remove('active');
       });
  }

  drawLines() {
      // Guard clauses
      if (!this.$container || !this.$svg) return;
      
      const dots = this.$list.querySelectorAll('.timeline-dot');
      if (dots.length < 2) {
          this.$svg.innerHTML = '';
          return;
      }
      
      const containerRect = this.$container.getBoundingClientRect();
      
      // If container is hidden (e.g. tabs), rect might be zero. Check width/height.
      if (containerRect.width === 0 || containerRect.height === 0) return;

      const points = [];

      dots.forEach(dot => {
          const rect = dot.getBoundingClientRect();
          // Calculate center relative to SVG container
          const x = rect.left + rect.width / 2 - containerRect.left;
          const y = rect.top + rect.height / 2 - containerRect.top;
          points.push({ x, y });
      });

      // Generate Path
      if (points.length === 0) return;

      let d = `M ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
          d += ` L ${points[i].x} ${points[i].y}`;
      }

      this.$svg.innerHTML = `
        <path d="${d}" 
              stroke="var(--primary-color)" 
              stroke-width="2" 
              fill="none" 
              stroke-linecap="round"
              stroke-linejoin="round" />
      `;
  }
}

window.Timeline = Timeline;
if (!customElements.get("slice-timeline")) { customElements.define("slice-timeline", Timeline); }

return Timeline;
return Timeline;
})();

const SliceComponent_ExperienceCard = (() => {

class ExperienceCard extends HTMLElement {
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

window.ExperienceCard = ExperienceCard;
if (!customElements.get('slice-experience-card')) { customElements.define('slice-experience-card', ExperienceCard); }
return ExperienceCard;
return ExperienceCard;
})();

const SliceComponent_Tabs = (() => {

class Tabs extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);
      
      this.$headerWrapper = this.querySelector('.tabs-header-wrapper');
      this.$listContainer = this.querySelector('.tab-list-container');
      this.$tabList = this.querySelector('.tab-list');
      this.$tabContent = this.querySelector('.tab-content');
      this.$highlight = this.querySelector('.tab-highlight');
      this.$prevBtn = this.querySelector('.tab-scroll-btn.prev');
      this.$nextBtn = this.querySelector('.tab-scroll-btn.next');
      
      this.items = [];
      this.orientation = 'vertical'; // 'vertical' or 'horizontal'
      
      this.checkOverflow = this.checkOverflow.bind(this);
      
      slice.controller.setComponentProps(this, props);
   }

   set items(value) {
      this._items = value;
      this.render();
   }

   get items() {
      return this._items || [];
   }

   async init() {
      // styles will handle orientation
      this.classList.add(this.orientation);
      this.render();
      
      // Setup Scroll Buttons
      this.$prevBtn.addEventListener('click', () => this.scrollTabs('left'));
      this.$nextBtn.addEventListener('click', () => this.scrollTabs('right'));
      
      this.$tabList.addEventListener('scroll', this.checkOverflow);
      window.addEventListener('resize', this.checkOverflow);
      
      // Initial check
      requestAnimationFrame(this.checkOverflow);
   }
   
   scrollTabs(direction) {
      const scrollAmount = 200;
      if (direction === 'left') {
          this.$tabList.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
          this.$tabList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
   }

   centerTab(targetBtn) {
      const list = this.$tabList;
      // Calculations relative to the scroll container
      // We want: (btn.offsetLeft) - (list.width / 2) + (btn.width / 2)
      
      const scrollLeft = targetBtn.offsetLeft - (list.clientWidth / 2) + (targetBtn.offsetWidth / 2);
      
      list.scrollTo({
         left: scrollLeft,
         behavior: 'smooth'
      });
   }
   
   checkOverflow() {
       const { scrollLeft, scrollWidth, clientWidth } = this.$tabList;
       
       // Show prev button if scrolled right
       if (scrollLeft > 0) {
           this.$prevBtn.classList.add('visible');
       } else {
           this.$prevBtn.classList.remove('visible');
       }
       
       // Show next button if can scroll right
       // Use a small buffer (1px) for float calculation issues
       if (scrollWidth - scrollLeft - clientWidth > 1) {
           this.$nextBtn.classList.add('visible');
       } else {
           this.$nextBtn.classList.remove('visible');
       }
   }

   render() {
      if (!this.items || this.items.length === 0) return;
      
      this.$tabList.innerHTML = '';
      this.$tabContent.innerHTML = '';
      
      // Re-add highlight element
      this.$tabList.appendChild(this.$highlight);


      this.items.forEach((item, index) => {
         // Create Tab Button
         const btn = document.createElement('button');
         btn.className = 'tab-button';
         btn.innerHTML = `<span>${item.label}</span>`;
         btn.setAttribute('role', 'tab');
         btn.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
         btn.dataset.index = index; // Robust selection
         
         if (index === 0) btn.classList.add('active');
         
         btn.addEventListener('click', (e) => this.switchTab(index, e.currentTarget));
         
         this.$tabList.appendChild(btn);

         // Create Panel
         const panel = document.createElement('div');
         panel.className = 'tab-panel';
         panel.id = `panel-${index}`;
         panel.setAttribute('role', 'tabpanel');
         panel.setAttribute('aria-labelledby', `tab-${index}`);
         panel.hidden = index !== 0;
         
         if (index === 0) panel.classList.add('active');

         if (item.content instanceof Node) {
            panel.appendChild(item.content);
         } else {
            panel.innerHTML = item.content;
         }
         
         this.$tabContent.appendChild(panel);
      });

      // Initial Highlight Position
      requestAnimationFrame(() => {
          const firstBtn = this.$tabList.querySelector('.tab-button');
          if(firstBtn) this.updateHighlight(firstBtn);
      });
      
      // Update highlight on resize
      window.addEventListener('resize', () => {
         const activeBtn = this.$tabList.querySelector('.tab-button.active');
         if(activeBtn) this.updateHighlight(activeBtn);
      });
   }

   switchTab(index, btn) {
      // Update Buttons
      const buttons = this.$tabList.querySelectorAll('.tab-button');
      buttons.forEach(b => {
         b.classList.remove('active');
         b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      
      // Ensure button is visible in scroll view with custom logic to avoid page jumps
      this.centerTab(btn);

      // Update Panels
      const panels = this.$tabContent.querySelectorAll('.tab-panel');
      panels.forEach((p, i) => {
         if (i === index) {
            p.hidden = false;
            p.classList.add('active');
         } else {
            p.hidden = true;
            p.classList.remove('active');
         }
      });

      this.updateHighlight(btn);
      
      // Emit event
      this.dispatchEvent(new CustomEvent('tab-change', {
          detail: { index: index }
      }));
   }
   
   activateTab(index) {
       console.log('Activating tab', index);
       // Use data attribute selector which is safer than ID
       const btn = this.$tabList.querySelector(`.tab-button[data-index="${index}"]`);
       if (btn) {
           this.switchTab(index, btn);
       } else {
           console.warn('Tab button not found for index', index);
       }
   }

   updateHighlight(targetBtn) {
      if(this.classList.contains('vertical')) {
         this.$highlight.style.height = `${targetBtn.offsetHeight}px`;
         this.$highlight.style.width = `3px`;
         this.$highlight.style.transform = `translateY(${targetBtn.offsetTop}px)`;
      } else {
         this.$highlight.style.width = `${targetBtn.offsetWidth}px`;
         this.$highlight.style.height = `3px`;
         this.$highlight.style.transform = `translateX(${targetBtn.offsetLeft}px)`;
      }
   }
}

window.Tabs = Tabs;
if (!customElements.get('slice-tabs')) { customElements.define('slice-tabs', Tabs); }
return Tabs;
return Tabs;
})();

const SliceComponent_EducationSection = (() => {
const certificatesData = SLICE_BUNDLE_DEPENDENCIES["Components/AppComponents/EducationSection/data.js"].certificatesData;
const studiesData = SLICE_BUNDLE_DEPENDENCIES["Components/AppComponents/EducationSection/data.js"].studiesData;
class EducationSection extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);
      
      this.$container = this.querySelector('.education-container');
      this.$studies = this.querySelector('.education-studies');
      this.$certificates = this.querySelector('.education-certificates');
      this.$certificatesGrid = this.querySelector('.certificates-grid');
      this.$certificatesSearch = this.querySelector('.certificates-search-input');
      this.$certificatesCount = this.querySelector('.certificates-count');
      this.$certificatesPagination = this.querySelector('.certificates-pagination');
      
      slice.controller.setComponentProps(this, props);
      this.debuggerProps = [];
      this.studiesData =  studiesData || [];
      this.certificatesData = certificatesData || [];
      this.filteredCertificates = [...this.certificatesData];
      this.certificatesPage = 1;
      this.certificatesPerPage = 6;
   }

   async init() {
      // Define education data

      await this.createStudiesSection();
      await this.createCertificatesSection();
   }

   async createStudiesSection() {
      const studiesTitle = document.createElement('h2');
      studiesTitle.textContent = 'Educational Background';
      studiesTitle.classList.add('section-title');

      const studiesContainer = document.createElement('div');
      studiesContainer.classList.add('studies-container');

      for (const [index, study] of this.studiesData.entries()) {
         const studyCard = await slice.build('StudyCard', {
            study: study,
            animationDelay: index * 0.2
         });
         studiesContainer.appendChild(studyCard);
      }

      this.$studies.appendChild(studiesTitle);
      this.$studies.appendChild(studiesContainer);
   }


   async createCertificatesSection() {
      const certificatesTitle = document.createElement('h2');
      certificatesTitle.textContent = `Professional Certifications`;
      certificatesTitle.classList.add('section-title');
      this.$certificates.insertBefore(certificatesTitle, this.$certificates.firstChild);

      this.bindCertificateSearch();
      await this.renderCertificatesPage();
   }

   bindCertificateSearch() {
      if (!this.$certificatesSearch) return;
      this.$certificatesSearch.addEventListener('input', () => {
         const query = this.$certificatesSearch.value.trim().toLowerCase();
         if (!query) {
            this.filteredCertificates = [...this.certificatesData];
         } else {
            this.filteredCertificates = this.certificatesData.filter((certificate) => {
               const haystack = [
                  certificate.title,
                  certificate.issuer,
                  certificate.credentialId,
                  certificate.description,
                  ...(certificate.skills || [])
               ]
                  .filter(Boolean)
                  .join(' ')
                  .toLowerCase();
               return haystack.includes(query);
            });
         }
         this.certificatesPage = 1;
         this.renderCertificatesPage();
      });
   }

   updateCertificateCount() {
      if (!this.$certificatesCount) return;
      const total = this.filteredCertificates.length;
      const label = total === 1 ? 'certificate' : 'certificates';
      this.$certificatesCount.textContent = `${total} ${label}`;
   }

   async renderCertificatesPage() {
      if (!this.$certificatesGrid) return;

      const total = this.filteredCertificates.length;
      const totalPages = Math.max(1, Math.ceil(total / this.certificatesPerPage));
      this.certificatesPage = Math.min(this.certificatesPage, totalPages);

      const startIndex = (this.certificatesPage - 1) * this.certificatesPerPage;
      const pageItems = this.filteredCertificates.slice(
         startIndex,
         startIndex + this.certificatesPerPage
      );

      slice.controller.destroyByContainer(this.$certificatesGrid);
      this.$certificatesGrid.innerHTML = '';

      for (const [index, certificate] of pageItems.entries()) {
         const certificateCard = await slice.build('CertificateCard', {
            certificate: certificate,
            animationDelay: index * 0.08
         });
         this.$certificatesGrid.appendChild(certificateCard);
      }

      if (pageItems.length === 0) {
         this.renderCertificatesEmptyState();
      }

      this.updateCertificateCount();
      this.renderCertificatesPagination(totalPages);
   }

   renderCertificatesPagination(totalPages) {
      if (!this.$certificatesPagination) return;

      this.$certificatesPagination.innerHTML = '';

      if (totalPages <= 1) return;

      const createButton = (label, page, disabled = false, active = false) => {
         const button = document.createElement('button');
         button.type = 'button';
         button.textContent = label;
         button.className = 'certificate-page-btn';
         if (active) button.classList.add('is-active');
         if (disabled) button.disabled = true;
         button.addEventListener('click', () => {
            this.certificatesPage = page;
            this.renderCertificatesPage();
         });
         return button;
      };

      this.$certificatesPagination.appendChild(
         createButton('Prev', Math.max(1, this.certificatesPage - 1), this.certificatesPage === 1)
      );

      const maxButtons = 5;
      const start = Math.max(1, this.certificatesPage - Math.floor(maxButtons / 2));
      const end = Math.min(totalPages, start + maxButtons - 1);

      for (let page = start; page <= end; page += 1) {
         this.$certificatesPagination.appendChild(
            createButton(String(page), page, false, page === this.certificatesPage)
         );
      }

      this.$certificatesPagination.appendChild(
         createButton(
            'Next',
            Math.min(totalPages, this.certificatesPage + 1),
            this.certificatesPage === totalPages
         )
      );
   }

   renderCertificatesEmptyState() {
      if (!this.$certificatesGrid) return;
      const empty = document.createElement('div');
      empty.className = 'certificates-empty';
      empty.textContent = 'No certificates found. Try a different search.';
      this.$certificatesGrid.appendChild(empty);
   }

}

window.EducationSection = EducationSection;
if (!customElements.get('slice-education-section')) { customElements.define('slice-education-section', EducationSection); }

return EducationSection;
return EducationSection;
})();

const SliceComponent_StudyCard = (() => {

class StudyCard extends HTMLElement {
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

window.StudyCard = StudyCard;
if (!customElements.get('slice-study-card')) { customElements.define('slice-study-card', StudyCard); }
return StudyCard;
return StudyCard;
})();

const SliceComponent_CertificateCard = (() => {

class CertificateCard extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);
      
      // Get template elements
      this.$card = this.querySelector('.certificate-card');
      this.$issuerLogo = this.querySelector('.issuer-logo');
      this.$issuerInitials = this.querySelector('.issuer-initials');
      this.$title = this.querySelector('.certificate-title');
      this.$issuer = this.querySelector('.certificate-issuer');
      this.$description = this.querySelector('.certificate-description');
      this.$dates = this.querySelector('.certificate-dates');
      this.$credentialId = this.querySelector('.credential-id');
      this.$skillsList = this.querySelector('.skills-list');
      this.$actions = this.querySelector('.certificate-actions');
      
      slice.controller.setComponentProps(this, props);
      this.debuggerProps = ['certificate', 'animationDelay'];
   }

   async init() {
      if (!this.certificate) return;
      
      // Set animation delay
      if (this.animationDelay) {
         this.$card.style.animationDelay = `${this.animationDelay}s`;
      }
      
      // Populate template with data
      await this.populateTemplate();
   }

   async populateTemplate() {
      // Set issuer logo
      if (this.certificate.issuerLogo) {
         this.$issuerLogo.src = this.certificate.issuerLogo;
         this.$issuerLogo.alt = `${this.certificate.issuer} logo`;
         this.$issuerLogo.onerror = () => {
            this.$issuerLogo.style.display = 'none';
         };
      } else {
         this.$issuerLogo.style.display = 'none';
      }

      if (this.$issuerInitials) {
         const initials = this.certificate.issuer
            .split(' ')
            .filter(Boolean)
            .slice(0, 2)
            .map((word) => word[0].toUpperCase())
            .join('');
         this.$issuerInitials.textContent = initials || 'CI';
         if (this.certificate.issuerLogo) {
            this.$issuerInitials.style.display = 'none';
         }
      }

      // Set basic info
      this.$title.textContent = this.certificate.title;
      this.$issuer.textContent = this.certificate.issuer;
      this.$description.textContent = this.certificate.description;

      // Set meta information
      const issueDate = new Date(this.certificate.date).toLocaleDateString('en-US', {
         year: 'numeric',
         month: 'long'
      });
      
      let validityText = `Issued: ${issueDate}`;
      if (this.certificate.validUntil) {
         const validDate = new Date(this.certificate.validUntil).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
         });
         validityText += ` | Valid until: ${validDate}`;
      } else {
         validityText += ' | No expiration';
      }
      
      this.$dates.textContent = validityText;
      this.$credentialId.textContent = `ID: ${this.certificate.credentialId}`;

      // Populate skills
      this.$skillsList.innerHTML = '';
      this.certificate.skills.forEach(skill => {
         const skillTag = document.createElement('span');
         skillTag.classList.add('skill-tag');
         skillTag.textContent = skill;
         this.$skillsList.appendChild(skillTag);
      });

      // Clear existing buttons and create view certificate button
      this.$actions.innerHTML = '';
      const viewBtn = await slice.build('Button', {
         value: 'Verify credential',
         customColor: {
            button: 'var(--primary-color)',
            label: 'var(--primary-color-contrast)'
         },
         onClickCallback: () => window.open(this.certificate.certificateUrl, '_blank')
      });
      viewBtn.classList.add('view-certificate-btn');
      this.$actions.appendChild(viewBtn);
   }

   // Getters and setters
   get certificate() {
      return this._certificate;
   }

   set certificate(value) {
      this._certificate = value;
      // Don't call populateTemplate here to avoid duplication
      // It will be called in init() when the component is ready
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

window.CertificateCard = CertificateCard;
if (!customElements.get("slice-certificate-card")) { customElements.define("slice-certificate-card", CertificateCard); }


return CertificateCard;
return CertificateCard;
})();

const SliceComponent_WhatIsSlice = (() => {

class WhatIsSlice extends HTMLElement {
  constructor(props) {
    super();
    slice.attachTemplate(this);

    this.$tabs = this.querySelectorAll('.tab');
    this.$tabContents = this.querySelectorAll('.tab-content');
    
    // Set up tab switching functionality
    this.$tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabId = tab.getAttribute('data-tab');
        this.switchTab(tabId);
      });
    });

    // Set up navigation buttons with Slice Router
    this.setupNavigationButtons();

    slice.controller.setComponentProps(this, props);
    this.debuggerProps = [];
  }

  async init() {
    // Set the first tab as active by default
    this.switchTab('overview');
    
    // Add animation to code samples for better readability
    this.highlightCode();
    
    // Setup diagram interactions
    this.setupDiagramInteractions();
  }
  
  setupNavigationButtons() {
    // Set up the Installation Guide button
    const installationButton = this.querySelector('.installation-button');
    if (installationButton) {
      installationButton.addEventListener('click', (event) => {
        event.preventDefault();
        // open link in new tab https://slice-js-docs.vercel.app/Documentation/Installation (its not a route of the app)
        window.open('https://slice-js-docs.vercel.app/Documentation/Installation', '_blank');
      });
    }
    
    // Set up the Component Library button
    const componentsButton = this.querySelector('.components-button');
    if (componentsButton) {
      componentsButton.addEventListener('click', (event) => {
        event.preventDefault();
        // open link in new tab https://slice-js-docs.vercel.app/Documentation/Slice (its not a route of the app)
        window.open('https://slice-js-docs.vercel.app/Documentation/Slice', '_blank');
      });
    }
  }
  
  switchTab(tabId) {
    // Remove active class from all tabs and tab contents
    this.$tabs.forEach(tab => tab.classList.remove('active'));
    this.$tabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to the selected tab and content
    this.querySelector(`.tab[data-tab="${tabId}"]`).classList.add('active');
    this.querySelector(`.tab-content[data-tab="${tabId}"]`).classList.add('active');
  }
  
  highlightCode() {
    // Check if Prism is available (for syntax highlighting)
    if (typeof Prism !== 'undefined') {
      Prism.highlightAllUnder(this);
    }
  }
  
  setupDiagramInteractions() {
    const components = this.querySelectorAll('.component-box');
    
    components.forEach(component => {
      component.addEventListener('mouseenter', () => {
        const type = component.getAttribute('data-type');
        const description = this.querySelector(`.component-description[data-type="${type}"]`);
        if (description) {
          description.classList.add('visible');
        }
      });
      
      component.addEventListener('mouseleave', () => {
        const type = component.getAttribute('data-type');
        const description = this.querySelector(`.component-description[data-type="${type}"]`);
        if (description) {
          description.classList.remove('visible');
        }
      });
    });
  }
}

window.WhatIsSlice = WhatIsSlice;
if (!customElements.get("slice-whatisslice")) { customElements.define("slice-whatisslice", WhatIsSlice); }
return WhatIsSlice;
return WhatIsSlice;
})();

const SliceComponent_ProjectsSection = (() => {
const projectsData = SLICE_BUNDLE_DEPENDENCIES["Components/AppComponents/ProjectsSection/data.js"].default !== undefined ? SLICE_BUNDLE_DEPENDENCIES["Components/AppComponents/ProjectsSection/data.js"].default : SLICE_BUNDLE_DEPENDENCIES["Components/AppComponents/ProjectsSection/data.js"].dataData;
class ProjectsSection extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);
      
      this.$container = this.querySelector('.projects-container');
      this.$grid = this.querySelector('.projects-grid');
      
      slice.controller.setComponentProps(this, props);
      this.debuggerProps = [];
      this.projectsData = projectsData || [];
   }

   async init() {
      await this.renderProjects();
   }

   async renderProjects() {
      // Clear existing content
      this.$grid.innerHTML = '';

      const sectionTitle = document.createElement('h2');
      sectionTitle.textContent = `My Projects (${this.projectsData.length})`;
      sectionTitle.classList.add('section-title');

      // Sort projects: featured first, then by date
      const sortedProjects = [...this.projectsData].sort((a, b) => {
         if (a.featured !== b.featured) {
            return b.featured - a.featured;
         }
         return new Date(b.date) - new Date(a.date);
      });
      
      this.$grid.appendChild(sectionTitle);

      // Call the Master-Detail Project Viewer
      const projectViewer = await slice.build('ProjectViewer', {
          projects: sortedProjects
      });
      
      this.$grid.appendChild(projectViewer);
   }
}

window.ProjectsSection = ProjectsSection;
if (!customElements.get('slice-projects-section')) { customElements.define('slice-projects-section', ProjectsSection); }
return ProjectsSection;
return ProjectsSection;
})();

const SliceComponent_ProjectViewer = (() => {

class ProjectViewer extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);
      
      this.$thumbnails = this.querySelector('.thumbnails-list');
      this.$previewContainer = this.querySelector('.preview-container');
      this.$previewImage = this.querySelector('.preview-image');
      this.$projectTitle = this.querySelector('.project-title');
      this.$projectDesc = this.querySelector('.project-description');
      this.$techList = this.querySelector('.tech-list');
      this.$actions = this.querySelector('.project-actions');
      this.$emptyState = this.querySelector('.empty-state');
      this.$detailsPanel = this.querySelector('.details-panel');
      this.$previewOverlay = this.querySelector('.preview-overlay');
      this.$statusBadge = this.querySelector('.status-badge');

      // Modal Elements
      this.$modal = this.querySelector('.image-modal');
      this.$modalImage = this.querySelector('#expanded-image');
      this.$closeModal = this.querySelector('.close-modal');
      this.$prevBtn = this.querySelector('.modal-nav-btn.prev-btn');
      this.$nextBtn = this.querySelector('.modal-nav-btn.next-btn');
      
      this.currentProjectImages = [];
      this.currentImageIndex = 0;

      if (this.$modal) {
          this.$closeModal.addEventListener('click', () => this.closeModal());
          
          this.$prevBtn.addEventListener('click', (e) => {
              e.stopPropagation();
              this.navigateModalImage(-1);
          });
          
          this.$nextBtn.addEventListener('click', (e) => {
              e.stopPropagation();
              this.navigateModalImage(1);
          });

          this.$modal.addEventListener('click', (e) => {
              if (e.target === this.$modal) this.closeModal();
          });
          // Close on Escape key
          document.addEventListener('keydown', (e) => {
              if (!this.$modal.classList.contains('show')) return;
              
              if (e.key === 'Escape') {
                  this.closeModal();
              } else if (e.key === 'ArrowLeft') {
                  this.navigateModalImage(-1);
              } else if (e.key === 'ArrowRight') {
                  this.navigateModalImage(1);
              }
          });
      }

      this.projects = [];
      this.activeProject = null;

      slice.controller.setComponentProps(this, props);
   }

   set projects(value) {
      this._projects = value;
      this.renderThumbnails();
      if (this._projects && this._projects.length > 0) {
         this.setActiveProject(this._projects[0]);
      }
   }

   get projects() {
      return this._projects || [];
   }

   async init() {
      // styles handled in CSS
   }

   renderThumbnails() {
      if (!this.$thumbnails) return;
      this.$thumbnails.innerHTML = '';
      
      this.projects.forEach((project, index) => {
         const btn = document.createElement('button');
         btn.className = 'thumbnail-btn';
         btn.setAttribute('aria-label', `View ${project.title}`);
         if (index === 0) btn.classList.add('active');
         
         btn.innerHTML = `
            <div class="thumbnail-wrapper">
                <img src="${project.image}" alt="" loading="lazy"/>
            </div>
            <span class="thumbnail-title">${project.title}</span>
         `;
         
         btn.addEventListener('click', () => {
             this.setActiveProject(project);
             
             // Update active class
             this.querySelectorAll('.thumbnail-btn').forEach(b => b.classList.remove('active'));
             btn.classList.add('active');
         });
         
         this.$thumbnails.appendChild(btn);
      });
   }

   setActiveProject(project) {
       this.activeProject = project;
       
       // Animate content change
       this.$previewContainer.classList.add('fading');
       this.$detailsPanel.classList.add('fading');
       
       setTimeout(() => {
           try {
               // Update Images logic
               this.$previewContainer.innerHTML = '<div class="preview-overlay"></div>';
               
               // Ensure images is an array and filter out nulls
               let images = project.images && Array.isArray(project.images) ? project.images : [];
               if (images.length === 0 && project.image) {
                   images = [project.image];
               }

               if(images.length > 0) {
                   const wrapper = document.createElement('div');
                   wrapper.className = 'preview-scroll-wrapper';
                   
                   images.forEach((imgSrc, idx) => {
                       if (!imgSrc) return;
                       const img = document.createElement('img');
                       img.className = 'preview-image';
                       img.src = imgSrc;
                       img.alt = `${project.title} - View ${idx + 1}`;
                       img.loading = "eager"; 
                       
                       img.onclick = () => this.openModal(images, idx);

                       // Error handling for image
                       img.onerror = () => { img.style.display = 'none'; };
                       wrapper.appendChild(img);
                   });
                   
                   this.$previewContainer.appendChild(wrapper);
               }

               // Update Details
               this.$projectTitle.textContent = project.title;
               this.$projectDesc.textContent = project.description;
               
               // Status Badge
               if (project.status) {
                    this.$statusBadge.className = `status-badge status-${project.status.toLowerCase().replace(/\s/g, '-')}`;
                    this.$statusBadge.textContent = project.status;
                    this.$statusBadge.style.display = 'inline-block';
               } else {
                    this.$statusBadge.style.display = 'none';
               }
               
               // Tech Stack
               this.$techList.innerHTML = '';
               if (project.technologies) {
                   project.technologies.forEach(tech => {
                       const tag = document.createElement('span');
                       tag.className = 'tech-tag';
                       tag.textContent = tech;
                       this.$techList.appendChild(tag);
                   });
               }
               
               // Links
               this.$actions.innerHTML = '';
               this.createActionButtons(project);

           } catch (error) {
               console.error("Error updating project viewer:", error);
           } finally {
               // Remove animation classes ALWAYS
               this.$previewContainer.classList.remove('fading');
               this.$detailsPanel.classList.remove('fading');
           }
           
       }, 200);
   }

   openModal(images, index) {
       if (!this.$modal) return;
       
       this.currentProjectImages = images || [];
       this.currentImageIndex = index || 0;
       
       this.updateModalImage();
       
       this.$modal.style.display = 'flex';
       // Force reflow
       void this.$modal.offsetWidth;
       this.$modal.classList.add('show');
   }

   updateModalImage() {
       if (!this.currentProjectImages || this.currentProjectImages.length === 0) return;
       
       const src = this.currentProjectImages[this.currentImageIndex];
       this.$modalImage.src = src;
       
       // Handle buttons visibility
       if (this.currentProjectImages.length <= 1) {
           this.$prevBtn.style.display = 'none';
           this.$nextBtn.style.display = 'none';
       } else {
           this.$prevBtn.style.display = 'flex';
           this.$nextBtn.style.display = 'flex';
       }
   }

   navigateModalImage(direction) {
       if (!this.currentProjectImages || this.currentProjectImages.length <= 1) return;
       
       let newIndex = this.currentImageIndex + direction;
       
       // Loop
       if (newIndex < 0) {
           newIndex = this.currentProjectImages.length - 1;
       } else if (newIndex >= this.currentProjectImages.length) {
           newIndex = 0;
       }
       
       this.currentImageIndex = newIndex;
       
       // Add a small fade effect could be nice, but for now just switch
       this.updateModalImage();
   }

   closeModal() {
       if (!this.$modal) return;
       this.$modal.classList.remove('show');
       setTimeout(() => {
           this.$modal.style.display = 'none';
           this.$modalImage.src = '';
       }, 300);
   }
   
   async createActionButtons(project) {
      if (project.githubUrl) {
         const githubBtn = await slice.build('Button', {
            value: 'GitHub',
            customColor: { button: 'var(--secondary-background-color)', label: 'var(--font-primary-color)' },
            onClickCallback: () => window.open(project.githubUrl, '_blank')
         });
         githubBtn.style.border = '1px solid var(--disabled-color)';
         this.$actions.appendChild(githubBtn);
      }

      if (project.liveUrl) {
         const liveBtn = await slice.build('Button', {
            value: 'Live Demo',
            customColor: { button: 'var(--primary-color)', label: 'var(--primary-color-contrast)' },
            onClickCallback: () => window.open(project.liveUrl, '_blank')
         });
         this.$actions.appendChild(liveBtn);
      }
   }
}

window.ProjectViewer = ProjectViewer;
if (!customElements.get("slice-project-viewer")) { customElements.define("slice-project-viewer", ProjectViewer); }

return ProjectViewer;
return ProjectViewer;
})();

const SliceComponent_BuiltWithBadge = (() => {

class BuiltWithBadge extends HTMLElement {
    constructor(props) {
        super();
        try {
            slice.attachTemplate(this);
            slice.controller.setComponentProps(this, props);
            this.addEventListener('click', () => {
                window.open('https://github.com/vkneider/slice.js', '_blank');
            });
            console.log("BuiltWithBadge initialized");
        } catch (error) {
            console.error("BuiltWithBadge initialization failed", error);
        }
    }
    
    connectedCallback() {
        this.style.display = 'block';
    }
}

window.BuiltWithBadge = BuiltWithBadge;
if (!customElements.get("slice-built-with-badge")) { customElements.define("slice-built-with-badge", BuiltWithBadge); }
return BuiltWithBadge;
return BuiltWithBadge;
})();

const SLICE_BUNDLE_COMPONENTS = {
"Portfolio": {
  name: "Portfolio",
  category: "AppComponents",
  categoryType: "Visual",
  componentDependencies: ["ThemeSelector","Navbar","MultiRoute","AboutSection","ExperienceSection","EducationSection","WhatIsSlice","ProjectsSection","BuiltWithBadge"],
  html: "<div class=\"portfolio-container\">\n  <main class=\"portfolio-main\">\n    <div class=\"portfolio-content\"></div>\n  </main>\n  \n  <footer class=\"portfolio-footer\">\n    <div class=\"social-links\">\n      <!-- Social links will be populated here -->\n    </div>\n    <div class=\"footer-info\">\n      <p class=\"copyright\"></p>\n      <p class=\"powered-by\">Powered by <a href=\"https://github.com/victorkneider/slice-js\" target=\"_blank\">Slice.js</a></p>\n    </div>\n  </footer>\n</div>",
  css: "slice-portfolio {\n  display: block;\n  min-height: 100vh;\n  font-family: var(--font-family);\n  color: var(--font-primary-color);\n  background-color: var(--primary-background-color);\n}\n\n.portfolio-container {\n  width: 100%;\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n}\n\n.portfolio-main {\n  flex: 1;\n  padding-top: 40px; /* Account for fixed navbar */\n  min-height: calc(100vh - 120px);\n}\n\n@media (max-width: 768px) {\n  .portfolio-main {\n    padding-top: 58px; /* Account for fixed navbar */\n    min-height: calc(100vh - 120px);\n  }\n}\n\n\n.portfolio-content.smooth-transitions {\n  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;\n}\n\n.content-transition-out {\n  opacity: 0.7;\n  transform: translateY(10px);\n}\n\n.content-transition-in {\n  opacity: 1;\n  transform: translateY(0);\n}\n\n\n.portfolio-content {\n  width: 100%;\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 2rem;\n  opacity: 1;\n  transition: opacity 0.3s ease-in-out;\n}\n\n.content-transition {\n  opacity: 0.7;\n}\n\n/* Footer Styles */\n.portfolio-footer {\n  background-color: var(--secondary-background-color);\n  padding: 3rem 2rem 2rem;\n  margin-top: auto;\n  border-top: 1px solid var(--primary-color-shade);\n}\n\n.social-links {\n  display: flex;\n  justify-content: center;\n  gap: 1.5rem;\n  margin-bottom: 2rem;\n  flex-wrap: wrap;\n}\n\n.social-link {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.75rem 1.5rem;\n  background-color: var(--card-background-color);\n  color: var(--font-primary-color);\n  text-decoration: none;\n  border-radius: 50px;\n  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  font-weight: 600;\n  box-shadow: 0 4px 6px rgba(0,0,0,0.1);\n  border: 2px solid transparent;\n}\n\n.social-icon {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n}\n\n.social-link:hover {\n  transform: translateY(-4px) scale(1.05);\n  filter: brightness(1.1);\n}\n\n/* GitHub - Slate/Black */\n.social-link-github {\n  background-color: #24292e;\n  color: white;\n}\n.social-link-github:hover {\n  box-shadow: 0 10px 20px rgba(36, 41, 46, 0.4);\n}\n\n/* LinkedIn - Blue */\n.social-link-linkedin {\n  background-color: #0077b5;\n  color: white;\n}\n.social-link-linkedin:hover {\n  box-shadow: 0 10px 20px rgba(0, 119, 181, 0.4);\n}\n\n/* Email - Red */\n.social-link-email {\n  background-color: #ea4335;\n  color: white;\n}\n.social-link-email:hover {\n  box-shadow: 0 10px 20px rgba(234, 67, 53, 0.4);\n}\n\n.footer-info {\n  text-align: center;\n  color: var(--font-secondary-color);\n}\n\n.footer-info p {\n  margin: 0.5rem 0;\n  font-size: 0.9rem;\n}\n\n.footer-info a {\n  color: var(--primary-color);\n  text-decoration: none;\n  font-weight: 600;\n}\n\n.footer-info a:hover {\n  text-decoration: underline;\n}\n\n/* Responsive Design */\n@media (max-width: 768px) {\n  .portfolio-content {\n    padding: 1rem;\n  }\n  \n  .social-links {\n    flex-direction: column;\n    align-items: center;\n    gap: 1rem;\n  }\n  \n  .social-link {\n    width: 200px;\n    justify-content: center;\n  }\n}\n\n/* Animation for content changes */\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.portfolio-content > * {\n  animation: fadeIn 0.6s ease-out;\n}\n\n",
  size: 10799,
  class: SliceComponent_Portfolio
},
"ThemeSelector": {
  name: "ThemeSelector",
  category: "Visual",
  categoryType: "Visual",
  componentDependencies: [],
  html: "<div class=\"theme-selector-container\">\n  <div class=\"current-theme\" role=\"button\" tabindex=\"0\" aria-haspopup=\"true\" aria-expanded=\"false\">\n    <span class=\"selector-icon\">🎨</span>\n    <span class=\"theme-name\">Select Theme</span>\n    <div class=\"dropdown-arrow\">▼</div>\n  </div>\n  \n  <div class=\"theme-dropdown\" role=\"menu\">\n    <div class=\"dropdown-header\">\n      <h4>Choose Theme</h4>\n      <p>Select your preferred color scheme</p>\n    </div>\n    <div class=\"themes-list\" role=\"menuitem\"></div>\n  </div>\n</div>",
  css: "slice-theme-selector {\n  display: block;\n  position: relative;\n  font-family: var(--font-family);\n}\n\n.theme-selector-container {\n  position: relative;\n  user-select: none;\n  padding: 5px; /* Padding reducido */\n}\n\n/* Current Theme Display - Estilo consistente con otros componentes de selección */\n.current-theme {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem; /* Gap reducido */\n  cursor: pointer;\n  overflow: hidden;\n  position: relative;\n  \n  /* Estilo similar a otros selectores */\n  background-color: var(--primary-background-color);\n  color: var(--font-primary-color);\n  border-radius: var(--border-radius-slice);\n  border: var(--slice-border) solid var(--primary-color);\n  \n  font-weight: 500;\n  width: 100%;\n  padding: 8px 12px; /* Padding reducido */\n  transition: all 0.3s ease;\n  font-family: var(--font-family);\n   font-size: 0.9rem; /* Tamaño de fuente reducido */\n   min-width: 160px;\n}\n\n.current-theme:hover {\n  border-color: var(--secondary-color);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  background-color: var(--secondary-background-color);\n}\n\n.current-theme.active {\n  border-color: var(--primary-color);\n  background-color: var(--secondary-background-color);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n\n/* Selector Icon */\n.selector-icon {\n  font-size: 1rem; /* Tamaño reducido */\n  opacity: 0.8;\n  transition: all 0.3s ease;\n}\n\n.current-theme:hover .selector-icon {\n  opacity: 1;\n  transform: scale(1.1);\n}\n\n/* Theme Name/Label */\n.theme-name {\n  font-weight: 600;\n  font-size: inherit;\n  user-select: none;\n  cursor: pointer;\n   flex: 1;\n   text-align: left;\n   color: var(--font-primary-color);\n   white-space: nowrap;\n   overflow: hidden;\n   text-overflow: ellipsis;\n}\n\n/* Dropdown Arrow */\n.dropdown-arrow {\n  font-size: 0.7rem; /* Tamaño reducido */\n  transition: transform 0.3s ease;\n  opacity: 0.6;\n  color: var(--primary-color);\n  font-weight: bold;\n}\n\n.current-theme.active .dropdown-arrow {\n  transform: rotate(180deg);\n  opacity: 1;\n}\n\n/* Dropdown */\n.theme-dropdown {\n  position: absolute;\n  top: calc(100% + 8px);\n  left: 0;\n  right: 0;\n  background-color: var(--primary-background-color);\n  border: 2px solid var(--primary-color-shade);\n  border-radius: var(--border-radius-slice);\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);\n  opacity: 0;\n  visibility: hidden;\n  transform: translateY(-10px);\n  transition: all 0.3s ease;\n  z-index: 1000;\n  min-width: 240px; /* Ancho mínimo reducido */\n  backdrop-filter: blur(10px);\n}\n\n.theme-dropdown.open {\n  opacity: 1;\n  visibility: visible;\n  transform: translateY(0);\n}\n\n.dropdown-header {\n  padding: 0.75rem 0.75rem 0.5rem; /* Padding reducido */\n  border-bottom: 1px solid var(--primary-color-shade);\n  text-align: center;\n}\n\n.dropdown-header h4 {\n  margin: 0 0 0.25rem 0;\n  color: var(--primary-color);\n  font-size: 0.9rem; /* Tamaño reducido */\n  font-weight: 600;\n}\n\n.dropdown-header p {\n  margin: 0;\n  color: var(--font-secondary-color);\n  font-size: 0.75rem; /* Tamaño reducido */\n}\n\n/* Themes List */\n.themes-list {\n  max-height: 300px;\n  overflow-y: auto;\n  padding: 0.5rem;\n}\n\n.themes-list::-webkit-scrollbar {\n  width: 4px;\n}\n\n.themes-list::-webkit-scrollbar-thumb {\n  background: var(--primary-color);\n  border-radius: 2px;\n}\n\n/* Theme Items */\n.theme-item {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem; /* Gap reducido */\n  padding: 0.6rem; /* Padding reducido */\n  border-radius: var(--border-radius-slice);\n  cursor: pointer;\n  transition: all 0.3s ease;\n  position: relative;\n  border: 2px solid transparent;\n}\n\n.theme-item:hover {\n  background-color: var(--secondary-background-color);\n  transform: translateX(4px);\n  border-color: var(--primary-color);\n}\n\n.theme-item.active {\n  background-color: var(--primary-color);\n  color: var(--primary-color-contrast);\n  border-color: var(--secondary-color);\n}\n\n.theme-item.active .theme-info {\n  color: inherit;\n}\n\n.theme-item.active .theme-item-name,\n.theme-item.active .theme-description {\n  color: inherit;\n}\n\n.theme-item.active .check-icon {\n  opacity: 1;\n  transform: scale(1);\n  color: var(--primary-color-contrast);\n}\n\n/* Theme Preview */\n.theme-preview {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n\n.color-indicators {\n  display: flex;\n  gap: 0.25rem;\n}\n\n.color-dot {\n  width: 12px;\n  height: 12px;\n  border-radius: 50%;\n  border: 2px solid var(--primary-background-color);\n  transition: transform 0.3s ease;\n}\n\n.theme-item:hover .color-dot {\n  transform: scale(1.2);\n}\n\n.theme-item.active .color-dot {\n  border-color: var(--primary-color-contrast);\n}\n\n/* Theme Info */\n.theme-info {\n  flex: 1;\n}\n\n.theme-item-name {\n  font-weight: 600;\n  font-size: 0.9rem;\n  color: var(--font-primary-color);\n  margin-bottom: 0.25rem;\n}\n\n.theme-description {\n  font-size: 0.75rem;\n  color: var(--font-secondary-color);\n  opacity: 0.8;\n}\n\n/* Check Icon */\n.check-icon {\n  color: var(--success-color);\n  font-weight: bold;\n  opacity: 0;\n  transform: scale(0.5);\n  transition: all 0.3s ease;\n}\n\n/* Loading State */\n.theme-selector-container.loading .current-theme {\n  pointer-events: none;\n  opacity: 0.7;\n  position: relative;\n}\n\n.theme-selector-container.loading .current-theme::after {\n  content: '';\n  position: absolute;\n  top: 50%;\n  right: 40px; /* Position next to arrow */\n  width: 16px;\n  height: 16px;\n  margin: -8px 0 0 -8px;\n  border: 2px solid var(--primary-color-shade);\n  border-top: 2px solid var(--primary-color);\n  border-radius: 50%;\n  animation: spin 1s linear infinite;\n}\n\n@keyframes spin {\n  to { transform: rotate(360deg); }\n}\n\n/* Responsive Design */\n@media (max-width: 768px) {\n  .theme-dropdown {\n    position: fixed;\n    top: 50%;\n    left: 50%;\n    right: auto;\n    transform: translate(-50%, -50%) scale(0.9);\n    min-width: 300px;\n    max-width: 90vw;\n  }\n  \n  .theme-dropdown.open {\n    transform: translate(-50%, -50%) scale(1);\n  }\n}\n\n/* Accessibility */\n.theme-item:focus {\n  outline: 2px solid var(--primary-color);\n  outline-offset: 2px;\n}\n\n.current-theme:focus {\n  outline: 2px solid var(--primary-color);\n  outline-offset: 2px;\n}\n\n/* Enhanced selector appearance */\n.current-theme {\n  position: relative;\n}\n\n.current-theme::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: linear-gradient(45deg, transparent 30%, var(--primary-color) 30%, var(--primary-color) 70%, transparent 70%);\n  opacity: 0;\n  transition: opacity 0.3s ease;\n  pointer-events: none;\n  border-radius: inherit;\n}\n\n.current-theme:hover::before {\n  opacity: 0.03;\n}\n\n/* Animations for theme transitions */\n.theme-selector-container * {\n  transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;\n}\n",
  size: 13803,
  class: SliceComponent_ThemeSelector
},
"Navbar": {
  name: "Navbar",
  category: "Visual",
  categoryType: "Visual",
  componentDependencies: ["Link","DropDown","Button"],
  html: "<header class=\"slice_nav_header\">\n  <a class=\"logo_container\"></a>\n  <nav class=\"slice_nav_bar\">\n    <div class=\"nav_bar_menu\"></div>\n    <div class=\"nav_bar_buttons\"></div>\n    <div class=\"mobile_close_menu\">\n      <svg\n        class=\"w-6 h-6 text-gray-800 dark:text-white\"\n        aria-hidden=\"true\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n        width=\"24\"\n        height=\"24\"\n        fill=\"none\"\n        viewBox=\"0 0 24 24\"\n      >\n        <path\n          stroke=\"var(--primary-color-contrast)\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n          stroke-width=\"2\"\n          d=\"M6 18 17.94 6M18 18 6.06 6\"\n        />\n      </svg>\n    </div>\n  </nav>\n  <div class=\"mobile_menu_button\">\n    <svg\n      class=\"w-6 h-6 text-gray-800 dark:text-white\"\n      aria-hidden=\"true\"\n      xmlns=\"http://www.w3.org/2000/svg\"\n      width=\"24\"\n      height=\"24\"\n      fill=\"none\"\n      viewBox=\"0 0 24 24\"\n    >\n      <path\n        stroke=\"var(--primary-color-contrast)\"\n        stroke-linecap=\"round\"\n        stroke-width=\"3\"\n        d=\"M12 6h.01M12 12h.01M12 18h.01\"\n      />\n    </svg>\n  </div>\n</header>\n",
  css: ".slice_nav_header {\n  font-family: var(--font-family);\n  width: 100%;\n  z-index: 100;\n  box-shadow: 0px 0px 10px #00000050;\n  background-color: var(--primary-color);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  position: relative;\n  padding: 0 1rem;\n}\n\n.direction-row-reverse {\n  flex-direction: row-reverse;\n}\n.nav_bar_fixed {\n  z-index: 100;\n  width: 100%;\n  left: 0;\n  top: 0;\n  position: fixed;\n}\n.slice_nav_bar {\n  transition: transform 0.3s ease;\n  width: 100%;\n  justify-content: center;\n  display: flex;\n  align-items: center;\n  left: 0;\n  top: 0;\n}\n.nav_bar_menu {\n  width: 100%;\n  overflow-y: hidden;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  list-style: none;\n}\n.slice_nav_header .item {\n  cursor: pointer;\n  font-weight: bold;\n  text-decoration: none;\n  color: var(--primary-color-contrast);\n  border-radius: var(--border-radius-slice);\n}\n.anim-item {\n  position: absolute;\n  top: 100%;\n  left: 50%;\n  width: 0%;\n  height: 2.5px;\n  border-radius: 5px;\n  background-color: var(--primary-color-contrast);\n  transition: width 0.3s ease, left 0.3s ease;\n}\n.slice_nav_header li {\n  margin: 25px;\n  display: flex;\n  justify-content: center;\n  position: relative;\n}\n\n.slice_nav_header li:hover .anim-item {\n  width: 100%;\n  left: 0;\n}\n.slice_nav_header .logo_container {\n  padding: 10px;\n}\n.logo_container img {\n  pointer-events: none;\n  user-select: none;\n  max-height: 50px;\n  max-width: 200px;\n}\n.nav_bar_buttons {\n  justify-content: flex-end;\n  display: flex;\n}\n\n.mobile_menu_button,\n.mobile_close_menu {\n  visibility: hidden;\n  position: absolute;\n  right: 0px;\n  margin-right: 25px;\n}\n.mobile_close_menu {\n  top: 25px;\n}\n@media only screen and (max-width: 1020px) {\n  .slice_nav_bar {\n    z-index: 1;\n    list-style: none;\n    width: 100%;\n    height: 100%;\n    position: fixed;\n    top: 0;\n    left: 0;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    padding-top: 80px;\n    flex-direction: column;\n    background-color: var(--primary-color);\n    transform: translateX(100%);\n    transition: transform 0.3s ease;\n  }\n  .nav_bar_menu,\n  .nav_bar_buttons {\n    flex-direction: column;\n  }\n  .mobile_menu_button,\n  .mobile_close_menu {\n    visibility: visible;\n  }\n}\n\n/* CÓDIGO NUEVO - Mejora para mobile: organizar en grid de 2 columnas para reducir altura */\n@media only screen and (max-width: 1020px) {\n  .nav_bar_menu {\n    display: flex;\n    flex-direction: column;\n    gap: 16px;\n    width: auto;\n    max-width: 360px;\n    align-items: center;\n    padding: 0;\n  }\n  \n  .nav_bar_buttons {\n    flex-direction: column;\n    gap: 12px;\n    margin-top: 20px;\n    align-items: center;\n  }\n  \n  .slice_nav_header li {\n    margin: 18px;\n    width: auto;\n    justify-content: center;\n  }\n\n  .slice_nav_header .item {\n    font-size: 1.15rem;\n    letter-spacing: 0.02em;\n    padding: 6px 10px;\n  }\n  \n  .navbar-action-item {\n    width: auto;\n    margin: 0;\n  }\n}\n",
  size: 14116,
  class: SliceComponent_Navbar
},
"Link": {
  name: "Link",
  category: "Visual",
  categoryType: "Visual",
  componentDependencies: [],
  html: "<a href=\"#\" class=\"slice-link\" data-route></a>\n",
  css: "slice-link {\n  display: inline-flex;\n}\n\nslice-link .slice-link {\n  color: inherit;\n  text-decoration: none;\n}\n",
  size: 1504,
  class: SliceComponent_Link
},
"DropDown": {
  name: "DropDown",
  category: "Visual",
  categoryType: "Visual",
  componentDependencies: [],
  html: "<div class=\"slice_dropdown\">\n  <label class=\"slice_dropdown_label\"></label>\n  <div class=\"caret\"></div>\n</div>\n<div class=\"slice_dropbox\"></div>\n",
  css: ".slice_dropdown_label {\n  cursor: pointer;\n}\n.slice_dropdown {\n  cursor: pointer;\n  user-select: none;\n  display: flex;\n  justify-content: center;\n  display: flex;\n  border-radius: var(--border-radius-slice);\n  border: var(--slice-border) solid var(--primary-color);\n  align-items: center;\n}\n.slice_dropdown .caret {\n  margin-left: 10px;\n  border-top-color: var(--primary-color-contrast);\n}\n.slice_dropbox {\n  display: flex;\n  flex-direction: column;\n  border: var(--slice-border) solid var(--primary-color);\n  list-style: none;\n  font-family: var(--font-family);\n  visibility: hidden;\n  overflow: hidden;\n  position: absolute;\n  opacity: 0;\n  transition: 0s, opacity 0.3s;\n  top: 100%;\n  z-index: 1;\n  background-color: var(--primary-color);\n  border-radius: var(--border-radius-slice);\n  box-shadow: 0 0 10px 0 #00000050;\n}\n.slice_dropbox_open {\n  overflow-y: scroll;\n  min-height: min-content;\n  max-height: 200px;\n  visibility: visible;\n  opacity: 1;\n}\n.slice_dropbox_open::-webkit-scrollbar {\n  width: 5px;\n}\n.slice_dropbox_open::-webkit-scrollbar-thumb {\n  background: var(--secondary-color);\n  border-radius: var(--border-radius-slice);\n}\n.slice_dropbox {\n  width: 100%;\n}\n.slice_dropbox_open div a {\n  text-decoration: none;\n  color: var(--primary-color-contrast);\n  width: 100%;\n}\n.slice_dropbox_open div {\n  width: 100%;\n  padding: 5px;\n}\n",
  size: 3273,
  class: SliceComponent_DropDown
},
"Button": {
  name: "Button",
  category: "Visual",
  categoryType: "Visual",
  componentDependencies: ["Icon"],
  html: "<button class=\"slice_button\">\n  <label class=\"slice_button_value\"></label>\n</button>\n",
  css: "/* Host Element - Flexible container */\nslice-button {\n  display: inline-flex;\n  padding: 10px; /* Preserve original spacing/margin */\n  box-sizing: border-box;\n  vertical-align: middle;\n  overflow: visible;\n  border-radius: var(--border-radius-slice);\n}\n\n.slice_button_value {\n  user-select: none;\n  cursor: pointer;\n  color: inherit;\n}\n\n.slice_button {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  overflow: hidden;\n  position: relative;\n  \n  /* Adapts to host size */\n  width: 100%;\n  height: 100%;\n  min-width: fit-content;\n\n  /* Theming via CSS Variables */\n  background-color: var(--btn-bg, var(--primary-color));\n  color: var(--btn-text-color, var(--primary-color-contrast));\n  border: var(--slice-border) solid var(--btn-border-color, var(--primary-color));\n  \n  border-radius: var(--border-radius-slice);\n  font-weight: 800;\n  padding: 10px;\n  -webkit-transition-duration: 0.4s; /* Safari */\n  transition-duration: 0.4s;\n}\n\n.slice_button:focus-visible {\n  outline: none;\n  box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.25) inset;\n}\n\nslice-button:focus-within {\n  box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb), 0.3);\n}\n.slice_button:after {\n  content: \"\";\n  width: 100%;\n  height: 100%;\n  border-radius: 100%;\n  background: #ffffff50;\n  position: absolute;\n  display: block;\n  opacity: 0;\n  scale: 10;\n  transition: all 1s;\n}\n.slice_button:active {\n  transform: translateY(5px);\n}\n.slice_button:active:after {\n  scale: 0;\n  padding: 0;\n  margin: 0;\n  opacity: 1;\n  transition: 0s;\n}\n",
  size: 4725,
  class: SliceComponent_Button
},
"Icon": {
  name: "Icon",
  category: "Visual",
  categoryType: "Visual",
  componentDependencies: [],
  html: "",
  css: "@font-face {\n  font-family: \"slc\";\n  src: url('/Components/Visual/Icon/slc.eot?t=1714090352079'); /* IE9 */\n  src: url('/Components/Visual/Icon/slc.eot?t=1714090352079#iefix') format('embedded-opentype'),\n       url(\"/Components/Visual/Icon/slc.woff2?t=1714090352079\") format(\"woff2\"),\n       url(\"/Components/Visual/Icon/slc.woff?t=1714090352079\") format(\"woff\"),\n       url('/Components/Visual/Icon/slc.ttf?t=1714090352079') format('truetype'),\n       url('/Components/Visual/Icon/slc.svg?t=1714090352079#slc') format('svg'); /* iOS 4.1- */\n}\n\n/* Host Element Defaults */\nslice-icon {\n  display: inline-block;\n  line-height: 1; /* Prevent weird height */\n  font-style: normal; /* Override i defaults if browser applied them */\n  vertical-align: middle;\n}\n\n/* Apply font to elements with slc- class (including the host) */\n[class^=\"slc-\"], [class*=\" slc-\"] {\n  font-family: 'slc' !important;\n  font-style:normal;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n\n.slc-filaddress-book:before { content: \"\\ea01\"; }\n.slc-filadjustments-horizontal:before { content: \"\\ea02\"; }\n.slc-filadjustments-vertical:before { content: \"\\ea03\"; }\n.slc-filannotation:before { content: \"\\ea04\"; }\n.slc-filapple:before { content: \"\\ea05\"; }\n.slc-filarchive-arrow-down:before { content: \"\\ea06\"; }\n.slc-filarchive:before { content: \"\\ea07\"; }\n.slc-filarrow-right-alt:before { content: \"\\ea08\"; }\n.slc-filarrow-up-right-from-square:before { content: \"\\ea09\"; }\n.slc-filbackward-step:before { content: \"\\ea0a\"; }\n.slc-filbadge-check:before { content: \"\\ea0b\"; }\n.slc-filbell-active-alt:before { content: \"\\ea0c\"; }\n.slc-filbell-active:before { content: \"\\ea0d\"; }\n.slc-filbell-ring:before { content: \"\\ea0e\"; }\n.slc-filbell:before { content: \"\\ea0f\"; }\n.slc-filblender-phone:before { content: \"\\ea10\"; }\n.slc-filbook-open:before { content: \"\\ea11\"; }\n.slc-filbook:before { content: \"\\ea12\"; }\n.slc-filbookmark:before { content: \"\\ea13\"; }\n.slc-filbrain:before { content: \"\\ea14\"; }\n.slc-filbriefcase:before { content: \"\\ea15\"; }\n.slc-filbug:before { content: \"\\ea16\"; }\n.slc-filbuilding:before { content: \"\\ea17\"; }\n.slc-filbullhorn:before { content: \"\\ea18\"; }\n.slc-filcalendar-edit:before { content: \"\\ea19\"; }\n.slc-filcalendar-month:before { content: \"\\ea1a\"; }\n.slc-filcalendar-plus:before { content: \"\\ea1b\"; }\n.slc-filcalendar-week:before { content: \"\\ea1c\"; }\n.slc-filcamera-photo:before { content: \"\\ea1d\"; }\n.slc-filcaption:before { content: \"\\ea1e\"; }\n.slc-filcaret-down:before { content: \"\\ea1f\"; }\n.slc-filcaret-left:before { content: \"\\ea20\"; }\n.slc-filcaret-right:before { content: \"\\ea21\"; }\n.slc-filcaret-sort:before { content: \"\\ea22\"; }\n.slc-filcaret-up:before { content: \"\\ea23\"; }\n.slc-filcart-plus-alt:before { content: \"\\ea24\"; }\n.slc-filcart-plus:before { content: \"\\ea25\"; }\n.slc-filcart:before { content: \"\\ea26\"; }\n.slc-filcash:before { content: \"\\ea27\"; }\n.slc-filchart-mixed-dollar:before { content: \"\\ea28\"; }\n.slc-filchart-pie:before { content: \"\\ea29\"; }\n.slc-filcheck-circle:before { content: \"\\ea2a\"; }\n.slc-filcheck-plus-circle:before { content: \"\\ea2b\"; }\n.slc-filcircle-pause:before { content: \"\\ea2c\"; }\n.slc-filcircle-plus:before { content: \"\\ea2d\"; }\n.slc-filclapperboard-play:before { content: \"\\ea2e\"; }\n.slc-filclipboard-check:before { content: \"\\ea2f\"; }\n.slc-filclipboard-list:before { content: \"\\ea30\"; }\n.slc-filclipboard:before { content: \"\\ea31\"; }\n.slc-filclock:before { content: \"\\ea32\"; }\n.slc-filclose-circle:before { content: \"\\ea33\"; }\n.slc-filcloud-arrow-up:before { content: \"\\ea34\"; }\n.slc-filcode-branch:before { content: \"\\ea35\"; }\n.slc-filcode-fork:before { content: \"\\ea36\"; }\n.slc-filcode-merge:before { content: \"\\ea37\"; }\n.slc-filcode-pull-request:before { content: \"\\ea38\"; }\n.slc-filcog:before { content: \"\\ea39\"; }\n.slc-filcolumn:before { content: \"\\ea3a\"; }\n.slc-filcomputer-speaker:before { content: \"\\ea3b\"; }\n.slc-filcredit-card:before { content: \"\\ea3c\"; }\n.slc-filcss:before { content: \"\\ea3d\"; }\n.slc-fildatabase:before { content: \"\\ea3e\"; }\n.slc-fildesktop-pc:before { content: \"\\ea3f\"; }\n.slc-fildiscord:before { content: \"\\ea40\"; }\n.slc-fildownload:before { content: \"\\ea41\"; }\n.slc-fildraw-square:before { content: \"\\ea42\"; }\n.slc-fildribbble:before { content: \"\\ea43\"; }\n.slc-fildropbox:before { content: \"\\ea44\"; }\n.slc-filedit:before { content: \"\\ea45\"; }\n.slc-filenvelope-open:before { content: \"\\ea46\"; }\n.slc-filenvelope:before { content: \"\\ea47\"; }\n.slc-filexclamation-circle:before { content: \"\\ea48\"; }\n.slc-fileye-slash:before { content: \"\\ea49\"; }\n.slc-fileye:before { content: \"\\ea4a\"; }\n.slc-filface-explode:before { content: \"\\ea4b\"; }\n.slc-filface-grin-stars:before { content: \"\\ea4c\"; }\n.slc-filface-grin:before { content: \"\\ea4d\"; }\n.slc-filface-laugh:before { content: \"\\ea4e\"; }\n.slc-filfacebook:before { content: \"\\ea4f\"; }\n.slc-filfile-chart-bar:before { content: \"\\ea50\"; }\n.slc-filfile-check:before { content: \"\\ea51\"; }\n.slc-filfile-circle-plus:before { content: \"\\ea52\"; }\n.slc-filfile-clone:before { content: \"\\ea53\"; }\n.slc-filfile-code:before { content: \"\\ea54\"; }\n.slc-filfile-copy-alt:before { content: \"\\ea55\"; }\n.slc-filfile-copy:before { content: \"\\ea56\"; }\n.slc-filfile-csv:before { content: \"\\ea57\"; }\n.slc-filfile-export:before { content: \"\\ea58\"; }\n.slc-filfile-image:before { content: \"\\ea59\"; }\n.slc-filfile-import:before { content: \"\\ea5a\"; }\n.slc-filfile-invoice:before { content: \"\\ea5b\"; }\n.slc-filfile-lines:before { content: \"\\ea5c\"; }\n.slc-filfile-music:before { content: \"\\ea5d\"; }\n.slc-filfile-paste:before { content: \"\\ea5e\"; }\n.slc-filfile-pdf:before { content: \"\\ea5f\"; }\n.slc-filfile-pen:before { content: \"\\ea60\"; }\n.slc-filfile-ppt:before { content: \"\\ea61\"; }\n.slc-filfile-search:before { content: \"\\ea62\"; }\n.slc-filfile-shield:before { content: \"\\ea63\"; }\n.slc-filfile-video:before { content: \"\\ea64\"; }\n.slc-filfile-word:before { content: \"\\ea65\"; }\n.slc-filfile-zip:before { content: \"\\ea66\"; }\n.slc-filfile:before { content: \"\\ea67\"; }\n.slc-filfilter:before { content: \"\\ea68\"; }\n.slc-filfire:before { content: \"\\ea69\"; }\n.slc-filflag:before { content: \"\\ea6a\"; }\n.slc-filflowbite:before { content: \"\\ea6b\"; }\n.slc-filfolder-arrow-right:before { content: \"\\ea6c\"; }\n.slc-filfolder-duplicate:before { content: \"\\ea6d\"; }\n.slc-filfolder-open:before { content: \"\\ea6e\"; }\n.slc-filfolder-plus:before { content: \"\\ea6f\"; }\n.slc-filfolder:before { content: \"\\ea70\"; }\n.slc-filforward-step:before { content: \"\\ea71\"; }\n.slc-filforward:before { content: \"\\ea72\"; }\n.slc-filgift-box:before { content: \"\\ea73\"; }\n.slc-filgithub:before { content: \"\\ea74\"; }\n.slc-filglobe:before { content: \"\\ea75\"; }\n.slc-filgoogle:before { content: \"\\ea76\"; }\n.slc-filgrid-plus:before { content: \"\\ea77\"; }\n.slc-filgrid:before { content: \"\\ea78\"; }\n.slc-filheadphones:before { content: \"\\ea79\"; }\n.slc-filheart:before { content: \"\\ea7a\"; }\n.slc-filhome:before { content: \"\\ea7b\"; }\n.slc-filhourglass:before { content: \"\\ea7c\"; }\n.slc-filhtml:before { content: \"\\ea7d\"; }\n.slc-filimage:before { content: \"\\ea7e\"; }\n.slc-filinbox-full:before { content: \"\\ea7f\"; }\n.slc-filinbox:before { content: \"\\ea80\"; }\n.slc-filindent:before { content: \"\\ea81\"; }\n.slc-filinfo-circle:before { content: \"\\ea82\"; }\n.slc-filjavascript:before { content: \"\\ea83\"; }\n.slc-filkeyboard:before { content: \"\\ea84\"; }\n.slc-fillabel:before { content: \"\\ea85\"; }\n.slc-fillandmark:before { content: \"\\ea86\"; }\n.slc-fillayers:before { content: \"\\ea87\"; }\n.slc-fillife-saver:before { content: \"\\ea88\"; }\n.slc-fillightbulb:before { content: \"\\ea89\"; }\n.slc-fillinkedin:before { content: \"\\ea8a\"; }\n.slc-fillist-music:before { content: \"\\ea8b\"; }\n.slc-fillock-open:before { content: \"\\ea8c\"; }\n.slc-fillock-time:before { content: \"\\ea8d\"; }\n.slc-fillock:before { content: \"\\ea8e\"; }\n.slc-filmail-box:before { content: \"\\ea8f\"; }\n.slc-filmap-pin-alt:before { content: \"\\ea90\"; }\n.slc-filmap-pin:before { content: \"\\ea91\"; }\n.slc-filmessage-caption:before { content: \"\\ea92\"; }\n.slc-filmessage-dots:before { content: \"\\ea93\"; }\n.slc-filmessages:before { content: \"\\ea94\"; }\n.slc-filmicrophone:before { content: \"\\ea95\"; }\n.slc-filmobile-phone:before { content: \"\\ea96\"; }\n.slc-filmoon:before { content: \"\\ea97\"; }\n.slc-filnewspaper:before { content: \"\\ea98\"; }\n.slc-filnpm:before { content: \"\\ea99\"; }\n.slc-filoutdent:before { content: \"\\ea9a\"; }\n.slc-filpalette:before { content: \"\\ea9b\"; }\n.slc-filpaper-plane:before { content: \"\\ea9c\"; }\n.slc-filparagraph:before { content: \"\\ea9d\"; }\n.slc-filpause:before { content: \"\\ea9e\"; }\n.slc-filpen-nib:before { content: \"\\ea9f\"; }\n.slc-filpen:before { content: \"\\eaa0\"; }\n.slc-filphone:before { content: \"\\eaa1\"; }\n.slc-filplay:before { content: \"\\eaa2\"; }\n.slc-filprinter:before { content: \"\\eaa3\"; }\n.slc-filprofile-card:before { content: \"\\eaa4\"; }\n.slc-filquestion-circle:before { content: \"\\eaa5\"; }\n.slc-filquote:before { content: \"\\eaa6\"; }\n.slc-filreact:before { content: \"\\eaa7\"; }\n.slc-filreceipt:before { content: \"\\eaa8\"; }\n.slc-filrectangle-list:before { content: \"\\eaa9\"; }\n.slc-filreply-all:before { content: \"\\eaaa\"; }\n.slc-filreply:before { content: \"\\eaab\"; }\n.slc-filrocket:before { content: \"\\eaac\"; }\n.slc-filsale-percent:before { content: \"\\eaad\"; }\n.slc-filscale-balanced:before { content: \"\\eaae\"; }\n.slc-filsearch:before { content: \"\\eaaf\"; }\n.slc-filshare-all:before { content: \"\\eab0\"; }\n.slc-filshare-nodes:before { content: \"\\eab1\"; }\n.slc-filshield-check:before { content: \"\\eab2\"; }\n.slc-filshield:before { content: \"\\eab3\"; }\n.slc-filshopping-bag:before { content: \"\\eab4\"; }\n.slc-filsingleSlice:before { content: \"\\eab5\"; }\n.slc-filsliceJs:before { content: \"\\eab6\"; }\n.slc-filsliceLogo:before { content: \"\\eab7\"; }\n.slc-filslicePizza:before { content: \"\\eab8\"; }\n.slc-filstackoverflow:before { content: \"\\eab9\"; }\n.slc-filstar-half-stroke:before { content: \"\\eaba\"; }\n.slc-filstar-half:before { content: \"\\eabb\"; }\n.slc-filstar:before { content: \"\\eabc\"; }\n.slc-filstore:before { content: \"\\eabd\"; }\n.slc-filsun:before { content: \"\\eabe\"; }\n.slc-filswatchbook:before { content: \"\\eabf\"; }\n.slc-filtable-column:before { content: \"\\eac0\"; }\n.slc-filtable-row:before { content: \"\\eac1\"; }\n.slc-filtablet:before { content: \"\\eac2\"; }\n.slc-filtag:before { content: \"\\eac3\"; }\n.slc-filtailwind:before { content: \"\\eac4\"; }\n.slc-filterminal:before { content: \"\\eac5\"; }\n.slc-filthumbs-down:before { content: \"\\eac6\"; }\n.slc-filthumbs-up:before { content: \"\\eac7\"; }\n.slc-filticket:before { content: \"\\eac8\"; }\n.slc-filtrash-bin:before { content: \"\\eac9\"; }\n.slc-filtruck:before { content: \"\\eaca\"; }\n.slc-filtwitter:before { content: \"\\eacb\"; }\n.slc-filupload:before { content: \"\\eacc\"; }\n.slc-filuser-add:before { content: \"\\eacd\"; }\n.slc-filuser-circle:before { content: \"\\eace\"; }\n.slc-filuser-edit:before { content: \"\\eacf\"; }\n.slc-filuser-headset:before { content: \"\\ead0\"; }\n.slc-filuser-remove:before { content: \"\\ead1\"; }\n.slc-filuser-settings:before { content: \"\\ead2\"; }\n.slc-filuser:before { content: \"\\ead3\"; }\n.slc-filusers-group:before { content: \"\\ead4\"; }\n.slc-filusers:before { content: \"\\ead5\"; }\n.slc-filvideo-camera:before { content: \"\\ead6\"; }\n.slc-filvolume-down:before { content: \"\\ead7\"; }\n.slc-filvolume-up:before { content: \"\\ead8\"; }\n.slc-filvue:before { content: \"\\ead9\"; }\n.slc-filwallet:before { content: \"\\eada\"; }\n.slc-filwand-magic-sparkles:before { content: \"\\eadb\"; }\n.slc-filwindow-restore:before { content: \"\\eadc\"; }\n.slc-filwindow:before { content: \"\\eadd\"; }\n.slc-filX:before { content: \"\\eade\"; }\n.slc-filyoutube:before { content: \"\\eadf\"; }\n.slc-filzoom-in:before { content: \"\\eae0\"; }\n.slc-filzoom-out:before { content: \"\\eae1\"; }\n.slc-outaddress-book:before { content: \"\\eae2\"; }\n.slc-outadjustments-horizontal:before { content: \"\\eae3\"; }\n.slc-outadjustments-vertical:before { content: \"\\eae4\"; }\n.slc-outalign-center:before { content: \"\\eae5\"; }\n.slc-outangle-down:before { content: \"\\eae6\"; }\n.slc-outangle-left:before { content: \"\\eae7\"; }\n.slc-outangle-right:before { content: \"\\eae8\"; }\n.slc-outangle-up:before { content: \"\\eae9\"; }\n.slc-outannotation:before { content: \"\\eaea\"; }\n.slc-outarchive-arrow-down:before { content: \"\\eaeb\"; }\n.slc-outarchive:before { content: \"\\eaec\"; }\n.slc-outarrow-down-to-bracket:before { content: \"\\eaed\"; }\n.slc-outarrow-down:before { content: \"\\eaee\"; }\n.slc-outarrow-left-to-bracket:before { content: \"\\eaef\"; }\n.slc-outarrow-left:before { content: \"\\eaf0\"; }\n.slc-outarrow-right-alt:before { content: \"\\eaf1\"; }\n.slc-outarrow-right-to-bracket:before { content: \"\\eaf2\"; }\n.slc-outarrow-right:before { content: \"\\eaf3\"; }\n.slc-outarrow-sort-letters:before { content: \"\\eaf4\"; }\n.slc-outarrow-up-down:before { content: \"\\eaf5\"; }\n.slc-outarrow-up-from-bracket:before { content: \"\\eaf6\"; }\n.slc-outarrow-up-right-down-left:before { content: \"\\eaf7\"; }\n.slc-outarrow-up-right-from-square:before { content: \"\\eaf8\"; }\n.slc-outarrow-up:before { content: \"\\eaf9\"; }\n.slc-outarrows-repeat-count:before { content: \"\\eafa\"; }\n.slc-outarrows-repeat:before { content: \"\\eafb\"; }\n.slc-outatom:before { content: \"\\eafc\"; }\n.slc-outbackward-step:before { content: \"\\eafd\"; }\n.slc-outbadge-check:before { content: \"\\eafe\"; }\n.slc-outbars-from-left:before { content: \"\\eaff\"; }\n.slc-outbars:before { content: \"\\eb00\"; }\n.slc-outbell-active-alt:before { content: \"\\eb01\"; }\n.slc-outbell-active:before { content: \"\\eb02\"; }\n.slc-outbell-ring:before { content: \"\\eb03\"; }\n.slc-outbell:before { content: \"\\eb04\"; }\n.slc-outblender-phone:before { content: \"\\eb05\"; }\n.slc-outbook-open:before { content: \"\\eb06\"; }\n.slc-outbook:before { content: \"\\eb07\"; }\n.slc-outbookmark:before { content: \"\\eb08\"; }\n.slc-outbrain:before { content: \"\\eb09\"; }\n.slc-outbriefcase:before { content: \"\\eb0a\"; }\n.slc-outbug:before { content: \"\\eb0b\"; }\n.slc-outbuilding:before { content: \"\\eb0c\"; }\n.slc-outbullhorn:before { content: \"\\eb0d\"; }\n.slc-outcalendar-edit:before { content: \"\\eb0e\"; }\n.slc-outcalendar-month:before { content: \"\\eb0f\"; }\n.slc-outcalendar-plus:before { content: \"\\eb10\"; }\n.slc-outcalendar-week:before { content: \"\\eb11\"; }\n.slc-outcamera-photo:before { content: \"\\eb12\"; }\n.slc-outcaption:before { content: \"\\eb13\"; }\n.slc-outcaret-down:before { content: \"\\eb14\"; }\n.slc-outcaret-left:before { content: \"\\eb15\"; }\n.slc-outcaret-right:before { content: \"\\eb16\"; }\n.slc-outcaret-sort:before { content: \"\\eb17\"; }\n.slc-outcaret-up:before { content: \"\\eb18\"; }\n.slc-outcart-plus-alt:before { content: \"\\eb19\"; }\n.slc-outcart-plus:before { content: \"\\eb1a\"; }\n.slc-outcart:before { content: \"\\eb1b\"; }\n.slc-outcash:before { content: \"\\eb1c\"; }\n.slc-outchart-line-down:before { content: \"\\eb1d\"; }\n.slc-outchart-line-up:before { content: \"\\eb1e\"; }\n.slc-outchart-mixed-dollar:before { content: \"\\eb1f\"; }\n.slc-outchart-mixed:before { content: \"\\eb20\"; }\n.slc-outchart-pie:before { content: \"\\eb21\"; }\n.slc-outchart:before { content: \"\\eb22\"; }\n.slc-outcheck-circle:before { content: \"\\eb23\"; }\n.slc-outcheck-plus-circle:before { content: \"\\eb24\"; }\n.slc-outcheck:before { content: \"\\eb25\"; }\n.slc-outchevron-double-down:before { content: \"\\eb26\"; }\n.slc-outchevron-double-left:before { content: \"\\eb27\"; }\n.slc-outchevron-double-right:before { content: \"\\eb28\"; }\n.slc-outchevron-double-up:before { content: \"\\eb29\"; }\n.slc-outchevron-down:before { content: \"\\eb2a\"; }\n.slc-outchevron-left:before { content: \"\\eb2b\"; }\n.slc-outchevron-right:before { content: \"\\eb2c\"; }\n.slc-outchevron-sort:before { content: \"\\eb2d\"; }\n.slc-outchevron-up:before { content: \"\\eb2e\"; }\n.slc-outcircle-pause:before { content: \"\\eb2f\"; }\n.slc-outcircle-plus:before { content: \"\\eb30\"; }\n.slc-outclapperboard-play:before { content: \"\\eb31\"; }\n.slc-outclipboard-check:before { content: \"\\eb32\"; }\n.slc-outclipboard-list:before { content: \"\\eb33\"; }\n.slc-outclipboard:before { content: \"\\eb34\"; }\n.slc-outclock:before { content: \"\\eb35\"; }\n.slc-outclose-circle:before { content: \"\\eb36\"; }\n.slc-outclose:before { content: \"\\eb37\"; }\n.slc-outcloud-arrow-up:before { content: \"\\eb38\"; }\n.slc-outcode-branch:before { content: \"\\eb39\"; }\n.slc-outcode-fork:before { content: \"\\eb3a\"; }\n.slc-outcode-merge:before { content: \"\\eb3b\"; }\n.slc-outcode-pull-request:before { content: \"\\eb3c\"; }\n.slc-outcode:before { content: \"\\eb3d\"; }\n.slc-outcog:before { content: \"\\eb3e\"; }\n.slc-outcolumn:before { content: \"\\eb3f\"; }\n.slc-outcommand:before { content: \"\\eb40\"; }\n.slc-outcompress:before { content: \"\\eb41\"; }\n.slc-outcomputer-speaker:before { content: \"\\eb42\"; }\n.slc-outcredit-card:before { content: \"\\eb43\"; }\n.slc-outdatabase:before { content: \"\\eb44\"; }\n.slc-outdesktop-pc:before { content: \"\\eb45\"; }\n.slc-outdna:before { content: \"\\eb46\"; }\n.slc-outdollar:before { content: \"\\eb47\"; }\n.slc-outdots-horizontal:before { content: \"\\eb48\"; }\n.slc-outdots-vertical:before { content: \"\\eb49\"; }\n.slc-outdownload:before { content: \"\\eb4a\"; }\n.slc-outdraw-square:before { content: \"\\eb4b\"; }\n.slc-outedit:before { content: \"\\eb4c\"; }\n.slc-outenvelope-open:before { content: \"\\eb4d\"; }\n.slc-outenvelope:before { content: \"\\eb4e\"; }\n.slc-outeuro:before { content: \"\\eb4f\"; }\n.slc-outexclamation-circle:before { content: \"\\eb50\"; }\n.slc-outexpand:before { content: \"\\eb51\"; }\n.slc-outeye-slash:before { content: \"\\eb52\"; }\n.slc-outeye:before { content: \"\\eb53\"; }\n.slc-outface-explode:before { content: \"\\eb54\"; }\n.slc-outface-grin-stars:before { content: \"\\eb55\"; }\n.slc-outface-grin:before { content: \"\\eb56\"; }\n.slc-outface-laugh:before { content: \"\\eb57\"; }\n.slc-outfile-chart-bar:before { content: \"\\eb58\"; }\n.slc-outfile-check:before { content: \"\\eb59\"; }\n.slc-outfile-circle-plus:before { content: \"\\eb5a\"; }\n.slc-outfile-clone:before { content: \"\\eb5b\"; }\n.slc-outfile-code:before { content: \"\\eb5c\"; }\n.slc-outfile-copy-alt:before { content: \"\\eb5d\"; }\n.slc-outfile-copy:before { content: \"\\eb5e\"; }\n.slc-outfile-csv:before { content: \"\\eb5f\"; }\n.slc-outfile-export:before { content: \"\\eb60\"; }\n.slc-outfile-image:before { content: \"\\eb61\"; }\n.slc-outfile-import:before { content: \"\\eb62\"; }\n.slc-outfile-invoice:before { content: \"\\eb63\"; }\n.slc-outfile-lines:before { content: \"\\eb64\"; }\n.slc-outfile-music:before { content: \"\\eb65\"; }\n.slc-outfile-paste:before { content: \"\\eb66\"; }\n.slc-outfile-pdf:before { content: \"\\eb67\"; }\n.slc-outfile-pen:before { content: \"\\eb68\"; }\n.slc-outfile-ppt:before { content: \"\\eb69\"; }\n.slc-outfile-search:before { content: \"\\eb6a\"; }\n.slc-outfile-shield:before { content: \"\\eb6b\"; }\n.slc-outfile-video:before { content: \"\\eb6c\"; }\n.slc-outfile-word:before { content: \"\\eb6d\"; }\n.slc-outfile-zip:before { content: \"\\eb6e\"; }\n.slc-outfile:before { content: \"\\eb6f\"; }\n.slc-outfilter:before { content: \"\\eb70\"; }\n.slc-outfingerprint:before { content: \"\\eb71\"; }\n.slc-outfire:before { content: \"\\eb72\"; }\n.slc-outflag:before { content: \"\\eb73\"; }\n.slc-outfolder-arrow-right:before { content: \"\\eb74\"; }\n.slc-outfolder-duplicate:before { content: \"\\eb75\"; }\n.slc-outfolder-open:before { content: \"\\eb76\"; }\n.slc-outfolder-plus:before { content: \"\\eb77\"; }\n.slc-outfolder:before { content: \"\\eb78\"; }\n.slc-outforward-step:before { content: \"\\eb79\"; }\n.slc-outforward:before { content: \"\\eb7a\"; }\n.slc-outgift-box:before { content: \"\\eb7b\"; }\n.slc-outglobe:before { content: \"\\eb7c\"; }\n.slc-outgrid-plus:before { content: \"\\eb7d\"; }\n.slc-outgrid:before { content: \"\\eb7e\"; }\n.slc-outheadphones:before { content: \"\\eb7f\"; }\n.slc-outheart:before { content: \"\\eb80\"; }\n.slc-outhome:before { content: \"\\eb81\"; }\n.slc-outhourglass:before { content: \"\\eb82\"; }\n.slc-outimage:before { content: \"\\eb83\"; }\n.slc-outinbox-full:before { content: \"\\eb84\"; }\n.slc-outinbox:before { content: \"\\eb85\"; }\n.slc-outindent:before { content: \"\\eb86\"; }\n.slc-outinfo-circle:before { content: \"\\eb87\"; }\n.slc-outkeyboard:before { content: \"\\eb88\"; }\n.slc-outlabel:before { content: \"\\eb89\"; }\n.slc-outlandmark:before { content: \"\\eb8a\"; }\n.slc-outlayers:before { content: \"\\eb8b\"; }\n.slc-outletter-bold:before { content: \"\\eb8c\"; }\n.slc-outletter-italic:before { content: \"\\eb8d\"; }\n.slc-outletter-underline:before { content: \"\\eb8e\"; }\n.slc-outlife-saver:before { content: \"\\eb8f\"; }\n.slc-outlightbulb:before { content: \"\\eb90\"; }\n.slc-outlink:before { content: \"\\eb91\"; }\n.slc-outlist-music:before { content: \"\\eb92\"; }\n.slc-outlist:before { content: \"\\eb93\"; }\n.slc-outlock-open:before { content: \"\\eb94\"; }\n.slc-outlock-time:before { content: \"\\eb95\"; }\n.slc-outlock:before { content: \"\\eb96\"; }\n.slc-outmail-box:before { content: \"\\eb97\"; }\n.slc-outmap-pin-alt:before { content: \"\\eb98\"; }\n.slc-outmap-pin:before { content: \"\\eb99\"; }\n.slc-outmessage-caption:before { content: \"\\eb9a\"; }\n.slc-outmessage-dots:before { content: \"\\eb9b\"; }\n.slc-outmessages:before { content: \"\\eb9c\"; }\n.slc-outmicrophone:before { content: \"\\eb9d\"; }\n.slc-outminimize:before { content: \"\\eb9e\"; }\n.slc-outminus:before { content: \"\\eb9f\"; }\n.slc-outmobile-phone:before { content: \"\\eba0\"; }\n.slc-outmoon:before { content: \"\\eba1\"; }\n.slc-outnewspaper:before { content: \"\\eba2\"; }\n.slc-outordered-list:before { content: \"\\eba3\"; }\n.slc-outoutdent:before { content: \"\\eba4\"; }\n.slc-outpalette:before { content: \"\\eba5\"; }\n.slc-outpaper-clip:before { content: \"\\eba6\"; }\n.slc-outpaper-plane:before { content: \"\\eba7\"; }\n.slc-outparagraph:before { content: \"\\eba8\"; }\n.slc-outpause:before { content: \"\\eba9\"; }\n.slc-outpen-nib:before { content: \"\\ebaa\"; }\n.slc-outpen:before { content: \"\\ebab\"; }\n.slc-outphone:before { content: \"\\ebac\"; }\n.slc-outplay:before { content: \"\\ebad\"; }\n.slc-outplus:before { content: \"\\ebae\"; }\n.slc-outprinter:before { content: \"\\ebaf\"; }\n.slc-outprofile-card:before { content: \"\\ebb0\"; }\n.slc-outquestion-circle:before { content: \"\\ebb1\"; }\n.slc-outquote:before { content: \"\\ebb2\"; }\n.slc-outreceipt:before { content: \"\\ebb3\"; }\n.slc-outrectangle-list:before { content: \"\\ebb4\"; }\n.slc-outredo:before { content: \"\\ebb5\"; }\n.slc-outrefresh:before { content: \"\\ebb6\"; }\n.slc-outreply-all:before { content: \"\\ebb7\"; }\n.slc-outreply:before { content: \"\\ebb8\"; }\n.slc-outrestore-window:before { content: \"\\ebb9\"; }\n.slc-outrocket:before { content: \"\\ebba\"; }\n.slc-outruler-combined:before { content: \"\\ebbb\"; }\n.slc-outsale-percent:before { content: \"\\ebbc\"; }\n.slc-outscale-balanced:before { content: \"\\ebbd\"; }\n.slc-outsearch:before { content: \"\\ebbe\"; }\n.slc-outshare-all:before { content: \"\\ebbf\"; }\n.slc-outshare-nodes:before { content: \"\\ebc0\"; }\n.slc-outshield-check:before { content: \"\\ebc1\"; }\n.slc-outshield:before { content: \"\\ebc2\"; }\n.slc-outshopping-bag:before { content: \"\\ebc3\"; }\n.slc-outshuffle:before { content: \"\\ebc4\"; }\n.slc-outsort-horizontal:before { content: \"\\ebc5\"; }\n.slc-outsort:before { content: \"\\ebc6\"; }\n.slc-outstar-half-stroke:before { content: \"\\ebc7\"; }\n.slc-outstar-half:before { content: \"\\ebc8\"; }\n.slc-outstar:before { content: \"\\ebc9\"; }\n.slc-outstore:before { content: \"\\ebca\"; }\n.slc-outsun:before { content: \"\\ebcb\"; }\n.slc-outswatchbook:before { content: \"\\ebcc\"; }\n.slc-outtable-column:before { content: \"\\ebcd\"; }\n.slc-outtable-row:before { content: \"\\ebce\"; }\n.slc-outtablet:before { content: \"\\ebcf\"; }\n.slc-outtag:before { content: \"\\ebd0\"; }\n.slc-outterminal:before { content: \"\\ebd1\"; }\n.slc-outtext-size:before { content: \"\\ebd2\"; }\n.slc-outtext-slash:before { content: \"\\ebd3\"; }\n.slc-outthumbs-down:before { content: \"\\ebd4\"; }\n.slc-outthumbs-up:before { content: \"\\ebd5\"; }\n.slc-outticket:before { content: \"\\ebd6\"; }\n.slc-outtrash-bin:before { content: \"\\ebd7\"; }\n.slc-outtruck:before { content: \"\\ebd8\"; }\n.slc-outundo:before { content: \"\\ebd9\"; }\n.slc-outupload:before { content: \"\\ebda\"; }\n.slc-outuser-add:before { content: \"\\ebdb\"; }\n.slc-outuser-circle:before { content: \"\\ebdc\"; }\n.slc-outuser-edit:before { content: \"\\ebdd\"; }\n.slc-outuser-headset:before { content: \"\\ebde\"; }\n.slc-outuser-remove:before { content: \"\\ebdf\"; }\n.slc-outuser-settings:before { content: \"\\ebe0\"; }\n.slc-outuser:before { content: \"\\ebe1\"; }\n.slc-outusers-group:before { content: \"\\ebe2\"; }\n.slc-outusers:before { content: \"\\ebe3\"; }\n.slc-outvideo-camera:before { content: \"\\ebe4\"; }\n.slc-outvolume-down:before { content: \"\\ebe5\"; }\n.slc-outvolume-up:before { content: \"\\ebe6\"; }\n.slc-outwallet:before { content: \"\\ebe7\"; }\n.slc-outwand-magic-sparkles:before { content: \"\\ebe8\"; }\n.slc-outwindow:before { content: \"\\ebe9\"; }\n.slc-outzoom-in:before { content: \"\\ebea\"; }\n.slc-outzoom-out:before { content: \"\\ebeb\"; }\n\n",
  size: 1458058,
  class: SliceComponent_Icon
},
"MultiRoute": {
  name: "MultiRoute",
  category: "Visual",
  categoryType: "Visual",
  componentDependencies: [],
  html: null,
  css: null,
  size: 3168,
  class: SliceComponent_MultiRoute
},
"AboutSection": {
  name: "AboutSection",
  category: "AppComponents",
  categoryType: "Visual",
  componentDependencies: ["Button","Grid","Card","TechExpertise","ImageCarrousel","RandomFacts"],
  html: "<div class=\"about-container\">\n  <section class=\"hero-section\">\n    <div class=\"hero-background-elements\">\n      <div class=\"floating-element element-1\"></div>\n      <div class=\"floating-element element-2\"></div>\n      <div class=\"floating-element element-3\"></div>\n      <div class=\"floating-element element-4\"></div>\n    </div>\n    <div class=\"hero-content\"></div>\n  </section>\n  <section class=\"values-section\"></section>  \n  \n  <section class=\"about-content\">\n    <h2 class=\"section-title\">About Me</h2>\n  </section>\n  \n  <section class=\"skills-section\"></section>\n  \n  <section class=\"random-facts-section\"></section>\n  \n</div>",
  css: "slice-about-section {\n  display: block;\n  width: 100%;\n}\n\n.about-container {\n  width: 100%;\n}\n\n/* Enhanced Hero Section - COMPACTO */\n.hero-section {\n  position: relative;\n  text-align: center;\n  padding: 4rem 2rem; /* Aumentado aún más */\n  padding-top: 4.5rem; /* Aumentado para dar más espacio arriba */\n  background-color: var(--secondary-background-color);\n  margin-bottom: 3rem;\n  /* Remover border-radius y border para que ocupe todo el ancho */\n  border-radius: 0;\n  border: none;\n  overflow: hidden;\n\n  animation: heroGlow 4s ease-in-out infinite alternate;\n  /* Hacer que ocupe toda la altura horizontal */\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  /* Extender para ocupar todo el ancho */\n  width: 100vw;\n  margin-left: calc(-50vw + 50%);\n  margin-right: calc(-50vw + 50%);\n}\n\n.hero-section::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: \n    radial-gradient(circle at 20% 80%, var(--primary-color) 0%, transparent 20%),\n    radial-gradient(circle at 80% 20%, var(--secondary-color) 0%, transparent 20%);\n  opacity: 0.05;\n  pointer-events: none;\n}\n\n\n\n/* Floating Background Elements */\n.hero-background-elements {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n  z-index: 1;\n}\n\n.floating-element {\n  position: absolute;\n  background: var(--primary-color);\n  opacity: 0.1;\n  border-radius: 50%;\n  animation: float 6s ease-in-out infinite;\n  /* Add subtle glow to floating elements */\n  box-shadow: 0 0 20px rgba(var(--primary-color-rgb), 0.4);\n}\n\n.element-1 {\n  width: 100px;\n  height: 100px;\n  top: 20%;\n  left: 10%;\n  animation-delay: 0s;\n}\n\n.element-2 {\n  width: 60px;\n  height: 60px;\n  top: 60%;\n  right: 15%;\n  animation-delay: 2s;\n  background: var(--secondary-color);\n  box-shadow: 0 0 20px rgba(var(--secondary-color-rgb), 0.4);\n}\n\n.element-3 {\n  width: 80px;\n  height: 80px;\n  bottom: 30%;\n  left: 20%;\n  animation-delay: 4s;\n  background: var(--success-color);\n  box-shadow: 0 0 20px rgba(16, 185, 129, 0.4);\n}\n\n.element-4 {\n  width: 40px;\n  height: 40px;\n  top: 30%;\n  right: 30%;\n  animation-delay: 1s;\n  background: var(--warning-color);\n  box-shadow: 0 0 15px rgba(245, 158, 11, 0.4);\n}\n\n@keyframes float {\n  0%, 100% { \n    transform: translateY(0px) rotate(0deg); \n  }\n  50% { \n    transform: translateY(-20px) rotate(180deg); \n  }\n}\n\n.hero-content {\n  position: relative;\n  max-width: 900px;\n  margin: 0 auto;\n  z-index: 2;\n}\n\n/* Enhanced Profile Image - COMPACTO */\n.profile-container {\n  position: relative;\n  display: inline-block;\n  margin-bottom: 2.5rem; /* Reducido de 3rem para mejor balance */\n}\n\n.profile-ring {\n  position: absolute;\n  top: -25px; /* Ajustado para la nueva imagen */\n  left: -25px; /* Ajustado para la nueva imagen */\n  right: -25px; /* Ajustado para la nueva imagen */\n  bottom: -25px; /* Ajustado para la nueva imagen */\n  border: 4px solid transparent; /* Aumentado de 3px */\n  border-radius: 50%;\n  border-top: 4px solid var(--primary-color);\n  border-right: 4px solid var(--secondary-color);\n  border-bottom: 4px solid var(--success-color);\n  border-left: 4px solid var(--warning-color);\n  animation: rotateRing 4s linear infinite;\n  /* Glowing ring effect */\n  box-shadow: \n    0 0 35px rgba(var(--primary-color-rgb), 0.6), /* Aumentado */\n    inset 0 0 35px rgba(var(--primary-color-rgb), 0.3); /* Aumentado */\n}\n\n.profile-ring::before {\n  content: '';\n  position: absolute;\n  top: -10px; /* Ajustado para la nueva imagen */\n  left: -10px; /* Ajustado para la nueva imagen */\n  right: -10px; /* Ajustado para la nueva imagen */\n  bottom: -10px; /* Ajustado para la nueva imagen */\n  border: 2px solid var(--primary-color); /* Aumentado de 1px */\n  border-radius: 50%;\n  opacity: 0.3;\n  animation: rotateRing 6s linear infinite reverse;\n  /* Outer ring glow */\n  box-shadow: 0 0 40px rgba(var(--primary-color-rgb), 0.5); /* Aumentado */\n}\n\n@keyframes rotateRing {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}\n\n.profile-image {\n  width: 280px; /* Aumentado significativamente de 160px */\n  height: 280px; /* Aumentado significativamente de 160px */\n  border-radius: 50%;\n  object-fit: cover;\n  border: 6px solid var(--primary-background-color); /* Aumentado de 4px */\n  box-shadow: \n    0 25px 50px rgba(0, 0, 0, 0.3), /* Aumentado significativamente */\n    0 0 40px rgba(var(--primary-color-rgb), 0.4); /* Aumentado */\n  transition: transform 0.4s ease, box-shadow 0.4s ease;\n  position: relative;\n  z-index: 3;\n}\n\n.profile-image:hover {\n  transform: scale(1.05);\n  box-shadow: \n    0 25px 50px rgba(0, 0, 0, 0.3),\n    0 0 50px rgba(var(--primary-color-rgb), 0.6);\n}\n\n/* Enhanced Hero Text - COMPACTO */\n.title-container {\n  position: relative;\n  margin-bottom: 1.5rem; /* Ajustado de 1.8rem */\n}\n\n.hero-text h1 {\n  font-size: 3.8rem; /* Reducido de 4.5rem para mejor balance */\n  margin: 0;\n  color: var(--primary-color);\n  font-weight: 900;\n  position: relative;\n  /* Text glow effect */\n  text-shadow: \n    0 0 18px rgba(var(--primary-color-rgb), 0.6),\n    0 0 30px rgba(var(--primary-color-rgb), 0.4),\n    0 0 40px rgba(var(--primary-color-rgb), 0.2);\n}\n\n.title-accent {\n  position: absolute;\n  bottom: -18px; /* Ajustado de -20px */\n  left: 50%;\n  transform: translateX(-50%);\n  width: 130px; /* Reducido de 150px */\n  height: 5px; /* Reducido de 6px */\n  background-color: var(--secondary-color);\n  border-radius: 3px;\n  /* Accent glow */\n  box-shadow: \n    0 0 18px rgba(var(--secondary-color-rgb), 0.8),\n    0 0 30px rgba(var(--secondary-color-rgb), 0.5);\n}\n\n.roles-container {\n  height: 70px; /* Reducido de 80px para mejor balance */\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 1.8rem; /* Ajustado de 2rem */\n}\n\n.role-title {\n  font-size: 2.4rem; /* Reducido de 2.8rem para mejor balance */\n  margin: 0;\n  color: var(--font-secondary-color);\n  font-weight: 600;\n  min-height: 3rem; /* Ajustado de 3.5rem */\n}\n\n.role-switcher {\n  transition: opacity 0.3s ease;\n  color: var(--primary-color);\n  font-weight: 600;\n  /* Subtle text glow */\n  text-shadow: 0 0 15px rgba(var(--primary-color-rgb), 0.4);\n}\n\n.hero-description {\n  font-size: 1.3rem; /* Reducido de 1.5rem para mejor balance */\n  line-height: 1.7; /* Ajustado de 1.8 */\n  color: var(--font-primary-color);\n  margin-bottom: 2.2rem; /* Ajustado de 2.5rem */\n  max-width: 750px; /* Ajustado de 800px */\n  margin-left: auto;\n  margin-right: auto;\n  font-weight: 500;\n}\n\n/* Hero Stats - COMPACTO */\n.hero-stats {\n  display: flex;\n  justify-content: center;\n  gap: 1rem; /* Reducido de 1.5rem */\n  margin-bottom: 1rem; /* Reducido de 1.5rem */\n  flex-wrap: wrap;\n}\n\n.stat-item {\n  text-align: center;\n  padding: 0.8rem; /* Reducido de 1rem */\n  background: var(--tertiary-background-color);\n  border-radius: var(--border-radius-slice);\n  border: 2px solid var(--primary-color-shade);\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n  /* Stat item glow */\n  box-shadow: \n    0 3px 12px rgba(0, 0, 0, 0.1), /* Reducido de 0 4px 15px */\n    0 0 15px rgba(var(--primary-color-rgb), 0.1); /* Reducido de 0 0 20px */\n}\n\n.stat-item:hover {\n  transform: translateY(-5px);\n  border-color: var(--primary-color);\n  /* Enhanced glow on hover */\n  box-shadow: \n    0 8px 25px rgba(0, 0, 0, 0.15),\n    0 0 30px rgba(var(--primary-color-rgb), 0.4);\n}\n\n.stat-number {\n  display: block;\n  font-size: 2rem; /* Reducido de 2.5rem */\n  font-weight: bold;\n  color: var(--primary-color);\n  margin-bottom: 0.3rem; /* Reducido de 0.5rem */\n  /* Number glow */\n  text-shadow: 0 0 8px rgba(var(--primary-color-rgb), 0.3); /* Reducido de 0 0 10px */\n}\n\n.stat-label {\n  display: block;\n  font-size: 0.9rem;\n  color: var(--font-secondary-color);\n  font-weight: 500;\n}\n\n/* Enhanced CTA Buttons */\n.cta-buttons {\n  display: flex;\n  gap: 1.5rem;\n  justify-content: center;\n  flex-wrap: wrap;\n}\n\n/* Section Titles - COMPACTO */\n.section-title {\n  font-size: 2.5rem;\n  color: var(--primary-color);\n  text-align: center;\n  margin-bottom: 2rem; /* Reducido de 3rem */\n  font-weight: 700;\n  position: relative;\n  /* Section title glow */\n  text-shadow: \n    0 0 12px rgba(var(--primary-color-rgb), 0.4), /* Reducido de 0 0 15px */\n    0 0 20px rgba(var(--primary-color-rgb), 0.2); /* Reducido de 0 0 30px */\n}\n\n.section-title::after {\n  content: '';\n  position: absolute;\n  bottom: -15px;\n  left: 50%;\n  transform: translateX(-50%);\n  width: 80px;\n  height: 4px;\n  background-color: var(--secondary-color);\n  border-radius: 2px;\n  /* Title underline glow */\n  box-shadow: \n    0 0 15px rgba(var(--secondary-color-rgb), 0.6),\n    0 0 30px rgba(var(--secondary-color-rgb), 0.3);\n}\n\n/* About Section using Slice Cards - COMPACTO */\n.about-content {\n  margin-bottom: 3rem; /* Reducido de 4rem */\n}\n\n\n\n/* Ensure proper spacing for Slice Grid component */\n.about-content slice-grid {\n  margin-top: 2rem;\n}\n\n.about-content slice-grid .grid-container {\n  gap: 2rem;\n}\n\n/* Override default Card styles for better integration */\n.about-content slice-card {\n  height: 100%;\n  align-items: center;\n  align-self: center;\n  justify-content: center;\n  transition: all 0.3s ease;\n}\n\n.about-content slice-card:hover {\n  transform: translateY(-8px);\n  \n}\n\n\n\n\n/* Values Section - COMPACTO */\n.values-section {\n  margin-bottom: 3rem; /* Reducido de 4rem */\n}\n\n/* Teaching Section - COMPACTO */\n.teaching-section {\n  margin-bottom: 3rem; /* Reducido de 4rem */\n}\n\n.values-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 2rem;\n  margin-top: 3rem;\n}\n\n.value-card {\n  background: var(--secondary-background-color);\n  padding: 2rem;\n  border-radius: 15px;\n  text-align: center;\n  box-shadow: \n    0 6px 20px rgba(0, 0, 0, 0.1),\n    0 0 20px rgba(var(--primary-color-rgb), 0.1);\n  transition: all 0.3s ease;\n  animation: fadeInUp 0.6s ease-out forwards;\n  opacity: 0;\n  transform: translateY(30px);\n  border: 2px solid transparent;\n}\n\n.value-card:hover {\n  transform: translateY(-8px);\n  border-color: var(--primary-color);\n  /* Value card glow enhancement */\n  box-shadow: \n    0 12px 30px rgba(0, 0, 0, 0.15),\n    0 0 40px rgba(var(--primary-color-rgb), 0.4);\n}\n\n.value-icon {\n  font-size: 2.5rem;\n  margin-bottom: 1rem;\n  /* Icon glow effect */\n  filter: drop-shadow(0 0 10px rgba(var(--primary-color-rgb), 0.3));\n}\n\n.value-name {\n  font-size: 1.2rem;\n  color: var(--primary-color);\n  margin-bottom: 1rem;\n  font-weight: 600;\n  /* Value name glow */\n  text-shadow: 0 0 8px rgba(var(--primary-color-rgb), 0.3);\n}\n\n.value-description {\n  color: var(--font-secondary-color);\n  line-height: 1.6;\n  font-size: 0.95rem;\n}\n\n/* Interests Section - COMPACTO */\n.interests-section {\n  margin-bottom: 3rem; /* Reducido de 4rem */\n  text-align: center;\n}\n\n.interests-container {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 1.5rem;\n  justify-content: center;\n  margin-top: 3rem;\n}\n\n.interest-tag {\n  background: var(--tertiary-background-color);\n  color: var(--font-primary-color);\n  padding: 1rem 1.8rem;\n  border-radius: 50px;\n  font-size: 1rem;\n  font-weight: 500;\n  border: 2px solid var(--primary-color-shade);\n  transition: all 0.4s ease;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 0.8rem;\n  animation: bounceIn 0.6s ease-out forwards;\n  opacity: 0;\n  transform: scale(0.8);\n  /* Interest tag glow */\n  box-shadow: \n    0 4px 15px rgba(0, 0, 0, 0.1),\n    0 0 15px rgba(var(--primary-color-rgb), 0.1);\n}\n\n.interest-tag:hover {\n  background: var(--primary-color);\n  color: var(--primary-color-contrast);\n  transform: translateY(-3px) scale(1.05);\n  /* Interest tag hover glow */\n  box-shadow: \n    0 8px 20px rgba(0, 0, 0, 0.15),\n    0 0 30px rgba(var(--primary-color-rgb), 0.6);\n}\n\n.interest-icon {\n  font-size: 1.2rem;\n  /* Icon glow */\n  filter: drop-shadow(0 0 5px rgba(var(--primary-color-rgb), 0.3));\n}\n\n/* Animations */\n@keyframes slideInUp {\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@keyframes fadeInUp {\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@keyframes bounceIn {\n  0% {\n    opacity: 0;\n    transform: scale(0.3);\n  }\n  50% {\n    opacity: 1;\n    transform: scale(1.05);\n  }\n  70% {\n    transform: scale(0.9);\n  }\n  100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n\n/* Pulsing glow animation for enhanced effects */\n@keyframes pulseGlow {\n  0% {\n    box-shadow: \n      0 0 20px rgba(var(--primary-color-rgb), 0.3),\n      0 0 40px rgba(var(--primary-color-rgb), 0.1);\n  }\n  50% {\n    box-shadow: \n      0 0 30px rgba(var(--primary-color-rgb), 0.5),\n      0 0 60px rgba(var(--primary-color-rgb), 0.2);\n  }\n  100% {\n    box-shadow: \n      0 0 20px rgba(var(--primary-color-rgb), 0.3),\n      0 0 40px rgba(var(--primary-color-rgb), 0.1);\n  }\n}\n\n/* Add pulsing glow to specific elements */\n.profile-ring {\n  animation: rotateRing 4s linear infinite, pulseGlow 3s ease-in-out infinite;\n}\n\n/* Responsive Design - COMPACTO */\n@media (max-width: 1200px) {\n  .technical-skills-container {\n    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  }\n}\n\n@media (max-width: 968px) {\n  .hero-stats {\n    gap: 1.5rem;\n  }\n  \n  .technical-skills-container {\n    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  }\n}\n\n@media (max-width: 768px) {\n  .hero-section {\n    padding: 2.5rem 2rem; /* Ajustado */\n    padding-top: 3rem; /* Ajustado */\n    margin-bottom: 2.5rem; /* Ajustado */\n    min-height: 80vh; /* Ajustado */\n    /* Mantener el ancho completo en mobile */\n    width: 100vw;\n    margin-left: calc(-50vw + 50%);\n    margin-right: calc(-50vw + 50%);\n  }\n  \n  .hero-text h1 {\n    font-size: 3rem; /* Ajustado de 3.5rem */\n  }\n  \n  .role-title {\n    font-size: 2rem; /* Ajustado de 2.2rem */\n  }\n  \n  .hero-description {\n    font-size: 1.2rem; /* Ajustado de 1.3rem */\n    margin-bottom: 1.8rem; /* Ajustado */\n  }\n  \n  .profile-image {\n    width: 200px; /* Ajustado de 220px */\n    height: 200px; /* Ajustado de 220px */\n  }\n  \n  .profile-container {\n    margin-bottom: 2rem; /* Ajustado */\n  }\n  \n  .roles-container {\n    height: 60px; /* Ajustado de 65px */\n    margin-bottom: 1.5rem; /* Ajustado */\n  }\n  \n  .stat-item {\n    padding: 0.9rem; /* Ajustado */\n  }\n  \n  .stat-number {\n    font-size: 2rem; /* Ajustado */\n  }\n  \n  .section-title {\n    font-size: 2.2rem; /* Ajustado */\n  }\n}\n\n@media (max-width: 480px) {\n  .hero-section {\n    padding: 2rem 1.5rem; /* Ajustado */\n    padding-top: 2.5rem; /* Ajustado */\n    margin-bottom: 2rem; /* Ajustado */\n    min-height: 70vh; /* Ajustado */\n    /* Mantener el ancho completo en mobile */\n    width: 100vw;\n    margin-left: calc(-50vw + 50%);\n    margin-right: calc(-50vw + 50%);\n  }\n  \n  .hero-text h1 {\n    font-size: 2.5rem; /* Ajustado de 2.8rem */\n  }\n  \n  .profile-image {\n    width: 160px; /* Ajustado de 180px */\n    height: 160px; /* Ajustado de 180px */\n  }\n  \n  .profile-container {\n    margin-bottom: 1.8rem; /* Ajustado */\n  }\n  \n  .roles-container {\n    height: 50px; /* Ajustado de 55px */\n    margin-bottom: 1.3rem; /* Ajustado */\n  }\n  \n  .role-title {\n    font-size: 1.6rem; /* Ajustado de 1.8rem */\n  }\n  \n  .hero-description {\n    font-size: 1.1rem; /* Ajustado de 1.2rem */\n    margin-bottom: 1.5rem; /* Ajustado */\n    line-height: 1.6; /* Ajustado */\n  }\n  \n  .hero-stats {\n    gap: 1rem; /* Ajustado */\n    margin-bottom: 1rem; /* Ajustado */\n  }\n  \n  .stat-item {\n    padding: 0.8rem; /* Ajustado */\n  }\n  \n  .stat-number {\n    font-size: 1.8rem; /* Ajustado */\n    margin-bottom: 0.3rem; /* Ajustado */\n  }\n  \n  .stat-label {\n    font-size: 0.85rem; /* Ajustado */\n  }\n  \n  .cta-buttons {\n    gap: 1.3rem; /* Ajustado */\n  }\n}\n\n@media (max-width: 360px) {\n  .hero-section {\n    padding: 1.8rem 1rem; /* Ajustado */\n    padding-top: 2.2rem; /* Ajustado */\n    margin-bottom: 1.8rem; /* Ajustado */\n    min-height: 65vh; /* Ajustado */\n    /* Mantener el ancho completo en mobile */\n    width: 100vw;\n    margin-left: calc(-50vw + 50%);\n    margin-right: calc(-50vw + 50%);\n  }\n  \n  .hero-text h1 {\n    font-size: 2rem; /* Ajustado de 2.2rem */\n  }\n  \n  .profile-image {\n    width: 130px; /* Ajustado de 140px */\n    height: 130px; /* Ajustado de 140px */\n  }\n  \n  .profile-container {\n    margin-bottom: 1.5rem; /* Ajustado */\n  }\n  \n  .profile-ring {\n    top: -18px; /* Ajustado para la nueva imagen */\n    left: -18px; /* Ajustado para la nueva imagen */\n    right: -18px; /* Ajustado para la nueva imagen */\n    bottom: -18px; /* Ajustado para la nueva imagen */\n  }\n  \n  .roles-container {\n    height: 42px; /* Ajustado de 45px */\n    margin-bottom: 1.1rem; /* Ajustado */\n  }\n  \n  .role-title {\n    font-size: 1.3rem; /* Ajustado de 1.5rem */\n  }\n  \n  .hero-description {\n    font-size: 1rem; /* Ajustado de 1.1rem */\n    margin-bottom: 1.3rem; /* Ajustado */\n    line-height: 1.5; /* Ajustado */\n  }\n  \n  .hero-stats {\n    flex-direction: column;\n    gap: 0.9rem; /* Ajustado */\n    margin-bottom: 0.9rem; /* Ajustado */\n  }\n  \n  .stat-item {\n    padding: 0.7rem; /* Ajustado */\n  }\n  \n  .stat-number {\n    font-size: 1.6rem; /* Ajustado */\n    margin-bottom: 0.3rem; /* Ajustado */\n  }\n  \n  .stat-label {\n    font-size: 0.8rem; /* Ajustado */\n  }\n}\n\n/* Nueva sección Journey & Experiences */\n.journey-container {\n  display: grid;\n  grid-template-columns: 55% 45%;\n  gap: 32px;\n  margin-top: 24px;\n}\n\n.carousel-section {\n  width: 100%;\n}\n\n/* Footer del carrusel con estadísticas */\n.carousel-footer {\n  margin-top: 24px;\n  padding: 20px;\n  background: var(--background-color);\n  border-radius: var(--border-radius-slice);\n  border: var(--slice-border) solid var(--border-color);\n}\n\n.stats-container {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 16px;\n}\n\n.stat-item {\n  text-align: center;\n  padding: 16px 8px;\n  transition: all 0.3s ease;\n}\n\n.stat-item:hover {\n  transform: translateY(-2px);\n}\n\n.stat-number {\n  font-size: 1.8rem;\n  font-weight: 700;\n  color: var(--primary-color);\n  margin-bottom: 8px;\n  line-height: 1;\n}\n\n.stat-label {\n  font-size: 0.85rem;\n  color: var(--font-secondary-color);\n  font-weight: 500;\n  line-height: 1.3;\n}\n\n.text-section {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n  padding: 24px;\n  background: var(--secondary-background-color);\n  border-radius: var(--border-radius-slice);\n  border: var(--slice-border) solid var(--primary-color-shade);\n}\n\n.personal-title {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: var(--primary-color);\n  margin: 0 0 16px 0;\n  line-height: 1.3;\n}\n\n.personal-description {\n  font-size: 1rem;\n  line-height: 1.6;\n  color: var(--font-secondary-color);\n  margin: 0 0 24px 0;\n}\n\n.personal-description strong {\n  color: var(--primary-color);\n  font-weight: 600;\n}\n\n.highlights-list {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n\n.highlight-item {\n  display: flex;\n  align-items: flex-start;\n  gap: 16px;\n  padding: 16px;\n  background: var(--background-color);\n  border-radius: var(--border-radius-slice);\n  border: var(--slice-border) solid var(--border-color);\n  transition: all 0.3s ease;\n}\n\n.highlight-item:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 24px rgba(var(--primary-color-rgb), 0.15);\n  border-color: var(--primary-color);\n}\n\n.highlight-icon {\n  font-size: 1.5rem;\n  flex-shrink: 0;\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--primary-color);\n  color: var(--primary-color-contrast);\n  border-radius: 50%;\n}\n\n.highlight-content {\n  flex: 1;\n}\n\n.highlight-title {\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: var(--font-primary-color);\n  margin: 0 0 8px 0;\n  line-height: 1.3;\n}\n\n.highlight-description {\n  font-size: 0.9rem;\n  line-height: 1.5;\n  color: var(--font-secondary-color);\n  margin: 0;\n}\n\n/* Responsive para la nueva sección */\n@media (max-width: 1024px) {\n  .journey-container {\n    grid-template-columns: 50% 50%;\n    gap: 24px;\n  }\n  \n  .carousel-footer {\n    margin-top: 20px;\n    padding: 18px;\n  }\n  \n  .stats-container {\n    gap: 14px;\n  }\n  \n  .stat-number {\n    font-size: 1.6rem;\n  }\n  \n  .stat-label {\n    font-size: 0.8rem;\n  }\n  \n  .text-section {\n    padding: 20px;\n    gap: 20px;\n  }\n  \n  .personal-title {\n    font-size: 1.4rem;\n  }\n  \n  .highlight-item {\n    padding: 14px;\n    gap: 14px;\n  }\n  \n  .highlight-icon {\n    width: 36px;\n    height: 36px;\n    font-size: 1.3rem;\n  }\n}\n\n@media (max-width: 768px) {\n  .journey-container {\n    grid-template-columns: 1fr;\n    gap: 24px;\n  }\n  \n  .carousel-section {\n    order: 1;\n    min-width: 0; /* Prevents grid item from expanding beyond viewport */\n    max-width: 100%;\n  }\n  \n  .carousel-footer {\n    margin-top: 20px;\n    padding: 16px;\n    max-width: 100%;\n    overflow: hidden; /* Contains the scrollable area */\n  }\n  \n  .stats-container {\n    display: flex;\n    overflow-x: auto;\n    gap: 16px;\n    padding-bottom: 12px;\n    width: 100%;\n    scroll-snap-type: x mandatory;\n    scrollbar-width: thin;\n    -webkit-overflow-scrolling: touch;\n  }\n  \n  .stat-item {\n    flex: 0 0 140px;\n    scroll-snap-align: start;\n    padding: 20px 16px;\n    border: 1px solid var(--border-color);\n    border-radius: var(--border-radius-slice);\n    background: var(--background-color);\n  }\n  \n  .stat-number {\n    font-size: 1.7rem;\n  }\n  \n  .stat-label {\n    font-size: 0.85rem;\n  }\n  \n  .text-section {\n    order: 2;\n    padding: 20px;\n  }\n  \n  .personal-title {\n    font-size: 1.3rem;\n    margin-bottom: 14px;\n  }\n  \n  .personal-description {\n    font-size: 0.95rem;\n    margin-bottom: 20px;\n  }\n  \n  .highlights-list {\n    gap: 16px;\n  }\n  \n  .highlight-item {\n    padding: 16px;\n    gap: 14px;\n  }\n  \n  .highlight-title {\n    font-size: 1rem;\n  }\n  \n  .highlight-description {\n    font-size: 0.85rem;\n  }\n}\n\n@media (max-width: 480px) {\n  .journey-container {\n    gap: 20px;\n    margin-top: 20px;\n  }\n  \n  .carousel-footer {\n    margin-top: 16px;\n    padding: 14px;\n  }\n  \n  .stats-container {\n    gap: 12px;\n    padding-bottom: 8px;\n  }\n  \n  .stat-item {\n    flex: 0 0 120px;\n    padding: 16px 12px;\n  }\n  \n  .stat-number {\n    font-size: 1.5rem;\n  }\n  \n  .stat-label {\n    font-size: 0.8rem;\n  }\n  \n  .text-section {\n    padding: 16px;\n    gap: 16px;\n  }\n  \n  .personal-title {\n    font-size: 1.2rem;\n    margin-bottom: 12px;\n  }\n  \n  .personal-description {\n    font-size: 0.9rem;\n    margin-bottom: 16px;\n  }\n  \n  .highlights-list {\n    gap: 14px;\n  }\n  \n  .highlight-item {\n    padding: 14px;\n    gap: 12px;\n  }\n  \n  .highlight-icon {\n    width: 32px;\n    height: 32px;\n    font-size: 1.2rem;\n  }\n  \n  .highlight-title {\n    font-size: 0.95rem;\n  }\n  \n  .highlight-description {\n    font-size: 0.8rem;\n  }\n}",
  size: 36825,
  class: SliceComponent_AboutSection
},
"Grid": {
  name: "Grid",
  category: "Visual",
  categoryType: "Visual",
  componentDependencies: [],
  html: "<div class=\"grid-container\"></div>\n",
  css: ".grid-container {\n  display: grid;\n  grid-template-columns: repeat(1, 1fr);\n  grid-template-rows: repeat(1, 1fr);\n  gap: 10px;\n  margin: 0 auto;\n}\n\n.grid-item {\n  /* Estilos base que pueden ser sobrescritos por JavaScript */\n  width: 100%;\n  height: 100%;\n}\n",
  size: 2683,
  class: SliceComponent_Grid
},
"Card": {
  name: "Card",
  category: "Visual",
  categoryType: "Visual",
  componentDependencies: ["Icon","Button"],
  html: "  <div class=\"card-overlay\"></div>\n  <div class=\"card-media\">\n    <div class=\"card-media-content\"></div>\n    <div class=\"card-badge\"></div>\n  </div>\n  <div class=\"card-content\">\n    <div class=\"card-header\">\n      <h3 class=\"card-title\"></h3>\n      <button class=\"card-toggle\" aria-label=\"Toggle card details\">\n        <slice-icon name=\"chevronDown\" iconStyle=\"outline\"></slice-icon>\n      </button>\n    </div>\n    <div class=\"card-body\">\n      <p class=\"card-text\"></p>\n      <div class=\"card-text-tooltip\"></div>\n    </div>\n    <div class=\"card-details\">\n      <div class=\"card-details-content\"></div>\n    </div>\n  </div>\n  <div class=\"card-actions\"></div>\n  <div class=\"card-progress\"></div>\n",
  css: "/* Modern Card Component - Compact & Scrollable */\nslice-card, .slice-card {\n  /* Host Defaults */\n  display: flex !important; /* Force flex to prevent inline collapse */\n  flex-direction: column;\n  box-sizing: border-box;\n  \n  /* CSS Variables for Dimensions with defaults */\n  --card-height: 280px; \n  --card-width: 100%;\n  --card-max-width: 280px;\n  \n  /* CSS Variables for Theme */\n  --card-bg: var(--secondary-background-color);\n  --card-text: var(--font-primary-color);\n  --card-text-secondary: var(--font-secondary-color);\n  --card-border-color: var(--primary-color-shade);\n  --card-accent: var(--primary-color);\n  --card-radius: calc(var(--border-radius-slice) * 3);\n  --card-shadow: 0 8px 32px rgba(var(--primary-color-rgb), 0.12);\n  --card-shadow-hover: 0 16px 48px rgba(var(--primary-color-rgb), 0.24);\n  \n  position: relative;\n  \n  /* Use the variables */\n  height: var(--card-height);\n  width: var(--card-width);\n  max-width: var(--card-max-width);\n  \n  background: var(--card-bg);\n  border-radius: var(--card-radius);\n  border: var(--slice-border) solid var(--card-border-color);\n  font-family: var(--font-family);\n  cursor: pointer;\n  overflow: hidden;\n  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  box-shadow: var(--card-shadow);\n  transform-origin: center bottom;\n}\n\n/* Card Variants (Applied as classes to the host) */\nslice-card.card-elevated, .slice-card.card-elevated {\n  box-shadow: var(--card-shadow-hover);\n  transform: translateY(-4px);\n  border: none;\n}\n\nslice-card.card-outlined, .slice-card.card-outlined {\n  border: calc(var(--slice-border) * 2) solid var(--card-accent);\n  background: transparent;\n}\n\nslice-card.card-minimal, .slice-card.card-minimal {\n  border: none;\n  box-shadow: none;\n  background: transparent;\n}\n\n/* Hover Effects - Reduced elevation to prevent scrollbar */\nslice-card:hover, .slice-card:hover {\n  transform: translateY(-4px) scale(1.01);\n  box-shadow: var(--card-shadow-hover);\n  border-color: var(--card-accent);\n}\n\nslice-card:active, .slice-card:active {\n  transform: translateY(-4px) scale(1.01);\n  transition: all 0.1s ease;\n}\n\n/* Card Overlay for interactive effects */\n.card-overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: linear-gradient(\n    135deg,\n    transparent 0%,\n    rgba(var(--primary-color-rgb), 0.05) 50%,\n    transparent 100%\n  );\n  opacity: 0;\n  transition: opacity 0.3s ease;\n  pointer-events: none;\n  z-index: 1;\n}\n\nslice-card:hover .card-overlay, .slice-card:hover .card-overlay {\n  opacity: 1;\n}\n\n/* Media Section - Reduced for better text space */\n.card-media {\n  position: relative;\n  height: 40%;\n  flex-basis: 40%; /* More robust for flex items */\n  flex-grow: 0;\n  flex-shrink: 0;\n  width: 100%; /* Ensure full width */\n  \n  background: var(--card-accent);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n  z-index: 2;\n}\n\n.card-media-content {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.4s ease;\n}\n\nslice-card:hover .card-media-content, .slice-card:hover .card-media-content {\n  transform: scale(1.05);\n}\n\n.card-media .card-image {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transition: all 0.4s ease;\n}\n\n.card-media:empty {\n  display: none;\n}\n\n/* Badge in media section */\n.card-badge {\n  position: absolute;\n  top: 12px;\n  right: 12px;\n  background: var(--card-accent);\n  color: var(--primary-color-contrast);\n  padding: 4px 8px;\n  border-radius: calc(var(--border-radius-slice) * 2);\n  font-size: 0.75rem;\n  font-weight: 600;\n  opacity: 0;\n  transform: translateY(-20px);\n  transition: all 0.3s ease;\n  z-index: 3;\n}\n\n.card-badge:not(:empty) {\n  opacity: 1;\n  transform: translateY(0);\n}\n\n/* Content Section - Compact with scroll */\n.card-content {\n  position: relative;\n  height: 60%;\n  padding: 16px;\n  background: var(--card-bg);\n  z-index: 3;\n  display: flex;\n  flex-direction: column;\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n\n.card-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 12px;\n  gap: 12px;\n}\n\n.card-title {\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: var(--card-text);\n  line-height: 1.3;\n  flex: 1;\n  transition: color 0.3s ease;\n}\n\n.slice-card:hover .card-title {\n  color: var(--card-accent);\n}\n\n/* Toggle Button for isOpen functionality */\n.card-toggle {\n  background: none;\n  border: none;\n  padding: 4px;\n  cursor: pointer;\n  border-radius: var(--border-radius-slice);\n  transition: all 0.3s ease;\n  color: var(--card-text-secondary);\n  flex-shrink: 0;\n}\n\n.card-toggle:hover {\n  background: rgba(var(--primary-color-rgb), 0.1);\n  color: var(--card-accent);\n  transform: scale(1.1);\n}\n\n.card-toggle slice-icon {\n  transition: transform 0.3s ease;\n}\n\n.slice-card.is-open .card-toggle slice-icon {\n  transform: rotate(180deg);\n}\n\n/* Card Body - Compact with scroll support */\n.card-body {\n  flex: 1;\n  margin-bottom: 8px;\n  position: relative;\n  overflow-y: auto;\n  max-height: 160px; /* Aumentado de 120px a 160px para 4 líneas */\n}\n\n.card-text {\n  margin: 0;\n  font-size: 0.9rem;\n  line-height: 1.5;\n  color: var(--card-text-secondary);\n  transition: all 0.3s ease;\n  cursor: pointer;\n  word-wrap: break-word;\n  overflow-wrap: break-word;\n}\n\n.card-text:hover {\n  color: var(--card-text);\n}\n\n/* Custom scrollbar for content sections */\n.card-content::-webkit-scrollbar,\n.card-body::-webkit-scrollbar {\n  width: 4px;\n}\n\n.card-content::-webkit-scrollbar-track,\n.card-body::-webkit-scrollbar-track {\n  background: transparent;\n}\n\n.card-content::-webkit-scrollbar-thumb,\n.card-body::-webkit-scrollbar-thumb {\n  background: var(--card-border);\n  border-radius: 2px;\n}\n\n.card-content::-webkit-scrollbar-thumb:hover,\n.card-body::-webkit-scrollbar-thumb:hover {\n  background: var(--card-accent);\n}\n\n/* Text Expansion Tooltip - Simplified for scroll design */\n.card-text-tooltip {\n  display: none; /* Disabled since we have scroll now */\n}\n\n/* Expandable Details Section */\n.card-details {\n  max-height: 0;\n  overflow: hidden;\n  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n  opacity: 0;\n  transform: translateY(-10px);\n}\n\n.slice-card.is-open .card-details {\n  max-height: 200px;\n  opacity: 1;\n  transform: translateY(0);\n  margin-top: 16px;\n  padding-top: 16px;\n  border-top: var(--slice-border) solid var(--card-border);\n}\n\n.card-details-content {\n  font-size: 0.9rem;\n  line-height: 1.5;\n  color: var(--card-text-secondary);\n}\n\n/* Actions Section */\n.card-actions {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  display: flex;\n  gap: 8px;\n  padding: 16px 20px;\n  background: var(--card-bg);\n  border-top: var(--slice-border) solid var(--card-border);\n  z-index: 4;\n  transform: translateY(100%);\n  transition: transform 0.3s ease;\n}\n\n.slice-card:hover .card-actions:not(:empty) {\n  transform: translateY(0);\n}\n\n.card-actions:empty {\n  display: none;\n}\n\n/* Progress Bar */\n.card-progress {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  height: 3px;\n  background: var(--card-accent);\n  border-radius: 0 0 var(--card-radius) var(--card-radius);\n  transform: scaleX(0);\n  transform-origin: left;\n  transition: transform 0.3s ease;\n  z-index: 5;\n}\n\n.card-progress[data-progress] {\n  transform: scaleX(calc(var(--progress, 0) / 100));\n}\n\n/* Interactive States */\n.slice-card.interactive {\n  user-select: none;\n}\n\n.slice-card.loading {\n  pointer-events: none;\n  opacity: 0.7;\n}\n\n.slice-card.loading .card-media::after {\n  content: '';\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 32px;\n  height: 32px;\n  margin: -16px 0 0 -16px;\n  border: 3px solid rgba(255, 255, 255, 0.3);\n  border-radius: 50%;\n  border-top-color: var(--primary-color-contrast);\n  animation: cardSpin 1s linear infinite;\n}\n\n@keyframes cardSpin {\n  to { transform: rotate(360deg); }\n}\n\n/* Custom Color Support */\n.slice-card[style*=\"--custom-accent\"] {\n  --card-accent: var(--custom-accent);\n}\n\n.slice-card[style*=\"--custom-bg\"] {\n  --card-bg: var(--custom-bg);\n}\n\n.slice-card[style*=\"--custom-text\"] {\n  --card-text: var(--custom-text);\n}\n\n/* Responsive Design - Compact Cards */\n@media (max-width: 1024px) {\n  .slice-card {\n    --card-max-width: 260px;\n    --card-height: 260px; /* Ajustado de 220px a 260px */\n  }\n  \n  .card-body {\n    max-height: 140px; /* Ajustado de 100px a 140px */\n  }\n}\n\n@media (max-width: 768px) {\n  .slice-card {\n    --card-max-width: 100%;\n    --card-height: 240px; /* Ajustado de 200px a 240px */\n    margin: 0 6px;\n  }\n  \n  .card-content {\n    padding: 12px;\n  }\n  \n  .card-title {\n    font-size: 1rem;\n  }\n  \n  .card-text {\n    font-size: 0.85rem;\n  }\n  \n  .card-body {\n    max-height: 120px; /* Ajustado de 80px a 120px */\n    margin-bottom: 6px;\n  }\n  \n  .card-actions {\n    padding: 8px 12px;\n    gap: 4px;\n  }\n}\n\n@media (max-width: 480px) {\n  .slice-card {\n    --card-height: 220px; /* Ajustado de 180px a 220px */\n    margin: 0 4px;\n  }\n  \n  .card-content {\n    padding: 10px;\n  }\n  \n  .card-title {\n    font-size: 0.95rem;\n  }\n  \n  .card-text {\n    font-size: 0.8rem;\n  }\n  \n  .card-body {\n    max-height: 100px; /* Ajustado de 60px a 100px */\n  }\n  \n  .card-header {\n    gap: 6px;\n    margin-bottom: 6px;\n  }\n}\n\n/* Dark mode support */\n@media (prefers-color-scheme: dark) {\n  .slice-card {\n    --card-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);\n    --card-shadow-hover: 0 16px 48px rgba(0, 0, 0, 0.4);\n  }\n}\n\n/* Accessibility */\n@media (prefers-reduced-motion: reduce) {\n  .slice-card,\n  .slice-card *,\n  .slice-card::before,\n  .slice-card::after {\n    animation-duration: 0.01ms !important;\n    animation-iteration-count: 1 !important;\n    transition-duration: 0.01ms !important;\n  }\n}\n\n/* Focus states for accessibility */\n.slice-card:focus-visible {\n  outline: 2px solid var(--card-accent);\n  outline-offset: 2px;\n}\n\n.card-toggle:focus-visible {\n  outline: 2px solid var(--card-accent);\n  outline-offset: 2px;\n  border-radius: var(--border-radius-slice);\n}\n\n/* High contrast mode support */\n@media (prefers-contrast: high) {\n  .slice-card {\n    border-width: calc(var(--slice-border) * 2);\n  }\n  \n  .card-toggle {\n    border: var(--slice-border) solid var(--card-text);\n  }\n}",
  size: 26864,
  class: SliceComponent_Card
},
"TechExpertise": {
  name: "TechExpertise",
  category: "AtomicAppComponents",
  categoryType: "Visual",
  componentDependencies: ["BadgeCarousel"],
  html: "<section class=\"modern-tech-expertise\">\n  <div class=\"expertise-header\">\n    <h2 class=\"expertise-title\"></h2>\n    <p class=\"expertise-subtitle\"></p>\n  </div>\n    \n  <div class=\"expertise-content\">\n    <!-- Los carruseles individuales se agregarán dinámicamente aquí -->\n  </div>\n</section>",
  css: "/* Componente principal */\nslice-techexpertise {\n  display: block;\n  width: 100%;\n  margin: 1.5rem 0;\n\n  background: linear-gradient(135deg, \n    var(--primary-background-color) 0%, \n    var(--secondary-background-color) 50%, \n    var(--tertiary-background-color) 100%);\n}\n\n\n.modern-tech-expertise {\n  width: 100%;\n  max-width: 1400px;\n  margin: 0 auto;\n}\n\n/* Estilo para ocupar 100% del ancho como hero-section */\nslice-techexpertise {\n  position: relative;\n  /* Hacer que ocupe toda la altura horizontal */\n  width: 100vw;\n  margin-left: calc(-50vw + 50%);\n  margin-right: calc(-50vw + 50%);\n  /* Remover border-radius y border para que ocupe todo el ancho */\n  border-radius: 0;\n  border: none;\n  overflow: hidden;\n}\n\n/* Header de la sección */\n.expertise-header {\n  padding-top: 1rem;\n  text-align: center;\n  margin-bottom: 0.5rem;\n}\n\n.expertise-title {\n  font-size: 2.5rem;\n  font-weight: 800;\n  color: var(--primary-color);\n  margin-bottom: 0.8rem;\n  text-shadow: \n    0 0 20px rgba(var(--primary-color-rgb), 0.3),\n    0 0 40px rgba(var(--primary-color-rgb), 0.2);\n  opacity: 0;\n  transform: translateY(-30px);\n}\n\n.expertise-subtitle {\n  font-size: 1.1rem;\n  color: var(--font-secondary-color);\n  max-width: 600px;\n  margin: 0 auto;\n  line-height: 1.5;\n  opacity: 0;\n  transform: translateY(30px);\n}\n\n/* Contenido principal */\n.expertise-content {\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n}\n\n/* Animaciones */\n@keyframes fadeInDown {\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@keyframes fadeInUp {\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@keyframes slideInUp {\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n/* Responsive Design */\n@media (max-width: 992px) {\n  .modern-tech-expertise {\n    padding: 1.5rem;\n  }\n  \n  .expertise-title {\n    font-size: 2.2rem;\n  }\n}\n\n@media (max-width: 768px) {\n  .expertise-title {\n    font-size: 2rem;\n  }\n  \n  .expertise-subtitle {\n    font-size: 1rem;\n  }\n}\n\n@media (max-width: 480px) {\n  .modern-tech-expertise {\n    padding: 1.2rem;\n  }\n  \n  .expertise-title {\n    font-size: 1.8rem;\n  }\n}\n\n/* Carruseles individuales centrados */\n.individual-carousels {\n  display: flex;\n  flex-direction: column;\n  gap: 2rem; /* Espaciado uniforme entre carruseles */\n  align-items: center; /* Centrar todos los carruseles */\n}\n\n.individual-carousels-title {\n  text-align: center;\n  font-size: 1.5rem;\n  margin-bottom: 2rem;\n  color: var(--primary-color);\n  text-shadow: \n    0 0 15px rgba(var(--primary-color-rgb), 0.3),\n    0 0 30px rgba(var(--primary-color-rgb), 0.2);\n}\n\n/* Responsive para carruseles individuales */\n@media (max-width: 768px) {\n  .individual-carousels-title {\n    font-size: 1.4rem;\n    margin-bottom: 1.5rem;\n  }\n  \n  .individual-carousels {\n    gap: 1.5rem; /* Reducir espaciado en móviles */\n  }\n}\n",
  size: 7406,
  class: SliceComponent_TechExpertise
},
"BadgeCarousel": {
  name: "BadgeCarousel",
  category: "AtomicAppComponents",
  categoryType: "Visual",
  componentDependencies: [],
  html: "<div class=\"badge-carousel\">\n  <div class=\"carousel-header\">\n    <h3 class=\"carousel-title\"></h3>\n    <div class=\"carousel-controls\">\n      <button class=\"control-btn\" data-action=\"pause\">\n        <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n          <path d=\"M6 4h4v16H6V4zm8 0h4v16h-4V4z\"/>\n        </svg>\n      </button>\n      <button class=\"control-btn\" data-action=\"play\" style=\"display: none;\">\n        <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n          <path d=\"M8 5v14l11-7z\"/>\n        </svg>\n      </button>\n    </div>\n  </div>\n  \n  <div class=\"badges-marquee\">\n    <div class=\"marquee-track\"></div>\n  </div>\n</div>\n",
  css: "/* Componente principal */\nslice-badge-carousel {\n  display: block;\n  width: 100%;\n  margin: 1rem 0;\n}\n\n.badge-carousel {\n  width: 100%;\n  max-width: 1200px;\n  margin: 0 auto;\n  \n  /* Variables CSS personalizables */\n  --carousel-radius: 12px;\n  --carousel-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);\n}\n\n/* Header del carrusel */\n.carousel-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1.5rem;\n}\n\n.carousel-title {\n  font-size: 1.4rem;\n  font-weight: 700;\n  color: var(--font-primary-color);\n  margin: 0;\n  opacity: 0;\n  transform: translateY(-20px);\n}\n\n.carousel-controls {\n  display: flex;\n  gap: 0.5rem;\n}\n\n.control-btn {\n  background: var(--tertiary-background-color);\n  color: var(--font-primary-color);\n  border: 1px solid var(--primary-color-shade);\n  width: 32px;\n  height: 32px;\n  border-radius: 6px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n\n.control-btn:hover {\n  background: var(--carousel-primary);\n  color: var(--primary-color-contrast);\n  transform: translateY(-2px);\n  box-shadow: \n    0 4px 12px rgba(var(--primary-color-rgb), 0.3),\n    0 0 20px rgba(var(--primary-color-rgb), 0.2);\n}\n\n.control-btn svg {\n  width: 12px;\n  height: 12px;\n}\n\n/* Marquee de badges */\n.badges-marquee {\n  overflow: hidden;\n  position: relative;\n  border-radius: var(--carousel-radius);\n  background: var(--primary-background-color);\n  padding: 0.8rem 0;\n  box-shadow: var(--carousel-shadow);\n}\n\n.marquee-track {\n  display: flex;\n  gap: 0.8rem;\n  width: max-content;\n  will-change: transform;\n}\n\n.skill-badge {\n  background: var(--carousel-primary);\n  color: var(--primary-color-contrast);\n  padding: 0.5rem 1rem;\n  border-radius: 18px;\n  font-size: 0.85rem;\n  font-weight: 500;\n  white-space: nowrap;\n  border: 1px solid var(--carousel-primary);\n  transition: all 0.3s ease;\n  cursor: default;\n  position: relative;\n  overflow: hidden;\n  opacity: 0;\n  transform: translateY(30px);\n}\n\n.skill-badge::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: -100%;\n  width: 100%;\n  height: 100%;\n  background: linear-gradient(90deg, \n    transparent, \n    rgba(255, 255, 255, 0.2), \n    transparent);\n  transition: left 0.5s ease;\n}\n\n.skill-badge:hover {\n  background: var(--carousel-accent);\n  color: var(--primary-color-contrast);\n  transform: translateY(-2px) scale(1.03);\n  box-shadow: \n    0 6px 15px rgba(var(--primary-color-rgb), 0.3),\n    0 0 20px rgba(var(--primary-color-rgb), 0.2);\n}\n\n.skill-badge:hover::before {\n  left: 100%;\n}\n\n/* Animaciones */\n@keyframes fadeInDown {\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@keyframes slideInUp {\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@keyframes marquee {\n  0% {\n    transform: translateX(0%);\n  }\n  100% {\n    transform: translateX(-25%);\n  }\n}\n\n/* Estados pausados */\n.marquee-track.paused {\n  animation-play-state: paused;\n}\n\n/* Responsive Design */\n@media (max-width: 1200px) {\n  .badge-carousel {\n    padding: 0.8rem;\n  }\n  \n  .carousel-title {\n    font-size: 1.3rem;\n  }\n}\n\n@media (max-width: 992px) {\n  .carousel-title {\n    font-size: 1.2rem;\n  }\n  \n  .skill-badge {\n    padding: 0.4rem 0.8rem;\n    font-size: 0.8rem;\n  }\n}\n\n@media (max-width: 768px) {\n  .badge-carousel {\n    padding: 0.6rem;\n  }\n  \n  .carousel-header {\n    flex-direction: column;\n    gap: 0.8rem;\n    text-align: center;\n  }\n  \n  .carousel-title {\n    font-size: 1.2rem;\n  }\n  \n  .control-btn {\n    width: 28px;\n    height: 28px;\n  }\n  \n  .control-btn svg {\n    width: 10px;\n    height: 10px;\n  }\n  \n  .skill-badge {\n    padding: 0.3rem 0.7rem;\n    font-size: 0.75rem;\n  }\n}\n\n@media (max-width: 480px) {\n  .carousel-title {\n    font-size: 1.1rem;\n  }\n  \n  .skill-badge {\n    padding: 0.25rem 0.6rem;\n    font-size: 0.7rem;\n  }\n}\n\n/* Modo oscuro y temas */\n@media (prefers-color-scheme: dark) {\n  .badges-marquee {\n    background: var(--tertiary-background-color);\n  }\n}\n\n/* Accesibilidad */\n@media (prefers-reduced-motion: reduce) {\n  .marquee-track,\n  .skill-badge {\n    transition: none;\n    animation: none;\n  }\n  \n  .marquee-track {\n    transform: none !important;\n  }\n}\n\n/* Estados de focus para navegación por teclado */\n.control-btn:focus {\n  outline: 2px solid var(--carousel-primary);\n  outline-offset: 2px;\n}\n\n/* Hover states mejorados */\n@media (hover: hover) {\n  .skill-badge:hover {\n    transform: translateY(-2px) scale(1.03);\n  }\n}\n\n@media (hover: none) {\n  .skill-badge:active {\n    transform: scale(0.98);\n  }\n}\n\n/* Variantes de color personalizadas */\n.badge-carousel.frontend-theme {\n  --carousel-primary: #3b82f6;\n  --carousel-secondary: #1d4ed8;\n  --carousel-accent: #60a5fa;\n}\n\n.badge-carousel.backend-theme {\n  --carousel-primary: #10b981;\n  --carousel-secondary: #059669;\n  --carousel-accent: #34d399;\n}\n\n.badge-carousel.database-theme {\n  --carousel-primary: #8b5cf6;\n  --carousel-secondary: #7c3aed;\n  --carousel-accent: #a78bfa;\n}\n\n.badge-carousel.devops-theme {\n  --carousel-primary: #f59e0b;\n  --carousel-secondary: #d97706;\n  --carousel-accent: #fbbf24;\n}\n\n.badge-carousel.mobile-theme {\n  --carousel-primary: #ec4899;\n  --carousel-secondary: #db2777;\n  --carousel-accent: #f472b6;\n}\n\n.badge-carousel.ai-theme {\n  --carousel-primary: #ef4444;\n  --carousel-secondary: #dc2626;\n  --carousel-accent: #f87171;\n}\n",
  size: 14151,
  class: SliceComponent_BadgeCarousel
},
"ImageCarrousel": {
  name: "ImageCarrousel",
  category: "Visual",
  categoryType: "Visual",
  componentDependencies: [],
  html: "<div class=\"carousel-container\">\n  <div class=\"carousel-slides\"></div>\n  \n  <!-- Navegación -->\n  <button class=\"carousel-prev\" aria-label=\"Previous slide\">❮</button>\n  <button class=\"carousel-next\" aria-label=\"Next slide\">❯</button>\n  \n  <!-- Indicadores -->\n  <div class=\"carousel-indicators\"></div>\n  \n  <!-- Contador de slides -->\n  <div class=\"carousel-counter\">\n    <span class=\"current-slide-number\">1</span>\n    <span class=\"counter-separator\">/</span>\n    <span class=\"total-slides\">0</span>\n  </div>\n</div>",
  css: ".carousel-container {\n  position: relative;\n  width: 100%;\n  height: 400px;\n  border-radius: var(--border-radius-slice, 12px);\n  overflow: hidden;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);\n}\n\n.carousel-slides {\n  width: 100%;\n  height: 100%;\n  position: relative;\n}\n\n.carousel-slide {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  opacity: 1;\n  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);\n  will-change: opacity;\n}\n\n.carousel-slide:not(:first-child) {\n  opacity: 0;\n}\n\n.carousel-image {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: center;\n  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);\n  will-change: transform;\n}\n\n.carousel-slide:hover .carousel-image {\n  transform: scale(1.05);\n}\n\n.carousel-overlay {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: linear-gradient(\n    to top,\n    rgba(0, 0, 0, 0.8) 0%,\n    rgba(0, 0, 0, 0.6) 50%,\n    transparent 100%\n  );\n  color: white;\n  padding: 20px;\n  transform: translateY(0);\n  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n  will-change: transform, opacity;\n}\n\n.carousel-slide:hover .carousel-overlay {\n  transform: translateY(-5px);\n}\n\n.carousel-label {\n  font-size: 1.25rem;\n  font-weight: 700;\n  margin-bottom: 8px;\n  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n.carousel-date {\n  font-size: 0.9rem;\n  opacity: 0.9;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n/* Botones de navegación */\n.carousel-prev,\n.carousel-next {\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  background: rgba(255, 255, 255, 0.9);\n  border: none;\n  border-radius: 50%;\n  width: 48px;\n  height: 48px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  z-index: 10;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n  will-change: transform, background, box-shadow;\n  font-size: 1.5rem;\n  color: var(--primary-color, #333);\n  padding-bottom: 3px;\n}\n\n.carousel-prev {\n  left: 16px;\n}\n\n.carousel-next {\n  right: 16px;\n}\n\n.carousel-prev:hover,\n.carousel-next:hover {\n  background: white;\n  transform: translateY(-50%) scale(1.1);\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);\n}\n\n.carousel-prev:active,\n.carousel-next:active {\n  transform: translateY(-50%) scale(0.95);\n  transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n/* Indicadores */\n.carousel-indicators {\n  position: absolute;\n  bottom: 80px;\n  left: 50%;\n  transform: translateX(-50%);\n  display: flex;\n  gap: 8px;\n  z-index: 10;\n}\n\n.carousel-indicator {\n  width: 12px;\n  height: 12px;\n  border-radius: 50%;\n  border: 2px solid rgba(255, 255, 255, 0.6);\n  background: transparent;\n  cursor: pointer;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  will-change: transform, background, border-color;\n  padding: 0;\n}\n\n.carousel-indicator:hover {\n  border-color: rgba(255, 255, 255, 0.9);\n  background: rgba(255, 255, 255, 0.3);\n  transform: scale(1.1);\n}\n\n.carousel-indicator.active {\n  background: white;\n  border-color: white;\n  transform: scale(1.3);\n  box-shadow: 0 2px 8px rgba(255, 255, 255, 0.4);\n}\n\n/* Contador de slides */\n.carousel-counter {\n  position: absolute;\n  top: 16px;\n  right: 16px;\n  background: rgba(0, 0, 0, 0.7);\n  color: white;\n  padding: 8px 12px;\n  border-radius: 20px;\n  font-size: 0.9rem;\n  font-weight: 600;\n  z-index: 10;\n  backdrop-filter: blur(10px);\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  will-change: transform, background;\n}\n\n.carousel-counter:hover {\n  background: rgba(0, 0, 0, 0.8);\n  transform: scale(1.05);\n}\n\n.carousel-counter .counter-separator {\n  margin: 0 4px;\n  opacity: 0.7;\n  transition: opacity 0.3s ease;\n}\n\n/* Animaciones de entrada para nuevos slides */\n.carousel-slide.fade-in {\n  animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;\n}\n\n.carousel-slide.fade-out {\n  animation: fadeOut 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;\n}\n\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: scale(1.02);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n\n@keyframes fadeOut {\n  from {\n    opacity: 1;\n    transform: scale(1);\n  }\n  to {\n    opacity: 0;\n    transform: scale(0.98);\n  }\n}\n\n/* Responsive */\n@media (max-width: 768px) {\n  .carousel-container {\n    height: 300px;\n  }\n  \n  .carousel-prev,\n  .carousel-next {\n    width: 40px;\n    height: 40px;\n  }\n  \n  .carousel-prev {\n    left: 12px;\n  }\n  \n  .carousel-next {\n    right: 12px;\n  }\n  \n  .carousel-overlay {\n    padding: 16px;\n  }\n  \n  .carousel-label {\n    font-size: 1.1rem;\n  }\n  \n  .carousel-date {\n    font-size: 0.85rem;\n  }\n  \n  .carousel-indicators {\n    bottom: 70px;\n  }\n  \n  .carousel-counter {\n    top: 12px;\n    right: 12px;\n    padding: 6px 10px;\n    font-size: 0.8rem;\n  }\n}\n\n@media (max-width: 480px) {\n  .carousel-container {\n    height: 250px;\n  }\n  \n  .carousel-prev,\n  .carousel-next {\n    width: 36px;\n    height: 36px;\n  }\n  \n  .carousel-prev,\n  .carousel-next {\n    font-size: 1.2rem;\n  }\n  \n  .carousel-overlay {\n    padding: 12px;\n  }\n  \n  .carousel-label {\n    font-size: 1rem;\n  }\n  \n  .carousel-date {\n    font-size: 0.8rem;\n  }\n  \n  .carousel-indicators {\n    bottom: 60px;\n    gap: 6px;\n  }\n  \n  .carousel-indicator {\n    width: 10px;\n    height: 10px;\n  }\n}\n",
  size: 18171,
  class: SliceComponent_ImageCarrousel
},
"RandomFacts": {
  name: "RandomFacts",
  category: "AtomicAppComponents",
  categoryType: "Visual",
  componentDependencies: [],
  html: "<div class=\"random-facts-container\">\n    <div class=\"header-container\">\n        <h2 class=\"section-title\">Random Facts</h2>\n    </div>\n    \n    <div class=\"board-wrapper\">\n        <div class=\"board\" id=\"corkboard\">\n            <div id=\"add-note-btn\" class=\"control-btn add-note-btn\" title=\"Create your own note\">\n                <span class=\"icon\">+</span>\n            </div>\n            <div id=\"trash-can\" class=\"control-zone trash-zone\" title=\"Drag notes here to remove\">\n                <span class=\"icon\">🗑️</span>\n            </div>\n        </div>\n    </div>\n</div>",
  css: ".random-facts-container {\n    width: 100%;\n    margin: 4rem auto;\n    padding: 0;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n}\n\n.header-container {\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    margin-bottom: 2rem;\n    gap: 0; /* Reduced gap */\n}\n\n.section-title {\n    /* Inherit global section-title styles if available, or define locally as fallback */\n    font-size: 2.5rem;\n    color: var(--primary-color); \n    text-align: center;\n    margin: 0;\n}\n\n.board-wrapper {\n    width: 100%;\n    padding: 1rem;\n    background: var(--primary-background-color); \n    border-radius: 12px;\n    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);\n}\n\n.board {\n    position: relative;\n    width: 100%;\n    height: 600px;\n    /* Clean thematic background instead of cork */\n    background-color: var(--tertiary-background-color); \n    border: 2px dashed var(--primary-color-shade); \n    border-radius: 8px;\n    overflow: hidden;\n    touch-action: none;\n    transition: background-color 0.3s ease;\n}\n\n.sticky-note {\n    position: absolute;\n    width: 200px;\n    min-height: 200px;\n    padding: 1.5rem;\n    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* Softer shadow */\n    cursor: grab;\n    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease, opacity 0.3s ease;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    text-align: center;\n    font-family: inherit; /* Use site font */\n    font-size: 1.1rem;\n    font-weight: 500;\n    color: var(--primary-color-contrast); /* White text usually */\n    user-select: none;\n    z-index: 1;\n    border-radius: 0.5rem; /* Rounded corners for modern look */\n}\n\n/* Visual Enhancement: Adhesive Strip */\n.sticky-note::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 15%; /* Takes top 15% */\n    background: linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 80%, rgba(255,255,255,0) 100%);\n    border-top-left-radius: 0.5rem;\n    border-top-right-radius: 0.5rem;\n    z-index: 0;\n    pointer-events: none;\n}\n\n.sticky-note.trash-hover {\n    transform: scale(0.3) !important;\n    opacity: 0.7;\n    transition: transform 0.2s ease, opacity 0.2s ease;\n}\n\n/* Specific colors for categories */\n.sticky-note.type-tech {\n    background-color: var(--primary-color);\n}\n\n.sticky-note.type-fun {\n    background-color: var(--secondary-color);\n}\n\n.sticky-note.type-personal {\n    background-color: var(--success-color);\n}\n\n.sticky-note:active {\n    cursor: grabbing;\n    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);\n    z-index: 1000 !important;\n}\n\n/* Pin becomes a functional interactive element */\n/* (Previous styles remain, adding new ones) */\n\n.control-btn {\n    position: absolute;\n    width: 50px;\n    height: 50px;\n    background: white;\n    border-radius: 50%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    box-shadow: 0 4px 6px rgba(0,0,0,0.1);\n    cursor: pointer;\n    z-index: 2000;\n    transition: transform 0.2s, background-color 0.2s;\n    font-size: 1.5rem;\n    color: var(--primary-color);\n}\n\n.add-note-btn {\n    top: 20px;\n    right: 20px;\n}\n\n.add-note-btn:hover {\n    transform: scale(1.1);\n    background: #f0f0f0;\n}\n\n.trash-zone {\n    position: absolute;\n    bottom: 20px;\n    right: 20px;\n    width: 60px;\n    height: 60px;\n    border-radius: 50%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    font-size: 2rem;\n    opacity: 0.5;\n    transition: all 0.3s ease;\n    z-index: 10;\n    border: 2px dashed transparent;\n}\n\n.trash-zone.drag-over {\n    opacity: 1;\n    transform: scale(1.2);\n    background-color: rgba(255, 0, 0, 0.1);\n    border-color: rgba(255, 0, 0, 0.3);\n}\n\n.sticky-note.user-note {\n    background-color: #fef08a !important; /* Yellow-ish */\n    color: #333;\n    font-family: 'Courier New', Courier, monospace; /* Handwriting feel */\n}\n\n.edit-note-btn {\n    position: absolute;\n    top: 8px;\n    right: 8px;\n    width: 24px;\n    height: 24px;\n    cursor: pointer;\n    opacity: 0.4;\n    transition: opacity 0.2s, transform 0.2s;\n    z-index: 10;\n    color: #444;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: rgba(255, 255, 255, 0.4);\n    border-radius: 4px;\n}\n\n.edit-note-btn:hover {\n    opacity: 1;\n    transform: scale(1.1);\n    background: rgba(255, 255, 255, 0.8);\n}\n\n/* User Editable Area */\n.sticky-note .editable-content {\n    width: 100%;\n    height: 100%;\n    outline: none;\n    cursor: text;\n    pointer-events: auto; /* allow text selection */\n    user-select: text; /* Enable selection explicitly */\n    -webkit-user-select: text;\n}\n\n.sticky-note.dragging .editable-content {\n    pointer-events: none; /* disable text selection while dragging */\n}\n\n@media (max-width: 768px) {\n    .board {\n        height: 500px;\n    }\n    .sticky-note {\n        width: 150px;\n        min-height: 150px;\n        font-size: 0.9rem;\n        padding: 1rem;\n    }\n}",
  size: 22587,
  class: SliceComponent_RandomFacts
},
"ExperienceSection": {
  name: "ExperienceSection",
  category: "AppComponents",
  categoryType: "Visual",
  componentDependencies: ["Timeline","ExperienceCard","Tabs"],
  html: "<div class=\"experience-container\">\n  <div class=\"experience-timeline\"></div>\n</div>",
  css: "slice-experience-section {\n  display: block;\n  width: 100%;\n}\n\n.experience-container {\n  max-width: 1000px;\n  margin: 0 auto;\n  padding: 2rem 0;\n}\n\n/* Filters Section */\n.experience-filters {\n  margin-bottom: 4rem; /* Increased from 3rem */\n  text-align: center;\n}\n\n.filter-title {\n  font-size: 1.5rem;\n  color: var(--primary-color);\n  margin-bottom: 1.5rem;\n  font-weight: 600;\n}\n\n.filter-buttons {\n  display: flex;\n  gap: 1rem;\n  justify-content: center;\n  flex-wrap: wrap;\n}\n\n.filter-button {\n  transition: all 0.3s ease;\n}\n\n/* Timeline Section */\n.section-title {\n  font-size: 2.5rem;\n  color: var(--primary-color);\n  text-align: center;\n  margin-bottom: 3rem;\n  font-weight: 600;\n}\n\n.timeline-container {\n  position: relative;\n  padding-left: 2rem;\n}\n\n.timeline-container::before {\n  content: '';\n  position: absolute;\n  left: 15px;\n  top: 0;\n  bottom: 0;\n  width: 2px;\n  background: linear-gradient(to bottom, var(--primary-color), var(--secondary-color));\n}\n\n/* Experience Cards */\n.experience-card {\n  position: relative;\n  margin-bottom: 4rem; /* Increased from 3rem */\n  background-color: var(--secondary-background-color);\n  border-radius: var(--border-radius-slice);\n  padding: 2rem;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  border-left: 4px solid var(--primary-color);\n  animation: slideInFromRight 0.6s ease-out forwards;\n  opacity: 0;\n  transform: translateX(50px);\n}\n\n.experience-card::before {\n  content: '';\n  position: absolute;\n  left: -2.75rem;\n  top: 2rem;\n  width: 12px;\n  height: 12px;\n  background-color: var(--primary-color);\n  border-radius: 50%;\n  border: 3px solid var(--primary-background-color);\n}\n\n/* Experience Header */\n.experience-header {\n  display: flex;\n  align-items: flex-start;\n  gap: 1.5rem;\n  margin-bottom: 1.5rem;\n}\n\n.company-logo {\n  width: 60px;\n  height: 60px;\n  object-fit: contain;\n  border-radius: var(--border-radius-slice);\n  background-color: var(--primary-background-color);\n  padding: 8px;\n  border: 2px solid var(--primary-color-shade);\n}\n\n.company-initials {\n  width: 60px;\n  height: 60px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: var(--primary-color);\n  color: var(--primary-color-contrast);\n  border-radius: var(--border-radius-slice);\n  font-weight: bold;\n  font-size: 1.2rem;\n}\n\n.basic-info {\n  flex: 1;\n}\n\n.position {\n  font-size: 1.4rem;\n  color: var(--primary-color);\n  margin: 0 0 0.5rem 0;\n  font-weight: 600;\n}\n\n.company {\n  font-size: 1.2rem;\n  color: var(--font-primary-color);\n  margin: 0 0 1rem 0;\n  font-weight: 500;\n}\n\n.meta-info {\n  display: flex;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n\n.meta-info span {\n  background-color: var(--tertiary-background-color);\n  padding: 0.3rem 0.8rem;\n  border-radius: 15px;\n  font-size: 0.85rem;\n  font-weight: 500;\n  color: var(--font-secondary-color);\n}\n\n.type {\n  background-color: var(--primary-color) !important;\n  color: var(--primary-color-contrast) !important;\n}\n\n/* Description */\n.experience-description {\n  font-size: 1.1rem;\n  line-height: 1.6;\n  color: var(--font-primary-color);\n  margin-bottom: 2rem;\n  text-align: justify;\n}\n\n/* Sections */\n.responsibilities-section,\n.achievements-section {\n  margin-bottom: 2rem;\n}\n\n.responsibilities-section h5,\n.achievements-section h5,\n.tech-section h5 {\n  font-size: 1.1rem;\n  color: var(--primary-color);\n  margin-bottom: 1rem;\n  font-weight: 600;\n}\n\n.responsibilities-list,\n.achievements-list {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n\n.responsibilities-list li,\n.achievements-list li {\n  position: relative;\n  padding-left: 1.5rem;\n  margin-bottom: 0.8rem;\n  line-height: 1.5;\n  color: var(--font-primary-color);\n}\n\n.responsibilities-list li::before,\n.achievements-list li::before {\n  content: '→';\n  position: absolute;\n  left: 0;\n  color: var(--primary-color);\n  font-weight: bold;\n}\n\n.achievements-list li::before {\n  content: '★';\n  color: var(--success-color);\n}\n\n/* Technologies */\n.tech-section {\n  margin-bottom: 1.5rem;\n}\n\n.tech-list {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n}\n\n.tech-tag {\n  background-color: var(--primary-color);\n  color: var(--primary-color-contrast);\n  padding: 0.4rem 0.8rem;\n  border-radius: 20px;\n  font-size: 0.85rem;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n\n.tech-tag:hover {\n  background-color: var(--secondary-color);\n  color: var(--secondary-color-contrast);\n  transform: scale(1.05);\n}\n\n/* Animations */\n@keyframes slideInFromRight {\n  to {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n\n/* Responsive Design */\n@media (max-width: 768px) {\n  .timeline-container {\n    padding-left: 1rem;\n  }\n  \n  .timeline-container::before {\n    left: 8px;\n  }\n  \n  .experience-card::before {\n    left: -1.5rem;\n  }\n  \n  .experience-header {\n    flex-direction: column;\n    align-items: center;\n    text-align: center;\n  }\n  \n  .company-logo,\n  .company-initials {\n    width: 80px;\n    height: 80px;\n  }\n  \n  .meta-info {\n    justify-content: center;\n  }\n  \n  .section-title {\n    font-size: 2rem;\n  }\n}\n\n@media (max-width: 480px) {\n  .experience-container {\n    padding: 1rem;\n  }\n  \n  .experience-card {\n    padding: 1.5rem;\n    margin-bottom: 2rem;\n  }\n  \n  .position {\n    font-size: 1.2rem;\n  }\n  \n  .company {\n    font-size: 1.1rem;\n  }\n}",
  size: 13825,
  class: SliceComponent_ExperienceSection
},
"Timeline": {
  name: "Timeline",
  category: "Visual",
  categoryType: "Visual",
  componentDependencies: [],
  html: "<div class=\"slice-timeline-wrapper\">\n  <svg class=\"timeline-svg\" width=\"100%\" height=\"100%\" style=\"position: absolute; top:0; left:0; z-index:0; pointer-events:none;\"></svg>\n  <ul class=\"timeline-list\"></ul>\n</div>",
  css: "/* Styles for Timeline component */\n\n.slice-timeline-wrapper {\n    /* Reduced top padding since header handles spacing, kept bottom for graph droops */\n    padding: 1rem 1rem 8rem 1rem;\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    position: relative;\n    box-sizing: border-box;\n}\n\n.timeline-svg {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 0;\n    pointer-events: none;\n}\n\n.timeline-list {\n    list-style: none;\n    padding: 0;\n    margin: 0;\n    position: relative;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    width: 100%;\n    max-width: 1000px;\n    z-index: 1; /* Above SVG */\n}\n\n.slice-timeline-wrapper.horizontal .timeline-list {\n    flex-direction: row;\n    /* justify-content handled mostly by flex spacing */\n}\n\n.slice-timeline-wrapper.vertical {\n    align-items: flex-start; /* Or center? */\n}\n\n.slice-timeline-wrapper.vertical .timeline-list {\n    flex-direction: column;\n    /* Need height? Or just flow */\n    height: auto;\n    width: auto;\n    min-height: 500px; /* Arbitrary, maybe 100% */\n}\n\n/* Base item styles */\n.timeline-item {\n    position: relative;\n    z-index: 1;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    cursor: grab; /* Show grab cursor */\n    flex: 1;\n    opacity: 0.7;\n    transition: transform 0.4s ease, opacity 0.4s ease; /* Animate transform and opacity */\n    min-width: 80px;\n    user-select: none; /* Prevent text params during drag */\n}\n\n.timeline-item.dragging {\n    cursor: grabbing;\n    z-index: 100; /* Top most when dragging */\n    opacity: 1;\n    /* transition: none; handled in JS for transform */\n}\n\n/* Orientation Specific Layouts - Transforms are handled inline now */\n.slice-timeline-wrapper.horizontal .timeline-item {\n    /* transform handled by JS */\n}\n\n.slice-timeline-wrapper.vertical .timeline-item {\n    /* transform handled by JS */\n    flex-direction: row; /* Align content horizontally */\n    margin: 2rem 0;\n    width: 200px; /* Or variable */\n}\n\n/* Vertical Timeline Item Internal Layout */\n.slice-timeline-wrapper.vertical .timeline-dot {\n    order: 0;\n    margin: 0 1rem;\n}\n.slice-timeline-wrapper.vertical .timeline-date {\n    order: -1;\n    text-align: right;\n    min-width: 60px;\n}\n.slice-timeline-wrapper.vertical .timeline-label {\n    order: 1;\n    text-align: left;\n}\n\n.timeline-item:hover {\n    opacity: 1;\n}\n\n.timeline-item.active {\n    opacity: 1;\n    z-index: 2; /* Bring active to front if overlaps */\n}\n\n/* Date / Top Label */\n.timeline-date {\n    font-size: 0.9rem;\n    font-weight: 700;\n    color: var(--font-secondary-color);\n    margin-bottom: 1rem;\n    transition: all 0.3s;\n    opacity: 0.8;\n}\n\n.timeline-item.active .timeline-date {\n    color: var(--primary-color);\n    opacity: 1;\n}\n\n/* The Node Dot */\n.timeline-dot {\n    width: 18px;\n    height: 18px;\n    background: var(--background-color);\n    border: 3px solid var(--primary-color); /* Primary color border */\n    border-radius: 50%;\n    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n    position: relative;\n    z-index: 2;\n    box-shadow: 0 0 0 4px var(--background-color); /* Separation from line */\n}\n\n/* Active Node Style */\n.timeline-item.active .timeline-dot {\n    background: var(--primary-color);\n    transform: scale(1.3);\n    box-shadow: 0 0 0 6px var(--background-color);\n}\n\n.timeline-label {\n    margin-top: 1rem;\n    font-size: 0.85rem;\n    text-align: center;\n    font-weight: 500;\n    color: var(--font-primary-color);\n    max-width: 120px;\n    transition: all 0.3s;\n    opacity: 0.9;\n}\n\n.timeline-item.active .timeline-label {\n    font-weight: 700;\n}\n\n/* Mobile / Vertical Variant */\n@media (max-width: 768px) {\n    .slice-timeline-wrapper.horizontal {\n        align-items: flex-start;\n        padding-left: 1rem;\n        padding-right: 1rem;\n    }\n    \n    /* Hide the complex graph SVG on mobile only if horizontal? \n       Or maybe users want the graph on mobile too? \n       Previous req said hide it. Let's keep it hidden for simplicity */\n    .slice-timeline-wrapper.horizontal .timeline-svg {\n        display: none;\n    }\n    \n    .slice-timeline-wrapper.horizontal .timeline-list {\n        flex-direction: column;\n        width: 100%;\n        gap: 0;\n        margin-left: 0;\n        padding-left: 0;\n    }\n    \n    /* Mobile Track Line */\n    .slice-timeline-wrapper.horizontal .timeline-list::before {\n        content: '';\n        position: absolute;\n        top: 10px;\n        bottom: 10px;\n        left: 20px; \n        width: 3px;\n        background: var(--primary-color);\n        opacity: 0.3;\n        z-index: 0;\n    }\n\n    .slice-timeline-wrapper.horizontal .timeline-item {\n        display: grid;\n        grid-template-columns: 40px 1fr; \n        grid-template-rows: auto auto;\n        column-gap: 0;\n        row-gap: 0.2rem;\n        \n        width: 100%;\n        margin-bottom: 2rem;\n        flex-direction: row; \n        align-items: start;\n        text-align: left;\n        \n        /* Disable ZigZag/Drag Transform on Mobile */\n        transform: none !important;\n        opacity: 1; \n        cursor: pointer; /* No grab on mobile usually */\n    }\n    \n    .timeline-dot {\n        grid-row: 1 / span 2;\n        grid-column: 1;\n        justify-self: center;\n        margin-top: 5px;\n        /* Center on the track line (20px) */\n    }\n    \n    .timeline-date {\n        grid-row: 1;\n        grid-column: 2;\n        margin-bottom: 0;\n        text-align: left;\n    }\n    \n    .timeline-label {\n        grid-row: 2;\n        grid-column: 2;\n        text-align: left;\n        max-width: 100%;\n        margin-top: 0.2rem;\n    }\n}\n\n",
  size: 17417,
  class: SliceComponent_Timeline
},
"ExperienceCard": {
  name: "ExperienceCard",
  category: "AtomicAppComponents",
  categoryType: "Visual",
  componentDependencies: [],
  html: "<div class=\"experience-card\">\n   <div class=\"experience-header\">\n      <img class=\"company-logo\" alt=\"Company logo\">\n      <div class=\"company-initials\" style=\"display: none;\"></div>\n      <div class=\"basic-info\">\n         <h3 class=\"position\"></h3>\n         <h4 class=\"company\"></h4>\n         <div class=\"meta-info\">\n            <span class=\"period\"></span>\n            <span class=\"type\"></span>\n            <span class=\"location\"></span>\n         </div>\n      </div>\n   </div>\n   \n   <p class=\"experience-description\"></p>\n   \n   <div class=\"responsibilities-section\">\n      <h5>Key Responsibilities:</h5>\n      <ul class=\"responsibilities-list\"></ul>\n   </div>\n   \n   <div class=\"tech-section\">\n      <h5>Technologies:</h5>\n      <div class=\"tech-list\"></div>\n   </div>\n   \n   <div class=\"achievements-section\">\n      <h5>⚡ Impact & Achievements:</h5>\n      <div class=\"achievements-grid\"></div>\n   </div>\n</div>",
  css: ".experience-card-container {\n   width: 100%;\n}\n\n/* Experience Cards - Ultra Compact Version with Timeline */\n.experience-card {\n   position: relative;\n   margin-bottom: 2rem; /* Increased spacing for better timeline readability */\n   background-color: var(--secondary-background-color);\n   border-radius: var(--border-radius-slice);\n   padding: 0.8rem; /* Ultra reduced from 1.5rem */\n   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n   border-left: 3px solid var(--primary-color);\n   animation: gentleFadeIn 0.5s ease-out forwards;\n   opacity: 0;\n   transform: translateY(10px);\n   transition: all 0.3s ease;\n}\n\n@keyframes gentleFadeIn {\n    from { opacity: 0; transform: translateY(10px); }\n    to { opacity: 1; transform: translateY(0); }\n}\n\n.experience-card:hover {\n   transform: translateY(-2px);\n   box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);\n}\n\n/* Achievements Grid */\n.achievements-grid {\n   display: grid;\n   grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n   gap: 1rem;\n   margin-top: 0.8rem;\n}\n\n.achievement-item {\n   display: flex;\n   align-items: flex-start;\n   gap: 0.8rem;\n   background-color: var(--primary-background-color);\n   padding: 1rem;\n   border-radius: var(--border-radius-slice);\n   border: 1px solid var(--disabled-color);\n   transition: all 0.2s ease;\n}\n\n.achievement-item:hover {\n   transform: translateY(-2px);\n   border-color: var(--success-color);\n   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);\n}\n\n.achievement-icon {\n   font-size: 1.2rem;\n   line-height: 1;\n}\n\n.achievement-text {\n   font-size: 0.9rem;\n   color: var(--font-secondary-color);\n   line-height: 1.5;\n}\n\n/* Responsibilities - Enhanced */\n.responsibilities-section {\n    margin: 1.5rem 0;\n}\n\n.responsibilities-list {\n    display: grid;\n    gap: 0.5rem;\n}\n\n.responsibilities-list li {\n    position: relative;\n    padding-left: 1.5rem;\n    color: var(--font-secondary-color);\n    font-size: 0.95rem;\n}\n\n.responsibilities-list li::before {\n    content: '▹';\n    position: absolute;\n    left: 0;\n    color: var(--primary-color);\n    font-weight: bold;\n}\n.experience-header {\n   display: flex;\n   align-items: flex-start;\n   gap: 0.8rem; /* Ultra reduced from 1.2rem */\n   margin-bottom: 0.8rem; /* Ultra reduced from 1.2rem */\n}\n\n.company-logo {\n   width: 36px; /* Ultra reduced from 50px */\n   height: 36px; /* Ultra reduced from 50px */\n   object-fit: contain;\n   border-radius: var(--border-radius-slice);\n   background-color: var(--primary-background-color);\n   padding: 4px; /* Ultra reduced from 6px */\n   border: 1px solid var(--primary-color-shade);\n}\n\n.company-initials {\n   width: 36px; /* Ultra reduced from 50px */\n   height: 36px; /* Ultra reduced from 50px */\n   display: flex;\n   align-items: center;\n   justify-content: center;\n   background-color: var(--primary-color);\n   color: var(--primary-color-contrast);\n   border-radius: var(--border-radius-slice);\n   font-weight: bold;\n   font-size: 0.8rem; /* Ultra reduced from 1rem */\n}\n\n.basic-info {\n   flex: 1;\n}\n\n.position {\n   font-size: 1.1rem; /* Standardized readable size */\n   color: var(--primary-color);\n   margin: 0 0 0.3rem 0; /* Balanced spacing */\n   font-weight: 600;\n   line-height: 1.3;\n}\n\n.company {\n   font-size: 0.95rem; /* Standardized readable size */\n   color: var(--font-primary-color);\n   margin: 0 0 0.6rem 0; /* Balanced spacing */\n   font-weight: 500;\n   line-height: 1.3;\n}\n\n.meta-info {\n   display: flex;\n   gap: 0.4rem; /* Ultra reduced from 0.8rem */\n   flex-wrap: wrap;\n}\n\n.meta-info span {\n   background-color: var(--tertiary-background-color);\n   padding: 0.15rem 0.4rem; /* Ultra reduced from 0.25rem 0.6rem */\n   border-radius: 12px;\n   font-size: 0.7rem; /* Ultra reduced from 0.8rem */\n   font-weight: 500;\n   color: var(--font-secondary-color);\n}\n\n.type {\n   background-color: var(--primary-color) !important;\n   color: var(--primary-color-contrast) !important;\n}\n\n/* Description - Balanced */\n.experience-description {\n   font-size: 0.9rem; /* Standardized readable size */\n   line-height: 1.4; /* Improved readability */\n   color: var(--font-primary-color);\n   margin-bottom: 1rem; /* Balanced spacing */\n   text-align: justify;\n}\n\n/* Sections - Ultra Compact */\n.responsibilities-section,\n.achievements-section {\n   margin-bottom: 0.8rem; /* Ultra reduced from 1.2rem */\n}\n\n.tech-section {\n   margin-bottom: 0.6rem; /* Ultra reduced from 1rem */\n}\n\n.responsibilities-section h5,\n.achievements-section h5,\n.tech-section h5 {\n   font-size: 0.9rem; /* Standardized readable size */\n   color: var(--primary-color);\n   margin-bottom: 0.5rem; /* Balanced spacing */\n   font-weight: 600;\n}\n\n.responsibilities-list,\n.achievements-list {\n   list-style: none;\n   padding: 0;\n   margin: 0;\n}\n\n.responsibilities-list li,\n.achievements-list li {\n   position: relative;\n   padding-left: 1.2rem; /* Balanced spacing */\n   margin-bottom: 0.4rem; /* Balanced spacing */\n   line-height: 1.3; /* Improved readability */\n   color: var(--font-primary-color);\n   font-size: 0.85rem; /* Standardized readable size */\n}\n\n.responsibilities-list li::before,\n.achievements-list li::before {\n   content: '→';\n   position: absolute;\n   left: 0;\n   color: var(--primary-color);\n   font-weight: bold;\n}\n\n.achievements-list li::before {\n   content: '★';\n   color: var(--success-color);\n}\n\n/* Technologies - Ultra Compact */\n.tech-list {\n   display: flex;\n   flex-wrap: wrap;\n   gap: 0.25rem; /* Ultra reduced from 0.4rem */\n}\n\n.tech-tag {\n   background-color: var(--primary-color);\n   color: var(--primary-color-contrast);\n   padding: 0.25rem 0.5rem; /* Balanced padding */\n   border-radius: 15px;\n   font-size: 0.75rem; /* Standardized readable size */\n   font-weight: 500;\n   transition: all 0.3s ease;\n}\n\n.tech-tag:hover {\n   background-color: var(--secondary-color);\n   color: var(--secondary-color-contrast);\n   transform: scale(1.05);\n}\n\n/* Animations */\n@keyframes slideInFromRight {\n   to {\n      opacity: 1;\n      transform: translateX(0);\n   }\n}\n\n/* Responsive Design - Ultra Compact */\n@media (max-width: 768px) {\n   .experience-card::before {\n      left: -1.5rem;\n   }\n   \n   .experience-header {\n      flex-direction: column;\n      align-items: center;\n      text-align: center;\n      gap: 0.5rem;\n   }\n   \n   .company-logo,\n   .company-initials {\n      width: 40px; /* Ultra compact for mobile */\n      height: 40px;\n   }\n   \n   .meta-info {\n      justify-content: center;\n   }\n   \n   .experience-card {\n      padding: 0.6rem; /* Ultra reduced for mobile */\n   }\n}\n\n@media (max-width: 480px) {\n   .experience-card {\n      padding: 0.5rem; /* Ultra reduced for small screens */\n      margin-bottom: 1.5rem; /* Increased spacing for mobile timeline */\n   }\n   \n   .position {\n      font-size: 0.9rem; /* Ultra reduced from 1.1rem */\n   }\n   \n   .company {\n      font-size: 0.8rem; /* Ultra reduced from 0.95rem */\n   }\n   \n   .experience-description {\n      font-size: 0.8rem; /* Ultra reduced from 0.95rem */\n   }\n}",
  size: 11645,
  class: SliceComponent_ExperienceCard
},
"Tabs": {
  name: "Tabs",
  category: "Visual",
  categoryType: "Visual",
  componentDependencies: [],
  html: "<div class=\"tabs-container\">\n    <div class=\"tabs-header-wrapper\">\n        <button class=\"tab-scroll-btn prev\" aria-hidden=\"true\" tabindex=\"-1\">❮</button>\n        <div class=\"tab-list-container\">\n            <div class=\"tab-list\" role=\"tablist\">\n                <div class=\"tab-highlight\"></div>\n            </div>\n        </div>\n        <button class=\"tab-scroll-btn next\" aria-hidden=\"true\" tabindex=\"-1\">❯</button>\n    </div>\n    <div class=\"tab-content\">\n        <!-- Panels go here -->\n    </div>\n</div>",
  css: "slice-tabs {\n    display: block;\n    width: 100%;\n\n    .tabs-container {\n        display: flex;\n        flex-direction: column;\n        gap: 1.5rem;\n        min-height: 400px;\n    }\n\n    /* Tab Header Wrapper (Nav buttons + List) */\n    .tabs-header-wrapper {\n        display: flex;\n        align-items: center;\n        position: relative;\n        border-bottom: 2px solid var(--disabled-color, #eee);\n        gap: 0.5rem;\n    }\n\n    .tab-list-container {\n        overflow: hidden; /* Hide scrollbar but allow JS scroll */\n        flex: 1;\n        position: relative;\n    }\n\n    /* Tab List Container */\n    .tab-list {\n        display: flex;\n        flex-direction: row;\n        gap: 0.5rem;\n        position: relative;\n        padding-bottom: 2px;\n        /* border-bottom moved to wrapper */\n        overflow-x: auto;\n        scrollbar-width: none;\n        scroll-behavior: smooth;\n    }\n\n    .tab-list::-webkit-scrollbar { \n        display: none; \n    }\n\n    /* Scroll Buttons */\n    .tab-scroll-btn {\n        background: transparent;\n        border: none;\n        color: var(--primary-color);\n        font-size: 1.2rem;\n        cursor: pointer;\n        width: 36px;\n        height: 36px;\n        padding: 0;\n        display: none; /* Hidden by default */\n        align-items: center;\n        justify-content: center;\n        border-radius: 8px;\n        transition: all 0.2s;\n        z-index: 2;\n        flex-shrink: 0;\n    }\n\n    .tab-scroll-btn:hover {\n        background-color: var(--tertiary-background-color);\n    }\n\n    .tab-scroll-btn.visible {\n        display: flex;\n    }\n\n    /* Highlight Bar - Hidden in button style but kept for potential future use */\n    .tab-highlight {\n        display: none; /* We use full button background now */\n        position: absolute;\n        bottom: -2px;\n        left: 0;\n        height: 3px;\n        background-color: var(--primary-color);\n        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n        z-index: 10;\n        border-radius: 3px 3px 0 0;\n    }\n\n    /* Tab Buttons */\n    .tab-button {\n        background: transparent;\n        border: none;\n        cursor: pointer;\n        font-size: 1rem;\n        font-weight: 500;\n        color: var(--font-secondary-color, #666);\n        padding: 0.8rem 1.5rem;\n        border-radius: var(--border-radius-slice, 8px) var(--border-radius-slice, 8px) 0 0;\n        transition: color 0.2s ease, background-color 0.2s ease; /* Animate only colors */\n        white-space: nowrap;\n        opacity: 0.8;\n        flex-shrink: 0;\n        position: relative;\n        top: 2px;\n    }\n\n    .tab-button:hover {\n        color: var(--primary-color);\n        background-color: var(--tertiary-background-color, #f0f0f0);\n    }\n\n    .tab-button.active {\n        color: var(--primary-color-contrast, #fff);\n        /* font-weight: 600; Removed to prevent layout width jump */\n        opacity: 1;\n        background-color: var(--primary-color);\n        box-shadow: 0 -2px 10px rgba(0,0,0,0.05);\n    }\n\n    /* Vertical Orientation Support */\n    &.vertical {\n        .tabs-container {\n            flex-direction: row;\n        }\n\n        .tab-list {\n            flex-direction: column;\n            border-bottom: none;\n            border-left: 2px solid var(--disabled-color, #eee);\n            min-width: 200px;\n            gap: 0;\n        }\n        \n        .tab-button {\n            border-radius: 0 var(--border-radius-slice, 8px) var(--border-radius-slice, 8px) 0;\n            top: 0;\n            left: 2px;\n            text-align: left;\n        }\n        \n        .tab-button.active {\n            border-left: 4px solid var(--primary-color-shade);\n        }\n    }\n\n    /* Content Area */\n    .tab-content {\n        flex: 1;\n        position: relative;\n        width: 100%;\n        background: var(--primary-background-color);\n        border-radius: var(--border-radius-slice);\n        /* Optional: Add border or shadow to content area to seamlessly merge with active tab */\n    }\n\n    .tab-panel {\n        width: 100%;\n        animation: panelFade 0.4s ease-out;\n    }\n\n    @keyframes panelFade {\n        from { opacity: 0; }\n        to { opacity: 1; }\n    }\n}\n\n/* Mobile Responsive */\n@media (max-width: 768px) {\n    slice-tabs.vertical { \n        .tabs-container {\n            flex-direction: column;\n        }\n        \n        .tab-list {\n            flex-direction: row;\n            border-left: none;\n            border-bottom: 2px solid var(--disabled-color, #eee);\n            width: 100%;\n        }\n    }\n\n    slice-tabs .tab-button {\n        padding: 0.8rem;\n        font-size: 0.9rem;\n    }\n}\n",
  size: 11682,
  class: SliceComponent_Tabs
},
"EducationSection": {
  name: "EducationSection",
  category: "AppComponents",
  categoryType: "Visual",
  componentDependencies: ["StudyCard","CertificateCard"],
  html: "<div class=\"education-container\">\n  <div class=\"education-studies\"></div>\n  <div class=\"education-certificates\">\n    <div class=\"certificates-toolbar\">\n      <div class=\"certificates-search\">\n        <span class=\"search-icon\">⌕</span>\n        <input type=\"text\" class=\"certificates-search-input\" placeholder=\"Search certificates\">\n      </div>\n      <div class=\"certificates-count\"></div>\n    </div>\n    <div class=\"certificates-grid\"></div>\n    <div class=\"certificates-pagination\"></div>\n  </div>\n</div>\n",
  css: "slice-education-section {\n  display: block;\n  width: 100%;\n}\n\n.education-container {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 2rem 0;\n}\n\n/* Section Titles */\n.section-title {\n  font-size: 2.5rem;\n  color: var(--primary-color);\n  text-align: center;\n  margin-bottom: 3rem;\n  font-weight: 600;\n}\n\n/* Studies Section */\n.education-studies {\n  margin-bottom: 6rem; /* Increased from 5rem */\n}\n\n.studies-container {\n  display: flex;\n  flex-direction: column;\n  gap: 4rem; /* Increased from 3rem */\n}\n\n/* Study Cards */\n.study-card {\n  background-color: var(--secondary-background-color);\n  border-radius: var(--border-radius-slice);\n  padding: 2.5rem;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  border-left: 4px solid var(--primary-color);\n  animation: slideInFromLeft 0.6s ease-out forwards;\n  opacity: 0;\n  transform: translateX(-50px);\n  transition: all 0.3s ease;\n}\n\n.study-card:hover {\n  transform: translateX(0) translateY(-5px);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);\n}\n\n/* Study Header */\n.study-header {\n  display: flex;\n  align-items: flex-start;\n  gap: 2rem;\n  margin-bottom: 2rem;\n}\n\n.institution-logo {\n  width: 80px;\n  height: 80px;\n  object-fit: contain;\n  border-radius: var(--border-radius-slice);\n  background-color: var(--primary-background-color);\n  padding: 10px;\n  border: 2px solid var(--primary-color-shade);\n}\n\n.institution-initials {\n  width: 80px;\n  height: 80px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: var(--primary-color);\n  color: var(--primary-color-contrast);\n  border-radius: var(--border-radius-slice);\n  font-weight: bold;\n  font-size: 1.5rem;\n}\n\n.study-basic-info {\n  flex: 1;\n}\n\n.degree {\n  font-size: 1.5rem;\n  color: var(--primary-color);\n  margin: 0 0 0.5rem 0;\n  font-weight: 600;\n}\n\n.institution {\n  font-size: 1.3rem;\n  color: var(--font-primary-color);\n  margin: 0 0 1rem 0;\n  font-weight: 500;\n}\n\n.study-meta {\n  display: flex;\n  gap: 1.5rem;\n  flex-wrap: wrap;\n}\n\n.study-meta span {\n  background-color: var(--tertiary-background-color);\n  padding: 0.4rem 1rem;\n  border-radius: 20px;\n  font-size: 0.9rem;\n  font-weight: 500;\n  color: var(--font-secondary-color);\n}\n\n.study-meta .period {\n  background-color: var(--primary-color);\n  color: var(--primary-color-contrast);\n}\n\n/* Study Content */\n.study-description {\n  font-size: 1.1rem;\n  line-height: 1.6;\n  color: var(--font-primary-color);\n  margin-bottom: 2rem;\n  text-align: justify;\n}\n\n.achievements-section,\n.coursework-section {\n  margin-bottom: 2rem;\n}\n\n.achievements-section h5,\n.coursework-section h5 {\n  font-size: 1.2rem;\n  color: var(--primary-color);\n  margin-bottom: 1rem;\n  font-weight: 600;\n}\n\n.achievements-list {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n\n.achievements-list li {\n  position: relative;\n  padding-left: 2rem;\n  margin-bottom: 0.8rem;\n  line-height: 1.5;\n  color: var(--font-primary-color);\n}\n\n.achievements-list li::before {\n  content: '🏆';\n  position: absolute;\n  left: 0;\n  font-size: 1.2rem;\n}\n\n.coursework-list {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n}\n\n.course-tag {\n  background-color: var(--primary-color);\n  color: var(--primary-color-contrast);\n  padding: 0.4rem 0.8rem;\n  border-radius: 15px;\n  font-size: 0.85rem;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n\n.course-tag:hover {\n  background-color: var(--secondary-color);\n  color: var(--secondary-color-contrast);\n  transform: scale(1.05);\n}\n\n/* Certificates Section */\n.education-certificates {\n   margin-bottom: 4rem; /* Increased from 3rem */\n}\n\n.certificates-toolbar {\n   display: flex;\n   align-items: center;\n   justify-content: space-between;\n   gap: 1rem;\n   max-width: 1100px;\n   margin: 0 auto 2rem;\n   flex-wrap: wrap;\n}\n\n.certificates-search {\n   display: flex;\n   align-items: center;\n   gap: 0.6rem;\n   padding: 0.6rem 0.9rem;\n   border-radius: 999px;\n   background-color: var(--primary-background-color);\n   border: 1px solid rgba(var(--primary-color-rgb), 0.2);\n   min-width: min(360px, 100%);\n   transition: border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease;\n}\n\n.certificates-search:focus-within {\n   border-color: var(--primary-color);\n   box-shadow: 0 0 0 4px rgba(var(--primary-color-rgb), 0.12);\n   transform: translateY(-1px);\n}\n\n.search-icon {\n   color: var(--font-secondary-color);\n   font-size: 0.9rem;\n}\n\n.certificates-search-input {\n   border: none;\n   outline: none;\n   background: transparent;\n   width: 100%;\n   color: var(--font-primary-color);\n   font-size: 0.95rem;\n}\n\n.certificates-search-input::placeholder {\n   color: var(--font-secondary-color);\n}\n\n.certificates-empty {\n   text-align: center;\n   padding: 2.5rem 1.5rem;\n   border-radius: var(--border-radius-slice);\n   border: 1px dashed rgba(var(--primary-color-rgb), 0.25);\n   background-color: var(--primary-background-color);\n   color: var(--font-secondary-color);\n   font-size: 0.95rem;\n}\n\n.certificates-count {\n   font-size: 0.95rem;\n   color: var(--font-secondary-color);\n   font-weight: 600;\n}\n\n.certificates-grid {\n   display: grid;\n   grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n   gap: 1.5rem;\n   max-width: 1100px;\n   margin: 0 auto;\n}\n\n.certificates-pagination {\n   display: flex;\n   justify-content: center;\n   gap: 0.6rem;\n   margin-top: 2.5rem;\n   flex-wrap: wrap;\n}\n\n.certificate-page-btn {\n   border: 1px solid rgba(var(--primary-color-rgb), 0.22);\n   background-color: var(--primary-background-color);\n   color: var(--font-primary-color);\n   padding: 0.45rem 0.9rem;\n   border-radius: 999px;\n   font-size: 0.85rem;\n   font-weight: 600;\n   cursor: pointer;\n   transition: all 0.2s ease;\n}\n\n.certificate-page-btn:hover {\n   border-color: var(--primary-color);\n   color: var(--primary-color);\n}\n\n.certificate-page-btn.is-active {\n   background-color: var(--primary-color);\n   color: var(--primary-color-contrast);\n   border-color: var(--primary-color);\n}\n\n.certificate-page-btn:disabled {\n   opacity: 0.5;\n   cursor: not-allowed;\n}\n\n/* Certificate Cards Styles moved to CertificateCard component */\n\n/* Animations */\n@keyframes slideInFromLeft {\n  to {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n\n@keyframes fadeInUp {\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n/* Responsive Design */\n@media (max-width: 768px) {\n  .study-header {\n    flex-direction: column;\n    align-items: center;\n    text-align: center;\n  }\n  \n  .institution-logo,\n  .institution-initials {\n    width: 100px;\n    height: 100px;\n  }\n  \n  .study-meta {\n    justify-content: center;\n  }\n  \n   .certificates-grid {\n     grid-template-columns: 1fr;\n     gap: 1.2rem;\n   }\n  \n  .section-title {\n    font-size: 2rem;\n  }\n}\n\n@media (max-width: 480px) {\n  .education-container {\n    padding: 1rem;\n  }\n  \n  .study-card {\n    padding: 2rem;\n  }\n  \n  .certificate-content {\n    padding: 1rem;\n  }\n  \n  .degree {\n    font-size: 1.3rem;\n  }\n  \n  .institution {\n    font-size: 1.1rem;\n  }\n}\n",
  size: 19159,
  class: SliceComponent_EducationSection
},
"StudyCard": {
  name: "StudyCard",
  category: "AtomicAppComponents",
  categoryType: "Visual",
  componentDependencies: [],
  html: "<div class=\"study-card\">\n   <div class=\"study-header\">\n      <img class=\"institution-logo\" alt=\"Institution logo\">\n      <div class=\"institution-initials\" style=\"display: none;\"></div>\n      <div class=\"study-basic-info\">\n         <h3 class=\"degree\"></h3>\n         <h4 class=\"institution\"></h4>\n         <div class=\"study-meta\">\n            <span class=\"period\"></span>\n            <span class=\"location\"></span>\n         </div>\n      </div>\n   </div>\n   \n   <p class=\"study-description\"></p>\n   \n   <div class=\"achievements-section\">\n      <h5>Key Achievements:</h5>\n      <ul class=\"achievements-list\"></ul>\n   </div>\n   \n   <div class=\"coursework-section\">\n      <h5>Relevant Coursework:</h5>\n      <div class=\"coursework-list\"></div>\n   </div>\n</div>",
  css: "/* Study Cards - Ultra Compact Version */\n.study-card {\n   background-color: var(--secondary-background-color);\n   border-radius: var(--border-radius-slice);\n   padding: 1rem; /* Significantly reduced from 1.5rem */\n   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n   border-left: 4px solid var(--primary-color);\n   animation: slideInFromLeft 0.6s ease-out forwards;\n   opacity: 0;\n   transform: translateX(-50px);\n   transition: all 0.3s ease;\n   margin-bottom: 1.5rem; /* Reduced from 2rem */\n}\n\n.study-card:hover {\n   transform: translateX(0) translateY(-5px);\n   box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);\n}\n\n/* Study Header - Ultra Compact */\n.study-header {\n   display: flex;\n   align-items: flex-start;\n   gap: 1rem; /* Reduced from 1.5rem */\n   margin-bottom: 1rem; /* Significantly reduced from 1.5rem */\n}\n\n.institution-logo {\n   width: 50px; /* Significantly reduced from 60px */\n   height: 50px; /* Significantly reduced from 60px */\n   object-fit: contain;\n   border-radius: var(--border-radius-slice);\n   background-color: var(--primary-background-color);\n   padding: 6px; /* Reduced from 8px */\n   border: 2px solid var(--primary-color-shade);\n}\n\n.institution-initials {\n   width: 50px; /* Significantly reduced from 60px */\n   height: 50px; /* Significantly reduced from 60px */\n   display: flex;\n   align-items: center;\n   justify-content: center;\n   background-color: var(--primary-color);\n   color: var(--primary-color-contrast);\n   border-radius: var(--border-radius-slice);\n   font-weight: bold;\n   font-size: 1rem; /* Reduced from 1.2rem */\n}\n\n.study-basic-info {\n   flex: 1;\n}\n\n.degree {\n   font-size: 1.1rem; /* Significantly reduced from 1.3rem */\n   color: var(--primary-color);\n   margin: 0 0 0.3rem 0; /* Reduced from 0.4rem */\n   font-weight: 600;\n   line-height: 1.2; /* Added for compactness */\n}\n\n.institution {\n   font-size: 0.95rem; /* Significantly reduced from 1.1rem */\n   color: var(--font-primary-color);\n   margin: 0 0 0.6rem 0; /* Reduced from 0.8rem */\n   font-weight: 500;\n   line-height: 1.2; /* Added for compactness */\n}\n\n.study-meta {\n   display: flex;\n   gap: 0.8rem; /* Reduced from 1rem */\n   flex-wrap: wrap;\n}\n\n.study-meta span {\n   background-color: var(--tertiary-background-color);\n   padding: 0.2rem 0.6rem; /* Significantly reduced from 0.3rem 0.8rem */\n   border-radius: 15px;\n   font-size: 0.75rem; /* Significantly reduced from 0.85rem */\n   font-weight: 500;\n   color: var(--font-secondary-color);\n}\n\n.study-meta .period {\n   background-color: var(--primary-color);\n   color: var(--primary-color-contrast);\n}\n\n/* Study Content - Ultra Compact */\n.study-description {\n   font-size: 0.9rem; /* Significantly reduced from 1rem */\n   line-height: 1.4; /* Reduced from 1.5 */\n   color: var(--font-primary-color);\n   margin-bottom: 1rem; /* Significantly reduced from 1.5rem */\n   text-align: justify;\n}\n\n.achievements-section,\n.coursework-section {\n   margin-bottom: 1rem; /* Significantly reduced from 1.5rem */\n}\n\n.achievements-section h5,\n.coursework-section h5 {\n   font-size: 0.9rem; /* Significantly reduced from 1rem */\n   color: var(--primary-color);\n   margin-bottom: 0.5rem; /* Significantly reduced from 0.8rem */\n   font-weight: 600;\n}\n\n.achievements-list {\n   list-style: none;\n   padding: 0;\n   margin: 0;\n}\n\n.achievements-list li {\n   position: relative;\n   padding-left: 1.5rem; /* Reduced from 1.8rem */\n   margin-bottom: 0.4rem; /* Significantly reduced from 0.6rem */\n   line-height: 1.3; /* Reduced from 1.4 */\n   color: var(--font-primary-color);\n   font-size: 0.85rem; /* Significantly reduced from 0.95rem */\n}\n\n.achievements-list li::before {\n   content: '🏆';\n   position: absolute;\n   left: 0;\n   font-size: 0.9rem; /* Reduced from 1rem */\n}\n\n.coursework-list {\n   display: flex;\n   flex-wrap: wrap;\n   gap: 0.3rem; /* Reduced from 0.4rem */\n}\n\n.course-tag {\n   background-color: var(--primary-color);\n   color: var(--primary-color-contrast);\n   padding: 0.2rem 0.5rem; /* Significantly reduced from 0.3rem 0.6rem */\n   border-radius: 12px;\n   font-size: 0.75rem; /* Significantly reduced from 0.8rem */\n   font-weight: 500;\n   transition: all 0.3s ease;\n}\n\n.course-tag:hover {\n   background-color: var(--secondary-color);\n   color: var(--secondary-color-contrast);\n   transform: scale(1.05);\n}\n\n/* Animations */\n@keyframes slideInFromLeft {\n   to {\n      opacity: 1;\n      transform: translateX(0);\n   }\n}\n\n/* Responsive Design */\n@media (max-width: 768px) {\n   .study-header {\n      flex-direction: column;\n      align-items: center;\n      text-align: center;\n      gap: 0.8rem;\n   }\n   \n   .institution-logo,\n   .institution-initials {\n      width: 60px; /* Slightly larger for mobile visibility */\n      height: 60px;\n   }\n   \n   .study-meta {\n      justify-content: center;\n   }\n   \n   .study-card {\n      padding: 0.8rem; /* Further reduced for mobile */\n   }\n}\n\n@media (max-width: 480px) {\n   .study-card {\n      padding: 0.6rem; /* Ultra compact for small screens */\n   }\n   \n   .degree {\n      font-size: 1rem; /* Further reduced */\n   }\n   \n   .institution {\n      font-size: 0.9rem; /* Further reduced */\n   }\n   \n   .study-description {\n      font-size: 0.85rem; /* Further reduced */\n   }\n}",
  size: 8997,
  class: SliceComponent_StudyCard
},
"CertificateCard": {
  name: "CertificateCard",
  category: "AtomicAppComponents",
  categoryType: "Visual",
  componentDependencies: ["Button"],
  html: "<div class=\"certificate-card\">\n   <div class=\"certificate-header\">\n      <div class=\"issuer-mark\">\n         <img class=\"issuer-logo\" alt=\"Issuer logo\">\n         <span class=\"issuer-initials\"></span>\n      </div>\n      <div class=\"header-text\">\n         <h3 class=\"certificate-title\"></h3>\n         <h4 class=\"certificate-issuer\"></h4>\n      </div>\n   </div>\n\n   <p class=\"certificate-description\"></p>\n\n   <div class=\"certificate-meta\">\n      <div class=\"certificate-dates\"></div>\n      <div class=\"credential-id\"></div>\n   </div>\n\n   <div class=\"certificate-skills\">\n      <h5>Focus</h5>\n      <div class=\"skills-list\"></div>\n   </div>\n\n   <div class=\"certificate-actions\"></div>\n</div>\n",
  css: "slice-certificate-card {\n   display: block;\n   width: 100%;\n}\n\n.certificate-card {\n   background-color: var(--secondary-background-color);\n   border-radius: var(--border-radius-slice);\n   border: 1px solid rgba(var(--primary-color-rgb), 0.25);\n   display: flex;\n   flex-direction: column;\n   gap: 0.8rem;\n   padding: 1.4rem 1.4rem 1.2rem;\n   min-height: 360px;\n   height: 100%;\n   height: 100%;\n   overflow: visible;\n   transition: transform 0.3s ease, box-shadow 0.3s ease;\n   animation: fadeInUp 0.6s ease-out forwards;\n   opacity: 0;\n   transform: translateY(24px);\n   position: relative;\n}\n\n.certificate-card:hover .issuer-logo {\n   transform: translateY(-2px);\n}\n\n.certificate-card::after {\n   content: '';\n   position: absolute;\n   inset: 12px 12px auto auto;\n   width: 120px;\n   height: 120px;\n   border-radius: 999px;\n   border: 1px dashed rgba(var(--primary-color-rgb), 0.18);\n   pointer-events: none;\n}\n\n.certificate-card::before {\n   display: none;\n}\n\n.certificate-card:focus-within {\n   box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb), 0.18);\n}\n\n.certificate-card:hover {\n   transform: translateY(-4px);\n   box-shadow: 0 10px 26px rgba(var(--primary-color-rgb), 0.12);\n}\n\n\n.certificate-header {\n   display: grid;\n   grid-template-columns: auto 1fr;\n   gap: 0.9rem;\n   align-items: center;\n}\n\n.issuer-mark {\n   width: 64px;\n   height: 64px;\n   border-radius: 16px;\n   background-color: var(--primary-background-color);\n   border: 1px solid rgba(var(--primary-color-rgb), 0.2);\n   display: grid;\n   place-items: center;\n   position: relative;\n}\n\n.issuer-logo {\n   width: 44px;\n   height: 44px;\n   object-fit: contain;\n   border-radius: 10px;\n   background-color: var(--primary-background-color);\n   transition: transform 0.3s ease;\n}\n\n.issuer-initials {\n   position: absolute;\n   inset: 0;\n   display: grid;\n   place-items: center;\n   font-size: 1rem;\n   font-weight: 700;\n   color: var(--primary-color);\n   letter-spacing: 0.04em;\n   text-transform: uppercase;\n}\n\n.header-text {\n   display: flex;\n   flex-direction: column;\n   gap: 0.3rem;\n}\n\n.certificate-title {\n   font-size: 1.15rem;\n   color: var(--primary-color);\n   margin: 0;\n   font-weight: 700;\n   line-height: 1.2;\n}\n\n.certificate-issuer {\n   font-size: 0.95rem;\n   color: var(--font-secondary-color);\n   margin: 0;\n   font-weight: 600;\n}\n\n.certificate-description {\n   color: var(--font-primary-color);\n   line-height: 1.5;\n   font-size: 0.95rem;\n   margin: 0;\n   display: -webkit-box;\n   -webkit-line-clamp: 4;\n   -webkit-box-orient: vertical;\n   overflow: hidden;\n}\n\n.certificate-meta {\n   display: flex;\n   flex-direction: column;\n   gap: 0.3rem;\n   padding: 0.6rem 0.7rem;\n   border-radius: 12px;\n   background-color: var(--primary-background-color);\n   border: 1px solid rgba(var(--primary-color-rgb), 0.2);\n}\n\n.certificate-skills h5 {\n   font-size: 0.7rem;\n   text-transform: uppercase;\n   letter-spacing: 0.16em;\n   color: var(--font-secondary-color);\n   margin: 0 0 0.6rem 0;\n   font-weight: 600;\n}\n\n.skills-list {\n   display: flex;\n   flex-wrap: wrap;\n   gap: 0.4rem;\n   max-height: 3.6rem;\n   overflow: hidden;\n}\n\n.skill-tag {\n   background-color: var(--tertiary-background-color);\n   color: var(--font-primary-color);\n   border: 1px solid rgba(var(--primary-color-rgb), 0.22);\n   padding: 0.3rem 0.6rem;\n   border-radius: 999px;\n   font-size: 0.8rem;\n   font-weight: 500;\n}\n\n.certificate-dates {\n   font-size: 0.85rem;\n   color: var(--font-primary-color);\n   font-weight: 500;\n}\n\n.credential-id {\n   font-size: 0.7rem;\n   color: var(--font-secondary-color);\n   font-family: ui-monospace, SFMono-Regular, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;\n   word-break: break-all;\n}\n\n.certificate-actions {\n   margin-top: auto;\n}\n\n.view-certificate-btn {\n   width: 100%;\n   padding: 0.55rem 1rem;\n   font-size: 0.9rem;\n}\n\n.view-certificate-btn:focus-visible {\n   outline: none;\n   box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.35) inset;\n}\n\n@keyframes fadeInUp {\n   to {\n      opacity: 1;\n      transform: translateY(0);\n   }\n}\n\n@media (max-width: 900px) {\n   .certificate-card {\n      padding: 1.2rem 1.2rem 1rem;\n   }\n}\n\n@media (max-width: 600px) {\n   .certificate-header {\n      grid-template-columns: 1fr;\n      justify-items: start;\n   }\n\n   .issuer-mark {\n      width: 56px;\n      height: 56px;\n   }\n\n}\n",
  size: 9402,
  class: SliceComponent_CertificateCard
},
"WhatIsSlice": {
  name: "WhatIsSlice",
  category: "AppComponents",
  categoryType: "Visual",
  componentDependencies: [],
  html: "<div class=\"whatisslice-container\">\n  <h1 id=\"title\">What is Slice.js?</h1>\n  \n  <div class=\"intro-section\">\n    <div class=\"intro-text\">\n      <p>Slice.js is a vanilla, lightweight framework for building functional frontend applications while learning the real concepts behind modern frameworks. You work directly with Web Components, plain JavaScript, and modern browser APIs.</p>\n      <p>It is intentionally small, practical, and transparent: you can see how routing, state, services, and UI composition actually work without a heavy abstraction layer.</p>\n    </div>\n    <div class=\"intro-image\">\n      <div class=\"slice-logo-container\">\n        <img src=\"/images/Slice.js-logo.png\" alt=\"Slice.js Logo\" class=\"slice-logo\">\n      </div>\n    </div>\n  </div>\n  \n  <div class=\"tabs-container\">\n    <div class=\"tabs\">\n      <div class=\"tab active\" data-tab=\"overview\">Overview</div>\n      <div class=\"tab\" data-tab=\"architecture\">Architecture</div>\n      <div class=\"tab\" data-tab=\"components\">Components</div>\n      <div class=\"tab\" data-tab=\"examples\">Examples</div>\n      <div class=\"tab\" data-tab=\"benefits\">Benefits</div>\n    </div>\n    \n    <div class=\"tab-contents\">\n      <!-- Overview Tab -->\n      <div class=\"tab-content active\" data-tab=\"overview\">\n        <h2>Core Principles</h2>\n        <div class=\"principles-grid\">\n          <div class=\"principle\">\n            <h3>Vanilla-First</h3>\n            <p>Build with Web Components, native DOM APIs, and standard browser behavior.</p>\n          </div>\n          <div class=\"principle\">\n            <h3>Learning-Driven</h3>\n            <p>Learn framework concepts by building real UI, not just reading theory.</p>\n          </div>\n          <div class=\"principle\">\n            <h3>Small Surface Area</h3>\n            <p>Minimal API with clear responsibilities for components, services, and structure.</p>\n          </div>\n          <div class=\"principle\">\n            <h3>Practical Architecture</h3>\n            <p>Compose UI, state, and routing in a predictable, maintainable way.</p>\n          </div>\n        </div>\n        \n        <h2>Key Features</h2>\n        <ul class=\"features-list\">\n          <li><span class=\"feature-highlight\">slice.build</span>: Build visual and service components with a single API</li>\n          <li><span class=\"feature-highlight\">Static Props</span>: Explicit public props with defaults and validation</li>\n          <li><span class=\"feature-highlight\">Routing</span>: Route and MultiRoute containers with caching + update()</li>\n          <li><span class=\"feature-highlight\">ContextManager</span>: Shared state with watchers, selectors, and persistence</li>\n          <li><span class=\"feature-highlight\">EventManager</span>: Lightweight pub/sub for app signals</li>\n          <li><span class=\"feature-highlight\">Services</span>: Fetch, storage, and reusable business logic</li>\n          <li><span class=\"feature-highlight\">Themes</span>: CSS-variable driven themes via StylesManager</li>\n          <li><span class=\"feature-highlight\">CLI</span>: init, dev, bundle, and component management</li>\n        </ul>\n      </div>\n      \n      <!-- Architecture Tab -->\n      <div class=\"tab-content\" data-tab=\"architecture\">\n        <h2>Slice.js Architecture</h2>\n        <p>Slice.js uses a three-layered architecture that keeps UI, structure, and logic independent while still working together:</p>\n        \n        <div class=\"architecture-diagram\">\n          <div class=\"component-box visual\" data-type=\"visual\">\n            <h3>Visual Components</h3>\n            <p>UI Elements</p>\n          </div>\n          <div class=\"component-box structural\" data-type=\"structural\">\n            <h3>Structural Components</h3>\n            <p>Core Framework</p>\n          </div>\n          <div class=\"component-box service\" data-type=\"service\">\n            <h3>Service Components</h3>\n            <p>Business Logic</p>\n          </div>\n          \n          <div class=\"component-description\" data-type=\"visual\">\n            <h4>Visual Components</h4>\n            <p>Render UI, handle interactions, and manage view state. Examples include buttons, inputs, cards, and layouts.</p>\n            <code>Button.js, Card.js, Input.js</code>\n          </div>\n          \n          <div class=\"component-description\" data-type=\"structural\">\n            <h4>Structural Components</h4>\n            <p>Coordinate the app: routing, component lifecycle, themes, events, and shared state.</p>\n            <code>Router.js, Controller.js, StylesManager.js, ContextManager.js, EventManager.js</code>\n          </div>\n          \n          <div class=\"component-description\" data-type=\"service\">\n            <h4>Service Components</h4>\n            <p>Encapsulate data access and business logic. Services can cache results and integrate with context or events.</p>\n            <code>FetchManager.js, IndexedDbManager.js, LocalStorageManager.js</code>\n          </div>\n        </div>\n        \n        <h3>Data Flow</h3>\n        <p>Data flow is explicit and simple:</p>\n        <ol class=\"data-flow\">\n          <li>User interacts with Visual Components</li>\n          <li>Visual Components call Services for data or logic</li>\n          <li>Services emit events or update Context</li>\n          <li>Visual Components refresh via update() or watchers</li>\n          <li>Structural components coordinate routing and lifecycle</li>\n        </ol>\n      </div>\n      \n      <!-- Components Tab -->\n      <div class=\"tab-content\" data-tab=\"components\">\n        <h2>Component Types</h2>\n        \n        <div class=\"component-section\">\n          <h3>Visual Components</h3>\n          <p>Visual components render UI and extend <code>HTMLElement</code>. Use Static Props to define a clear public API.</p>\n          \n          <div class=\"code-example\">\n            <pre><code class=\"language-javascript\">export default class Button extends HTMLElement {\n  static props = {\n    value: { type: 'string', default: 'Button' },\n    onClickCallback: { type: 'function', default: null }\n  };\n\n  constructor(props) {\n    super();\n    slice.attachTemplate(this);\n    this.$value = this.querySelector('.slice_button_value');\n    slice.controller.setComponentProps(this, props);\n  }\n\n  async init() {\n    this.$value.textContent = this.value;\n    this.addEventListener('click', () => this.onClickCallback?.());\n  }\n}</code></pre>\n          </div>\n        </div>\n        \n        <div class=\"component-section\">\n          <h3>Service Components</h3>\n          <p>Services encapsulate data access and logic. Build them once and reuse across routes.</p>\n          \n          <div class=\"code-example\">\n            <pre><code class=\"language-javascript\">const dataService = await slice.build('FetchManager', {\n  baseUrl: 'https://api.myapp.com/v1',\n  sliceId: 'data-service'\n});\n\nexport default class ProductList extends HTMLElement {\n  async init() {\n    this.dataService = slice.getComponent('data-service');\n    await this.load();\n  }\n\n  async load() {\n    await this.dataService.request('GET', null, '/products', (data) => {\n      this.products = data;\n      this.update();\n    });\n  }\n}</code></pre>\n          </div>\n        </div>\n        \n        <div class=\"component-section\">\n          <h3>Component Lifecycle</h3>\n          <p>Use lifecycle methods to separate one-time setup from updates:</p>\n          \n          <ul class=\"lifecycle-list\">\n            <li><strong>constructor</strong>: Attach template, cache DOM, set props</li>\n            <li><strong>init</strong>: One-time setup and async work</li>\n            <li><strong>update</strong>: Refresh data and rebuild dynamic lists</li>\n            <li><strong>beforeDestroy</strong>: Cleanup timers, listeners, and subscriptions</li>\n          </ul>\n        </div>\n\n        <div class=\"component-section\">\n          <h3>Shared State</h3>\n          <p>Use ContextManager to share state across components with efficient updates.</p>\n\n          <div class=\"code-example\">\n            <pre><code class=\"language-javascript\">slice.context.create('auth', { isLoggedIn: false });\n\nexport default class AccountMenu extends HTMLElement {\n  async init() {\n    slice.context.watch(\n      'auth',\n      this,\n      (isLoggedIn) => this.classList.toggle('signed-in', isLoggedIn),\n      (state) => state.isLoggedIn\n    );\n  }\n}</code></pre>\n          </div>\n        </div>\n      </div>\n      \n      <!-- Examples Tab -->\n      <div class=\"tab-content\" data-tab=\"examples\">\n        <h2>Build a Small App</h2>\n        \n        <div class=\"example-section\">\n          <h3>Create a Component</h3>\n          <p>A minimal component with a counter and update logic:</p>\n          \n          <div class=\"code-files\">\n            <div class=\"code-file\">\n              <h4>Counter.js</h4>\n              <pre><code class=\"language-javascript\">export default class Counter extends HTMLElement {\n  static props = { count: { type: 'number', default: 0 } };\n\n  constructor(props) {\n    super();\n    slice.attachTemplate(this);\n    this.$count = this.querySelector('.count');\n    this.$increment = this.querySelector('.increment');\n    this.$decrement = this.querySelector('.decrement');\n    slice.controller.setComponentProps(this, props);\n  }\n\n  async init() {\n    this.$increment.addEventListener('click', () => this.increment());\n    this.$decrement.addEventListener('click', () => this.decrement());\n    this.update();\n  }\n\n  async update() {\n    this.$count.textContent = this.count;\n  }\n\n  increment() {\n    this.count += 1;\n    this.update();\n  }\n\n  decrement() {\n    this.count -= 1;\n    this.update();\n  }\n}</code></pre>\n            </div>\n            \n            <div class=\"code-file\">\n              <h4>Counter.html</h4>\n              <pre><code class=\"language-html\">&lt;div class=\"counter-container\"&gt;\n  &lt;button class=\"decrement\"&gt;-&lt;/button&gt;\n  &lt;span class=\"count\"&gt;0&lt;/span&gt;\n  &lt;button class=\"increment\"&gt;+&lt;/button&gt;\n&lt;/div&gt;</code></pre>\n            </div>\n            \n            <div class=\"code-file\">\n              <h4>Counter.css</h4>\n              <pre><code class=\"language-css\">slice-counter .counter-container {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n}\n\nslice-counter button {\n  background-color: var(--primary-color);\n  color: var(--primary-color-contrast);\n  border: none;\n  border-radius: var(--border-radius-slice);\n  width: 40px;\n  height: 40px;\n  font-size: 20px;\n  cursor: pointer;\n}\n\nslice-counter .count {\n  font-size: 24px;\n  min-width: 40px;\n  text-align: center;\n}</code></pre>\n            </div>\n          </div>\n        </div>\n        \n        <div class=\"example-section\">\n          <h3>Use the Component</h3>\n          <p>Build an instance and attach it to a container:</p>\n          \n          <div class=\"code-example\">\n            <pre><code class=\"language-javascript\">const counter = await slice.build('Counter', { count: 5 });\n\nconst container = this.querySelector('.my-section');\ncontainer.appendChild(counter);\n\nconsole.log(counter.count); // 5\ncounter.count = 10;\ncounter.update();</code></pre>\n          </div>\n        </div>\n      </div>\n      \n      <!-- Benefits Tab -->\n      <div class=\"tab-content\" data-tab=\"benefits\">\n        <h2>Why Slice.js?</h2>\n        \n        <div class=\"benefits-grid\">\n          <div class=\"benefit\">\n            <h3>Vanilla Learning</h3>\n            <p>Learn how real frameworks work by building with native APIs.</p>\n          </div>\n          \n          <div class=\"benefit\">\n            <h3>Lightweight by Design</h3>\n            <p>Small framework surface area keeps projects fast and readable.</p>\n          </div>\n          \n          <div class=\"benefit\">\n            <h3>Practical Structure</h3>\n            <p>Clear separation between UI, services, and app structure.</p>\n          </div>\n          \n          <div class=\"benefit\">\n            <h3>Ready-to-Use Tooling</h3>\n            <p>CLI commands, visual components, and debugging helpers.</p>\n          </div>\n          \n          <div class=\"benefit\">\n            <h3>Themeable UI</h3>\n            <p>CSS-variable themes that can be switched at runtime.</p>\n          </div>\n          \n          <div class=\"benefit\">\n            <h3>Real Applications</h3>\n            <p>Build functional frontend apps while mastering core concepts.</p>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  \n  <div class=\"get-started-section\">\n    <h2>Ready to Get Started?</h2>\n    <p>Explore the documentation, install the framework, and build your first Slice.js application:</p>\n    <div class=\"action-buttons\">\n      <button class=\"action-button installation-button\">Installation Guide</button>\n      <button class=\"action-button components-button\">Component Library</button>\n      <a href=\"https://github.com/VKneider/slice.js\" target=\"_blank\" class=\"action-button github\">GitHub Repository</a>\n    </div>\n  </div>\n</div>\n",
  css: "slice-whatisslice {\n  font-family: var(--font-family);\n  color: var(--font-primary-color);\n}\n\nslice-whatisslice .whatisslice-container {\n  max-width: 1000px;\n  margin: 0 auto;\n  padding: 20px;\n}\n\nslice-whatisslice h1 {\n  color: var(--primary-color);\n  font-size: 2.5em;\n  margin-bottom: 30px;\n  text-align: center;\n}\n\nslice-whatisslice h2 {\n  color: var(--primary-color);\n  font-size: 1.8em;\n  margin: 40px 0 20px;\n  padding-bottom: 8px;\n  border-bottom: 1px solid var(--secondary-background-color);\n}\n\nslice-whatisslice h3 {\n  color: var(--font-primary-color);\n  font-size: 1.4em;\n  margin: 20px 0 15px;\n}\n\nslice-whatisslice h4 {\n  font-size: 1.2em;\n  margin: 15px 0 10px;\n}\n\nslice-whatisslice p {\n  line-height: 1.6;\n  margin-bottom: 15px;\n}\n\n/* Intro Section */\nslice-whatisslice .intro-section {\n  display: flex;\n  align-items: center;\n  margin: 30px 0;\n  gap: 40px;\n}\n\nslice-whatisslice .intro-text {\n  flex: 3;\n}\n\nslice-whatisslice .intro-image {\n  flex: 1;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\nslice-whatisslice .slice-logo-container {\n  width: 150px;\n  height: 186px;\n  position: relative;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n\nslice-whatisslice .slice-logo {\n  max-width: 200px;\n  height: auto;\n  transition: transform 0.3s ease;\n  /* Apply theme's primary color using CSS filter */\n  filter: brightness(0) saturate(100%) drop-shadow(0 0 0.1rem var(--primary-color));\n}\n\nslice-whatisslice .slice-logo-container:hover .slice-logo {\n  transform: scale(1.05);\n  filter: brightness(0) saturate(100%) drop-shadow(0 0 0.2rem var(--primary-color));\n}\n\n/* Tabs */\nslice-whatisslice .tabs-container {\n  margin: 40px 0;\n  border-radius: var(--border-radius-slice);\n  overflow: hidden;\n  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);\n}\n\nslice-whatisslice .tabs {\n   display: flex;\n   background-color: var(--secondary-background-color);\n   border-bottom: 1px solid var(--primary-color-shade);\n   flex-wrap: wrap;\n   gap: 4px;\n}\n\nslice-whatisslice .tab {\n   padding: 15px 20px;\n   cursor: pointer;\n   transition: all 0.3s ease;\n   font-weight: bold;\n   text-align: center;\n   flex: 1;\n   border-radius: 10px 10px 0 0;\n   min-width: 140px;\n}\n\nslice-whatisslice .tab:hover {\n   background-color: var(--primary-background-color);\n   color: var(--primary-color);\n}\n\nslice-whatisslice .tab.active {\n   background-color: var(--primary-color);\n   color: var(--primary-color-contrast);\n}\n\nslice-whatisslice .tab-contents {\n   background-color: var(--primary-background-color);\n   padding: 25px;\n   min-height: 400px;\n}\n\nslice-whatisslice .tab-content {\n  display: none;\n}\n\nslice-whatisslice .tab-content.active {\n  display: block;\n  animation: fadeIn 0.5s ease;\n}\n\n/* Core Principles Grid */\nslice-whatisslice .principles-grid {\n   display: grid;\n   grid-template-columns: repeat(2, 1fr);\n   gap: 25px;\n   margin: 30px 0;\n}\n\nslice-whatisslice .principle {\n   background-color: var(--secondary-background-color);\n   padding: 20px;\n   border-radius: var(--border-radius-slice);\n   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n   transition: transform 0.3s ease;\n}\n\nslice-whatisslice .principle:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);\n}\n\nslice-whatisslice .principle h3 {\n  color: var(--primary-color);\n  margin-top: 0;\n  border-bottom: 1px solid var(--primary-color-shade);\n  padding-bottom: 8px;\n}\n\n/* Features List */\nslice-whatisslice .features-list {\n  list-style: none;\n  padding-left: 0;\n  margin: 20px 0;\n}\n\nslice-whatisslice .features-list li {\n   margin-bottom: 12px;\n   padding-left: 30px;\n   position: relative;\n}\n\nslice-whatisslice .features-list li:before {\n  content: \"✓\";\n  position: absolute;\n  left: 0;\n  color: var(--primary-color);\n  font-weight: bold;\n}\n\nslice-whatisslice .feature-highlight {\n  color: var(--primary-color);\n  font-weight: bold;\n}\n\n/* Architecture Diagram */\nslice-whatisslice .architecture-diagram {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  margin: 30px 0;\n  position: relative;\n}\n\nslice-whatisslice .component-box {\n  padding: 20px;\n  border-radius: var(--border-radius-slice);\n  text-align: center;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n\nslice-whatisslice .component-box h3 {\n  margin: 0 0 10px;\n}\n\nslice-whatisslice .component-box p {\n  margin: 0;\n  font-size: 0.9em;\n}\n\nslice-whatisslice .component-box.visual {\n  background-color: rgba(var(--primary-color-rgb), 0.15);\n  border: 2px solid var(--primary-color);\n}\n\nslice-whatisslice .component-box.structural {\n  background-color: rgba(var(--secondary-color-rgb), 0.15);\n  border: 2px solid var(--secondary-color);\n}\n\nslice-whatisslice .component-box.service {\n  background-color: var(--secondary-background-color);\n  border: 2px solid var(--font-primary-color);\n}\n\nslice-whatisslice .component-description {\n  position: absolute;\n  right: 0;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 250px;\n  background-color: var(--primary-background-color);\n  border: 1px solid var(--primary-color-shade);\n  border-radius: var(--border-radius-slice);\n  padding: 15px;\n  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);\n  opacity: 0;\n  visibility: hidden;\n  transition: all 0.3s ease;\n  z-index: 2;\n}\n\nslice-whatisslice .component-description.visible {\n  opacity: 1;\n  visibility: visible;\n}\n\nslice-whatisslice .component-description h4 {\n  margin-top: 0;\n  color: var(--primary-color);\n}\n\nslice-whatisslice .component-description code {\n  display: block;\n  background-color: var(--secondary-background-color);\n  padding: 5px;\n  margin-top: 10px;\n  font-family: monospace;\n  border-radius: 3px;\n}\n\n/* Data Flow */\nslice-whatisslice .data-flow {\n  margin: 20px 0;\n  padding-left: 25px;\n}\n\nslice-whatisslice .data-flow li {\n  margin-bottom: 10px;\n}\n\n/* Component Sections */\nslice-whatisslice .component-section {\n  margin-bottom: 40px;\n}\n\nslice-whatisslice .code-example {\n  background-color: var(--secondary-background-color);\n  border-radius: var(--border-radius-slice);\n  overflow: hidden;\n  margin: 20px 0;\n}\n\nslice-whatisslice pre {\n  margin: 0;\n  padding: 15px;\n  overflow-x: auto;\n}\n\nslice-whatisslice code {\n  font-family: 'Courier New', monospace;\n}\n\nslice-whatisslice .lifecycle-list {\n  list-style: none;\n  padding-left: 0;\n}\n\nslice-whatisslice .lifecycle-list li {\n  margin-bottom: 10px;\n  padding-left: 20px;\n  position: relative;\n}\n\nslice-whatisslice .lifecycle-list li:before {\n  content: \"•\";\n  position: absolute;\n  left: 0;\n  color: var(--primary-color);\n  font-size: 1.5em;\n  line-height: 0.8;\n}\n\n/* Code Files */\nslice-whatisslice .code-files {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n\nslice-whatisslice .code-file {\n  flex: 1;\n  background-color: var(--secondary-background-color);\n  border-radius: var(--border-radius-slice);\n  overflow: hidden;\n}\n\nslice-whatisslice .code-file h4 {\n  background-color: var(--primary-color);\n  color: var(--primary-color-contrast);\n  margin: 0;\n  padding: 8px 15px;\n}\n\n/* Benefits Grid */\nslice-whatisslice .benefits-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 25px;\n  margin: 30px 0;\n}\n\nslice-whatisslice .benefit {\n  background-color: var(--secondary-background-color);\n  padding: 20px;\n  border-radius: var(--border-radius-slice);\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  transition: all 0.3s ease;\n}\n\nslice-whatisslice .benefit:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);\n}\n\nslice-whatisslice .benefit h3 {\n  color: var(--primary-color);\n  margin-top: 0;\n}\n\n/* Comparison Table */\n\n\n/* Get Started Section */\nslice-whatisslice .get-started-section {\n  background-color: var(--secondary-background-color);\n  border-radius: var(--border-radius-slice);\n  padding: 30px;\n  margin: 40px 0 20px;\n  text-align: center;\n}\n\nslice-whatisslice .action-buttons {\n  display: flex;\n  justify-content: center;\n  gap: 20px;\n  margin-top: 25px;\n}\n\nslice-whatisslice .action-button {\n  background-color: var(--primary-color);\n  color: var(--primary-color-contrast);\n  text-decoration: none;\n  padding: 12px 25px;\n  border-radius: var(--border-radius-slice);\n  font-weight: bold;\n  transition: all 0.3s ease;\n  display: inline-block;\n  border: none;\n  cursor: pointer;\n  font-size: 1em;\n}\n\nslice-whatisslice .action-button:hover {\n  background-color: var(--secondary-color);\n  transform: translateY(-3px);\n}\n\nslice-whatisslice .action-button.github {\n  background-color: #333;\n}\n\nslice-whatisslice .action-button.github:hover {\n  background-color: #555;\n}\n\n/* Animations */\n@keyframes fadeIn {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n\n/* Responsive Design */\n@media (max-width: 768px) {\n  slice-whatisslice .intro-section {\n    flex-direction: column;\n    gap: 20px;\n  }\n  \n  slice-whatisslice .principles-grid,\n  slice-whatisslice .benefits-grid {\n    grid-template-columns: 1fr;\n  }\n  \n  slice-whatisslice .tabs {\n    flex-direction: column;\n  }\n  \n  slice-whatisslice .action-buttons {\n    flex-direction: column;\n    align-items: center;\n  }\n  \n  slice-whatisslice .component-description {\n    position: static;\n    width: auto;\n    transform: none;\n    margin-top: 10px;\n    display: none;\n  }\n  \n  slice-whatisslice .component-description.visible {\n    display: block;\n  }\n}\n",
  size: 25433,
  class: SliceComponent_WhatIsSlice
},
"ProjectsSection": {
  name: "ProjectsSection",
  category: "AppComponents",
  categoryType: "Visual",
  componentDependencies: ["ProjectViewer"],
  html: "<div class=\"projects-container\">\n  <div class=\"projects-grid\"></div>\n</div>",
  css: "slice-projects-section {\n  display: block;\n  width: 100%;\n}\n\n.projects-container {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 2rem 0;\n}\n\n/* Projects Grid */\n.section-title {\n  font-size: 2.5rem;\n  color: var(--primary-color);\n  text-align: center;\n  margin-bottom: 3rem;\n  font-weight: 600;\n}\n\n.projects-grid-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));\n  gap: 2rem;\n}\n\n/* Project Cards */\n.project-card {\n  background-color: var(--secondary-background-color);\n  border-radius: var(--border-radius-slice);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n  transition: all 0.3s ease;\n  animation: fadeInUp 0.6s ease-out forwards;\n  opacity: 0;\n  transform: translateY(30px);\n  border: 1px solid var(--primary-color-shade);\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n\n.project-card:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);\n}\n\n.project-card.featured {\n  border-bottom: 4px solid var(--primary-color);\n  position: relative;\n}\n\n.project-card.featured::before {\n  content: '';\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 4px;\n  background: linear-gradient(90deg, var(--primary-color) 0%, var(--secondary-color) 100%);\n  border-radius: 0 0 var(--border-radius-slice) var(--border-radius-slice);\n}\n\n/* Project Image */\n.project-image-container {\n  position: relative;\n  height: 200px;\n  overflow: hidden;\n}\n\n.project-image {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transition: transform 0.3s ease;\n}\n\n.project-card:hover .project-image {\n  transform: scale(1.05);\n}\n\n.status-badge {\n  position: absolute;\n  top: 1rem;\n  right: 1rem;\n  padding: 0.4rem 0.8rem;\n  border-radius: 15px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n\n.featured-badge {\n  position: absolute;\n  top: 1rem;\n  left: 1rem;\n  background-color: var(--success-color);\n  color: var(--success-contrast);\n  padding: 0.4rem 0.8rem;\n  border-radius: 15px;\n  font-size: 0.8rem;\n  font-weight: 600;\n}\n\n.status-active {\n  background-color: var(--success-color);\n  color: var(--success-contrast);\n}\n\n.status-completed {\n  background-color: var(--primary-color);\n  color: var(--primary-color-contrast);\n}\n\n.status-in-development {\n  background-color: var(--warning-color);\n  color: var(--warning-contrast);\n}\n\n.status-archived {\n  background-color: var(--medium-color);\n  color: var(--medium-contrast);\n}\n\n/* Project Content */\n.project-content {\n  padding: 1.5rem;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n\n.project-title {\n  font-size: 1.4rem;\n  color: var(--primary-color);\n  margin: 0 0 1rem 0;\n  font-weight: 600;\n}\n\n.project-description {\n  color: var(--font-secondary-color);\n  line-height: 1.6;\n  margin-bottom: 1.5rem;\n  text-align: justify;\n  flex: 1;\n}\n\n/* Tech Stack */\n.tech-stack {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  margin-bottom: 1.5rem;\n}\n\n.tech-tag {\n  background-color: var(--primary-color);\n  color: var(--primary-color-contrast);\n  padding: 0.3rem 0.6rem;\n  border-radius: 12px;\n  font-size: 0.8rem;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n\n.tech-tag:hover {\n  background-color: var(--secondary-color);\n  color: var(--secondary-color-contrast);\n  transform: scale(1.05);\n}\n\n/* Project Actions */\n.project-actions {\n  display: flex;\n  gap: 0.75rem;\n  margin-top: auto;\n}\n\n.action-button {\n  flex: 1;\n  min-width: 80px;\n}\n\n/* Animations */\n@keyframes fadeInUp {\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n/* Responsive Design */\n@media (max-width: 768px) {\n  .projects-grid-container {\n    grid-template-columns: 1fr;\n  }\n  \n  .project-actions {\n    flex-direction: column;\n  }\n  \n  .action-button {\n    flex: none;\n  }\n  \n  .section-title {\n    font-size: 2rem;\n  }\n}\n\n@media (max-width: 480px) {\n  .projects-container {\n    padding: 1rem;\n  }\n  \n  .project-content {\n    padding: 1rem;\n  }\n  \n  .project-title {\n    font-size: 1.2rem;\n  }\n}",
  size: 7680,
  class: SliceComponent_ProjectsSection
},
"ProjectViewer": {
  name: "ProjectViewer",
  category: "Visual",
  categoryType: "Visual",
  componentDependencies: ["Button"],
  html: "<div class=\"viewer-container\">\n    <!-- Left Column: Thumbnails List -->\n    <div class=\"thumbnails-column\">\n        <div class=\"column-header mobile-hidden\">\n            <h3>Projects</h3>\n        </div>\n        <div class=\"thumbnails-list\">\n            <!-- Items injected via JS -->\n        </div>\n        <div class=\"thumbnails-scroll-hint mobile-only\">\n             ← Scroll to explore →\n        </div>\n    </div>\n\n    <!-- Center Column: Preview Stage -->\n    <div class=\"preview-column\">\n        <div class=\"preview-container\">\n            <div class=\"preview-overlay\"></div>\n            <img class=\"preview-image\" src=\"\" alt=\"Project Preview\" />\n        </div>\n    </div>\n\n    <!-- Right Column: Details Panel -->\n    <div class=\"details-column\">\n        <div class=\"details-panel\">\n            <div class=\"details-header\">\n                <h2 class=\"project-title\">Select a Project</h2>\n                <span class=\"status-badge\"></span>\n            </div>\n            \n            <div class=\"project-actions\"></div>\n\n            <div class=\"project-description\"></div>\n            \n            <div class=\"tech-stack-container\">\n                <h4>Technologies</h4>\n                <div class=\"tech-list\"></div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<!-- Image Modal -->\n<div class=\"image-modal\">\n    <div class=\"close-modal\">&times;</div>\n    <button class=\"modal-nav-btn prev-btn\">❮</button>\n    <img class=\"modal-content\" id=\"expanded-image\" alt=\"Expanded Project View\">\n    <button class=\"modal-nav-btn next-btn\">❯</button>\n</div>",
  css: "slice-project-viewer {\n    display: block;\n    width: 100%;\n    height: 100%;\n}\n\n.viewer-container {\n    display: grid;\n    grid-template-columns: 260px 1fr 340px; /* Adjusted columns back to reasonable ratio */\n    gap: 0;\n    height: 600px; /* Reduced height to fix proportion */\n    background: var(--primary-background-color);\n    border-radius: var(--border-radius-slice, 16px);\n    overflow: hidden;\n    border: 1px solid var(--disabled-color, #eee);\n    box-shadow: 0 20px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.02);\n    transition: all 0.3s ease;\n\n    /* --- Left Column: Thumbnails --- */\n    & .thumbnails-column {\n        background: var(--secondary-background-color, #f8f9fa);\n        border-right: 1px solid var(--disabled-color, #eee);\n        display: flex;\n        flex-direction: column;\n        overflow: hidden;\n        z-index: 2;\n\n        & .column-header {\n            padding: 1.5rem;\n            border-bottom: 1px solid var(--disabled-color, #eee);\n            background: var(--primary-background-color);\n\n            & h3 {\n                margin: 0;\n                font-size: 1.1rem;\n                font-weight: 700;\n                color: var(--font-primary-color);\n                letter-spacing: -0.5px;\n            }\n        }\n\n        & .thumbnails-list {\n            flex: 1;\n            overflow-y: auto;\n            padding: 1.2rem;\n            display: flex;\n            flex-direction: column;\n            gap: 1rem;\n        }\n\n        & .thumbnail-btn {\n            display: flex;\n            flex-direction: column;\n            gap: 0.8rem;\n            padding: 0.8rem;\n            background: var(--primary-background-color);\n            border: 1px solid transparent;\n            border-radius: 10px;\n            cursor: pointer;\n            text-align: left;\n            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);\n            position: relative;\n            overflow: hidden;\n            flex-shrink: 0; /* Prevent shrinking */\n\n            &:hover {\n                transform: translateY(-2px);\n                box-shadow: 0 8px 16px rgba(0,0,0,0.06);\n                z-index: 1;\n\n                & img {\n                    opacity: 1;\n                }\n            }\n\n            &.active {\n                border-color: var(--primary-color);\n                background: var(--primary-background-color);\n                box-shadow: 0 6px 16px rgba(var(--primary-color-rgb), 0.15);\n\n                &::before {\n                    content: '';\n                    position: absolute;\n                    left: 0;\n                    top: 15%;\n                    bottom: 15%;\n                    width: 4px;\n                    border-radius: 0 4px 4px 0;\n                    background: var(--primary-color);\n                }\n\n                & img {\n                    opacity: 1;\n                }\n            }\n\n            & .thumbnail-wrapper {\n                width: 100%;\n                height: 110px;\n                border-radius: 6px;\n                overflow: hidden;\n                background: #000;\n                box-shadow: inset 0 0 0 1px rgba(255,255,255,0.1);\n\n                & img {\n                    width: 100%;\n                    height: 100%;\n                    object-fit: cover;\n                    opacity: 0.7;\n                    transition: all 0.4s ease;\n                }\n            }\n\n            & .thumbnail-title {\n                font-size: 0.95rem;\n                font-weight: 600;\n                color: var(--font-primary-color);\n                padding-left: 0.5rem;\n            }\n        }\n    }\n\n    /* --- Center Column: Preview Stage --- */\n    & .preview-column {\n        padding: 2rem;\n        /* display: flex; align-items: flex-start; */ /* Removed flex to avoid height issues */\n        display: block; \n        position: relative;\n        background: radial-gradient(circle at center, var(--tertiary-background-color) 0%, var(--secondary-background-color) 100%);\n        overflow: hidden;\n        text-align: center; /* Helper to center inline layout if fallback triggers */\n\n        /* Subtle decorative circle behind the image */\n        &::before {\n            content: '';\n            position: absolute;\n            width: 500px;\n            height: 500px;\n            background: var(--primary-color);\n            opacity: 0.03;\n            border-radius: 50%;\n            filter: blur(80px);\n            z-index: 0;\n            top: 50%;\n            left: 50%;\n            transform: translate(-50%, -50%);\n        }\n\n        & .preview-container {\n            width: 100%;\n            height: 100%;\n            position: relative;\n            z-index: 1;\n\n            &.fading {\n                opacity: 0;\n                transform: scale(0.98);\n            }\n            \n            & .preview-overlay {\n                position: absolute;\n                inset: 0;\n                z-index: 10;\n                pointer-events: none;\n            }\n\n            & .preview-scroll-wrapper {\n                width: 100%;\n                height: 100%;\n                overflow-y: auto;\n                overflow-x: hidden;\n                display: flex;\n                flex-direction: column;\n                gap: 2rem;\n                padding: 0 0.5rem 2rem 0; /* Increased bottom padding */\n                scroll-behavior: smooth;\n                box-sizing: border-box;\n\n                &::-webkit-scrollbar {\n                    width: 6px;\n                }\n                &::-webkit-scrollbar-track {\n                    background: transparent;\n                }\n                &::-webkit-scrollbar-thumb {\n                    background-color: rgba(0,0,0,0.1);\n                    border-radius: 10px;\n\n                    &:hover {\n                        background-color: rgba(0,0,0,0.2);\n                    }\n                }\n\n                & .preview-image {\n                    width: 100%;\n                    height: auto;\n                    display: block;\n                    border-radius: 8px;\n                    box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.15);\n                    transition: all 0.4s ease;\n                    flex: 0 0 auto; /* Prevent shrinking */\n                    background: white;\n                    min-height: 200px; /* Force minimum height visibility if loading fails/lags */\n                    object-fit: cover; /* Change to cover to ensure it fills the space if min-height hits */\n                    cursor: zoom-in;\n                }\n            }\n        }\n    }\n\n    /* --- Right Column: Details --- */\n    & .details-column {\n        padding: 2.5rem 2rem;\n        display: flex;\n        flex-direction: column;\n        background: var(--primary-background-color);\n        overflow-y: auto;\n        border-left: 1px solid var(--disabled-color);\n        position: relative;\n\n        & .details-panel {\n            transition: opacity 0.3s ease;\n            height: 100%;\n            display: flex;\n            flex-direction: column;\n\n            & .details-header {\n                margin-bottom: 1.5rem;\n            }\n\n            & .project-title {\n                font-size: 2rem;\n                margin: 0 0 0.8rem 0;\n                color: var(--font-primary-color);\n                line-height: 1.2;\n                font-weight: 800;\n                letter-spacing: -0.5px;\n            }\n\n            & .status-badge {\n                display: inline-flex;\n                align-items: center;\n                padding: 0.3rem 0.8rem;\n                border-radius: 30px;\n                font-size: 0.75rem;\n                font-weight: 700;\n                text-transform: uppercase;\n                letter-spacing: 0.5px;\n                box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);\n\n                &.status-active, &.status-live { background-color: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.2); }\n                &.status-completed { background-color: rgba(59, 130, 246, 0.1); color: #3b82f6; border: 1px solid rgba(59, 130, 246, 0.2); }\n                &.status-in-development { background-color: rgba(245, 158, 11, 0.1); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.2); }\n            }\n\n            & .project-description {\n                font-size: 1rem;\n                line-height: 1.6;\n                color: var(--font-secondary-color);\n                margin-bottom: 2rem;\n                font-weight: 400;\n            }\n\n            & .tech-stack-container {\n                & h4 {\n                    margin: 0 0 1rem 0;\n                    font-size: 0.85rem;\n                    text-transform: uppercase;\n                    color: var(--font-secondary-color);\n                    letter-spacing: 1px;\n                    font-weight: 700;\n                }\n\n                & .tech-list {\n                    display: flex;\n                    flex-wrap: wrap;\n                    gap: 0.6rem;\n                    margin-bottom: 2rem;\n\n                    & .tech-tag {\n                        padding: 0.3rem 0.6rem;\n                        background: var(--primary-background-color);\n                        border: 1px solid var(--disabled-color);\n                        color: var(--font-primary-color);\n                        border-radius: 4px;\n                        font-size: 0.75rem;\n                        font-weight: 500;\n                        box-shadow: 0 1px 2px rgba(0,0,0,0.03);\n                        transition: transform 0.2s;\n\n                        &:hover {\n                            transform: translateY(-2px);\n                            border-color: var(--primary-color);\n                            color: var(--primary-color);\n                        }\n                    }\n                }\n            }\n\n            & .project-actions {\n                margin: 0 0 2rem 0;\n                display: flex;\n                flex-direction: row; /* Explicitly force row */\n                gap: 0.8rem; /* Slightly reduced gap */\n                padding-top: 0;\n                border-top: none;\n                justify-content: center; /* Keep centered */\n                flex-wrap: nowrap; /* Prevent wrapping */\n\n                & button {\n                    min-width: unset; /* Allow flexibility */\n                    flex: 1; /* Distribute space evenly */\n                    max-width: 160px; /* Cap width */\n                    height: 44px;\n                }\n            }\n        }\n    }\n}\n\n.mobile-only { display: none; }\n\n/* --- Responsive Layout --- */\n@media (max-width: 1024px) {\n    .viewer-container {\n        grid-template-columns: 240px 1fr;\n        grid-template-rows: auto auto;\n        height: auto;\n        min-height: 800px;\n    \n        & .thumbnails-column {\n            grid-row: 1 / -1;\n            border-right: 1px solid var(--disabled-color);\n        }\n    \n        & .preview-column {\n            grid-column: 2;\n            height: 400px;\n            padding: 2rem;\n        }\n    \n        & .details-column {\n            grid-column: 2;\n            padding: 2.5rem;\n            height: auto;\n            border-left: none;\n            border-top: 1px solid var(--disabled-color);\n        }\n    \n        & .project-title { font-size: 2.2rem; }\n    }\n}\n\n@media (max-width: 768px) {\n    .viewer-container {\n        display: flex;\n        flex-direction: column;\n        height: auto;\n        min-height: auto;\n        border: none;\n        box-shadow: none;\n        background: transparent;\n        border-radius: 0;\n\n        /* 1. Preview Stage on Top */\n        & .preview-column {\n            order: 1;\n            padding: 1rem 0;\n            height: 320px;\n            background: transparent;\n            margin-bottom: 0;\n            border-radius: 12px;\n\n            &::before { display: none; }\n\n            & .preview-container {\n                border-radius: 16px;\n                box-shadow: 0 10px 30px rgba(0,0,0,0.1);\n                background: var(--tertiary-background-color);\n\n                & .preview-scroll-wrapper .preview-image {\n                    box-shadow: none;\n                }\n            }\n        }\n\n        /* 2. Details in Middle */\n        & .details-column {\n            order: 2;\n            padding: 1.5rem 0;\n            border: none;\n            background: transparent;\n\n            & .project-title { font-size: 2rem; }\n            & .project-description { font-size: 1rem; margin-bottom: 1.5rem; }\n        }\n\n        /* 3. Thumbnails List at Bottom */\n        & .thumbnails-column {\n            order: 3;\n            border-right: none;\n            background: transparent;\n            border-top: 1px solid var(--disabled-color);\n            padding: 1.5rem 0;\n\n            & .thumbnails-list {\n                flex-direction: row;\n                overflow-x: auto;\n                overflow-y: hidden;\n                padding: 0.5rem;\n                gap: 1rem;\n                scroll-padding: 0.5rem;\n            }\n\n            & .thumbnail-btn {\n                min-width: 160px;\n                width: 160px;\n                background: var(--primary-background-color);\n                box-shadow: 0 4px 10px rgba(0,0,0,0.05);\n\n                & .thumbnail-wrapper { height: 90px; }\n            }\n        }\n    }\n\n    .mobile-hidden { display: none; }\n    .mobile-only { \n        display: block; \n        text-align: center; \n        font-size: 0.85rem; \n        color: var(--font-secondary-color); \n        margin-bottom: 1rem; \n        opacity: 0.8; \n        font-weight: 600;\n    }\n}\n\n.mobile-only { display: none; }\n\n/* --- Responsive Layout --- */\n@media (max-width: 1024px) {\n    .viewer-container {\n        grid-template-columns: 240px 1fr; /* Reset to 2 columns for tablet */\n        grid-template-rows: auto auto; /* Flexible rows */\n        height: auto;\n        min-height: 800px;\n    }\n    \n    .thumbnails-column {\n        grid-row: 1 / -1; /* Full height sidebar */\n        border-right: 1px solid var(--disabled-color);\n    }\n    \n    .preview-column {\n        grid-column: 2;\n        height: 400px; /* Taller preview on tablet */\n        padding: 2rem;\n    }\n    \n    .details-column {\n        grid-column: 2;\n        padding: 2.5rem;\n        height: auto;\n        border-left: none; /* Removed border as it's now stacked */\n        border-top: 1px solid var(--disabled-color);\n    }\n    \n    .project-title { font-size: 2.2rem; }\n}\n\n@media (max-width: 768px) {\n    .viewer-container {\n        display: flex;\n        flex-direction: column;\n        height: auto;\n        min-height: auto;\n        border: none;\n        box-shadow: none;\n        background: transparent;\n        border-radius: 0;\n    }\n\n    /* 1. Preview Stage on Top */\n    .preview-column {\n        order: 1;\n        padding: 1rem 0;\n        height: 320px; /* Bigger mobile preview */\n        background: transparent; /* Remove container bg to let page bg show or specific styling */\n        margin-bottom: 0;\n        border-radius: 12px;\n    }\n    \n    .preview-column::before { display: none; } /* Hide the decorative blob on mobile */\n\n    .preview-container {\n        border-radius: 16px;\n        box-shadow: 0 10px 30px rgba(0,0,0,0.1);\n        background: var(--tertiary-background-color);\n    }\n    \n    .preview-image {\n        box-shadow: none; /* Simplify on mobile */\n    }\n\n    /* 2. Details in Middle */\n    .details-column {\n        order: 2;\n        padding: 1.5rem 0;\n        border: none;\n        background: transparent;\n    }\n    \n    .project-title { font-size: 2rem; }\n    .project-description { font-size: 1rem; margin-bottom: 1.5rem; }\n\n    /* 3. Thumbnails List at Bottom (Horizontal Scroll) */\n    .thumbnails-column {\n        order: 3;\n        border-right: none;\n        background: transparent;\n        border-top: 1px solid var(--disabled-color);\n        padding: 1.5rem 0;\n    }\n\n    .mobile-hidden { display: none; }\n    .mobile-only { display: block; text-align: center; font-size: 0.85rem; color: var(--font-secondary-color); margin-bottom: 1rem; opacity: 0.8; font-weight: 600;}\n\n    .thumbnails-list {\n        flex-direction: row;\n        overflow-x: auto;\n        overflow-y: hidden;\n        padding: 0.5rem;\n        gap: 1rem;\n        scroll-padding: 0.5rem;\n    }\n\n    .thumbnail-btn {\n        min-width: 160px;\n        width: 160px;\n        background: var(--primary-background-color);\n        box-shadow: 0 4px 10px rgba(0,0,0,0.05);\n    }\n    \n    .thumbnail-wrapper {\n        height: 90px;\n    }\n}\n\n/* --- Image Modal --- */\n.image-modal {\n    display: none;\n    position: fixed;\n    z-index: 10000;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    overflow: hidden;\n    background-color: rgba(0,0,0,0.95); /* Increased opacity to replace backdrop-filter */\n    opacity: 0;\n    transition: opacity 0.25s ease-out; /* Faster, simpler transition */\n    align-items: center;\n    justify-content: center;\n    will-change: opacity;\n}\n\n.image-modal.show {\n    opacity: 1;\n}\n\n.image-modal .modal-content {\n    max-width: 90%;\n    max-height: 90vh;\n    object-fit: contain;\n    transform: scale(0.95);\n    transition: transform 0.25s ease-out; /* Removed expensive elastic bounce */\n    border-radius: 4px; /* Reduced radius for performance */\n    box-shadow: 0 10px 40px rgba(0,0,0,0.5);\n    will-change: transform;\n}\n\n.image-modal.show .modal-content {\n    transform: scale(1);\n}\n\n.image-modal .close-modal {\n    position: absolute;\n    top: 20px;\n    right: 20px;\n    color: #f1f1f1;\n    font-size: 32px; /* Adjusted size */\n    font-weight: 300; /* Thinner weight */\n    cursor: pointer;\n    z-index: 10001;\n    line-height: 1;\n    background: rgba(255, 255, 255, 0.15);\n    width: 44px;\n    height: 44px;\n    min-width: 44px; /* Ensure circular shape */\n    min-height: 44px;\n    border-radius: 50%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding: 0; /* Reset padding */\n    transition: background 0.2s ease, transform 0.2s ease;\n    backdrop-filter: blur(4px); /* Keep blur only on small button if needed */\n}\n\n.image-modal .close-modal:hover {\n    background: rgba(255, 255, 255, 0.3);\n    color: #fff;\n    transform: scale(1.05);\n}\n\n\n.modal-nav-btn {\n    position: absolute;\n    top: 50%;\n    transform: translateY(-50%);\n    background: rgba(255, 255, 255, 0.15);\n    color: #f1f1f1;\n    border: none;\n    cursor: pointer;\n    z-index: 10001;\n    border-radius: 50%;\n    width: 50px;\n    height: 50px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    font-size: 1.5rem;\n    transition: background 0.2s ease, transform 0.2s ease;\n    backdrop-filter: blur(4px);\n    user-select: none;\n}\n\n.modal-nav-btn:hover {\n    background: rgba(255, 255, 255, 0.3);\n    color: #fff;\n    transform: translateY(-50%) scale(1.1);\n}\n\n.modal-nav-btn.prev-btn {\n    left: 20px;\n}\n\n.modal-nav-btn.next-btn {\n    right: 20px;\n}\n\n@media (max-width: 768px) {\n    .modal-nav-btn {\n        width: 40px;\n        height: 40px;\n        font-size: 1.2rem;\n    }\n    \n    .modal-nav-btn.prev-btn {\n        left: 10px;\n    }\n    \n    .modal-nav-btn.next-btn {\n        right: 10px;\n    }\n}\n\n",
  size: 30327,
  class: SliceComponent_ProjectViewer
},
"BuiltWithBadge": {
  name: "BuiltWithBadge",
  category: "Visual",
  categoryType: "Visual",
  componentDependencies: [],
  html: "<div class=\"slice-built-with-badge-container\">\n    Built with <span class=\"slice-framework-name\">Slice.js</span>\n</div>",
  css: "slice-built-with-badge {\n    position: fixed !important;\n    bottom: 2rem !important;\n    left: 2rem !important;\n    z-index: 10000 !important;\n    font-family: inherit;\n    cursor: pointer;\n    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);\n    display: block; /* Ensure it has layout */\n    width: fit-content;\n}\n\nslice-built-with-badge:hover {\n    transform: scale(1.05) rotate(2deg);\n}\n\nslice-built-with-badge .slice-built-with-badge-container {\n    background: var(--primary-background-color);\n    padding: 0.6rem 1rem;\n    border-radius: 50px;\n    box-shadow: 0 4px 15px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05);\n    display: flex;\n    align-items: center;\n    gap: 0.4rem;\n    font-size: 0.85rem;\n    color: var(--font-secondary-color);\n    border: 1px solid var(--disabled-color);\n    backdrop-filter: blur(8px);\n    -webkit-backdrop-filter: blur(8px);\n}\n\nslice-built-with-badge .slice-framework-name {\n    font-weight: 800;\n    background: linear-gradient(135deg, var(--primary-color) 0%, #a855f7 100%);\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n}\n\n@media (max-width: 768px) {\n    slice-built-with-badge {\n        bottom: 1rem !important;\n        left: 1rem !important;\n    }\n    \n    slice-built-with-badge .slice-built-with-badge-container {\n        padding: 0.5rem 0.8rem;\n        font-size: 0.75rem;\n    }\n}",
  size: 2224,
  class: SliceComponent_BuiltWithBadge
}
};


export const SLICE_BUNDLE = {
  metadata: {
  "version": "2.0.0",
  "type": "route",
  "route": "multiroute-Portfolio",
  "bundleKey": "multiroute-portfolio",
  "file": "slice-bundle.multiroute-portfolio.js",
  "generated": "2026-04-04T18:21:00.004Z",
  "totalSize": 1795924,
  "componentCount": 26,
  "strategy": "hybrid",
  "minified": false,
  "obfuscated": false,
  "integrity": "sha256:676d7c12446cf9fc85bb130ddfac22ee40a4af3462594af2cbd41f8a8a532a79"
},
  components: SLICE_BUNDLE_COMPONENTS
};

// Auto-registration of components
// Store the registration Promise so init() can await it before building components.
if (window.slice && window.slice.controller) {
  window.__slicePendingRegistrations = window.__slicePendingRegistrations || [];
  window.__slicePendingRegistrations.push(slice.controller.registerBundle(SLICE_BUNDLE));
}
