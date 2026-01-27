export default class BackgroundAudioToggle extends HTMLElement {

  constructor(props) {
    super();
    slice.attachTemplate(this);
  }

  async init() {
    this.$toggle = this.querySelector('#audio-toggle');
    this.$toggle.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('toggle-audio', { bubbles: true }));
    });
  }

  setState(isPlaying) {
    this.$toggle.textContent = isPlaying ? '🔊' : '🔇';
  }
}

customElements.define("slice-backgroundaudiotoggle", BackgroundAudioToggle);
