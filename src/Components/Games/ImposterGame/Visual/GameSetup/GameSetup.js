import palabras from "./randomWords.js";

export default class GameSetup extends HTMLElement {

      static props = {
        keepPlayers: {
            type: 'boolean',
            default: false
        },
        savedNames: {
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
        this.storage = null;
        this.storageKey = 'imposterGamePlayers';
        this.categoriesKey = 'imposterGameCategories';
        this.defaultCategories = {
            'git & github': ['Repositorio', 'Commit', 'Branch', 'Merge', 'Pull Request', 'Issue', 'Fork'],
            'html & css': ['Etiqueta', 'Flexbox', 'Grid', 'Selector', 'Margin', 'Padding', 'Responsive', 'Media Query', 'Z-index', "Viewport", "DOM", "Framework", "Library" ],
            'javascript': ['Array', 'Closure', 'Promise', 'Async', 'Callback', 'Scope', 'Prototype'],
            'aleatoria': this.getRandomWords()
        };
        this.categories = { ...this.defaultCategories };
        this.contextService = null;
        this.hasNamesListeners = false;
    }

    getRandomWords() {
        const shuffled = [...palabras].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 10);
    }

    async initStorage() {
        try {
            this.storage = await slice.build('LocalStorageManager', {});
        } catch (error) {
            this.storage = null;
        }
    }

    cacheElements() {
        this.$setupContainer = this.querySelector('.setup-container');
        this.$setupContainer.setAttribute('role', 'main');
        this.$setupContainer.setAttribute('aria-label', 'Configuración del juego Imposter');
        this.$modeContainer = this.querySelector('#mode-container .mode-toggle');
        this.$playersContainer = this.querySelector('#players-container');
        this.$impostersContainer = this.querySelector('#imposters-container');
        this.$namesToggleContainer = this.querySelector('#names-toggle-container');
        this.$namesListContainer = this.querySelector('#names-list-container');
        this.$namesTextarea = this.querySelector('#names-list');
        this.$namesSourceContainer = this.querySelector('#names-source-container');
        this.$namesToggleListContainer = this.querySelector('#names-toggle-list-container');
        this.$namesToggleList = this.querySelector('#names-toggle-list');
        this.$namesActiveHint = this.querySelector('#names-active-hint');
        this.$namesManageContainer = this.querySelector('#names-manage-container');
        this.$namesManageButton = this.querySelector('#names-manage-container');
        this.$namesListsTabs = this.querySelector('#names-lists-tabs');
        this.$categoryContainer = this.querySelector('#category-container');
        this.$categoryGroup = this.querySelector('#category-group');
        this.$categoryManageButton = this.querySelector('#category-manage-button');
        this.$customWordContainer = this.querySelector('#custom-word-container');
        this.$customWordWrapper = this.querySelector('.custom-word-input');
        this.$startButtonContainer = this.querySelector('#start-button-container');
        this.$impostersHint = this.querySelector('#imposters-hint');
    }

    bindEvents() {}

    update(props = {}) {
        // Manual update: GameSetup is not routed or cached by the router.
        if (props && Object.keys(props).length) {
            slice.controller.setComponentProps(this, props);
        }
        this.syncGameConfigFromContext();
        this.applySavedNamesProps();
        this.syncImpostersLimit();
    }

    async init() {
        this.cacheElements();
        this.bindEvents();
        this.setupNamesTextarea();
        await this.initStorage();
        this.loadCategories();
        await this.renderModeSelect();
        await this.renderNamesToggle();
        await this.renderPlayerInput();
        await this.renderImpostersInput();
        await this.renderNamesSourceSelect();
        await this.renderNamesManager();
        await this.renderCustomWordInput();
        await this.renderCategories();
        await this.renderCategoryManager();
        await this.renderStartButton();
        this.contextService = slice.getComponent('imposter-context-service');
        this.bindContextWatchers();
        this.syncGameConfigFromContext();
        this.applySavedNamesProps();
        this.syncImpostersLimit();
    }

