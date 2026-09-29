import Slice from '/Slice/Slice.js';
import { teachingData } from '../Components/AppComponents/TeachingIndex/data/teaching.js';

const brandTitle = 'Victor Kneider — Software Design & Architecture';
const courseBySlug = new Map(teachingData.courses.map((course) => [course.slug, course]));

slice.router.afterEach((to) => {
   if (to.path === '/teaching') {
      document.title = `Teaching | ${brandTitle}`;
      return;
   }

   if (to.path.startsWith('/teaching/')) {
      const course = courseBySlug.get(to.params?.slug);
      document.title = course
         ? `${course.name} | Teaching | ${brandTitle}`
         : `Course Not Found | Teaching | ${brandTitle}`;
      return;
   }

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
