export default class TheImposterGame extends HTMLElement {

   constructor() {
     super();
     document.title = 'The Imposter Game - Slice.js';
     slice.attachTemplate(this);
     this.$setupComponent = null;
     this.$revealComponent = null;
     this.$flowComponent = null;
     // Ephemeral for the current round; not persisted.
    this.imposterIndexes = [];
     this.isAudioEnabled = false; // starts muted
     this.stats = { gamesPlayed: 0 };
   }

   async init() {
     this.$gameContent = this.querySelector('#game-content');
     this.$heroThemeSlot = this.querySelector('.hero-theme-slot');
     this.$heroSection = this.querySelector('#hero-section');
     this.$introLayout = this.querySelector('.intro-layout');
     this.$audio = this.querySelector('#background-audio');
     this.$audioControls = this.querySelector('#audio-controls');
     this.loadStats();
     // Context service is the single source of truth for game state.
     // Create it once, then all components read/write via the shared context.
     if (!slice.getComponent('imposter-context-service')) {
       await slice.build('ImposterGameContextService', {
         sliceId: 'imposter-context-service'
       });
     }
     this.contextService = slice.getComponent('imposter-context-service');
     this.syncStateFromService();
     await this.renderConfirmationModal();
     await this.renderThemeSelector();
     await this.renderAudioToggle();
     this.applyAudioStateToPlayer();
     // Initial screen always comes from context-backed config.
     await this.loadSetup();
     this.addEventListener('game-start', () => {
       this.stats.gamesPlayed++;
       this.saveStats();
     });
   }

  async renderConfirmationModal() {
    this.$confirmationModal = await slice.build('ConfirmationModal', {});
    if (this.$confirmationModal) {
      this.appendChild(this.$confirmationModal);
    }
  }

  async renderThemeSelector() {
    const themes = [
      {
        name: 'EmeraldLight',
        colors: { primary: '#10B981', secondary: '#FEFFFE' },
        description: 'Official Slice.js theme'
      },
      {
        name: 'Light',
        colors: { primary: '#F3F4F6', secondary: '#374151' },
        description: 'Clean and bright'
      },
      {
        name: 'Dark',
        colors: { primary: '#18181B', secondary: '#F3F4F6' },
        description: 'Easy on the eyes'
      },
      {
        name: 'CobaltBlue',
        colors: { primary: '#1D4ED8', secondary: '#F97316' },
        description: 'Professional blue with orange accents and light background'
      },
      {
        name: 'Purple',
        colors: { primary: '#9333EA', secondary: '#10B981' },
        description: 'Creative purple'
      },
      {
        name: 'NavyYellow',
        colors: { primary: '#020617', secondary: '#FCD34D' },
        description: 'Navy blue with yellow accents'
      },
      {
        name: 'CrimsonRed',
        colors: { primary: '#990000', secondary: '#4A4A4A' },
        description: 'Elegant deep crimson'
      },
      {
        name: 'NeonCyberpunk',
        colors: { primary: '#FF00FF', secondary: '#00FFFF' },
        description: 'High contrast neon madness'
      },
      {
        name: 'CandyPop',
        colors: { primary: '#FF69B4', secondary: '#87CEEB' },
        description: 'Sweet and bubbly pastels'
      },
      {
        name: 'ToxicSlime',
        colors: { primary: '#CCFF00', secondary: '#9D00FF' },
        description: 'Warning: Radioactive colors'
      },
      {
        name: 'RetroVapor',
        colors: { primary: '#FF71CE', secondary: '#01CDFE' },
        description: 'Aesthetic 80s vibes'
      }
    ];

    const themeSelector = await slice.build('ThemeSelector', {
      themes
    });

    this.$heroThemeSlot.appendChild(themeSelector);
  }

