/**
 * Slice.js Bundle Configuration
 * Generated: 2025-12-16T04:30:57.784Z
 * Strategy: hybrid
 */

// Direct bundle configuration (no fetch required)
export const SLICE_BUNDLE_CONFIG = {
  "version": "2.0.0",
  "strategy": "hybrid",
  "generated": "2025-12-16T04:30:57.781Z",
  "stats": {
    "totalComponents": 44,
    "totalRoutes": 6,
    "sharedComponents": 1,
    "sharedPercentage": "2.3",
    "totalSize": 1945632,
    "criticalSize": 1174
  },
  "bundles": {
    "critical": {
      "file": "slice-bundle.critical.js",
      "size": 1174,
      "components": [
        "Layout"
      ]
    },
    "routes": {
      "home": {
        "path": [
          "/"
        ],
        "file": "slice-bundle.home.js",
        "size": 1508097,
        "components": [
          "Portfolio",
          "ThemeSelector",
          "Navbar",
          "Link",
          "DropDown",
          "Button",
          "Icon",
          "MultiRoute"
        ],
        "dependencies": [
          "critical"
        ]
      },
      "general": {
        "path": [
          "/experience",
          "/education",
          "/projects"
        ],
        "file": "slice-bundle.general.js",
        "size": 1508097,
        "components": [
          "Portfolio",
          "ThemeSelector",
          "Navbar",
          "Link",
          "DropDown",
          "Button",
          "Icon",
          "MultiRoute"
        ],
        "dependencies": [
          "critical"
        ]
      },
      "configuration": {
        "path": [
          "/slice-js"
        ],
        "file": "slice-bundle.configuration.js",
        "size": 1508097,
        "components": [
          "Portfolio",
          "ThemeSelector",
          "Navbar",
          "Link",
          "DropDown",
          "Button",
          "Icon",
          "MultiRoute"
        ],
        "dependencies": [
          "critical"
        ]
      },
      "misc": {
        "path": [
          "/404"
        ],
        "file": "slice-bundle.misc.js",
        "size": 5448,
        "components": [
          "NotFound"
        ],
        "dependencies": [
          "critical"
        ]
      }
    }
  }
};

// Auto-initialization if slice is available
if (typeof window !== 'undefined' && window.slice && window.slice.controller) {
  window.slice.controller.bundleConfig = SLICE_BUNDLE_CONFIG;

  // Load critical bundle automatically
  if (SLICE_BUNDLE_CONFIG.bundles.critical && !window.slice.controller.criticalBundleLoaded) {
    import('./slice-bundle.critical.js').catch(err =>
      console.warn('Failed to load critical bundle:', err)
    );
    window.slice.controller.criticalBundleLoaded = true;
  }
}
