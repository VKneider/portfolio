export default class ProjectGrid extends HTMLElement {
  static props = {
    projects: { type: 'array', default: [] }
  };

  constructor(props) {
    super();
    slice.attachTemplate(this);

    this.$grid = this.querySelector('.projects-v2-grid');
    this._projects = [];
    this._initialized = false;
    this._token = 0;

    slice.controller.setComponentProps(this, props);
    this.debuggerProps = ['projects'];
  }

  set projects(value) {
    this._projects = Array.isArray(value) ? value : [];
    if (this._initialized) this.render();
  }

  get projects() {
    return this._projects;
  }

  async init() {
    this._initialized = true;
    await this.render();
  }

  async render() {
    if (!this.$grid) return;

    const token = ++this._token;
    slice.controller.destroyByContainer(this.$grid);
    this.$grid.innerHTML = '';

    for (const project of this.projects) {
      const card = await slice.build('ProjectShowcaseCard', { project });
      if (token !== this._token) {
        if (card) slice.controller.destroyComponent(card);
        return;
      }
      if (card) this.$grid.appendChild(card);
    }
  }
}

customElements.define('slice-project-grid', ProjectGrid);
