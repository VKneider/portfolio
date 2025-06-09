export default class Image extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);
      
      this.$container = this.querySelector('.slice-image-container');
      this.$skeleton = this.querySelector('.image-skeleton');
      this.$image = this.querySelector('.slice-image');
      this.$fallback = this.querySelector('.image-fallback');
      this.$errorOverlay = this.querySelector('.image-error-overlay');
      this.$retryBtn = this.querySelector('.retry-button');
      this.$progressBar = this.querySelector('.loading-progress-bar');
      
      // Estados del componente
      this.loadingState = 'initial'; // initial, loading, loaded, error, offline
      this.retryCount = 0;
      this.maxRetries = 3;
      this.observer = null;
      this.isLoading = false; // 🔹 NUEVA BANDERA PARA EVITAR BUCLES
      this.isIntersecting = false;
      this.networkInfo = this.getNetworkInfo();
      
      // Configurar event listeners
      this.setupEventListeners();
      
      slice.controller.setComponentProps(this, props);
      this.debuggerProps = [
         'src', 'alt', 'fallbackSrc', 'aspectRatio', 'lazy', 'quality', 
         'progressive', 'retryOnError', 'placeholder', 'sizes', 'srcset'
      ];
   }

   async init() {
      // Configurar valores por defecto
      this.setDefaults();
      
      // Configurar aspect ratio si se proporciona
      if (this.aspectRatio) {
         this.setAspectRatio();
      }
      
      // Configurar placeholder o skeleton
      this.setupPlaceholder();
      
      // Inicializar carga de imagen
      if (this.lazy) {
         this.setupLazyLoading();
      } else {
         await this.loadImage();
      }
      
      // Monitorear cambios en la conectividad
      this.setupNetworkMonitoring();
   }

   setDefaults() {
      if (this.lazy === undefined) this.lazy = true;
      if (this.quality === undefined) this.quality = 'auto';
      if (this.progressive === undefined) this.progressive = true;
      if (this.retryOnError === undefined) this.retryOnError = true;
      if (this.aspectRatio === undefined) this.aspectRatio = null;
      if (this.loading === undefined) this.loading = 'lazy';
      if (this.fetchPriority === undefined) this.fetchPriority = 'auto';
   }

   setupEventListeners() {
      this.$retryBtn?.addEventListener('click', () => this.retryLoad());
      
      // Event listeners para la imagen
      this.$image.addEventListener('load', () => this.onImageLoad());
      this.$image.addEventListener('error', () => this.onImageError());
      this.$image.addEventListener('progress', (e) => this.onImageProgress(e));
   }

   setupNetworkMonitoring() {
      // Escuchar cambios en la conectividad
      window.addEventListener('online', () => this.onNetworkChange(true));
      window.addEventListener('offline', () => this.onNetworkChange(false));
      
      // Monitorear cambios en la velocidad de conexión (si está disponible)
      if ('connection' in navigator) {
         navigator.connection.addEventListener('change', () => {
            this.networkInfo = this.getNetworkInfo();
            this.adjustQualityBasedOnConnection();
         });
      }
   }

   onNetworkChange(isOnline) {
      if (isOnline && this.loadingState === 'offline') {
         this.loadingState = 'initial';
         if (this.isIntersecting || !this.lazy) {
            this.loadImage();
         }
      } else if (!isOnline) {
         this.loadingState = 'offline';
         this.showOfflineState();
      }
   }

   getNetworkInfo() {
      if (!('connection' in navigator)) {
         return { effectiveType: '4g', downlink: 10, saveData: false };
      }
      
      const connection = navigator.connection;
      return {
         effectiveType: connection.effectiveType || '4g',
         downlink: connection.downlink || 10,
         saveData: connection.saveData || false,
         rtt: connection.rtt || 0
      };
   }

   shouldLoadImage() {
      // No cargar si no hay conexión
      if (!navigator.onLine) {
         this.showOfflineState();
         return false;
      }
      
      // No cargar en conexiones muy lentas si saveData está activado
      if (this.networkInfo.saveData && this.quality !== 'low') {
         this.quality = 'low';
      }
      
      // No cargar en conexiones 2G muy lentas
      if (this.networkInfo.effectiveType === 'slow-2g' && !this.forceLoad) {
         this.showLowConnectionWarning();
         return false;
      }
      
      return true;
   }

   adjustQualityBasedOnConnection() {
      if (!this.adaptiveQuality) return;
      
      const { effectiveType, saveData } = this.networkInfo;
      
      if (saveData) {
         this.quality = 'low';
      } else if (effectiveType === 'slow-2g' || effectiveType === '2g') {
         this.quality = 'low';
      } else if (effectiveType === '3g') {
         this.quality = 'medium';
      } else {
         this.quality = this._originalQuality || 'high';
      }
      
      // Recargar imagen si es necesario
      if (this.loadingState === 'loaded' && this.adaptiveQuality) {
         this.loadImage();
      }
   }

   setupLazyLoading() {
      if (!('IntersectionObserver' in window)) {
         // Fallback para navegadores sin IntersectionObserver
         this.loadImage();
         return;
      }
      
      this.observer = new IntersectionObserver(
         (entries) => {
            entries.forEach(entry => {
               if (entry.isIntersecting) {
                  this.isIntersecting = true;
                  this.loadImage();
                  this.observer.unobserve(this);
               }
            });
         },
         {
            rootMargin: this.rootMargin || '50px',
            threshold: 0.1
         }
      );
      
      this.observer.observe(this);
   }

   setupPlaceholder() {
      if (this.placeholder === 'skeleton') {
         this.$skeleton.style.display = 'block';
      } else if (this.placeholder === 'blur') {
         this.setupBlurPlaceholder();
      } else if (this.placeholder && typeof this.placeholder === 'string') {
         this.setupCustomPlaceholder();
      }
   }

   setupBlurPlaceholder() {
      if (!this.blurDataUrl) return;
      
      const blurImg = document.createElement('img');
      blurImg.src = this.blurDataUrl;
      blurImg.classList.add('blur-placeholder');
      blurImg.style.filter = 'blur(10px)';
      blurImg.style.transform = 'scale(1.1)';
      
      this.$container.insertBefore(blurImg, this.$image);
   }

   setupCustomPlaceholder() {
      const placeholderImg = document.createElement('img');
      placeholderImg.src = this.placeholder;
      placeholderImg.classList.add('custom-placeholder');
      
      this.$container.insertBefore(placeholderImg, this.$image);
   }

   setAspectRatio() {
      this.$container.style.aspectRatio = this.aspectRatio;
      this.$container.classList.add('has-aspect-ratio');
   }

   async loadImage() {
   if (!this.shouldLoadImage() || this.isLoading) return;
   
   this.isLoading = true; // 🔹 ACTIVAR BANDERA
   this.loadingState = 'loading';
   this.showLoadingState();
   
   try {
      const imgSrc = this.getOptimizedSrc();
      await this.preloadImage(imgSrc);
      
      // Configurar la imagen SIN disparar el setter del componente
      this.$image.src = imgSrc;
      this.$image.alt = this.alt || '';
      
      if (this.sizes) this.$image.sizes = this.sizes;
      if (this.srcset) this.$image.srcset = this.srcset;
      if (this.loading) this.$image.loading = this.loading;
      if (this.fetchPriority) this.$image.fetchPriority = this.fetchPriority;
      
   } catch (error) {
      this.onImageError(error);
   } finally {
      this.isLoading = false; // 🔹 DESACTIVAR BANDERA
   }
}

   getOptimizedSrc() {
      if (!this.src) return '';
      
      // Si no hay optimización, retornar src original
      if (!this.optimize) return this.src;
      
      let optimizedSrc = this.src;
      
      // Agregar parámetros de calidad según la conexión
      if (this.src.includes('?')) {
         optimizedSrc += '&';
      } else {
         optimizedSrc += '?';
      }
      
      // Parámetros de optimización
      const qualityMap = {
         'low': 'q=30&fm=webp',
         'medium': 'q=60&fm=webp', 
         'high': 'q=85&fm=webp',
         'auto': this.getAutoQuality()
      };
      
      optimizedSrc += qualityMap[this.quality] || qualityMap['auto'];
      
      // Agregar dimensiones si están disponibles
      if (this.width) optimizedSrc += `&w=${this.width}`;
      if (this.height) optimizedSrc += `&h=${this.height}`;
      
      return optimizedSrc;
   }

   getAutoQuality() {
      const { effectiveType, saveData } = this.networkInfo;
      
      if (saveData) return 'q=25&fm=webp';
      if (effectiveType === 'slow-2g' || effectiveType === '2g') return 'q=35&fm=webp';
      if (effectiveType === '3g') return 'q=60&fm=webp';
      return 'q=85&fm=webp';
   }

   preloadImage(src) {
      return new Promise((resolve, reject) => {
      const img = document.createElement('img');
         
         img.onload = () => resolve(img);
         img.onerror = () => reject(new Error('Failed to load image'));
         
         // Configurar crossOrigin si es necesario
         if (this.crossOrigin) img.crossOrigin = this.crossOrigin;
         
         img.src = src;
      });
   }

   onImageLoad() {
   this.loadingState = 'loaded';
   this.retryCount = 0;
   this.isLoading = false; // 🔹 RESETEAR BANDERA
   
   // Ocultar elementos de carga
   this.hideLoadingElements();
   
   // Mostrar imagen con animación
   this.$image.classList.add('loaded');
   
   // Progressive enhancement: remover placeholder blur
   if (this.progressive) {
      this.removeBlurPlaceholder();
   }
   
   // Dispatch evento personalizado
   this.dispatchEvent(new CustomEvent('imageLoaded', {
      detail: { src: this.$image.src, element: this }
   }));
}

   onImageError(error) {
   this.isLoading = false; // 🔹 RESETEAR BANDERA
   this.loadingState = 'error';
   
   // Intentar cargar imagen de fallback
   if (this.fallbackSrc && this.$image.src !== this.fallbackSrc) {
      this.$image.src = this.fallbackSrc;
      return;
   }
   
   // Mostrar estado de error
   this.showErrorState();
   
   // Auto-retry si está habilitado
   if (this.retryOnError && this.retryCount < this.maxRetries) {
      setTimeout(() => this.retryLoad(), this.getRetryDelay());
   }
   
   // Dispatch evento de error
   this.dispatchEvent(new CustomEvent('imageError', {
      detail: { error, retryCount: this.retryCount, element: this }
   }));
}

   onImageProgress(event) {
      if (event.lengthComputable) {
         const percentComplete = (event.loaded / event.total) * 100;
         this.updateProgressBar(percentComplete);
      }
   }

   retryLoad() {
   this.retryCount++;
   this.loadingState = 'initial';
   this.isLoading = false; // 🔹 RESETEAR BANDERA
   this.hideErrorState();
   this.loadImage();
}

   getRetryDelay() {
      // Exponential backoff: 1s, 2s, 4s
      return Math.min(1000 * Math.pow(2, this.retryCount), 8000);
   }

   // Estados visuales
   showLoadingState() {
      this.$container.classList.add('loading');
      if (this.$skeleton) this.$skeleton.style.display = 'block';
      if (this.$progressBar) this.$progressBar.style.display = 'block';
   }

   hideLoadingElements() {
      this.$container.classList.remove('loading');
      if (this.$skeleton) this.$skeleton.style.display = 'none';
      if (this.$progressBar) this.$progressBar.style.display = 'none';
      
      // Remover placeholders
      this.$container.querySelectorAll('.blur-placeholder, .custom-placeholder')
         .forEach(el => el.remove());
   }

   showErrorState() {
      this.$container.classList.add('error');
      if (this.$errorOverlay) this.$errorOverlay.style.display = 'flex';
      this.hideLoadingElements();
   }

   hideErrorState() {
      this.$container.classList.remove('error');
      if (this.$errorOverlay) this.$errorOverlay.style.display = 'none';
   }

   showOfflineState() {
      this.$container.classList.add('offline');
      this.loadingState = 'offline';
   }

   showLowConnectionWarning() {
      this.$container.classList.add('low-connection');
      // Mostrar botón para cargar manualmente
      const loadBtn = this.$container.querySelector('.manual-load-btn');
      if (loadBtn) {
         loadBtn.style.display = 'block';
         loadBtn.onclick = () => {
            this.forceLoad = true;
            this.loadImage();
         };
      }
   }

   removeBlurPlaceholder() {
      const blurElement = this.$container.querySelector('.blur-placeholder');
      if (blurElement) {
         blurElement.style.opacity = '0';
         setTimeout(() => blurElement.remove(), 300);
      }
   }

   updateProgressBar(percentage) {
      if (this.$progressBar) {
         const fill = this.$progressBar.querySelector('.progress-fill');
         if (fill) fill.style.width = `${percentage}%`;
      }
   }

   // Getters y Setters
   get src() { return this._src; }
