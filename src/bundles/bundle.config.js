/**
 * Slice.js Bundle Configuration
 * Generated: 2026-02-04T03:34:59.864Z
 * Strategy: hybrid
 */

// Direct bundle configuration (no fetch required)
export const SLICE_BUNDLE_CONFIG = {
  "version": "2.0.0",
  "strategy": "hybrid",
  "generated": "2026-02-04T03:34:59.862Z",
  "stats": {
    "totalComponents": 50,
    "totalRoutes": 7,
    "sharedComponents": 1,
    "sharedPercentage": "2.0",
    "totalSize": 2053569,
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
      "multiroute-Portfolio": {
        "path": [
          "/",
          "/experience",
          "/education",
          "/slice-js",
          "/projects"
        ],
        "file": "slice-bundle.multiroute-portfolio.js",
        "size": 1808353,
        "components": [
          "Portfolio",
          "ThemeSelector",
          "Navbar",
          "Link",
          "DropDown",
          "Button",
          "Icon",
          "MultiRoute",
          "AboutSection",
          "Grid",
          "Card",
          "TechExpertise",
          "BadgeCarousel",
          "ImageCarrousel",
          "RandomFacts",
          "ExperienceSection",
          "Timeline",
          "ExperienceCard",
          "Tabs",
          "EducationSection",
          "StudyCard",
          "CertificateCard",
          "WhatIsSlice",
          "ProjectsSection",
          "ProjectViewer",
          "BuiltWithBadge"
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
