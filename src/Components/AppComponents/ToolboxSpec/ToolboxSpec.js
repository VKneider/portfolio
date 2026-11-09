export default class ToolboxSpec extends HTMLElement {
  static props = {
    groups: { type: 'array', default: [] }
  };

  constructor(props) {
    super();
    slice.attachTemplate(this);

    this.$root = this.querySelector('.toolbox-spec');
    this._groups = [];
    this._initialized = false;
    this._token = 0;

    slice.controller.setComponentProps(this, props);
    this.debuggerProps = ['groups'];
  }

  set groups(value) {
    this._groups = Array.isArray(value) ? value : [];
    if (this._initialized) this.render();
  }

  get groups() {
    return this._groups;
  }

  async init() {
    this._initialized = true;
    await this.render();
  }

  async render() {
    if (!this.$root) return;

    const token = ++this._token;

    slice.controller.destroyByContainer(this.$root);
    this.$root.replaceChildren();

    /** @type {Record<string, unknown>} */
    const item = {};
    const fields = this.groups.map((group, index) => {
      const key = `group${index}`;
      item[key] = Array.isArray(group.skills) ? group.skills : [];

      return {
        key,
        label: group.category,
        help: group.summary,
        type: 'tags',
        tag: (tag) => ({ label: tag, variant: 'outlined', size: 'sm' })
      };
    });

    if (!fields.length) return;

    const list = await slice.build('DescriptionList', {
      item,
      fields,
      layout: 'horizontal',
      variant: 'separated',
      density: 'comfortable',
      labelWidth: '220px',
      readonly: true
    });

    if (token !== this._token) {
      if (list) slice.controller.destroyComponent(list);
      return;
    }

    if (list) this.$root.appendChild(list);
  }
}

customElements.define('slice-toolbox-spec', ToolboxSpec);
