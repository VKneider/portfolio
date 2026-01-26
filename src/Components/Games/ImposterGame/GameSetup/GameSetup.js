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

    constructor() {
        super();
        slice.attachTemplate(this);
        this.storage = null;
        this.storageKey = 'imposterGamePlayers';
        this.storageListsKey = 'imposterGamePlayersLists';
        this.categoriesKey = 'imposterGameCategories';
        this.mode = 'automatic';
        this.players = 3;
        this.imposters = 1;
        this.useNames = false;
        this.useSavedNames = false;
        this.category = 'random';
        this.customWord = '';
        this.names = [];
        this.selectedListId = null;
        this.savedLists = [];
        this.defaultCategories = {
            'git & github': ['Repositorio', 'Commit', 'Branch', 'Merge', 'Pull Request', 'Issue', 'Fork'],
            'html & css': ['Etiqueta', 'Flexbox', 'Grid', 'Selector', 'Margin', 'Padding', 'Responsive'],
            'javascript': ['Array', 'Closure', 'Promise', 'Async', 'Callback', 'Scope', 'Prototype']
        };
        this.categories = { ...this.defaultCategories };
    }

    async init() {
        this.cacheElements();
        this.bindEvents();
        await this.initStorage();
        this.loadCategories();
        await this.renderModeSelect();
        await this.renderPlayerInput();
        await this.renderImpostersInput();
        await this.renderNamesToggle();
        await this.renderNamesSourceSelect();
        await this.renderNamesManager();
        await this.renderCustomWordInput();
        await this.renderCategories();
        await this.renderCategoryManager();
        await this.renderStartButton();
        this.applySavedNamesProps();
        this.syncImpostersLimit();
    }

    async initStorage() {
        try {
            this.storage = await slice.build('LocalStorageManager', {});
        } catch (error) {
            this.storage = null;
        }
    }

    cacheElements() {
        this.$modeContainer = this.querySelector('#mode-container .mode-toggle');
        this.$playersContainer = this.querySelector('#players-container');
        this.$impostersContainer = this.querySelector('#imposters-container');
        this.$namesToggleContainer = this.querySelector('#names-toggle');
        this.$namesListContainer = this.querySelector('#names-list-container');
        this.$namesTextarea = this.querySelector('#names-list');
        this.$namesSourceContainer = this.querySelector('#names-source-container');
        this.$namesSource = this.querySelector('#names-source');
        this.$namesSourceHint = this.querySelector('#names-source-hint');
        this.$namesToggleListContainer = this.querySelector('#names-toggle-list-container');
        this.$namesToggleList = this.querySelector('#names-toggle-list');
        this.$namesActiveHint = this.querySelector('#names-active-hint');
        this.$namesManageContainer = this.querySelector('#names-manage-container');
        this.$namesManageButton = this.querySelector('#names-manage-button');
        this.$namesListsTabs = this.querySelector('#names-lists-tabs');
        this.$categoryContainer = this.querySelector('#category-container');
        this.$categoryManageButton = this.querySelector('#category-manage-button');
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
        if (options.length) {
            this.$modeSelect.value = [options[0]];
        }
        this.mode = 'automatic';
    }

    async renderPlayerInput() {
        this.$playerInput = await slice.build('Input', {
            type: 'number',
            label: 'Numero de jugadores',
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
            label: 'Cantidad de impostores',
            placeholder: 'Impostores',
            value: '1'
        });

        this.$impostersInput.init();
        this.$impostersContainer.appendChild(this.$impostersInput);

        this.$impostersInput.querySelector('input')?.addEventListener('input', () => {
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
            label: 'Nombres personalizados',
            onOptionSelect: async () => {
                if (this.$namesToggle.value) {
                    this.useNames = this.$namesToggle.value.value === true || this.$namesToggle.value.value === 'true';
                    this.toggleNamesList();
                }
            }
        });

        this.$namesToggle.init();
        this.$namesToggleContainer.appendChild(this.$namesToggle);
        if (options.length) {
            this.$namesToggle.value = [options[0]];
        }
        this.useNames = false;
        this.toggleNamesList();
    }

    async renderNamesSourceSelect() {
        const options = [
            { text: 'Ingresar nuevos', value: 'new' },
            { text: 'Usar guardados', value: 'saved' }
        ];

        this.$namesSourceSelect = await slice.build('Select', {
            options: options,
            label: 'Fuente',
            onOptionSelect: async () => {
                if (this.$namesSourceSelect.value) {
                    this.useSavedNames = this.$namesSourceSelect.value.value === 'saved';
                    this.toggleNamesList();
                }
            }
        });

        this.$namesSourceSelect.init();
        this.$namesSource.appendChild(this.$namesSourceSelect);
        if (options.length) {
            this.$namesSourceSelect.value = [options[0]];
        }
        this.useSavedNames = false;
        this.toggleNamesList();
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
        if (options.length) {
            this.category = options[0].value;
            this.$categorySelect.value = [options[0]];
        }
    }

    async renderCategoryManager() {
        this.$manageCategoriesButton = await slice.build('Button', {
            value: 'Administrar categorias',
            customColor: {
                button: 'var(--secondary-color)',
                label: 'var(--secondary-color-contrast)'
            },
            onClickCallback: () => {
                this.$categoryModalComponent?.open(this.category);
            }
        });

        this.$manageCategoriesButton.init();
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
            this.$categoryContainer.style.display = 'block';
            this.$customWordContainer.style.display = 'none';
        } else {
            this.$categoryContainer.style.display = 'none';
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

        if (this.useNames) {
            if (this.useSavedNames) {
                this.names = this.getActiveSavedNames();
            } else {
                this.names = this.parseNames();
            }
        } else {
            this.names = [];
        }

        this.dispatchEvent(new CustomEvent('game-start', {
            detail: {
                players: this.players,
                imposters: this.imposters,
                names: this.names,
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
        this.$namesManageContainer.style.display = showNames ? 'block' : 'none';

        if (!showNames) {
            this.$namesListContainer.style.display = 'none';
            this.$namesToggleListContainer.style.display = 'none';
            return;
        }

        if (this.useSavedNames) {
            this.$namesListContainer.style.display = 'none';
            this.$namesToggleListContainer.style.display = 'block';
            this.renderSavedNamesToggle();
            this.$namesSourceHint.textContent = 'Elige y desactiva jugadores que no esten presentes.';
        } else {
            this.$namesListContainer.style.display = 'block';
            this.$namesToggleListContainer.style.display = 'none';
            this.$namesSourceHint.textContent = 'Estos nombres no se guardaran.';
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
                label: 'var(--secondary-color-contrast)'
            },
            onClickCallback: () => {
                this.$namesModalComponent?.open(this.loadSavedLists());
            }
        });

        this.$manageNamesButton.init();
        this.$namesManageButton.appendChild(this.$manageNamesButton);

        this.$namesModalComponent = await slice.build('NameManagerModal', {
            lists: this.loadSavedLists()
        });

        this.$namesModalComponent.addEventListener('request-delete-list', (event) => {
            this.handleDeleteListRequest(event.detail);
        });

        this.appendChild(this.$namesModalComponent);
    }

    applySavedNamesProps() {
        if (this.keepPlayers && Array.isArray(this.savedNames) && this.savedNames.length) {
            this.useNames = true;
            this.useSavedNames = true;
            if (this.$namesToggle) {
                this.$namesToggle.value = [{ text: 'Si', value: true }];
            }
            if (this.$namesSourceSelect) {
                this.$namesSourceSelect.value = [{ text: 'Usar guardados', value: 'saved' }];
            }
            this.toggleNamesList();
            this.renderSavedNamesToggleFrom(this.savedNames);
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
                this.selectedListId = list.id;
                this.renderSavedNamesToggle();
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
    }

    getActiveSavedNames() {
        if (!Array.isArray(this.$activeNamesRefs)) return [];
        return this.$activeNamesRefs
            .filter(({ switchComponent }) => switchComponent?.checked)
            .map(({ name }) => name);
    }

    updateActiveNamesHint() {
        if (!this.$namesActiveHint) return;
        const activeCount = this.getActiveSavedNames().length;
        this.$namesActiveHint.textContent = `Activos: ${activeCount}`;
    }

    syncPlayerInput() {
        if (this.useNames && this.useSavedNames && this.$playerInput) {
            const activeCount = this.getActiveSavedNames().length;
            if (activeCount > 0) {
                this.$playerInput.value = activeCount;
                this.syncImpostersLimit();
            }
        }
    }

    setFeedback(message) {
        if (!this.$formFeedback) return;
        this.$formFeedback.textContent = message;
    }
}

customElements.define('slice-game-setup', GameSetup);