set src(value) {
   this._src = value;
   // 🔹 SOLO cargar si no estamos ya cargando y el estado lo permite
   if (!this.isLoading && (this.loadingState === 'initial' || this.loadingState === 'error')) {
      this.loadImage();
   }
}

   get alt() { return this._alt; }
   set alt(value) {
      this._alt = value;
      if (this.$image) this.$image.alt = value;
   }

   get lazy() { return this._lazy; }
   set lazy(value) { this._lazy = value; }

   get quality() { return this._quality; }
   set quality(value) {
      if (!this._originalQuality) this._originalQuality = this._quality;
      this._quality = value;
   }

   get aspectRatio() { return this._aspectRatio; }
   set aspectRatio(value) {
      this._aspectRatio = value;
      if (value) this.setAspectRatio();
   }

   get fallbackSrc() { return this._fallbackSrc; }
   set fallbackSrc(value) { this._fallbackSrc = value; }

   get placeholder() { return this._placeholder; }
   set placeholder(value) { this._placeholder = value; }

   get progressive() { return this._progressive; }
   set progressive(value) { this._progressive = value; }

   get retryOnError() { return this._retryOnError; }
   set retryOnError(value) { this._retryOnError = value; }

   get optimize() { return this._optimize; }
   set optimize(value) { this._optimize = value; }

   get adaptiveQuality() { return this._adaptiveQuality; }
   set adaptiveQuality(value) { this._adaptiveQuality = value; }

   get rootMargin() { return this._rootMargin; }
   set rootMargin(value) { this._rootMargin = value; }

   get sizes() { return this._sizes; }
   set sizes(value) { this._sizes = value; }

   get srcset() { return this._srcset; }
   set srcset(value) { this._srcset = value; }

   get width() { return this._width; }
   set width(value) { this._width = value; }

   get height() { return this._height; }
   set height(value) { this._height = value; }

   get loading() { return this._loading; }
   set loading(value) { this._loading = value; }

   get fetchPriority() { return this._fetchPriority; }
   set fetchPriority(value) { this._fetchPriority = value; }

   get crossOrigin() { return this._crossOrigin; }
   set crossOrigin(value) { this._crossOrigin = value; }

   get blurDataUrl() { return this._blurDataUrl; }
   set blurDataUrl(value) { this._blurDataUrl = value; }

   get forceLoad() { return this._forceLoad; }
   set forceLoad(value) { this._forceLoad = value; }

   // Cleanup
   disconnectedCallback() {
      if (this.observer) {
         this.observer.disconnect();
      }
      
      window.removeEventListener('online', this.onNetworkChange);
      window.removeEventListener('offline', this.onNetworkChange);
      
      if ('connection' in navigator) {
         navigator.connection.removeEventListener('change', this.adjustQualityBasedOnConnection);
      }
   }
}

customElements.define('slice-image', Image);