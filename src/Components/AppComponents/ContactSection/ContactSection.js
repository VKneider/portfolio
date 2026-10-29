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
      value: slice.t.ref('contact.email'),
      customColor: {
        button: 'var(--accent)',
        label: 'var(--on-accent)'
      },
      onClickCallback: () => {
        const subject = encodeURIComponent(slice.t('contact.subject'));
        window.location.href = `mailto:victorkneider@gmail.com?subject=${subject}`;
      }
    });
    emailButton.classList.add('contact-btn', 'contact-btn-primary');

    const linkedinButton = await slice.build('Button', {
      value: slice.t.ref('contact.linkedin'),
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

    this.$projectsLink = this.querySelector('.contact-projects-link');
    if (this.$projectsLink) {
      this.$projectsLink.href = slice.href('/projects');
      this.$projectsLink.addEventListener('click', async (event) => {
        event.preventDefault();
        await slice.router.navigate('/projects');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    slice.translator.watch(this, () => {
      if (this.$projectsLink) this.$projectsLink.href = slice.href('/projects');
    });
  }
}

customElements.define('slice-contact-section', ContactSection);
