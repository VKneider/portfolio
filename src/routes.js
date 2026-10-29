const routes = [
   // Portfolio routes
   { path: '/', component: 'Portfolio', metadata: { titleKey: 'routes.about' } },
   { path: '/charts', component: 'Charts', metadata: { titleKey: 'routes.charts' } },
   { path: '/dompurify', component: 'DomPurify', metadata: { titleKey: 'routes.dompurify' } },
   { path: '/animejs', component: 'Animations', metadata: { titleKey: 'routes.animations' } },
   { path: '/bare-imports', component: 'BareImportsDemo', metadata: { titleKey: 'routes.bareImports' } },
   { path: '/experience', component: 'Portfolio', metadata: { titleKey: 'routes.experience' } },
   { path: '/education', component: 'Portfolio', metadata: { titleKey: 'routes.education' } },
   { path: '/slice-js', component: 'Portfolio', metadata: { titleKey: 'routes.slice' } },
   { path: '/projects', component: 'Portfolio', metadata: { titleKey: 'routes.projects' } },
   { path: '/contact', component: 'Portfolio', metadata: { titleKey: 'routes.contact' } },
   { path: '/teaching', component: 'Portfolio', metadata: { titleKey: 'routes.teaching' } },
   { path: '/teaching/${slug}', component: 'Portfolio', metadata: { title: 'Course | Teaching' } },
   { path: '/imposter', component: 'TheImposterGame', metadata: { titleKey: 'routes.imposter' } },

   // Error routes
   { path: '/404', component: 'NotFound', metadata: { titleKey: 'routes.notFound' } }
];

export default routes;
