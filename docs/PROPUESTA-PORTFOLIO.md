# Propuesta de evolución del portfolio

> **Estado:** borrador vivo · **Última actualización:** 2026-11-09
> **Alcance:** `slice-workspace/repos/portfolio`
> **Objetivo:** que un reclutador técnico entienda en menos de 60 segundos quién eres, qué haces ahora, qué has construido y cómo contactarte — y que el sitio demuestre criterio de ingeniería, no solo buen gusto.

Este documento es la fuente de verdad de la sesión. Cada decisión se actualiza aquí antes de tocar código.

**Estado de implementación (2026-11-09):** Fase 1 y Fase 2 completadas. Se sumaron: Selected work 3-up, ToolboxSpec, cierre con aire antes del footer, scroll al tope en cada ruta, menú de idioma configurable, carrusel de 5 imágenes, `ImageCarrousel` accesible, transiciones y fuentes <12 px cerradas, links URU/Zenodo, 1 paper publicado y componentes sin uso archivados. `pnpm lint`, `pnpm typecheck` y `pnpm build` pasan. Pendiente: Fase 3 (accesibilidad restante, proofread, Teaching/Education/Slice.js), VKRAFTS como "Other work" y los pendientes priorizados de §18.

---

## 0. Contexto de la revisión

Revisión hecha sobre el sitio real (`localhost:3001`) a 1440 px y 390 px, el código y las skills de frontend del registry:

- `flow-app-shell`, `flow-navigation`, `flow-empty-states`, `ux-first-design`, `make-interfaces-feel-better` (lectura profunda).
- `flow-forms`, `flow-errors`, `flow-onboarding`, `ux-kit`, `userflow` (instaladas, se usarán al implementar).
- `slice-js-developer` v1.32.1, en sync con `repos/slice.js_docs`.
- `ux_lint.py`: 88 candidatos (41 `transition: all`, 22 fuentes <12 px, 9 focus outlines eliminados, 7 diálogos nativos, 6 imágenes sin alt, 3 botones sin label).

**Diagnóstico en una frase:** el sitio gana en identidad y pierde en evidencia. El orden actual muestra el viaje antes del trabajo, el cierre es un juego de notas, y el empleo actual de ingeniería no existe.

---

## 1. Decisiones tomadas en esta sesión

| # | Decisión | Estado |
|---|---|---|
| 1 | El empleo actual **no** se etiqueta como "under NDA". Se añade una entrada de **Lead Software Engineer** con "Details available on request". | Cerrado |
| 2 | **Contact** entra a la nav. El CTA principal va a `/contact`; **todo el contacto se cierra por LinkedIn**. | Cerrado |
| 3 | El hero muestra **todo** (nombre, marca, roles, dimensiones) con **tabs estáticos**: Engineering / Teaching / Research. | Cerrado — Opción B (§5.1) |
| 4 | Borrar `/charts`, `/dompurify`, `/animejs` y `/bare-imports`. **`/imposter` se queda, solo `noindex`.** | Cerrado |
| 5 | El **About** debe hablar del trabajo primero y mejorar la colocación de los logros. | Cerrado |
| 6 | **Projects** se rediseña como casos de estudio. Se añade **Slice.js Components**; el portfolio no entra como caso. | Cerrado |
| 7 | El rol actual empieza en **2025**. | Cerrado |
| 8 | **EN** por defecto; ES como traducción. | Cerrado |
| 9 | **Slice.js se queda como sección propia.** Su función cambia de manifiesto a caso de estudio. | Cerrado |
| 10 | **Projects** = Slice.js Components, Conclave y Parish. Slice.js no se duplica como card; se llega a él desde la sección propia. | Recomendado — confirmar |
| 11 | **Teaching sale de la nav.** `/teaching` se queda viva y se enlaza desde About/Experience para estudiantes. | Propuesto — confirmar |
| 12 | **Selected work** deja el featured + filas y pasa a un **grid visual 3-up sin cards**. **Toolbox** deja el ledger y pasa a **`DescriptionList` readonly con tags**. | Cerrado |

---

## 2. Criterio de éxito

Un reclutador con veinte portfolios abiertos debe poder responder, sin scroll infinito:

1. **Quién eres** y cuál es tu rol profesional actual.
2. **Qué haces ahora** (no solo lo que enseñabas antes).
3. **Qué has construido** y con qué criterio (decisiones, trade-offs, alcance).
4. **Qué evidencia** lo respalda (proyectos, docencia, papers, certificados).
5. **Cómo contactarte** en un clic, sin buscar en el footer.

Métrica cualitativa: si en 60 segundos no puede decir "es ingeniero de software, profesor y creador de Slice.js; ha construido esto; está disponible para X", el orden falla.

---

## 3. Principios de diseño (derivados de las skills)

- **Shell correcto:** top-nav + contenido para un sitio de contenido. El problema no era el shell; era el scroll anidado del antiguo `ProjectViewer` (ya retirado) y la falta de salida en las rutas demo.
- **Nav:** 4–7 ítems, sustantivos concretos, un CTA primario a la derecha, estado activo siempre visible.
- **Una acción primaria por vista.** Los seis botones "View certificate" compiten entre sí; en Projects, el CTA principal es "Ver caso", no "Live Demo".
- **El estado vacío/error también se diseña.** El 404 y `/teaching/${slug}` sin curso necesitan salida.
- **Motion restraint:** nada de rotar el H1 cada 3 s. El movimiento no es el único canal de información.
- **Reusar antes de construir:** `Card`, `Grid`, `SectionTitle`, `Button`, `Badge`, `ImageCarrousel`, `Modal`, `Tabs`, `Timeline`, `ProjectShowcaseCard` ya existen.
- **Slice:** `attachTemplate` primero, refs en el constructor, `setComponentProps` al final, `await slice.build`, `destroyByContainer` antes de vaciar contenedores, `slice.href()` y `slice.router.navigate` para enlaces internos, `${param}` en rutas.

---

## 4. Arquitectura de información

### 4.1 Nav propuesta

```
Experience · Education · Projects · Slice.js · Contact
```

