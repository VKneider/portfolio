export default class GameFlow extends HTMLElement {
    static props = {
        word: {
            type: 'string',
            default: ''
        },
        category: {
            type: 'string',
            default: ''
        },
        imposters: {
            type: 'array',
            default: []
        },
        names: {
            type: 'array',
            default: []
        }
    };

    constructor(props) {
        super();
        slice.attachTemplate(this);
        this.contextService = null;
        if (props) {
            slice.controller.setComponentProps(this, props);
        }
    }

    async init() {
        this.contextService = slice.getComponent('imposter-context-service');
        this.cacheElements();
        this.bindEvents();
        this.renderResults();
        this.resetViewState();
        await this.renderButtons();
    }

    update(props = {}) {
        // Manual update: GameFlow is not routed or cached by the router.
        if (props && Object.keys(props).length) {
            slice.controller.setComponentProps(this, props);
        }
        this.renderResults();
        this.resetViewState();
    }

    cacheElements() {
        this.$revealButtonContainer = this.querySelector('#reveal-button-container');
        this.$closeModalButtonContainer = this.querySelector('#close-modal-button-container');
        this.$keepPlayersButtonContainer = this.querySelector('#keep-players-button-container');
        this.$resultsModal = this.querySelector('#results-modal');
        this.$stepsGuide = this.querySelector('#steps-guide');
        this.$impostersList = this.querySelector('#imposters-list');
        this.$secretWord = this.querySelector('#secret-word');
        this.$secretCategory = this.querySelector('#secret-category');
    }

    bindEvents() {}

    renderResults() {
        if (!this.$impostersList || !this.$secretWord || !this.$secretCategory) return;
        const impostersLabels = (this.imposters || []).map((index) => this.getPlayerLabel(index));
        this.$impostersList.textContent = impostersLabels.length ? impostersLabels.join(', ') : '-';
        this.$secretWord.textContent = this.word || '-';
        this.$secretCategory.textContent = this.category || '-';
    }

    getPlayerLabel(index) {
        if (Array.isArray(this.names) && this.names.length > index) {
            const name = `${this.names[index]}`.trim();
            if (name) return name;
        }
        return `Jugador #${index + 1}`;
    }

    async renderButtons() {
        this.$revealButton = await slice.build('Button', {
            value: 'STOP & REVEAL',
            customColor: {
                button: 'var(--danger-color)',
                label: 'var(--danger-contrast)'
            },
            audioOnClickEnabled: true,
            onClickCallback: () => {
                this.openResults();
            }
        });



        this.$closeModalButton = await slice.build('Button', {
            value: 'Reiniciar',
            customColor: {
                button: 'var(--secondary-color)',
                label: 'var(--secondary-color-contrast)'
            },
            audioOnClickEnabled: true,
            onClickCallback: () => {
                this.dispatchEvent(new CustomEvent('reset-game', { bubbles: true }));
            }
        });

        this.$keepPlayersButton = await slice.build('Button', {
            value: 'Jugar de nuevo',
            customColor: {
                button: 'var(--success-color)',
                label: 'var(--success-contrast)'
            },
            audioOnClickEnabled: true,
            onClickCallback: () => {
                this.dispatchEvent(new CustomEvent('play-again-same', {
                    detail: {
                        names: this.names
                    },
                    bubbles: true
                }));
            }
        });

  

        this.$revealButtonContainer.appendChild(this.$revealButton);
        this.$closeModalButtonContainer.appendChild(this.$closeModalButton);
        this.$keepPlayersButtonContainer.appendChild(this.$keepPlayersButton);
    }

    openResults() {
        if (this.$stepsGuide) {
            this.$stepsGuide.classList.add('hidden');
        }
        if (this.$resultsModal) {
            this.$resultsModal.classList.add('open');
            this.$resultsModal.setAttribute('aria-hidden', 'false');
        }
        document.body.classList.add('results-open');
    }

    resetViewState() {
        this.closeResults();
    }

    closeResults() {
        if (this.$stepsGuide) {
            this.$stepsGuide.classList.remove('hidden');
        }
        if (this.$resultsModal) {
            this.$resultsModal.classList.remove('open');
            this.$resultsModal.setAttribute('aria-hidden', 'true');
        }
        document.body.classList.remove('results-open');
    }

}

customElements.define('slice-game-flow', GameFlow);
