/**
 * Education data — only credentials backed by a real document.
 *
 * Every certificate below has a public Google Drive file. The `certificateUrl`
 * opens the document in Drive; `previewUrl` is the same file rendered by
 * Drive's preview, used by the in-page modal.
 */

export const studiesData = [
  {
    id: 1,
    institution: 'Universidad Rafael Urdaneta (URU)',
    degree: 'Computer Engineering',
    period: '2020 - 2024',
    location: 'Maracaibo, Venezuela',
    description: 'Bachelor\'s degree in Computer Engineering with focus on software development, algorithms, data structures, and system design. Graduated Magna Cum Laude with academic honors.',
    achievements: [
      'Graduated Magna Cum Laude with academic honors',
      'Maintained excellent academic performance throughout the program',
      'Developed expertise in modern web technologies and framework development',
      'Created Slice.js framework as part of academic and research work',
      'Recognized for outstanding academic achievement and technical innovation'
    ],
    coursework: [
      'Programming Fundamentals',
      'Data Structures and Algorithms',
      'Software Engineering',
      'Database Systems',
      'Web Development Technologies',
      'Computer Networks',
      'Systems Analysis and Design',
      'Component-Based Programming'
    ],
    logo: '/images/uru-logo-seo.png'
  }
];

export const certificatesData = [
  {
    id: 1,
    title: 'Specialist in Higher Education Didactics',
    issuer: 'World Association for Curriculum Quality (WACQ)',
    date: '2025-08-01',
    validUntil: '2027-08-01',
    credentialId: 'TME-2025-1001',
    category: 'Teaching',
    description: 'International credential in higher-education didactics: planning, delivering and assessing learning experiences. Level 4, aligned with the European Qualifications Framework.',
    skills: [
      'Higher Education Didactics',
      'Curriculum Design',
      'Learning Assessment',
      'Instructional Planning'
    ],
    certificateUrl: 'https://drive.google.com/file/d/1JC8eISjk7FPtkfbUr2Fxgh9f523LLPV3/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1JC8eISjk7FPtkfbUr2Fxgh9f523LLPV3/preview',
    thumbnail: '/images/certificates/didactica-superior.webp',
    // Drive's embedded viewer ignores this PDF's page rotation; show the
    // already-corrected local preview instead.
    previewMode: 'image'
  },
  {
    id: 2,
    title: 'Advanced Artificial Intelligence II',
    issuer: 'Universidad Rafael Urdaneta',
    date: '2024-10-25',
    credentialId: null,
    category: 'AI',
    description: 'Advanced Artificial Intelligence course (Level II) taught by the School of Computer Engineering at Universidad Rafael Urdaneta.',
    skills: [
      'Artificial Intelligence',
      'Applied AI',
      'Computer Engineering'
    ],
    certificateUrl: 'https://drive.google.com/file/d/1UJL_tBguOap__eg8i82vk1BqM7_aPsI_/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1UJL_tBguOap__eg8i82vk1BqM7_aPsI_/preview',
    thumbnail: '/images/certificates/ia-avanzada-ii.webp',
    previewMode: 'image'
  },
  {
    id: 3,
    title: 'Fullstack Developer',
    issuer: 'Social Oplesk',
    date: '2022-10-02',
    credentialId: '7349b616-9209-4030-9a17-3b42dd2a9d4c',
    category: 'Development',
    description: 'Fullstack Developer program covering frontend, backend, APIs and databases.',
    skills: [
      'Full-Stack Development',
      'JavaScript',
      'Node.js',
      'Web APIs',
      'Database Design'
    ],
    certificateUrl: 'https://drive.google.com/file/d/1x5nw0Q46GwjZ1H9kmCyR5Uy2nKaY_YGo/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1x5nw0Q46GwjZ1H9kmCyR5Uy2nKaY_YGo/preview',
    thumbnail: '/images/certificates/fullstack-social-oplesk.webp'
  },
  {
    id: 4,
    title: 'ChatBOT Hackathon',
    issuer: 'Social Oplesk',
    date: '2022-07-07',
    credentialId: null,
    category: 'Award',
    description: 'Second place in the ChatBOT development hackathon, awarded by Social Oplesk.',
    skills: [
      'Chatbot Design',
      'Conversational UX',
      'JavaScript',
      'Problem Solving'
    ],
    certificateUrl: 'https://drive.google.com/file/d/1iYamX1jyia5xD99vpKMD9CW0qufpH4Fr/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1iYamX1jyia5xD99vpKMD9CW0qufpH4Fr/preview',
    thumbnail: '/images/certificates/hackathon-chatbot.webp'
  },
  {
    id: 5,
    title: 'Catholic Leadership Workshop',
    issuer: 'Acción Católica de Venezuela',
    date: '2022-07-16',
    credentialId: null,
    category: 'Leadership',
    description: 'First Catholic Leadership Workshop in Maracaibo, focused on community service, teamwork and ethical leadership.',
    skills: [
      'Leadership',
      'Community Service',
      'Teamwork',
      'Ethics'
    ],
    certificateUrl: 'https://drive.google.com/file/d/1FGDe_Ln5LL4PBihx9ctwG4AOJuUQlQ52/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1FGDe_Ln5LL4PBihx9ctwG4AOJuUQlQ52/preview',
    thumbnail: '/images/certificates/taller-liderazgo.webp'
  },
  {
    id: 6,
    title: 'Advanced English (C1)',
    issuer: 'Centro Electrónico de Idiomas',
    date: '2020-11-13',
    grade: '92/100',
    credentialId: '027961',
    category: 'Languages',
    description: 'Advanced (C1) English program for adults, completed with a grade of 92/100.',
    skills: [
      'Advanced English (C1)',
      'Academic Writing',
      'Professional Communication',
      'Presentations'
    ],
    certificateUrl: 'https://drive.google.com/file/d/1x_bAaCNxbQudf2urIgOPsHNpGqx1Ai_k/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1x_bAaCNxbQudf2urIgOPsHNpGqx1Ai_k/preview',
    thumbnail: '/images/certificates/english-c1.webp'
  }
];
