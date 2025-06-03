export default class AboutSection extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);
      
      this.$hero = this.querySelector('.hero-section');
      this.$about = this.querySelector('.about-content');
      this.$skills = this.querySelector('.skills-section');
      this.$values = this.querySelector('.values-section');
      this.$interests = this.querySelector('.interests-section');
      
      slice.controller.setComponentProps(this, props);
      this.debuggerProps = [];
   }

   async init() {
      // Set up enhanced hero section
      await this.setupEnhancedHero();
      
      // Create enhanced about content cards
      await this.createEnhancedAboutCards();
      
      // Create technical skills section
      await this.createTechnicalSkillsSection();
      
      // Create values section
      await this.createSoftSkillsSection();
      
      // Create interests/hobbies section
      await this.createInterestsSection();
   }

   async setupEnhancedHero() {
      const heroContent = this.$hero.querySelector('.hero-content');
      
      // Profile image with enhanced styling
      const profileContainer = document.createElement('div');
      profileContainer.classList.add('profile-container');
      
      const profileImage = document.createElement('img');
      profileImage.src = "https://avatars.githubusercontent.com/u/103617388?v=4";
      profileImage.alt = 'Victor Kneider - Computer Engineer & University Professor';
      profileImage.classList.add('profile-image');
      
      const profileRing = document.createElement('div');
      profileRing.classList.add('profile-ring');
      
      profileContainer.appendChild(profileRing);
      profileContainer.appendChild(profileImage);
      
      // Enhanced hero text with typewriter effect
      const heroText = document.createElement('div');
      heroText.classList.add('hero-text');
      heroText.innerHTML = `
         <div class="title-container">
            <h1>Victor Kneider</h1>
            <div class="title-accent"></div>
         </div>
         <div class="roles-container">
            <h2 class="role-title">
               <span class="role-switcher" data-roles='["Computer Engineer", "Full-Stack Developer", "Tech Innovator", "Open Source Contributor", "Solution Architect"]'>Computer Engineer</span>
            </h2>
         </div>
         <p class="hero-description">
            Passionate about creating innovative technology solutions and sharing knowledge. 
            I combine deep technical expertise with a drive for continuous learning to build 
            scalable applications and contribute to the developer community.
         </p>
      `;

      // Enhanced CTA Buttons
      const ctaButtons = document.createElement('div');
      ctaButtons.classList.add('cta-buttons');
      
      const contactBtn = await slice.build('Button', {
         value: '📧 Get In Touch',
         customColor: {
            button: 'var(--primary-color)',
            label: 'var(--primary-color-contrast)'
         },
         onClickCallback: () => {
            window.location.href = 'mailto:victor.kneider@email.com';
         }
      });

      const projectsBtn = await slice.build('Button', {
         value: '🚀 View Projects',
         customColor: {
            button: 'var(--secondary-color)',
            label: 'var(--secondary-color-contrast)'
         },
         onClickCallback: async () => {
            await slice.router.navigate('/projects');
         }
      });

      const cvBtn = await slice.build('Button', {
         value: '📄 Download CV',
         customColor: {
            button: 'var(--success-color)',
            label: 'var(--success-contrast)'
         },
         onClickCallback: () => {
            // Create download link for CV
            const link = document.createElement('a');
            link.href = '/assets/Victor_Kneider_CV.pdf';
            link.download = 'Victor_Kneider_CV.pdf';
            link.click();
         }
      });

      ctaButtons.appendChild(contactBtn);
      ctaButtons.appendChild(projectsBtn);
      ctaButtons.appendChild(cvBtn);
      
      // Assemble hero content
      heroContent.appendChild(profileContainer);
      heroContent.appendChild(heroText);
      heroContent.appendChild(ctaButtons);
      
      // Initialize role switcher animation
      this.initRoleSwitcher();
   }

   initRoleSwitcher() {
      const roleSwitcher = this.$hero.querySelector('.role-switcher');
      if (!roleSwitcher) return;
      
      const roles = JSON.parse(roleSwitcher.dataset.roles);
      let currentIndex = 0;
      
      setInterval(() => {
         currentIndex = (currentIndex + 1) % roles.length;
         roleSwitcher.style.opacity = '0';
         
         setTimeout(() => {
            roleSwitcher.textContent = roles[currentIndex];
            roleSwitcher.style.opacity = '1';
         }, 300);
      }, 3000);
   }

   async createEnhancedAboutCards() {
      const aboutData = [
         {
            title: 'Engineering Excellence',
            text: 'Computer Engineer with 5+ years creating robust, scalable web applications. Expert in modern JavaScript frameworks, cloud architecture, and agile methodologies. Creator of Slice.js framework.',
            icon: { name: 'code', iconStyle: 'filled' },
            customColor: {
               card: 'var(--primary-color)',
               icon: 'var(--primary-color-contrast)'
            }
         },
         {
            title: 'Educational Leadership',
            text: 'University Professor passionate about making complex technology concepts accessible. Experienced in curriculum development, innovative teaching methodologies, and mentoring the next generation of developers.',
            icon: { name: 'graduation-cap', iconStyle: 'filled' },
            customColor: {
               card: 'var(--secondary-color)',
               icon: 'var(--secondary-color-contrast)'
            }
         },
         {
            title: 'Innovation & Research',
            text: 'Dedicated to continuous learning and innovation. Active in open-source development, technical research, and bridging the gap between academic theory and industry practice.',
            icon: { name: 'lightbulb', iconStyle: 'filled' },
            customColor: {
               card: 'var(--success-color)',
               icon: 'var(--success-contrast)'
            }
         }
      ];

      const grid = await slice.build('Grid', {
         columns: 3,
         rows: 1
      });

      for (const [index, cardData] of aboutData.entries()) {
         const card = await slice.build('Card', {
            title: cardData.title,
            text: cardData.text,
            icon: cardData.icon,
            customColor: cardData.customColor
         });
         
         card.style.animationDelay = `${index * 0.2}s`;
         card.classList.add('about-slice-card');
         
         await grid.setItem(card);
      }

      // Make responsive for mobile
      window.addEventListener('resize', () => {
         if (window.innerWidth <= 768) {
            grid.columns = 1;
            grid.rows = 3;
         } else {
            grid.columns = 3;
            grid.rows = 1;
         }
      });
      
      if (window.innerWidth <= 768) {
         grid.columns = 1;
         grid.rows = 3;
      }

      this.$about.appendChild(grid);
   }

   async createTechnicalSkillsSection() {
      const skillsTitle = document.createElement('h2');
      skillsTitle.innerHTML = '💻 Technical Expertise';
      skillsTitle.classList.add('section-title');

      const skillsData = [
         { category: 'Frontend Development', skills: ['JavaScript', 'TypeScript', 'React', 'Vue.js', 'HTML5', 'CSS3', 'Slice.js'] },
         { category: 'Backend Development', skills: ['Node.js', 'Express', 'Python', 'PHP', 'RESTful APIs', 'GraphQL', 'Microservices'] },
         { category: 'Database & Cloud', skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'AWS', 'Docker', 'Kubernetes'] },
         { category: 'Tools & Methodologies', skills: ['Git', 'CI/CD', 'Agile', 'Scrum', 'Testing', 'TDD', 'System Design'] }
      ];

      const skillsContainer = document.createElement('div');
      skillsContainer.classList.add('technical-skills-container');

      for (const skillGroup of skillsData) {
         const skillCard = document.createElement('div');
         skillCard.classList.add('technical-skill-card');
         
         const categoryTitle = document.createElement('h3');
         categoryTitle.textContent = skillGroup.category;
         categoryTitle.classList.add('skill-category');
         
         const skillsList = document.createElement('div');
         skillsList.classList.add('skills-tags-list');
         
         skillGroup.skills.forEach(skill => {
            const skillTag = document.createElement('span');
            skillTag.classList.add('skill-tag');
            skillTag.textContent = skill;
            skillsList.appendChild(skillTag);
         });
         
         skillCard.appendChild(categoryTitle);
         skillCard.appendChild(skillsList);
         skillsContainer.appendChild(skillCard);
      }

      this.$skills.appendChild(skillsTitle);
      this.$skills.appendChild(skillsContainer);
   }

   async createSoftSkillsSection() {
      const valuesTitle = document.createElement('h2');
      valuesTitle.innerHTML = '🎯 Core Values & Philosophy';
      valuesTitle.classList.add('section-title');

      const valuesData = [
         { name: 'Continuous Learning', icon: '📚', description: 'Always exploring new technologies and teaching methodologies to stay at the forefront of innovation' },
         { name: 'Knowledge Sharing', icon: '🤝', description: 'Passionate about sharing expertise through teaching, mentoring, and open-source contributions' },
         { name: 'Quality & Excellence', icon: '⭐', description: 'Committed to delivering high-quality solutions and educational experiences that exceed expectations' },
         { name: 'Innovation & Creativity', icon: '💡', description: 'Developing creative solutions to complex problems and inspiring students to think outside the box' },
         { name: 'Collaboration', icon: '🌟', description: 'Building strong relationships with teams, students, and the tech community for mutual growth' },
         { name: 'Ethical Technology', icon: '🛡️', description: 'Promoting responsible development practices and ethical use of technology in education and industry' }
      ];

      const valuesContainer = document.createElement('div');
      valuesContainer.classList.add('values-container');

      valuesData.forEach((value, index) => {
         const valueCard = document.createElement('div');
         valueCard.classList.add('value-card');
         valueCard.style.animationDelay = `${index * 0.1}s`;
         
         valueCard.innerHTML = `
            <div class="value-icon">${value.icon}</div>
            <h4 class="value-name">${value.name}</h4>
            <p class="value-description">${value.description}</p>
         `;
         
         valuesContainer.appendChild(valueCard);
      });

      this.$values.appendChild(valuesTitle);
      this.$values.appendChild(valuesContainer);
   }

   async createInterestsSection() {
      const interestsTitle = document.createElement('h2');
      interestsTitle.innerHTML = '🌟 Interests & Passions';
      interestsTitle.classList.add('section-title');

      const interests = [
         { name: 'Open Source Development', icon: '🔓' },
         { name: 'Educational Technology', icon: '💡' },
         { name: 'Technical Writing', icon: '✍️' },
         { name: 'Photography', icon: '📸' },
         { name: 'Continuous Learning', icon: '📖' },
         { name: 'Innovation & Research', icon: '🔬' },
         { name: 'Mentoring Students', icon: '🎓' },
         { name: 'Tech Communities', icon: '🌐' }
      ];

      const interestsContainer = document.createElement('div');
      interestsContainer.classList.add('interests-container');

      interests.forEach((interest, index) => {
         const interestTag = document.createElement('div');
         interestTag.classList.add('interest-tag');
         interestTag.style.animationDelay = `${index * 0.1}s`;
         interestTag.innerHTML = `
            <span class="interest-icon">${interest.icon}</span>
            <span class="interest-name">${interest.name}</span>
         `;
         interestsContainer.appendChild(interestTag);
      });

      this.$interests.appendChild(interestsTitle);
      this.$interests.appendChild(interestsContainer);
   }
}

customElements.define('slice-about-section', AboutSection);