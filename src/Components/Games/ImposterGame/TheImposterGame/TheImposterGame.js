export default class TheImposterGame extends HTMLElement {

  constructor() {
    super();
    slice.attachTemplate(this);
    // State
    this.gameState = {
      step: 'setup', // setup, reveal, playing
      players: 3,
      imposters: 1,
      word: '',
      category: ''
    };
  }

  async init() {
    this.$gameContent = this.querySelector('#game-content');
    this.$heroThemeSlot = this.querySelector('.hero-theme-slot');
    await this.renderThemeSelector();
    await this.loadSetup();
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

  async loadSetup() {
    this.clearContent();
    const setupComponent = await slice.build('GameSetup', {});
    setupComponent.addEventListener('game-start', (e) => {
      this.gameState.players = e.detail.players;
      this.gameState.imposters = e.detail.imposters;
      this.gameState.word = e.detail.word;
      this.gameState.category = e.detail.category;
      this.gameState.step = 'reveal';
      this.loadReveal();
    });
    this.$gameContent.appendChild(setupComponent);
  }

  async loadReveal() {
    this.clearContent();
    const revealComponent = await slice.build('WordReveal', {
      players: this.gameState.players,
      imposters: this.gameState.imposters,
      word: this.gameState.word,
      category: this.gameState.category
    });
    
    revealComponent.addEventListener('revelation-finished', () => {
      this.gameState.imposterIndexes = revealComponent.getImposterIndexes();
      this.gameState.step = 'playing';
      this.loadGameFlow();
    });
    
    this.$gameContent.appendChild(revealComponent);
  }

  async loadGameFlow() {
    this.clearContent();
    const flowComponent = await slice.build('GameFlow', {
      word: this.gameState.word,
      category: this.gameState.category,
      imposters: this.gameState.imposterIndexes || []
    });
    
    flowComponent.addEventListener('reset-game', () => {
      this.gameState.step = 'setup';
      this.loadSetup();
    });
    
    this.$gameContent.appendChild(flowComponent);
  }

  clearContent() {
    this.$gameContent.innerHTML = '';
  }
}

customElements.define("slice-theimpostergame", TheImposterGame);
