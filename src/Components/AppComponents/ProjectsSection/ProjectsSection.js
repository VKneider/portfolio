export default class ProjectsSection extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);

      this.$container = this.querySelector('.projects-container');
      this.$grid = this.querySelector('.projects-grid');

      slice.controller.setComponentProps(this, props);
      this.debuggerProps = [];
      this.projectsData = [];
      this.projectViewer = null;
      this.activeProjectId = null;
   }

   async init() {
      await this.loadContent();
      await this.renderProjects();

      slice.translator.watch(this, async () => {
         const state = this.projectViewer?.activeProject?.id ?? this.activeProjectId;
         await this.loadContent();
         await this.renderProjects();
         if (state !== null && state !== undefined) {
            this.projectViewer?.selectProject(state);
         }
      });
   }

   async loadContent() {
      const document = await slice.t.content('projects');
      this.projectsData = Array.isArray(document?.records) ? document.records : [];
   }

   async renderProjects() {
      slice.controller.destroyByContainer(this.$grid);
      this.$grid.innerHTML = '';

      const sectionTitle = await slice.build('SectionTitle', {
         text: slice.t('projects.title', { count: this.projectsData.length })
      });
      this.$grid.appendChild(sectionTitle);

      const sortedProjects = [...this.projectsData].sort((a, b) => {
         if (a.featured !== b.featured) {
            return Number(b.featured) - Number(a.featured);
         }
         return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

      this.projectViewer = await slice.build('ProjectViewer', {
         projects: sortedProjects
      });
      this.$grid.appendChild(this.projectViewer);
   }
}

customElements.define('slice-projects-section', ProjectsSection);
