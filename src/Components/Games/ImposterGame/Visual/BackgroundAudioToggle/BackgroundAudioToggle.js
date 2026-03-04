export default class BackgroundAudioToggle extends HTMLElement {

  constructor(props) {
    super();
    slice.attachTemplate(this);
    this.contextService = null;
  }

  async init() {
    this.$toggle = this.querySelector('#audio-toggle');
    this.$toggle.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('toggle-audio', { bubbles: true }));
    });
    this.contextService = slice.getComponent('imposter-context-service');
    this.bindAudioContext();
  }

  bindAudioContext() {
    this.contextService?.watchAudioState(
      this,
      (isPlaying) => {
        this.setState(isPlaying);
      },
      (state) => state?.isPlaying
    );
  }

  setState(isPlaying) {
    this.$toggle.textContent = isPlaying ? '🔊' : '🔇';
  }
}

customElements.define("slice-backgroundaudiotoggle", BackgroundAudioToggle);
