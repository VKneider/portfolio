export default class Grid extends HTMLElement {

   static props = {
      columns: { 
         type: 'number', 
         default: 1, 
         required: false 
      },
      rows: { 
         type: 'number', 
         default: 1, 
         required: false 
      },
      items: { 
         type: 'array', 
         default: [], 
         required: false 
      },
      centerItems: {
         type: 'boolean',
         default: true,
         required: false
      }
   };

   constructor(props) {
      super();
      slice.attachTemplate(this);

      this.$grid = this.querySelector('.grid-container');

      slice.controller.setComponentProps(this, props);
   }

   async init() {
      // Static props ensure columns and rows have default values
      // No need for manual validation
   }

   set columns(value) {
      this._columns = value;
      this.$grid.style.gridTemplateColumns = `repeat(${value}, 1fr)`;
   }

   get columns() {
      return this._columns;
   }

   set rows(value) {
      this.$grid.style.gridTemplateRows = `repeat(${value}, 1fr)`;
      this._rows = value;
   }

   get rows() {
      return this._rows;
   }

   set items(values) {
      this.setItems(values);
      this._items = values;
   }

   get items() {
      return this._items;
   }

   set centerItems(value) {
      this._centerItems = value;
      this.updateGridItemStyles();
   }

   get centerItems() {
      return this._centerItems;
   }

   async setItem(item) {
      item.classList.add('grid-item');
      this.updateItemStyles(item);
      this.$grid.appendChild(item);
   }

   updateItemStyles(item) {
      if (this._centerItems) {
         item.style.display = 'flex';
         item.style.justifyContent = 'center';
         item.style.alignItems = 'center';
         item.style.width = '100%';
         item.style.height = '100%';
      } else {
         item.style.display = '';
         item.style.justifyContent = '';
         item.style.alignItems = '';
         item.style.width = '';
         item.style.height = '';
      }
   }

   updateGridItemStyles() {
      const gridItems = this.$grid.querySelectorAll('.grid-item');
      gridItems.forEach(item => this.updateItemStyles(item));
   }

   async setItems(items) {
      for (let i = 0; i < items.length; i++) {
         await this.setItem(items[i]);
      }
   }
}

customElements.define('slice-grid', Grid);
