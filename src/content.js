// All site content lives here. Edit this file to update the website —
// no need to touch the components.

export const profile = {
  name: 'Vincent Kempers',
  role: 'Support Engineer & Senior Front-end Developer',
  location: 'Amsterdam, NL',
  avatar: 'avatar.png', // file in /public
  intro: [
    "I help people get unstuck. As a Support Engineer I dig into bugs, reproduce edge cases and turn confusing problems into clear answers.",
    "Before that I spent years as a Senior Front-end Developer building fast, accessible interfaces with Vue, React and friends — so I still speak fluent browser.",
  ],
}

// Newest first. `period` is free text, e.g. '2022 — Now'.
// `url` is optional — leave it empty and the row renders without a link.
export const experience = [
  {
    period: '2023 — Now',
    role: 'Support Engineer',
    company: 'Directus',
    url: 'https://directus.io',
    description: 'Remote, at Monospace Inc. Helping developers and customers get the most out of Directus: debugging, reproducing issues and working closely with engineering on fixes. Day to day in JavaScript and Vue.js.',
  },
  {
    period: '2022 — 2023',
    role: 'Web Developer',
    company: 'usmedia',
    url: 'https://www.usmedia.nl/',
    description: 'Building websites and web applications in Amsterdam with JavaScript, SASS, Wordpress, AngularJS and Tailwind.',
  },
  {
    period: '2020 — 2022',
    role: 'Senior Web Developer',
    company: 'Vriend van de Show',
    url: 'https://vriendvandeshow.nl/',
    description: 'Owned the front end: Vue, Nuxt, GraphQL, Tailwind, TypeScript and React Native. Did code reviews and releases, improved accessibility and built web animations with GSAP and Anime.js.',
  },
  {
    period: '2019 — 2020',
    role: 'Graduation project',
    company: 'Bibliotheek Kennemerwaard',
    url: '',
    description: 'Digital inclusion: designing tools in Figma that help people with low literacy become more self-reliant.',
  },
  {
    period: '2019',
    role: 'Front-end Web Developer',
    company: 'Atabix Solutions',
    url: 'https://www.atabix.nl/',
    description: 'Started as an intern, then built websites and web tools for a range of clients with Vue.js, JavaScript and TypeScript.',
  },
  {
    period: '2016 — 2017',
    role: 'Web Developer',
    company: 'Occhio',
    url: '',
    description: 'First web developer job: HTML, CSS, SASS, JavaScript, PHP and Node.js.',
  },
]

export const stack = [
  'HTML', 'CSS', 'JavaScript', 'TypeScript', 'Vue.js', 'Nuxt',
  'React', 'Angular', 'Tailwind CSS', 'Accessibility', 'Git', 'Debugging',
]

export const projects = [
  {
    title: 'ARquaponics',
    description: 'Augmented-reality dashboard for an aquaponics farm at De Ceuvel, Amsterdam.',
    tags: ['Vue.js', 'AR', 'D3'],
    url: 'https://github.com/VincentKempers/arquaponics',
  },
  {
    title: 'The Fame of Cold Reading',
    description: 'A data-driven story visualising the popularity of cold reading.',
    tags: ['Data viz', 'JavaScript'],
    url: 'https://vincentkempers.github.io/sfd-dataviz/',
  },
  {
    title: 'GobbieGobGoo Syntax',
    description: 'A colourful syntax theme for the Atom editor — almost 10k downloads.',
    tags: ['Theme', 'Atom'],
    url: 'https://github.com/VincentKempers/gobbie-gob-goo-syntax',
  },
  {
    title: 'Van Gogh app',
    description: 'van Gogh museum complete package for data analyzation.',
    tags: ['Node.js', 'CLI'],
    url: 'https://github.com/VincentKempers/van-gogh-app',
  },
]

export const writing = [
  {
    title: 'Research about ReactJS vs VueJS',
    url: 'https://medium.com/@vincentkempers_/research-about-reactjs-vs-vuejs-aced0677f940',
  },
  {
    title: 'Accessibility tools',
    url: 'https://medium.com/@vincentkempers_/accessibility-tools-afd7a341ceb8',
  },
  {
    title: 'My experience at NLHTML5 x CSSDay',
    url: 'https://medium.com/@vincentkempers_/my-experience-at-nlhtml5-x-cssday-df855997a191',
  },
  {
    title: 'The hack-sprint-a-thon',
    url: 'https://medium.com/@vincentkempers_/the-hack-sprint-athon-5a0206595d34',
  },
]

export const contact = {
  email: 'vincent.kempers@yahoo.com',
  links: [
    { label: 'GitHub', url: 'https://github.com/VincentKempers' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/vincent-kempers-521182106/' },
    { label: 'Medium', url: 'https://medium.com/@vincentkempers_' },
  ],
}
