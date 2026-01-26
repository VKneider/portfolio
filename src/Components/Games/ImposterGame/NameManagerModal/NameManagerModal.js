export default class NameManagerModal extends HTMLElement {
    static props = {
        lists: {
            type: 'array',
            default: []
        }
    };

    constructor(props) {
        super();
        slice.attachTemplate(this);
        this.lists = [];
        this.activeListId = null;
        this.namesList = [];
        if (props) {
            slice.controller.setComponentProps(this, props);
        }
    }

    async init() {
        this.cacheElements();
        this.bindEvents();
        await this.renderButtons();
        this.loadLists(this.lists || []);
    }

    cacheElements() {
        this.$modal = this.querySelector('.name-modal');
        this.$addNameButton = this.querySelector('#add-name-button');
        this.$namesGrid = this.querySelector('#names-grid');
        this.$feedback = this.querySelector('#names-feedback');
        this.$closeButton = this.querySelector('#names-close-button');
        this.$title = this.querySelector('#names-list-title');
        this.$listsTabs = this.querySelector('#name-lists-tabs');
        this.$namesDeleteButton = this.querySelector('#names-delete-button');
    }

    bindEvents() {
        if (this.$modal) {
            this.$modal.addEventListener('click', (event) => {
                if (event.target === this.$modal) {
                    this.close();
                }
            });
        }
        if (this.$title) {
            this.$title.addEventListener('blur', () => {
                this.autoSave();
            });
        }
    }

    async renderButtons() {
        this.$addButton = await slice.build('Button', {
            value: '+',
            customColor: {
                button: 'var(--primary-color)',
                label: 'var(--secondary-color-contrast)'
            },
            onClickCallback: () => {
                this.addName();
            }
        });

        this.$deleteList = await slice.build('Button', {
            value: 'Eliminar lista',
            customColor: {
                button: 'var(--danger-color)',
                label: 'var(--danger-contrast)'
            },
            onClickCallback: () => {
                this.requestDelete();
            }
        });

        this.$close = await slice.build('Button', {
            value: 'Cerrar',
            customColor: {
                button: 'var(--secondary-color)',
                label: 'var(--secondary-color-contrast)'
            },
            onClickCallback: () => {
                this.close();
            }
        });

        this.$addButton.init();
        this.$deleteList.init();
        this.$close.init();

        this.$addNameButton.appendChild(this.$addButton);
        this.$namesDeleteButton.appendChild(this.$deleteList);
        this.$closeButton.appendChild(this.$close);
    }

    loadLists(lists) {
        this.lists = Array.isArray(lists) ? lists : [];
        // No need to create defaults here, as GameSetup provides them
        if (!this.activeListId && this.lists.length) {
            this.activeListId = this.lists[0].id;
        }
        this.updateActiveList();
        this.renderTabs();
    }

    updateActiveList() {
        const list = this.lists.find((item) => item.id === this.activeListId) || this.lists[0];
        this.activeListId = list?.id || null;
        this.namesList = list?.names ? [...list.names] : [];
        if (this.$title && list) {
            this.$title.textContent = list.name || 'Lista';
        }
        this.renderChips();
    }

    renderTabs() {
        if (!this.$listsTabs) return;
        this.$listsTabs.innerHTML = '';
        this.lists.forEach((list) => {
            const tab = document.createElement('button');
            tab.type = 'button';
            tab.classList.add('name-list-tab');
            if (list.id === this.activeListId) {
                tab.classList.add('active');
            }
            tab.textContent = list.name || 'Lista';
            tab.addEventListener('click', () => {
                this.activeListId = list.id;
                this.updateActiveList();
                this.renderTabs();
            });
            this.$listsTabs.appendChild(tab);
        });
        const addTab = document.createElement('button');
        addTab.type = 'button';
        addTab.classList.add('name-list-tab');
        addTab.textContent = '+ Nueva lista';
        addTab.addEventListener('click', () => {
            const newList = { id: this.generateListId(), name: `Lista ${this.lists.length + 1}`, names: [] };
            this.lists.push(newList);
            this.activeListId = newList.id;
            this.updateActiveList();
            this.renderTabs();
        });
        this.$listsTabs.appendChild(addTab);
    }

    renderChips() {
        if (!this.$namesGrid) return;
        this.$namesGrid.innerHTML = '';
        const duplicateIndexes = this.getDuplicateIndexes();
        this.namesList.forEach((name, index) => {
            const chip = document.createElement('div');
            chip.classList.add('name-chip');
            if (!`${name}`.trim()) {
                chip.classList.add('empty');
            }
            if (duplicateIndexes.has(index)) {
                chip.classList.add('duplicate');
                chip.title = 'Nombre duplicado';
            }

            const input = document.createElement('input');
            input.type = 'text';
            input.value = name;
            input.addEventListener('input', (event) => {
                this.namesList[index] = event.target.value;
                if (`${event.target.value}`.trim()) {
                    chip.classList.remove('empty');
                } else {
                    chip.classList.add('empty');
                }
                chip.classList.remove('duplicate');
                chip.removeAttribute('title');
            });
            input.addEventListener('blur', () => {
                this.namesList[index] = `${this.namesList[index]}`.trim();
                this.renderChips();
            });
            input.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    this.namesList[index] = `${this.namesList[index]}`.trim();
                    this.addName();
                }
            });

            const removeButton = document.createElement('button');
            removeButton.type = 'button';
            removeButton.textContent = 'x';
            removeButton.addEventListener('click', (event) => {
                event.stopPropagation();
                this.removeName(index);
            });

            chip.appendChild(input);
            chip.appendChild(removeButton);
            this.$namesGrid.appendChild(chip);
        });
    }

    addName() {
        const nextIndex = this.namesList.length + 1;
        this.namesList.push(`Jugador ${nextIndex}`);
        this.renderChips();
        const inputs = this.$namesGrid.querySelectorAll('input');
        const lastInput = inputs[inputs.length - 1];
        if (lastInput) {
            lastInput.select();
            lastInput.focus();
        }
    }

    removeName(index) {
        this.namesList.splice(index, 1);
        this.renderChips();
    }

    normalizeNames() {
        const cleaned = this.namesList
            .map((name) => `${name}`.trim())
            .filter(Boolean);
        const unique = Array.from(new Set(cleaned.map((name) => name.toLowerCase())))
            .map((lower) => cleaned.find((name) => name.toLowerCase() === lower));
        return unique.sort((a, b) => a.localeCompare(b));
    }

    getDuplicateIndexes() {
        const seen = new Map();
        const duplicates = new Set();
        this.namesList.forEach((name, index) => {
            const key = `${name}`.trim().toLowerCase();
            if (!key) return;
            if (seen.has(key)) {
                duplicates.add(index);
                duplicates.add(seen.get(key));
            } else {
                seen.set(key, index);
            }
        });
        return duplicates;
    }

    open(lists) {
        if (Array.isArray(lists)) {
            this.loadLists(lists);
        }
        this.$modal.classList.add('open');
        this.$modal.setAttribute('aria-hidden', 'false');
    }

    close() {
        this.$modal.classList.remove('open');
        this.$modal.setAttribute('aria-hidden', 'true');
        this.dispatchSave();
    }

    dispatchSave() {
        if (this.getDuplicateIndexes().size) {
            this.setFeedback('Hay nombres duplicados.');
            return;
        }
        if (this.namesList.some((name) => !`${name}`.trim())) {
            this.setFeedback('No se permiten nombres vacios.');
            return;
        }
        this.namesList = this.normalizeNames();
        this.syncActiveList();
        this.dispatchEvent(new CustomEvent('save-lists', {
            detail: { lists: this.lists, activeListId: this.activeListId },
            bubbles: true
        }));
        this.setFeedback('');
    }

    syncActiveList() {
        const list = this.lists.find((item) => item.id === this.activeListId);
        if (list) {
            list.names = this.namesList;
        }
    }

    autoSave() {
        const list = this.lists.find((item) => item.id === this.activeListId);
        if (!list) return;
        const previousName = list.name;
        const newName = `${this.$title.textContent}`.trim();
        if (newName && previousName !== newName) {
            list.name = newName;
            this.renderTabs();
            this.dispatchEvent(new CustomEvent('rename-list', {
                detail: { previousName, newName, id: this.activeListId },
                bubbles: true
            }));
        }
    }

    setFeedback(message) {
        if (!this.$feedback) return;
        this.$feedback.textContent = message;
    }

    requestDelete() {
        const name = `${this.$title.textContent}`.trim();
        if (!name) return;
        this.dispatchEvent(new CustomEvent('request-delete-list', {
            detail: { name },
            bubbles: true
        }));
    }

    delete() {
        const name = `${this.$title.textContent}`.trim();
        if (!name) {
            this.setFeedback('Selecciona una lista valida.');
            return;
        }
        if (this.lists.length <= 1) {
            this.setFeedback('Debes tener al menos una lista.');
            return;
        }
        this.lists = this.lists.filter((list) => list.name !== name);
        this.activeListId = this.lists[0]?.id || null;
        this.updateActiveList();
        this.renderTabs();
        this.dispatchEvent(new CustomEvent('delete-list', {
            detail: { name },
            bubbles: true
        }));
    }

    generateListId() {
        return `list_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    }
}

customElements.define('slice-name-manager-modal', NameManagerModal);