- **El logo es el enlace a home (About).** No hay ítem "About": el logo ya cumple esa función y libera un slot sin esconder evidencia.
- **Education se queda.** Es donde viven la formación y los certificados verificables; es evidencia, no una página secundaria. Quitarla sería sacrificar prueba, no redundancia.
- **Teaching sale de la nav.** Sirve sobre todo a estudiantes, no al reclutador primario. La página `/teaching` se queda viva y se enlaza desde About (card Docencia) y, opcionalmente, desde Experience (URU) y el footer. La dimensión educador no desaparece: sigue en About, en la experiencia y en la página de cursos.
- **Slice.js se queda como sección propia** (§11) y **Projects = 3 casos** (Slice.js Components, Conclave, Parish). Slice.js no se duplica como card.
- **Contact** como último ítem, con tratamiento de CTA (borde o color de acento).
- Theme y locale quedan como utilidades a la derecha, no como destinos.

**Si se quisiera mantener Teaching en la nav**, la nav vuelve a 6 ítems y se queda como estaba. No es la recomendación: el slot primario debe reflejar lo que un reclutador busca primero. La docencia se demuestra desde About y Experience.

**Estado actual (Fase 1):** la nav tiene 7 ítems (About + Teaching incluidos). En Fase 2 se quitan About y Teaching y queda la nav de 5. El logo recibe `aria-current="page"` cuando se está en `/`.

**Rutas resultantes:**

| Ruta | Componente | Estado |
|---|---|---|
| `/` | `AboutSection` (home) | Se conserva, se reordena |
| `/experience` | `ExperienceSection` | Se conserva, se reescribe |
| `/projects` | `ProjectsSection` (índice) | Se rediseña |
| `/projects/${slug}` | `ProjectDetail` (nuevo) | Nuevo |
| `/slice-js` | `WhatIsSlice` | Se reescribe como caso + hub |
| `/teaching` | `TeachingIndex` | Se conserva |
| `/teaching/${slug}` | `TeachingCourse` | Se conserva |
| `/contact` | `ContactSection` | Se conserva, se refuerza |
| `/education` | `EducationSection` | Se conserva como secundaria |
| `/imposter` | `TheImposterGame` | Se conserva, `noindex` |
| `/404` | `NotFound` | Se conserva, se mejora |

**Se eliminan:** `/charts`, `/dompurify`, `/animejs`, `/bare-imports`.

---

## 5. Home

### 5.1 Hero — "tener todo" con tabs

Problema actual: `AboutSection.js` alterna "Victor Kneider" ↔ "vkneider.dev" cada 4 s y cicla cinco roles cada 3 s. En una captura el rol era "University Professor". El reclutador puede leer el rol menos relevante y el H1 cambia de identidad.

**Decisión (Opción B):** el nombre queda fijo, la marca queda visible y los tres roles/dimensiones viven en **tabs estáticos**. Todos los tabs están siempre visibles; el usuario decide qué leer, no un temporizador.

**Composición:**

```
vkneider.dev                         ← marca pequeña, fija
Victor Kneider                       ← H1 estable
Computer engineer, professor and creator of Slice.js. I design and build
professional software — I build it, I teach it, and I share what I learn.
                                     ← lede con el eslogan

[ Engineering ] [ Teaching ] [ Research ]   ← tabs, todos visibles

Panel activo (una línea + un enlace):
"Distributed architectures, full-stack systems and LLM integration."
→ Ver experiencia

[Contact]  [Download CV]
```

**Comportamiento:**

- El H1 no cambia. La marca `vkneider.dev` no sustituye al nombre: es un lockup.
- La línea de identidad enumera todos los roles de un vistazo; los tabs profundizan.
- Un solo panel visible; `min-height` reservado para evitar layout shift.
- Sin auto-rotación, sin `setInterval`, sin reemplazo de texto.
- Teclado: `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`; roving tabindex; ←/→/Home/End; Enter/Space activa.
- El panel es `role="tabpanel"` con `aria-labelledby`.
- Los tabs no son navegación de ruta: no cambian la URL ni recargan.
- Si se anima el cambio de panel, que sea un fade de 100–150 ms y que respete `prefers-reduced-motion`.

**Copy de los paneles (EN):**

| Tab | Línea | Enlace |
|---|---|---|
| Engineering | Distributed architectures, full-stack systems and LLM integration. | See experience |
| Teaching | Component-based programming, web client development and thesis supervision. | See teaching |
| Research | Slice.js, browser APIs and the parts of the platform most people skip. | See Slice.js |

**Copy de los paneles (ES):**

| Tab | Línea | Enlace |
|---|---|---|
| Engineering | Arquitecturas distribuidas, sistemas full-stack e integración con LLMs. | Ver experiencia |
| Teaching | Programación basada en componentes, desarrollo web del cliente y dirección de tesis. | Ver docencia |
| Research | Slice.js, APIs del navegador y las partes de la plataforma que casi nadie mira. | Ver Slice.js |

**Lede (eslogan):**

> EN: Computer engineer, professor and creator of Slice.js. I design and build professional software — I build it, I teach it, and I share what I learn along the way.
>
> ES: Ingeniero en Computación, profesor y creador de Slice.js. Diseño y construyo software profesional: lo construyo, lo enseño y divulgo lo que aprendo en el camino.

**Regla:** el lede conserva el eslogan original. No añadir una línea de identidad separada: duplicaría los roles. Los tabs dan la profundidad.

**Implementación:** reusar `Tabs` si su API encaja; si no, un tablist ligero dentro de `AboutSection` (son tres botones, no hace falta un componente nuevo). El estado activo vive en el componente, no en la URL.

**Por qué B y no A:** A muestra todo en una sola línea, pero no da profundidad. B conserva la estabilidad del nombre y añade detalle bajo demanda, sin el coste de un carrusel automático.

### 5.2 Orden de secciones

**Actual:** hero → "My Journey & Experiences" (carrusel + stats + Beyond the Code) → "About Me" → skills → Random Facts.

**Propuesto:**

