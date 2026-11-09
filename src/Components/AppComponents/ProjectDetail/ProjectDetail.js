export default class ProjectDetail extends HTMLElement {
  constructor(props) {
    super();
    slice.attachTemplate(this);

    this.$content = this.querySelector('.project-detail2-content');
    this.$back = this.querySelector('.project-detail2-back');

    this.projects = [];
    this.images = [];
    this.imageIndex = 0;
    this.currentTitle = '';
    this.slug = '';
    this._params = {};
    this._initialized = false;

    slice.controller.setComponentProps(this, props);
    this.debuggerProps = ['params'];
  }

  set params(value) {
    this._params = value && typeof value === 'object' ? value : {};
    this.slug = this._params.slug || '';
    if (this._initialized) this.render();
  }

  get params() {
    return this._params;
  }

  async init() {
    await this.loadContent();
    this._initialized = true;
    this.render();

    this.addEventListener('click', (event) => {
      const link = event.target.closest?.('a[data-route]');
      if (!link) return;
      event.preventDefault();
      slice.router.navigate(link.dataset.route);
    });

    this.$content.addEventListener('click', (event) => {
      if (event.target.closest('.project-detail2-carousel-prev')) {
        this.stepCarousel(-1);
        return;
      }
      if (event.target.closest('.project-detail2-carousel-next')) {
        this.stepCarousel(1);
        return;
      }
      const thumb = event.target.closest('.project-detail2-carousel-thumb');
      if (thumb) {
        this.setCarouselImage(Number(thumb.dataset.index));
        return;
      }
      if (event.target.closest('.project-detail2-carousel-image') && this.images.length) {
        window.open(this.images[this.imageIndex], '_blank', 'noopener,noreferrer');
      }
    });

    this.$content.addEventListener('keydown', (event) => {
      if (!event.target.closest('.project-detail2-carousel')) return;
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        this.stepCarousel(-1);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        this.stepCarousel(1);
      }
    });

    slice.translator.watch(this, async () => {
      await this.loadContent();
      this.render();
    });
  }

  async loadContent() {
    const document = await slice.t.content('projects');
    this.projects = Array.isArray(document?.records) ? document.records : [];
  }

  render() {
    if (!this.$content) return;

    if (this.$back) this.$back.href = slice.href('/projects');

    const project = this.projects.find((item) => item.slug === this.slug);

    if (!project) {
      this.$content.innerHTML = `
        <div class="project-detail2-not-found">
          <h1>${this.escape(slice.t('projects.index.notFound'))}</h1>
          <p>${this.escape(slice.t('projects.index.notFoundText', { slug: this.slug }))}</p>
          <a class="project-detail2-action" href="${this.escape(slice.href('/projects'))}" data-route="/projects">${this.escape(slice.t('projects.index.back'))}</a>
        </div>
      `;
      return;
    }

    const labels = {
      category: slice.t('projects.index.labels.category'),
      role: slice.t('projects.index.labels.role'),
      team: slice.t('projects.index.labels.team'),
      duration: slice.t('projects.index.labels.duration'),
      stack: slice.t('projects.index.labels.stack'),
      problem: slice.t('projects.index.labels.problem'),
      built: slice.t('projects.index.labels.built'),
      tradeoffs: slice.t('projects.index.labels.tradeoffs'),
      result: slice.t('projects.index.labels.result'),
      learned: slice.t('projects.index.labels.learned')
    };

    const built = (project.built || []).map((item) => `<li>${this.escape(item)}</li>`).join('');
    const tradeoffs = (project.tradeoffs || []).map((item) => `<li>${this.escape(item)}</li>`).join('');
    const technologies = (project.technologies || []).map((tech) => `<span>${this.escape(tech)}</span>`).join('');

    this.images = Array.isArray(project.images) && project.images.length
      ? project.images
      : [project.image];
    this.imageIndex = 0;
    this.currentTitle = project.title;

    this.$content.innerHTML = `
      <header class="project-detail2-head">
        <h1>${this.escape(project.title)}</h1>
        <p class="project-detail2-summary">${this.escape(project.summary)}</p>
      </header>

      ${this.renderCarousel(project)}

      <div class="project-detail2-meta">
        <div><span>${this.escape(labels.category)}</span><strong>${this.escape(project.category)} · ${this.escape(project.year)}</strong></div>
        <div><span>${this.escape(labels.role)}</span><strong>${this.escape(project.role)}</strong></div>
        <div><span>${this.escape(labels.team)}</span><strong>${this.escape(project.team)}</strong></div>
        <div><span>${this.escape(labels.duration)}</span><strong>${this.escape(project.duration)}</strong></div>
      </div>

      <div class="project-detail2-actions">
        ${project.liveUrl ? `<a class="project-detail2-action project-detail2-action--primary" href="${this.escape(project.liveUrl)}" target="_blank" rel="noopener noreferrer">${this.escape(slice.t('projects.live'))}</a>` : ''}
        ${project.githubUrl ? `<a class="project-detail2-action" href="${this.escape(project.githubUrl)}" target="_blank" rel="noopener noreferrer">${this.escape(slice.t('projects.github'))}</a>` : ''}
      </div>

      <div class="project-detail2-stack-group">
        <span class="project-detail2-stack-label">${this.escape(labels.stack)}</span>
        <div class="project-detail2-stack">${technologies}</div>
      </div>

      <section class="project-detail2-section">
        <h2>${this.escape(labels.problem)}</h2>
        <p>${this.escape(project.problem)}</p>
      </section>

      <section class="project-detail2-section">
        <h2>${this.escape(labels.built)}</h2>
        <ul>${built}</ul>
      </section>

      <section class="project-detail2-section">
        <h2>${this.escape(labels.tradeoffs)}</h2>
        <ul>${tradeoffs}</ul>
      </section>

      <section class="project-detail2-result">
        <h2>${this.escape(labels.result)}</h2>
        <p>${this.escape(project.result)}</p>
      </section>

      <section class="project-detail2-section">
        <h2>${this.escape(labels.learned)}</h2>
        <p>${this.escape(project.learned)}</p>
      </section>
    `;
  }

  renderCarousel(project) {
    const count = this.images.length;
    const hasMany = count > 1;

    const thumbnails = hasMany
      ? `<div class="project-detail2-carousel-thumbs">
          ${this.images.map((image, index) => `
            <button class="project-detail2-carousel-thumb ${index === 0 ? 'is-active' : ''}" type="button" data-index="${index}" aria-pressed="${index === 0}" aria-label="${this.escape(project.title)} — ${index + 1}">
              <img src="${this.escape(image)}" alt="" />
            </button>
          `).join('')}
        </div>`
      : '';

    return `
      <div class="project-detail2-carousel" role="region" aria-label="${this.escape(slice.t('projects.index.carousel.screenshots'))}" tabindex="0">
        <div class="project-detail2-carousel-frame">
          <img class="project-detail2-carousel-image" src="${this.escape(this.images[0])}" alt="${this.escape(project.title)} — 1" />
          ${hasMany ? `
            <button class="project-detail2-carousel-nav project-detail2-carousel-prev" type="button" aria-label="${this.escape(slice.t('projects.index.carousel.prev'))}">←</button>
            <button class="project-detail2-carousel-nav project-detail2-carousel-next" type="button" aria-label="${this.escape(slice.t('projects.index.carousel.next'))}">→</button>
            <span class="project-detail2-carousel-count">1 / ${count}</span>
          ` : ''}
        </div>
        ${thumbnails}
      </div>
    `;
  }

  setCarouselImage(index) {
    const total = this.images.length;
    if (!total) return;

    const next = ((index % total) + total) % total;
    this.imageIndex = next;

    const image = this.$content.querySelector('.project-detail2-carousel-image');
    if (image) {
      image.src = this.images[next];
      image.alt = `${this.currentTitle} — ${next + 1}`;
    }

    const count = this.$content.querySelector('.project-detail2-carousel-count');
    if (count) count.textContent = `${next + 1} / ${total}`;

    this.$content.querySelectorAll('.project-detail2-carousel-thumb').forEach((thumb, thumbIndex) => {
      const isActive = thumbIndex === next;
      thumb.classList.toggle('is-active', isActive);
      thumb.setAttribute('aria-pressed', String(isActive));
    });
  }

  stepCarousel(delta) {
    this.setCarouselImage(this.imageIndex + delta);
  }

  escape(value) {
    const element = document.createElement('span');
    element.textContent = String(value ?? '');
    return element.innerHTML;
  }
}

customElements.define('slice-project-detail', ProjectDetail);
