export default class TeachingIndex extends HTMLElement {
  constructor(props) {
    super();
    slice.attachTemplate(this);
    slice.controller.setComponentProps(this, props);
    this.debuggerProps = [];
    this.courses = [];
  }

  async init() {
    this.$grid = this.querySelector('.teaching-grid');
    this.$title = this.querySelector('.teaching-index__title');
    this.$subtitle = this.querySelector('.teaching-index__subtitle');

    // Nothing intercepts plain anchors, so an <a href> would trigger a full
    // page reload instead of a router navigation. Delegated on the grid so it
    // survives the innerHTML re-render below.
    this.$grid.addEventListener('click', (event) => {
      const link = event.target.closest?.('a.teaching-card__link');
      if (!link) return;
      event.preventDefault();
      slice.router.navigate(link.getAttribute('href'));
    });

    await this.loadContent();
    await this.render();

    slice.translator.watch(this, async () => {
      await this.loadContent();
      await this.render();
    });
  }

  async loadContent() {
    const document = await slice.t.content('teaching');
    this.courses = Array.isArray(document?.courses) ? document.courses : [];
  }

  async render() {
    if (!this.$grid) return;

    const title = await slice.build('SectionTitle', { text: slice.t('teaching.title') });
    if (title) {
      slice.controller.destroyByContainer(this.$title);
      this.$title.replaceChildren(title);
    }
    this.$subtitle.textContent = slice.t('teaching.subtitle');

    slice.controller.destroyByContainer(this.$grid);
    this.$grid.innerHTML = this.courses.map((course) => `
      <article class="teaching-card">
        <header class="teaching-card__header">
          <h3 class="teaching-card__name">${this.escape(course.name)}</h3>
          ${course.code ? `<span class="teaching-card__code">${this.escape(course.code)}</span>` : ''}
        </header>
        <p class="teaching-card__description">${this.escape(course.description)}</p>
        ${course.institution ? `<span class="teaching-card__institution">${this.escape(slice.t('teaching.taughtAt', { institution: course.institution }))}</span>` : ''}
        <a class="teaching-card__link" href="${this.escape(slice.href(`/teaching/${course.slug}`))}">${this.escape(slice.t('teaching.viewSyllabus'))} →</a>
      </article>
    `).join('');
  }

  escape(value) {
    const element = document.createElement('span');
    element.textContent = String(value ?? '');
    return element.innerHTML;
  }
}

customElements.define('slice-teaching-index', TeachingIndex);
