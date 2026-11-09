import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const DEFAULT_SLICE_MODEL = '/images/models/slicejs-logo.glb';
const DEFAULT_BRAND_MODEL = '/images/models/vkneider-logo.glb';
const BASE_ROTATION = { x: -0.04, y: 0.12 };
const MAX_PIXEL_RATIO = 2;
const SPIN_SPEED = 0.9;

const lerp = (from, to, amount) => from + (to - from) * amount;
const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3);

export default class LogoStage extends HTMLElement {
  static props = {
    labelKey: { type: 'string', default: 'what.logoAria' },
    sliceSrc: { type: 'string', default: DEFAULT_SLICE_MODEL },
    brandSrc: { type: 'string', default: DEFAULT_BRAND_MODEL },
    interactive: { type: 'boolean', default: true }
  };

  constructor(props) {
    super();
    slice.attachTemplate(this);

    this.$stage = this.querySelector('.logostage');
    this.$canvas = this.querySelector('.logostage__canvas');

    this._disposed = false;
    this._ready = false;
    this._loading = false;
    this._loadStarted = false;
    this._inView = false;
    this._raf = 0;
    this._lastTick = 0;
    this._spin = 0;
    this._spinPausedUntil = 0;
    this._sliceHover = false;
    this._sliceDragging = false;
    this._dragStartX = 0;
    this._dragStartSpin = 0;
    this._dragDistance = 0;
    this._suppressClick = false;
    this._brandHover = false;
    this._brandHoverAmount = 0;
    this._entryStart = 0;
    this._pointerTarget = { x: BASE_ROTATION.x, y: BASE_ROTATION.y };
    this._rotation = { x: BASE_ROTATION.x, y: BASE_ROTATION.y };
    this._reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

    slice.controller.setComponentProps(this, props);
    this._setState('loading');
    this._setLabel();
  }

