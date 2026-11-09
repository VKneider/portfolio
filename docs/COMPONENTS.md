# Componentes del portfolio

> Documentación de los componentes a nivel de proyecto.
> Última actualización: 2026-11-08
> Alcance: `slice-workspace/repos/portfolio/src/Components`.

Este documento explica qué hace cada componente del portfolio, qué props recibe, de qué datos depende y cómo se relaciona con el resto. No documenta la API interna de la librería de Slice.js; para eso están los docs del framework y de `slicejs-components`.

---

## 1. App shell

### `Portfolio`

**Archivo:** `src/Components/AppComponents/Portfolio/`

**Qué hace:** es el shell de la aplicación. Construye la navbar, el área de contenido con `MultiRoute`, el footer y el badge de “Built with Slice.js”. También carga los temas desde `/api/themes` y los pasa al `ThemeSelector`.

**Props:** ninguna.

**Construye:**

- `AnimationsProvider` (servicio)
- `ThemeSelector` + `LocaleSwitcher` (acciones de navbar)
- `Navbar`
- `MultiRoute` con las secciones del portfolio
- `BuiltWithBadge` en el footer

**Datos:** `fetch('/api/themes')` para el selector de tema. El footer se genera con `populateFooter()`: GitHub, LinkedIn y un CV que sigue al locale.

**Navegación:** `Portfolio` se suscribe a `router:change` y, tras montar la vista, hace `scrollTo(0, 0)` en el siguiente frame. El shell ya compensa la navbar fija con `padding-top: var(--nav-height)`, así que el tope de la vista queda visible. `LocaleSwitcher` acepta `placement: 'auto' | 'top' | 'bottom'`; por defecto `auto` mide el espacio y, en `<=1020px`, el menú abre siempre hacia arriba.

**Rutas que resuelve el `MultiRoute`:**

| Ruta | Componente |
|---|---|
| `/` | `AboutSection` |
| `/experience` | `ExperienceSection` |
| `/education` | `EducationSection` |
| `/projects` | `ProjectsSection` |
| `/projects/${slug}` | `ProjectDetail` |
| `/slice-js` | `WhatIsSlice` |
| `/teaching` | `TeachingIndex` |
| `/teaching/${slug}` | `TeachingCourse` |
| `/contact` | `ContactSection` |

**Notas:** las rutas de `routes.js` son la fuente de verdad del router. El `MultiRoute` solo decide qué sección mostrar; toda ruta debe existir también en `routes.js`.

---

## 2. Secciones del portfolio

### `AboutSection`

**Archivo:** `src/Components/AppComponents/AboutSection/`

**Qué hace:** es la home. Construye el hero (foto, H1, lede con el eslogan, tabs Engineering/Teaching/Research, CTAs) y ordena el resto alrededor del trabajo: What I do → Currently → Selected outcomes → Selected work → Toolbox → Beyond the code → How I work → Contact.

**Props:** ninguna.

**Construye:** `Button`, `SectionTitle`, `Card`, `Grid`, `SelectedWork`, `ToolboxSpec`, `DescriptionList`, `AboutClosing`, `ImageCarrousel`.

**Datos:** textos de `en.json` / `es.json` (`about.*`) y `src/locales/content/projects.json` para Selected work. Los tabs se renderizan desde `about.hero.tabs.*`.

**Notas:**

- Los tabs son un `tablist` accesible: flechas, Home/End, `aria-selected` y panel con `aria-labelledby`.
- Las tres cards navegan: Engineering → `/experience`, Teaching → `/teaching`, Research → `/slice-js`.
- `fitHeroToViewport()` escala el hero si el contenido no cabe en la primera pantalla.
- El lede conserva el eslogan original; no hay línea de identidad separada.
- Currently y Selected outcomes son secciones estáticas con `data-t`; no necesitan JS.
- Selected work usa `SelectedWork`: grid visual de 3 piezas iguales, sin cards. Cada pieza enlaza a `/projects/${slug}`.
- Toolbox usa `ToolboxSpec`: `DescriptionList` readonly con tags (`Badge`) y el summary como `help` de cada categoría.
- El cierre fusiona `AboutClosing`: How I work a la izquierda y contacto a la derecha. No hay bloque de contacto separado; el único footer es el global.
- Las stats reales son 4+: años, estudiantes, paper publicado y framework.
- Random Facts se retiró de la home.