1. Hero.
2. **What I do** — tres tarjetas: Engineering, Teaching, Research (trabajo primero).
3. **Currently** — rol actual + foco + ubicación/modalidad.
4. **Selected outcomes** — 3–4 logros con alcance.
5. **Selected work** — Slice.js Components, Conclave y Parish (→ `/projects/${slug}`); Slice.js vive en su sección propia.
6. **Toolbox** — matriz estática de skills.
7. **Beyond the code** — docencia, comunidad, carrusel.
8. **How I work** — tres principios: arquitectura con intención, enseñar construyendo, leer la especificación.
9. **Contact CTA** — un solo destino: LinkedIn.

**Sale:** Random Facts (notas adhesivas con bromas), ya retirado. La personalidad queda en "How I work" y "Beyond the code".

---

## 6. About

### 6.1 Problema

- El About actual empieza por el viaje y el carrusel, no por el trabajo.
- Los logros están diluidos entre "responsibilities" y "achievements" sin una regla.
- Las stats mezclan métricas reales con chistes ("0 Fear of refactoring", "∞ Console logs", "Early adoption").
- Random Facts cierra la página con un juguete interactivo.

### 6.2 Nueva estructura

| Bloque | Contenido | Regla |
|---|---|---|
| **What I do** | Tres tarjetas: Software engineering, Teaching, Research & tooling | Ingeniero primero, educador segundo, investigador tercero |
| **Currently** | Lead Software Engineer, foco, ubicación, disponibilidad | Sin NDA; "Details available on request" |
| **Selected outcomes** | 3–4 logros con alcance | Verbo + objeto + alcance/resultado |
| **Selected work** | Primeros 3 proyectos por `order` | `SelectedWork`: grid visual 3-up sin cards; cover 16/10, categoría/año, título, una línea de outcome y un solo `Read case` |
| **How I work** | 3 principios: arquitectura con intención, enseñar construyendo, leer la especificación | `AboutClosing`; fusionado con el CTA de contacto |
| **Toolbox** | Ficha técnica: categoría + cómo lo uso + tags | `DescriptionList` readonly (`separated`, `horizontal`) con `Badge` como tags; sin tabla, sin cards |
| **Beyond the code** | Docencia, comunidad, open source, carrusel | Se mantiene, pero después del trabajo |
| **Languages / personal** | Una línea compacta | Opcional |

### 6.3 Regla para escribir logros

Un logro debe tener **alcance** (número, periodo, escala) o **cambio** (antes → después). Si no tiene ninguno, es una responsabilidad y va en la lista de responsabilidades.

| Mal | Bien |
|---|---|
| "Completed the six-month internship program" | "Six-month internship in industrial IT; delivered automation documentation used by the AIT team." |
| "Gained hands-on experience" | Eliminar. |
| "Slice.js used in academic and personal projects" | "Built Slice.js: framework, CLI and build; used in the classroom and in production projects." |
| "Course repositories reused across terms" | "Designed course repositories reused across terms by 120+ students." |

**Ejemplos de logros para Selected outcomes:**

- **Lead Software Engineer** — Arquitecturas distribuidas en producción, mantenimiento principal del software y las librerías, y liderazgo de la integración con LLMs.
- **Slice.js** — Framework de componentes con CLI, build y documentación; usado en el aula y en proyectos en producción.
- **Docencia** — 120+ estudiantes en Programación I/II y Programación Basada en Componentes; repositorios de curso reutilizados entre semestres.
- **Investigación** — 1 paper publicado sobre Slice.js y dirección de tesis de grado en ingeniería de software.

### 6.5 Currently — copy propuesto

> **EN:** Lead Software Engineer at a software startup. I design distributed architectures, maintain the core software and shared libraries, and lead LLM integration. Details available on request.
>
> **ES:** Lead Software Engineer en una startup de software. Diseño arquitecturas distribuidas, mantengo el software y las librerías principales, y lidero la integración con LLMs. Detalles disponibles a solicitud.

No usar "under NDA". "Details available on request" es suficiente y no convierte la ausencia de detalle en el centro de la sección.

### 6.4 Stats

Sustituir las ocho stats por **tres o cuatro reales y defendibles**:

- `4+` años construyendo software.
- `120+` estudiantes acompañados.
- `1` paper publicado.
- `1` framework construido (Slice.js).

Si un número no se puede defender en una entrevista, no va.

---

## 7. Experience

### 7.1 Problema

- No aparece el empleo actual de ingeniería. El visitante ve profesor, pasantía y freelance; concluye "profesor/freelance".
- Hay dos mecanismos de navegación para lo mismo: tabs + timeline arrastrable.
- La timeline va 2024 → 2023 → 2020 de izquierda a derecha; se lee al revés.
- "Drag nodes to reshape the timeline" es un juguete, no una función.
- Los "achievements" son descripciones, no logros.

### 7.2 Decisión

- **Un solo mecanismo:** tabs de roles en orden reverso-cronológico. La timeline se retiró.
- **Orden:** Lead Software Engineer → profesor → práctica independiente → pasantía.
- **Entrada del rol actual (sin NDA):**

```json
{
  "position": "Lead Software Engineer",
  "company": "Software Startup",
  "period": "2025 — Present",
  "type": "Full-time",
  "location": "Remote",
  "description": "Lead software engineer at a software startup. I design distributed architectures, maintain the core software and shared libraries, and lead LLM integration. I also author proposals to improve productivity and optimize internal workflows. Details available on request.",
  "responsibilities": [
    "Design and evolve distributed architectures for product systems",
    "Act as principal maintainer of the core software and shared libraries",
    "Lead full-stack delivery across frontend, backend and data boundaries",
    "Lead LLM integration: architecture, evaluation and production rollout",
    "Author productivity and workflow proposals for the company"
  ],
  "achievements": [
    "Design distributed architectures for production systems",
    "Principal maintainer of the core software and shared libraries",
    "Lead LLM integration from architecture to production rollout",
    "Author of internal productivity and workflow proposals"
  ]
}
```

