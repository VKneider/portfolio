const GRID_LIMIT = 6;
const FEATURED_LIMIT = 4;

export default class ProjectsSection extends HTMLElement {
  constructor(props) {
    super();
    slice.attachTemplate(this);

    this.$content = this.querySelector('.projects-v2-content');

    slice.controller.setComponentProps(this, props);
    this.debuggerProps = [];
    this.projects = [];
    this._renderToken = 0;
  }

  async init() {
    await this.loadContent();
    await this.render();

    this.addEventListener('click', (event) => {
      const link = event.target.closest?.('a[data-route]');
      if (!link) return;
      event.preventDefault();
      slice.router.navigate(link.dataset.route);
    });

    slice.translator.watch(this, async () => {
      await this.loadContent();
      await this.render();
    });
  }

  async loadContent() {
    const document = await slice.t.content('projects');
    this.projects = Array.isArray(document?.records) ? document.records : [];
  }

  async render() {
    if (!this.$content) return;

    const token = ++this._renderToken;
    slice.controller.destroyByContainer(this.$content);
    this.$content.innerHTML = '';

    const projects = [...this.projects].sort((a, b) => (a.order || 0) - (b.order || 0));

    if (!projects.length) {
      this.$content.innerHTML = `<p class="projects-v2-empty">${this.escape(slice.t('projects.index.empty'))}</p>`;
      return;
    }

    if (projects.length <= GRID_LIMIT) {
      const grid = await slice.build('ProjectGrid', { projects });
      if (token !== this._renderToken) {
        if (grid) slice.controller.destroyComponent(grid);
        return;
      }
      if (grid) this.$content.appendChild(grid);
      return;
    }

    const featured = projects.slice(0, FEATURED_LIMIT);
    const more = projects.slice(FEATURED_LIMIT);

    const grid = await slice.build('ProjectGrid', { projects: featured });
    const list = await slice.build('ProjectCompactList', { projects: more });

    if (token !== this._renderToken) {
      if (grid) slice.controller.destroyComponent(grid);
      if (list) slice.controller.destroyComponent(list);
      return;
    }

    if (grid) this.$content.appendChild(grid);
    if (list) this.$content.appendChild(list);
  }

  escape(value) {
    const element = document.createElement('span');
    element.textContent = String(value ?? '');
    return element.innerHTML;
  }
}

customElements.define('slice-projects-section', ProjectsSection);