### `SelectedWork`

**Archivo:** `src/Components/AppComponents/SelectedWork/`

**Qué hace:** teaser visual de proyectos para la home. Los 3 primeros por `order` se muestran como un grid de piezas iguales: cover 16/10, categoría · año, título, una línea de outcome y un solo “Read case”.

**Props:**

| Prop | Tipo | Uso |
|---|---|---|
| `projects` | `array` | Proyectos ya localizados (se usan los 3 primeros) |
| `headingKey` | `string` | Clave del heading; por defecto `projects.index.selectedWork` |

**Notas:** no usa cards. El heading es un `SectionTitle`; cada pieza es un `<a>` completo. La imagen es decorativa (`alt=""`) porque el título adyacente ya nombra el proyecto. El resumen se limita a 2 líneas en desktop y 3 en móvil. Debajo del grid hay un enlace “More projects” a `/projects`.

### `ToolboxSpec`

**Archivo:** `src/Components/AppComponents/ToolboxSpec/`

**Qué hace:** representa el stack como una ficha técnica. Construye un `DescriptionList` readonly (`variant: 'separated'`, `layout: 'horizontal'`, `labelWidth: '220px'`) con una fila por categoría: label, `help` con “cómo lo uso” y tags.

**Props:**

| Prop | Tipo | Uso |
|---|---|---|
| `groups` | `array` | `{ category, summary, skills[] }` ya localizados |

**Notas:** los tags son `Badge` con `shape: 'rounded'`, `variant: 'outlined'` y `size: 'sm'`. El `summary` va en el `help` del campo, debajo del label. En móvil, `DescriptionList` apila label y valor. No usa cards ni tabla.

### `AboutClosing`

**Archivo:** `src/Components/AppComponents/AboutClosing/`

**Qué hace:** cierre de la home. Fusiona “How I work” (3 principios) y el CTA de contacto en una sola sección a dos columnas.

**Props:** ninguna.

**Notas:** usa `about.how.*` y `about.contact.*`; el CTA apunta a `/contact` con `data-route`. Elimina el bloque de contacto separado que se leía como un segundo footer.

### `ExperienceSection`

**Archivo:** `src/Components/AppComponents/ExperienceSection/`

**Qué hace:** muestra la experiencia profesional como tabs de roles. Ordena por `startYear` descendente y construye una `ExperienceCard` por rol.

**Props:** ninguna.

**Construye:** `SectionTitle`, `Tabs`, `ExperienceCard`.

**Datos:** `src/locales/content/experience.json`. Cada registro tiene `id`, `startYear`, `endYear`, `shortCompany`, `technologies`, `logo?` y `copy: { en, es }`.

**Notas:**

- El rol actual (Lead Software Engineer, 2025) aparece primero.
- `ExperienceCard` usa iniciales si no hay logo.
- Los achievements con 4 items usan una grid 2×2; con 3 usan 3 columnas.
- La timeline se retiró: un solo mecanismo, tabs de roles.

### `EducationSection`

**Archivo:** `src/Components/AppComponents/EducationSection/`

**Qué hace:** muestra formación académica y certificados. Incluye búsqueda, paginación, modal de certificado y estado vacío con “Limpiar búsqueda”.

**Props:** ninguna.

**Construye:** `SectionTitle`, `StudyCard`, `CertificateCard`, `Modal`, `Button`.

**Datos:** `src/locales/content/education.json` (`studies`, `certificates`).

**Notas:**

- El modal usa un `iframe` o una imagen según `previewMode`.
- Conserva búsqueda y página al cambiar de locale.
- Es la página de evidencia académica; se queda en la nav.

### `ProjectsSection`

**Archivo:** `src/Components/AppComponents/ProjectsSection/`

**Qué hace:** es el orquestador del índice de proyectos. Carga `projects`, ordena por `order` y decide el layout:

- **1–6 proyectos:** grid de 2 columnas con `ProjectGrid` + `ProjectShowcaseCard`.
- **7+ proyectos:** 4 destacados en grid + el resto en `ProjectCompactList` (“More projects”).
- **0 proyectos:** estado vacío.

**Props:** ninguna.

**Construye:** `ProjectGrid`, `ProjectCompactList`.

