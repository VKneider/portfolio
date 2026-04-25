// Singleton instance
let instance = null;

import { animate } from '../../../libs/animejs/anime.esm.js';

class AnimationsProvider {
  constructor(props) {
    if (instance) return instance;
    this.props = props || {};
    instance = this;
  }

  // Fade in animation
  fadeIn(element, options = {}) {
    return animate(element, {
      opacity: [0, 1],
      duration: 700,
      easing: 'outQuad',
      ...options
    });
  }

  // Fade out animation
  fadeOut(element, options = {}) {
    return animate(element, {
      opacity: [1, 0],
      duration: 700,
      easing: 'inQuad',
      ...options
    });
  }

  // Slide in from left
  slideInLeft(element, options = {}) {
    return animate(element, {
      translateX: ['-40px', '0px'],
      opacity: [0, 1],
      duration: 700,
      easing: 'outCubic',
      ...options
    });
  }

  // Generic animate method
  animateElement(element, animeOptions) {
    return animate(element, animeOptions);
  }
}

const AnimationsProviderSingleton = new AnimationsProvider();
export default AnimationsProviderSingleton;
