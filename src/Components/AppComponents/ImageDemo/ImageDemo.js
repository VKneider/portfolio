export default class ImageDemo extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);
      
      this.$container = this.querySelector('.image-demo-container');
      this.$basicSection = this.querySelector('.basic-examples');
      this.$advancedSection = this.querySelector('.advanced-examples');
      this.$interactiveSection = this.querySelector('.interactive-examples');
      
      slice.controller.setComponentProps(this, props);
      this.debuggerProps = [];
   }

   async init() {
      await this.createBasicExamples();
      await this.createAdvancedExamples();
      await this.createInteractiveExamples();
   }

   async createBasicExamples() {
      const sectionTitle = document.createElement('h2');
      sectionTitle.textContent = '🖼️ Basic Image Examples';
      sectionTitle.classList.add('section-title');

      const grid = await slice.build('Grid', {
         columns: 3,
         rows: 2
      });

      // Ejemplo 1: Imagen básica con lazy loading
      const basicImage = await slice.build('Image', {
         src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
         alt: 'Beautiful mountain landscape',
         lazy: true,
         quality: 'high'
      });

      const basicCard = this.createExampleCard(
         'Basic Lazy Loading',
         'Standard image with lazy loading enabled',
         basicImage
      );

      // Ejemplo 2: Imagen con aspect ratio
      const aspectImage = await slice.build('Image', {
         src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
         alt: 'Forest path',
         aspectRatio: '16/9',
         lazy: true,
         quality: 'high'
      });

      const aspectCard = this.createExampleCard(
         'Fixed Aspect Ratio (16:9)',
         'Image constrained to specific aspect ratio',
         aspectImage
      );

      // Ejemplo 3: Imagen con fallback
      const fallbackImage = await slice.build('Image', {
         src: 'https://invalid-url-that-will-fail.com/image.jpg',
         fallbackSrc: 'https://picsum.photos/800/600?random=1',
         alt: 'Image with fallback demonstration',
         lazy: true,
         retryOnError: true
      });

      const fallbackCard = this.createExampleCard(
         'Fallback Image',
         'Demonstrates fallback when primary image fails',
         fallbackImage
      );

      // Ejemplo 4: Imagen con skeleton placeholder
      const skeletonImage = await slice.build('Image', {
         src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80',
         alt: 'Ocean wave',
         placeholder: 'skeleton',
         lazy: true,
         quality: 'medium'
      });

      const skeletonCard = this.createExampleCard(
         'Skeleton Placeholder',
         'Shows animated skeleton while loading',
         skeletonImage
      );

      // Ejemplo 5: Imagen cuadrada
      const squareImage = await slice.build('Image', {
         src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop&q=80',
         alt: 'Square mountain view',
         aspectRatio: '1/1',
         lazy: true,
         quality: 'high'
      });

      const squareCard = this.createExampleCard(
         'Square Format (1:1)',
         'Perfect square image format',
         squareImage
      );

      // Ejemplo 6: Imagen con calidad adaptativa
      const adaptiveImage = await slice.build('Image', {
         src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
         alt: 'Nature landscape',
         adaptiveQuality: true,
         quality: 'auto',
         lazy: true
      });

      const adaptiveCard = this.createExampleCard(
         'Adaptive Quality',
         'Quality adjusts based on network speed',
         adaptiveImage
      );

      await grid.setItem(basicCard);
      await grid.setItem(aspectCard);
      await grid.setItem(fallbackCard);
      await grid.setItem(skeletonCard);
      await grid.setItem(squareCard);
      await grid.setItem(adaptiveCard);

      this.$basicSection.appendChild(sectionTitle);
      this.$basicSection.appendChild(grid);
   }

   async createAdvancedExamples() {
      const sectionTitle = document.createElement('h2');
      sectionTitle.textContent = '⚡ Advanced Features';
      sectionTitle.classList.add('section-title');

      const container = document.createElement('div');
      container.classList.add('advanced-grid');

      // Progressive loading example
      const progressiveContainer = document.createElement('div');
      progressiveContainer.classList.add('advanced-example');

      const progressiveTitle = document.createElement('h3');
      progressiveTitle.textContent = 'Progressive Loading';
      
      const progressiveDesc = document.createElement('p');
      progressiveDesc.textContent = 'High-quality image with progressive enhancement and blur placeholder';

      const progressiveImage = await slice.build('Image', {
         src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85',
         blurDataUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyOiKhqvKIL//Z',
         placeholder: 'blur',
         progressive: true,
         lazy: true,
         aspectRatio: '21/9'
      });

      progressiveContainer.appendChild(progressiveTitle);
      progressiveContainer.appendChild(progressiveDesc);
      progressiveContainer.appendChild(progressiveImage);

      // Error handling example
      const errorContainer = document.createElement('div');
      errorContainer.classList.add('advanced-example');

      const errorTitle = document.createElement('h3');
      errorTitle.textContent = 'Error Handling & Retry';
      
      const errorDesc = document.createElement('p');
      errorDesc.textContent = 'Demonstrates error states and retry functionality';

      const errorImage = await slice.build('Image', {
         src: 'https://this-url-definitely-does-not-exist.com/image.jpg',
         fallbackSrc: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=60',
         alt: 'Error demonstration',
         retryOnError: true,
         lazy: true,
         aspectRatio: '16/10'
      });

      errorContainer.appendChild(errorTitle);
      errorContainer.appendChild(errorDesc);
      errorContainer.appendChild(errorImage);

      // Responsive image example
      const responsiveContainer = document.createElement('div');
      responsiveContainer.classList.add('advanced-example', 'full-width');

      const responsiveTitle = document.createElement('h3');
      responsiveTitle.textContent = 'Responsive Images';
      
      const responsiveDesc = document.createElement('p');
      responsiveDesc.textContent = 'Different image sources for different screen sizes using srcset';

      const responsiveImage = await slice.build('Image', {
         src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
         srcset: `
            https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80 400w,
            https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80 800w,
            https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80 1200w
         `,
         sizes: '(max-width: 768px) 400px, (max-width: 1200px) 800px, 1200px',
         alt: 'Responsive mountain landscape',
         lazy: true,
         aspectRatio: '21/9'
      });

      responsiveContainer.appendChild(responsiveTitle);
      responsiveContainer.appendChild(responsiveDesc);
      responsiveContainer.appendChild(responsiveImage);

      container.appendChild(progressiveContainer);
      container.appendChild(errorContainer);
      container.appendChild(responsiveContainer);

      this.$advancedSection.appendChild(sectionTitle);
      this.$advancedSection.appendChild(container);
   }

   async createInteractiveExamples() {
      const sectionTitle = document.createElement('h2');
      sectionTitle.textContent = '🎮 Interactive Demo';
      sectionTitle.classList.add('section-title');

      const demoContainer = document.createElement('div');
      demoContainer.classList.add('interactive-demo');

      // Control panel
      const controlPanel = document.createElement('div');
      controlPanel.classList.add('control-panel');

      const controlTitle = document.createElement('h3');
      controlTitle.textContent = 'Live Configuration';

      // Image sources selector
      const sourceSelect = await slice.build('Select', {
         label: 'Choose Image Source',
         options: [
            { id: 1, label: 'Mountain Landscape', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80' },
            { id: 2, label: 'Ocean Waves', url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80' },
            { id: 3, label: 'Forest Path', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80' },
            { id: 4, label: 'City Skyline', url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80' },
            { id: 5, label: 'Broken URL (Error Demo)', url: 'https://broken-url.com/image.jpg' }
         ],
         visibleProp: 'label',
         multiple: false
      });

      // Quality selector
      const qualitySelect = await slice.build('Select', {
         label: 'Image Quality',
         options: [
            { id: 'low', label: 'Low (Fast Loading)' },
            { id: 'medium', label: 'Medium (Balanced)' },
            { id: 'high', label: 'High (Best Quality)' },
            { id: 'auto', label: 'Auto (Adaptive)' }
         ],
         visibleProp: 'label',
         multiple: false
      });

      // Aspect ratio selector
      const aspectSelect = await slice.build('Select', {
         label: 'Aspect Ratio',
         options: [
            { id: 'auto', label: 'Auto (Original)' },
            { id: '16/9', label: '16:9 (Widescreen)' },
            { id: '4/3', label: '4:3 (Standard)' },
            { id: '1/1', label: '1:1 (Square)' },
            { id: '21/9', label: '21:9 (Ultra-wide)' }
         ],
         visibleProp: 'label',
         multiple: false
      });

      // Lazy loading toggle
      const lazySwitch = await slice.build('Switch', {
         label: 'Lazy Loading',
         checked: true
      });

      // Progressive loading toggle
      const progressiveSwitch = await slice.build('Switch', {
         label: 'Progressive Loading',
         checked: true
      });

      // Update button
      const updateButton = await slice.build('Button', {
         value: '🔄 Update Image',
         customColor: {
            button: 'var(--primary-color)',
            label: 'var(--primary-color-contrast)'
         },
         onClickCallback: () => this.updateDemoImage()
      });

      controlPanel.appendChild(controlTitle);
      controlPanel.appendChild(sourceSelect);
      controlPanel.appendChild(qualitySelect);
      controlPanel.appendChild(aspectSelect);
      controlPanel.appendChild(lazySwitch);
      controlPanel.appendChild(progressiveSwitch);
      controlPanel.appendChild(updateButton);

      // Demo image container
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('demo-image-container');

      this.demoImage = await slice.build('Image', {
         src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
         alt: 'Interactive demo image',
         lazy: true,
         quality: 'high',
         aspectRatio: '16/9',
         progressive: true,
         retryOnError: true,
         fallbackSrc: 'https://picsum.photos/800/450?random=99'
      });

      imageContainer.appendChild(this.demoImage);

      // Store references to controls
      this.sourceSelect = sourceSelect;
      this.qualitySelect = qualitySelect;
      this.aspectSelect = aspectSelect;
      this.lazySwitch = lazySwitch;
      this.progressiveSwitch = progressiveSwitch;

      demoContainer.appendChild(controlPanel);
      demoContainer.appendChild(imageContainer);

      this.$interactiveSection.appendChild(sectionTitle);
      this.$interactiveSection.appendChild(demoContainer);

      // Set default values
      this.sourceSelect.value = [{ id: 1, label: 'Mountain Landscape', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80' }];
      this.qualitySelect.value = [{ id: 'high', label: 'High (Best Quality)' }];
      this.aspectSelect.value = [{ id: '16/9', label: '16:9 (Widescreen)' }];
   }

   updateDemoImage() {
      const selectedSource = this.sourceSelect.value?.[0];
      const selectedQuality = this.qualitySelect.value?.[0];
      const selectedAspect = this.aspectSelect.value?.[0];

      if (selectedSource) {
         this.demoImage.src = selectedSource.url;
      }

      if (selectedQuality) {
         this.demoImage.quality = selectedQuality.id;
      }

      if (selectedAspect && selectedAspect.id !== 'auto') {
         this.demoImage.aspectRatio = selectedAspect.id;
      } else {
         this.demoImage.aspectRatio = null;
      }

      this.demoImage.lazy = this.lazySwitch.checked;
      this.demoImage.progressive = this.progressiveSwitch.checked;

      // Show update notification
      this.showUpdateNotification();
   }

   showUpdateNotification() {
      const notification = document.createElement('div');
      notification.classList.add('update-notification');
      notification.textContent = '✅ Image updated successfully!';
      
      this.$container.appendChild(notification);
      
      setTimeout(() => {
         notification.remove();
      }, 2000);
   }

   createExampleCard(title, description, imageComponent) {
      const card = document.createElement('div');
      card.classList.add('example-card');

      const cardTitle = document.createElement('h4');
      cardTitle.textContent = title;
      cardTitle.classList.add('card-title');

      const cardDesc = document.createElement('p');
      cardDesc.textContent = description;
      cardDesc.classList.add('card-description');

      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('image-wrapper');
      imageWrapper.appendChild(imageComponent);

      card.appendChild(cardTitle);
      card.appendChild(cardDesc);
      card.appendChild(imageWrapper);

      return card;
   }
}

customElements.define('slice-image-demo', ImageDemo);