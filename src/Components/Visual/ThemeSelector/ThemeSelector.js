export default class ThemeSelector extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);
      
      this.$container = this.querySelector('.theme-selector-container');
      this.$currentTheme = this.querySelector('.current-theme');
      this.$themeName = this.querySelector('.theme-name');
      this.$selectorIcon = this.querySelector('.selector-icon');
      this.$dropdown = this.querySelector('.theme-dropdown');
      this.$themesList = this.querySelector('.themes-list');
      this.$dropdownArrow = this.querySelector('.dropdown-arrow');
      
      this.isOpen = false;
      this.currentThemeName = slice.stylesManager?.themeManager?.currentTheme || 'Slice';
      
      this.setupEventListeners();
      slice.controller.setComponentProps(this, props);
      this.debuggerProps = ['themes', 'currentTheme'];
   }

   async init() {
      // Set fixed label instead of current theme
      this.updateSelectorDisplay();
      await this.renderThemesList();
      
      // Listen for theme changes from other sources to update active state in dropdown
      document.addEventListener('themeChanged', (event) => {
         this.currentThemeName = event.detail.themeName;
         this.updateActiveThemeInDropdown();
      });
   }

   get themes(){
      return this._themes;
   }

    set themes(value) {
      this._themes = value;
   }

   setupEventListeners() {
      // Toggle dropdown
      this.$currentTheme.addEventListener('click', (e) => {
         e.stopPropagation();
         this.toggleDropdown();
      });

      // Keyboard navigation
      this.$currentTheme.addEventListener('keydown', (e) => {
         if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.toggleDropdown();
         }
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
         if (!this.$container.contains(e.target)) {
            this.closeDropdown();
         }
      });

      // Handle escape key
      document.addEventListener('keydown', (e) => {
         if (e.key === 'Escape' && this.isOpen) {
            this.closeDropdown();
         }
      });
   }

   updateSelectorDisplay() {
      // Always show "Select Theme" instead of current theme
      this.$themeName.textContent = 'Select Theme';
      
      // Ensure the icon is visible
      if (this.$selectorIcon) {
         this.$selectorIcon.textContent = '🎨';
      }
      
      // Remove any theme-specific styling
      this.$currentTheme.style.removeProperty('--theme-primary');
      this.$currentTheme.style.removeProperty('--theme-secondary');
   }

   updateActiveThemeInDropdown() {
      // Update only the active state in dropdown items
      this.$themesList.querySelectorAll('.theme-item').forEach(item => {
         item.classList.remove('active');
      });
      
      const activeItem = [...this.$themesList.children].find(item => 
         item.querySelector('.theme-item-name').textContent === this.currentThemeName
      );
      
      if (activeItem) {
         activeItem.classList.add('active');
      }
   }

   async renderThemesList() {
      this.$themesList.innerHTML = '';
      
      for (const theme of this.themes) {
         const themeItem = await this.createThemeItem(theme);
         this.$themesList.appendChild(themeItem);
      }
   }

   async createThemeItem(theme) {
      const item = document.createElement('div');
      item.classList.add('theme-item');
      item.setAttribute('role', 'menuitem');
      item.setAttribute('tabindex', '0');
      
      if (theme.name === this.currentThemeName) {
         item.classList.add('active');
      }

      item.innerHTML = `
         <div class="theme-preview">
            <div class="color-indicators">
               <div class="color-dot primary" style="background-color: ${theme.colors.primary}"></div>
               <div class="color-dot secondary" style="background-color: ${theme.colors.secondary}"></div>
            </div>
         </div>
         <div class="theme-info">
            <div class="theme-item-name">${theme.name}</div>
            <div class="theme-description">${theme.description}</div>
         </div>
         <div class="check-icon">✓</div>
      `;

      // Click handler
      item.addEventListener('click', async (e) => {
         e.stopPropagation();
         await this.selectTheme(theme.name);
      });

      // Keyboard handler
      item.addEventListener('keydown', async (e) => {
         if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            await this.selectTheme(theme.name);
         }
      });

      return item;
   }

   async selectTheme(themeName) {
      if (themeName === this.currentThemeName) {
         this.closeDropdown();
         return;
      }

      // Add loading state
      this.$container.classList.add('loading');
      
      try {
         // Apply the theme
         await slice.setTheme(themeName);
         
         // Update current theme reference
         this.currentThemeName = themeName;
         
         // Update active state in dropdown only
         this.updateActiveThemeInDropdown();

         // Dispatch custom event
         document.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { themeName }
         }));
         
      } catch (error) {
         console.error('Error changing theme:', error);
      } finally {
         this.$container.classList.remove('loading');
         this.closeDropdown();
      }
   }

   toggleDropdown() {
      if (this.isOpen) {
         this.closeDropdown();
      } else {
         this.openDropdown();
      }
   }

   openDropdown() {
      this.isOpen = true;
      this.$dropdown.classList.add('open');
      this.$currentTheme.classList.add('active');
      this.$currentTheme.setAttribute('aria-expanded', 'true');
      
      // Focus first theme item
      const firstItem = this.$themesList.querySelector('.theme-item');
      if (firstItem) {
         firstItem.focus();
      }
   }

   closeDropdown() {
      this.isOpen = false;
      this.$dropdown.classList.remove('open');
      this.$currentTheme.classList.remove('active');
      this.$currentTheme.setAttribute('aria-expanded', 'false');
      this.$currentTheme.focus();
   }

   // Getter/setter for external access
   get currentTheme() {
      return this.currentThemeName;
   }

   set currentTheme(value) {
      this.currentThemeName = value;
      this.updateActiveThemeInDropdown();
   }
}

customElements.define('slice-theme-selector', ThemeSelector);