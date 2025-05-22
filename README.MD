# PortfolioVK2

Este proyecto es un portafolio personal desarrollado con [Slice.js](https://www.npmjs.com/package/slicejs-web-framework) y Node.js, que muestra información sobre experiencia, educación, proyectos y más. Incluye un backend Express para servir archivos estáticos y una arquitectura modular para componentes visuales y de servicio.

## Estructura del Proyecto

```
api/                # Backend Express para servir archivos y endpoints
src/
  App/              # Archivos principales de la aplicación (HTML, JS, CSS)
  Components/       # Componentes visuales y de servicio
  images/           # Imágenes y recursos gráficos
  Styles/           # Hojas de estilo CSS
  Themes/           # Temas de la aplicación
  routes.js         # Definición de rutas de la app
  sliceConfig.json  # Configuración de Slice.js y la app
package.json        # Dependencias y scripts del proyecto
README.MD           # Este archivo
```

## Instalación

1. Clona el repositorio:
   ```sh
   git clone https://github.com/tuusuario/PortfolioVK2.git
   cd PortfolioVK2
   ```

2. Instala las dependencias:
   ```sh
   npm install
   ```

## Uso

1. Inicia el servidor de desarrollo:
   ```sh
   npm start
   ```
   El backend Express servirá la aplicación en [http://localhost:3001](http://localhost:3001).

2. Accede a la aplicación en tu navegador:
   ```
   http://localhost:3001
   ```

## Características

- **Frontend modular**: Componentes organizados en `/Components/AppComponents` y `/Components/Service`.
- **Temas y estilos**: Gestión de temas y estilos desde `/Themes` y `/Styles`.
- **Service Worker**: Implementación de cacheo de recursos para soporte offline.
- **Configuración centralizada**: Parámetros de rutas, temas, estilos y logging en `src/sliceConfig.json`.
- **Backend Express**: Sirve archivos estáticos y endpoints personalizados.

## Scripts

- `npm start`: Inicia el servidor Express en modo desarrollo.
- `npm run build`: (Si aplica) Construye la aplicación para producción.

## Personalización

- Modifica `src/sliceConfig.json` para cambiar rutas, temas, estilos y opciones de logging.
- Agrega o edita componentes en `src/Components/AppComponents` y `src/Components/Service`.

## Créditos

- [Slice.js Web Framework](https://www.npmjs.com/package/slicejs-web-framework)
- Desarrollado por vkneider

---