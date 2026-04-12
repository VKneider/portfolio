import { animate, createTimeline } from '../../../libs/animejs/anime.esm.js';

const MOTION_DEFAULTS = {
  speed: 1,
  easing: 'inOutSine',
  amplitude: 36
};

export default class Animations extends HTMLElement {

  constructor(props) {
    super();
    slice.attachTemplate(this);
    slice.controller.setComponentProps(this, props);
    this.animations = [];
    this.selectedMetric = null;
    this.handleActionClick = this.handleActionButtonClick.bind(this);
    this.handleControlsInput = this.rebuildAnimations.bind(this);
    this.handleMetricClick = this.handleMetricSelection.bind(this);
  }

  init() {
    this.actionButtons = Array.from(this.querySelectorAll('.animations-action-button'));
    this.speedInput = this.querySelector('.animations-speed-input');
    this.easingSelect = this.querySelector('.animations-easing-select');
    this.amplitudeInput = this.querySelector('.animations-amplitude-input');
    this.statusBox = this.querySelector('.animations-status');
    this.interactionBox = this.querySelector('.animations-interaction');
    this.dots = Array.from(this.querySelectorAll('.animations-dot'));
    this.panels = Array.from(this.querySelectorAll('.animations-panel'));
    this.metricButtons = Array.from(this.querySelectorAll('.animations-metric'));
    this.metricFills = Array.from(this.querySelectorAll('.animations-metric-fill'));
    this.orbitShell = this.querySelector('.animations-orbit-shell');
    this.orbitInnerRing = this.querySelector('.animations-orbit-ring-inner');
    this.orbitOuterRing = this.querySelector('.animations-orbit-ring-outer');
    this.orbitHub = this.querySelector('.animations-orbit-hub');
    this.orbitSatellite = this.querySelector('.animations-orbit-satellite');
    this.words = Array.from(this.querySelectorAll('.animations-word'));
    this.beams = Array.from(this.querySelectorAll('.animations-beam'));
    this.badges = Array.from(this.querySelectorAll('.animations-badge'));
    this.spotlightCard = this.querySelector('.animations-spotlight-card');
    this.spotlightBlob = this.querySelector('.animations-spotlight-blob');

    this.actionButtons.forEach((button) => button.addEventListener('click', this.handleActionClick));
    this.speedInput.addEventListener('input', this.handleControlsInput);
    this.easingSelect.addEventListener('change', this.handleControlsInput);
    this.amplitudeInput.addEventListener('input', this.handleControlsInput);
    this.metricButtons.forEach((button) => button.addEventListener('click', this.handleMetricClick));

    this.rebuildAnimations();
  }

  update() {
    this.rebuildAnimations();
  }

  disconnectedCallback() {
    this.actionButtons?.forEach((button) => button.removeEventListener('click', this.handleActionClick));
    this.speedInput?.removeEventListener('input', this.handleControlsInput);
    this.easingSelect?.removeEventListener('change', this.handleControlsInput);
    this.amplitudeInput?.removeEventListener('input', this.handleControlsInput);
    this.metricButtons?.forEach((button) => button.removeEventListener('click', this.handleMetricClick));
    this.clearAnimations();
  }

  getSettings() {
    return {
      speed: Number(this.speedInput?.value || MOTION_DEFAULTS.speed),
      easing: this.easingSelect?.value || MOTION_DEFAULTS.easing,
      amplitude: Number(this.amplitudeInput?.value || MOTION_DEFAULTS.amplitude)
    };
  }

  clearAnimations() {
    this.animations.forEach((animation) => animation.pause());
    this.animations = [];
    this.resetAnimatedElements();
  }

  resetAnimatedElements() {
    [
      ...this.dots,
      ...this.panels,
      ...this.metricButtons,
      ...this.metricFills,
      ...this.words,
      ...this.beams,
      ...this.badges
    ].forEach((element) => {
      element.style.transform = '';
      element.style.opacity = '';
    });

    [
      this.orbitShell,
      this.orbitInnerRing,
      this.orbitOuterRing,
      this.orbitHub,
      this.orbitSatellite,
      this.spotlightCard,
      this.spotlightBlob
    ]
      .filter(Boolean)
      .forEach((element) => {
        element.style.transform = '';
        element.style.opacity = '';
      });
  }

