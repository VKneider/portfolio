export default class ImposterGameContextService {
  constructor() {
    this.contextName = 'imposterGameConfig';
    this.audioContextName = 'imposterGameAudio';
    this.defaultGameConfig = {
      step: 'setup',
      players: 3,
      imposters: 1,
      word: '',
      category: '',
      names: [],
      isAudioEnabled: false,
      mode: 'automatic',
      useNames: false,
      useSavedNames: false,
      namesSource: 'new',
      customWord: '',
      selectedListId: null,
      activeNames: []
    };
    this.defaultAudioState = {
      isPlaying: false,
      isClickSoundMuted: false
    };
  }

  async init() {
    this.ensureGameContext();
    this.ensureAudioContext();
  }

  ensureGameContext() {
    if (!slice.context) {
      return;
    }

    if (!slice.context.has(this.contextName)) {
      slice.context.create(this.contextName, this.defaultGameConfig, {
        persist: true,
        storageKey: 'imposter:game-config'
      });
    }
  }

  ensureAudioContext() {
    if (!slice.context) {
      return;
    }

    if (!slice.context.has(this.audioContextName)) {
      const storedMuted = localStorage.getItem('imposterClickSoundMuted') === 'true';
      slice.context.create(this.audioContextName, {
        ...this.defaultAudioState,
        isClickSoundMuted: storedMuted
      }, {
        persist: true,
        storageKey: 'imposter:audio-state'
      });
    }
  }

  getGameConfig() {
    if (!slice.context) {
      return null;
    }

    this.ensureGameContext();
    return slice.context.getState(this.contextName);
  }

  getDefaultGameConfig() {
    return { ...this.defaultGameConfig };
  }

  resetGameConfig() {
    if (!slice.context) {
      return;
    }

    this.ensureGameContext();
    slice.context.setState(this.contextName, { ...this.defaultGameConfig });
  }

  updateGameConfig(partialConfig) {
    if (!slice.context) {
      return;
    }

    this.ensureGameContext();
    slice.context.setState(this.contextName, (prevState) => ({
      ...prevState,
      ...partialConfig
    }));
  }

  getAudioState() {
    if (!slice.context) {
      return null;
    }

    this.ensureAudioContext();
    return slice.context.getState(this.audioContextName);
  }

  updateAudioState(partialState) {
    if (!slice.context) {
      return;
    }

    this.ensureAudioContext();
    slice.context.setState(this.audioContextName, (prevState) => ({
      ...prevState,
      ...partialState
    }));
  }

  watchGameConfig(component, callback, selector) {
    if (!slice.context) {
      return null;
    }

    this.ensureGameContext();
    return slice.context.watch(this.contextName, component, callback, selector);
  }

  watchAudioState(component, callback, selector) {
    if (!slice.context) {
      return null;
    }

    this.ensureAudioContext();
    return slice.context.watch(this.audioContextName, component, callback, selector);
  }
}
