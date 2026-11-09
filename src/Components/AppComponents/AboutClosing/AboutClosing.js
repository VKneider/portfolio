export default class AboutClosing extends HTMLElement {
  constructor(props) {
    super();
    slice.attachTemplate(this);

    this.$cta = this.querySelector('.about-closing__cta');

    slice.controller.setComponentProps(this, props);
    this.debuggerProps = [];
  }

  init() {
    if (this.$cta) this.$cta.href = slice.href('/contact');

    slice.translator.watch(this, () => {
      if (this.$cta) this.$cta.href = slice.href('/contact');
    });
  }
}

customElements.define('slice-about-closing', AboutClosing);
