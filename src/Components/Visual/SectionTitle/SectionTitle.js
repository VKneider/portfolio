/**
 * <slice-section-title> — heading canónico de sección (Manual §3 5.6 Receta 1).
 *
 * Props:
 *   text    {string}            — el texto principal del título.
 *   accent  {string|undefined}  — palabra opcional renderizada en italic bronce
 *                                  como acento conceptual del título (§3 3.2 B).
 *                                  Si se provee, se concatena al final del texto.
 *   align   {'center'|'start'}  — alineación; default 'center'.
 *   anchor  {string|undefined}  — id en el <h2> para navegación por anclas.
 *
 * Uso:
 *   await slice.build('SectionTitle', { text: 'About Me' });
 *   await slice.build('SectionTitle', { text: 'My', accent: 'Journey' });
 */
export default class SectionTitle extends HTMLElement {
  static props = {
    text:   { type: 'string', default: '' },
    accent: { type: 'string', default: '' },
    align:  { type: 'string', default: 'center', allowedValues: ['center', 'start'] },
    anchor: { type: 'string', default: '' }
  };

  constructor(props = {}) {
    super();
    slice.attachTemplate(this);
    this.$title = this.querySelector('.section-title');

    slice.controller.setComponentProps(this, props);
    this.debuggerProps = ['text', 'accent', 'align', 'anchor'];
  }

  async init() {
    this.render();
  }

  render() {
    if (!this.$title) return;

    const text = this.text || '';
    const accent = this.accent || '';

    if (accent) {
      this.$title.innerHTML = `${this._escape(text)} <em>${this._escape(accent)}</em>`;
    } else {
      this.$title.textContent = text;
    }

    if (this.anchor) {
      this.$title.id = this.anchor;
    }

    if (this.align === 'start') {
      this.setAttribute('data-align', 'start');
    } else {
      this.removeAttribute('data-align');
    }
  }

  _escape(s) {
    const div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  set text(value) {
    this._text = value;
    this.render();
  }
  get text() { return this._text; }

  set accent(value) {
    this._accent = value;
    this.render();
  }
  get accent() { return this._accent; }

  set align(value) {
    this._align = value;
    this.render();
  }
  get align() { return this._align; }

  set anchor(value) {
    this._anchor = value;
    this.render();
  }
  get anchor() { return this._anchor; }
}

customElements.define('slice-section-title', SectionTitle);