**Datos:** `src/locales/content/projects.json`.

**Constantes:**

```js
const GRID_LIMIT = 6;      // hasta 6 usa solo grid
const FEATURED_LIMIT = 4;  // desde 7, cuántos van en grid
```

**Notas:**

- El click en cualquier `a[data-route]` se delega aquí y usa `slice.router.navigate`.
- Usa un `_renderToken` para descartar renders viejos si cambia el locale mientras construye.
- `destroyByContainer` antes de vaciar el contenido.

### `ProjectGrid`

**Archivo:** `src/Components/AppComponents/ProjectGrid/`

**Qué hace:** recibe una lista de proyectos y construye una `ProjectShowcaseCard` por cada uno dentro de un grid de 2 columnas (1 en móvil).

**Props:**

| Prop | Tipo | Uso |
|---|---|---|
| `projects` | `array` | Proyectos ya resueltos para el locale activo |

**Construye:** `ProjectShowcaseCard`.

**Notas:** usa un token para evitar carreras si `projects` cambia mientras se construyen las cards. Destruye las cards anteriores con `destroyByContainer`.

### `ProjectShowcaseCard`

**Archivo:** `src/Components/AppComponents/ProjectShowcaseCard/`

**Qué hace:** una card de proyecto del índice. Muestra portada, año, categoría, título, summary, rol + stack y “Read case”. La imagen y el título son enlaces al detalle.

**Props:**

| Prop | Tipo | Uso |
|---|---|---|
| `project` | `object` | Registro de `projects.json` ya localizado |

**Datos que usa:** `slug`, `image`, `year`, `category`, `title`, `summary`, `role`, `technologies`.

**Notas:** el summary se limita a 3 líneas con `line-clamp` para que las cards de una fila queden parejas. No navega por sí misma: delega en `ProjectsSection`.

### `ProjectCompactList`

**Archivo:** `src/Components/AppComponents/ProjectCompactList/`

**Qué hace:** lista compacta para los proyectos que no entran en el grid destacado (7+). Muestra año, título, categoría y “Read case”, sin imagen.

**Props:**

| Prop | Tipo | Uso |
|---|---|---|
| `projects` | `array` | Proyectos restantes, ya localizados |

**Datos que usa:** `slug`, `year`, `title`, `category`.

**Notas:** el heading es `projects.index.more` (“More projects” / “Más proyectos”). En móvil pasa a dos columnas internas (año + contenido).

### `ProjectDetail`

**Archivo:** `src/Components/AppComponents/ProjectDetail/`

**Qué hace:** página de detalle de un proyecto. Carga `projects`, busca por `slug` y renderiza:

1. Back link a `/projects`.
2. Título + summary.
3. Carrusel de todas las capturas.
4. Metadatos: categoría · año, rol, equipo, duración.
5. Acciones: Live Demo / GitHub.
6. Stack.
7. The problem / What I built / Trade-offs / Result / What I learned.
8. Estado “not found” si el slug no existe.

**Props:**

| Prop | Tipo | Uso |
|---|---|---|
| `params` | `object` | `{ slug }` que pasa el `MultiRoute` |

**Datos:** `src/locales/content/projects.json`.

**Carrusel:**

- Flechas anterior/siguiente.
- Teclado ←/→.
- Contador `1 / 3`.
- Thumbnails para saltar.
- Click en la imagen principal abre la captura completa en otra pestaña.
- Si hay una sola imagen, se ocultan flechas y thumbnails.

**Notas:** el `set params` re-renderiza cuando se navega de un proyecto a otro. El detalle usa los mismos slugs que `projects.json` y `seo.json`.

### `TeachingIndex`

**Archivo:** `src/Components/AppComponents/TeachingIndex/`

**Qué hace:** lista los cursos y programas. Cada card enlaza a `/teaching/${slug}`.

**Props:** ninguna.

**Construye:** `SectionTitle`.

**Datos:** `src/locales/content/teaching.json`.

**Notas:** Teaching no está en la nav; se llega desde la card de Docencia en About y desde la evidencia del caso Slice. La URL sigue siendo pública para estudiantes.

### `TeachingCourse`

**Archivo:** `src/Components/AppComponents/TeachingCourse/`

**Qué hace:** detalle de un curso. Muestra breadcrumb, nombre, descripción, repositorio, unidades y syllabus. Si el slug no existe, muestra “Curso no encontrado” con vuelta a todos los cursos.

