import Slice from '/Slice/Slice.js';

const brandTitle = 'Victor Kneider — Software Design & Architecture';

slice.router.afterEach((to) => {
   // The /teaching routes own their document.title from the component that renders
   // them (TeachingIndex / TeachingCourse). This entry module must not import the
   // course data: App/index.js belongs to no route bundle, so a relative import
   // survives the build as a runtime request to /Components/**, which the
   // production server does not serve.
   if (to.path === '/teaching' || to.path.startsWith('/teaching/')) return;

   document.title = to.metadata?.title
      ? `${to.metadata.title} | ${brandTitle}`
      : brandTitle;
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