    async renderStartButton() {
        this.$startButton = await slice.build('Button', {
            value: 'START',
            customColor: {
                button: 'var(--primary-color)',
                label: 'var(--primary-color-contrast)'
            },
            audioOnClickEnabled: true,
            ariaLabel: 'Iniciar juego',
            onClickCallback: () => {
                this.startGame();
            }
        });

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
                    this.contextService?.updateGameConfig({ mode: this.mode });
                    this.toggleModeInputs();
                }
            }
        });

        this.$modeContainer.appendChild(this.$modeSelect);
        if (options.length) {
            this.$modeSelect.value = [options[0]];
        }
        this.mode = 'automatic';
        if (this.contextService) {
            this.contextService.updateGameConfig({ mode: this.mode });
        }
    }

    async renderPlayerInput() {
        this.$playerInput = await slice.build('Input', {
            type: 'number',
            label: 'Numero de jugadores',
            placeholder: 'Jugadores (>=3)',
            value: '3',
            min: '3'
        });


        this.$playersContainer.appendChild(this.$playerInput);

        this.$playerInput.querySelector('input')?.addEventListener('input', () => {
            let val = parseInt(this.$playerInput.value);
            if (val < 3) {
                this.setFeedback('Se necesitan al menos 3 jugadores.');
                this.$playerInput.value = '3';
            } else {
                this.setFeedback('');
            }
            this.contextService?.updateGameConfig({ players: parseInt(this.$playerInput.value) || 3 });
            this.syncImpostersLimit();
        });
    }

    async renderImpostersInput() {
        this.$impostersInput = await slice.build('Input', {
            type: 'number',
            label: 'Cantidad de impostores (Max: 1)',
            placeholder: 'Impostores',
            value: '1'
        });

        this.$impostersContainer.appendChild(this.$impostersInput);

        this.$impostersInput.querySelector('input')?.addEventListener('input', () => {
            this.contextService?.updateGameConfig({ imposters: parseInt(this.$impostersInput.value) || 1 });
            this.syncImpostersLimit();
        });
    }

    async renderNamesToggle() {
        const options = [
            { text: 'No', value: false },
            { text: 'Si', value: true }
        ];

        this.$namesToggle = await slice.build('Select', {
            options: options,
            label: 'Usar nombres',
            onOptionSelect: async () => {
                if (this.$namesToggle.value) {
                    this.useNames = this.$namesToggle.value.value === true || this.$namesToggle.value.value === 'true';
                    this.contextService?.updateGameConfig({ useNames: this.useNames });
                    this.toggleNamesList();
                }
            }
        });

        this.$namesToggleContainer.appendChild(this.$namesToggle);
        if (options.length) {
            this.$namesToggle.value = [options[0]];
        }
        this.useNames = false;
        if (this.contextService) {
            this.contextService.updateGameConfig({ useNames: this.useNames });
        }
        this.toggleNamesList();
    }

    async renderNamesSourceSelect() {
        const options = [
            { text: 'Ingresar nuevos', value: 'new' },
            { text: 'Usar guardados', value: 'saved' }
        ];

        this.$namesSourceSelect = await slice.build('Select', {
            options: options,
            label: 'Modo de nombres',
            onOptionSelect: async () => {
                if (this.$namesSourceSelect.value) {
                    this.useSavedNames = this.$namesSourceSelect.value.value === 'saved';
                    const namesSource = this.useSavedNames ? 'saved' : 'new';
                    this.contextService?.updateGameConfig({
                        useSavedNames: this.useSavedNames,
                        namesSource
                    });
                    this.toggleNamesList();
                }
            }
        });

        this.$namesSourceContainer.appendChild(this.$namesSourceSelect);
        if (options.length) {
            this.$namesSourceSelect.value = [options[0]];
        }
        this.useSavedNames = false;
        if (this.contextService) {
            this.contextService.updateGameConfig({
                useSavedNames: this.useSavedNames,
                namesSource: 'new'
            });
        }
        this.toggleNamesList();
    }

    async renderNamesTextarea() {
        if (!this.$namesTextarea) {
            this.$namesTextarea = document.createElement('textarea');
            this.$namesTextarea.placeholder = 'Ingresa un nombre por línea';
            this.$namesTextarea.rows = 5;
            this.$namesListContainer.appendChild(this.$namesTextarea);
        }
        this.setupNamesTextarea();
    }

    setupNamesTextarea() {
        if (!this.$namesTextarea || this.hasNamesListeners) {
            return;
        }

        this.hasNamesListeners = true;
        this.$namesTextarea.addEventListener('input', () => {
            const names = this.parseNames();
            if (this.useNames && !this.useSavedNames && this.$playerInput) {
                const count = names.length;
                this.$playerInput.value = count;
                this.contextService?.updateGameConfig({ players: count, names });
                this.syncImpostersLimit();
                return;
            }
            this.syncPlayerInput();
            this.contextService?.updateGameConfig({ names });
        });

        this.$namesTextarea.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter') {
                return;
            }
            const cursorPosition = this.$namesTextarea.selectionStart;
            const beforeCursor = this.$namesTextarea.value.slice(0, cursorPosition);
            const lines = beforeCursor.split(/\n/);
            const currentLine = lines[lines.length - 1] || '';
            if (!currentLine.trim()) {
                return;
            }
            setTimeout(() => {
                const names = this.parseNames();
                if (this.useNames && !this.useSavedNames && this.$playerInput) {
                    const count = names.length;
                    this.$playerInput.value = count;
                    this.contextService?.updateGameConfig({ players: count, names });
                    this.syncImpostersLimit();
                    return;
                }
                this.syncPlayerInput();
                this.contextService?.updateGameConfig({ names });
            }, 0);
        });
    }

    async renderCustomWordInput() {
        this.$customWordInput = await slice.build('Input', {
            type: 'password',
            placeholder: 'Escribe la palabra secreta',
            secret: true
        });

        this.$customWordWrapper.appendChild(this.$customWordInput);
        this.$customWordInput.querySelector('input')?.addEventListener('input', () => {
            this.contextService?.updateGameConfig({ customWord: this.$customWordInput.value });
        });
    }

    async renderCategories() {
        const options = Object.keys(this.categories).map(cat => ({ text: cat.charAt(0).toUpperCase() + cat.slice(1), value: cat }));
        
        this.$categorySelect = await slice.build('Select', {
            options: options,
            label: 'Categoría',
            onOptionSelect: async () => {
                if(this.$categorySelect.value) {
                    this.category = this.$categorySelect.value.value;
                    this.contextService?.updateGameConfig({ category: this.category });
                }
            }
        });

        this.$categoryContainer.appendChild(this.$categorySelect);
        if (options.length) {
            this.category = options[0].value;
            this.$categorySelect.value = [options[0]];
            this.contextService?.updateGameConfig({ category: this.category });
        }
    }

    async renderCategoryManager() {
        this.$manageCategoriesButton = await slice.build('Button', {
            value: 'Administrar categorias',
            customColor: {
                button: 'var(--secondary-color)',
                label: 'var(--font-primary-color)'
            },
            audioOnClickEnabled: true,
            onClickCallback: () => {
                this.$categoryModalComponent?.open(this.category);
            }
        });

        this.$categoryManageButton.appendChild(this.$manageCategoriesButton);

        this.$categoryModalComponent = await slice.build('CategoryManagerModal', {
            categories: this.categories
        });

        if (this.$categoryModalComponent) {
            this.$categoryModalComponent.addEventListener('save-category', (event) => {
                this.saveCategoryChanges(event.detail);
            });

        this.$categoryModalComponent.addEventListener('request-delete-category', (event) => {
            this.handleDeleteCategoryRequest(event.detail);
        });

        this.$categoryModalComponent.addEventListener('category-rename', (event) => {
            this.handleCategoryRename(event.detail);
        });

            this.appendChild(this.$categoryModalComponent);
        }
    }

    toggleModeInputs() {
        if (this.mode === 'automatic') {
            this.$categoryGroup.style.display = 'block';
            this.$categoryManageButton.style.display = 'block';
            this.$customWordContainer.style.display = 'none';
        } else {
            this.$categoryGroup.style.display = 'none';
            this.$categoryManageButton.style.display = 'none';
            this.$customWordContainer.style.display = 'block';
        }
    }

    saveCategoryChanges(detail) {
        const name = detail?.name?.trim().toLowerCase();
        const words = detail?.words || [];
        if (!name || !words.length) return;
        this.categories[name] = words;
        this.saveCategories();
        this.refreshCategorySelects(name);
    }

    deleteCategory(detail) {
        const name = detail?.name?.trim().toLowerCase();
        if (!name || !this.categories[name]) return;
        if (name === 'random') return;
        delete this.categories[name];
        this.saveCategories();
        const keys = Object.keys(this.categories);
        let nextKey = keys.length ? keys[0] : '__new__';
        if (!keys.length) {
            this.categories['nueva categoria'] = [];
            nextKey = 'nueva categoria';
        }
        this.refreshCategorySelects(nextKey);
        this.$categoryModalComponent?.updateCategories(this.categories, nextKey);
    }

    handleCategoryRename(detail) {
        const previousName = detail?.previousName?.trim().toLowerCase();
        const newName = detail?.newName?.trim().toLowerCase();
        const words = detail?.words || [];
        if (!previousName || !newName) return;
        if (previousName === newName) return;
        if (this.categories[previousName]) {
            delete this.categories[previousName];
        }
        this.categories[newName] = words;
        this.saveCategories();
        let selectedKey = this.category;
        if (previousName === this.category) {
            selectedKey = newName;
        }
        this.refreshCategorySelects(selectedKey);
        this.$categoryModalComponent?.updateCategories(this.categories, selectedKey);
    }

    handleDeleteCategoryRequest(detail) {
        const name = detail?.name?.trim();
        if (!name) return;
        const confirmationModal = this.closest('slice-theimpostergame')?.querySelector('slice-confirmation-modal');
        if (!confirmationModal) {
            this.deleteCategory({ name });
            return;
        }
        confirmationModal.open({
            title: 'Eliminar categoría',
            message: `¿Estás seguro de eliminar "${name}"?`,
            onConfirm: () => {
                this.deleteCategory({ name });
            }
        });
    }

    deleteList(detail) {
        const name = detail?.name?.trim();
        if (!name) return;
        this.lists = this.loadSavedLists().filter(list => list.name !== name);
        this.saveLists(this.lists);
        this.selectedListId = this.lists.length ? this.lists[0].id : null;
        this.loadListsState();
        this.renderNamesTabs();
        this.renderSavedNamesToggle();
    }

    getCategoryOptions() {
        return Object.keys(this.categories).map((cat) => ({
            text: cat.charAt(0).toUpperCase() + cat.slice(1),
            value: cat
        }));
    }

    refreshCategorySelects(selectedKey) {
        if (this.$categorySelect) {
            const options = this.getCategoryOptions();
            this.$categorySelect.options = options;
            const selectedOption = options.find(option => option.value === selectedKey);
            if (selectedOption) {
                this.$categorySelect.value = [selectedOption];
            }
            this.category = selectedKey;
        }
    }

    startGame() {
        this.players = parseInt(this.$playerInput.value) || 0;
        this.imposters = parseInt(this.$impostersInput.value) || 0;
        const validationMessage = this.validateSetup();
        if (validationMessage) {
            this.setFeedback(validationMessage);
            return;
        }

        this.setFeedback('');

        if (this.useNames) {
            if (this.useSavedNames) {
                this.names = this.getActiveSavedNames();
            } else {
                this.names = this.parseNames();
            }
        } else {
            this.names = [];
        }

        this.contextService?.updateGameConfig({
            players: this.players,
            imposters: this.imposters,
            names: this.names,
            mode: this.mode,
            useNames: this.useNames,
            useSavedNames: this.useSavedNames,
            namesSource: this.useSavedNames ? 'saved' : 'new',
            category: this.category,
            customWord: this.$customWordInput ? this.$customWordInput.value.trim() : '',
            selectedListId: this.selectedListId || null,
            activeNames: Array.isArray(this.$activeNamesRefs)
                ? this.$activeNamesRefs.map(({ switchComponent }) => switchComponent.checked)
                : []
        });

        const updatedConfig = this.contextService?.getGameConfig() || {};
        let word = '';
        let categoryName = '';

        if (updatedConfig.mode === 'automatic') {
            const words = this.categories[updatedConfig.category];
            word = words[Math.floor(Math.random() * words.length)];
            categoryName = updatedConfig.category;
        } else {
            const customWord = updatedConfig.customWord || '';
            if (!customWord) {
                this.setFeedback('Por favor ingresa una palabra secreta.');
                return;
            }
            word = customWord;
            categoryName = 'Secreto';
        }

        this.contextService?.updateGameConfig({
            word: word,
            category: categoryName
        });

        const finalConfig = this.contextService?.getGameConfig() || {};
        this.dispatchEvent(new CustomEvent('game-start', {
            detail: {
                players: finalConfig.players ?? this.players,
                imposters: finalConfig.imposters ?? this.imposters,
                names: finalConfig.names ?? this.names,
                word: finalConfig.word ?? word,
                category: finalConfig.category ?? categoryName
            },
            bubbles: true
        }));

    }

    syncImpostersLimit() {
        const playersValue = parseInt(this.$playerInput.value);
        const maxImposters = this.getMaxImposters(playersValue);

        if (!isNaN(maxImposters)) {
            this.$impostersInput.label = `Cantidad de impostores (Max: ${maxImposters})`;
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

        if (this.useNames) {
            const names = this.useSavedNames ? this.getActiveSavedNames() : this.parseNames();
            if (names.length < this.players) {
                return `Necesitas ${this.players} nombres para personalizar jugadores.`;
            }
            if (names.length === 0) {
                return 'No hay jugadores activos seleccionados.';
            }
        }

        return '';
    }

    toggleNamesList() {
        if (!this.$namesSourceContainer || !this.$namesToggleListContainer || !this.$namesManageContainer || !this.$namesListContainer) return;
        const showNames = this.useNames;
        this.$namesSourceContainer.style.display = showNames ? 'block' : 'none';
        this.$setupContainer.classList.toggle('names-enabled', showNames);

        if (!showNames) {
            this.$namesListContainer.style.display = 'none';
            this.$namesToggleListContainer.style.display = 'none';
            if (this.$playerInput) {
                this.$playerInput.disabled = false;
            }
            return;
        }

        if (this.useSavedNames) {
            this.$namesListContainer.style.display = 'none';
            this.$namesToggleListContainer.style.display = 'block';
            this.renderSavedNamesToggle();
        } else {
            this.$namesListContainer.style.display = 'block';
            this.$namesToggleListContainer.style.display = 'none';
            if (!this.$namesTextarea) {
                this.renderNamesTextarea();
            }
        }
        this.$namesManageContainer.style.display = this.useSavedNames ? 'block' : 'none';
        this.syncPlayerInput();
        if (this.$playerInput) {
            this.$playerInput.disabled = showNames;
        }
    }

    parseNames() {
        if (!this.$namesTextarea) return [];
        return this.$namesTextarea.value
            .split(/\n+/)
            .map((name) => name.trim())
            .filter(Boolean);
    }

    async renderNamesManager() {
        this.$manageNamesButton = await slice.build('Button', {
            value: 'Administrar jugadores',
            customColor: {
                button: 'var(--secondary-color)',
                label: 'var(--font-primary-color)'
            },
            audioOnClickEnabled: true,
            onClickCallback: () => {
                this.$namesModalComponent?.open(this.loadSavedLists());
            }
        });

        this.$namesManageButton.appendChild(this.$manageNamesButton);

        this.$namesModalComponent = await slice.build('NameManagerModal', {
            lists: this.loadSavedLists()
        });

        this.$namesModalComponent.addEventListener('request-delete-list', (event) => {
            this.handleDeleteListRequest(event.detail);
        });

        this.$namesModalComponent.addEventListener('save-lists', (event) => {
            this.savedLists = event.detail.lists;
            this.selectedListId = event.detail.activeListId || this.selectedListId;
            this.saveLists(this.savedLists);
            this.renderNamesTabs();
            this.renderSavedNamesToggle();
        });

        this.$namesModalComponent.addEventListener('rename-list', (event) => {
            const { id, newName } = event.detail;
            const list = this.savedLists.find((item) => item.id === id);
            if (list) {
                list.name = newName;
                this.saveLists(this.savedLists);
                this.renderNamesTabs();
            }
        });

        this.appendChild(this.$namesModalComponent);
    }

    applySavedNamesProps() {
        if (!this.keepPlayers) {
            return;
        }

        const savedConfig = this.contextService?.getGameConfig();
        const source = savedConfig?.namesSource || (savedConfig?.useSavedNames ? 'saved' : null);
        const selectedId = savedConfig?.selectedListId || null;
        const activeFromContext = Array.isArray(savedConfig?.activeNames) ? savedConfig.activeNames : null;
        const namesFromConfig = Array.isArray(savedConfig?.names) ? savedConfig.names : [];
        const namesForTextarea = this.savedNames?.length ? this.savedNames : namesFromConfig;

        if (savedConfig) {
            this.players = savedConfig.players || 3;
            this.imposters = savedConfig.imposters || 1;
            this.names = savedConfig.names || [];
            setTimeout(() => {
                if (this.$playerInput) this.$playerInput.value = this.players;
                if (this.$impostersInput) this.$impostersInput.value = this.imposters;
                this.syncImpostersLimit();
            }, 0);
        }

        if (savedConfig && savedConfig.useNames === false) {
            this.useNames = false;
            this.useSavedNames = false;
            if (this.$namesToggle) {
                this.$namesToggle.value = [{ text: 'No', value: false }];
            }
            this.toggleNamesList();
            this.contextService?.updateGameConfig({ useNames: false, useSavedNames: false });
            return;
        }

        if (!source || source === 'new') {
            this.useNames = true;
            this.useSavedNames = false;
            if (this.$namesToggle) {
                this.$namesToggle.value = [{ text: 'Si', value: true }];
            }
            if (this.$namesSourceSelect) {
                this.$namesSourceSelect.value = [{ text: 'Ingresar nuevos', value: 'new' }];
            }
            this.toggleNamesList();
            if (!this.$namesTextarea) {
                this.renderNamesTextarea();
            }
            this.$namesTextarea.value = namesForTextarea.join('\n');
            this.syncPlayerInput();
            this.contextService?.updateGameConfig({
                names: this.parseNames(),
                namesSource: 'new',
                useSavedNames: false,
                useNames: true
            });
            return;
        }

        if (source === 'saved') {
            this.useNames = true;
            this.useSavedNames = true;
            if (selectedId) {
                this.selectedListId = selectedId;
                this.contextService?.updateGameConfig({ selectedListId: selectedId });
            }
            if (this.$namesToggle) {
                this.$namesToggle.value = [{ text: 'Si', value: true }];
            }
            if (this.$namesSourceSelect) {
                this.$namesSourceSelect.value = [{ text: 'Usar guardados', value: 'saved' }];
            }
            this.toggleNamesList();
            this.renderSavedNamesToggle();

            if (Array.isArray(activeFromContext) && this.$activeNamesRefs) {
                this.$activeNamesRefs.forEach((ref, i) => {
                    if (ref.switchComponent && activeFromContext[i] !== undefined) {
                        ref.switchComponent.checked = activeFromContext[i];
                    }
                });
                this.updateActiveNamesHint();
                this.syncPlayerInput();
                this.updateContextActiveNames();
            }
        }
    }

    renderSavedNamesToggleFrom(names) {
        if (!this.$namesToggleList) return;
        this.$namesToggleList.innerHTML = '';
        if (!names.length) return;

        this.$activeNamesRefs = [];

        names.forEach((name) => {
            const item = document.createElement('div');
            item.classList.add('name-toggle-item');

            const label = document.createElement('span');
            label.classList.add('name-toggle-label');
            label.textContent = name;
            label.style.cursor = 'pointer';
            label.addEventListener('click', () => {
                switchComponent.checked = !switchComponent.checked;
                switchComponent.dispatchEvent(new Event('change'));
            });

            const switchContainer = document.createElement('div');
            const switchComponent = document.createElement('input');
            switchComponent.type = 'checkbox';
            switchComponent.checked = true;
            switchComponent.addEventListener('change', () => {
                this.updateActiveNamesHint();
                this.syncPlayerInput();
                this.updateContextActiveNames();
            });
            switchContainer.appendChild(switchComponent);

            this.$activeNamesRefs.push({ name, switchComponent });

            item.appendChild(label);
            item.appendChild(switchContainer);
            this.$namesToggleList.appendChild(item);
        });

        this.updateActiveNamesHint();
    }

    saveNames(names) {
        if (!Array.isArray(names)) return;
        const lists = this.loadSavedLists();
        if (!this.selectedListId) {
            const newList = { id: this.generateListId(), name: 'Lista 1', names };
            lists.push(newList);
            this.selectedListId = newList.id;
        } else {
            const list = lists.find((item) => item.id === this.selectedListId);
            if (list) list.names = names;
        }
        this.saveLists(lists);
    }

    loadSavedNames() {
        const lists = this.loadSavedLists();
        if (!lists.length) return [];
        if (!this.selectedListId) {
            this.selectedListId = lists[0].id;
        }
        return this.getSelectedListNames();
    }

    loadSavedLists() {
        let saved = null;
        if (this.storage?.getItem) {
            saved = this.storage.getItem(this.storageListsKey);
        } else {
            try {
                const item = localStorage.getItem(this.storageListsKey);
                saved = item ? JSON.parse(item) : null;
            } catch (error) {
                saved = null;
            }
        }
        if (saved && Array.isArray(saved) && saved.length > 0) {
            return saved;
        }
        // If no saved data, save and return defaults
        const defaultLists = [
            {
                id: 'default_clientes_web',
                name: 'Clientes Web',
                names: [
                    'FRANCISCO BARRIOS',
                    'ANGELO CASTELLANI',
                    'CEBRIAN IRIARTE',
                    'JHONMAR MORALES',
                    'YANIER ROMERO',
                    'GIANPAOLO STRADELLA'
                ]
            },
            {
                id: 'default_programacion2',
                name: 'Programacion 2',
                names: [
                    'CARLOS ATENCIO',
                    'REINALDO BELMONTE',
                    'JOSE BLANCO',
                    'CARLOS BRACHO',
                    'PABLO CAMPOS',
                    'HANNA FUENTES',
                    'ANDRES GARCIA',
                    'JESUS GIL',
                    'JUAN GONZALEZ',
                    'VICENTE HERNANDEZ',
                    'SANTIAGO LANDAETA',
                    'FRANCISCO LOPEZ',
                    'JULIO MARIN',
                    'ANDRES MARTINEZ',
                    'ANA MUJICA',
                    'JOSE NEGRETTE',
                    'LUIS NOVOA',
                    'ARTURO PARRA',
                    'JONNER PAZ',
                    'VANESSA PEREZ',
                    'LUIS PINEL',
                    'CHRIS POLO',
                    'SANTIAGO SALAS',
                    'ADRIAN SIHUES',
                    'GIANPAOLO STRADELLA',
                    'NEIL TOGANDI'
                ]
            }
        ];
        this.saveLists(defaultLists);
        return defaultLists;
    }


    saveLists(lists) {
        if (this.storage?.setItem) {
            this.storage.setItem(this.storageListsKey, lists);
        } else {
            try {
                localStorage.setItem(this.storageListsKey, JSON.stringify(lists));
            } catch (error) {
                return;
            }
        }
    }

    loadListsState() {
        this.savedLists = this.loadSavedLists();
        if (!this.selectedListId && this.savedLists.length) {
            this.selectedListId = this.savedLists[0].id;
        }
    }

    getSelectedListNames() {
        this.loadListsState();
        const list = this.savedLists.find((item) => item.id === this.selectedListId) || this.savedLists[0];
        if (!list) return [];
        this.selectedListId = list.id;
        return list.names || [];
    }

    renderNamesTabs() {
        if (!this.$namesListsTabs) return;
        this.loadListsState();
        this.$namesListsTabs.innerHTML = '';
        this.savedLists.forEach((list) => {
            const tab = document.createElement('button');
            tab.classList.add('names-list-tab');
            if (list.id === this.selectedListId) {
                tab.classList.add('active');
            }
            tab.type = 'button';
            tab.textContent = list.name || 'Lista';
            tab.addEventListener('click', () => {
                this.useNames = true;
                this.useSavedNames = true;
                this.selectedListId = list.id;
                this.contextService?.updateGameConfig({
                    selectedListId: list.id,
                    useNames: true,
                    useSavedNames: true,
                    namesSource: 'saved'
                });
                this.renderSavedNamesToggle();
                const currentNames = this.getSelectedListNames();
                const playerCount = this.getActiveSavedNames().length || currentNames.length;
                if (this.$playerInput) {
                    this.$playerInput.value = playerCount;
                }
                this.contextService?.updateGameConfig({
                    players: playerCount,
                    names: currentNames,
                    activeNames: currentNames.map(() => true)
                });
            });
            this.$namesListsTabs.appendChild(tab);
        });
    }

    generateListId() {
        return `list_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    }

    loadCategories() {
        const saved = this.storage?.getItem ? this.storage.getItem(this.categoriesKey) : null;
        if (saved && typeof saved === 'object') {
            this.categories = { ...this.defaultCategories, ...saved };
        } else {
            try {
                const raw = localStorage.getItem(this.categoriesKey);
                const parsed = raw ? JSON.parse(raw) : null;
                if (parsed) {
                    this.categories = { ...this.defaultCategories, ...parsed };
                }
            } catch (error) {
                this.categories = { ...this.defaultCategories };
            }
        }
    }

    saveCategories() {
        const customCategories = { ...this.categories };
        Object.keys(this.defaultCategories).forEach((key) => {
            delete customCategories[key];
        });
        if (this.storage?.setItem) {
            this.storage.setItem(this.categoriesKey, customCategories);
        } else {
            try {
                localStorage.setItem(this.categoriesKey, JSON.stringify(customCategories));
            } catch (error) {
                return;
            }
        }
    }

    renderSavedNamesToggle() {
        if (!this.$namesToggleList) return;
        const savedNames = this.getSelectedListNames();
        this.$namesToggleList.innerHTML = '';

        if (!savedNames.length) {
            this.$namesToggleList.innerHTML = '<p class="hint">No hay nombres guardados.</p>';
            this.$namesActiveHint.textContent = '';
            return;
        }

        this.renderSavedNamesToggleFrom(savedNames);
        this.renderNamesTabs();
        this.syncPlayerInput();
        this.updateContextActiveNames();
        if (this.useSavedNames) {
            const playerCount = this.getActiveSavedNames().length;
            if (this.$playerInput) {
                this.$playerInput.value = playerCount;
            }
            this.contextService?.updateGameConfig({
                names: savedNames,
                players: playerCount
            });
        }
    }

    getActiveSavedNames() {
        if (!Array.isArray(this.$activeNamesRefs)) return [];
        return this.$activeNamesRefs
            .filter(({ switchComponent }) => switchComponent?.checked)
            .map(({ name }) => name);
    }

    updateContextActiveNames() {
        if (!Array.isArray(this.$activeNamesRefs)) {
            this.contextService?.updateGameConfig({ activeNames: [] });
            return;
        }

        const active = this.$activeNamesRefs.map(({ switchComponent }) => switchComponent.checked);
        this.contextService?.updateGameConfig({ activeNames: active });
    }

    updateActiveNamesHint() {
        if (!this.$namesActiveHint) return;
        const activeCount = this.getActiveSavedNames().length;
        this.$namesActiveHint.textContent = `Activos: ${activeCount}`;
    }

    syncPlayerInput() {
        if (!this.useNames || !this.$playerInput) return;
        let count = 0;
        if (this.useSavedNames) {
            count = this.getActiveSavedNames().length;
        } else {
            count = this.parseNames().length;
        }
        this.$playerInput.value = count;
        this.contextService?.updateGameConfig({ players: count });
        this.syncImpostersLimit();
    }

    bindContextWatchers() {
        if (this.contextWatchId || !this.contextService) {
            return;
        }

        this.contextWatchId = this.contextService.watchGameConfig(
            this,
            (config) => {
                if (!config || !this.$playerInput) {
                    return;
                }

                if (!config.useNames) {
                    return;
                }

                let count = 0;
                if (config.useSavedNames) {
                    if (Array.isArray(config.activeNames) && config.activeNames.length) {
                        count = config.activeNames.filter(Boolean).length;
                    } else if (Array.isArray(config.names)) {
                        count = config.names.length;
                    }
                } else if (Array.isArray(config.names)) {
                    count = config.names.length;
                }

                this.$playerInput.value = count;
                this.syncImpostersLimit();
            },
            (state) => ({
                names: state?.names,
                useNames: state?.useNames,
                useSavedNames: state?.useSavedNames,
                activeNames: state?.activeNames
            })
        );
    }

    syncGameConfigFromContext() {
        const savedConfig = this.contextService?.getGameConfig();
        if (!savedConfig) {
            return;
        }

        this.players = savedConfig.players || 3;
        this.imposters = savedConfig.imposters || 1;
        this.names = savedConfig.names || [];
        this.mode = savedConfig.mode || this.mode;
        this.useNames = savedConfig.useNames ?? this.useNames;
        this.useSavedNames = savedConfig.useSavedNames ?? this.useSavedNames;
        this.category = savedConfig.category || this.category;

        setTimeout(() => {
            if (this.$playerInput) this.$playerInput.value = this.players;
            if (this.$impostersInput) this.$impostersInput.value = this.imposters;
            if (this.$modeSelect && this.mode) {
                const match = this.$modeSelect.options?.find((option) => option.value === this.mode);
                if (match) {
                    this.$modeSelect.value = [match];
                }
            }
            if (this.$namesToggle) {
                this.$namesToggle.value = [{ text: this.useNames ? 'Si' : 'No', value: this.useNames }];
            }
            if (this.$namesSourceSelect) {
                const sourceValue = this.useSavedNames ? 'saved' : 'new';
                const sourceText = this.useSavedNames ? 'Usar guardados' : 'Ingresar nuevos';
                this.$namesSourceSelect.value = [{ text: sourceText, value: sourceValue }];
            }
            if (this.$categorySelect && this.category) {
                const categoryMatch = this.$categorySelect.options?.find((option) => option.value === this.category);
                if (categoryMatch) {
                    this.$categorySelect.value = [categoryMatch];
                }
            }
            if (this.$customWordInput) {
                this.$customWordInput.value = savedConfig.customWord || '';
            }
            this.toggleModeInputs();
            this.toggleNamesList();
            this.syncImpostersLimit();
        }, 0);
    }

    setFeedback(message) {
        if (!this.$formFeedback) return;
        this.$formFeedback.textContent = message;
    }
}

customElements.define('slice-game-setup', GameSetup);