**Props:**

| Prop | Tipo | Uso |
|---|---|---|
| `params` | `object` | `{ slug }` del curso |

**Construye:** `Breadcrumbs`, `SectionTitle`.

**Datos:** `src/locales/content/teaching.json`.

### `WhatIsSlice`

**Archivo:** `src/Components/AppComponents/WhatIsSlice/`

**Qué hace:** caso de estudio de Slice.js con enfoque CV. Hero con rol/estado, “What I built” (lista editorial con enlaces), tabla de decisiones, evidencia (métricas + proof list), estado/contribución y banda de cierre.

**Props:** ninguna.

**Construye:** `LogoStage` (logo 3D).

**Datos:** todo el copy vive en `what.*` de `en.json` / `es.json`.

**Notas:**

- Los enlaces viven en “What I built”; no hay una sección de ecosistema separada que los repita.
- El wordmark 3D está oculto; el nombre vive en el H1.
- Internal links (`/teaching`, `/projects`) usan `data-route` y `slice.router.navigate`.

### `ContactSection`

**Archivo:** `src/Components/AppComponents/ContactSection/`

**Qué hace:** página de contacto. El único CTA de contacto es LinkedIn; no hay email, `mailto` ni formulario.

**Props:** ninguna.

**Construye:** `Button` (LinkedIn).

**Datos:** `contact.*` de `en.json` / `es.json`.

**Notas:** “View projects” y GitHub son enlaces secundarios. El CTA del hero y la nav llevan aquí; esta página cierra en LinkedIn.

### `NotFound`

**Archivo:** `src/Components/Visual/NotFound/`

**Qué hace:** página 404 con ilustración, CTA “Back to home” y “Contact”, además de la nav secundaria.

**Props:** ninguna.

**Notas:** el contraste del texto y la nav se ajustó para pasar AA sobre el fondo de acento.

---

## 3. Componentes de soporte usados por el proyecto

No son propiedad del portfolio; son componentes de la librería o servicios que el portfolio compone. Se listan para saber qué depende de qué.

| Componente | Categoría | Uso en el portfolio |
|---|---|---|
| `Navbar` | Visual | Shell, navegación, logo, tema/locale, estado activo |
| `MultiRoute` | Visual | Cambia la sección según la ruta |
| `Button` | Visual | CTAs de hero, contacto, certificados y proyectos |
| `Card` | Visual | Cards de las tres dimensiones en About |
| `Grid` | Visual | Layout de las cards de About |
| `SectionTitle` | Visual | Títulos de sección |
| `Tabs` | Visual | Experiencia y hero de dimensiones |
| `Timeline` | Visual | No usado por Experience desde la migración; queda en la librería |
| `Modal` | Visual | Certificados |
| `Breadcrumbs` | Visual | Detalle de curso |
| `ImageCarrousel` | Visual | Carrusel de trayectoria en About |
| `LocaleSwitcher` | Visual | Cambio de idioma |
| `ThemeSelector` | Visual | Cambio de tema |
| `BuiltWithBadge` | Visual | Badge del footer |
| `NotFound` | Visual | 404 |
| `ExperienceCard` | Atomic | Card de experiencia |
| `CertificateCard` | Atomic | Card de certificado |
| `StudyCard` | Atomic | Card de formación |
| `TechnicalSkillsSection` | Atomic | Archivado en `Archived/`; reemplazado por `ToolboxSpec` |
| `TechExpertise` | Atomic | Archivado; su data vive en `AboutSection/data/techExpertise.js` |
| `RandomFacts` | Atomic | Archivado en `Archived/` |
| `TeachingSection` | Atomic | Archivado; bloque de docencia antiguo |
| `BadgeCarousel` | Atomic | Archivado; solo lo usaba `TechExpertise` |
| `LogoStage` | Atomic | Logo 3D de Slice |
| `AnimationsProvider` | Service | fadeIn, slideInLeft, revealOnScroll |
| `FetchManager` | Service | No usado por el portfolio actualmente |
| `LocalStorageManager` | Service | Persistencia local disponible |
| `IndexedDbManager` | Service | Persistencia local disponible |
| `DragDropService` | Service | Random Facts / juegos |

