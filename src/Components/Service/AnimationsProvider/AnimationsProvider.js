import { animate, createTimeline, stagger, utils } from '../../../libs/animejs/anime.esm.js';

/**
 * AnimationsProvider
 * 
 * Service centralizado para animaciones del portfolio vkneider.dev.
 * Construido sobre anime.js v4. Cubre:
 *   - Primitivos (fade, slide en 4 direcciones, scale, rotate, blur)
 *   - Composición (stagger, timeline, secuencias)
 *   - Scroll triggers (IntersectionObserver)
 *   - Switchers de texto (brand y role switchers)
 *   - Respeto a prefers-reduced-motion
 *   - Helpers de utilidad (kill, set, reset)
 * 
 * Uso típico:
 *   const animations = await slice.build('AnimationsProvider');
 *   animations.fadeIn(element);
 *   animations.staggerIn(cards, { delayStep: 80 });
 *   animations.revealOnScroll('.lazy-load');
 */
export default class AnimationsProvider {
   constructor(props) {
      this.props = props || {};

      // Si el usuario tiene preferencia de reduced-motion activada, todas las
      // animaciones se ejecutan en duración mínima (sin transiciones visuales).
      this.respectReducedMotion = props?.respectReducedMotion !== false;
      this.reducedMotion = this._detectReducedMotion();

      // Registro de observers activos para poder limpiarlos después.
      this._observers = new Set();

      // Registro de intervals (switchers de texto) para poder pararlos.
      this._intervals = new Map();
   }

   // =========================================================================
   // PRIMITIVOS — animaciones básicas de un solo elemento
   // =========================================================================

   /**
    * Fade in: aparece desde opacity 0.
    * @param {Element|string} element - DOM element o selector CSS
    * @param {Object} options - Override de cualquier opción de anime.js
    */
   fadeIn(element, options = {}) {
      return this._animate(element, {
         opacity: [0, 1],
         duration: 700,
         ease: 'outQuad',
         ...options
      });
   }

   fadeOut(element, options = {}) {
      return this._animate(element, {
         opacity: [1, 0],
         duration: 700,
         ease: 'inQuad',
         ...options
      });
   }

   /**
    * Slides direccionales: el elemento entra desde el lado indicado.
    * Distancia configurable vía options.distance (default 40px).
    */
   slideInLeft(element, options = {}) {
      const distance = options.distance || 40;
      return this._animate(element, {
         translateX: [`-${distance}px`, '0px'],
         opacity: [0, 1],
         duration: 700,
         ease: 'outCubic',
         ...options
      });
   }

   slideInRight(element, options = {}) {
      const distance = options.distance || 40;
      return this._animate(element, {
         translateX: [`${distance}px`, '0px'],
         opacity: [0, 1],
         duration: 700,
         ease: 'outCubic',
         ...options
      });
   }

   slideInUp(element, options = {}) {
      const distance = options.distance || 40;
      return this._animate(element, {
         translateY: [`${distance}px`, '0px'],
         opacity: [0, 1],
         duration: 700,
         ease: 'outCubic',
         ...options
      });
   }

   slideInDown(element, options = {}) {
      const distance = options.distance || 40;
      return this._animate(element, {
         translateY: [`-${distance}px`, '0px'],
         opacity: [0, 1],
         duration: 700,
         ease: 'outCubic',
         ...options
      });
   }

   /**
    * Scale in: zoom desde una escala inicial pequeña.
    * Útil para botones, badges, modales que aparecen.
    */
   scaleIn(element, options = {}) {
      const from = options.from || 0.8;
      return this._animate(element, {
         scale: [from, 1],
         opacity: [0, 1],
         duration: 600,
         ease: 'outBack(1.4)',
         ...options
      });
   }

   scaleOut(element, options = {}) {
      const to = options.to || 0.8;
      return this._animate(element, {
         scale: [1, to],
         opacity: [1, 0],
         duration: 400,
         ease: 'inQuad',
         ...options
      });
   }

   /**
    * Pulse: efecto latido. Útil para indicar atención sin distraer.
    * Por defecto loop infinito; pasar { loop: false } para una sola pulsación.
    */
   pulse(element, options = {}) {
      return this._animate(element, {
         scale: [1, 1.05, 1],
         duration: 1200,
         ease: 'inOutSine',
         loop: true,
         ...options
      });
   }

