const NAMES = {
  en: 'English',
  es: 'Español'
};

const CHECK = `
  <svg class="locale-switcher__check-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
`;

export default class LocaleSwitcher extends HTMLElement {
  static props = {};

  constructor(props) {
    super();
    slice.attachTemplate(this);

    this.$button = this.querySelector('.locale-switcher__button');
    this.$code = this.querySelector('.locale-switcher__code');
    this.$menu = this.querySelector('.locale-switcher__menu');
    this.$items = [];

    slice.controller.setComponentProps(this, props);
    this.debuggerProps = ['locales'];
  }

  init() {
    this.$button.addEventListener('click', (event) => {
      event.stopPropagation();
      this.toggle();
    });

    this.$button.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.open(true);
      }
    });

    this.$menu.addEventListener('keydown', (event) => this._onMenuKeydown(event));

    this._onDocumentClick = (event) => {
      if (!this.contains(event.target)) this.close();
    };
    this._onDocumentKeydown = (event) => {
      if (event.key === 'Escape') this.close(true);
    };
    document.addEventListener('click', this._onDocumentClick);
    document.addEventListener('keydown', this._onDocumentKeydown);

    this.render();

    slice.translator.watch(this, () => this.render());
  }

  beforeDestroy() {
    document.removeEventListener('click', this._onDocumentClick);
    document.removeEventListener('keydown', this._onDocumentKeydown);
  }

  get locales() {
    const configured = slice.translator?.locales;
    return Array.isArray(configured) && configured.length ? configured : ['en', 'es'];
  }

  render() {
    const active = slice.locale || 'en';
    const label = slice.t('locale.choose');

    this.$code.textContent = active.toUpperCase();
    this.$button.setAttribute('aria-label', label);
    this.$button.title = label;
    this.$menu.setAttribute('aria-label', label);
    this.$menu.replaceChildren();

    for (const code of this.locales) {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'locale-switcher__item';
      item.dataset.locale = code;
      item.setAttribute('role', 'menuitemradio');
      item.setAttribute('aria-checked', String(code === active));

      const name = document.createElement('span');
      name.className = 'locale-switcher__name';
      name.textContent = NAMES[code] || code.toUpperCase();

      const check = document.createElement('span');
      check.className = 'locale-switcher__check';
      check.innerHTML = CHECK;

      item.append(name, check);
      item.addEventListener('click', () => this.select(code));
      this.$menu.appendChild(item);
    }

    this.$items = [...this.$menu.querySelectorAll('[role="menuitemradio"]')];
    this.close();
  }

  async select(code) {
    if (code === slice.locale) {
      this.close(true);
      return;
    }

    try {
      await slice.translator.setLocale(code);
      this.close(true);
    } catch (error) {
      console.error(`Could not switch the locale to "${code}":`, error);
    }
  }

  open(focus = false) {
    if (this.$button.getAttribute('aria-expanded') === 'true') return;
    this.$menu.dataset.open = 'true';
    this.$button.setAttribute('aria-expanded', 'true');
    if (focus) {
      const active = this.$items.find((item) => item.getAttribute('aria-checked') === 'true');
      (active || this.$items[0])?.focus();
    }
  }

  close(focus = false) {
    this.$menu.dataset.open = 'false';
    this.$button.setAttribute('aria-expanded', 'false');
    if (focus) this.$button.focus();
  }

  toggle() {
    const isOpen = this.$button.getAttribute('aria-expanded') === 'true';
    if (isOpen) this.close();
    else this.open();
  }

  _onMenuKeydown(event) {
    if (this.$items.length === 0) return;
    const current = this.$items.indexOf(document.activeElement);

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.$items[(current + 1) % this.$items.length].focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.$items[(current - 1 + this.$items.length) % this.$items.length].focus();
    } else if (event.key === 'Home') {
      event.preventDefault();
      this.$items[0].focus();
    } else if (event.key === 'End') {
      event.preventDefault();
      this.$items[this.$items.length - 1].focus();
    }
  }
}

customElements.define('slice-localeswitcher', LocaleSwitcher);
