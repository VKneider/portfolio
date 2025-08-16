export default class CertificateCard extends HTMLElement {
  constructor(props) {
    super();
    slice.attachTemplate(this);

    slice.controller.setComponentProps(this, props);
    this.debuggerProps = [""];
  }

  init() {}

  
  get () {
      return this._;
  }

  set (value) {
      this._ = value;
  }
  
}

customElements.define("slice-certificatecard", CertificateCard);