   /**
    * Float: movimiento suave vertical en loop. Para los floating-elements
    * decorativos del hero. Reemplaza la animación CSS @keyframes float.
    */
   float(element, options = {}) {
      const distance = options.distance || 20;
      return this._animate(element, {
         translateY: [0, -distance, 0],
         rotate: [0, 180, 360],
         duration: 6000,
         ease: 'inOutSine',
         loop: true,
         ...options
      });
   }

   /**
    * Spin: rotación continua. Para anillos rotatorios como .profile-ring.
    */
   spin(element, options = {}) {
      const direction = options.reverse ? [360, 0] : [0, 360];
      return this._animate(element, {
         rotate: direction,
         duration: 4000,
         ease: 'linear',
         loop: true,
         ...options
      });
   }

   /**
    * Glow: pulsación de brillo en box-shadow.
    * Útil para destacar el ring del avatar, botones primarios, etc.
    * El color por defecto usa --primary-color-rgb (variable del theme).
    */
   glow(element, options = {}) {
      const colorRgb = options.colorRgb || 'var(--primary-color-rgb)';
      const minBlur = options.minBlur || 20;
      const maxBlur = options.maxBlur || 40;
      return this._animate(element, {
         boxShadow: [
            `0 0 ${minBlur}px rgba(${colorRgb}, 0.3)`,
            `0 0 ${maxBlur}px rgba(${colorRgb}, 0.6)`,
            `0 0 ${minBlur}px rgba(${colorRgb}, 0.3)`
         ],
         duration: 3000,
         ease: 'inOutSine',
         loop: true,
         ...options
      });
   }

   // =========================================================================
   // COMPOSICIÓN — stagger, timeline, secuencias
   // =========================================================================

   /**
    * StaggerIn: anima múltiples elementos con un retraso escalonado.
    * Ideal para listas (cards de "About", stats, highlights, navegación).
    * 
    * @param {NodeList|Array|string} elements - Colección de elementos o selector
    * @param {Object} options
    *   - direction: 'up' | 'down' | 'left' | 'right' | 'fade' (default 'up')
    *   - delayStep: ms entre cada elemento (default 80)
    *   - duration: duración de cada animación individual (default 600)
    *   - from: 'first' | 'last' | 'center' | índice (default 'first')
    *   - distance: distancia de slide en px (default 30)
    */
   staggerIn(elements, options = {}) {
      const els = this._resolveElements(elements);
      if (!els.length) return null;

      const direction = options.direction || 'up';
      const delayStep = options.delayStep || 80;
      const duration = options.duration || 600;
      const from = options.from || 'first';
      const distance = options.distance || 30;

      const baseProps = { opacity: [0, 1] };
      switch (direction) {
         case 'up':    baseProps.translateY = [`${distance}px`, '0px']; break;
         case 'down':  baseProps.translateY = [`-${distance}px`, '0px']; break;
         case 'left':  baseProps.translateX = [`-${distance}px`, '0px']; break;
         case 'right': baseProps.translateX = [`${distance}px`, '0px']; break;
         case 'fade':  /* solo opacity */ break;
      }

      return this._animate(els, {
         ...baseProps,
         duration,
         ease: 'outCubic',
         delay: stagger(delayStep, { from }),
         ...options.override
      });
   }

   /**
    * Timeline: ejecuta animaciones en secuencia con offsets controlados.
    * Devuelve el objeto timeline de anime.js para encadenar más .add().
    * 
    * Uso:
    *   animations.timeline()
    *     .add(profileImg, { scale: [0.8, 1], opacity: [0, 1], duration: 600 })
    *     .add(title, { translateY: [20, 0], opacity: [0, 1], duration: 500 }, '-=300')
    *     .add(description, { opacity: [0, 1], duration: 400 }, '-=200');
    */
   timeline(options = {}) {
      if (this.reducedMotion) {
         // En reduced-motion devolvemos un timeline "instantáneo" (1ms).
         return createTimeline({ defaults: { duration: 1 }, ...options });
      }
      return createTimeline(options);
   }

