const routes = [
   // Portfolio routes
   { path: '/', component: 'Portfolio', metadata: { title: 'About' } },
   { path: '/charts', component: 'Charts', metadata: { title: 'Charts' } },
   { path: '/dompurify', component: 'DomPurify', metadata: { title: 'DOMPurify' } },
   { path: '/animejs', component: 'Animations', metadata: { title: 'Animations' } },
   { path: '/bare-imports', component: 'BareImportsDemo', metadata: { title: 'Bare Imports' } },
   { path: '/experience', component: 'Portfolio', metadata: { title: 'Experience' } },
   { path: '/education', component: 'Portfolio', metadata: { title: 'Education' } },
   { path: '/slice-js', component: 'Portfolio', metadata: { title: 'Slice.js' } },
   { path: '/projects', component: 'Portfolio', metadata: { title: 'Projects' } },
   { path: '/teaching', component: 'Portfolio', metadata: { title: 'Teaching' } },
   { path: '/teaching/${slug}', component: 'Portfolio', metadata: { title: 'Course | Teaching' } },
   { path: '/imposter', component: 'TheImposterGame', metadata: { title: 'The Imposter Game' } },
   
   // Error routes
   { path: '/404', component: 'NotFound', metadata: { title: 'Not Found' } }
];

export default routes;
