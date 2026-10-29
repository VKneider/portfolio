import Slice from '/Slice/Slice.js';

const brandTitle = 'Victor Kneider — Software Design & Architecture';

function applyTitle(metadata) {
   const key = metadata?.titleKey;
   const title = key ? slice.t(key) : metadata?.title;
   const brand = slice.t('brand.title') || brandTitle;
   document.title = title ? `${title} | ${brand}` : brand;
}

slice.router.afterEach((to) => {
   // The /teaching routes own their document.title from the component that renders
   // them (TeachingIndex / TeachingCourse). This entry module must not import the
   // course data: App/index.js belongs to no route bundle, so a relative import
   // survives the build as a runtime request to /Components/**, which the
   // production server does not serve.
   if (to.path === '/teaching' || to.path.startsWith('/teaching/')) return;
   applyTitle(to.metadata);
});

// The router re-applies the route metadata on a locale change; the brand suffix is
// localized here, after the router has written the route title.
slice.translator.watch(() => {
   if (slice.path === '/teaching' || slice.path.startsWith('/teaching/')) return;
   applyTitle(slice.router.activeMetadata);
});

if ('serviceWorker' in navigator) {
   window.addEventListener('load', () => {
      navigator.serviceWorker
         .register('/service-worker.js')
         .then(() => {
            // Service Worker registered
         })
         .catch(() => {
            // Service Worker registration failed
         });
   });
}
