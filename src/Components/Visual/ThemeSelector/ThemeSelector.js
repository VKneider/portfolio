/**
 * <slice-theme-selector> — toggle pill Light/Dark.
 * Iconos sun/moon (Lucide), indicador animado bronce.
 * Mantiene la integración con slice.stylesManager.themeManager y el
 * evento global 'themeChanged' para sincronizar con otros consumidores.
 */
export default class ThemeSelector extends HTMLElement {
  constructor(props) {
    super();
    slice.attachTemplate(this);

    this.$toggle = this.querySelector('.theme-toggle');
    this.$options = this.querySelectorAll('.theme-toggle-option');

    this.currentThemeName =
      slice.stylesManager?.themeManager?.currentTheme || 'Dark';

    slice.controller.setComponentProps(this, props);
    this.debuggerProps = ['currentTheme'];
  }

  async init() {
    this._bindEvents();
    this._syncActive();

    document.addEventListener('themeChanged', (event) => {
      this.currentThemeName = event.detail.themeName;
      this._syncActive();
    });
  }

  _bindEvents() {
    this.$options.forEach((option) => {
      option.addEventListener('click', async (e) => {
        e.stopPropagation();
        const theme = option.dataset.theme;
        if (theme && theme !== this.currentThemeName) {
          await this._selectTheme(theme);
        }
      });
    });
  }

  async _selectTheme(themeName) {
    this.$toggle.classList.add('loading');
    try {
      await slice.setTheme(themeName);
      this.currentThemeName = themeName;
      this._syncActive();
      document.dispatchEvent(
        new CustomEvent('themeChanged', { detail: { themeName } })
      );
    } catch (error) {
      console.error('Error changing theme:', error);
    } finally {
      this.$toggle.classList.remove('loading');
    }
  }

  _syncActive() {
    this.$options.forEach((option) => {
      option.classList.toggle(
        'active',
        option.dataset.theme === this.currentThemeName
      );
    });
    // El indicador se posiciona vía CSS según data-mode en el host.
    // Light = pos 0, Dark = pos 1 (translateX(100%) en .theme-toggle-indicator).
    this.$toggle.dataset.mode = this.currentThemeName.toLowerCase();
  }

  get currentTheme() {
    return this.currentThemeName;
  }

  set currentTheme(value) {
    this.currentThemeName = value;
    this._syncActive();
  }

  // La API antigua exponía `themes`. El toggle solo opera con Dark/Light
  // canónicos del manual, así que el setter ignora cualquier otro tema.
  set themes(value) { this._themes = value; }
  get themes() { return this._themes; }
}

customElements.define('slice-theme-selector', ThemeSelector);
