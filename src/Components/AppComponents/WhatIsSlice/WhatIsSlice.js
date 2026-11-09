export default class WhatIsSlice extends HTMLElement {
  constructor(props) {
    super();
    slice.attachTemplate(this);
    slice.controller.setComponentProps(this, props);
  }

  async init() {
    this.applyInternalLinks();
    this.labelDecisionTable();
    this.decorateExternalLinks();
    await this.mountLogoStage();

    this.addEventListener('click', (event) => {
      const link = event.target.closest?.('a[data-route]');
      if (!link) return;
      event.preventDefault();
      slice.router.navigate(link.dataset.route);
    });

    slice.translator.watch(this, () => {
      this.applyInternalLinks();
      this.labelDecisionTable();
      this.decorateExternalLinks();
    });
  }

  labelDecisionTable() {
    const table = this.querySelector('.slice-decisions-table');
    if (!table) return;

    const why = slice.t('what.decisions.table.why');
    const cost = slice.t('what.decisions.table.cost');

    table.querySelectorAll('tbody tr').forEach((row) => {
      const cells = row.querySelectorAll('td');
      if (cells[0]) cells[0].dataset.label = why;
      if (cells[1]) cells[1].dataset.label = cost;
    });
  }

  applyInternalLinks() {
    this.querySelectorAll('a[data-route]').forEach((link) => {
      link.href = slice.href(link.dataset.route);
    });
  }

  async mountLogoStage() {
    try {
      const stage = await slice.build('LogoStage');
      if (!stage) return;

      const legacyLogo = this.querySelector('.slice-logo');
      if (legacyLogo) {
        legacyLogo.replaceWith(stage);
        return;
      }

      this.querySelector('.logo-panel')?.prepend(stage);
    } catch (error) {
      console.warn('WhatIsSlice: se mantiene el logo estático.', error);
    }
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
