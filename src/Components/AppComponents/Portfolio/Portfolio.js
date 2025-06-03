export default class Portfolio extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);
      
      this.$main = this.querySelector('.portfolio-main');
      this.$content = this.querySelector('.portfolio-content');
      
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

      // Create footer
      const footer = await this.createFooter();

      // Append components to layout
      this.insertBefore(navbar, this.firstChild);
      this.$content.appendChild(portfolioRoutes);
      this.appendChild(footer);

      // Handle route changes
      //this.handleRouteChange();
   }

   async createFooter() {
      const footer = document.createElement('footer');
      footer.classList.add('portfolio-footer');
      
      const socialLinks = document.createElement('div');
      socialLinks.classList.add('social-links');
      
      const socialData = [
         { name: 'GitHub', url: 'https://github.com/vkneider', icon: 'github' },
         { name: 'LinkedIn', url: 'https://www.linkedin.com/in/vkneider/', icon: 'linkedin' },
         { name: 'Email', url: 'mailto:victor.kneider@email.com', icon: 'email' }
      ];

      for (const social of socialData) {
         const link = document.createElement('a');
         link.href = social.url;
         link.target = '_blank';
         link.rel = 'noopener noreferrer';
         link.classList.add('social-link');
         link.innerHTML = `<span>${social.name}</span>`;
         socialLinks.appendChild(link);
      }

      const copyright = document.createElement('div');
      copyright.classList.add('footer-info');
      copyright.innerHTML = `
         <p>&copy; ${new Date().getFullYear()} Victor Kneider. All rights reserved.</p>
         <p>Powered by <a href="https://github.com/victorkneider/slice-js" target="_blank">Slice.js</a></p>
      `;

      footer.appendChild(socialLinks);
      footer.appendChild(copyright);
      return footer;
   }

   handleRouteChange() {
   // Simplemente añadir una clase CSS para transiciones suaves
   this.$content.classList.add('smooth-transitions');
}


}

customElements.define('slice-portfolio', Portfolio);