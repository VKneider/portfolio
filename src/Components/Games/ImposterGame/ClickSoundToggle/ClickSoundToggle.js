export default class ClickSoundToggle extends HTMLElement {

  constructor(props) {
    super();
    slice.attachTemplate(this);
  }

  async init() {
    this.$toggle = this.querySelector('#click-sound-toggle');
    this.$toggle.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('toggle-click-sound', { bubbles: true }));
    });
    this.updateState();
  }

  updateState() {
    const isMuted = localStorage.getItem('imposterClickSoundMuted') === 'true';
    this.$toggle.textContent = isMuted ? '🔕' : '🔔';
  }

  setState(isEnabled) {
    localStorage.setItem('imposterClickSoundMuted', isEnabled ? 'false' : 'true');
    this.updateState();
  }
}

customElements.define("slice-clicksoundtoggle", ClickSoundToggle);