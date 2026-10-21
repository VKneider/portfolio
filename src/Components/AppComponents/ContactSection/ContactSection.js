export default class ContactSection extends HTMLElement {
  constructor(props) {
    super();
    slice.attachTemplate(this);

    this.$actions = this.querySelector('.contact-actions');

    slice.controller.setComponentProps(this, props);
    this.debuggerProps = [];
  }

  async init() {
    const emailButton = await slice.build('Button', {
      value: 'Email me',
      customColor: {
        button: 'var(--accent)',
        label: 'var(--on-accent)'
      },
      onClickCallback: () => {
        const subject = encodeURIComponent('Project inquiry');
        window.location.href = `mailto:victorkneider@gmail.com?subject=${subject}`;
      }
    });
    emailButton.classList.add('contact-btn', 'contact-btn-primary');

    const linkedinButton = await slice.build('Button', {
      value: 'Connect on LinkedIn',
      customColor: {
        button: 'transparent',
        label: 'var(--text-1)'
      },
      onClickCallback: () => {
        window.open('https://www.linkedin.com/in/vkneider/', '_blank', 'noopener,noreferrer');
      }
    });
    linkedinButton.classList.add('contact-btn', 'contact-btn-ghost');

    this.$actions.append(emailButton, linkedinButton);

    const projectsLink = this.querySelector('.contact-elsewhere a[href="/projects"]');
    if (projectsLink) {
      projectsLink.addEventListener('click', async (event) => {
        event.preventDefault();
        await slice.router.navigate('/projects');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }
}

customElements.define('slice-contact-section', ContactSection);
