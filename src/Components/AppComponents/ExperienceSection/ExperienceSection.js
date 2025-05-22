export default class ExperienceSection extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);
      
      this.$container = this.querySelector('.experience-container');
      this.$timeline = this.querySelector('.experience-timeline');
      
      slice.controller.setComponentProps(this, props);
      this.debuggerProps = [];
      this.experienceData = [];
   }

   async init() {
      // Define experience data
      this.experienceData = [
         {
            id: 1,
            company: 'Tech Innovations Inc.',
            position: 'Senior Full-Stack Developer',
            logo: '/images/companies/tech-innovations.png',
            period: 'Jan 2022 - Present',
            type: 'Full-time',
            location: 'Remote',
            description: 'Leading development of scalable web applications using React, Node.js, and cloud technologies. Created Slice.js framework to improve development efficiency across teams.',
            responsibilities: [
               'Architect and develop full-stack applications serving 100k+ users',
               'Lead technical decisions and mentor junior developers',
               'Created Slice.js - a lightweight component framework',
               'Implemented CI/CD pipelines reducing deployment time by 60%',
               'Collaborated with product team to define technical requirements'
            ],
            technologies: ['JavaScript', 'React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'Slice.js'],
            achievements: [
               'Reduced application load time by 45%',
               'Led team of 5 developers',
               'Built framework adopted by 3 other teams'
            ]
         },
         {
            id: 2,
            company: 'Digital Solutions Ltd.',
            position: 'Frontend Developer',
            logo: '/images/companies/digital-solutions.png',
            period: 'Mar 2020 - Dec 2021',
            type: 'Full-time',
            location: 'San José, Costa Rica',
            description: 'Developed responsive web applications and improved user experience across multiple client projects. Specialized in React and modern JavaScript frameworks.',
            responsibilities: [
               'Built responsive web applications for 15+ clients',
               'Collaborated with UX/UI designers to implement pixel-perfect designs',
               'Optimized applications for performance and accessibility',
               'Mentored 2 junior developers in modern JavaScript practices',
               'Participated in agile development processes'
            ],
            technologies: ['React', 'JavaScript', 'HTML5', 'CSS3', 'SASS', 'Redux', 'Jest'],
            achievements: [
               'Improved client satisfaction scores by 30%',
               'Reduced bug reports by 50%',
               'Implemented automated testing increasing code coverage to 85%'
            ]
         },
         {
            id: 3,
            company: 'StartupXYZ',
            position: 'Full-Stack Developer',
            logo: '/images/companies/startupxyz.png',
            period: 'Jun 2019 - Feb 2020',
            type: 'Contract',
            location: 'Remote',
            description: 'Full-stack development for early-stage startup focusing on e-commerce solutions. Built MVP from scratch using modern web technologies.',
            responsibilities: [
               'Developed MVP e-commerce platform from concept to launch',
               'Integrated payment gateways and third-party APIs',
               'Implemented real-time features using WebSocket',
               'Set up monitoring and analytics systems',
               'Worked directly with founders to define product features'
            ],
            technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Express', 'Stripe API', 'Socket.io'],
            achievements: [
               'Delivered MVP 2 weeks ahead of schedule',
               'Platform processed $50k+ in first month',
               'Achieved 99.9% uptime during launch period'
            ]
         },
         {
            id: 4,
            company: 'WebDev Agency',
            position: 'Junior Web Developer',
            logo: '/images/companies/webdev-agency.png',
            period: 'Jan 2018 - May 2019',
            type: 'Full-time',
            location: 'San José, Costa Rica',
            description: 'Started career developing websites and learning modern web development practices. Gained experience in both frontend and backend technologies.',
            responsibilities: [
               'Developed custom websites using WordPress and custom PHP',
               'Created responsive designs for mobile and desktop',
               'Maintained and updated existing client websites',
               'Learned modern JavaScript frameworks and best practices',
               'Collaborated with senior developers on larger projects'
            ],
            technologies: ['PHP', 'WordPress', 'JavaScript', 'jQuery', 'MySQL', 'HTML5', 'CSS3'],
            achievements: [
               'Successfully delivered 20+ websites',
               'Learned React and Node.js through self-study',
               'Received "Fast Learner" recognition from supervisor'
            ]
         }
      ];

      // Create timeline directly without filters
      await this.createTimeline();
   }

   async createTimeline() {
      // Clear existing timeline
      this.$timeline.innerHTML = '';

      const timelineTitle = document.createElement('h2');
      timelineTitle.textContent = 'Professional Experience';
      timelineTitle.classList.add('section-title');
      this.$timeline.appendChild(timelineTitle);

      const timelineContainer = document.createElement('div');
      timelineContainer.classList.add('timeline-container');

      // Sort by date (most recent first)
      const sortedExperience = [...this.experienceData].sort((a, b) => {
         return new Date(b.date) - new Date(a.date);
      });

      for (const [index, experience] of sortedExperience.entries()) {
         const experienceCard = await this.createExperienceCard(experience, index);
         timelineContainer.appendChild(experienceCard);
      }

      this.$timeline.appendChild(timelineContainer);
   }

   async createExperienceCard(experience, index) {
      const card = document.createElement('div');
      card.classList.add('experience-card');
      card.style.animationDelay = `${index * 0.1}s`;

      // Company logo and basic info
      const header = document.createElement('div');
      header.classList.add('experience-header');
      
      const logo = document.createElement('img');
      logo.src = experience.logo;
      logo.alt = `${experience.company} logo`;
      logo.classList.add('company-logo');
      logo.onerror = () => {
         // Fallback to initials if logo fails to load
         const initials = document.createElement('div');
         initials.classList.add('company-initials');
         initials.textContent = experience.company.split(' ').map(word => word[0]).join('').substring(0, 2);
         logo.parentNode.replaceChild(initials, logo);
      };

      const basicInfo = document.createElement('div');
      basicInfo.classList.add('basic-info');
      basicInfo.innerHTML = `
         <h3 class="position">${experience.position}</h3>
         <h4 class="company">${experience.company}</h4>
         <div class="meta-info">
            <span class="period">${experience.period}</span>
            <span class="type">${experience.type}</span>
            <span class="location">${experience.location}</span>
         </div>
      `;

      header.appendChild(logo);
      header.appendChild(basicInfo);

      // Description
      const description = document.createElement('p');
      description.classList.add('experience-description');
      description.textContent = experience.description;

      // Responsibilities
      const responsibilitiesSection = document.createElement('div');
      responsibilitiesSection.classList.add('responsibilities-section');
      
      const responsibilitiesTitle = document.createElement('h5');
      responsibilitiesTitle.textContent = 'Key Responsibilities:';
      
      const responsibilitiesList = document.createElement('ul');
      responsibilitiesList.classList.add('responsibilities-list');
      
      experience.responsibilities.forEach(responsibility => {
         const li = document.createElement('li');
         li.textContent = responsibility;
         responsibilitiesList.appendChild(li);
      });

      responsibilitiesSection.appendChild(responsibilitiesTitle);
      responsibilitiesSection.appendChild(responsibilitiesList);

      // Technologies
      const techSection = document.createElement('div');
      techSection.classList.add('tech-section');
      
      const techTitle = document.createElement('h5');
      techTitle.textContent = 'Technologies:';
      
      const techList = document.createElement('div');
      techList.classList.add('tech-list');
      
      experience.technologies.forEach(tech => {
         const techTag = document.createElement('span');
         techTag.classList.add('tech-tag');
         techTag.textContent = tech;
         techList.appendChild(techTag);
      });

      techSection.appendChild(techTitle);
      techSection.appendChild(techList);

      // Achievements
      const achievementsSection = document.createElement('div');
      achievementsSection.classList.add('achievements-section');
      
      const achievementsTitle = document.createElement('h5');
      achievementsTitle.textContent = 'Key Achievements:';
      
      const achievementsList = document.createElement('ul');
      achievementsList.classList.add('achievements-list');
      
      experience.achievements.forEach(achievement => {
         const li = document.createElement('li');
         li.textContent = achievement;
         achievementsList.appendChild(li);
      });

      achievementsSection.appendChild(achievementsTitle);
      achievementsSection.appendChild(achievementsList);

      // Assemble card
      card.appendChild(header);
      card.appendChild(description);
      card.appendChild(responsibilitiesSection);
      card.appendChild(techSection);
      card.appendChild(achievementsSection);

      return card;
   }
}

customElements.define('slice-experience-section', ExperienceSection);