- **TODO:** el año de inicio confirmado es **2025**. El `id` y el resto de la entrada se ajustan al publicar.
- Si no se quiere ni "Software Startup", usar `"company": "Current role"` y mover el contexto a la descripción. **No** usar "under NDA".
- **Achievements:** aplicar la regla de §6.3. Si no hay métrica, usar alcance: "3 años", "6 meses", "2 cursos", "120+ estudiantes", "3 papers".

### 7.3 Estructura de la role card

1. Header: logo/initials, position, company, periodo, tipo, ubicación.
2. Descripción (2–3 líneas).
3. Responsabilidades (3–5 bullets).
4. Tecnologías (chips).
5. Impacto (2–3 bullets con alcance).
6. Enlace "Detalles disponibles a solicitud" solo en el rol actual.

---

## 8. Projects

### 8.1 Problema actual

- `ProjectViewer` es un three-pane de 600 px fijos con scroll interno en tres columnas.
- En móvil, el selector de proyectos queda **debajo** del detalle.
- Los chips de tecnologías se cortan al fondo del panel.
- El detalle solo tiene título, descripción y stack: no hay rol, problema, decisiones, resultado ni aprendizaje.
- `ProjectViewer` tiene deuda técnica: `setTimeout` de 200 ms, `innerHTML = ''` sobre botones construidos con `slice.build` (leak), listener de `keydown` en `document` sin `beforeDestroy`, modal sin focus trap.
- El orden actual pone Conclave primero y Slice.js tercero.

### 8.2 Nuevo índice `/projects`

Grid editorial de **N project cards** (escala a cualquier número de proyectos). Cada card:

```
[cover 16:10]
Category · Year
Title
One-line outcome (no feature list)
[Role tag] [Stack chips ×3]
Ver caso →
```

- Sin scroll interno. Altura automática.
- **Orden editorial inicial:** Slice.js Components → Conclave → Parish Automated Ecosystem. El índice no está limitado a tres: renderiza todos los registros de `projects.json`.
- **Slice.js no va aquí:** tiene su sección propia (§11). What I built enlaza directamente a la librería.
- En móvil: una columna, cover arriba, texto abajo, CTA al final.
- La imagen y el título son enlaces al caso; los links externos (Live/GitHub) viven dentro del detalle.

### 8.3 Nuevo detalle `/projects/${slug}`

```
← All projects
Eyebrow: Category · Year
Title
One-line summary
Carousel: all screenshots (prev/next + thumbnails; click opens the full image)
Role · Team · Duration · Stack chips
[Live Demo] [GitHub]                    ← CTA primario: Live; secundario: GitHub
The problem            ← 2–3 frases
What I built           ← 3–5 bullets
Trade-offs             ← 2–3 bullets (el diferenciador de arquitectura)
Result                 ← alcance/impacto; si no hay métrica, scope
What I learned         ← 1–2 frases
```

- El título y el carrusel son lo primero que se ve; las decisiones y el resultado vienen después.
- El carrusel usa **todas** las imágenes del proyecto, no solo una. Si hay una sola, se ocultan flechas y thumbnails.
- Click en la imagen principal abre la captura completa en una pestaña nueva.
- Flechas y teclado (←/→) cambian de captura; los thumbnails permiten saltar.

**Por qué "Trade-offs":** es lo que separa un portfolio de arquitectura de un catálogo de screenshots. Un reclutador técnico quiere ver que elegiste entre opciones y sabes por qué.

### 8.4 Modelo de datos propuesto (`src/locales/content/projects.json`)

Añadir a cada registro:

```json
{
  "id": 1,
  "slug": "slice-js",
  "order": 1,
  "featured": true,
  "date": "2024-01-15",
  "year": "2024",
  "role": "Creator & maintainer",
  "team": "Solo",
  "duration": "2024 — present",
  "statusKey": "active",
  "technologies": ["JavaScript", "Web Components", "CSS3", "HTML5"],
  "githubUrl": "https://github.com/vkneider/slice.js",
  "liveUrl": "https://slicejs.com",
  "image": "...",
  "images": ["..."],
  "copy": {
    "en": {
      "title": "Slice.js",
      "category": "Framework",
      "summary": "A component framework built on native Web Components.",
      "problem": "...",
      "built": ["...", "..."],
      "tradeoffs": ["...", "..."],
      "result": "...",
      "learned": "..."
    },
    "es": { "...": "..." }
  }
}
```

- `slug` es la fuente de la ruta; no usar el `id` numérico.
- `order` manda sobre `featured`/`date` para el orden editorial.
- `summary` es la línea de una frase; `description` puede quedar como legado o eliminarse.

### 8.5 Componentes y ruta

- **`ProjectsSection`** — orquestador: carga `projects.json`, ordena y decide layout.
- **`ProjectGrid`** — grid de 2 columnas para 1–6 proyectos.
- **`ProjectShowcaseCard`** — card individual (portada, título, summary, meta, link).
- **`ProjectCompactList`** — lista compacta para los proyectos que sobran en 7+.
- **`ProjectDetail`** — detalle con carrusel, metadatos, acciones y secciones.
- **Rutas:** `/projects` y `/projects/${slug}` en `src/routes.js` y en el `MultiRoute` de `Portfolio.js`.
- **Navegación interna:** `slice.href()` + `slice.router.navigate`; no usar `window.open` para casos internos.
- **i18n:** `slice.t.content('projects')` y `slice.translator.watch` para re-renderizar al cambiar locale.
- **Registro:** todos en `src/Components/components.js`.
- **Retirados:** `ProjectViewer`, `ProjectCard` y el `ProjectsSection` anterior. La vista vieja ya no existe.

### 8.6 Fixes técnicos obligatorios

- `destroyByContainer(this.$grid)` antes de `innerHTML = ''`.
- `beforeDestroy()` para el listener de `document` y los timers.
- Sin `setTimeout` para animaciones: transiciones CSS interrumpibles.
- Sin `height: 600px` fijo ni `overflow-y` en tres columnas.
- Modal con `Modal` de la librería o focus trap + `aria-modal` + retorno de foco.
- Imágenes con `alt` descriptivo; lazy loading fuera del viewport.
- Enlaces externos con `rel="noopener noreferrer"`.

### 8.7 Los casos iniciales

