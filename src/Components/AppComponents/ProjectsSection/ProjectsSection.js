import  projectsData from "./data.js";

export default class ProjectsSection extends HTMLElement {
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

customElements.define('slice-projects-section', ProjectsSection);