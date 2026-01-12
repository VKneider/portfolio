export default class ProjectViewer extends HTMLElement {
   constructor(props) {
      super();
      slice.attachTemplate(this);
      
      this.$thumbnails = this.querySelector('.thumbnails-list');
      this.$previewContainer = this.querySelector('.preview-container');
      this.$previewImage = this.querySelector('.preview-image');
      this.$projectTitle = this.querySelector('.project-title');
      this.$projectDesc = this.querySelector('.project-description');
      this.$techList = this.querySelector('.tech-list');
      this.$actions = this.querySelector('.project-actions');
      this.$emptyState = this.querySelector('.empty-state');
      this.$detailsPanel = this.querySelector('.details-panel');
      this.$previewOverlay = this.querySelector('.preview-overlay');
      this.$statusBadge = this.querySelector('.status-badge');

      // Modal Elements
      this.$modal = this.querySelector('.image-modal');
      this.$modalImage = this.querySelector('#expanded-image');
      this.$closeModal = this.querySelector('.close-modal');
      this.$prevBtn = this.querySelector('.modal-nav-btn.prev-btn');
      this.$nextBtn = this.querySelector('.modal-nav-btn.next-btn');
      
      this.currentProjectImages = [];
      this.currentImageIndex = 0;

      if (this.$modal) {
          this.$closeModal.addEventListener('click', () => this.closeModal());
          
          this.$prevBtn.addEventListener('click', (e) => {
              e.stopPropagation();
              this.navigateModalImage(-1);
          });
          
          this.$nextBtn.addEventListener('click', (e) => {
              e.stopPropagation();
              this.navigateModalImage(1);
          });

          this.$modal.addEventListener('click', (e) => {
              if (e.target === this.$modal) this.closeModal();
          });
          // Close on Escape key
          document.addEventListener('keydown', (e) => {
              if (!this.$modal.classList.contains('show')) return;
              
              if (e.key === 'Escape') {
                  this.closeModal();
              } else if (e.key === 'ArrowLeft') {
                  this.navigateModalImage(-1);
              } else if (e.key === 'ArrowRight') {
                  this.navigateModalImage(1);
              }
          });
      }

      this.projects = [];
      this.activeProject = null;

      slice.controller.setComponentProps(this, props);
   }

   set projects(value) {
      this._projects = value;
      this.renderThumbnails();
      if (this._projects && this._projects.length > 0) {
         this.setActiveProject(this._projects[0]);
      }
   }

   get projects() {
      return this._projects || [];
   }

   async init() {
      // styles handled in CSS
   }

   renderThumbnails() {
      if (!this.$thumbnails) return;
      this.$thumbnails.innerHTML = '';
      
      this.projects.forEach((project, index) => {
         const btn = document.createElement('button');
         btn.className = 'thumbnail-btn';
         btn.setAttribute('aria-label', `View ${project.title}`);
         if (index === 0) btn.classList.add('active');
         
         btn.innerHTML = `
            <div class="thumbnail-wrapper">
                <img src="${project.image}" alt="" loading="lazy"/>
            </div>
            <span class="thumbnail-title">${project.title}</span>
         `;
         
         btn.addEventListener('click', () => {
             this.setActiveProject(project);
             
             // Update active class
             this.querySelectorAll('.thumbnail-btn').forEach(b => b.classList.remove('active'));
             btn.classList.add('active');
         });
         
         this.$thumbnails.appendChild(btn);
      });
   }

   setActiveProject(project) {
       this.activeProject = project;
       
       // Animate content change
       this.$previewContainer.classList.add('fading');
       this.$detailsPanel.classList.add('fading');
       
       setTimeout(() => {
           try {
               // Update Images logic
               this.$previewContainer.innerHTML = '<div class="preview-overlay"></div>';
               
               // Ensure images is an array and filter out nulls
               let images = project.images && Array.isArray(project.images) ? project.images : [];
               if (images.length === 0 && project.image) {
                   images = [project.image];
               }

               if(images.length > 0) {
                   const wrapper = document.createElement('div');
                   wrapper.className = 'preview-scroll-wrapper';
                   
                   images.forEach((imgSrc, idx) => {
                       if (!imgSrc) return;
                       const img = document.createElement('img');
                       img.className = 'preview-image';
                       img.src = imgSrc;
                       img.alt = `${project.title} - View ${idx + 1}`;
                       img.loading = "eager"; 
                       
                       img.onclick = () => this.openModal(images, idx);

                       // Error handling for image
                       img.onerror = () => { img.style.display = 'none'; };
                       wrapper.appendChild(img);
                   });
                   
                   this.$previewContainer.appendChild(wrapper);
               }

               // Update Details
               this.$projectTitle.textContent = project.title;
               this.$projectDesc.textContent = project.description;
               
               // Status Badge
               if (project.status) {
                    this.$statusBadge.className = `status-badge status-${project.status.toLowerCase().replace(/\s/g, '-')}`;
                    this.$statusBadge.textContent = project.status;
                    this.$statusBadge.style.display = 'inline-block';
               } else {
                    this.$statusBadge.style.display = 'none';
               }
               
               // Tech Stack
               this.$techList.innerHTML = '';
               if (project.technologies) {
                   project.technologies.forEach(tech => {
                       const tag = document.createElement('span');
                       tag.className = 'tech-tag';
                       tag.textContent = tech;
                       this.$techList.appendChild(tag);
                   });
               }
               
               // Links
               this.$actions.innerHTML = '';
               this.createActionButtons(project);

           } catch (error) {
               console.error("Error updating project viewer:", error);
           } finally {
               // Remove animation classes ALWAYS
               this.$previewContainer.classList.remove('fading');
               this.$detailsPanel.classList.remove('fading');
           }
           
       }, 200);
   }

   openModal(images, index) {
       if (!this.$modal) return;
       
       this.currentProjectImages = images || [];
       this.currentImageIndex = index || 0;
       
       this.updateModalImage();
       
       this.$modal.style.display = 'flex';
       // Force reflow
       void this.$modal.offsetWidth;
       this.$modal.classList.add('show');
   }

   updateModalImage() {
       if (!this.currentProjectImages || this.currentProjectImages.length === 0) return;
       
       const src = this.currentProjectImages[this.currentImageIndex];
       this.$modalImage.src = src;
       
       // Handle buttons visibility
       if (this.currentProjectImages.length <= 1) {
           this.$prevBtn.style.display = 'none';
           this.$nextBtn.style.display = 'none';
       } else {
           this.$prevBtn.style.display = 'flex';
           this.$nextBtn.style.display = 'flex';
       }
   }

   navigateModalImage(direction) {
       if (!this.currentProjectImages || this.currentProjectImages.length <= 1) return;
       
       let newIndex = this.currentImageIndex + direction;
       
       // Loop
       if (newIndex < 0) {
           newIndex = this.currentProjectImages.length - 1;
       } else if (newIndex >= this.currentProjectImages.length) {
           newIndex = 0;
       }
       
       this.currentImageIndex = newIndex;
       
       // Add a small fade effect could be nice, but for now just switch
       this.updateModalImage();
   }

   closeModal() {
       if (!this.$modal) return;
       this.$modal.classList.remove('show');
       setTimeout(() => {
           this.$modal.style.display = 'none';
           this.$modalImage.src = '';
       }, 300);
   }
   
   async createActionButtons(project) {
      if (project.githubUrl) {
         const githubBtn = await slice.build('Button', {
            value: 'GitHub',
            customColor: { button: 'var(--secondary-background-color)', label: 'var(--font-primary-color)' },
            onClickCallback: () => window.open(project.githubUrl, '_blank')
         });
         githubBtn.style.border = '1px solid var(--disabled-color)';
         this.$actions.appendChild(githubBtn);
      }

      if (project.liveUrl) {
         const liveBtn = await slice.build('Button', {
            value: 'Live Demo',
            customColor: { button: 'var(--primary-color)', label: 'var(--primary-color-contrast)' },
            onClickCallback: () => window.open(project.liveUrl, '_blank')
         });
         this.$actions.appendChild(liveBtn);
      }
   }
}

customElements.define("slice-project-viewer", ProjectViewer);