  async renderAudioToggle() {
    this.$audioToggle = await slice.build('BackgroundAudioToggle', {});
    this.$audioControls.appendChild(this.$audioToggle);
    this.$audioToggle.setState(this.isAudioEnabled);
    this.$audioToggle.addEventListener('toggle-audio', async () => {
      this.$audio.muted = !this.$audio.muted;
      this.isAudioEnabled = !this.$audio.muted;
      if (this.isAudioEnabled && this.$audio.paused) {
        this.$audio.play().catch(() => {});
      }
      this.$audioToggle.setState(this.isAudioEnabled);
      this.contextService?.updateGameConfig({ isAudioEnabled: this.isAudioEnabled });
      this.contextService?.updateAudioState({ isPlaying: this.isAudioEnabled });
      if (this.gameAudioToggle) {
        this.gameAudioToggle.setState(this.isAudioEnabled);
      }
    });
    // Audio starts muted, try to play
    this.$audio.play().catch(() => {});
    this.$audioToggle.setState(this.isAudioEnabled);

    this.$clickSoundToggle = await slice.build('ClickSoundToggle', {});
    this.$audioControls.appendChild(this.$clickSoundToggle);
    this.$clickSoundToggle.addEventListener('toggle-click-sound', () => {
      const isMuted = localStorage.getItem('imposterClickSoundMuted') === 'true';
      const nextMuted = !isMuted;
      this.$clickSoundToggle.setState(nextMuted);
      this.contextService?.updateAudioState({ isClickSoundMuted: nextMuted });
    });
  }


  async loadSetup(options = {}) {
    this.clearContent();
    this.showHero(true);
    const savedConfig = this.contextService?.getGameConfig();
    // Components are cached and manually updated because there is no router.
    if (!this.$setupComponent) {
      this.$setupComponent = await slice.build('GameSetup', {
        keepPlayers: options.keepPlayers || false,
        savedNames: savedConfig?.names || []
      });
      if (!this.$setupComponent) {
        return;
      }
      this.$setupComponent.addEventListener('game-start', () => {
        // Transition to reveal step is driven by context.
        this.contextService?.updateGameConfig({ step: 'reveal' });
        this.loadReveal();
      });
    } else {
      // Manual update: GameSetup is not routed or cached by the router.
      if (typeof this.$setupComponent.update === 'function') {
        this.$setupComponent.update({
          keepPlayers: options.keepPlayers || false,
          savedNames: savedConfig?.names || []
        });
      }
    }

    this.$gameContent.appendChild(this.$setupComponent);
  }

  async loadReveal() {
    this.clearContent();
    this.showHero(false);
    const savedConfig = this.contextService?.getGameConfig() || {};
    // WordReveal is a pure view of context-derived props.

    if (!this.$revealComponent) {
      this.$revealComponent = await slice.build('WordReveal', {
        players: savedConfig.players,
        imposters: savedConfig.imposters,
        word: savedConfig.word,
        category: savedConfig.category,
        names: savedConfig.names
      });
      if (!this.$revealComponent) {
        return;
      }
      this.$revealComponent.addEventListener('revelation-finished', () => {
        // Imposter indexes are computed per round and kept local.
        this.imposterIndexes = this.$revealComponent.getImposterIndexes();
        this.contextService?.updateGameConfig({ step: 'playing' });
        this.loadGameFlow();
      });
    } else {
      // Manual update: WordReveal is not routed or cached by the router.
      if (typeof this.$revealComponent.update === 'function') {
        this.$revealComponent.update({
          players: savedConfig.players,
          imposters: savedConfig.imposters,
          word: savedConfig.word,
          category: savedConfig.category,
          names: savedConfig.names
        });
      }
    }
    
    this.$gameContent.appendChild(this.$revealComponent);
  }