| Orden | Proyecto | Rol | Links |
|---|---|---|---|
| 1 | Slice.js Components | Author & maintainer | GitHub · components.slicejs.com |
| 2 | Conclave | Creator & maintainer | GitHub · Live |
| 3 | Parish Automated Ecosystem | Engineer | Live |

**Slice.js Components** — descripción oficial: "Official Visual and Service components library and documentation registry for Slice.js." Repositorio: `https://github.com/VKneider/slicejs-components`; live: `https://components.slicejs.com`.

Copy propuesto:

> **EN:** The official component library for Slice.js: reusable visual and service components, theming and documentation.
>
> **ES:** La librería oficial de componentes de Slice.js: componentes visuales y de servicio reutilizables, theming y documentación.

Cada caso necesita **rol, problema, decisiones, resultado**. Si no hay métrica, usar alcance.

### 8.8 Implementación final (main)

- `/projects` es la vista principal desde 2026-11-08; `/projects-2` se retiró.
- Contenido: `src/locales/content/projects.json`, con 3 casos iniciales. El índice renderiza todos los registros; agregar un proyecto es agregar un registro.
- **Umbral de layout:** hasta **6** proyectos → grid de 2 columnas (`ProjectGrid` + `ProjectShowcaseCard`). Desde **7** → 4 destacados en grid + el resto en lista compacta (`ProjectCompactList`) con el título "More projects".
- Detalle con **carrusel de todas las capturas** (flechas, teclado y thumbnails); click en la imagen abre la captura completa.
- `/projects/${slug}` está en el sitemap; ya no es una preview.
- Componentes registrados en `components.js`; rutas declaradas en `routes.js` y en el `MultiRoute` de `Portfolio.js`.
- El nav marca Projects como activo en `/projects` y en los detalles.
- Cómo agregar un proyecto: ver `docs/COMPONENTS.md` §6.

### 8.9 Revisión de GitHub y cuarto caso (2026-11-09)

Revisado el perfil público (`github.com/VKneider`, 52 repos). **No se agrega un cuarto caso principal.**

- **VKRAFTS (`vkrafts-tools`)** — producto live y técnicamente sólido: Fabric.js, geometría de hoja, export PNG/SVG/PDF/impresión, IndexedDB, 16 servicios, tests y documentación. Pero no hay métricas de uso/impacto; sin ellas, el caso se lee como herramienta interna del negocio familiar. Se reevalúa si se pueden medir volumen, tiempo ahorrado o errores evitados. Mientras tanto, puede vivir como "Other work" con una línea, no como Selected work.
- **`slicejs-mcp`** — parte del ecosistema Slice.js; va como evidencia dentro de `/slice-js`, no como proyecto separado.
- **`Dynamic-Crud-Generator`** — sin README real ni demo; no está listo.
- **`grpc_microservices` / `BalanceadorGRPC`** — labs pequeños y sin README; no sostienen el claim de sistemas distribuidos.
- **`custom-language-compiler`** — 8 KB y sin documentación; no alcanza.
- **`cicd_aws_flask`** — 16 KB y README de una línea; no alcanza.
- **`sanramonmcbo-webpage`** — ya es Parish Automated Ecosystem.

**Decisión:** mantener 3 casos principales (Slice.js Components, Conclave, Parish). Un cuarto caso solo entra si aporta un problema técnico distinto y evidencia pública de uso/impacto.

---

## 9. Education

Se conserva. Ajustes menores:

- Los seis "View certificate" en acento compiten; pasar a enlace secundario o hacer clickable la card.
- Revisar 22 fuentes <12 px (meta de certificados).
- Mantener búsqueda, paginación, modal y enlace a Drive.
- Se mantiene en la nav: es la página de formación y certificados, no una sección secundaria.

---

## 10. Teaching

Se conserva. Es un diferenciador, pero no un destino primario del nav.

- **Sale de la nav.** Se llega desde About (card Docencia) y, opcionalmente, desde Experience (URU). `/teaching` sigue pública para estudiantes.
- Añadir evidencia: semestres impartidos, número de estudiantes, repositorios.
- "Perfect attendance" ocupa un bloque grande para un dato menor; considerar reemplazarlo por resultados de estudiantes o testimonios.
- Corregir la flecha rota de "View syllabus" (`TeachingIndex.js`).
- Añadir "Ver todos los cursos" si se añaden más.

---

## 11. Slice.js

**Implementado (2026-11-08):** `/slice-js` ya sigue esta estructura. Queda un pulido opcional: añadir el enlace URU junto al de Zenodo en la evidencia.

**Decisión:** se queda como sección propia. Es la obra insignia y el único lugar donde se cruzan las tres dimensiones. Pero cambia de función: deja de ser un manifiesto y pasa a ser **caso de estudio + hub del ecosistema**.

### 11.1 Por qué se queda top-level

- Es la prueba más completa de arquitectura, docencia e investigación en una sola obra.
- El ecosistema (framework, componentes, docs, MCP, paper) no cabe en una card de Projects.
- Un portfolio de arquitectura necesita una obra grande. Projects puede tener 3 casos y Slice ser el cuarto, con más profundidad.
- La regla de marca de Slice ≤20% aplica al feed de contenido, no a la nav del portfolio.

### 11.2 Problema de la vista actual

- Lee como manifiesto de producto, no como evidencia de ingeniería.
- No dice tu rol, el estado, la escala ni qué decisiones tomaste.
- Los cards del ecosistema son una lista de nombres, no un mapa.
- Naming legacy (`slice.js_visual_library`), botones que repiten el nombre, logo 3D recortado.
- Copy: "Slice is born to teach by building" (gramática).

### 11.3 Nueva estructura — enfoque CV

La página debe responder, en orden, las preguntas de un CV técnico: qué es, cuál fue tu rol, qué construiste, qué decisiones tomaste, qué evidencia lo respalda y dónde verlo. Nada de manifiesto.

