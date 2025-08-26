export default class ImageCarrousel extends HTMLElement {
  static props = {
    images: {
      type: 'array',
      default: [],
      required: false
    },
    autoplay: {
      type: 'boolean',
      default: true,
      required: false
    },
    autoplaySpeed: {
      type: 'number',
      default: 5000,
      required: false
    },
    showIndicators: {
      type: 'boolean',
      default: true,
      required: false
    },
    showNavigation: {
      type: 'boolean',
      default: true,
      required: false
    }
  };

  constructor(props) {
    super();
    slice.attachTemplate(this);

    this.$carousel = this.querySelector('.carousel-container');
    this.$slides = this.querySelector('.carousel-slides');
    this.$indicators = this.querySelector('.carousel-indicators');
    this.$prevBtn = this.querySelector('.carousel-prev');
    this.$nextBtn = this.querySelector('.carousel-next');
    this.$currentSlide = this.querySelector('.current-slide-number');
    this.$totalSlides = this.querySelector('.total-slides');

    slice.controller.setComponentProps(this, props);
    this.debuggerProps = [];
    
    this.currentIndex = 0;
    this.autoplayInterval = null;
    this.isTransitioning = false;
    this._initialized = false;
  }

  async init() {
    if (this.images && this.images.length > 0) {
      this.setupCarousel();
      this.setupEventListeners();
      this.updateSlideDisplay();
      
      // Verificar que el elemento carousel existe
      console.log('Carousel element:', this.$carousel);
      console.log('Autoplay enabled:', this.autoplay);
      
      if (this.autoplay) {
        this.startAutoplay();
      }
      
      this._initialized = true;
    }
  }

  setupCarousel() {
    // Limpiar contenido existente
    this.$slides.innerHTML = '';
    this.$indicators.innerHTML = '';

    // Crear slides
    this.images.forEach((image, index) => {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide';
      
      // Configurar estado inicial
      if (index === 0) {
        slide.style.display = 'block';
        slide.style.opacity = '1';
        slide.classList.add('active');
      } else {
        slide.style.display = 'none';
        slide.style.opacity = '0';
      }
      
      const img = document.createElement('img');
      img.src = image.url;
      img.alt = image.alt || `Slide ${index + 1}`;
      img.className = 'carousel-image';
      
      const overlay = document.createElement('div');
      overlay.className = 'carousel-overlay';
      
      const label = document.createElement('div');
      label.className = 'carousel-label';
      label.textContent = image.label || '';
      
      const date = document.createElement('div');
      date.className = 'carousel-date';
      date.textContent = image.date || '';
      
      overlay.appendChild(label);
      overlay.appendChild(date);
      slide.appendChild(img);
      slide.appendChild(overlay);
      this.$slides.appendChild(slide);

      // Crear indicadores
      if (this.showIndicators) {
        const indicator = document.createElement('button');
        indicator.className = 'carousel-indicator';
        indicator.setAttribute('data-slide', index);
        indicator.addEventListener('click', () => {
          this.goToSlide(index);
          // Resetear autoplay cuando se hace clic en un indicador
          this.resetAutoplayTimer();
        });
        this.$indicators.appendChild(indicator);
      }
    });

    // Activar el primer indicador
    if (this.showIndicators && this.$indicators.children.length > 0) {
      this.$indicators.children[0].classList.add('active');
    }

    // Actualizar contadores
    if (this.$totalSlides) {
      this.$totalSlides.textContent = this.images.length;
    }
  }

  setupEventListeners() {
    if (this.$prevBtn) {
      this.$prevBtn.addEventListener('click', () => {
        this.previousSlide();
        // Resetear autoplay cuando se hace clic en botón anterior
        this.resetAutoplayTimer();
      });
    }
    
    if (this.$nextBtn) {
      this.$nextBtn.addEventListener('click', () => {
        this.nextSlide();
        // Resetear autoplay cuando se hace clic en botón siguiente
        this.resetAutoplayTimer();
      });
    }

    // Usar el elemento raíz del componente para el hover (más confiable)
    this.addEventListener('mouseenter', () => {
      console.log('Mouse enter - pausando autoplay');
      this.pauseAutoplay();
    });
    
    this.addEventListener('mouseleave', () => {
      console.log('Mouse leave - reanudando autoplay');
      if (this.autoplay) {
        this.startAutoplay();
      }
    });
    
    // Añadir soporte para gestos táctiles
    this.setupTouchSupport();
  }

  setupTouchSupport() {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    let touchStartTime = 0;
    
    this.$carousel.addEventListener('touchstart', (e) => {
      if (this.isTransitioning) return;
      
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      touchStartTime = Date.now();
      
      // Pausar autoplay durante el touch
      this.pauseAutoplay();
    });
    
    this.$carousel.addEventListener('touchend', (e) => {
      if (this.isTransitioning) return;
      
      endX = e.changedTouches[0].clientX;
      endY = e.changedTouches[0].clientY;
      
      const diffX = startX - endX;
      const diffY = startY - endY;
      const touchDuration = Date.now() - touchStartTime;
      
      // Solo procesar si el swipe es horizontal, suficientemente largo y rápido
      if (Math.abs(diffX) > Math.abs(diffY) && 
          Math.abs(diffX) > 50 && 
          touchDuration < 500) {
        
        if (diffX > 0) {
          this.nextSlide();
        } else {
          this.previousSlide();
        }
        
        // Resetear autoplay cuando se hace swipe
        this.resetAutoplayTimer();
      } else {
        // Reanudar autoplay después del touch si no hubo swipe
        if (this.autoplay) {
          setTimeout(() => this.startAutoplay(), 1000);
        }
      }
    });
    
    // Prevenir scroll durante el touch en el carrusel
    this.$carousel.addEventListener('touchmove', (e) => {
      if (Math.abs(startX - e.touches[0].clientX) > 10) {
        e.preventDefault();
      }
    }, { passive: false });
  }

  goToSlide(index) {
    if (index < 0 || index >= this.images.length) return;
    if (index === this.currentIndex) return;
    
    this.goToSlideSmooth(index);
  }

  async goToSlideSmooth(index) {
    if (index < 0 || index >= this.images.length) return;
    if (index === this.currentIndex) return;
    
    const currentSlide = this.$slides.children[this.currentIndex];
    const newSlide = this.$slides.children[index];
    
    if (!currentSlide || !newSlide) return;
    
    // Prevenir múltiples transiciones simultáneas
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    
    try {
      // Fade out del slide actual
      currentSlide.style.opacity = '0';
      currentSlide.classList.remove('active');
      
      // Esperar a que termine la transición de opacity
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Ocultar slide actual
      currentSlide.style.display = 'none';
      
      // Preparar nuevo slide
      newSlide.style.display = 'block';
      newSlide.style.opacity = '0';
      
      // Forzar reflow para que la transición funcione correctamente
      newSlide.offsetHeight;
      
      // Fade in del nuevo slide
      newSlide.style.opacity = '1';
      newSlide.classList.add('active');
      
      // Esperar a que termine la transición de opacity
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Actualizar indicadores con transición suave
      this.updateIndicators(index);
      
      this.currentIndex = index;
      this.updateSlideDisplay();
      
    } catch (error) {
      console.error('Error during slide transition:', error);
    } finally {
      this.isTransitioning = false;
    }
  }

  waitForAnimation(element, animationClass) {
    return new Promise((resolve) => {
      const handleAnimationEnd = () => {
        element.removeEventListener('animationend', handleAnimationEnd);
        resolve();
      };
      
      element.addEventListener('animationend', handleAnimationEnd);
      
      // Fallback: si la animación no se ejecuta, resolver después de un tiempo
      setTimeout(resolve, 700);
    });
  }

  updateIndicators(activeIndex) {
    if (!this.showIndicators) return;
    
    const indicators = this.$indicators.children;
    
    // Remover clase active del indicador actual con transición suave
    if (indicators[this.currentIndex]) {
      indicators[this.currentIndex].classList.remove('active');
    }
    
    // Añadir clase active al nuevo indicador con transición suave
    if (indicators[activeIndex]) {
      setTimeout(() => {
        indicators[activeIndex].classList.add('active');
      }, 150);
    }
  }

  nextSlide() {
    if (this.isTransitioning) return;
    const nextIndex = (this.currentIndex + 1) % this.images.length;
    this.goToSlideSmooth(nextIndex);
  }

  previousSlide() {
    if (this.isTransitioning) return;
    const prevIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
    this.goToSlideSmooth(prevIndex);
  }

  updateSlideDisplay() {
    if (this.$currentSlide) {
      this.$currentSlide.textContent = this.currentIndex + 1;
    }
  }

  startAutoplay() {
    // Siempre limpiar el interval existente primero
    this.pauseAutoplay();
    
    if (this.autoplay && !this.isTransitioning) {
      console.log('Iniciando autoplay con velocidad:', this.autoplaySpeed);
      this.autoplayInterval = setInterval(() => {
        if (!this.isTransitioning) {
          console.log('Autoplay: cambiando slide automáticamente');
          this.nextSlide();
        }
      }, this.autoplaySpeed);
    }
  }

  pauseAutoplay() {
    console.log('Pausando autoplay, interval existe:', !!this.autoplayInterval);
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
      console.log('Autoplay pausado correctamente');
    }
  }

  resumeAutoplay() {
    if (this.autoplay && !this.autoplayInterval) {
      this.startAutoplay();
    }
  }

  // Resetear el timer del autoplay
  resetAutoplayTimer() {
    if (this.autoplay && !this.isTransitioning) {
      console.log('Reseteando autoplay timer');
      // Pausa el actual y reinicia uno nuevo
      this.startAutoplay();
    }
  }

  resetTransitionState() {
    this.isTransitioning = false;
    
    // Limpiar todas las clases de animación
    const slides = this.$slides.children;
    for (let slide of slides) {
      slide.classList.remove('fade-in', 'fade-out');
    }
  }

  pauseAllAnimations() {
    this.pauseAutoplay();
    this.isTransitioning = true;
  }

  resumeAllAnimations() {
    this.isTransitioning = false;
    if (this.autoplay) {
      this.startAutoplay();
    }
  }

  // Getters y Setters
  get images() { return this._images || []; }
  set images(value) {
    this._images = value;
    if (this._initialized) {
      this.resetTransitionState();
      this.setupCarousel();
    }
  }

  get autoplay() { return this._autoplay !== false; }
  set autoplay(value) {
    this._autoplay = Boolean(value);
    if (this._autoplay && !this.isTransitioning) {
      this.startAutoplay();
    } else {
      this.pauseAutoplay();
    }
  }

  get autoplaySpeed() { return this._autoplaySpeed || 5000; }
  set autoplaySpeed(value) {
    this._autoplaySpeed = value;
    if (this.autoplay && !this.isTransitioning) {
      this.startAutoplay();
    }
  }

  get showIndicators() { return this._showIndicators !== false; }
  set showIndicators(value) {
    this._showIndicators = Boolean(value);
    if (this._initialized) {
      this.setupCarousel();
    }
  }

  get showNavigation() { return this._showNavigation !== false; }
  set showNavigation(value) {
    this._showNavigation = Boolean(value);
    if (this._initialized) {
      this.setupCarousel();
    }
  }
}

customElements.define("slice-imagecarrousel", ImageCarrousel);