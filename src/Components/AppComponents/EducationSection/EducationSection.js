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
         const studyCard = await this.createStudyCard(study, index);
         studiesContainer.appendChild(studyCard);
      }

      this.$studies.appendChild(studiesTitle);
      this.$studies.appendChild(studiesContainer);
   }

   async createStudyCard(study, index) {
      const card = document.createElement('div');
      card.classList.add('study-card');
      card.style.animationDelay = `${index * 0.2}s`;

      // Institution header
      const header = document.createElement('div');
      header.classList.add('study-header');
      
      const logo = document.createElement('img');
      logo.src = study.logo;
      logo.alt = `${study.institution} logo`;
      logo.classList.add('institution-logo');
      logo.onerror = () => {
         // Fallback to initials if logo fails to load
         const initials = document.createElement('div');
         initials.classList.add('institution-initials');
         initials.textContent = study.institution.split(' ').map(word => word[0]).join('').substring(0, 2);
         logo.parentNode.replaceChild(initials, logo);
      };

      const basicInfo = document.createElement('div');
      basicInfo.classList.add('study-basic-info');
      basicInfo.innerHTML = `
         <h3 class="degree">${study.degree}</h3>
         <h4 class="institution">${study.institution}</h4>
         <div class="study-meta">
            <span class="period">${study.period}</span>
            <span class="location">${study.location}</span>
         </div>
      `;

      header.appendChild(logo);
      header.appendChild(basicInfo);

      // Description
      const description = document.createElement('p');
      description.classList.add('study-description');
      description.textContent = study.description;

      // Achievements
      const achievementsSection = document.createElement('div');
      achievementsSection.classList.add('achievements-section');
      
      const achievementsTitle = document.createElement('h5');
      achievementsTitle.textContent = 'Key Achievements:';
      
      const achievementsList = document.createElement('ul');
      achievementsList.classList.add('achievements-list');
      
      study.achievements.forEach(achievement => {
         const li = document.createElement('li');
         li.textContent = achievement;
         achievementsList.appendChild(li);
      });

      achievementsSection.appendChild(achievementsTitle);
      achievementsSection.appendChild(achievementsList);

      // Coursework
      const courseworkSection = document.createElement('div');
      courseworkSection.classList.add('coursework-section');
      
      const courseworkTitle = document.createElement('h5');
      courseworkTitle.textContent = 'Relevant Coursework:';
      
      const courseworkList = document.createElement('div');
      courseworkList.classList.add('coursework-list');
      
      study.coursework.forEach(course => {
         const courseTag = document.createElement('span');
         courseTag.classList.add('course-tag');
         courseTag.textContent = course;
         courseworkList.appendChild(courseTag);
      });

      courseworkSection.appendChild(courseworkTitle);
      courseworkSection.appendChild(courseworkList);

      // Assemble card
      card.appendChild(header);
      card.appendChild(description);
      card.appendChild(achievementsSection);
      card.appendChild(courseworkSection);

      return card;
   }

   async createCertificatesSection() {
      const certificatesTitle = document.createElement('h2');
      certificatesTitle.textContent = `Professional Certifications (${this.certificatesData.length})`;
      certificatesTitle.classList.add('section-title');

      const certificatesGrid = document.createElement('div');
      certificatesGrid.classList.add('certificates-grid');

      for (const [index, certificate] of this.certificatesData.entries()) {
         const certificateCard = await this.createCertificateCard(certificate, index);
         certificatesGrid.appendChild(certificateCard);
      }

      this.$certificates.appendChild(certificatesTitle);
      this.$certificates.appendChild(certificatesGrid);
   }

   async createCertificateCard(certificate, index) {
      const card = document.createElement('div');
      card.classList.add('certificate-card');
      card.style.animationDelay = `${index * 0.1}s`;

      // Certificate image
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('certificate-image-container');
      
      const image = document.createElement('img');
      image.src = certificate.image;
      image.alt = certificate.title;
      image.classList.add('certificate-image');
      image.loading = 'lazy';
      image.onerror = () => {
         // Fallback to placeholder
         image.src = '/images/certificates/certificate-placeholder.png';
      };

      // Issuer logo overlay
      const issuerLogo = document.createElement('img');
      issuerLogo.src = certificate.issuerLogo;
      issuerLogo.alt = `${certificate.issuer} logo`;
      issuerLogo.classList.add('issuer-logo');
      issuerLogo.onerror = () => {
         issuerLogo.style.display = 'none';
      };

      imageContainer.appendChild(image);
      imageContainer.appendChild(issuerLogo);

      // Certificate content
      const content = document.createElement('div');
      content.classList.add('certificate-content');

      // Title and issuer
      const header = document.createElement('div');
      header.classList.add('certificate-header');
      
      const title = document.createElement('h3');
      title.classList.add('certificate-title');
      title.textContent = certificate.title;
      
      const issuer = document.createElement('h4');
      issuer.classList.add('certificate-issuer');
      issuer.textContent = certificate.issuer;

      header.appendChild(title);
      header.appendChild(issuer);

      // Description
      const description = document.createElement('p');
      description.classList.add('certificate-description');
      description.textContent = certificate.description;

      // Meta information
      const metaInfo = document.createElement('div');
      metaInfo.classList.add('certificate-meta');
      
      const issueDate = new Date(certificate.date).toLocaleDateString('en-US', {
         year: 'numeric',
         month: 'long'
      });
      
      let validityText = `Issued: ${issueDate}`;
      if (certificate.validUntil) {
         const validDate = new Date(certificate.validUntil).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
         });
         validityText += ` | Valid until: ${validDate}`;
      } else {
         validityText += ' | No expiration';
      }
      
      metaInfo.innerHTML = `
         <div class="certificate-dates">${validityText}</div>
         <div class="credential-id">ID: ${certificate.credentialId}</div>
      `;

      // Skills
      const skillsSection = document.createElement('div');
      skillsSection.classList.add('certificate-skills');
      
      const skillsTitle = document.createElement('h5');
      skillsTitle.textContent = 'Skills Covered:';
      
      const skillsList = document.createElement('div');
      skillsList.classList.add('skills-list');
      
      certificate.skills.forEach(skill => {
         const skillTag = document.createElement('span');
         skillTag.classList.add('skill-tag');
         skillTag.textContent = skill;
         skillsList.appendChild(skillTag);
      });

      skillsSection.appendChild(skillsTitle);
      skillsSection.appendChild(skillsList);

      // View certificate button
      const actions = document.createElement('div');
      actions.classList.add('certificate-actions');

      const viewBtn = await slice.build('Button', {
         value: 'View Certificate',
         customColor: {
            button: 'var(--primary-color)',
            label: 'var(--primary-color-contrast)'
         },
         onClickCallback: () => window.open(certificate.certificateUrl, '_blank')
      });
      viewBtn.classList.add('view-certificate-btn');
      actions.appendChild(viewBtn);

      // Assemble card
      content.appendChild(header);
      content.appendChild(description);
      content.appendChild(metaInfo);
      content.appendChild(skillsSection);
      content.appendChild(actions);

      card.appendChild(imageContainer);
      card.appendChild(content);

      return card;
   }
}

customElements.define('slice-education-section', EducationSection);