  async loadGameFlow() {
    this.clearContent();
    this.showHero(false);
    const savedConfig = this.contextService?.getGameConfig() || {};
    // GameFlow renders only props; state persists in context.

    if (!this.$flowComponent) {
      this.$flowComponent = await slice.build('GameFlow', {
        word: savedConfig.word,
        category: savedConfig.category,
        imposters: this.imposterIndexes || [],
        names: savedConfig.names
      });
      if (!this.$flowComponent) {
        return;
      }
      this.$flowComponent.addEventListener('reset-game', () => {
        // Reset uses context defaults, then returns to setup.
        this.contextService?.resetGameConfig();
        this.loadSetup();
      });

      this.$flowComponent.addEventListener('play-again-same', (e) => {
        // Keep names in context so setup can rehydrate without localStorage.
        const names = e.detail?.names;
        this.contextService?.updateGameConfig({
          step: 'setup',
          names: Array.isArray(names) ? names : (this.contextService?.getGameConfig()?.names || [])
        });
        this.loadSetup({ keepPlayers: true });
      });
    } else {
      // Manual update: GameFlow is not routed or cached by the router.
      if (typeof this.$flowComponent.update === 'function') {
        this.$flowComponent.update({
          word: savedConfig.word,
          category: savedConfig.category,
          imposters: this.imposterIndexes || [],
          names: savedConfig.names
        });
      }
    }
    
    this.$gameContent.appendChild(this.$flowComponent);

    // Add audio controls to game view
    const gameAudioControls = document.createElement('div');
    gameAudioControls.classList.add('audio-controls', 'game-audio-controls');
    this.$gameContent.appendChild(gameAudioControls);

    this.gameAudioToggle = await slice.build('BackgroundAudioToggle', {});
    this.gameAudioToggle.classList.add('game-audio-toggle');
    gameAudioControls.appendChild(this.gameAudioToggle);
    this.gameAudioToggle.addEventListener('toggle-audio', () => {
      this.$audio.muted = !this.$audio.muted;
      this.isAudioEnabled = !this.$audio.muted;
      if (this.isAudioEnabled && this.$audio.paused) {
        this.$audio.play().catch(() => {});
      }
      this.gameAudioToggle.setState(this.isAudioEnabled);
      this.contextService?.updateGameConfig({ isAudioEnabled: this.isAudioEnabled });
      this.contextService?.updateAudioState({ isPlaying: this.isAudioEnabled });
      if (this.$audioToggle) {
        this.$audioToggle.setState(this.isAudioEnabled);
      }
    });
    this.gameAudioToggle.setState(this.isAudioEnabled);

    this.gameClickSoundToggle = await slice.build('ClickSoundToggle', {});
    this.gameClickSoundToggle.classList.add('game-click-sound-toggle');
    gameAudioControls.appendChild(this.gameClickSoundToggle);
    this.gameClickSoundToggle.addEventListener('toggle-click-sound', () => {
      const isMuted = localStorage.getItem('imposterClickSoundMuted') === 'true';
      const nextMuted = !isMuted;
      this.gameClickSoundToggle.setState(nextMuted);
      this.contextService?.updateAudioState({ isClickSoundMuted: nextMuted });
      if (this.$clickSoundToggle) {
        this.$clickSoundToggle.setState(nextMuted);
      }
    });
  }

  clearContent() {
    if (this.$gameContent) {
      this.$gameContent.innerHTML = '';
    }
  }

  syncStateFromService() {
    const savedConfig = this.contextService?.getGameConfig();
    const savedAudio = this.contextService?.getAudioState();
    if (savedAudio) {
      this.isAudioEnabled = savedAudio.isPlaying;
    } else {
      this.isAudioEnabled = savedConfig?.isAudioEnabled ?? false;
    }
  }

  applyAudioStateToPlayer() {
    if (!this.$audio) {
      return;
    }

    this.$audio.muted = !this.isAudioEnabled;
    if (this.isAudioEnabled && this.$audio.paused) {
      this.$audio.play().catch(() => {});
    }
  }

   showHero(visible) {
     if (!this.$introLayout) return;
     this.$introLayout.classList.toggle('hero-hidden', !visible);
   }

   loadStats() {
     try {
       const statsStr = localStorage.getItem('imposterGameStats');
       if (statsStr) {
         this.stats = JSON.parse(statsStr);
       }
     } catch (e) {
       this.stats = { gamesPlayed: 0 };
     }
   }

   saveStats() {
     try {
       localStorage.setItem('imposterGameStats', JSON.stringify(this.stats));
     } catch (e) {
       // Ignore
     }
   }
 }

customElements.define("slice-theimpostergame", TheImposterGame);
