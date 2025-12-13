import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Youness",
  lastName: "Eddabachi",
  name: `Youness Eddabachi`,
  role: "Développeur Web/Product Designer",
  avatar: "/images/profile-photo.jpg",
  email: "yeddabachi@gmail.com",
  location: "Europe/Paris", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["Français", "Anglais", "Arabe"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/YoungNess",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/youness-eddabachi",
    essential: true,
  },
  {
    name: "Portfolio",
    icon: "globe",
    link: "https://youness-cool-site-abcda.webflow.io",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Étudiant en informatique passionné par le développement web et le design</>,
  featured: {
    display: false,
  },
  subline: (
    <>
      Je suis Youness, étudiant en <Text as="span" size="xl" weight="strong">BUT MMI</Text>, passionné par le développement web <br /> et le product design. Je crée des expériences utilisateur intuitives et modernes.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Étudiant en BUT Métiers du Multimédia et de l'Internet, je suis passionné par le design graphique,
        le développement web et la communication digitale. Mon parcours m'a permis d'acquérir une solide
        expertise dans ces domaines, que ce soit en créant des visuels marquants, en développant des sites
        web performants, ou en concevant des stratégies digitales efficaces.
        <br /><br />
        Mon approche est simple : allier créativité et rigueur pour produire des résultats qui dépassent
        les attentes. Curieux et toujours en quête de nouveaux défis, je cherche constamment à affiner mes
        compétences, que ce soit à travers le développement de nouveaux projets ou l'exploration de nouveaux
        outils comme le motion design.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "ECS Expertise Création Société",
        timeframe: "2025",
        role: "Développeur Web/CM - Stage",
        achievements: [
          <>
            Création et développement d'un site vitrine pour l'entreprise avec une approche SEO optimisée.
          </>,
          <>
            Conception et intégration d'une page vitrine SEO pour chaque réseau social.
          </>,
          <>
            Développement complet d'un site international (HTML, CSS, JavaScript).
          </>,
          <>
            Création et montage de vidéos promotionnelles pour les réseaux sociaux.
          </>,
          <>
            Gestion de la communication digitale et optimisation de projets web.
          </>,
        ],
        images: [],
      },
      {
        company: "Paris Com SUP (1 mois)",
        timeframe: "2024",
        role: "Développeur Web/CM",
        achievements: [
          <>
            Création de contenus graphiques avec la Suite Adobe (Photoshop, Illustrator).
          </>,
          <>
            Conception et développement d'un site web en HTML et JavaScript.
          </>,
          <>
            Gestion de la communication digitale, création de contenus engageants et analyse des performances.
          </>,
          <>
            Collaboration avec des équipes pour l'optimisation des compétences techniques et organisationnelles.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Formation",
    institutions: [
      {
        name: "BUT MMI - Université Gustave Eiffel",
        description: <>Bachelor Universitaire de Technologie - Métiers du Multimédia et de l'Internet (2019-2021)</>,
      },
      {
        name: "BAC Technologique STI2D - Lycée Condorcet Montreuil",
        description: <>Baccalauréat Sciences et Technologies de l'Industrie et du Développement Durable (2020-2023)</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Compétences",
    skills: [
      {
        title: "UI/UX Design - Figma",
        description: (
          <>Conception d'interfaces utilisateur intuitives et modernes avec Figma.</>
        ),
        tags: [
          {
            name: "Figma",
            icon: "figma",
          },
        ],
        images: [],
      },
      {
        title: "Développement Web",
        description: (
          <>Développement d'applications web avec HTML, CSS, JavaScript, PHP, Spring Boot, Angular, et React Native.</>
        ),
        tags: [
          {
            name: "HTML",
          },
          {
            name: "CSS",
          },
          {
            name: "JavaScript",
            icon: "javascript",
          },
          {
            name: "PHP",
          },
          {
            name: "Spring Boot",
          },
          {
            name: "Angular",
          },
          {
            name: "React Native",
          },
        ],
        images: [],
      },
      {
        title: "Suite Adobe",
        description: (
          <>Maîtrise d'After Effects, Photoshop, et InDesign pour la création de contenus visuels.</>
        ),
        tags: [
          {
            name: "After Effects",
          },
          {
            name: "Photoshop",
          },
          {
            name: "InDesign",
          },
        ],
        images: [],
      },
      {
        title: "Bases de données",
        description: (
          <>Gestion et manipulation de bases de données MySQL.</>
        ),
        tags: [
          {
            name: "MySQL",
          },
        ],
        images: [],
      },
      {
        title: "3D Blender",
        description: (
          <>Création de modèles 3D et animations avec Blender.</>
        ),
        tags: [
          {
            name: "Blender",
          },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Design UI/UX – ${person.name}`,
  description: `Projets de design d'interface et d'expérience utilisateur par ${person.name}`,
  projects: [
    {
      name: "Projet BEEP",
      description: "Maquette de site d'auto-école - Design UI/UX pour une plateforme de vérification de résultats de permis de conduire",
      images: [
        {
          src: "/images/gallery/beep-1.png",
          alt: "BEEP - Page d'accueil avec vérification des résultats de test en ligne",
          orientation: "horizontal",
        },
        {
          src: "/images/gallery/beep-2.png",
          alt: "BEEP - Section commentaires de candidats satisfaits avec étoiles",
          orientation: "horizontal",
        },
        {
          src: "/images/gallery/beep-3.png",
          alt: "BEEP - Guide des 3 étapes pour accéder aux résultats",
          orientation: "horizontal",
        },
        {
          src: "/images/gallery/beep-4.png",
          alt: "BEEP - Footer avec newsletter et liens utiles",
          orientation: "horizontal",
        },
        {
          src: "/images/gallery/beep-5.png",
          alt: "BEEP - Page Notre Mission expliquant l'objectif de la plateforme",
          orientation: "horizontal",
        },
        {
          src: "/images/gallery/beep-6.png",
          alt: "BEEP - Dashboard candidat avec taux de réussite et liste des sessions",
          orientation: "horizontal",
        },
      ],
    },
    {
      name: "Projet ECS",
      description: "Site web pour ECS (Expertise Création Société) - Plateforme d'expertise et comptabilité au Maroc",
      images: [
        {
          src: "/images/gallery/ecs-1.png",
          alt: "ECS - Page d'accueil avec slogan 'Votre Partenaire en Expertise & Comptabilité au Maroc'",
          orientation: "horizontal",
        },
        {
          src: "/images/gallery/ecs-2.png",
          alt: "ECS - Section services avec création d'entreprise et comptabilité simplifiée",
          orientation: "horizontal",
        },
        {
          src: "/images/gallery/ecs-3.png",
          alt: "ECS - Présentation des services d'accompagnement pour la création d'entreprise",
          orientation: "horizontal",
        },
        {
          src: "/images/gallery/ecs-4.png",
          alt: "ECS - Section tarification avec message '100% Transparence'",
          orientation: "horizontal",
        },
        {
          src: "/images/gallery/ecs-5.png",
          alt: "ECS - Avantages adaptés à ECS Maroc avec transparence et support personnalisé",
          orientation: "horizontal",
        },
      ],
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
