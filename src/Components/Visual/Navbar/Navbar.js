export default class Navbar extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);

      this.$header = this.querySelector('.slice_nav_header');
      this.$navBar = this.querySelector('.slice_nav_bar');
      this.$menu = this.querySelector('.nav_bar_menu');
      this.$buttonsContainer = this.querySelector('.nav_bar_buttons');
      this.$logoContainer = this.querySelector('.logo_container');
      this.$mobileMenu = this.querySelector('.slice_mobile_menu');
      this.$mobileButton = this.querySelector('.mobile_menu_button');
      this.$closeMenu = this.querySelector('.mobile_close_menu');

      this.$mobileButton.addEventListener('click', () => {
         this.$navBar.style.transform = 'translateX(0%)';
      });

      this.$closeMenu.addEventListener('click', () => {
         this.$navBar.style.transform = 'translateX(100%)';
      });

      slice.controller.setComponentProps(this, props);
      this.debuggerProps = ['logo', 'items', 'buttons', 'elements'];
   }

   async init() {
      // Mantener comportamiento original
      if (this.items) {
         await this.addItems(this.items);
      }
      
      if (this.buttons) {
         this.buttons.forEach(async (item) => {
            await this.addButton(item, this.$buttonsContainer);
         });
      }

      // Nueva funcionalidad: elementos personalizados
      if (this.elements) {
         this.addElements(this.elements);
      }

      // Mantener lógica original de ajuste de layout
      if (window.screen.width >= 1020 && this.items && this.logo && (this.buttons || this.elements)) {
         this.$menu.style.maxWidth = '60%';
      }
   }

   /**
    * Nueva funcionalidad: Agregar elementos personalizados
    */
   addElements(elements) {
      elements.forEach(elementConfig => {
         this.addElement(elementConfig);
      });
   }

   /**
    * Agregar un elemento personalizado al navbar
    * @param {Object} config - Configuración del elemento
    * @param {HTMLElement} config.element - El elemento HTML a agregar
    * @param {string} config.section - Sección: 'logo', 'navigation', 'actions', 'start', 'end'
    * @param {boolean} config.asNavItem - Si debe tratarse como item de navegación
    * @param {string} config.className - Clase CSS adicional
    * @param {number} config.order - Orden de inserción
    */
   addElement(config) {
      const { 
         element, 
         section = 'actions', 
         asNavItem = false, 
         className = '', 
         order = null 
      } = config;

      if (!element || !(element instanceof HTMLElement)) {
         console.warn('Navbar: Invalid element provided');
         return;
      }

      const targetSection = this.getTargetSection(section);
      if (!targetSection) {
         console.warn(`Navbar: Invalid section "${section}"`);
         return;
      }

      const processedElement = this.processElement(element, section, asNavItem, className);
      this.insertElement(processedElement, targetSection, order);
   }

   /**
    * Mapeo de secciones con alias para flexibilidad
    */
   getTargetSection(sectionName) {
      const sectionMap = {
         // Secciones principales
         'logo': this.$logoContainer,
         'navigation': this.$menu,
         'actions': this.$buttonsContainer,
         
         // Alias intuitivos
         'nav': this.$menu,
         'center': this.$menu,
         'central': this.$menu,
         'mid': this.$menu,
         'menu': this.$menu,
         
         'buttons': this.$buttonsContainer,  // Retrocompatibilidad
         'right': this.$buttonsContainer,
         'end': this.$buttonsContainer,
         
         'start': this.$header,
         'header': this.$header
      };

      return sectionMap[sectionName];
   }

   processElement(element, section, asNavItem, className) {
      if (className) {
         element.classList.add(className);
      }

      // Para navegación, envolver en li con efectos
      const navSections = ['navigation', 'nav', 'center', 'central', 'mid', 'menu'];
      if (navSections.includes(section)) {
         const listItem = document.createElement('li');
         element.classList.add('item');
         listItem.appendChild(element);

         if (asNavItem) {
            const hoverEffect = document.createElement('div');
            hoverEffect.classList.add('anim-item');
            listItem.appendChild(hoverEffect);
         }

         return listItem;
      }

      // Para acciones, agregar clase
      const actionSections = ['actions', 'buttons', 'right', 'end'];
      if (actionSections.includes(section)) {
         element.classList.add('navbar-action-item');
      }

      return element;
   }

   insertElement(element, targetSection, order) {
      if (order !== null && order >= 0) {
         const children = targetSection.children;
         if (order < children.length) {
            targetSection.insertBefore(element, children[order]);
         } else {
            targetSection.appendChild(element);
         }
      } else {
         targetSection.appendChild(element);
      }
   }

   /**
    * Métodos de conveniencia para diferentes secciones
    */
   addToLogo(element, options = {}) {
      this.addElement({ element, section: 'logo', ...options });
   }

   addToNavigation(element, options = {}) {
      this.addElement({ 
         element, 
         section: 'navigation', 
         asNavItem: true, 
         ...options 
      });
   }

   addToCenter(element, options = {}) {
      this.addElement({ 
         element, 
         section: 'center', 
         asNavItem: true, 
         ...options 
      });
   }

   addToActions(element, options = {}) {
      this.addElement({ element, section: 'actions', ...options });
   }

   addToStart(element, options = {}) {
      this.addElement({ element, section: 'start', ...options });
   }

   addToEnd(element, options = {}) {
      this.addElement({ element, section: 'end', ...options });
   }

   /**
    * Remover elemento (mantiene compatibilidad)
    */
   removeElement(element) {
      const sections = [this.$logoContainer, this.$menu, this.$buttonsContainer, this.$header];
      
      for (const section of sections) {
         if (section.contains(element)) {
            const parent = element.parentNode;
            element.remove();
            
            if (parent.tagName === 'LI' && parent.children.length === 0) {
               parent.remove();
            }
            return true;
         }
         
         const wrappers = section.querySelectorAll('li');
         for (const wrapper of wrappers) {
            if (wrapper.contains(element)) {
               wrapper.remove();
               return true;
            }
         }
      }
      
      return false;
   }

   // ===============================
   // MÉTODOS ORIGINALES (Sin cambios para retrocompatibilidad)
   // ===============================

   async addItems(items) {
      for (let i = 0; i < items.length; i++) {
         await this.addItem(items[i], this.$menu);
      }
   }

   get position() {
      return this._position;
   }

   set position(value) {
      this._position = value;
      if (value === 'fixed') {
         this.classList.add('nav_bar_fixed');
      }
   }

   get logo() {
      return this._logo;
   }

   set logo(value) {
      this._logo = value;
      const img = document.createElement('img');
      img.src = value.src;
      this.$logoContainer.appendChild(img);
      this.$logoContainer.href = value.path;
   }

   get items() {
      return this._items;
   }

   set items(values) {
      this._items = values;
   }

   get buttons() {
      return this._buttons;
   }

   set buttons(values) {
      this._buttons = values;
   }

   get elements() {
      return this._elements;
   }

   set elements(values) {
      this._elements = values;
   }

   get direction() {
      return this._direction;
   }

   set direction(value) {
      this._direction = value;
      if (value === 'reverse') {
         this.$header.classList.add('direction-row-reverse');
      }
   }

   async addItem(value, addTo) {
      const item = document.createElement('li');
      const hover = document.createElement('div');
      hover.classList.add('anim-item');
      if (!value.type) {
         value.type = 'text';
      }
      if (value.type === 'text') {
         const link = await slice.build('Link', {
            text: value.text,
            path: value.path,
            classes: 'item',
         });
         item.appendChild(link);
      }
      if (value.type === 'dropdown') {
         const d = await slice.build('DropDown', {
            label: value.text,
            options: value.options,
         });
         d.classList.add('item');
         item.appendChild(d);
      }
      item.appendChild(hover);
      addTo.appendChild(item);
   }

   async addButton(value, addTo) {
      if (!value.color) {
         value.color = {
            label: 'var(--primary-color-rgb)',
            button: 'var(--primary-background-color)',
         };
      }
      const button = await slice.build('Button', {
         value: value.value,
         customColor: value.color,
         icon: value.icon,
         onClickCallback: value.onClickCallback,
      });
      addTo.appendChild(button);
   }
}

window.customElements.define('slice-nav-bar', Navbar);