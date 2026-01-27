export default class CategoryManagerModal extends HTMLElement {
    static props = {
        categories: {
            type: 'object',
            default: {}
        }
    };

    constructor(props) {
        super();
        slice.attachTemplate(this);
        this.words = [];
        this.activeCategoryKey = null;
        if (props) {
            slice.controller.setComponentProps(this, props);
        }
    }

    async init() {
        this.cacheElements();
        this.bindEvents();
        await this.renderTabs();
        await this.renderButtons();
    }

    cacheElements() {
        this.$modal = this.querySelector('.category-modal');
        this.$categoryDisplayName = this.querySelector('#category-display-name');
        this.$addWordButton = this.querySelector('#add-word-button');
        this.$wordsList = this.querySelector('#words-list');
        this.$categoryFeedback = this.querySelector('#category-feedback');
        this.$categoryDeleteButton = this.querySelector('#category-delete-button');
        this.$categoryCloseButton = this.querySelector('#category-close-button');
        this.$categoryTabs = this.querySelector('#category-tabs');
    }

    bindEvents() {
        if (this.$modal) {
            this.$modal.addEventListener('click', (event) => {
                if (event.target === this.$modal) {
                    this.close();
                }
            });
        }
        if (this.$categoryDisplayName) {
            this.$categoryDisplayName.addEventListener('blur', () => {
                this.autoSave();
            });
        }
    }

    async renderTabs() {
        if (!this.$categoryTabs) return;
        this.$categoryTabs.innerHTML = '';
        Object.keys(this.categories).forEach((key) => {
            const tab = document.createElement('button');
            tab.type = 'button';
            tab.classList.add('category-tab');
            if (key === this.activeCategoryKey) {
                tab.classList.add('active');
            }
            tab.textContent = key.charAt(0).toUpperCase() + key.slice(1);
            tab.addEventListener('click', () => {
                this.activeCategoryKey = key;
                this.populateCategory(key);
                this.renderTabs();
            });
            this.$categoryTabs.appendChild(tab);
        });
        const addTab = document.createElement('button');
        addTab.type = 'button';
        addTab.classList.add('category-tab');
        addTab.textContent = '+ Nueva categoria';
        addTab.addEventListener('click', () => {
            const newKey = this.generateCategoryKey();
            this.categories[newKey] = [];
            this.activeCategoryKey = newKey;
            this.populateCategory(newKey);
            this.renderTabs();
        });
        this.$categoryTabs.appendChild(addTab);
    }

    async renderInputs() {}

    async renderButtons() {
        this.$addWord = await slice.build('Button', {
            value: '+',
            customColor: {
                button: 'var(--primary-color)',
                label: 'var(--secondary-color-contrast)'
            },
            onClickCallback: () => {
                this.addWord();
            }
        });

        this.$deleteCategory = await slice.build('Button', {
            value: 'Eliminar categoria',
            customColor: {
                button: 'var(--danger-color)',
                label: 'var(--danger-contrast)'
            },
            onClickCallback: () => {
                this.requestDelete();
            }
        });

        this.$closeModal = await slice.build('Button', {
            value: 'Cerrar',
            customColor: {
                button: 'var(--secondary-color)',
                label: 'var(--secondary-color-contrast)'
            },
            onClickCallback: () => {
                this.close();
            }
        });

        this.$addWordButton.appendChild(this.$addWord);
        this.$categoryDeleteButton.appendChild(this.$deleteCategory);
        this.$categoryCloseButton.appendChild(this.$closeModal);
    }

    generateCategoryKey() {
        // make it shorter but include date
        const timestamp = Date.now().toString(36).slice(-5).slice(4);
        return `categoria-${timestamp}`;
        
    }

    populateCategory(categoryKey) {
        if (!this.$categoryDisplayName) return;
        this.activeCategoryKey = categoryKey;
        if (this.categories[categoryKey]) {
            this.$categoryDisplayName.textContent = categoryKey;
            this.words = [...(this.categories[categoryKey] || [])];
        } else {
            this.$categoryDisplayName.textContent = 'Nueva categoria';
            this.words = [];
        }
        this.toggleTitleEdit(true);
        this.words = this.normalizeWords(this.words);
        this.renderWordChips();
    }

    renderWordChips() {
        if (!this.$wordsList) return;
        this.$wordsList.innerHTML = '';
        const duplicateIndexes = this.getDuplicateIndexes();
        this.words.forEach((word, index) => {
            const chip = document.createElement('div');
            chip.classList.add('word-chip');
            if (!`${word}`.trim()) {
                chip.classList.add('empty');
            }
            if (duplicateIndexes.has(index)) {
                chip.classList.add('duplicate');
                chip.title = 'Palabra duplicada';
            }
            const input = document.createElement('input');
            input.type = 'text';
            input.value = word;
            input.addEventListener('input', (event) => {
                this.words[index] = event.target.value;
                if (`${event.target.value}`.trim()) {
                    chip.classList.remove('empty');
                } else {
                    chip.classList.add('empty');
                }
                chip.classList.remove('duplicate');
                chip.removeAttribute('title');
            });
            input.addEventListener('blur', () => {
                this.words[index] = `${this.words[index]}`.trim();
                this.renderWordChips();
            });
            input.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    this.words[index] = `${this.words[index]}`.trim();
                    this.addWord();
                }
            });

            const removeButton = document.createElement('button');
            removeButton.type = 'button';
            removeButton.textContent = 'x';
            removeButton.addEventListener('click', (event) => {
                event.stopPropagation();
                this.removeWord(index);
            });

            chip.appendChild(input);
            chip.appendChild(removeButton);
            this.$wordsList.appendChild(chip);
        });
    }

    addWord() {
        const nextIndex = this.getNextWordIndex();
        this.words.push(`Palabra ${nextIndex}`);
        this.renderWordChips();
        const inputs = this.$wordsList.querySelectorAll('input');
        const lastInput = inputs[inputs.length - 1];
        if (lastInput) {
            lastInput.select();
            lastInput.focus();
        }
    }

    getNextWordIndex() {
        const matches = this.words
            .map((word) => `${word}`.trim())
            .map((word) => {
                const match = /^palabra\s+(\d+)$/i.exec(word);
                return match ? parseInt(match[1]) : null;
            })
            .filter((value) => Number.isInteger(value));
        const max = matches.length ? Math.max(...matches) : 0;
        return max + 1;
    }

    removeWord(index) {
        this.words.splice(index, 1);
        this.renderWordChips();
        this.autoSave();
    }


    save() {
        const name = `${this.$categoryDisplayName.textContent}`.trim().toLowerCase();
        if (!name) {
            this.setFeedback('El nombre de la categoria es requerido.');
            return false;
        }
        if (this.getDuplicateIndexes().size) {
            this.setFeedback('Hay palabras duplicadas.');
            return false;
        }
        if (this.words.some((word) => !`${word}`.trim())) {
            this.setFeedback('No se permiten palabras vacias.');
            return false;
        }
        this.words = this.normalizeWords(this.words);
        if (!this.words.length) {
            this.setFeedback('Agrega al menos una palabra.');
            return false;
        }

        if (name === this.activeCategoryKey) {
            this.dispatchEvent(new CustomEvent('save-category', {
                detail: {
                    name,
                    words: this.words
                },
                bubbles: true
            }));
            this.setFeedback('Categoria guardada.');
        }
        return true;
    }

    normalizeWords(words) {
        const cleaned = words
            .map((word) => `${word}`.trim())
            .filter(Boolean);
        const unique = Array.from(new Set(cleaned.map((word) => word.toLowerCase())))
            .map((lower) => cleaned.find((word) => word.toLowerCase() === lower));
        return unique.sort((a, b) => a.localeCompare(b));
    }

    getDuplicateIndexes() {
        const seen = new Map();
        const duplicates = new Set();
        this.words.forEach((word, index) => {
            const key = `${word}`.trim().toLowerCase();
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

    delete() {
        const name = `${this.$categoryDisplayName.textContent}`.trim().toLowerCase();
        if (!name) {
            this.setFeedback('Selecciona una categoria valida.');
            return;
        }
        if (name === 'random') {
            this.setFeedback('No puedes eliminar la categoria random.');
            return;
        }
        this.dispatchEvent(new CustomEvent('delete-category', {
            detail: { name },
            bubbles: true
        }));
    }

    updateCategories(categories, selectedKey) {
        this.categories = categories || {};
        this.activeCategoryKey = selectedKey || Object.keys(this.categories)[0] || null;
        this.renderTabs();
        if (this.activeCategoryKey) {
            this.populateCategory(this.activeCategoryKey);
        }
    }

    requestDelete() {
        const name = `${this.$categoryDisplayName.textContent}`.trim();
        if (!name) return;
        this.dispatchEvent(new CustomEvent('request-delete-category', {
            detail: { name },
            bubbles: true
        }));
    }

    setFeedback(message) {
        if (!this.$categoryFeedback) return;
        this.$categoryFeedback.textContent = message;
    }

    open(selectedKey = null) {
        this.$modal.classList.add('open');
        this.$modal.removeAttribute('inert');
        if (selectedKey && this.categories[selectedKey]) {
            this.activeCategoryKey = selectedKey;
            this.populateCategory(selectedKey);
            this.renderTabs();
        }
        this.autoSave();
    }

    close() {
        this.$modal.classList.remove('open');
        // Move focus out of modal to prevent accessibility issues
        if (this.$modal.contains(document.activeElement)) {
            document.activeElement.blur();
        }
        this.$modal.setAttribute('inert', '');
        this.autoSave();
    }

    toggleTitleEdit(show) {
        if (!this.$categoryDisplayName) return;
        this.$categoryDisplayName.contentEditable = show ? 'true' : 'false';
        if (show) {
            this.$categoryDisplayName.focus();
            document.getSelection()?.selectAllChildren(this.$categoryDisplayName);
        } else {
            this.$categoryDisplayName.blur();
        }
    }

    autoSave() {
        if (this.save()) {
            const newName = `${this.$categoryDisplayName.textContent}`.trim().toLowerCase();
            if (newName && this.activeCategoryKey !== newName) {
                this.dispatchEvent(new CustomEvent('category-rename', {
                    detail: { previousName: this.activeCategoryKey, newName, words: this.words },
                    bubbles: true
                }));
            }
        }
    }
}

customElements.define('slice-category-manager-modal', CategoryManagerModal);
