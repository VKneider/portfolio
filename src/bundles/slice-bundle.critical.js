/**
 * Slice.js Bundle
 * Type: critical
 * Generated: 2026-01-24T04:41:17.222Z
 * Strategy: hybrid
 * Components: 1
 * Total Size: 1.1 KB
 */

export const SLICE_BUNDLE = {
  metadata: {
  "version": "2.0.0",
  "type": "critical",
  "route": null,
  "generated": "2026-01-24T04:41:17.222Z",
  "totalSize": 1112,
  "componentCount": 1,
  "strategy": "hybrid"
},

  components: {
  "Layout": {
    "name": "Layout",
    "category": "Visual",
    "categoryType": "Visual",
    "js": "class Layout extends HTMLElement {\n\n   static props = {\n      layout: { \n         type: 'object', \n         default: null, \n         required: false \n      },\n      view: { \n         type: 'object', \n         default: null, \n         required: false \n      }\n   };\n\n   constructor(props) {\n      super();\n      slice.attachTemplate(this);\n\n      slice.controller.setComponentProps(this, props);\n      this.currentView = null;\n   }\n\n   async init() {\n      if (this.layout) {\n         await this.onLayOut(this.layout);\n      }\n      if (this.view) {\n         await this.showing(this.view);\n      }\n   }\n\n   get layout() {\n      return this._layout;\n   }\n\n   set layout(value) {\n      this._layout = value;\n   }\n\n   get view() {\n      return this._view;\n   }\n\n   set view(value) {\n      this._view = value;\n   }\n\n   async showing(view) {\n      if (this.currentView) {\n         this.removeChild(this.currentView);\n      }\n      this.appendChild(view);\n      this.currentView = view;\n   }\n\n   async onLayOut(view) {\n      this.appendChild(view);\n   }\n}\n\nwindow.Layout = Layout;\ncustomElements.define('slice-layout', Layout);\n\nreturn Layout;",
    "externalDependencies": {},
    "componentDependencies": [],
    "html": "",
    "css": "",
    "size": 1112
  }
}
};

// Auto-registration of components
if (window.slice && window.slice.controller) {
  slice.controller.registerBundle(SLICE_BUNDLE);
}
