export default class WordReveal extends HTMLElement {
    
    static props = {
        players: { 
            type: 'number', 
            default: 3 
        },
        imposters: {
            type: 'number',
            default: 1
        },
        names: {
            type: 'array',
            default: []
        },
        word: { 
            type: 'string', 
            default: '' 
        },
        category: { 
            type: 'string', 
            default: '' 
        }
    };

    constructor(props) {
        super();
        slice.attachTemplate(this);
        
        // Initialize state
        this.currentPlayer = 0;
        this.imposterIndexes = [];

        if (props) {
            slice.controller.setComponentProps(this, props);
        }
    }

    async init() {
        this.imposterIndexes = this.pickImposters();
        this.cacheElements();
        this.bindEvents();
        await this.renderActionButton();
        this.renderPlayerScreen();
    }

    getImposterIndexes() {
        return this.imposterIndexes;
    }

    cacheElements() {
        this.$playerTitle = this.querySelector('#player-title');
        this.$cardContent = this.querySelector('#card-content');
        this.$actionsContainer = this.querySelector('#actions-container');
        this.$instruction = this.querySelector('#instruction');
    }

    bindEvents() {
        // No longer needed, button has onClickCallback
    }

    renderPlayerScreen() {
        const playerLabel = this.getPlayerLabel(this.currentPlayer);
        this.$playerTitle.textContent = playerLabel;
        this.$cardContent.innerHTML = '<div class="card-back">?</div>';
        this.$cardContent.className = 'card-container hidden';
        this.$instruction.textContent = 'Asegúrate de que solo tú estés viendo la pantalla.';
        
        this.updateActionButton('Ver mi rol', () => {
            this.revealRole();
        });
    }

    revealRole() {
        const isImposter = this.imposterIndexes.includes(this.currentPlayer);
        
        this.$cardContent.className = 'card-container revealed';
        
        if (isImposter) {
            this.$cardContent.innerHTML = `
                <div class="role-card imposter">
                    <h3>¡ERES EL IMPOSTOR!</h3>
                    <p>Intenta pasar desapercibido.</p>
                    <div class="category-hint">Categoría: ${this.category}</div>
                </div>
            `;
        } else {
            this.$cardContent.innerHTML = `
                <div class="role-card crewmate">
                    <h3>LA PALABRA ES:</h3>
                    <div class="secret-word">${this.word}</div>
                    <div class="category-hint">Categoría: ${this.category}</div>
                </div>
            `;
        }

        const isLastPlayer = this.currentPlayer === this.players - 1;
        const buttonText = isLastPlayer ? 'Comenzar Ronda' : 'Ocultar y pasar';
        this.$instruction.textContent = 'Memoriza tu rol y palabra.';
        
        this.updateActionButton(buttonText, () => {
            if (isLastPlayer) {
                this.dispatchEvent(new CustomEvent('revelation-finished', { bubbles: true }));
            } else {
                this.nextPlayer();
            }
        });
    }

    nextPlayer() {
        this.currentPlayer++;
        if (this.currentPlayer < this.players) {
            this.renderPlayerScreen();
        }
    }

    async renderActionButton() {
        this.$actionBtn = await slice.build('Button', {
            value: 'Ver mi rol',
            audioOnClickEnabled: true,
            onClickCallback: () => {
                this.revealRole();
            }
        });
        this.$actionsContainer.appendChild(this.$actionBtn);
    }

    updateActionButton(value, onClickCallback) {
        if (this.$actionBtn) {
            this.$actionBtn.value = value;
            this.$actionBtn.onClickCallback = onClickCallback;
        }
    }

    pickImposters() {
        const indexes = new Set();
        while (indexes.size < this.imposters) {
            indexes.add(Math.floor(Math.random() * this.players));
        }
        return Array.from(indexes);
    }

    getPlayerLabel(index) {
        if (Array.isArray(this.names) && this.names.length > index) {
            const name = `${this.names[index]}`.trim();
            if (name) return name;
        }
        return `Jugador #${index + 1}`;
    }
}

customElements.define('slice-word-reveal', WordReveal);
