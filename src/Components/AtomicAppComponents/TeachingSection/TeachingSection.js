import teachingData from './data.js';

export default class TeachingSection extends HTMLElement {
  static props = {
    title: { 
      type: 'string', 
      default: '🎓 Courses Taught', 
      required: false 
    },
    subtitle: { 
      type: 'string', 
      default: 'Academic experience and outstanding student projects', 
      required: false 
    },
    subjects: { 
      type: 'array', 
      default: teachingData.subjects, 
      required: false 
    },
    primaryColor: { 
      type: 'string', 
      default: 'var(--primary-color)', 
      required: false 
    },
    secondaryColor: { 
      type: 'string', 
      default: 'var(--secondary-color)', 
      required: false 
    },
    accentColor: { 
      type: 'string', 
      default: 'var(--accent-color)', 
      required: false 
    },
    showStudentProjects: { 
      type: 'boolean', 
      default: true, 
      required: false 
    },
    animationDelay: { 
      type: 'number', 
      default: 0.2, 
      required: false 
    }
  };

  constructor(props) {
    super();
    slice.attachTemplate(this);

    // DOM element references
    this.$title = this.querySelector('.teaching-title');
    this.$subtitle = this.querySelector('.teaching-subtitle');
    this.$subjectsContainer = this.querySelector('.subjects-container');
    this.$detailView = this.querySelector('.detail-view');



    // Component state
    this.selectedSubject = null;
    this.selectedIndex = 0;
    this.reducedEffects = false;

    slice.controller.setComponentProps(this, props);
    this.debuggerProps = ['title', 'subtitle', 'subjects', 'primaryColor', 'secondaryColor', 'accentColor', 'showStudentProjects', 'animationDelay'];
  }

  async init() {
    // Initialize content
    this.initializeContent();
    
    // Apply custom styles
    this.applyCustomStyles();
    
    // Create selection cards
    this.createSelectionCards();
    
    // Create detail view
    this.createDetailView();
    
    // Select first subject by default
    if (this.subjects.length > 0) {
      this.selectSubject(0);
    }
    
    // Apply animations
    this.animateInitialLoad();
  }

  initializeContent() {
    // Set title and subtitle
    this.$title.textContent = this.title;
    this.$subtitle.textContent = this.subtitle;
  }

  createSelectionCards() {
    this.$subjectsContainer.innerHTML = '';
    const fragment = document.createDocumentFragment();

    for (const [index, subject] of this.subjects.entries()) {
      const selectionCard = this.createSelectionCard(subject, index);
      fragment.appendChild(selectionCard);
    }

    this.$subjectsContainer.appendChild(fragment);
  }

  createDetailView() {
    this.$detailView.innerHTML = '';
    // Detail view will be populated when a subject is selected
  }

  createSelectionCard(subject, index) {
    const card = document.createElement('div');
    card.className = 'selection-card';
    card.dataset.index = index;
    const delay = this.reducedEffects ? 0 : index * this.animationDelay;
    card.style.animationDelay = `${delay}s`;

    // Subject icon
    const icon = document.createElement('div');
    icon.className = 'selection-icon';
    icon.textContent = this.getSubjectIcon(subject.name);

    // Short title
    const title = document.createElement('h3');
    title.className = 'selection-title';
    title.textContent = subject.name;

    // Status badge
    const status = document.createElement('span');
    status.className = `selection-status ${subject.isCurrentlyTeaching ? 'currently-teaching' : 'not-teaching'}`;
    status.textContent = subject.isCurrentlyTeaching ? 'Teaching' : 'Taught';

    card.appendChild(icon);
    card.appendChild(title);
    card.appendChild(status);

    // Event listener for selection
    card.addEventListener('click', () => {
      this.selectSubject(index);
    });

    return card;
  }

  getSubjectIcon(subjectName) {
    const iconMap = {
      'Programación Web I': '🌐',
      'Desarrollo de Aplicaciones Móviles': '📱',
      'Base de Datos Avanzadas': '🗄️',
      'Arquitectura de Software': '🏗️',
      'Inteligencia Artificial Aplicada': '🤖'
    };
    return iconMap[subjectName] || '📚';
  }

