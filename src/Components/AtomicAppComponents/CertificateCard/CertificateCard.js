export default class CertificateCard extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);
      
      // Get template elements
      this.$card = this.querySelector('.certificate-card');
      this.$issuerLogo = this.querySelector('.issuer-logo');
      this.$issuerInitials = this.querySelector('.issuer-initials');
      this.$title = this.querySelector('.certificate-title');
      this.$issuer = this.querySelector('.certificate-issuer');
      this.$description = this.querySelector('.certificate-description');
      this.$dates = this.querySelector('.certificate-dates');
      this.$credentialId = this.querySelector('.credential-id');
      this.$skillsList = this.querySelector('.skills-list');
      this.$actions = this.querySelector('.certificate-actions');
      
      slice.controller.setComponentProps(this, props);
      this.debuggerProps = ['certificate', 'animationDelay'];
   }

   async init() {
      if (!this.certificate) return;
      
      // Set animation delay
      if (this.animationDelay) {
         this.$card.style.animationDelay = `${this.animationDelay}s`;
      }
      
      // Populate template with data
      await this.populateTemplate();
   }

   async populateTemplate() {
      // Set issuer logo
      if (this.certificate.issuerLogo) {
         this.$issuerLogo.src = this.certificate.issuerLogo;
         this.$issuerLogo.alt = `${this.certificate.issuer} logo`;
         this.$issuerLogo.onerror = () => {
            this.$issuerLogo.style.display = 'none';
         };
      } else {
         this.$issuerLogo.style.display = 'none';
      }

      if (this.$issuerInitials) {
         const initials = this.certificate.issuer
            .split(' ')
            .filter(Boolean)
            .slice(0, 2)
            .map((word) => word[0].toUpperCase())
            .join('');
         this.$issuerInitials.textContent = initials || 'CI';
         if (this.certificate.issuerLogo) {
            this.$issuerInitials.style.display = 'none';
         }
      }

      // Set basic info
      this.$title.textContent = this.certificate.title;
      this.$issuer.textContent = this.certificate.issuer;
      this.$description.textContent = this.certificate.description;

      // Set meta information
      const issueDate = new Date(this.certificate.date).toLocaleDateString('en-US', {
         year: 'numeric',
         month: 'long'
      });
      
      let validityText = `Issued: ${issueDate}`;
      if (this.certificate.validUntil) {
         const validDate = new Date(this.certificate.validUntil).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
         });
         validityText += ` | Valid until: ${validDate}`;
      } else {
         validityText += ' | No expiration';
      }
      
      this.$dates.textContent = validityText;
      this.$credentialId.textContent = `ID: ${this.certificate.credentialId}`;

      // Populate skills
      this.$skillsList.innerHTML = '';
      this.certificate.skills.forEach(skill => {
         const skillTag = document.createElement('span');
         skillTag.classList.add('skill-tag');
         skillTag.textContent = skill;
         this.$skillsList.appendChild(skillTag);
      });

      // Clear existing buttons and create view certificate button
      this.$actions.innerHTML = '';
      const viewBtn = await slice.build('Button', {
         value: 'Verify credential',
         customColor: {
            button: 'var(--primary-color)',
            label: 'var(--primary-color-contrast)'
         },
         onClickCallback: () => window.open(this.certificate.certificateUrl, '_blank')
      });
      viewBtn.classList.add('view-certificate-btn');
      this.$actions.appendChild(viewBtn);
   }

   // Getters and setters
   get certificate() {
      return this._certificate;
   }

   set certificate(value) {
      this._certificate = value;
      // Don't call populateTemplate here to avoid duplication
      // It will be called in init() when the component is ready
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

customElements.define("slice-certificate-card", CertificateCard);

