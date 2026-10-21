import { certificatesData, studiesData } from "./data.js";

export default class EducationSection extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);

      this.$container = this.querySelector('.education-container');
      this.$studies = this.querySelector('.education-studies');
      this.$certificates = this.querySelector('.education-certificates');
      this.$certificatesGrid = this.querySelector('.certificates-grid');
      this.$certificatesSearch = this.querySelector('.certificates-search-input');
      this.$certificatesCount = this.querySelector('.certificates-count');
      this.$certificatesPagination = this.querySelector('.certificates-pagination');

      slice.controller.setComponentProps(this, props);
      this.debuggerProps = [];
      this.studiesData = studiesData || [];
      this.certificatesData = certificatesData || [];
      this.filteredCertificates = [...this.certificatesData];
      this.certificatesPage = 1;
      this.certificatesPerPage = 6;

      this.$certificatesGrid.addEventListener('certificate-view', (event) => {
         this.openCertificateModal(event.detail?.certificate);
      });
   }

   async init() {
      await this.createCertificateModal();
      await this.createStudiesSection();
      await this.createCertificatesSection();
   }

   async createStudiesSection() {
      const studiesTitle = await slice.build('SectionTitle', { text: 'Educational Background' });

      const studiesContainer = document.createElement('div');
      studiesContainer.classList.add('studies-container');

      for (const [index, study] of this.studiesData.entries()) {
         const studyCard = await slice.build('StudyCard', {
            study: study,
            animationDelay: index * 0.2
         });
         studiesContainer.appendChild(studyCard);
      }

      this.$studies.appendChild(studiesTitle);
      this.$studies.appendChild(studiesContainer);
   }

   async createCertificatesSection() {
      const certificatesTitle = await slice.build('SectionTitle', { text: 'Professional Certifications' });
      this.$certificates.insertBefore(certificatesTitle, this.$certificates.firstChild);

      this.bindCertificateSearch();
      await this.renderCertificatesPage();
   }

   async createCertificateModal() {
      this.$certificateModal = await slice.build('Modal', {
         title: 'Certificate',
         width: 'min(1080px, 94vw)',
         maxWidth: '1080px',
         customColor: {
            background: 'var(--surface-1)',
            text: 'var(--text-1)',
            accent: 'var(--accent)'
         },
         onClose: () => this.resetCertificateModal()
      });
      this.$certificateModal.classList.add('certificate-modal');

      const body = document.createElement('div');
      body.className = 'certificate-modal-body';

      const preview = document.createElement('div');
      preview.className = 'certificate-modal-preview';

      this.$certificateFrame = document.createElement('iframe');
      this.$certificateFrame.className = 'certificate-modal-frame';
      this.$certificateFrame.title = 'Certificate preview';
      this.$certificateFrame.src = 'about:blank';
      this.$certificateFrame.setAttribute('allowfullscreen', '');
      this.$certificateFrame.setAttribute('referrerpolicy', 'no-referrer');
      preview.appendChild(this.$certificateFrame);

      this.$certificateImage = document.createElement('img');
      this.$certificateImage.className = 'certificate-modal-image';
      this.$certificateImage.alt = '';
      this.$certificateImage.hidden = true;
      preview.appendChild(this.$certificateImage);

      body.appendChild(preview);

      this.$certificateModalMeta = document.createElement('div');
      this.$certificateModalMeta.className = 'certificate-modal-meta';
      body.appendChild(this.$certificateModalMeta);

      this.$certificateModalNote = document.createElement('p');
      this.$certificateModalNote.className = 'certificate-modal-note';
      body.appendChild(this.$certificateModalNote);

      this.$certificateModal.appendBody(body);

      this.$driveButton = await slice.build('Button', {
         value: 'Open in Drive',
         customColor: {
            button: 'var(--accent)',
            label: 'var(--on-accent)'
         },
         onClickCallback: () => {
            const url = this.activeCertificate?.certificateUrl;
            if (url) window.open(url, '_blank', 'noopener,noreferrer');
         }
      });
      this.$certificateModal.appendFooter(this.$driveButton);

      // The library labels its close control in Spanish; this site is English.
      this.$certificateModal
         .querySelector('.slice-modal__close')
         ?.setAttribute('aria-label', 'Close');

      this.appendChild(this.$certificateModal);
   }

   openCertificateModal(certificate) {
      if (!this.$certificateModal || !certificate) return;

      this.activeCertificate = certificate;
      this.$certificateModal.title = certificate.title;
      this.$certificateFrame.title = `Preview: ${certificate.title}`;

      const useImage = certificate.previewMode === 'image' && Boolean(certificate.thumbnail);
      this.$certificateFrame.hidden = useImage;
      this.$certificateImage.hidden = !useImage;

      if (useImage) {
         this.$certificateFrame.src = 'about:blank';
         this.$certificateImage.src = certificate.thumbnail;
         this.$certificateImage.alt = `Preview of ${certificate.title}`;
         this.$certificateModalNote.textContent = 'Preview image. Open in Drive to view the original PDF.';
      } else {
         this.$certificateImage.removeAttribute('src');
         this.$certificateFrame.src = certificate.previewUrl || 'about:blank';
         this.$certificateModalNote.textContent = 'Preview hosted by Google Drive. If it does not load, use “Open in Drive”.';
      }

      this.$certificateModalMeta.innerHTML = '';
      const meta = [
         certificate.issuer,
         certificate.date ? this.formatMonth(certificate.date) : '',
         certificate.grade ? `Grade ${certificate.grade}` : '',
         certificate.validUntil ? `Valid until ${this.formatMonth(certificate.validUntil)}` : '',
         certificate.credentialId ? `ID ${certificate.credentialId}` : ''
      ].filter(Boolean);

      for (const text of meta) {
         const item = document.createElement('span');
         item.textContent = text;
         this.$certificateModalMeta.appendChild(item);
      }

      this.$driveButton.hidden = !certificate.certificateUrl;
      this.$certificateModal.open = true;
   }

   resetCertificateModal() {
      this.activeCertificate = null;
      if (this.$certificateFrame) {
         this.$certificateFrame.src = 'about:blank';
      }
      if (this.$certificateImage) {
         this.$certificateImage.removeAttribute('src');
      }
      if (this.$certificateModalMeta) {
         this.$certificateModalMeta.innerHTML = '';
      }
   }

   beforeDestroy() {
      this.resetCertificateModal();
   }

   formatMonth(value) {
      const match = /^(\d{4})-(\d{2})/.exec(String(value));
      if (!match) return String(value);

      const date = new Date(Number(match[1]), Number(match[2]) - 1, 1);
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
   }

   bindCertificateSearch() {
      if (!this.$certificatesSearch) return;
      this.$certificatesSearch.addEventListener('input', () => {
         const query = this.$certificatesSearch.value.trim().toLowerCase();
         if (!query) {
            this.filteredCertificates = [...this.certificatesData];
         } else {
            this.filteredCertificates = this.certificatesData.filter((certificate) => {
               const haystack = [
                  certificate.title,
                  certificate.issuer,
                  certificate.category,
                  certificate.credentialId,
                  certificate.description,
                  certificate.grade,
                  ...(certificate.skills || [])
               ]
                  .filter(Boolean)
                  .join(' ')
                  .toLowerCase();
               return haystack.includes(query);
            });
         }
         this.certificatesPage = 1;
         this.renderCertificatesPage();
      });
   }

   updateCertificateCount() {
      if (!this.$certificatesCount) return;
      const total = this.filteredCertificates.length;
      const label = total === 1 ? 'certificate' : 'certificates';
      this.$certificatesCount.textContent = `${total} ${label}`;
   }

   async renderCertificatesPage() {
      if (!this.$certificatesGrid) return;

      const total = this.filteredCertificates.length;
      const totalPages = Math.max(1, Math.ceil(total / this.certificatesPerPage));
      this.certificatesPage = Math.min(this.certificatesPage, totalPages);

      const startIndex = (this.certificatesPage - 1) * this.certificatesPerPage;
      const pageItems = this.filteredCertificates.slice(
         startIndex,
         startIndex + this.certificatesPerPage
      );

      slice.controller.destroyByContainer(this.$certificatesGrid);
      this.$certificatesGrid.innerHTML = '';

      for (const [index, certificate] of pageItems.entries()) {
         const certificateCard = await slice.build('CertificateCard', {
            certificate: certificate,
            animationDelay: index * 0.08
         });
         this.$certificatesGrid.appendChild(certificateCard);
      }

      if (pageItems.length === 0) {
         this.renderCertificatesEmptyState();
      }

      this.updateCertificateCount();
      this.renderCertificatesPagination(totalPages);
   }

   renderCertificatesPagination(totalPages) {
      if (!this.$certificatesPagination) return;

      this.$certificatesPagination.innerHTML = '';

      if (totalPages <= 1) return;

      const createButton = (label, page, disabled = false, active = false) => {
         const button = document.createElement('button');
         button.type = 'button';
         button.textContent = label;
         button.className = 'certificate-page-btn';
         if (active) {
            button.classList.add('is-active');
            button.setAttribute('aria-current', 'page');
         }
         if (disabled) button.disabled = true;
         button.addEventListener('click', () => {
            this.certificatesPage = page;
            this.renderCertificatesPage();
         });
         return button;
      };

      this.$certificatesPagination.appendChild(
         createButton('Prev', Math.max(1, this.certificatesPage - 1), this.certificatesPage === 1)
      );

      const maxButtons = 5;
      const start = Math.max(1, this.certificatesPage - Math.floor(maxButtons / 2));
      const end = Math.min(totalPages, start + maxButtons - 1);

      for (let page = start; page <= end; page += 1) {
         this.$certificatesPagination.appendChild(
            createButton(String(page), page, false, page === this.certificatesPage)
         );
      }

      this.$certificatesPagination.appendChild(
         createButton(
            'Next',
            Math.min(totalPages, this.certificatesPage + 1),
            this.certificatesPage === totalPages
         )
      );
   }

   renderCertificatesEmptyState() {
      if (!this.$certificatesGrid) return;

      const empty = document.createElement('div');
      empty.className = 'certificates-empty';

      const text = document.createElement('p');
      text.textContent = 'No certificates match your search.';

      const clearButton = document.createElement('button');
      clearButton.type = 'button';
      clearButton.className = 'certificate-page-btn';
      clearButton.textContent = 'Clear search';
      clearButton.addEventListener('click', () => {
         this.$certificatesSearch.value = '';
         this.filteredCertificates = [...this.certificatesData];
         this.certificatesPage = 1;
         this.renderCertificatesPage();
         this.$certificatesSearch.focus();
      });

      empty.appendChild(text);
      empty.appendChild(clearButton);
      this.$certificatesGrid.appendChild(empty);
   }
}

customElements.define('slice-education-section', EducationSection);
