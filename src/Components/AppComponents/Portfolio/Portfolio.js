export default class Portfolio extends HTMLElement {
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
         { name: 'GitHub', url: 'https://github.com/VKneider', icon: 'github' },
         { name: 'LinkedIn', url: 'https://www.linkedin.com/in/vkneider/', icon: 'linkedin' },
         { name: 'Email', url: 'mailto:victorkneider@gmail.com', icon: 'email' }
      ];

      // Populate social links
      this.$socialLinks.innerHTML = '';
      socialData.forEach(social => {
         const link = document.createElement('a');
         link.href = social.url;
         link.target = '_blank';
         link.rel = 'noopener noreferrer';
         link.classList.add('social-link');
         link.innerHTML = `<span>${social.name}</span>`;
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

customElements.define('slice-portfolio', Portfolio);