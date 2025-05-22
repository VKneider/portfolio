export default class AboutSection extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);
      
      this.$hero = this.querySelector('.hero-section');
      this.$about = this.querySelector('.about-content');
      this.$skills = this.querySelector('.skills-section');
      this.$interests = this.querySelector('.interests-section');
      
      slice.controller.setComponentProps(this, props);
      this.debuggerProps = [];
   }

   async init() {
      // Set up hero section with profile image and intro
      await this.setupHero();
      
      // Create about content cards
      await this.createAboutCards();
      
      // Create skills section
      await this.createSkillsSection();
      
      // Create interests/hobbies section
      await this.createInterestsSection();
   }

   async setupHero() {
      const heroContent = this.$hero.querySelector('.hero-content');
      
      // Profile image
      const profileImage = document.createElement('img');
      profileImage.src = "https://avatars.githubusercontent.com/u/103617388?v=4";
      profileImage.alt = 'Victor Kneider - Computer Engineer';
      profileImage.classList.add('profile-image');
      
      // Hero text
      const heroText = document.createElement('div');
      heroText.classList.add('hero-text');
      heroText.innerHTML = `
         <h1>Victor Kneider</h1>
         <h2>Computer Engineer & Full-Stack Developer</h2>
         <p class="hero-description">
            Passionate about creating innovative solutions through code and modern technologies. 
            Specialized in web development, software architecture, and building scalable applications.
         </p>
      `;

      // CTA Buttons
      const ctaButtons = document.createElement('div');
      ctaButtons.classList.add('cta-buttons');
      
      const contactBtn = await slice.build('Button', {
         value: 'Get In Touch',
         customColor: {
            button: 'var(--primary-color)',
            label: 'var(--primary-color-contrast)'
         },
         onClickCallback: () => {
            window.location.href = 'mailto:victor.kneider@email.com';
         }
      });

      const projectsBtn = await slice.build('Button', {
         value: 'View Projects',
         customColor: {
            button: 'var(--secondary-color)',
            label: 'var(--secondary-color-contrast)'
         },
         onClickCallback: async () => {
            await slice.router.navigate('/projects');
         }
      });

      ctaButtons.appendChild(contactBtn);
      ctaButtons.appendChild(projectsBtn);
      
      heroContent.appendChild(profileImage);
      heroContent.appendChild(heroText);
      heroContent.appendChild(ctaButtons);
   }

   async createAboutCards() {
      const aboutData = [
         {
            title: 'Background',
            text: 'Computer Engineer with 5+ years of experience in full-stack development. I specialize in creating robust web applications using modern JavaScript frameworks and cloud technologies.',
            icon: { name: 'user', iconStyle: 'filled' }
         },
         {
            title: 'Education',
            text: 'Bachelor\'s degree in Computer Engineering from Universidad Tecnológica. Continuously learning new technologies and best practices in software development.',
            icon: { name: 'graduation-cap', iconStyle: 'filled' }
         },
         {
            title: 'Expertise',
            text: 'Full-stack JavaScript development, React, Node.js, cloud architecture, database design, and agile methodologies. Creator of Slice.js framework.',
            icon: { name: 'code', iconStyle: 'filled' }
         }
      ];

      const grid = await slice.build('Grid', {
         columns: 3,
         rows: 1
      });

      for (const cardData of aboutData) {
         const card = await slice.build('Card', {
            title: cardData.title,
            text: cardData.text,
            icon: cardData.icon,
            customColor: {
               card: 'var(--primary-color)',
               icon: 'var(--primary-color-contrast)'
            }
         });
         
         await grid.setItem(card);
      }

      // Make responsive for mobile
      if (window.innerWidth <= 768) {
         grid.columns = 1;
         grid.rows = 3;
      }

      this.$about.appendChild(grid);
   }

   async createSkillsSection() {
      const skillsTitle = document.createElement('h2');
      skillsTitle.textContent = 'Technical Skills';
      skillsTitle.classList.add('section-title');

      const skillsData = [
         { category: 'Frontend', skills: ['JavaScript', 'React', 'Vue.js', 'TypeScript', 'HTML5', 'CSS3', 'Slice.js'] },
         { category: 'Backend', skills: ['Node.js', 'Express', 'Python', 'PHP', 'RESTful APIs', 'GraphQL'] },
         { category: 'Database', skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase'] },
         { category: 'Tools & Others', skills: ['Git', 'Docker', 'AWS', 'Vercel', 'Webpack', 'Jest', 'Linux'] }
      ];

      const skillsContainer = document.createElement('div');
      skillsContainer.classList.add('skills-container');

      for (const skillGroup of skillsData) {
         const skillCard = document.createElement('div');
         skillCard.classList.add('skill-card');
         
         const categoryTitle = document.createElement('h3');
         categoryTitle.textContent = skillGroup.category;
         categoryTitle.classList.add('skill-category');
         
         const skillsList = document.createElement('div');
         skillsList.classList.add('skills-list');
         
         skillGroup.skills.forEach(skill => {
            const skillTag = document.createElement('span');
            skillTag.textContent = skill;
            skillTag.classList.add('skill-tag');
            skillsList.appendChild(skillTag);
         });
         
         skillCard.appendChild(categoryTitle);
         skillCard.appendChild(skillsList);
         skillsContainer.appendChild(skillCard);
      }

      this.$skills.appendChild(skillsTitle);
      this.$skills.appendChild(skillsContainer);
   }

   async createInterestsSection() {
      const interestsTitle = document.createElement('h2');
      interestsTitle.textContent = 'Interests & Hobbies';
      interestsTitle.classList.add('section-title');

      const interests = [
         'Open Source Contributing',
         'Tech Blogging',
         'Photography',
         'Gaming',
         'Traveling',
         'Continuous Learning'
      ];

      const interestsContainer = document.createElement('div');
      interestsContainer.classList.add('interests-container');

      interests.forEach(interest => {
         const interestTag = document.createElement('span');
         interestTag.textContent = interest;
         interestTag.classList.add('interest-tag');
         interestsContainer.appendChild(interestTag);
      });

      this.$interests.appendChild(interestsTitle);
      this.$interests.appendChild(interestsContainer);
   }
}

customElements.define('slice-about-section', AboutSection);