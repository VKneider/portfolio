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
        }
    };

    constructor(props) {
        super();
        slice.attachTemplate(this);
        if (props) {
            slice.controller.setComponentProps(this, props);
        }
    }

    async init() {
        this.cacheElements();
        this.bindEvents();
        this.renderResults();
        await this.renderButtons();
    }

    cacheElements() {
        this.$revealButtonContainer = this.querySelector('#reveal-button-container');
        this.$newGameButtonContainer = this.querySelector('#new-game-button-container');
        this.$closeModalButtonContainer = this.querySelector('#close-modal-button-container');
        this.$resultsModal = this.querySelector('#results-modal');
        this.$stepsGuide = this.querySelector('#steps-guide');
        this.$impostersList = this.querySelector('#imposters-list');
        this.$secretWord = this.querySelector('#secret-word');
        this.$secretCategory = this.querySelector('#secret-category');
    }

    bindEvents() {}

    renderResults() {
        if (!this.$impostersList || !this.$secretWord || !this.$secretCategory) return;
        const impostersLabels = (this.imposters || []).map((index) => `Jugador #${index + 1}`);
        this.$impostersList.textContent = impostersLabels.length ? impostersLabels.join(', ') : '-';
        this.$secretWord.textContent = this.word || '-';
        this.$secretCategory.textContent = this.category || '-';
    }

    async renderButtons() {
        this.$revealButton = await slice.build('Button', {
            value: 'STOP & REVEAL',
            customColor: {
                button: 'var(--danger-color)',
                label: 'var(--danger-contrast)'
            },
            onClickCallback: () => {
                this.openResults();
            }
        });

        this.$newGameButton = await slice.build('Button', {
            value: 'Jugar de nuevo',
            customColor: {
                button: 'var(--primary-color)',
                label: 'var(--primary-color-contrast)'
            },
            onClickCallback: () => {
                this.dispatchEvent(new CustomEvent('reset-game', { bubbles: true }));
            }
        });

        this.$closeModalButton = await slice.build('Button', {
            value: 'Cerrar',
            customColor: {
                button: 'var(--secondary-color)',
                label: 'var(--secondary-color-contrast)'
            },
            onClickCallback: () => {
                this.closeResults();
            }
        });

        this.$revealButton.init();
        this.$newGameButton.init();
        this.$closeModalButton.init();

        this.$revealButtonContainer.appendChild(this.$revealButton);
        this.$newGameButtonContainer.appendChild(this.$newGameButton);
        this.$closeModalButtonContainer.appendChild(this.$closeModalButton);
    }

    openResults() {
        if (this.$stepsGuide) {
            this.$stepsGuide.classList.add('hidden');
        }
        if (this.$resultsModal) {
            this.$resultsModal.classList.add('open');
            this.$resultsModal.setAttribute('aria-hidden', 'false');
        }
    }

    closeResults() {
        if (this.$stepsGuide) {
            this.$stepsGuide.classList.remove('hidden');
        }
        if (this.$resultsModal) {
            this.$resultsModal.classList.remove('open');
            this.$resultsModal.setAttribute('aria-hidden', 'true');
        }
    }
}

customElements.define('slice-game-flow', GameFlow);
