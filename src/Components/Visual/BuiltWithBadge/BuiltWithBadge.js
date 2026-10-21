export default class BuiltWithBadge extends HTMLElement {
    constructor(props) {
        super();
        try {
            slice.attachTemplate(this);
            slice.controller.setComponentProps(this, props);

            const githubUrl = 'https://github.com/vkneider/slice.js';
            const openGithub = () => window.open(githubUrl, '_blank', 'noopener,noreferrer');

            this.setAttribute('role', 'link');
            this.setAttribute('tabindex', '0');
            this.setAttribute('aria-label', 'Built with Slice.js — open the GitHub repository');

            this.addEventListener('click', openGithub);
            this.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openGithub();
                }
            });
        } catch (error) {
            console.error("BuiltWithBadge initialization failed", error);
        }
    }

    connectedCallback() {
        this.style.display = 'block';
    }
}

customElements.define("slice-built-with-badge", BuiltWithBadge);
