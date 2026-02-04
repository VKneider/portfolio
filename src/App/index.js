import Slice from '/Slice/Slice.js';

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
