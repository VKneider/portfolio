/**
 * Slice.js Bundle
 * Type: route
 * Generated: 2026-01-25T19:41:03.553Z
 * Strategy: hybrid
 * Components: 1
 * Total Size: 2.8 KB
 */

export const SLICE_BUNDLE = {
  metadata: {
  "version": "2.0.0",
  "type": "route",
  "route": "general",
  "generated": "2026-01-25T19:41:03.553Z",
  "totalSize": 2837,
  "componentCount": 1,
  "strategy": "hybrid"
},

  components: {
  "TheImposterGame": {
    "name": "TheImposterGame",
    "category": "ExtraGames",
    "categoryType": "Visual",
    "js": "class TheImposterGame extends HTMLElement {\n\n  constructor() {\n    super();\n    slice.attachTemplate(this);\n    // State\n    this.gameState = {\n      step: 'setup', // setup, reveal, playing\n      players: 3,\n      word: '',\n      category: ''\n    };\n  }\n\n  async init() {\n    this.$gameContent = this.querySelector('#game-content');\n    await this.loadSetup();\n  }\n\n  async loadSetup() {\n    this.clearContent();\n    const setupComponent = await slice.build('GameSetup', {});\n    setupComponent.addEventListener('game-start', (e) => {\n      this.gameState.players = e.detail.players;\n      this.gameState.word = e.detail.word;\n      this.gameState.category = e.detail.category;\n      this.gameState.step = 'reveal';\n      this.loadReveal();\n    });\n    this.$gameContent.appendChild(setupComponent);\n  }\n\n  async loadReveal() {\n    this.clearContent();\n    const revealComponent = await slice.build('WordReveal', {\n      players: this.gameState.players,\n      word: this.gameState.word,\n      category: this.gameState.category\n    });\n    \n    revealComponent.addEventListener('revelation-finished', () => {\n      this.gameState.step = 'playing';\n      this.loadGameFlow();\n    });\n    \n    this.$gameContent.appendChild(revealComponent);\n  }\n\n  async loadGameFlow() {\n    this.clearContent();\n    const flowComponent = await slice.build('GameFlow', {});\n    \n    flowComponent.addEventListener('reset-game', () => {\n      this.gameState.step = 'setup';\n      this.loadSetup();\n    });\n    \n    this.$gameContent.appendChild(flowComponent);\n  }\n\n  clearContent() {\n    this.$gameContent.innerHTML = '';\n  }\n}\n\nwindow.TheImposterGame = TheImposterGame;\ncustomElements.define(\"slice-theimpostergame\", TheImposterGame);\n\nreturn TheImposterGame;",
    "externalDependencies": {},
    "componentDependencies": [
      "GameSetup",
      "WordReveal",
      "GameFlow"
    ],
    "html": "<div class=\"the-imposter-game-container\">\n    <div class=\"header\">\n        <h1>The Imposter Game</h1>\n    </div>\n    \n    <div id=\"game-content\" class=\"game-content\">\n        <!-- Dynamic content will be loaded here -->\n    </div>\n</div>\n",
    "css": "/* Styles for TheImposterGame component */\n.the-imposter-game-container {\n    width: 100%;\n    max-width: 800px;\n    margin: 0 auto;\n    padding: 2rem;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 2rem;\n    min-height: 80vh;\n}\n\n.header h1 {\n    font-size: 2.5rem;\n    color: var(--primary-color, #646cff);\n    text-align: center;\n    margin-bottom: 1rem;\n    text-transform: uppercase;\n    letter-spacing: 2px;\n}\n\n.game-content {\n    width: 100%;\n    background: var(--bg-card, #2a2a2a);\n    padding: 2rem;\n    border-radius: 1rem;\n    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 1.5rem;\n}\n\n/* Animations */\n@keyframes fadeIn {\n    from { opacity: 0; transform: translateY(10px); }\n    to { opacity: 1; transform: translateY(0); }\n}\n\n.game-content > * {\n    animation: fadeIn 0.3s ease-out;\n}\n",
    "size": 2837
  }
}
};

// Auto-registration of components
if (window.slice && window.slice.controller) {
  slice.controller.registerBundle(SLICE_BUNDLE);
}
