/**
 * Slice.js Bundle
 * Type: route
 * Generated: 2026-01-24T05:19:36.858Z
 * Strategy: hybrid
 * Components: 1
 * Total Size: 5.2 KB
 */

export const SLICE_BUNDLE = {
  metadata: {
  "version": "2.0.0",
  "type": "route",
  "route": "misc",
  "generated": "2026-01-24T05:19:36.858Z",
  "totalSize": 5289,
  "componentCount": 1,
  "strategy": "hybrid"
},

  components: {
  "NotFound": {
    "name": "NotFound",
    "category": "Visual",
    "categoryType": "Visual",
    "js": "class NotFound extends HTMLElement {\n\n   static props = {\n      // No props needed for this component\n   };\n\n   constructor(props) {\n      super();\n      slice.attachTemplate(this);\n\n      slice.controller.setComponentProps(this, props);\n   }\n\n   init() {\n      //change title of the page\n      document.title = '404 - Not Found';\n   }\n}\n\nwindow.NotFound = NotFound;\ncustomElements.define('slice-notfound', NotFound);\n\nreturn NotFound;",
    "externalDependencies": {},
    "componentDependencies": [],
    "html": "<div class=\"container\">\n    <figure>\n        <div class=\"sad-mac\"></div>\n        <figcaption>\n            <span class=\"sr-text\">Error 404: Not Found</span>\n            <span class=\"e\"></span>\n            <span class=\"r\"></span>\n            <span class=\"r\"></span>\n            <span class=\"o\"></span>\n            <span class=\"r\"></span>\n            <span class=\"_4\"></span>\n            <span class=\"_0\"></span>\n            <span class=\"_4\"></span>\n            <span class=\"n\"></span>\n            <span class=\"o\"></span>\n            <span class=\"t\"></span>\n            <span class=\"f\"></span>\n            <span class=\"o\"></span>\n            <span class=\"u\"></span>\n            <span class=\"n\"></span>\n            <span class=\"d\"></span>\n        </figcaption>\n    </figure>\n</div>",
    "css": "* {\n\tborder: 0;\n\tbox-sizing: border-box;\n\tmargin: 0;\n\tpadding: 0;\n}\n#app, body {\n\tbackground: var(--primary-color);\n\tdisplay: flex;\n\theight: 100vh;\n}\n/* I. Containers */\nfigure {\n\tfont-size: 6px;\n\tmargin: auto;\n\tpadding: 4em 0;\n\twidth: 64em;\n}\nfigcaption {\n\tcolor: var(--font-color);\n\tdisplay: flex;\n\talign-content: space-between;\n\tflex-wrap: wrap;\n\theight: 17em;\n}\nfigcaption span:before, .sad-mac:before {\n\tcontent: \"\";\n\tdisplay: block;\n\twidth: 1em;\n\theight: 1em;\n\ttransform: translate(-1em,-1em);\n} \nfigcaption span {\n\tdisplay: inline-block;\n\tmargin: 0 2em;\n\twidth: 4em;\n\theight: 6em;\n}\n.sr-text {\n\toverflow: hidden;\n\tposition: absolute;\n\twidth: 0;\n\theight: 0;\n}\n/* II. Sprites */\n/* 1. Sad Mac */\n.sad-mac {\n\tbackground: #fff;\n\tmargin: 0 auto 7em auto;\n\twidth: 23em;\n\theight: 30em;\n}\n.sad-mac:before {\n\tbox-shadow: 1em 1em, 23em 1em, 4em 3em, 5em 3em, 6em 3em, 7em 3em, 8em 3em, 9em 3em, 10em 3em, 11em 3em, 12em 3em, 13em 3em, 14em 3em, 15em 3em, 16em 3em, 17em 3em, 18em 3em, 19em 3em, 20em 3em, 3em 4em, 21em 4em, 3em 5em, 21em 5em, 3em 6em, 7em 6em, 9em 6em, 15em 6em, 17em 6em, 21em 6em, 3em 7em, 8em 7em, 16em 7em, 21em 7em, 3em 8em, 7em 8em, 9em 8em, 15em 8em, 17em 8em, 21em 8em, 3em 9em, 21em 9em, 3em 10em, 10em 10em, 13em 10em, 21em 10em, 3em 11em, 11em 11em, 12em 11em, 21em 11em, 3em 12em, 21em 12em, 3em 13em, 10em 13em, 11em 13em, 12em 13em, 13em 13em, 14em 13em, 21em 13em, 3em 14em, 9em 14em, 15em 14em, 16em 14em, 21em 14em, 3em 15em, 17em 15em, 21em 15em, 3em 16em, 21em 16em, 4em 17em, 5em 17em, 6em 17em, 7em 17em, 8em 17em, 9em 17em, 10em 17em, 11em 17em, 12em 17em, 13em 17em, 14em 17em, 15em 17em, 16em 17em, 17em 17em, 18em 17em, 19em 17em, 20em 17em, 3em 22em, 4em 22em, 5em 22em, 14em 22em, 15em 22em, 16em 22em, 17em 22em, 18em 22em, 19em 22em, 20em 22em, 1em 27em, 2em 27em, 3em 27em, 4em 27em, 5em 27em, 6em 27em, 7em 27em, 8em 27em, 9em 27em, 10em 27em, 11em 27em, 12em 27em, 13em 27em, 14em 27em, 15em 27em, 16em 27em, 17em 27em, 18em 27em, 19em 27em, 20em 27em, 21em 27em, 22em 27em, 23em 27em, 1em 28em, 23em 28em, 1em 29em, 23em 29em, 1em 30em, 23em 30em;\n}\n/* 2. Letters */\n._0:before {\n\tbox-shadow: 2em 1em, 3em 1em, 1em 2em, 1em 3em, 1em 4em, 1em 5em, 4em 2em, 4em 3em, 4em 4em, 4em 5em, 2em 4em, 3em 3em, 2em 6em, 3em 6em;\n}\n._4:before {\n\tbox-shadow: 1em 1em, 1em 2em, 1em 3em, 1em 4em, 4em 1em, 4em 2em, 4em 3em, 4em 4em, 2em 4em, 3em 4em, 4em 5em, 4em 6em;\n}\n.d:before {\n\tbox-shadow: 1em 1em, 2em 1em, 3em 1em, 1em 2em, 4em 2em, 1em 3em, 4em 3em, 1em 4em, 4em 4em, 1em 5em, 4em 5em, 1em 6em, 2em 6em, 3em 6em;\n}\n.e:before {\n\tbox-shadow: 1em 1em, 2em 1em, 3em 1em, 4em 1em, 1em 2em, 1em 3em, 2em 3em, 3em 3em, 1em 4em, 1em 5em, 1em 6em, 2em 6em, 3em 6em, 4em 6em;\n}\n.f:before {\n\tbox-shadow: 1em 1em, 2em 1em, 3em 1em, 4em 1em, 1em 2em, 1em 3em, 2em 3em, 3em 3em, 1em 4em, 1em 5em, 1em 6em;\n}\n.n:before {\n\tbox-shadow: 1em 1em, 1em 2em, 1em 3em, 1em 4em, 1em 5em, 1em 6em, 4em 1em, 4em 2em, 4em 3em, 4em 4em, 4em 5em, 4em 6em, 2em 3em, 3em 4em;\n}\n.o:before {\n\tbox-shadow: 2em 1em, 3em 1em, 1em 2em, 1em 3em, 1em 4em, 1em 5em, 4em 2em, 4em 3em, 4em 4em, 4em 5em, 2em 6em, 3em 6em;\n}\n.r:before {\n\tbox-shadow: 1em 1em, 2em 1em, 3em 1em, 4em 2em, 1em 2em, 1em 3em, 1em 4em, 2em 3em, 3em 3em, 1em 5em, 1em 6em, 4em 4em, 4em 5em, 4em 6em;\n}\n.t:before {\n\tbox-shadow: 1em 1em, 2em 1em, 3em 1em, 2em 2em, 2em 3em, 2em 4em, 2em 5em, 2em 6em;\n}\n.u:before {\n\tbox-shadow: 1em 1em, 1em 2em, 1em 3em, 1em 4em, 1em 5em, 4em 1em, 4em 2em, 4em 3em, 4em 4em, 4em 5em, 2em 6em, 3em 6em;\n}\n/* III. Responsiveness */\n/* This cannot be smoothly done using viewport units; sprite pixels will look divided when font size is a floating point. */\n@media screen and (min-width: 720px) {\n\tfigure {\n\t    font-size: 7px;\n\t}\n}\n@media screen and (min-width: 1440px) {\n\tfigure {\n\t    font-size: 8px;\n\t}\n}\nhtml, body {\n    height: 100%;\n    margin: 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n  }\n  \n  .container {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    height: 100%;\n    width: 100%;\n  }\n  \n  figure {\n    text-align: center;\n  }",
    "size": 5289
  }
}
};

// Auto-registration of components
if (window.slice && window.slice.controller) {
  slice.controller.registerBundle(SLICE_BUNDLE);
}