1. **Hero** — "Slice.js", one-liner, rol/estado ("Creator & maintainer · Open source · 2022 — present"), CTAs: **Read docs** (primario), **GitHub**, **Paper** ([Tecnocientífica URU](https://revistas.fondoeditorial.uru.edu/index.php/tecnocientificauru/article/view/705) · [Zenodo](https://zenodo.org/records/17651991)).
2. **What I built** — índice editorial de 5 filas (runtime, CLI/build, components, docs, MCP), cada una con su enlace. Sin cards y sin repetir los enlaces en otra sección.
3. **Architecture decisions** — tabla de 3 columnas: Decisión / Por qué / Coste. No cards.
4. **Evidence** — banda de métricas (2022, 120+, 4 superficies, v4.2) + lista de pruebas con enlaces (paper, aula, librería, producción).
5. **Status & contribute** — dos columnas de texto, sin card.
6. **Closing** — banda de acento con el lema y los tres CTAs.

**Regla de lectura:** si un bloque no ayuda a responder "¿qué hizo y qué sabe hacer?", se corta.

**Regla visual:** solo el hero y el glance son "cajas". El resto usa lista, tabla, métricas y banda para variar el ritmo. En móvil, la tabla se apila con etiquetas "Por qué" y "Coste", y el logo del hero se reduce a 150 px sin panel propio.

### 11.4 Copy y naming

- Renombrar `slice.js_visual_library` → `slicejs-components` (nombre vigente).
- Botones solo con la acción ("Open docs", "GitHub"), no repetir el nombre del proyecto.
- Corregir "Slice is born to teach by building" → "Slice was built to teach by building."
- Wordmark 3D oculto: el nombre vive en el H1 y el logo queda como slice + marca.

### 11.5 Relación con Projects

- Projects = Slice.js Components, Conclave y Parish.
- **What I built** enlaza directamente a la librería; no hay un hub de ecosistema separado que repita los mismos enlaces.
- El home muestra 4 destacados: Slice.js → `/slice-js`; los otros 3 → `/projects/${slug}`.

---

## 12. Contact

- **Nav:** Contact como último ítem/CTA.
- **CTA del hero:** "Contact" → `/contact`. La página de contacto cierra en LinkedIn.
- **Principio:** **todo el contacto se hace por LinkedIn**. No hay email visible, ni `mailto`, ni formulario.
- **Página:**
  - Título: "Let's talk on LinkedIn." / "Hablemos por LinkedIn."
  - Lede: "I work on distributed architectures, component systems and full-stack products. The fastest way to reach me is LinkedIn."
  - CTA primario y único: **Connect on LinkedIn** → `https://www.linkedin.com/in/vkneider/`.
  - "What I can help with" se conserva.
  - Línea de ubicación: "Maracaibo, Venezuela · Working remotely".
  - Enlace secundario: "View projects" (interno).
- **Eliminar:**
  - El botón "Email me" y todo el `mailto:` de `ContactSection.js`.
  - La entrada `contact.email` y `contact.subject` de `en.json` y `es.json`.
  - El botón "Email" del footer (`Portfolio.js`, `socialData`).
  - `contact.email` de cualquier copia o JSON-LD.
- **Footer:** 3 acciones (LinkedIn, GitHub, CV). El CV sigue al locale; no duplicar EN/ES. Sin "Contact" duplicado: ya está en la nav.

---

## 13. Limpieza de rutas demo

### 13.1 Borrar

| Ruta | Componente | Archivos |
|---|---|---|
| `/charts` | `Charts` | `src/Components/AppComponents/Charts/` |
| `/dompurify` | `DomPurify` | `src/Components/AppComponents/DomPurify/` |
| `/animejs` | `Animations` | `src/Components/AppComponents/Animations/` (no tocar `Service/AnimationsProvider`) |
| `/bare-imports` | `BareImportsDemo` | `src/Components/AppComponents/BareImportsDemo/` |

**Referencias a limpiar:**

- `src/routes.js`: quitar las cuatro rutas.
- `src/Components/components.js`: quitar los cuatro registros.
- `src/public/seo.json`: quitar las cuatro entradas.
- `src/public/sitemap.xml`: regenerar con `slice seo sitemap` (no editar a mano).
- `src/locales/en.json` y `es.json`: quitar `routes.charts`, `routes.dompurify`, `routes.animations`, `routes.bareImports` y sus `seo.descriptions.*`.
- `package.json`: quitar `chart.js`, `d3` y `dompurify` **solo después** de verificar que no se usan en otro sitio. `animejs` se queda (lo usa `AnimationsProvider`).
- Verificar `ImageDemo`: si no está ruteado ni referenciado, borrarlo también.

### 13.2 Conservar

- `/imposter`: se queda. Añadir `robots: false` en `seo.json`, quitar del sitemap, y añadir un enlace "Back to portfolio" dentro del juego (hoy es un dead end sin navbar).
- `/404`: se queda; se mejora (§14).

### 13.3 Verificación

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm test:e2e
slice seo check
```

---

## 14. Footer, badge y 404

- **Badge "Built with Slice.js":** dejar de ser `position: fixed`; moverlo al footer. Hoy tapa la card de Education, el reconocimiento de Teaching y la lista de Projects.
- **Footer:** 3 acciones (LinkedIn, GitHub, CV), una fila en desktop, stack en móvil; copyright en una línea secundaria y, debajo, solo el badge “Built with Slice.js”. Sin “Powered by” duplicado.
- **404 (implementado):**
  - Página standalone, sin navbar/footer global para no mezclar el shell con el fondo de acento.
  - Se quitó la nav duplicada que traía About/Teaching; quedan **Back to home** y **Contact** como únicos CTAs.
  - Los CTAs están centrados, con `flex-wrap` y `white-space: nowrap`, sin solaparse en móvil.
  - CSS encapsulado bajo `slice-notfound`: el naranja es un overlay `position: fixed` que desaparece al navegar. No quedan reglas globales de `body`, `html`, `#app`, `figure` ni `figcaption`.

---

## 15. Accesibilidad y pulido

- **Focus visible:** 9 `outline: none` sin `:focus-visible` (Input, Select, RandomFacts, ImposterGame). Añadir reemplazo.
- **Labels:** `LocaleSwitcher` y `BadgeCarousel` tienen botones sin nombre accesible. Añadir `aria-label`.
- **Contraste:** `#78716C` sobre `#FAF7EE` = 4.48:1 (justo debajo de AA). Usar `--text-2` (#44403C) para meta texto.
- **Tamaño:** 22 textos <12 px. Subir meta labels a 12–13 px.
- **Reduced motion:** las animaciones JS (`AnimationsProvider`) ignoran `prefers-reduced-motion`; añadir guard.
- **`transition: all`:** 41 casos; sustituir por propiedades específicas en los archivos que se toquen.
- **Hit areas:** 44×44 px en controles táctiles (theme, locale, carrusel, modal).
- **Formularios/diálogos:** evitar `alert/confirm/prompt` nativos (7 casos en demos; desaparecen al borrarlas).
- **Prueba de teclado:** tabular todo el sitio, abrir/cerrar modal, cambiar tema e idioma, navegar Projects.

---

## 16. Fases

### Fase 1 — Conversión y credibilidad (P0)

- [x] Contact en la nav + CTA del hero a `/contact`.
- [x] Contact cierra en LinkedIn; eliminar email, `mailto` y footer Email.
- [x] Hero con tabs estáticos Engineering / Teaching / Research (Opción B).
- [x] Lede con el eslogan original; sin línea de identidad duplicada.
- [x] Entrada de Lead Software Engineer (2025) con "Details available on request".
- [x] Borrar las cuatro rutas demo y limpiar referencias.
- [x] `/imposter` con `noindex` + fuera del sitemap.
- [x] Badge al footer.
- [x] 404 con salida.
- [x] Estado activo en la nav (`aria-current="page"`).

**Criterio de aceptación:** un visitante puede llegar a Contact desde cualquier página en un clic; el H1 no cambia; el rol actual aparece; `/charts` y compañía devuelven 404; el sitemap no las incluye; no queda ningún `mailto:` ni botón de email.

**Nota de Fase 1:** Contact se añadió a la nav. Quedan 7 ítems porque About y Teaching siguen presentes; en Fase 2 se quitan ambos y quedan 5, con Education intacta.

### Fase 2 — Evidencia (P1)

- [x] Nav final de 5: quitar **About** (logo = home) y **Teaching**; `aria-current` en logo y enlaces.
- [x] Enlazar `/teaching` desde About (card Docencia) y, opcionalmente, desde Experience (URU) y el footer.
- [x] Projects migrado a main: grid ≤6, destacados + lista >6, carrusel de capturas. Vista vieja retirada.
- [x] Añadir Slice.js Components como caso.
- [x] Reescribir Slice.js como caso: estructura, decisiones y evidencia. (Pendiente: enlace URU del paper.)
- [x] Reordenar Home: trabajo primero; Random Facts fuera.
- [x] Reescribir logros con la regla de §6.3.
- [x] Stats reales (3–4).
- [x] Experience: un solo mecanismo; timeline retirada.

**Criterio de aceptación:** un reclutador puede leer los casos completos (problema, rol, decisiones, resultado) sin scroll anidado; Slice.js se entiende como obra de ingeniería, no como manifiesto; el About abre con trabajo y logros, no con el viaje; Experience tiene un solo mecanismo.

### Fase 3 — Oficio (P2)

- [ ] Encoding/proofread (copy final EN/ES; no se detectaron replacement chars en los JSON).
- [x] Matriz de skills estática (`ToolboxSpec` + `DescriptionList`).
- [x] Footer de 3 acciones + badge, sin "Powered by" duplicado.
- [ ] Accesibilidad: focus, labels, contraste, reduced motion (transiciones y fuentes <12 px cerradas; quedan 3 px del sprite de `NotFound`, intencionales).
- [ ] Slice.js: naming, logo, copy.
- [x] Slice.js: enlace URU del paper (+ Zenodo en la evidencia).
- [ ] Teaching: evidencia + flecha.
- [ ] Education: CTA secundario.

**Pulido 2026-11-09:**

- [x] Selected work: grid visual 3-up sin cards.
- [x] AboutClosing: espacio antes del footer; el reveal ya no deja `translateY` residual.
- [x] Scroll al tope en cada `router:change`.
- [x] Locale dropdown: `placement` configurable y apertura hacia arriba en móvil.
- [x] Carrusel "Beyond the code": 5 imágenes con labels, fechas y alt.
- [x] `ImageCarrousel`: reduced motion, fecha 12 px, transiciones específicas, indicadores con `aria-current` y sin `console.log`.
- [x] Componentes sin uso archivados en `src/Components/Archived/` (no registrados).
- [x] Research: 1 paper publicado (no 3).

---

## 17. Preguntas abiertas

1. **Projects:** confirmar 3 casos (Slice.js Components, Conclave, Parish) y que Slice.js no se duplique como card. La alternativa es 4 cards y Slice.js repetido.
2. **CV:** se mantiene un solo botón que sigue al locale. ¿Correcto?
3. **Año de inicio de Slice.js:** el hero de §11 no fija fecha; si quieres mostrarla, dime el año.

---

## 18. Pendientes de mejora (2026-11-09)

> Revisión hecha con `ux_lint.py` y una pasada por las páginas principales. **No se implementó nada de esta lista**; queda para revisión.

### 18.1 Prioridad

| Prioridad | Pendiente | Evidencia / criterio |
|---|---|---|
| **P0** | Parish tiene solo 2 capturas | El caso promete CMS/ETL y “cero coste”; faltan la hoja de administración/Google Sheets, el flujo ETL y una vista móvil. |
| **P1** | Accesibilidad en componentes activos | `ux_lint.py`: **4 candidatos activos** — 3 px del sprite pixel-art de `NotFound` (intencionales) y 1 falso positivo de `LocaleSwitcher`. **0 `transition: all` y 0 fuentes <12 px de UI real.** |
| **P1** | Foco al cambiar de ruta | Opcional: hoy queda en `<body>`; el scroll se queda como está. |
| **P2** | Teaching y Education | Teaching: flecha/evidencia pendiente. Education: los seis “View certificate” compiten; conviene card clickable o enlace secundario. |
| **P2** | `/projects` con 3 cards en grid de 2 | No se toca: el cuarto proyecto lo balancea. |
| **Excluido** | CV y skill con “3 papers” | Por decisión del autor: no se tocan de momento. El sitio ya dice 1, pero el CV/skill siguen siendo una inconsistencia si alguien los lee. |

### 18.2 Accesibilidad: candidatos activos

Comando usado:

```bash
python ~/.config/opencode/skills/ux-first-design/scripts/ux_lint.py src
```

Resultado: **56 candidatos**. **4 están en componentes activos**; el resto se concentra en `Archived/`, componentes legacy o `/imposter`.

| Archivo | Línea | Regla | Nota |
|---|---:|---|---|
| `NotFound.css` | 15, 92, 97 | `tiny-font` | **Intencional:** `figure` es un sprite pixel-art; el `font-size` es la unidad de dibujo, no texto de UI. |
| `LocaleSwitcher.html` | 2 | `icon-button-label` | **Falso positivo**: `render()` setea `aria-label` en JS. |

Transiciones y fuentes cerradas en los componentes activos:

- **0 `transition: all`** en About, Contact, Experience, ExperienceCard, CertificateCard, StudyCard y NotFound. Se reemplazaron por `transform`, `border-color`, `box-shadow`, `background-color`, `color`.
- **0 fuentes <12 px de UI real** en esos componentes. Las que quedan son los 3 px del sprite de `NotFound` y los elementos archivados/legacy.
- `ImageCarrousel` ya no aparece: reduced motion, fecha 12 px, transiciones específicas, `aria-current` en indicadores y sin logs.

Los **28 `transition-all`**, **9 `outline-removed`**, **4 `tiny-font`**, **2 `icon-button-label`** y **2 `img-alt`** restantes están en `Archived/`, `ImposterGame` o componentes legacy. `ImposterGame` sigue vivo en `/imposter` (noindex); si se considera parte del sitio, hay que corregir esos también.

### 18.3 Fuera de alcance por decisión

- **CV y skill `vkneider-brand`:** siguen diciendo 3 papers. No se tocan hasta que el autor lo pida.
- **VKRAFTS como cuarto caso:** documentado en §8.9. Sin métricas de uso/impacto no entra en Selected work; puede quedar como “Other work” con una línea.
- **Grid de 3 cards en `/projects`:** no se toca; el cuarto proyecto lo balancea.

### 18.4 Lo que está limpio

- **Fechas del carrusel confirmadas:** 2026.
- **`ImageCarrousel`:** autoplay respeta `prefers-reduced-motion`, fecha de 12 px, transiciones específicas, indicadores con `aria-current`/`aria-label` y sin `console.log`.
- **Transiciones y fuentes:** 0 `transition: all` y 0 fuentes <12 px de UI real en componentes activos; el único `tiny-font` restante es el sprite pixel-art de `NotFound`.
- **Paper de Slice.js:** hero, cierre y evidencia apuntan a Tecnocientífica URU; la evidencia enlaza Zenodo.
- **Componentes sin uso archivados:** `ImageDemo`, `MainMenu`, `MyNavigation`, `TeachingSection`, `TechExpertise`, `TechnicalSkillsSection`, `RandomFacts` y `BadgeCarousel` viven en `src/Components/Archived/` y no están registrados.
- No hay `replacement chars` en los JSON de contenido.
- No queda “3 papers” en el contenido público del sitio.
- `pnpm lint`, `pnpm typecheck` y `pnpm build` pasan.
- El carrusel tiene 5 slides, labels/alt correctos y los textos largos hacen wrap sin desbordar en móvil.
- El cierre del About ya no se solapa con el footer y tiene 112 px en desktop / 64 px en móvil.
- **404:** standalone, sin nav duplicada; solo “Back to home” + “Contact”, centrados y sin solape en móvil. CSS encapsulado bajo `slice-notfound`; el overlay naranja desaparece al navegar y el `body` vuelve a su fondo normal.

### 18.5 Orden sugerido

1. **P0 contenido:** capturas de Parish.
2. **P1 accesibilidad restante:** foco al `h1` solo si se decide; el resto (transiciones y fuentes <12 px) ya está cerrado.
3. **P2 evidencia:** Teaching/Education.
4. **P3 limpieza:** mantener `Archived/` fuera del registro y revisar `/imposter` si se considera parte del sitio.

---

## Anexo — Mapa de archivos afectados

| Área | Archivos |
|---|---|
| Nav / shell | `src/Components/AppComponents/Portfolio/Portfolio.js`, `.html` |
| Home / About | `src/Components/AppComponents/AboutSection/AboutSection.js`, `.html`, `.css` |
| Experience | `src/Components/AppComponents/ExperienceSection/ExperienceSection.js`, `src/Components/AtomicAppComponents/ExperienceCard/*`, `src/locales/content/experience.json` |
| Projects | `src/Components/AppComponents/ProjectsSection/*`, `ProjectGrid/*`, `ProjectShowcaseCard/*`, `ProjectCompactList/*`, `ProjectDetail/*`, `src/locales/content/projects.json`, `src/routes.js`, `src/Components/components.js` |
| Contact | `src/Components/AppComponents/ContactSection/*`, `src/Components/AppComponents/Portfolio/Portfolio.js` (footer) |
| Teaching | `src/Components/AppComponents/TeachingIndex/TeachingIndex.js`, `.css`, `src/locales/content/teaching.json` |
| Slice.js | `src/Components/AppComponents/WhatIsSlice/*`, `src/Components/AtomicAppComponents/LogoStage/*` |
| Education | `src/Components/AppComponents/EducationSection/EducationSection.js`, `src/Components/AtomicAppComponents/CertificateCard/*` |
| Demo cleanup | `src/routes.js`, `src/Components/components.js`, `src/public/seo.json`, `src/public/sitemap.xml`, `src/locales/en.json`, `src/locales/es.json`, `package.json` |
| 404 | `src/Components/Visual/NotFound/*`, `src/routes.js` |
| Tokens / a11y | `src/public/Themes/Light.css`, `src/public/Styles/sliceStyles.css`, `src/Components/Visual/*/*.css` |
