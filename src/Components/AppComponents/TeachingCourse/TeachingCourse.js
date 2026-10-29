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
      const link = event.target.closest?.('a[href]');
      if (!link) return;
      event.preventDefault();
      slice.router.navigate(link.getAttribute('href'));
    });

    this.$toc.addEventListener('toggle', (event) => {
      const details = event.target;
      if (!(details instanceof HTMLDetailsElement)) return;
      const index = Number(details.dataset.unitIndex);
      if (Number.isNaN(index)) return;
      if (details.open) this.openUnits.add(index);
      else this.openUnits.delete(index);
    }, true);

    this.course = null;
    this.courses = [];
    this.params = {};
    this.openUnits = new Set([0]);
    this._initialized = false;
    this.$breadcrumbs = null;
    slice.controller.setComponentProps(this, props);
  }

  async init() {
    await this.loadContent();
    this._initialized = true;
    this._renderContent();

    const [breadcrumbs, sectionTitle] = await Promise.all([
      slice.build('Breadcrumbs', {
        items: [
          { text: slice.t('teaching.title'), path: '/teaching' },
          { text: this.course?.name || slice.t('teaching.course') }
        ],
        separator: '›'
      }),
      slice.build('SectionTitle', { text: slice.t('teaching.syllabus') })
    ]);
    this.$breadcrumbs = breadcrumbs;
    if (breadcrumbs && this.$breadcrumb) this.$breadcrumb.replaceChildren(breadcrumbs);
    if (sectionTitle && this.$sectionTitle) this.$sectionTitle.replaceChildren(sectionTitle);

    slice.translator.watch(this, async () => {
      this.captureOpenUnits();
      await this.loadContent();
      await this._refreshChrome();
      this._renderContent();
    });
  }

  captureOpenUnits() {
    const open = [...this.$toc.querySelectorAll('details[open]')]
      .map((details) => Number(details.dataset.unitIndex))
      .filter((index) => !Number.isNaN(index));
    this.openUnits = new Set(open);
  }

  async loadContent() {
    const document = await slice.t.content('teaching');
    this.courses = Array.isArray(document?.courses) ? document.courses : [];
    this.course = this.courses.find((course) => course.slug === this.slug) || null;
  }

  set params(value) {
    this._params = value && typeof value === 'object' ? value : {};
    const slug = this._params.slug || '';
    if (slug !== this.slug) this.openUnits = new Set([0]);
    this.slug = slug;
    this.course = this.courses.find((course) => course.slug === this.slug) || null;
    if (this._initialized) this._renderContent();
  }

  get params() {
    return this._params;
  }

  async _refreshChrome() {
    const [breadcrumbs, sectionTitle] = await Promise.all([
      slice.build('Breadcrumbs', {
        items: [
          { text: slice.t('teaching.title'), path: '/teaching' },
          { text: this.course?.name || slice.t('teaching.course') }
        ],
        separator: '›'
      }),
      slice.build('SectionTitle', { text: slice.t('teaching.syllabus') })
    ]);
    this.$breadcrumbs = breadcrumbs;
    if (breadcrumbs && this.$breadcrumb) {
      slice.controller.destroyByContainer(this.$breadcrumb);
      this.$breadcrumb.replaceChildren(breadcrumbs);
    }
    if (sectionTitle && this.$sectionTitle) {
      slice.controller.destroyByContainer(this.$sectionTitle);
      this.$sectionTitle.replaceChildren(sectionTitle);
    }
  }

  _renderContent() {
    if (!this.$header) return;

    this.$notFound.hidden = Boolean(this.course);
    this.$header.hidden = !this.course;
    this.$syllabus.hidden = !this.course;
    this.$breadcrumb.hidden = !this.course;

    if (!this.course) {
      document.title = `${slice.t('teaching.notFound')} | ${slice.t('brand.title')}`;
      this.$notFound.innerHTML = `
        <span class="teaching-course__not-found-mark" aria-hidden="true">404</span>
        <h1>${this._escape(slice.t('teaching.notFound'))}</h1>
        <p>${this._escape(slice.t('teaching.notFoundText', { slug: this.slug }))}</p>
        <a class="teaching-course__back-link" href="${this._escape(slice.href('/teaching'))}">${this._escape(slice.t('teaching.browseAll'))} <span aria-hidden="true">→</span></a>
      `;
      return;
    }

    const { name, code, description, repo, units } = this.course;
    document.title = `${name} | ${slice.t('teaching.title')} | ${slice.t('brand.title')}`;
    this.$eyebrow.textContent = this.course.institution
      ? slice.t('teaching.eyebrowInstitution', { institution: this.course.institution })
      : slice.t('teaching.eyebrow');
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
          { text: slice.t('teaching.title'), path: '/teaching' },
          { text: name }
        ]
      });
    }

    this.$toc.innerHTML = units.map((unit, index) => `
      <details class="teaching-unit" data-unit-index="${index}" ${this.openUnits.has(index) ? 'open' : ''}>
        <summary class="teaching-unit__summary">
          <span class="teaching-unit__number">${String(index + 1).padStart(2, '0')}</span>
          <span class="teaching-unit__title">${this._escape(unit.title)}</span>
          <span class="teaching-unit__count">${this._escape(slice.t('teaching.topics', { count: unit.topics.length }))}</span>
          <span class="teaching-unit__chevron" aria-hidden="true">⌄</span>
        </summary>
        ${unit.url ? `<a class="teaching-unit__source" href="${this._escape(unit.url)}" target="_blank" rel="noopener noreferrer">${this._escape(slice.t('teaching.viewUnit'))} <span aria-hidden="true">↗</span></a>` : ''}
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
