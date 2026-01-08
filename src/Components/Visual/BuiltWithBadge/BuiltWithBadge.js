export default class BuiltWithBadge extends HTMLElement {
    constructor(props) {
        super();
        try {
            slice.attachTemplate(this);
            slice.controller.setComponentProps(this, props);
            this.addEventListener('click', () => {
                window.open('https://github.com/vkneider/slice.js', '_blank');
            });
            console.log("BuiltWithBadge initialized");
        } catch (error) {
            console.error("BuiltWithBadge initialization failed", error);
        }
    }
    
    connectedCallback() {
        this.style.display = 'block';
    }
}

customElements.define("slice-built-with-badge", BuiltWithBadge);