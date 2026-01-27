export default class ConfirmationModal extends HTMLElement {
    constructor(props) {
        super();
        slice.attachTemplate(this);
        this.onConfirm = null;
        if (props) {
            slice.controller.setComponentProps(this, props);
        }
    }

    async init() {
        this.cacheElements();
        await this.renderButtons();
    }

    cacheElements() {
        this.$modal = this.querySelector('.confirmation-modal');
        this.$title = this.querySelector('#confirmation-title');
        this.$message = this.querySelector('#confirmation-message');
        this.$cancel = this.querySelector('#confirm-cancel');
        this.$accept = this.querySelector('#confirm-accept');
    }

    async renderButtons() {
        this.$cancelButton = await slice.build('Button', {
            value: 'Cancelar',
            customColor: {
                button: 'var(--secondary-color)',
                label: 'var(--secondary-color-contrast)'
            },
            audioOnClickEnabled: true,
            onClickCallback: () => {
                this.close();
            }
        });

        this.$acceptButton = await slice.build('Button', {
            value: 'Confirmar',
            customColor: {
                button: 'var(--danger-color)',
                label: 'var(--danger-contrast)'
            },
            audioOnClickEnabled: true,
            onClickCallback: () => {
                if (this.onConfirm) {
                    this.onConfirm();
                }
                this.close();
            }
        });

        this.$cancelButton.init();
        this.$acceptButton.init();

        this.$cancel.appendChild(this.$cancelButton);
        this.$accept.appendChild(this.$acceptButton);
    }

    open({ title, message, onConfirm }) {
        if (this.$title) this.$title.textContent = title || 'Confirmar accion';
        if (this.$message) this.$message.textContent = message || '';
        this.onConfirm = onConfirm || null;
        this.$modal.classList.add('open');
        this.$modal.setAttribute('aria-hidden', 'false');
    }

    close() {
        this.$modal.classList.remove('open');
        this.$modal.setAttribute('aria-hidden', 'true');
    }
}

customElements.define('slice-confirmation-modal', ConfirmationModal);
