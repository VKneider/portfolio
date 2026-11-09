export default class ProjectShowcaseCard extends HTMLElement {
  static props = {
    project: { type: 'object', default: null }
  };

  constructor(props) {
    super();
    slice.attachTemplate(this);

    this.$card = this.querySelector('.project-v2-card');
    this._project = null;
    this._initialized = false;

    slice.controller.setComponentProps(this, props);
    this.debuggerProps = ['project'];
  }

  set project(value) {
    this._project = value && typeof value === 'object' ? value : null;
    if (this._initialized) this.render();
  }

  get project() {
    return this._project;
  }

  init() {
    this._initialized = true;
    this.render();
  }

  render() {
    if (!this.$card) return;

    const project = this.project;
    if (!project) {
      this.$card.innerHTML = '';
      return;
    }

    const route = `/projects/${project.slug}`;
    const href = slice.href(route);
    const technologies = (project.technologies || []).slice(0, 3).join(' · ');

    this.$card.innerHTML = `
      <a class="project-v2-card-media" href="${this.escape(href)}" data-route="${this.escape(route)}">
        <img src="${this.escape(project.image)}" alt="${this.escape(project.title)}" />
        <span class="project-v2-year">${this.escape(project.year)}</span>
      </a>
      <div class="project-v2-card-body">
        <p class="project-v2-eyebrow">${this.escape(project.category)} · ${this.escape(project.year)}</p>
        <h2>
          <a href="${this.escape(href)}" data-route="${this.escape(route)}">${this.escape(project.title)}</a>
        </h2>
        <p class="project-v2-summary">${this.escape(project.summary)}</p>
        <p class="project-v2-meta">${this.escape(project.role)}${technologies ? ` · ${this.escape(technologies)}` : ''}</p>
        <a class="project-v2-link" href="${this.escape(href)}" data-route="${this.escape(route)}">${this.escape(slice.t('projects.index.readCase'))} →</a>
      </div>
    `;
  }

  escape(value) {
    const element = document.createElement('span');
    element.textContent = String(value ?? '');
    return element.innerHTML;
  }
}

customElements.define('slice-project-showcase-card', ProjectShowcaseCard);