   /**
    * heroEntrance: secuencia compleja de entrada del hero del about.
    * Usa timeline para coreografiar profile → title → description → buttons.
    * 
    * @param {Object} refs - referencias a los elementos del hero
    *   { profileContainer, titleContainer, rolesContainer, description, ctaButtons }
    */
   heroEntrance(refs, options = {}) {
      const tl = this.timeline({
         defaults: { ease: 'outCubic' }
      });

      if (refs.profileContainer) {
         tl.add(refs.profileContainer, {
            scale: [0.6, 1],
            opacity: [0, 1],
            duration: 800,
            ease: 'outBack(1.2)'
         });
      }
      if (refs.titleContainer) {
         tl.add(refs.titleContainer, {
            translateY: ['30px', '0px'],
            opacity: [0, 1],
            duration: 600
         }, '-=400');
      }
      if (refs.rolesContainer) {
         tl.add(refs.rolesContainer, {
            translateY: ['20px', '0px'],
            opacity: [0, 1],
            duration: 500
         }, '-=300');
      }
      if (refs.description) {
         tl.add(refs.description, {
            opacity: [0, 1],
            duration: 500
         }, '-=200');
      }
      if (refs.ctaButtons) {
         tl.add(refs.ctaButtons, {
            translateY: ['20px', '0px'],
            opacity: [0, 1],
            duration: 500
         }, '-=200');
      }

      return tl;
   }

   // =========================================================================
   // SCROLL TRIGGERS — IntersectionObserver
   // =========================================================================

   /**
    * revealOnScroll: anima elementos cuando entran en viewport.
    * Reemplaza el patrón .lazy-load + .loaded del CSS global.
    * 
    * @param {string|NodeList|Array} elements - selector o elementos
    * @param {Object} options
    *   - direction: igual que staggerIn (default 'up')
    *   - threshold: 0 a 1, % visible para disparar (default 0.15)
    *   - rootMargin: margen extra de viewport (default '0px')
    *   - once: animar solo una vez (default true)
    *   - delayStep: si hay varios, escalona (default 0 = sin escalonar)
    */
   revealOnScroll(elements, options = {}) {
      const els = this._resolveElements(elements);
      if (!els.length) return null;

      const direction = options.direction || 'up';
      const threshold = options.threshold ?? 0.15;
      const rootMargin = options.rootMargin || '0px';
      const once = options.once !== false;
      const delayStep = options.delayStep || 0;
      const distance = options.distance || 30;
      const duration = options.duration || 700;

      // Estado inicial: invisible y desplazado.
      els.forEach(el => {
         el.style.opacity = '0';
         if (direction === 'up')    el.style.transform = `translateY(${distance}px)`;
         if (direction === 'down')  el.style.transform = `translateY(-${distance}px)`;
         if (direction === 'left')  el.style.transform = `translateX(-${distance}px)`;
         if (direction === 'right') el.style.transform = `translateX(${distance}px)`;
      });

      const observer = new IntersectionObserver((entries) => {
         entries.forEach((entry, idx) => {
            if (!entry.isIntersecting) return;

            const el = entry.target;
            const elementIndex = els.indexOf(el);
            const delay = delayStep > 0 && elementIndex >= 0 ? elementIndex * delayStep : 0;

            this._animate(el, {
               opacity: [0, 1],
               translateX: ['none'],
               translateY: ['none'],
               duration,
               delay,
               ease: 'outCubic'
            });

            if (once) observer.unobserve(el);
         });
      }, { threshold, rootMargin });

      els.forEach(el => observer.observe(el));
      this._observers.add(observer);

      return observer;
   }

   // =========================================================================
   // SWITCHERS DE TEXTO — brand-switcher, role-switcher
   // =========================================================================

   /**
    * textSwitcher: alterna el contenido textual de un elemento con fade
    * suave. Reemplaza el patrón setInterval + opacity manual del aboutSection.
    * 
    * @param {Element|string} element - donde se renderiza el texto
    * @param {Array<string>} items - lista de strings a alternar
    * @param {Object} options
    *   - interval: ms entre cambios (default 3000)
    *   - fadeDuration: duración del cross-fade (default 400)
    *   - render: función custom (item) => HTML, opcional
    *     útil cuando quieres styling diferenciado por item (ej: ".dev" en color)
    *   - id: identificador único para poder pararlo después
    */
   textSwitcher(element, items, options = {}) {
      const el = this._resolveElement(element);
      if (!el || !items?.length) return null;

      const interval = options.interval || 3000;
      const fadeDuration = options.fadeDuration || 400;
      const render = options.render || ((item) => item);
      const id = options.id || `switcher_${Date.now()}_${Math.random()}`;

      let currentIndex = 0;

      // Render inicial inmediato.
      el.innerHTML = render(items[0]);

      if (this.reducedMotion) {
         // Sin animación: cambia directo.
         const handle = setInterval(() => {
            currentIndex = (currentIndex + 1) % items.length;
            el.innerHTML = render(items[currentIndex]);
         }, interval);
         this._intervals.set(id, handle);
         return id;
      }

      const handle = setInterval(() => {
         currentIndex = (currentIndex + 1) % items.length;

         this._animate(el, {
            opacity: [1, 0],
            duration: fadeDuration / 2,
            ease: 'inQuad',
            onComplete: () => {
               el.innerHTML = render(items[currentIndex]);
               this._animate(el, {
                  opacity: [0, 1],
                  duration: fadeDuration / 2,
                  ease: 'outQuad'
               });
            }
         });
      }, interval);

      this._intervals.set(id, handle);
      return id;
   }

