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
      default: 15, 
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
    this.badgeWidth = 0;
    this.trackWidth = 0;

    slice.controller.setComponentProps(this, props);
    this.debuggerProps = ['title', 'badges', 'primaryColor', 'secondaryColor', 'accentColor', 'autoPlay', 'marqueeSpeed', 'showControls', 'borderRadius', 'shadow'];
  }

  async init() {
    // Inicializar el componente
    this.initializeContent();
    this.setupEventListeners();
    
    // Esperar a que el DOM esté listo
    await this.waitForDOM();
    
    // Aplicar estilos personalizados
    this.applyCustomStyles();
    
    // Iniciar animación
    this.startMarquee();
    
    // Aplicar animaciones iniciales
    this.animateInitialLoad();
  }

  waitForDOM() {
    return new Promise(resolve => {
      if (this.$marqueeTrack.children.length > 0) {
        resolve();
      } else {
        const observer = new MutationObserver(() => {
          if (this.$marqueeTrack.children.length > 0) {
            observer.disconnect();
            resolve();
          }
        });
        observer.observe(this.$marqueeTrack, { childList: true });
      }
    });
  }

  initializeContent() {
    // Establecer título
    this.$carouselTitle.textContent = this.title;

    // Generar badges del marquee con duplicación para efecto infinito
    this.generateMarqueeBadges();
    
    // Ocultar controles si no se requiere
    if (!this.showControls) {
      this.$pauseBtn.style.display = 'none';
      this.$playBtn.style.display = 'none';
    }
  }

  generateMarqueeBadges() {
    this.$marqueeTrack.innerHTML = '';
    
    // Crear múltiples copias para el efecto infinito
    const copies = 4; // Más copias para asegurar continuidad
    
    for (let copy = 0; copy < copies; copy++) {
      this.badges.forEach((badge, index) => {
        const badgeElement = document.createElement('div');
        badgeElement.className = 'skill-badge';
        badgeElement.textContent = badge;
        badgeElement.style.animationDelay = `${index * 0.1}s`;
        this.$marqueeTrack.appendChild(badgeElement);
      });
    }
    
    console.log(`BadgeCarousel generated ${copies} copies of ${this.badges.length} badges`);
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
    
    // Calculate duration based on content width to ensure consistent speed across different carousels
    // We use a reference width (e.g., 1000px) and scale the duration linearly.
    // This solves the issue where shorter carousels appear slower and longer ones appear faster
    // when using a fixed duration.
    let duration = this.marqueeSpeed;
    
    // Try to measure the width of the content
    // We divide by 4 because we created 4 copies in generateMarqueeBadges
    const totalWidth = this.$marqueeTrack.scrollWidth;
    const singleSetWidth = totalWidth > 0 ? totalWidth / 4 : 0;
    
    // Default reference width (approximate screen width or standard content width)
    const referenceWidth = 1000;
    
    if (singleSetWidth > 0) {
      // Formula: NewDuration = BaseDuration * (ActualWidth / ReferenceWidth)
      duration = this.marqueeSpeed * (singleSetWidth / referenceWidth);
    }

    // Aplicar animación CSS simple
    this.$marqueeTrack.style.animation = `marquee ${duration}s linear infinite`;
    
    console.log(`BadgeCarousel starting marquee with calculated duration: ${duration.toFixed(2)}s (base: ${this.marqueeSpeed}s, width: ${singleSetWidth}px)`);
  }

  pauseMarquee() {
    if (!this.showControls) return;
    
    this.isMarqueePaused = true;
    this.$marqueeTrack.style.animationPlayState = 'paused';
    
    this.$pauseBtn.style.display = 'none';
    this.$playBtn.style.display = 'block';
  }

  playMarquee() {
    if (!this.showControls) return;
    
    this.isMarqueePaused = false;
    this.$marqueeTrack.style.animationPlayState = 'running';
    
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
    
    // Reiniciar el marquee si está activo
    if (!this.isMarqueePaused) {
      this.startMarquee();
    }
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
