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
        this.renderPlayerScreen();
    }

    getImposterIndexes() {
        return this.imposterIndexes;
    }

    cacheElements() {
        this.$playerTitle = this.querySelector('#player-title');
        this.$cardContent = this.querySelector('#card-content');
        this.$actionBtn = this.querySelector('#reveal-btn');
        this.$instruction = this.querySelector('#instruction');
    }

    bindEvents() {
        this.$actionBtn.addEventListener('click', () => {
            const btnValue = this.$actionBtn.value;
            
            if (btnValue === 'Ver mi rol') {
                this.revealRole();
            } else if (btnValue === 'Ocultar y pasar') {
                this.nextPlayer();
            } else {
                // 'Comenzar Ronda'
                this.dispatchEvent(new CustomEvent('revelation-finished', { bubbles: true }));
            }
        });
    }

    renderPlayerScreen() {
        const playerLabel = this.getPlayerLabel(this.currentPlayer);
        this.$playerTitle.textContent = playerLabel;
        this.$cardContent.innerHTML = '<div class="card-back">?</div>';
        this.$cardContent.className = 'card-container hidden';
        this.$instruction.textContent = 'Asegúrate de que solo tú estés viendo la pantalla.';
        
        this.$actionBtn.value = 'Ver mi rol';
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
        this.$actionBtn.value = isLastPlayer ? 'Comenzar Ronda' : 'Ocultar y pasar';
        this.$instruction.textContent = 'Memoriza tu rol y palabra.';
    }

    nextPlayer() {
        this.currentPlayer++;
        if (this.currentPlayer < this.players) {
            this.renderPlayerScreen();
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