   /**
    * brandSwitcher: helper específico para alternar entre nombre personal
    * y marca con sufijo coloreado. Caso de uso del aboutSection.
    * 
    * @param {Element|string} element
    * @param {Object} options
    *   - personal: nombre personal (ej: 'Victor Kneider')
    *   - brand: marca con sufijo (ej: 'vkneider.dev')
    *   - suffix: parte del brand que va con clase especial (ej: '.dev')
    *   - suffixClass: clase CSS para el sufijo (default 'dev-suffix')
    *   - interval: ms entre cambios (default 4000)
    */
   brandSwitcher(element, options = {}) {
      const personal = options.personal || 'Victor Kneider';
      const brand = options.brand || 'vkneider.dev';
      const suffix = options.suffix || '.dev';
      const suffixClass = options.suffixClass || 'dev-suffix';

      const items = [personal, brand];

      return this.textSwitcher(element, items, {
         interval: options.interval || 4000,
         fadeDuration: options.fadeDuration || 800,
         id: options.id || 'brandSwitcher',
         render: (item) => {
            if (item !== brand) return item;
            const baseName = brand.replace(suffix, '');
            return `${baseName}<span class="${suffixClass}">${suffix}</span>`;
         }
      });
   }

   /**
    * roleSwitcher: cicla a través de una lista de roles profesionales.
    * Versión limpia del patrón setInterval del aboutSection original.
    */
   roleSwitcher(element, roles, options = {}) {
      return this.textSwitcher(element, roles, {
         interval: options.interval || 3000,
         fadeDuration: options.fadeDuration || 600,
         id: options.id || 'roleSwitcher',
         ...options
      });
   }

   // =========================================================================
   // UTILIDADES — set, reset, kill
   // =========================================================================

   /**
    * Set: aplica propiedades CSS sin transición (instantáneo).
    * Útil para preparar estado inicial antes de animar.
    */
   set(element, properties) {
      utils.set(this._resolveElement(element), properties);
   }

   /**
    * Detiene un switcher por su id.
    */
   stopSwitcher(id) {
      const handle = this._intervals.get(id);
      if (handle) {
         clearInterval(handle);
         this._intervals.delete(id);
      }
   }

   /**
    * Limpia todos los observers y switchers activos.
    * Llamar al destruir el componente que usa el provider.
    */
   cleanup() {
      this._observers.forEach(obs => obs.disconnect());
      this._observers.clear();
      this._intervals.forEach(handle => clearInterval(handle));
      this._intervals.clear();
   }

   /**
    * Método genérico de escape: pasa lo que quieras directo a anime.js.
    * Mantiene compatibilidad con el código existente.
    */
   animateElement(element, animeOptions) {
      return this._animate(element, animeOptions);
   }

   // =========================================================================
   // INTERNOS
   // =========================================================================

   /**
    * Wrapper interno de animate() que respeta reduced-motion.
    * En reduced-motion las animaciones se completan en 1ms (estado final aplicado).
    */
   _animate(target, options) {
      if (this.respectReducedMotion && this.reducedMotion) {
         return animate(target, { ...options, duration: 1, delay: 0 });
      }
      return animate(target, options);
   }

   _detectReducedMotion() {
      if (typeof window === 'undefined' || !window.matchMedia) return false;
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
   }

   _resolveElement(element) {
      if (typeof element === 'string') return document.querySelector(element);
      return element;
   }

   _resolveElements(elements) {
      if (typeof elements === 'string') {
         return Array.from(document.querySelectorAll(elements));
      }
      if (elements instanceof NodeList) return Array.from(elements);
      if (Array.isArray(elements)) return elements;
      if (elements instanceof Element) return [elements];
      return [];
   }
}