  selectSubject(index) {
    if (this.selectedIndex === index && this.selectedSubject) {
      return;
    }

    // Update state
    this.selectedIndex = index;
    this.selectedSubject = this.subjects[index];


    // Update selection classes on cards
    const selectionCards = this.$subjectsContainer.querySelectorAll('.selection-card');

    selectionCards.forEach((card, i) => {
      if (i === index) {
        card.classList.add('selected');

      } else {
        card.classList.remove('selected');
      }
    });

    // Update detail view
    this.updateDetailView();
  }

  updateDetailView() {

    if (!this.selectedSubject) return;

    const subject = this.selectedSubject;

    // Create detail view content
    const detailContent = document.createElement('div');
    detailContent.className = 'detail-content';


    // Subject header
    const header = document.createElement('div');
    header.className = 'detail-header';
    
    const titleContainer = document.createElement('div');
    titleContainer.className = 'detail-title-container';
    
    const title = document.createElement('h2');
    title.className = 'detail-title';
    title.textContent = subject.name;
    
    const university = document.createElement('span');
    university.className = 'detail-university';
    university.textContent = subject.university || 'Universidad Rafael Urdaneta';
    
    titleContainer.appendChild(title);
    titleContainer.appendChild(university);
    
    // Status indicator in top right corner - only show when currently teaching
    let statusIndicator = null;
    if (subject.isCurrentlyTeaching) {
      statusIndicator = document.createElement('div');
      statusIndicator.className = 'detail-status-indicator currently-teaching';
      statusIndicator.innerHTML = `
        <div class="status-icon">🎓</div>
        <div class="status-text">Teaching</div>
      `;
    }
    
    const metaInfo = document.createElement('div');
    metaInfo.className = 'detail-meta';
    
    if (subject.semester) {
      const semester = document.createElement('span');
      semester.className = 'meta-item';
      semester.textContent = subject.semester;
      metaInfo.appendChild(semester);
    }
    
    if (subject.students) {
      const students = document.createElement('span');
      students.className = 'meta-item';
      students.textContent = subject.students;
      metaInfo.appendChild(students);
    }
    
    if (subject.credits) {
      const credits = document.createElement('span');
      credits.className = 'meta-item';
      credits.textContent = subject.credits;
      metaInfo.appendChild(credits);
    }
    
    header.appendChild(titleContainer);
    header.appendChild(metaInfo);
    
    // Add status indicator only if it exists (when currently teaching)
    if (statusIndicator) {
      header.appendChild(statusIndicator);
    }

    // Main content
    const mainContent = document.createElement('div');
    mainContent.className = 'detail-main';
    
    const description = document.createElement('p');
    description.className = 'detail-description';
    description.textContent = subject.description;
    
    mainContent.appendChild(description);

    // Technologies
    if (subject.technologies && subject.technologies.length > 0) {
      const technologies = document.createElement('div');
      technologies.className = 'detail-technologies';
      
      const techTitle = document.createElement('h3');
      techTitle.className = 'tech-title';
      techTitle.textContent = 'Technologies';
      
      const techList = document.createElement('div');
      techList.className = 'tech-list';
      
      subject.technologies.forEach(tech => {
        const techBadge = document.createElement('span');
        techBadge.className = 'tech-badge';
        techBadge.textContent = tech;
        techList.appendChild(techBadge);
      });
      
      technologies.appendChild(techTitle);
      technologies.appendChild(techList);
      mainContent.appendChild(technologies);
    }

    // Student projects
    if (this.showStudentProjects && subject.studentProjects && subject.studentProjects.length > 0) {
      const studentProjects = document.createElement('div');
      studentProjects.className = 'detail-projects';
      
      const projectsTitle = document.createElement('h3');
      projectsTitle.className = 'projects-title';
      projectsTitle.textContent = 'Featured Projects';
      
      const projectsList = document.createElement('div');
      projectsList.className = 'projects-list';
      
      subject.studentProjects.forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        
        const projectInfo = document.createElement('div');
        projectInfo.className = 'project-info';
        
        const projectName = document.createElement('span');
        projectName.className = 'project-name';
        projectName.textContent = project.name;
        
        const studentName = document.createElement('span');
        studentName.className = 'student-name';
        studentName.textContent = project.student;
        
        projectInfo.appendChild(projectName);
        projectInfo.appendChild(studentName);
        
        const projectLink = document.createElement('a');
        projectLink.className = 'project-link';
        projectLink.href = project.url;
        projectLink.target = '_blank';
        projectLink.rel = 'noopener noreferrer';
        projectLink.innerHTML = '→';
        
        projectItem.appendChild(projectInfo);
        projectItem.appendChild(projectLink);
        projectsList.appendChild(projectItem);
      });
      
