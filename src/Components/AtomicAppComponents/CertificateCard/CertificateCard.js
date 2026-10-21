export default class CertificateCard extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);

      // Template elements
      this.$card = this.querySelector('.certificate-card');
      this.$previewWrap = this.querySelector('.certificate-preview-wrap');
      this.$preview = this.querySelector('.certificate-preview');
      this.$thumbnail = this.querySelector('.certificate-thumbnail');
      this.$previewFallback = this.querySelector('.certificate-preview-fallback');
      this.$issuerLogo = this.querySelector('.issuer-logo');
      this.$issuerInitials = this.querySelector('.issuer-initials');
      this.$title = this.querySelector('.certificate-title');
      this.$issuer = this.querySelector('.certificate-issuer');
      this.$description = this.querySelector('.certificate-description');
      this.$dates = this.querySelector('.certificate-dates');
      this.$credentialId = this.querySelector('.credential-id');
      this.$skillsList = this.querySelector('.skills-list');
      this.$actions = this.querySelector('.certificate-actions');

      this.$preview.addEventListener('click', () => this.requestView());

      slice.controller.setComponentProps(this, props);
      this.debuggerProps = ['certificate', 'animationDelay'];
   }

   async init() {
      if (!this.certificate) return;

      if (this.animationDelay) {
         this.$card.style.animationDelay = `${this.animationDelay}s`;
      }

      await this.populateTemplate();
   }

   async populateTemplate() {
      const certificate = this.certificate;

      this.renderPreview(certificate);
      this.renderIssuer(certificate);

      this.$title.textContent = certificate.title;
      this.$issuer.textContent = certificate.issuer;
      this.$description.textContent = certificate.description || '';

      this.$dates.textContent = this.buildMetaText(certificate);

      const credentialId = certificate.credentialId ? String(certificate.credentialId) : '';
      if (credentialId) {
         const shortId = credentialId.length > 16
            ? `${credentialId.slice(0, 12)}…`
            : credentialId;
         this.$credentialId.textContent = `ID: ${shortId}`;
         this.$credentialId.title = credentialId;
      } else {
         this.$credentialId.hidden = true;
      }

      this.$skillsList.innerHTML = '';
      for (const skill of certificate.skills || []) {
         const skillTag = document.createElement('span');
         skillTag.classList.add('skill-tag');
         skillTag.textContent = skill;
         this.$skillsList.appendChild(skillTag);
      }

      this.$actions.innerHTML = '';
      const viewBtn = await slice.build('Button', {
         value: 'View certificate',
         customColor: {
            button: 'var(--accent)',
            label: 'var(--on-accent)'
         },
         onClickCallback: () => this.requestView()
      });
      viewBtn.classList.add('view-certificate-btn');
      this.$actions.appendChild(viewBtn);
   }

   renderPreview(certificate) {
      const label = certificate.title ? `Preview: ${certificate.title}` : 'Preview certificate';
      this.$preview.setAttribute('aria-label', label);

      if (!certificate.thumbnail) {
         this.showPreviewFallback(certificate);
         return;
      }

      this.$thumbnail.addEventListener('load', () => {
         this.$thumbnail.classList.add('loaded');
      }, { once: true });
      this.$thumbnail.addEventListener('error', () => this.showPreviewFallback(certificate), { once: true });
      this.$thumbnail.src = certificate.thumbnail;

      // The image may already be cached before the listener is attached.
      if (this.$thumbnail.complete && this.$thumbnail.naturalWidth > 0) {
         this.$thumbnail.classList.add('loaded');
      }
   }

   showPreviewFallback(certificate) {
      this.$thumbnail.hidden = true;
      this.$previewWrap.classList.add('is-fallback');
      this.$previewFallback.textContent = this.getInitials(certificate.issuer);
   }

   renderIssuer(certificate) {
      if (certificate.logo) {
         this.$issuerLogo.src = certificate.logo;
         this.$issuerLogo.alt = `${certificate.issuer} logo`;
         this.$issuerLogo.onerror = () => {
            this.$issuerLogo.hidden = true;
            this.$issuerInitials.hidden = false;
         };
         this.$issuerInitials.hidden = true;
      } else {
         this.$issuerLogo.hidden = true;
      }

      this.$issuerInitials.textContent = this.getInitials(certificate.issuer);
      this.$issuerInitials.hidden = Boolean(certificate.logo);
   }

   buildMetaText(certificate) {
      const parts = [];
      if (certificate.date) parts.push(this.formatMonth(certificate.date));
      if (certificate.grade) parts.push(`Grade ${certificate.grade}`);
      return parts.join(' · ');
   }

   formatMonth(value) {
      const match = /^(\d{4})-(\d{2})/.exec(String(value));
      if (!match) return String(value);

      const date = new Date(Number(match[1]), Number(match[2]) - 1, 1);
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
   }

   getInitials(name = '') {
      const initials = String(name)
         .split(/\s+/)
         .filter(Boolean)
         .filter((word) => !['de', 'del', 'la', 'las', 'los', 'for', 'the', 'and'].includes(word.toLowerCase()))
         .slice(0, 2)
         .map((word) => word[0].toUpperCase())
         .join('');

      return initials || 'CI';
   }

   requestView() {
      if (!this.certificate) return;

      this.dispatchEvent(new CustomEvent('certificate-view', {
         bubbles: true,
         composed: true,
         detail: { certificate: this.certificate }
      }));
   }

   // Getters and setters
   get certificate() {
      return this._certificate;
   }

   set certificate(value) {
      this._certificate = value;
      // init() populates the template once the component is mounted.
   }

   get animationDelay() {
      return this._animationDelay;
   }

   set animationDelay(value) {
      this._animationDelay = value;
      if (this.$card) {
         this.$card.style.animationDelay = `${value}s`;
      }
   }
}

customElements.define('slice-certificate-card', CertificateCard);