**Archivados:** `ImageDemo`, `MainMenu`, `MyNavigation`, `TeachingSection`, `TechExpertise`, `TechnicalSkillsSection`, `RandomFacts` y `BadgeCarousel` viven en `src/Components/Archived/`. **No están registrados en `components.js`**, así que no se construyen ni se bundlean. Se conservan como referencia; ver `Archived/README.md`. `ProjectViewer` y `ProjectCard` se retiraron al migrar Projects a la variante nueva.

---

## 4. Datos y localización

### Archivos de contenido

| Archivo | Consumidor | Contenido |
|---|---|---|
| `src/locales/content/experience.json` | `ExperienceSection` | Roles, fechas, responsabilidades, logros |
| `src/locales/content/education.json` | `EducationSection` | Estudios y certificados |
| `src/locales/content/projects.json` | `ProjectsSection` / `ProjectDetail` | Proyectos y casos |
| `src/locales/content/teaching.json` | `TeachingIndex` / `TeachingCourse` | Cursos y unidades |

### Diccionarios

`src/locales/en.json` y `src/locales/es.json` contienen el copy de UI. Las claves del portfolio de proyectos viven en `projects.index.*`; las del caso Slice en `what.*`.

### Reglas de traducción

- Texto en plantillas HTML: `data-t="key"`.
- Texto creado en JS: `slice.t('key')`.
- Texto que se pasa como prop a un componente: `slice.t.ref('key')`.
- Contenido estructurado: `await slice.t.content('projects')`, que resuelve `copy: { en, es }` para el locale activo.
- Re-render al cambiar idioma: `slice.translator.watch(this, ...)`.

---

## 5. Routing y SEO

- `src/routes.js` declara todas las rutas que conoce el router. Toda ruta nueva debe existir aquí, aunque el `MultiRoute` también la conozca.
- `Portfolio.js` mapea la ruta a la sección dentro del shell.
- `ProjectDetail` recibe `params.slug` desde el `MultiRoute`.
- `src/public/seo.json` declara títulos, descripciones, `robots`, sitemap y paths dinámicos.
- `/projects/${slug}` está en el sitemap con los slugs de `projects.json`.
- `src/public/sitemap.xml` se regenera con `slice seo sitemap --yes`; no se edita a mano.

---

## 6. Cómo agregar un proyecto

1. Agrega un registro a `src/locales/content/projects.json` con:

```json
{
  "id": 4,
  "slug": "nuevo-proyecto",
  "order": 4,
  "year": "2026",
  "role": "Engineer",
  "team": "Solo",
  "duration": "2026",
  "technologies": ["..."],
  "githubUrl": "https://...",
  "liveUrl": "https://...",
  "image": "/images/projects/nuevo-proyecto.png",
  "images": ["/images/projects/nuevo-proyecto.png", "..."],
  "copy": {
    "en": { "title": "...", "category": "...", "summary": "...", "problem": "...", "built": ["..."], "tradeoffs": ["..."], "result": "...", "learned": "..." },
    "es": { "...": "..." }
  }
}
```

2. Agrega el slug a `seo.json` → `/projects/${slug}` → `sitemap.paths`.
3. Corre:

```bash
slice seo sitemap --yes
pnpm lint
pnpm typecheck
pnpm build
```

4. Si el proyecto entra en los primeros 6 por `order`, aparece en el grid. Si hay más de 6, solo los primeros 4 van en el grid y el resto en la lista compacta. Ajusta `GRID_LIMIT` / `FEATURED_LIMIT` en `ProjectsSection.js` si quieres otro balance.

---

## 7. Convenciones de Slice que respeta el proyecto

- `slice.attachTemplate(this)` primero; refs en el constructor; `slice.controller.setComponentProps(this, props)` al final.
- `await slice.build('Componente', props)` para construir hijos.
- `slice.controller.destroyByContainer(container)` antes de vaciar un contenedor con componentes construidos.
- `slice.href(path)` para hrefs internos; `slice.router.navigate(path)` para navegar sin recarga.
- `data-route` + delegación de click para enlaces internos generados dinámicamente.
- `slice.translator.watch` para re-renderizar al cambiar idioma.
- `beforeDestroy` para listeners globales, timers y observers.
- Nada de `innerHTML = ''` sobre hijos construidos sin destruirlos antes.
