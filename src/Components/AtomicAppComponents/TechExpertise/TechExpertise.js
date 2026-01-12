import { techExpertiseData } from './data.js';

export default class TechExpertise extends HTMLElement {
  static props = {
    title: { 
      type: 'string', 
      default: 'Technical Expertise', 
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
    this.badgeCarousels = techExpertiseData;

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
        title: carouselData.category,
        badges: carouselData.skills,
        primaryColor: carouselData.color,
        secondaryColor: carouselData.color,
        accentColor: carouselData.color,
        autoPlay: true,
        marqueeSpeed: this.marqueeSpeed,
        showControls: this.showPauseButton,
        borderRadius: '12px',
        shadow: true
      });
      
      individualCarouselsContainer.appendChild(carousel);
    }
    
    // Agregar al contenido principal
    this.appendChild(individualCarouselsContainer);
  }
}

customElements.define("slice-techexpertise", TechExpertise);
