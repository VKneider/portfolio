export default class TechExpertise extends HTMLElement {
  static props = {
    title: { 
      type: 'string', 
      default: '💻 Technical Expertise', 
      required: false 
    },
    subtitle: { 
      type: 'string', 
      default: 'Technologies & tools I\'ve mastered through years of development', 
      required: false 
    },
    marqueeSpeed: { 
      type: 'number', 
      default: 500, 
      required: false 
    },
    showPauseButton: { 
      type: 'boolean', 
      default: false, 
      required: false 
    }
  };

  constructor(props) {
    super();
    slice.attachTemplate(this);

    // Referencias a elementos del DOM
    this.$expertiseTitle = this.querySelector('.expertise-title');
    this.$expertiseSubtitle = this.querySelector('.expertise-subtitle');

    // Datos para carruseles de badges individuales con colores únicos
    this.badgeCarousels = [
      {
        id: 'frontend-badges',
        title: '🎨 Frontend Skills',
        badges: ['JavaScript ES6+', 'React Hooks', 'TypeScript', 'Vue.js 3', 'HTML5', 'CSS3', 'Slice.js'],
        theme: 'frontend-theme',
        primaryColor: '#3b82f6',
        secondaryColor: '#1d4ed8',
        accentColor: '#60a5fa'
      },
      {
        id: 'backend-badges',
        title: '⚙️ Backend Skills',
        badges: ['Node.js', 'Express', 'Python', 'PHP', 'REST APIs', 'GraphQL', 'FastAPI'],
        theme: 'backend-theme',
        primaryColor: '#10b981',
        secondaryColor: '#059669',
        accentColor: '#34d399'
      },
      {
        id: 'database-badges',
        title: '☁️ Database & Cloud',
        badges: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'AWS', 'Docker', 'Kubernetes'],
        theme: 'database-theme',
        primaryColor: '#8b5cf6',
        secondaryColor: '#7c3aed',
        accentColor: '#a78bfa'
      },
      {
        id: 'devops-badges',
        title: '🛠️ DevOps & Tools',
        badges: ['Git', 'CI/CD', 'Testing', 'Agile', 'Scrum', 'Jenkins', 'Terraform'],
        primaryColor: '#f59e0b',
        secondaryColor: '#d97706',
        accentColor: '#fbbf24'
      },
      {
        id: 'mobile-badges',
        title: '📱 Mobile & Desktop',
        badges: ['React Native', 'Electron', 'PWA', 'Ionic', 'Flutter', 'Xamarin'],
        theme: 'mobile-theme',
        primaryColor: '#ec4899',
        secondaryColor: '#db2777',
        accentColor: '#f472b6'
      },
      {
        id: 'ai-badges',
        title: '🤖 AI & Data',
        badges: ['Machine Learning', 'TensorFlow', 'Python', 'Data Analysis', 'APIs', 'Pandas'],
        primaryColor: '#ef4444',
        secondaryColor: '#dc2626',
        accentColor: '#f87171'
      }
    ];

    slice.controller.setComponentProps(this, props);
  }

  async init() {
    // Inicializar el componente
    this.initializeContent();
    
    // Crear carruseles individuales
    await this.createIndividualCarousels();
    
    // Aplicar animaciones iniciales
    this.animateInitialLoad();
  }

  initializeContent() {
    // Establecer títulos
    this.$expertiseTitle.textContent = this.title;
    this.$expertiseSubtitle.textContent = this.subtitle;
  }

  animateInitialLoad() {
    // Animación de entrada para el header
    this.$expertiseTitle.style.animation = 'fadeInDown 0.8s ease-out forwards';
    this.$expertiseSubtitle.style.animation = 'fadeInUp 0.8s ease-out 0.2s forwards';
  }

  async createIndividualCarousels() {
    // Crear contenedor para carruseles individuales
    const individualCarouselsContainer = document.createElement('div');
    individualCarouselsContainer.className = 'individual-carousels';
    
    // Crear título de la sección
    const sectionTitle = document.createElement('h3');
    sectionTitle.className = 'individual-carousels-title';
    sectionTitle.style.textAlign = 'center';
    sectionTitle.style.fontSize = '1.5rem';
    sectionTitle.style.marginBottom = '2rem';
    sectionTitle.style.color = 'var(--primary-color)';
    
    individualCarouselsContainer.appendChild(sectionTitle);
    
    // Crear cada carrusel de badges individual centrado
    for (let i = 0; i < this.badgeCarousels.length; i++) {
      const carouselData = this.badgeCarousels[i];
      
      const carousel = await slice.build('BadgeCarousel', {
        title: carouselData.title,
        badges: carouselData.badges,
        primaryColor: carouselData.primaryColor,
        secondaryColor: carouselData.secondaryColor,
        accentColor: carouselData.accentColor,
        autoPlay: true,
        marqueeSpeed: this.marqueeSpeed,
        showControls: this.showPauseButton,
        borderRadius: '12px',
        shadow: true
      });
      
      // Aplicar tema CSS usando variables CSS directamente
      carousel.classList.add(carouselData.theme);
      
      individualCarouselsContainer.appendChild(carousel);
    }
    
    // Agregar al contenido principal
    this.appendChild(individualCarouselsContainer);
  }
}

customElements.define("slice-techexpertise", TechExpertise);
