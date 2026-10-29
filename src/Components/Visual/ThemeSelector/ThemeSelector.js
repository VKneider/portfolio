/**
 * <slice-theme-selector> — one circular toggle. The sun and the moon cross-fade
 * with the active mode, and the label says what the click will do.
 * Keeps the slice.stylesManager.themeManager integration and the global
 * 'themeChanged' event.
 */
export default class ThemeSelector extends HTMLElement {
  constructor(props) {
    super();
    slice.attachTemplate(this);

    this.$button = this.querySelector('.theme-toggle');

    slice.controller.setComponentProps(this, props);
    this.debuggerProps = ['currentTheme'];
  }

  async init() {
    this.currentThemeName = this._getCurrentTheme();
    this._syncActive();
    this.$button.addEventListener('click', () => this._toggle());

    document.addEventListener('themeChanged', (event) => {
      this.currentThemeName = event.detail.themeName;
      this._syncActive();
    });

    // The label depends on the active mode and the locale.
    slice.translator.watch(this, () => this._syncActive());
  }

  _getCurrentTheme() {
    return slice.theme || slice.stylesManager?.themeManager?.currentTheme || 'Light';
  }

  async _toggle() {
    const next = this.currentThemeName.toLowerCase() === 'dark' ? 'Light' : 'Dark';
    await this._selectTheme(next);
  }

  async _selectTheme(themeName) {
    if (themeName === this.currentThemeName) return;

    this.$button.classList.add('loading');
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
      this.$button.classList.remove('loading');
    }
  }

  _syncActive() {
    const isDark = this.currentThemeName.toLowerCase() === 'dark';
    const label = slice.t(isDark ? 'theme.toLight' : 'theme.toDark');

    this.$button.dataset.mode = isDark ? 'dark' : 'light';
    this.$button.setAttribute('aria-pressed', String(isDark));
    this.$button.setAttribute('aria-label', label);
    this.$button.title = label;
  }

  get currentTheme() {
    return this._getCurrentTheme();
  }

  set currentTheme(value) {
    this.currentThemeName = value;
    this._syncActive();
  }

  // The old API exposed `themes`. The toggle only operates with the canonical
  // Dark/Light pair, so the setter ignores any other theme.
  set themes(value) { this._themes = value; }
  get themes() { return this._themes; }
}

customElements.define('slice-theme-selector', ThemeSelector);