      studentProjects.appendChild(projectsTitle);
      studentProjects.appendChild(projectsList);
      mainContent.appendChild(studentProjects);
    }

    // Footer
    const footer = document.createElement('div');
    footer.className = 'detail-footer';
    
    if (subject.year) {
      const year = document.createElement('span');
      year.className = 'detail-year';
      year.textContent = subject.year;
      footer.appendChild(year);
    }

    // Assemble content
    detailContent.appendChild(header);
    detailContent.appendChild(mainContent);
    detailContent.appendChild(footer);


    // Update detail view with animation
    const targetTransform = this.reducedEffects ? 'none' : 'translateY(20px)';
    this.$detailView.style.opacity = this.reducedEffects ? '1' : '0';
    this.$detailView.style.transform = targetTransform;

    const renderContent = () => {
      this.$detailView.innerHTML = '';
      this.$detailView.appendChild(detailContent);

      if (this.reducedEffects) {
        this.$detailView.style.opacity = '1';
        this.$detailView.style.transform = 'none';
        return;
      }

      requestAnimationFrame(() => {
        this.$detailView.style.opacity = '1';
        this.$detailView.style.transform = 'translateY(0)';
      });
    };

    if (this.reducedEffects) {
      renderContent();
      return;
    }

    requestAnimationFrame(renderContent);
  }



  applyCustomStyles() {
    const section = this.querySelector('.teaching-section');
    if (!section) return;

    
    // Apply custom colors
    section.style.setProperty('--teaching-primary', this.primaryColor);
    section.style.setProperty('--teaching-secondary', this.secondaryColor);
    section.style.setProperty('--teaching-accent', this.accentColor);

    this.reducedEffects = this.shouldReduceEffects();
    section.classList.toggle('teaching-reduced-effects', this.reducedEffects);

  }

  animateInitialLoad() {

    if (this.reducedEffects) {
      this.$title.style.opacity = '1';
      this.$subtitle.style.opacity = '1';
      const cards = this.$subjectsContainer.querySelectorAll('.selection-card');
      cards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'none';
        card.style.animation = 'none';
      });
      return;
    }

    // Title entrance animation
    this.$title.style.animation = 'fadeInDown 0.8s ease-out forwards';
    this.$subtitle.style.animation = 'fadeInUp 0.8s ease-out 0.2s forwards';

    
    // Selection cards animation
    setTimeout(() => {
      const cards = this.$subjectsContainer.querySelectorAll('.selection-card');

      cards.forEach((card, index) => {
        card.style.animation = `slideInUp 0.6s ease-out ${0.4 + index * this.animationDelay}s forwards`;

      });
    }, 100);
  }

  // Public methods for updates
  updateSubjects(newSubjects) {
    this.subjects = newSubjects;
    this.createSelectionCards();
  }

  addSubject(subject) {
    this.subjects.push(subject);
    const card = this.createSelectionCard(subject, this.subjects.length - 1);
    this.$subjectsContainer.appendChild(card);
  }

  // Getters and Setters
  get configuration() {
    return {
      title: this.title,
      subtitle: this.subtitle,
      subjects: this.subjects,
      primaryColor: this.primaryColor,
      secondaryColor: this.secondaryColor,
      accentColor: this.accentColor,
      showStudentProjects: this.showStudentProjects,
      animationDelay: this.animationDelay
    };
  }

  set configuration(value) {
    Object.assign(this, value);
    this.initializeContent();
    this.applyCustomStyles();
    this.createSelectionCards();
  }

  mediaQueryMatches(query) {
    return typeof window !== 'undefined'
      && typeof window.matchMedia === 'function'
      && window.matchMedia(query).matches;
  }

  shouldReduceEffects() {
    const lowPowerDevice = typeof navigator !== 'undefined'
      && typeof navigator.hardwareConcurrency === 'number'
      && navigator.hardwareConcurrency <= 4;

    return lowPowerDevice
      || this.mediaQueryMatches('(prefers-reduced-motion: reduce)')
      || this.mediaQueryMatches('(prefers-reduced-transparency: reduce)')
      || this.mediaQueryMatches('(max-width: 768px)');
  }
}

customElements.define("slice-teaching-section", TeachingSection);
