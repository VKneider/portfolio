export default class ProjectCompactList extends HTMLElement {
  static props = {
    projects: { type: 'array', default: [] },
    headingKey: { type: 'string', default: 'projects.index.more' }
  };

  constructor(props) {
    super();
    slice.attachTemplate(this);

    this.$heading = this.querySelector('.projects-v2-compact-heading');
    this.$rows = this.querySelector('.projects-v2-compact-rows');
    this._projects = [];
    this._initialized = false;

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

  get headingKey() {
    return this._headingKey || 'projects.index.more';
  }

  set headingKey(value) {
    this._headingKey = value || 'projects.index.more';
    if (this._initialized && this.$heading) {
      this.$heading.textContent = slice.t(this.headingKey);
    }
  }

  init() {
    this._initialized = true;
    if (this.$heading) this.$heading.textContent = slice.t(this.headingKey);
    this.render();
  }

  render() {
    if (!this.$rows) return;

    this.$rows.innerHTML = this.projects.map((project) => {
      const route = `/projects/${project.slug}`;
      const href = slice.href(route);

      return `
        <a class="project-v2-compact-row" href="${this.escape(href)}" data-route="${this.escape(route)}">
          <span class="project-v2-compact-year">${this.escape(project.year)}</span>
          <span class="project-v2-compact-title">${this.escape(project.title)}</span>
          <span class="project-v2-compact-category">${this.escape(project.category)}</span>
          <span class="project-v2-compact-link">${this.escape(slice.t('projects.index.readCase'))} →</span>
        </a>
      `;
    }).join('');
  }

  escape(value) {
    const element = document.createElement('span');
    element.textContent = String(value ?? '');
    return element.innerHTML;
  }
}

customElements.define('slice-project-compact-list', ProjectCompactList);
