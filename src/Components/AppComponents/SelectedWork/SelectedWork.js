export default class SelectedWork extends HTMLElement {
  static props = {
    projects: { type: 'array', default: [] },
    headingKey: { type: 'string', default: 'projects.index.selectedWork' }
  };

  constructor(props) {
    super();
    slice.attachTemplate(this);

    this.$heading = this.querySelector('.selected-work__heading');
    this.$grid = this.querySelector('.selected-work__grid');
    this.$more = this.querySelector('.selected-work__more');
    this._projects = [];
    this._headingKey = 'projects.index.selectedWork';
    this._initialized = false;
    this._token = 0;

    slice.controller.setComponentProps(this, props);
    this.debuggerProps = ['projects', 'headingKey'];
  }

  set projects(value) {
    this._projects = Array.isArray(value) ? value : [];
    if (this._initialized) this.render();
  }

  get projects() {
    return this._projects;
  }

  set headingKey(value) {
    this._headingKey = value || 'projects.index.selectedWork';
    if (this._initialized) this.render();
  }

  get headingKey() {
    return this._headingKey;
  }

  async init() {
    this._initialized = true;
    if (this.$more) this.$more.href = slice.href('/projects');
    await this.render();
  }

  async render() {
    if (!this.$grid) return;

    const token = ++this._token;

    slice.controller.destroyByContainer(this.$grid);
    this.$grid.replaceChildren();

    await this.renderHeading();

    const projects = this.projects.slice(0, 3);
    if (!projects.length) return;

    for (const project of projects) {
      if (token !== this._token) return;

      const route = `/projects/${project.slug}`;
      const item = document.createElement('a');
      item.className = 'selected-work__item';
      item.href = slice.href(route);
      item.dataset.route = route;
      item.innerHTML = `
        <span class="selected-work__media">
          <img src="${this.escape(project.image)}" alt="" loading="lazy" decoding="async" />
        </span>
        <span class="selected-work__meta">${this.escape(project.category)} · ${this.escape(project.year)}</span>
        <span class="selected-work__title">${this.escape(project.title)}</span>
        <span class="selected-work__summary">${this.escape(project.summary)}</span>
        <span class="selected-work__link">${this.escape(slice.t('projects.index.readCase'))} <span aria-hidden="true">→</span></span>
      `;

      const image = item.querySelector('img');
      if (image) {
        const markLoaded = () => image.classList.add('loaded');
        image.addEventListener('load', markLoaded, { once: true });
        if (image.complete && image.naturalWidth > 0) markLoaded();
      }

      this.$grid.appendChild(item);
    }
  }

  async renderHeading() {
    if (!this.$heading) return;

    slice.controller.destroyByContainer(this.$heading);
    this.$heading.replaceChildren();

    const title = await slice.build('SectionTitle', {
      text: slice.t(this.headingKey)
    });

    if (title) this.$heading.appendChild(title);
  }

  escape(value) {
    const element = document.createElement('span');
    element.textContent = String(value ?? '');
    return element.innerHTML;
  }
}

customElements.define('slice-selected-work', SelectedWork);
