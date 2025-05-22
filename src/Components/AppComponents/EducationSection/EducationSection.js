export default class EducationSection extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);
      
      this.$container = this.querySelector('.education-container');
      this.$studies = this.querySelector('.education-studies');
      this.$certificates = this.querySelector('.education-certificates');
      
      slice.controller.setComponentProps(this, props);
      this.debuggerProps = [];
      this.studiesData = [];
      this.certificatesData = [];
   }

   async init() {
      // Define education data
      this.studiesData = [
         {
            id: 1,
            institution: 'Universidad Tecnológica',
            degree: 'Bachelor\'s Degree in Computer Engineering',
            period: '2016 - 2020',
            location: 'San José, Costa Rica',
            description: 'Comprehensive program covering software development, computer systems, algorithms, data structures, and software engineering principles.',
            achievements: [
               'Graduated Magna Cum Laude with GPA 3.8/4.0',
               'Dean\'s List for 6 consecutive semesters',
               'Outstanding Final Project: Web Framework Development',
               'Active member of Computer Science Student Association'
            ],
            coursework: [
               'Data Structures and Algorithms',
               'Software Engineering',
               'Database Systems',
               'Web Development',
               'Computer Networks',
               'Operating Systems',
               'Machine Learning Fundamentals'
            ],
            logo: '/images/education/universidad-tecnologica.png'
         },
         {
            id: 2,
            institution: 'Colegio Técnico Don Bosco',
            degree: 'Technical High School Diploma in Computer Science',
            period: '2012 - 2015',
            location: 'San José, Costa Rica',
            description: 'Technical education focused on programming fundamentals, computer hardware, and basic software development.',
            achievements: [
               'Valedictorian of Computer Science track',
               'First place in National Programming Competition',
               'Led development of school\'s website',
               'Peer tutor for programming courses'
            ],
            coursework: [
               'Programming Fundamentals (C++, Java)',
               'Web Development (HTML, CSS, JavaScript)',
               'Database Design',
               'Computer Hardware',
               'Technical English',
               'Mathematics for Computing'
            ],
            logo: '/images/education/don-bosco.png'
         }
      ];

      this.certificatesData = [
         {
            id: 1,
            title: 'AWS Certified Solutions Architect',
            issuer: 'Amazon Web Services',
            date: '2024-03-15',
            validUntil: '2027-03-15',
            credentialId: 'AWS-SAA-2024-VK001',
            description: 'Validates expertise in designing distributed systems on AWS platform.',
            skills: ['Cloud Architecture', 'AWS Services', 'Security', 'Cost Optimization'],
            certificateUrl: 'https://aws.amazon.com/verification/VK12345',
            image: '/images/certificates/aws-solutions-architect.png',
            issuerLogo: '/images/certificates/aws-logo.png'
         },
         {
            id: 2,
            title: 'Google Cloud Professional Developer',
            issuer: 'Google Cloud',
            date: '2024-01-20',
            validUntil: '2026-01-20',
            credentialId: 'GCP-PD-2024-VK002',
            description: 'Demonstrates ability to build scalable applications on Google Cloud Platform.',
            skills: ['GCP Services', 'Kubernetes', 'Cloud Functions', 'CI/CD'],
            certificateUrl: 'https://cloud.google.com/certification/verify/VK67890',
            image: '/images/certificates/gcp-developer.png',
            issuerLogo: '/images/certificates/gcp-logo.png'
         },
         {
            id: 3,
            title: 'React Advanced Certification',
            issuer: 'Meta (Facebook)',
            date: '2023-11-10',
            validUntil: null,
            credentialId: 'META-REACT-2023-VK003',
            description: 'Advanced React development patterns, hooks, and performance optimization.',
            skills: ['React Hooks', 'Context API', 'Performance Optimization', 'Testing'],
            certificateUrl: 'https://coursera.org/verify/VK13579',
            image: '/images/certificates/react-advanced.png',
            issuerLogo: '/images/certificates/meta-logo.png'
         },
         {
            id: 4,
            title: 'MongoDB Developer Certification',
            issuer: 'MongoDB University',
            date: '2023-09-05',
            validUntil: '2025-09-05',
            credentialId: 'MONGODB-DEV-2023-VK004',
            description: 'Comprehensive MongoDB development and database design certification.',
            skills: ['NoSQL Design', 'Aggregation Pipeline', 'Indexing', 'Performance Tuning'],
            certificateUrl: 'https://university.mongodb.com/verify/VK24680',
            image: '/images/certificates/mongodb-developer.png',
            issuerLogo: '/images/certificates/mongodb-logo.png'
         },
         {
            id: 5,
            title: 'Docker Certified Associate',
            issuer: 'Docker Inc.',
            date: '2023-07-22',
            validUntil: '2025-07-22',
            credentialId: 'DOCKER-DCA-2023-VK005',
            description: 'Container orchestration and Docker platform administration.',
            skills: ['Container Management', 'Docker Compose', 'Swarm Mode', 'Security'],
            certificateUrl: 'https://success.docker.com/verify/VK97531',
            image: '/images/certificates/docker-associate.png',
            issuerLogo: '/images/certificates/docker-logo.png'
         },
         {
            id: 6,
            title: 'Kubernetes Administrator (CKA)',
            issuer: 'Cloud Native Computing Foundation',
            date: '2023-05-18',
            validUntil: '2026-05-18',
            credentialId: 'CKA-2023-VK006',
            description: 'Certified Kubernetes Administrator with hands-on cluster management skills.',
            skills: ['Cluster Administration', 'Pod Management', 'Networking', 'Troubleshooting'],
            certificateUrl: 'https://www.credly.com/verify/VK86420',
            image: '/images/certificates/kubernetes-admin.png',
            issuerLogo: '/images/certificates/cncf-logo.png'
         }
      ];
      
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