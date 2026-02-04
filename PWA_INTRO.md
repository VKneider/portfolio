# PWA 101 (Guia rapida)

Una PWA (Progressive Web App) es una aplicacion web que se comporta como una app instalada: se puede agregar al inicio, funciona offline (parcialmente) y es mas rapida gracias al cache controlado por un service worker.

## Conceptos clave

### 1) Web App Manifest
Un archivo JSON que describe tu app:
- nombre, iconos, color del tema
- modo de visualizacion (standalone, fullscreen)
- URL de inicio

Ejemplo minimo:

```json
{
  "name": "Mi App",
  "short_name": "App",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#1D4ED8",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

### 2) Service Worker (SW)
Un script que corre en segundo plano y puede:
- cachear archivos
- interceptar requests
- servir contenido offline
- manejar notificaciones push (opcional)

El SW no se ejecuta en la pagina misma; es un proceso separado y con reglas estrictas (HTTPS requerido).

### 3) Cache y estrategias
Tu decides que cachear y como:
- **precache**: recursos esenciales (app shell)
- **runtime cache**: cache al vuelo de recursos usados

Estrategias comunes:
- **cache-first**: primero cache, luego red
- **network-first**: primero red, fallback a cache
- **stale-while-revalidate**: sirve cache y actualiza en segundo plano

## Como funciona en la practica
1. El navegador descarga tu sitio.
2. Registras el SW desde JS.
3. El SW instala y guarda recursos en cache.
4. En visitas siguientes, el SW intercepta y responde desde cache si aplica.
5. Si el manifest esta presente y el sitio es instalable, el navegador ofrece "Instalar".

## Requisitos para instalar
- HTTPS en produccion
- manifest valido
- service worker registrado
- iconos correctos

## Buenas practicas
- Precachea solo lo esencial (entrypoint + CSS + manifest + iconos).
- Usa runtime caching para imagenes y componentes que se cargan bajo demanda.
- Versiona el cache para poder invalidar (ej. `cache-v2`).
- No caches datos sensibles.

## Debug y herramientas
- Chrome DevTools > Application > Service Workers
- Cache Storage para ver recursos cacheados
- Lighthouse para validar PWA

## Pitfalls comunes
- Cambiar archivos pero no versionar el cache (el usuario ve versiones viejas).
- Caches demasiado grandes (lento y poco confiable).
- Olvidar el `start_url` o iconos.
- Intentar usar SW en HTTP (no funciona fuera de localhost).

## Flujo basico de registro

```js
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}
```

## Conclusiones
Una PWA es una web con manifest + service worker. No necesitas cambiar tu framework; solo agregar estos archivos y definir una estrategia de cache correcta.
