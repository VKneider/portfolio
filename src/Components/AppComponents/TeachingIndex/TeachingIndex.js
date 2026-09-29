import { teachingData } from './data/teaching.js';

const brandTitle = 'Victor Kneider — Software Design & Architecture';

export default class TeachingIndex extends HTMLElement {
  constructor(props) {
    super();
    slice.attachTemplate(this);
    slice.controller.setComponentProps(this, props);
    this.debuggerProps = [];
  }

  init() {
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

    this.courses = teachingData.courses || [];
    return this.render();
  }

  async render() {
    if (!this.$grid) return;
    document.title = `Teaching | ${brandTitle}`;
    const title = await slice.build('SectionTitle', { text: 'Teaching' });
    if (title) this.$title.replaceChildren(title);
    this.$subtitle.textContent = 'A selection of courses, syllabi, and learning resources I develop and share. Each entry links to its public repository.';

    slice.controller.destroyByContainer(this.$grid);
    this.$grid.innerHTML = this.courses.map(c => `
      <article class="teaching-card">
        <header class="teaching-card__header">
          <h3 class="teaching-card__name">${c.name}</h3>
          ${c.code ? `<span class="teaching-card__code">${c.code}</span>` : ''}
        </header>
        <p class="teaching-card__description">${c.description}</p>
        ${c.institution ? `<span class="teaching-card__institution">Taught at ${c.institution}</span>` : ''}
        <a class="teaching-card__link" href="/teaching/${c.slug}">View syllabus →</a>
      </article>
    `).join('');
  }
}

customElements.define('slice-teaching-index', TeachingIndex);
