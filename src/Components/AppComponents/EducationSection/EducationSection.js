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
      this.studiesData =  studiesData || [];
      this.certificatesData = certificatesData || [];
      this.filteredCertificates = [...this.certificatesData];
      this.certificatesPage = 1;
      this.certificatesPerPage = 6;
   }

   async init() {
      // Define education data

      await this.createStudiesSection();
      await this.createCertificatesSection();
   }

   async createStudiesSection() {
      const studiesTitle = document.createElement('h2');
      studiesTitle.textContent = 'Educational Background';
      studiesTitle.classList.add('section-title');

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
      const certificatesTitle = document.createElement('h2');
      certificatesTitle.textContent = `Professional Certifications`;
      certificatesTitle.classList.add('section-title');
      this.$certificates.insertBefore(certificatesTitle, this.$certificates.firstChild);

      this.bindCertificateSearch();
      await this.renderCertificatesPage();
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
                  certificate.credentialId,
                  certificate.description,
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
         if (active) button.classList.add('is-active');
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
      empty.textContent = 'No certificates found. Try a different search.';
      this.$certificatesGrid.appendChild(empty);
   }

}

customElements.define('slice-education-section', EducationSection);
