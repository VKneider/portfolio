const projectsData = [
         {
            id: 1,
            title: 'Slice.js Framework',
            description: 'A dedicated Custom Web Component framework built to master the fundamentals of modern frontend architecture. Features a reactive state system without VDOM overhead, scoped styling, and a component-based dependency injection system. Includes a custom CLI for scaffolding and bundling, proving that you don\'t need React to build complex, scalable applications.',
            image: 'https://raw.githubusercontent.com/VKneider/slice.js/refs/heads/master/readme_images/screenshot.JPG',
            images: [
                'https://raw.githubusercontent.com/VKneider/slice.js/refs/heads/master/readme_images/screenshot.JPG',
                './images/projects/slice2.png',
                'https://raw.githubusercontent.com/VKneider/slice.js/refs/heads/master/readme_images/code-example.JPG' 
            ],
            technologies: ['JavaScript', 'Web Components', 'CSS3', 'HTML5'],
            category: 'Framework',
            status: 'Active',
            githubUrl: 'https://github.com/vkneider/slice.js',
            liveUrl: 'https://slice-js-demo.vercel.app',
            featured: true,
            date: '2024-01-15'
         },
         {
            id: 2,
            title: 'Parish Automated Ecosystem',
            description: 'Zero-cost digital ecosystem for San Ramón Nonato Parish. Engineered an automated content pipeline using Google Sheets/Forms as a Headless CMS. Custom ETL scripts transform administration data into a performant web experience, streamlining information flow for parish groups without recurring costs.',
            image: './images/projects/sanramonmcbo.png',
            images: [
                './images/projects/sanramonmcbo.png',
                './images/projects/sanramonmcbo2.png'
            ],
            technologies: ['Google Apps Script', 'Process Automation', 'ETL Pipelines', 'Cost Optimization', 'Vercel'],
            category: 'Engineering & Automation',
            status: 'Live',
            liveUrl: 'https://sanramonmcbo.vercel.app',
            featured: true,
            date: '2024-06-01'
         }
      ];

export default projectsData;