  rebuildAnimations() {
    this.clearAnimations();

    const { speed, easing, amplitude } = this.getSettings();
    const baseDuration = Math.round(1400 / speed);

    const dotsAnimation = animate(this.dots, {
      translateY: [0, -amplitude],
      scale: [1, 1.2],
      opacity: [0.55, 1],
      delay: (_element, index) => index * Math.round(70 / speed),
      duration: baseDuration,
      ease: easing,
      loop: true,
      alternate: true
    });

    const stackTimeline = createTimeline({
      loop: true,
      alternate: true,
      defaults: {
        ease: easing,
        duration: Math.round(1100 / speed)
      }
    });

    this.panels.forEach((panel, index) => {
      stackTimeline.add(
        panel,
        {
          translateX: [0, (index - 1) * Math.round(amplitude * 0.9)],
          translateY: [index * 18, -index * 16],
          rotate: [0, (index - 1) * 8],
          opacity: [0.78, 1]
        },
        index * Math.round(120 / speed)
      );
    });

    const barsAnimation = animate(this.metricFills, {
      scaleX: [0.55, 1],
      opacity: [0.7, 1],
      delay: (_element, index) => index * Math.round(90 / speed),
      duration: Math.round(1200 / speed),
      ease: easing,
      loop: true,
      alternate: true
    });

    const orbitAnimation = animate(this.orbitShell, {
      rotate: '1turn',
      duration: Math.round(2600 / speed),
      ease: 'linear',
      loop: true
    });

    const ringAnimation = animate([this.orbitInnerRing, this.orbitOuterRing], {
      scale: [0.92, 1.06],
      opacity: [0.45, 1],
      duration: Math.round(1700 / speed),
      delay: (_element, index) => index * 180,
      ease: easing,
      loop: true,
      alternate: true
    });

    const hubAnimation = animate(this.orbitHub, {
      scale: [1, 1.18],
      duration: Math.round(900 / speed),
      ease: easing,
      loop: true,
      alternate: true
    });

    const textAnimation = animate(this.words, {
      translateY: [Math.round(amplitude * 0.6), 0],
      opacity: [0.15, 1],
      rotate: [-6, 0],
      delay: (_element, index) => index * Math.round(110 / speed),
      duration: Math.round(1000 / speed),
      ease: easing,
      loop: true,
      alternate: true
    });

    const loaderAnimation = animate(this.beams, {
      scaleY: [0.35, 1],
      opacity: [0.4, 1],
      delay: (_element, index) => index * Math.round(80 / speed),
      duration: Math.round(800 / speed),
      ease: easing,
      loop: true,
      alternate: true
    });

    const badgeAnimation = animate(this.badges, {
      translateY: [0, Math.round(-amplitude * 0.5)],
      translateX: (_element, index) => (index % 2 === 0 ? Math.round(amplitude * 0.22) : Math.round(-amplitude * 0.22)),
      rotate: (_element, index) => (index % 2 === 0 ? 6 : -6),
      scale: [1, 1.06],
      delay: (_element, index) => index * Math.round(90 / speed),
      duration: Math.round(1350 / speed),
      ease: easing,
      loop: true,
      alternate: true
    });

    const spotlightAnimation = animate(this.spotlightBlob, {
      translateX: [Math.round(-amplitude * 0.8), Math.round(amplitude * 0.8)],
      translateY: [Math.round(-amplitude * 0.25), Math.round(amplitude * 0.35)],
      scale: [0.82, 1.16],
      duration: Math.round(1800 / speed),
      ease: easing,
      loop: true,
      alternate: true
    });

    const spotlightCardAnimation = animate(this.spotlightCard, {
      rotate: [-1.5, 1.5],
      translateY: [0, -10],
      duration: Math.round(2100 / speed),
      ease: easing,
      loop: true,
      alternate: true
    });

    this.animations = [
      dotsAnimation,
      stackTimeline,
      barsAnimation,
      orbitAnimation,
      ringAnimation,
      hubAnimation,
      textAnimation,
      loaderAnimation,
      badgeAnimation,
      spotlightAnimation,
      spotlightCardAnimation
    ];

    this.updateMetricSelection();
    this.updatePanelsDepth();
    this.updateStatus();
    this.updateInteraction();
  }

  updatePanelsDepth() {
    this.panels.forEach((panel, index) => {
      panel.style.zIndex = String(this.panels.length - index);
    });
  }

  handleActionButtonClick(event) {
    const action = event.currentTarget.dataset.action;

    if (action === 'play') {
      this.animations.forEach((animation) => animation.play());
    }

    if (action === 'pause') {
      this.animations.forEach((animation) => animation.pause());
    }

    if (action === 'restart') {
      this.animations.forEach((animation) => animation.restart());
    }

    this.updateStatus(action);
  }

  handleMetricSelection(event) {
    this.selectedMetric = event.currentTarget.dataset.metric || null;
    this.updateMetricSelection();
    animate(event.currentTarget, {
      scale: [1, 1.04],
      duration: 320,
      ease: 'outExpo',
      alternate: true,
      loop: 1
    });
    this.updateInteraction();
  }

  updateMetricSelection() {
    this.metricButtons.forEach((button) => {
      button.classList.toggle('is-selected', button.dataset.metric === this.selectedMetric);
    });
  }

  updateStatus(action = 'configured') {
    if (!this.statusBox) {
      return;
    }

    const { speed, easing, amplitude } = this.getSettings();
    this.statusBox.textContent = `Anime.js status: ${action}. Speed ${speed.toFixed(1)}x, easing ${easing}, amplitude ${amplitude}px, demos ${this.animations.length}.`;
  }

  updateInteraction() {
    if (!this.interactionBox) {
      return;
    }

    if (!this.selectedMetric) {
      this.interactionBox.textContent = 'Interaction ready. Adjust the global controls or click a metric bar to focus a specific animation target.';
      return;
    }

    this.interactionBox.textContent = `Focused metric: ${this.selectedMetric}. The pulsing bars remain live while the global controls reshape every showcase.`;
  }
}

customElements.define("slice-animations", Animations);
