export default class GameSetup extends HTMLElement {
    constructor() {
        super();
        slice.attachTemplate(this);
        this.mode = 'automatic';
        this.players = 3;
        this.imposters = 1;
        this.category = 'random';
        this.customWord = '';
        this.categories = {
            'random': ['Pizza', 'Guitarra', 'Avión', 'Playa', 'Hospital', 'Elefante', 'Fútbol', 'Internet'],
            'comida': ['Pizza', 'Sushi', 'Hamburguesa', 'Tacos', 'Helado', 'Chocolate', 'Ensalada'],
            'animales': ['Elefante', 'Perro', 'Gato', 'León', 'Jirafa', 'Pingüino', 'Delfín'],
            'lugares': ['Playa', 'Hospital', 'Escuela', 'Aeropuerto', 'Cine', 'Parque', 'Biblioteca'],
            'objetos': ['Guitarra', 'Computadora', 'Teléfono', 'Silla', 'Mesa', 'Reloj', 'Libro']
        };
    }

    async init() {
        this.cacheElements();
        this.bindEvents();
        await this.renderModeSelect();
        await this.renderPlayerInput();
        await this.renderImpostersInput();
        await this.renderCustomWordInput();
        await this.renderCategories();
        await this.renderStartButton();
        this.syncImpostersLimit();
    }

    cacheElements() {
        this.$modeContainer = this.querySelector('#mode-container .mode-toggle');
        this.$playersContainer = this.querySelector('#players-container');
        this.$impostersContainer = this.querySelector('#imposters-container');
        this.$categoryContainer = this.querySelector('#category-container');
        this.$customWordContainer = this.querySelector('#custom-word-container');
        this.$customWordWrapper = this.querySelector('.custom-word-input');
        this.$startButtonContainer = this.querySelector('#start-button-container');
        this.$impostersHint = this.querySelector('#imposters-hint');
        this.$formFeedback = this.querySelector('#form-feedback');
    }

    bindEvents() {}

    async renderStartButton() {
        this.$startButton = await slice.build('Button', {
            value: 'START',
            customColor: {
                button: 'var(--primary-color)',
                label: 'var(--primary-color-contrast)'
            },
            onClickCallback: () => {
                this.startGame();
            }
        });

        this.$startButton.init();
        this.$startButtonContainer.appendChild(this.$startButton);
    }

    async renderModeSelect() {
        const options = [
            { text: 'Automático (Palabras al azar)', value: 'automatic' },
            { text: 'Manual (Escribir palabra)', value: 'manual' }
        ];

        this.$modeSelect = await slice.build('Select', {
            options: options,
            label: 'Modo de juego',
            onOptionSelect: async () => {
                if (this.$modeSelect.value) {
                    this.mode = this.$modeSelect.value.value;
                    this.toggleModeInputs();
                }
            }
        });

        this.$modeSelect.init();
        this.$modeContainer.appendChild(this.$modeSelect);
        this.$modeSelect.value = [options[0]];
        this.mode = 'automatic';
    }

    async renderPlayerInput() {
        this.$playerInput = await slice.build('Input', {
            type: 'number',
            placeholder: 'Mínimo 3 jugadores',
            value: '3'
        });

        this.$playerInput.init();

        this.$playersContainer.appendChild(this.$playerInput);

        this.$playerInput.querySelector('input')?.addEventListener('input', () => {
            this.syncImpostersLimit();
        });
    }

    async renderImpostersInput() {
        this.$impostersInput = await slice.build('Input', {
            type: 'number',
            placeholder: 'Impostores',
            value: '1'
        });

        this.$impostersInput.init();
        this.$impostersContainer.appendChild(this.$impostersInput);

        this.$impostersInput.querySelector('input')?.addEventListener('input', () => {
            this.syncImpostersLimit();
        });
    }

    async renderCustomWordInput() {
        this.$customWordInput = await slice.build('Input', {
            type: 'password',
            placeholder: 'Escribe la palabra secreta',
            secret: true
        });

        this.$customWordInput.init();

        this.$customWordWrapper.appendChild(this.$customWordInput);
    }

    async renderCategories() {
        const options = Object.keys(this.categories).map(cat => ({ text: cat.charAt(0).toUpperCase() + cat.slice(1), value: cat }));
        
        this.$categorySelect = await slice.build('Select', {
            options: options,
            label: 'Categoría',
            onOptionSelect: async () => {
                if(this.$categorySelect.value) {
                    this.category = this.$categorySelect.value.value;
                }
            }
        });

        this.$categorySelect.init();
        this.$categoryContainer.appendChild(this.$categorySelect);
        // Default selection logic handled by component or manually setting value if needed
        // Assuming Select component allows setting value after build if needed, or we just rely on first option
        // But Select component implementation shows it relies on user interaction or initial prop.
        // Let's set the first category as default in our state
        this.category = options[0].value;
        // Optionally pre-select visually if the component supports it via props
        this.$categorySelect.value = [options[0]];
    }

    toggleModeInputs() {
        if (this.mode === 'automatic') {
            this.$categoryContainer.style.display = 'block';
            this.$customWordContainer.style.display = 'none';
        } else {
            this.$categoryContainer.style.display = 'none';
            this.$customWordContainer.style.display = 'block';
        }
    }

    startGame() {
        this.players = parseInt(this.$playerInput.value);
        this.imposters = parseInt(this.$impostersInput.value);
        const validationMessage = this.validateSetup();
        if (validationMessage) {
            this.setFeedback(validationMessage);
            return;
        }

        this.setFeedback('');

        let word = '';
        let categoryName = '';

        if (this.mode === 'automatic') {
            const words = this.categories[this.category];
            word = words[Math.floor(Math.random() * words.length)];
            categoryName = this.category;
        } else {
            word = this.$customWordInput.value.trim();
            if (!word) {
                this.setFeedback('Por favor ingresa una palabra secreta.');
                return;
            }
            categoryName = 'Secreto';
        }

        this.dispatchEvent(new CustomEvent('game-start', {
            detail: {
                players: this.players,
                imposters: this.imposters,
                word: word,
                category: categoryName
            },
            bubbles: true
        }));
    }

    syncImpostersLimit() {
        const playersValue = parseInt(this.$playerInput.value);
        const maxImposters = this.getMaxImposters(playersValue);

        if (!isNaN(maxImposters)) {
            this.$impostersHint.textContent = `Max: ${maxImposters}`;
        }

        if (!isNaN(playersValue) && playersValue >= 3) {
            const currentImposters = parseInt(this.$impostersInput.value);
            if (!isNaN(currentImposters) && currentImposters > maxImposters) {
                this.$impostersInput.value = `${maxImposters}`;
                this.setFeedback('Se ajusto automaticamente la cantidad de impostores.');
            } else {
                this.setFeedback('');
            }
        }
    }

    getMaxImposters(players) {
        if (isNaN(players) || players < 3) return 1;
        return Math.max(1, Math.floor(players / 3));
    }

    validateSetup() {
        if (isNaN(this.players) || this.players < 3) {
            return 'Se necesitan al menos 3 jugadores.';
        }

        const maxImposters = this.getMaxImposters(this.players);
        if (isNaN(this.imposters) || this.imposters < 1) {
            return 'Debe haber al menos 1 impostor.';
        }

        if (this.imposters > maxImposters) {
            return `Maximo de impostores permitido: ${maxImposters}.`;
        }

        return '';
    }

    setFeedback(message) {
        if (!this.$formFeedback) return;
        this.$formFeedback.textContent = message;
    }
}

customElements.define('slice-game-setup', GameSetup);
