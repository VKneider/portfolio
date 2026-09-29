import { teachingData } from '../TeachingIndex/data/teaching.js';

const brandTitle = 'Victor Kneider — Software Design & Architecture';

export default class TeachingCourse extends HTMLElement {
  constructor(props) {
    super();
    slice.attachTemplate(this);

    this.$breadcrumb = this.querySelector('.teaching-course__breadcrumb');
    this.$header = this.querySelector('.teaching-course__header');
    this.$eyebrow = this.querySelector('.teaching-course__eyebrow');
    this.$name = this.querySelector('.teaching-course__name');
    this.$description = this.querySelector('.teaching-course__description');
    this.$repo = this.querySelector('.teaching-course__repo');
    this.$sectionTitle = this.querySelector('.teaching-course__section-title');
    this.$toc = this.querySelector('.teaching-course__toc');
    this.$syllabus = this.querySelector('.teaching-course__syllabus');
    this.$notFound = this.querySelector('.teaching-course__not-found');

    // The not-found block is re-rendered with innerHTML, so its internal link is
    // intercepted by delegation: nothing intercepts plain anchors, so an
    // <a href="/teaching"> would trigger a full page reload.
    this.$notFound.addEventListener('click', (event) => {
      const link = event.target.closest?.('a[href^="/"]');
      if (!link) return;
      event.preventDefault();
      slice.router.navigate(link.getAttribute('href'));
    });

    this.course = null;
    this.courses = teachingData.courses || [];
    this.params = {};
    this._initialized = false;
    this.$breadcrumbs = null;
    slice.controller.setComponentProps(this, props);
  }

  async init() {
    this._initialized = true;
    this._renderContent();
    const [breadcrumbs, sectionTitle] = await Promise.all([
      slice.build('Breadcrumbs', {
        items: [
          { text: 'Teaching', path: '/teaching' },
          { text: this.course?.name || 'Course' }
        ],
        separator: '›'
      }),
      slice.build('SectionTitle', { text: 'Syllabus' })
    ]);
    this.$breadcrumbs = breadcrumbs;
    if (breadcrumbs && this.$breadcrumb) this.$breadcrumb.replaceChildren(breadcrumbs);
    if (sectionTitle && this.$sectionTitle) this.$sectionTitle.replaceChildren(sectionTitle);
  }

  set params(value) {
    this._params = value && typeof value === 'object' ? value : {};
    this.slug = this._params.slug || '';
    this.course = this.courses.find((course) => course.slug === this.slug) || null;
    if (this._initialized) this._renderContent();
  }

  get params() {
    return this._params;
  }

  _renderContent() {
    if (!this.$header) return;

    this.$notFound.hidden = Boolean(this.course);
    this.$header.hidden = !this.course;
    this.$syllabus.hidden = !this.course;
    this.$breadcrumb.hidden = !this.course;

    if (!this.course) {
      document.title = `Course Not Found | Teaching | ${brandTitle}`;
      this.$notFound.innerHTML = `
        <span class="teaching-course__not-found-mark" aria-hidden="true">404</span>
        <h1>Course not found</h1>
        <p>There is no course with the address <code>${this._escape(this.slug)}</code>.</p>
        <a class="teaching-course__back-link" href="/teaching">Browse all courses <span aria-hidden="true">→</span></a>
      `;
      return;
    }

    const { name, code, description, repo, units } = this.course;
    document.title = `${name} | Teaching | ${brandTitle}`;
    this.$eyebrow.textContent = this.course.institution
      ? `Course syllabus · ${this.course.institution}`
      : 'Course syllabus';
    this.$name.textContent = name;
    this.$description.textContent = description;
    if (code) {
      const badge = document.createElement('span');
      badge.className = 'teaching-course__code';
      badge.textContent = code;
      this.$name.appendChild(badge);
    }
    this.$repo.hidden = !repo;
    if (repo) this.$repo.href = repo;
    if (this.$breadcrumbs) {
      slice.controller.setComponentProps(this.$breadcrumbs, {
        items: [
          { text: 'Teaching', path: '/teaching' },
          { text: name }
        ]
      });
    }
    this.$toc.innerHTML = units.map((unit, index) => `
      <details class="teaching-unit" ${index === 0 ? 'open' : ''}>
        <summary class="teaching-unit__summary">
          <span class="teaching-unit__number">${String(index + 1).padStart(2, '0')}</span>
          <span class="teaching-unit__title">${this._escape(unit.title)}</span>
          <span class="teaching-unit__count">${unit.topics.length} topics</span>
          <span class="teaching-unit__chevron" aria-hidden="true">⌄</span>
        </summary>
        ${unit.url ? `<a class="teaching-unit__source" href="${this._escape(unit.url)}" target="_blank" rel="noopener noreferrer">View unit on GitHub <span aria-hidden="true">↗</span></a>` : ''}
        <ol class="teaching-unit__topics">
          ${unit.topics.map((topic) => `
            <li class="teaching-topic">
              ${topic.url
                ? `<a class="teaching-topic__link" href="${this._escape(topic.url)}" target="_blank" rel="noopener noreferrer">${this._escape(topic.title)} <span aria-hidden="true">↗</span></a>`
                : `<span>${this._escape(topic.title)}</span>`}
            </li>
          `).join('')}
        </ol>
      </details>
    `).join('');

  }

  _escape(value) {
    const element = document.createElement('span');
    element.textContent = String(value ?? '');
    return element.innerHTML;
  }
}

customElements.define('slice-teaching-course', TeachingCourse);
