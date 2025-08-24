export default class CertificateCard extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);
      
      // Get template elements
      this.$card = this.querySelector('.certificate-card');
      this.$image = this.querySelector('.certificate-image');
      this.$issuerLogo = this.querySelector('.issuer-logo');
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
      // Set certificate image
      this.$image.src = this.certificate.image;
      this.$image.alt = this.certificate.title;
      this.$image.loading = 'lazy';
      this.$image.onerror = () => {
         this.$image.src = '/images/certificates/certificate-placeholder.png';
      };

      // Set issuer logo
      this.$issuerLogo.src = this.certificate.issuerLogo;
      this.$issuerLogo.alt = `${this.certificate.issuer} logo`;
      this.$issuerLogo.onerror = () => {
         this.$issuerLogo.style.display = 'none';
      };

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

      // Create view certificate button
      const viewBtn = await slice.build('Button', {
         value: 'View Certificate',
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
      if (this.$card) {
         this.populateTemplate();
      }
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

