export default class ClickSoundToggle extends HTMLElement {

  constructor(props) {
    super();
    slice.attachTemplate(this);
    this.contextService = null;
  }

  async init() {
    this.$toggle = this.querySelector('#click-sound-toggle');
    this.$toggle.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('toggle-click-sound', { bubbles: true }));
    });
    this.contextService = slice.getComponent('imposter-context-service');
    this.bindAudioContext();
    this.updateState();
  }

  bindAudioContext() {
    this.contextService?.watchAudioState(
      this,
      (isMuted) => {
        this.updateStateFromValue(isMuted);
      },
      (state) => state?.isClickSoundMuted
    );
  }

  getMutedState() {
    const state = this.contextService?.getAudioState();
    if (state && typeof state.isClickSoundMuted === 'boolean') {
      return state.isClickSoundMuted;
    }

    return localStorage.getItem('imposterClickSoundMuted') === 'true';
  }

  updateStateFromValue(isMuted) {
    const muted = Boolean(isMuted);
    this.$toggle.textContent = muted ? '🔕' : '🔔';
  }

  updateState() {
    this.updateStateFromValue(this.getMutedState());
  }

  setState(isMuted) {
    const muted = Boolean(isMuted);
    this.contextService?.updateAudioState({ isClickSoundMuted: muted });
    localStorage.setItem('imposterClickSoundMuted', muted ? 'true' : 'false');
    this.updateStateFromValue(muted);
  }
}

customElements.define("slice-clicksoundtoggle", ClickSoundToggle);
