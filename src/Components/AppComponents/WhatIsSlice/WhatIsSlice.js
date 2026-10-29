export default class WhatIsSlice extends HTMLElement {
  constructor(props) {
    super();
    slice.attachTemplate(this);
    slice.controller.setComponentProps(this, props);

    this.ecosystemProjects = [
      {
        name: 'slice.js',
        subtitleKey: 'what.ecosystem.slice.subtitle',
        descriptionKey: 'what.ecosystem.slice.description',
        links: [
          { labelKey: 'what.ecosystem.links.github', href: 'https://github.com/VKneider/slice.js' }
        ]
      },
      {
        name: 'sliceDocs',
        subtitleKey: 'what.ecosystem.docs.subtitle',
        descriptionKey: 'what.ecosystem.docs.description',
        links: [
          { labelKey: 'what.ecosystem.links.openDocs', href: 'https://slicejs.com/' },
          { labelKey: 'what.ecosystem.links.github', href: 'https://github.com/VKneider/sliceDocs' }
        ]
      },
      {
        name: 'slice.js_visual_library',
        subtitleKey: 'what.ecosystem.library.subtitle',
        descriptionKey: 'what.ecosystem.library.description',
        links: [
          { labelKey: 'what.ecosystem.links.openLibrary', href: 'https://components.slicejs.com/' }
        ]
      },
      {
        name: 'slicejs-mcp',
        subtitleKey: 'what.ecosystem.mcp.subtitle',
        descriptionKey: 'what.ecosystem.mcp.description',
        links: [
          { labelKey: 'what.ecosystem.links.github', href: 'https://github.com/VKneider/slicejs-mcp' }
        ]
      }
    ];
  }

  async init() {
    this.renderEcosystemCards();
    this.decorateExternalLinks();

    slice.translator.watch(this, () => {
      this.renderEcosystemCards();
      this.decorateExternalLinks();
    });
  }

  renderEcosystemCards() {
    const grid = this.querySelector('.ecosystem-grid');
    if (!grid) return;

    const cardMarkup = this.ecosystemProjects.map((project) => {
      const linksMarkup = project.links
        .map((link) => `<a class="ecosystem-link" href="${link.href}" target="_blank" rel="noopener noreferrer">${project.name} ${slice.t(link.labelKey)}</a>`)
        .join('');

      return `
        <article class="ecosystem-card">
          <p class="ecosystem-subtitle">${slice.t(project.subtitleKey)}</p>
          <h3>${project.name}</h3>
          <p>${slice.t(project.descriptionKey)}</p>
          <div class="ecosystem-actions">${linksMarkup}</div>
        </article>
      `;
    });

    grid.innerHTML = cardMarkup.join('');
  }

  decorateExternalLinks() {
    this.querySelectorAll('a[target="_blank"]').forEach((link) => {
      const rel = link.getAttribute('rel') || '';
      const next = rel.includes('noopener') && rel.includes('noreferrer')
        ? rel
        : 'noopener noreferrer';
      link.setAttribute('rel', next);
    });
  }
}

customElements.define('slice-whatisslice', WhatIsSlice);
