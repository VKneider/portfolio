import { teachingData } from './data/teaching.js';

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
    this.courses = teachingData.courses || [];
    return this.render();
  }

  async render() {
    if (!this.$grid) return;
    const title = await slice.build('SectionTitle', { text: 'Teaching' });
    if (title) this.$title.replaceChildren(title);
    this.$subtitle.textContent = 'A selection of courses, syllabi, and learning resources I develop and share. Each entry links to its public repository.';

    this.$grid.innerHTML = this.courses.map(c => `
      <article class="teaching-card">
        <header class="teaching-card__header">
          <h3 class="teaching-card__name">${c.name}</h3>
          ${c.code ? `<span class="teaching-card__code">${c.code}</span>` : ''}
        </header>
        <p class="teaching-card__description">${c.description}</p>
        ${c.institution ? `<span class="teaching-card__institution">Taught at ${c.institution}</span>` : ''}
        <a class="teaching-card__link" href="/teaching/${c.slug}" data-navigo>
          View syllabus →
        </a>
      </article>
    `).join('');
  }
}

customElements.define('slice-teaching-index', TeachingIndex);
