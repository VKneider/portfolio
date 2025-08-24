import { certificatesData, studiesData } from "./data.js";

export default class EducationSection extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);
      
      this.$container = this.querySelector('.education-container');
      this.$studies = this.querySelector('.education-studies');
      this.$certificates = this.querySelector('.education-certificates');
      
      slice.controller.setComponentProps(this, props);
      this.debuggerProps = [];
      this.studiesData =  studiesData || [];
      this.certificatesData = certificatesData || [];
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
      certificatesTitle.textContent = `Professional Certifications (${this.certificatesData.length})`;
      certificatesTitle.classList.add('section-title');

      const certificatesGrid = document.createElement('div');
      certificatesGrid.classList.add('certificates-grid');

      for (const [index, certificate] of this.certificatesData.entries()) {
         const certificateCard = await slice.build('CertificateCard', {
            certificate: certificate,
            animationDelay: index * 0.1
         });
         certificatesGrid.appendChild(certificateCard);
      }

      this.$certificates.appendChild(certificatesTitle);
      this.$certificates.appendChild(certificatesGrid);
   }

}

customElements.define('slice-education-section', EducationSection);