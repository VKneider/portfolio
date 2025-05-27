import { projectsData } from "./data.js";

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
         const projectCard = await slice.build('ProjectCard', {
            project: project,
            animationDelay: index * 0.1
         });
         
         projectsGrid.appendChild(projectCard);
      }

      this.$grid.appendChild(sectionTitle);
      this.$grid.appendChild(projectsGrid);
   }
}

customElements.define('slice-projects-section', ProjectsSection);