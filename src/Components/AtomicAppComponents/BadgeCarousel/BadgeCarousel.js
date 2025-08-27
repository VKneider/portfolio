export default class BadgeCarousel extends HTMLElement {
  static props = {
    title: { 
      type: 'string', 
      default: 'Featured Skills', 
      required: false 
    },
    badges: { 
      type: 'array', 
      default: [], 
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
    autoPlay: { 
      type: 'boolean', 
      default: true, 
      required: false 
    },
    marqueeSpeed: { 
      type: 'number', 
      default: 30, 
      required: false 
    },
    showControls: { 
      type: 'boolean', 
      default: false, 
      required: false 
    },
    borderRadius: { 
      type: 'string', 
      default: '12px', 
      required: false 
    },
    shadow: { 
      type: 'boolean', 
      default: true, 
      required: false 
    }
  };

  constructor(props) {
    super();
    slice.attachTemplate(this);

    // Referencias a elementos del DOM
    this.$carouselTitle = this.querySelector('.carousel-title');
    this.$marqueeTrack = this.querySelector('.marquee-track');
    this.$pauseBtn = this.querySelector('[data-action="pause"]');
    this.$playBtn = this.querySelector('[data-action="play"]');

    // Estado del componente
    this.isMarqueePaused = false;
    this.marqueeAnimation = null;
    this.currentPosition = 0;

    slice.controller.setComponentProps(this, props);
    this.debuggerProps = ['title', 'badges', 'primaryColor', 'secondaryColor', 'accentColor', 'autoPlay', 'marqueeSpeed', 'showControls', 'borderRadius', 'shadow'];
  }

  async init() {
    // Inicializar el componente
    this.initializeContent();
    this.setupEventListeners();
    this.startMarquee();
    
    // Aplicar estilos personalizados
    this.applyCustomStyles();
    
    // Aplicar animaciones iniciales
    this.animateInitialLoad();
  }

  initializeContent() {
    // Establecer título
    this.$carouselTitle.textContent = this.title;

    // Generar badges del marquee
    this.generateMarqueeBadges();
    
    // Ocultar controles si no se requiere
    if (!this.showControls) {
      this.$pauseBtn.style.display = 'none';
      this.$playBtn.style.display = 'none';
    }
  }

  generateMarqueeBadges() {
    this.$marqueeTrack.innerHTML = '';
    
    // Crear badges simples sin zigzag individual
    this.badges.forEach((badge, index) => {
      const badgeElement = document.createElement('div');
      badgeElement.className = 'skill-badge';
      badgeElement.textContent = badge;
      badgeElement.style.animationDelay = `${index * 0.1}s`;
      this.$marqueeTrack.appendChild(badgeElement);
    });
  }

  setupEventListeners() {
    // Controles del marquee solo si están habilitados
    if (this.showControls) {
      this.$pauseBtn.addEventListener('click', () => this.pauseMarquee());
      this.$playBtn.addEventListener('click', () => this.playMarquee());
    }
    
    // Hover para pausar auto-play
    this.addEventListener('mouseenter', () => this.pauseAutoPlay());
    this.addEventListener('mouseleave', () => this.resumeAutoPlay());
  }

  startMarquee() {
    if (this.isMarqueePaused) return;
    
    // Limpiar cualquier animación existente
    if (this.marqueeAnimation) {
      cancelAnimationFrame(this.marqueeAnimation);
    }
    
    console.log(`BadgeCarousel starting smooth marquee with speed: ${this.marqueeSpeed}`);
    
    this.animateMarquee();
  }

  animateMarquee() {
    if (this.isMarqueePaused) return;
    
    // Dirección del movimiento según la posición zigzag
    // El zigzagPosition ya no se usa, por lo que el movimiento es siempre hacia la izquierda
    this.currentPosition -= 1; // Movimiento hacia la izquierda
    
    // Si un badge sale completamente de la vista, lo movemos al final
    const track = this.$marqueeTrack;
    const badges = track.querySelectorAll('.skill-badge');
    
    badges.forEach((badge, index) => {
      const badgeRect = badge.getBoundingClientRect();
      const trackRect = track.getBoundingClientRect();
      
      // Si el badge sale por la izquierda (movimiento hacia izquierda)
      if (badgeRect.right < trackRect.left) {
        track.appendChild(badge);
      }
    });
    
    // Aplicar transformación suave
    track.style.transform = `translateX(${this.currentPosition}px)`;
    
    // Continuar la animación
    this.marqueeAnimation = requestAnimationFrame(() => {
      setTimeout(() => this.animateMarquee(), this.marqueeSpeed);
    });
  }

  pauseMarquee() {
    if (!this.showControls) return;
    
    this.isMarqueePaused = true;
    if (this.marqueeAnimation) {
      cancelAnimationFrame(this.marqueeAnimation);
      this.marqueeAnimation = null;
    }
    
    this.$pauseBtn.style.display = 'none';
    this.$playBtn.style.display = 'block';
  }

  playMarquee() {
    if (!this.showControls) return;
    
    this.isMarqueePaused = false;
    this.startMarquee();
    
    this.$playBtn.style.display = 'none';
    this.$pauseBtn.style.display = 'block';
  }

  pauseAutoPlay() {
    if (this.autoPlay) {
      this.pauseMarquee();
    }
  }

  resumeAutoPlay() {
    if (this.autoPlay && this.isMarqueePaused) {
      this.playMarquee();
    }
  }

  applyCustomStyles() {
    const carousel = this.querySelector('.badge-carousel');
    
    // Aplicar colores personalizados
    carousel.style.setProperty('--carousel-primary', this.primaryColor);
    carousel.style.setProperty('--carousel-secondary', this.secondaryColor);
    carousel.style.setProperty('--carousel-accent', this.accentColor);
    
    // Aplicar estilos adicionales
    if (this.borderRadius) {
      carousel.style.setProperty('--carousel-radius', this.borderRadius);
    }
    
    if (this.shadow) {
      carousel.style.setProperty('--carousel-shadow', '0 8px 25px rgba(0, 0, 0, 0.1)');
    }
  }

  animateInitialLoad() {
    // Animación de entrada para el header
    this.$carouselTitle.style.animation = 'fadeInDown 0.8s ease-out forwards';
    
    // Animación para los badges
    const badges = this.$marqueeTrack.querySelectorAll('.skill-badge');
    badges.forEach((badge, index) => {
      badge.style.animation = `slideInUp 0.6s ease-out ${0.2 + index * 0.05}s forwards`;
    });
  }

  // Métodos públicos para personalización
  updateBadges(newBadges) {
    this.badges = newBadges;
    this.generateMarqueeBadges();
  }

  // Getters y Setters
  get configuration() {
    return {
      title: this.title,
      badges: this.badges,
      primaryColor: this.primaryColor,
      secondaryColor: this.secondaryColor,
      accentColor: this.accentColor,
      autoPlay: this.autoPlay,
      marqueeSpeed: this.marqueeSpeed,
      showControls: this.showControls,
      borderRadius: this.borderRadius,
      shadow: this.shadow
    };
  }

  set configuration(value) {
    Object.assign(this, value);
    this.initializeContent();
    this.applyCustomStyles();
  }

  // Métodos de control
  play() {
    this.playMarquee();
  }

  pause() {
    this.pauseMarquee();
  }
}

customElements.define("slice-badge-carousel", BadgeCarousel);