  async init() {
    this._updateLabel = () => this._setLabel();
    slice.translator.watch(this, this._updateLabel);

    this._themeObserver = new MutationObserver(() => {
      this._applyTheme();
      this._render();
    });
    this._themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-slice-theme']
    });

    this._resizeObserver = new ResizeObserver(() => {
      this._resize();
      this._render();
    });
    this._resizeObserver.observe(this.$stage);

    this._bindPointer();

    this._onVisibility = () => {
      if (document.hidden) {
        if (this._raf) cancelAnimationFrame(this._raf);
        this._raf = 0;
      } else if (this._inView) {
        this._startLoop();
      }
    };
    document.addEventListener('visibilitychange', this._onVisibility);

    if ('IntersectionObserver' in window) {
      this._intersectionObserver = new IntersectionObserver((entries) => {
        this._inView = entries.some((entry) => entry.isIntersecting);

        if (this._inView && !this._loadStarted) {
          this._loadStarted = true;
          this._load();
        }

        if (this._inView) {
          this._startLoop();
        } else if (this._raf) {
          cancelAnimationFrame(this._raf);
          this._raf = 0;
        }
      }, { rootMargin: '180px' });
      this._intersectionObserver.observe(this);
    } else {
      this._inView = true;
      this._loadStarted = true;
      this._load();
    }
  }

  beforeDestroy() {
    this._disposed = true;
    if (this._raf) cancelAnimationFrame(this._raf);
    this._intersectionObserver?.disconnect();
    this._resizeObserver?.disconnect();
    this._themeObserver?.disconnect();
    document.removeEventListener('visibilitychange', this._onVisibility);
    this._pointerCleanup?.();
    this._disposeObject(this._group);
    this._renderer?.dispose();
    this._renderer?.forceContextLoss?.();
    this._renderer = null;
    this._scene = null;
    this._camera = null;
    this._group = null;
  }

  get labelKey() {
    return this._labelKey;
  }

  set labelKey(value) {
    this._labelKey = value || 'what.logoAria';
    this._setLabel();
  }

  get sliceSrc() {
    return this._sliceSrc;
  }

  set sliceSrc(value) {
    this._sliceSrc = value || DEFAULT_SLICE_MODEL;
  }

  get brandSrc() {
    return this._brandSrc;
  }

  set brandSrc(value) {
    this._brandSrc = value || DEFAULT_BRAND_MODEL;
  }

  get interactive() {
    return this._interactive;
  }

  set interactive(value) {
    this._interactive = value !== false;
  }

  _setLabel() {
    if (!this.$stage) return;
    const label = this._labelKey ? slice.t(this._labelKey) : '';
    this.$stage.setAttribute('aria-label', label || 'Slice.js and vkneider.dev — 3D logos');
  }

  _setState(state) {
    this.dataset.state = state;
  }

  _load() {
    if (this._loading || this._ready || this._disposed) return;
    this._loading = true;

    try {
      this._setupScene();
    } catch (error) {
      console.warn('LogoStage: no se pudo inicializar WebGL.', error);
      this._setState('error');
      this._loading = false;
      return;
    }

    const loader = new GLTFLoader();

    Promise.all([
      loader.loadAsync(this.sliceSrc),
      loader.loadAsync(this.brandSrc)
    ]).then(([sliceModel, brandModel]) => {
      if (this._disposed) {
        this._disposeObject(sliceModel.scene);
        this._disposeObject(brandModel.scene);
        return;
      }

      this._buildStage(sliceModel.scene, brandModel.scene);
      this._ready = true;
      this._setState('ready');
      this._applyTheme();
      this._resize();

      if (!this._reduceMotion) this._startEntrance();
      this._render();
    }).catch((error) => {
      console.warn('LogoStage: no se pudieron cargar los modelos 3D.', error);
      this._setState('error');
    }).finally(() => {
      this._loading = false;
    });
  }

  _setupScene() {
    this._renderer = new THREE.WebGLRenderer({
      canvas: this.$canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this._renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO));
    this._renderer.outputColorSpace = THREE.SRGBColorSpace;
    this._renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this._renderer.toneMappingExposure = 1.05;
    this._renderer.setClearAlpha(0);

    this._scene = new THREE.Scene();
    this._camera = new THREE.PerspectiveCamera(30, 1, 0.01, 20);
    this._camera.position.set(0, 0, 1.8);
    this._raycaster = new THREE.Raycaster();
    this._pointerNdc = new THREE.Vector2();

    this._group = new THREE.Group();
    this._group.rotation.set(BASE_ROTATION.x, BASE_ROTATION.y, 0);
    this._scene.add(this._group);

    this._scene.add(new THREE.AmbientLight(0xffffff, 1.15));

    this._keyLight = new THREE.DirectionalLight(0xffffff, 2.1);
    this._keyLight.position.set(-2.4, 3.2, 4);
    this._scene.add(this._keyLight);

    this._fillLight = new THREE.DirectionalLight(0xb9c5ff, 1.05);
    this._fillLight.position.set(2.8, -1.2, 2.4);
    this._scene.add(this._fillLight);

    const rimLight = new THREE.DirectionalLight(0xffb45c, 0.85);
    rimLight.position.set(0.4, 1.6, -2.4);
    this._scene.add(rimLight);
  }

  _buildStage(sliceScene, brandScene) {
    this._sliceBodyMaterials = new Set();
    this._sliceAccentMaterials = new Set();
    this._sliceModel = sliceScene;

    const sliceBox = new THREE.Box3().setFromObject(sliceScene);
    const sliceSize = sliceBox.getSize(new THREE.Vector3());
    const sliceCenter = sliceBox.getCenter(new THREE.Vector3());
    sliceScene.position.sub(sliceCenter);

    const sliceScale = 0.56 / Math.max(sliceSize.x, sliceSize.y);
    sliceScene.scale.setScalar(sliceScale);
    sliceScene.position.set(-0.16, 0.02, 0.01);

    sliceScene.traverse((node) => {
      if (!node.isMesh) return;

      // El wordmark 3D queda detrás del slice y se recorta; el nombre ya vive
      // en el H1, así que ocultamos las letras y conservamos el slice + el dot.
      if (node.name.startsWith('letter-')) {
        node.visible = false;
        return;
      }

      // El modelo viene monocromo. Lo separamos en cuerpo + letras para poder
      // darle un segundo color de marca sin tocar la geometría.
      const isAccent = node.name === 'dot';
      const targetMaterials = isAccent ? this._sliceAccentMaterials : this._sliceBodyMaterials;
      const sourceMaterials = Array.isArray(node.material) ? node.material : [node.material];
      const materials = sourceMaterials.map((material) => {
        const clone = material.clone();
        clone.metalness = Math.min(clone.metalness ?? 0.1, 0.2);
        clone.roughness = Math.max(clone.roughness ?? 0.5, 0.35);
        clone.side = THREE.DoubleSide;
        targetMaterials.add(clone);
        return clone;
      });
      node.material = Array.isArray(node.material) ? materials : materials[0];
    });

    this._group.add(sliceScene);

    const brandBox = new THREE.Box3().setFromObject(brandScene);
    const brandSize = brandBox.getSize(new THREE.Vector3());
    const brandCenter = brandBox.getCenter(new THREE.Vector3());
    brandScene.position.sub(brandCenter);

    const brandScale = 0.22 / Math.max(brandSize.x, brandSize.y);
    brandScene.scale.setScalar(brandScale);
    this._brandBaseScale = brandScale;
    this._brandBasePosition = new THREE.Vector3(0.24, -0.17, 0.02);
    this._brandBaseRotationY = -0.18;
    brandScene.position.copy(this._brandBasePosition);
    brandScene.rotation.set(-0.04, this._brandBaseRotationY, 0);
    this._brandModel = brandScene;
    this._group.add(brandScene);

    const stageBox = new THREE.Box3().setFromObject(this._group);
    const stageCenter = stageBox.getCenter(new THREE.Vector3());
    this._stageSize = stageBox.getSize(new THREE.Vector3());
    this._group.position.sub(stageCenter);
  }

  _applyTheme() {
    if (!this._sliceBodyMaterials) return;

    const isDark = document.documentElement.getAttribute('data-slice-theme') === 'Dark';
    const styles = getComputedStyle(document.documentElement);
    const token = (name, fallback) => styles.getPropertyValue(name).trim() || fallback;
    const bodyColor = new THREE.Color(
      isDark
        ? token('--text-1', '#FAF9F6')
        : token('--accent', '#B45309')
    );
    const accentColor = new THREE.Color(
      isDark
        ? token('--accent', '#D97706')
        : token('--text-1', '#1C1917')
    );

    const paint = (materials, color) => {
      materials.forEach((material) => {
        material.color.copy(color);
        if (material.emissive) {
          material.emissive.copy(color).multiplyScalar(0.035);
        }
        material.needsUpdate = true;
      });
    };

    paint(this._sliceBodyMaterials, bodyColor);
    paint(this._sliceAccentMaterials, accentColor);

    if (this._keyLight) this._keyLight.intensity = isDark ? 2.35 : 2.1;
    if (this._fillLight) this._fillLight.intensity = isDark ? 0.9 : 1.05;
  }

  _resize() {
    if (!this._renderer || !this._camera) return;

    const rect = this.$stage.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));

    this._renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO));
    this._renderer.setSize(width, height, false);

    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();

    if (this._stageSize) {
      const fov = THREE.MathUtils.degToRad(this._camera.fov);
      const fitHeight = (this._stageSize.y / 2) / Math.tan(fov / 2);
      const fitWidth = (this._stageSize.x / 2) / (Math.tan(fov / 2) * this._camera.aspect);
      this._camera.position.set(0, 0, Math.max(fitHeight, fitWidth) * 1.18);
      this._camera.lookAt(0, 0, 0);
    }
  }

  _bindPointer() {
    this._onPointerMove = (event) => {
      if (this._sliceDragging) {
        const deltaX = event.clientX - this._dragStartX;
        this._spin = this._dragStartSpin + deltaX * 0.012;
        this._dragDistance = Math.max(this._dragDistance, Math.abs(deltaX));
        if (this._sliceModel) this._sliceModel.rotation.y = this._spin;
        this._render();
        return;
      }

      if (event.pointerType === 'touch') return;
      const rect = this.$stage.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const overBrand = this._hitBrand(event.clientX, event.clientY);
      this._setBrandHover(overBrand);
      this._setSliceHover(!overBrand && this._hitSlice(event.clientX, event.clientY));

      if (!this._interactive || this._reduceMotion) return;

      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      this._pointerTarget.x = BASE_ROTATION.x + y * 0.09;
      this._pointerTarget.y = BASE_ROTATION.y + x * 0.2;
      this._startLoop();
    };

    this._onPointerDown = (event) => {
      this._suppressClick = false;
      if (this._hitBrand(event.clientX, event.clientY)) return;
      if (!this._hitSlice(event.clientX, event.clientY)) return;

      this._sliceDragging = true;
      this._dragPointerId = event.pointerId;
      this._dragStartX = event.clientX;
      this._dragStartSpin = this._spin;
      this._dragDistance = 0;
      this._spinPausedUntil = Number.POSITIVE_INFINITY;
      this.$stage.classList.add('is-slice-dragging');
      try {
        this.$stage.setPointerCapture?.(event.pointerId);
      } catch {
        // Pointer capture is an enhancement; dragging still works without it.
      }
    };

    this._onPointerUp = (event) => {
      if (!this._sliceDragging) return;
      this._endSliceDrag(event);
    };

    this._onPointerCancel = (event) => {
      if (!this._sliceDragging) return;
      this._endSliceDrag(event);
    };

    this._onPointerLeave = () => {
      if (this._sliceDragging) return;
      this._setBrandHover(false);
      this._setSliceHover(false);
      if (!this._interactive || this._reduceMotion) return;
      this._pointerTarget.x = BASE_ROTATION.x;
      this._pointerTarget.y = BASE_ROTATION.y;
      this._startLoop();
    };

    this._onBrandClick = (event) => {
      if (this._suppressClick) {
        this._suppressClick = false;
        return;
      }
      if (!this._hitBrand(event.clientX, event.clientY)) return;
      slice.router.navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    this.$stage.addEventListener('pointermove', this._onPointerMove);
    this.$stage.addEventListener('pointerdown', this._onPointerDown);
    this.$stage.addEventListener('pointerup', this._onPointerUp);
    this.$stage.addEventListener('pointercancel', this._onPointerCancel);
    this.$stage.addEventListener('pointerleave', this._onPointerLeave);
    this.$stage.addEventListener('click', this._onBrandClick);
    this._pointerCleanup = () => {
      this._releaseDragCapture();
      this.$stage.removeEventListener('pointermove', this._onPointerMove);
      this.$stage.removeEventListener('pointerdown', this._onPointerDown);
      this.$stage.removeEventListener('pointerup', this._onPointerUp);
      this.$stage.removeEventListener('pointercancel', this._onPointerCancel);
      this.$stage.removeEventListener('pointerleave', this._onPointerLeave);
      this.$stage.removeEventListener('click', this._onBrandClick);
    };
  }

  _endSliceDrag(event) {
    this._sliceDragging = false;
    this.$stage.classList.remove('is-slice-dragging');
    this._spinPausedUntil = performance.now() + 1200;
    if (this._dragDistance > 4) this._suppressClick = true;
    this._releaseDragCapture(event?.pointerId);
    if (this._reduceMotion) this._render();
  }

  _releaseDragCapture(pointerId = this._dragPointerId) {
    if (pointerId == null || !this.$stage) return;
    try {
      if (this.$stage.hasPointerCapture?.(pointerId)) {
        this.$stage.releasePointerCapture(pointerId);
      }
    } catch {
      // The pointer may already be gone; nothing to release.
    }
    this._dragPointerId = null;
  }

  _hitModel(model, clientX, clientY) {
    if (!model || !this._camera || !this._raycaster) return false;

    const rect = this.$stage.getBoundingClientRect();
    if (!rect.width || !rect.height) return false;

    this._pointerNdc.set(
      ((clientX - rect.left) / rect.width) * 2 - 1,
      -(((clientY - rect.top) / rect.height) * 2 - 1)
    );
    this._raycaster.setFromCamera(this._pointerNdc, this._camera);
    return this._raycaster.intersectObject(model, true).length > 0;
  }

  _hitBrand(clientX, clientY) {
    return this._hitModel(this._brandModel, clientX, clientY);
  }

  _hitSlice(clientX, clientY) {
    return this._hitModel(this._sliceModel, clientX, clientY);
  }

  _setSliceHover(value) {
    if (this._sliceHover === value) return;
    this._sliceHover = value;
    this.$stage.classList.toggle('is-slice-hover', value);
  }

  _setBrandHover(value) {
    if (this._brandHover === value) return;
    this._brandHover = value;
    this.$stage.classList.toggle('is-brand-hover', value);
  }

  _startEntrance() {
    this._entryStart = performance.now();
    this._rotation.x = -0.12;
    this._rotation.y = -0.38;
    this._group.scale.setScalar(0.92);
    this._startLoop();
  }

  _startLoop() {
    if (!this._ready || this._raf || this._disposed || !this._inView || this._reduceMotion) return;
    this._lastTick = 0;
    this._raf = requestAnimationFrame(this._tick);
  }

  _tick = (now) => {
    this._raf = 0;
    if (this._disposed || !this._ready || !this._group || !this._inView) return;

    const dt = this._lastTick ? Math.min(0.05, (now - this._lastTick) / 1000) : 0;
    this._lastTick = now;
    if (!this._sliceDragging && now >= this._spinPausedUntil) {
      this._spin = (this._spin + dt * SPIN_SPEED) % (Math.PI * 2);
    }

    if (this._sliceModel) {
      this._sliceModel.rotation.y = this._spin;
    }
    if (this._brandModel) {
      this._brandHoverAmount = lerp(this._brandHoverAmount, this._brandHover ? 1 : 0, 0.16);
      const hover = this._brandHoverAmount;
      this._brandModel.scale.setScalar(this._brandBaseScale * (1 + hover * 0.08));
      this._brandModel.position.set(
        this._brandBasePosition.x,
        this._brandBasePosition.y + hover * 0.02,
        this._brandBasePosition.z + hover * 0.03
      );
      this._brandModel.rotation.y =
        this._brandBaseRotationY
        + Math.sin(this._spin * 1.25) * 0.12
        + hover * 0.18;
    }

    if (this._entryStart) {
      const progress = Math.min(1, (now - this._entryStart) / 850);
      const eased = easeOutCubic(progress);
      this._rotation.x = lerp(-0.12, BASE_ROTATION.x, eased);
      this._rotation.y = lerp(-0.38, BASE_ROTATION.y, eased);
      this._group.scale.setScalar(lerp(0.92, 1, eased));
      if (progress >= 1) this._entryStart = 0;
    } else {
      this._rotation.x += (this._pointerTarget.x - this._rotation.x) * 0.12;
      this._rotation.y += (this._pointerTarget.y - this._rotation.y) * 0.12;
    }

    this._render();
    this._raf = requestAnimationFrame(this._tick);
  };

  _render() {
    if (!this._renderer || !this._scene || !this._camera || !this._group || !this._ready) return;
    this._group.rotation.x = this._rotation.x;
    this._group.rotation.y = this._rotation.y;
    this._renderer.render(this._scene, this._camera);
  }

  _disposeObject(root) {
    if (!root) return;

    const materials = new Set();
    root.traverse((node) => {
      node.geometry?.dispose();
      if (!node.material) return;
      (Array.isArray(node.material) ? node.material : [node.material]).forEach((material) => {
        materials.add(material);
      });
    });

    materials.forEach((material) => {
      Object.values(material).forEach((value) => {
        if (value?.isTexture) value.dispose();
      });
      material.dispose();
    });
  }
}

customElements.define('slice-logostage', LogoStage);
