const skillsData = [
  {
    icon: "assets/imgs/Skills/Property 1=HTML.png",
    names: { en: "HTML", de: "HTML" }
  },
  {
    icon: "assets/imgs/Skills/Property 1=CSS.png",
    names: { en: "CSS", de: "CSS" }
  },
  {
    icon: "assets/imgs/Skills/Property 1=JavaScript.png",
    names: { en: "JavaScript", de: "JavaScript" }
  },
  {
    icon: "assets/imgs/Skills/Property 1=Firebase.png",
    names: { en: "Firebase", de: "Firebase" }
  },
  {
    icon: "assets/imgs/Skills/Property 1=Git.png",
    names: { en: "Git", de: "Git" }
  },
  {
    icon: "assets/imgs/Skills/Property 1=Rest-Api.png",
    names: { en: "REST-API", de: "REST-API" }
  },
  {
    icon: "assets/imgs/Skills/Property 1=Scrum.png",
    names: { en: "Scrum", de: "Scrum" }
  },
  {
    icon: "assets/imgs/Skills/Property 1=GrowthMindset.png",
    names: { en: "Growth mindset", de: "Growth Mindset" },
    modifier: "growth-mindset",
    hoverHeadline: {
      en: "I have a special interest in learning",
      de: "Ich habe besonderes Interesse daran zu lernen"
    },
    hoverSkills: [
      { label: "React", icon: "react", shortLabel: "Re" },
      { label: "Vue Js", icon: "vue", shortLabel: "Vue" }
    ]
  }
];

const projectsData = [
  {
    identifier: "join",
    title: { en: "Join", de: "Join" },
    stack: ["CSS", "HTML", "Firebase", "Angular", "TypeScript"],
    githubUrl: "https://github.com/",
    liveUrl: "https://deine-live-url.de/",
    preview: {
      type: "image",
      src: "assets/imgs/projects/Rectangle 30.png",
      alt: { en: "Join project preview", de: "Join Projektvorschau" }
    },
    overlayQuestion: {
      en: "What is this project about?",
      de: "Worum geht es in diesem Projekt?"
    },
    description: {
      en: "Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.",
      de: "Task-Manager inspiriert vom Kanban-System. Erstelle und organisiere Aufgaben per Drag-and-Drop, weise Nutzer und Kategorien zu."
    }
  },
  {
    identifier: "el-pollo-loco",
    title: { en: "El Pollo Loco", de: "El Pollo Loco" },
    stack: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/",
    liveUrl: "https://deine-live-url.de/",
    preview: {
      type: "image",
      src: "assets/imgs/projects/El Pollo.png",
      alt: { en: "El Pollo Loco project preview", de: "El Pollo Loco Projektvorschau" }
    },
    overlayQuestion: {
      en: "What is this project about?",
      de: "Worum geht es in diesem Projekt?"
    },
    description: {
      en: "Two-dimensional browser game with object oriented JavaScript, collision logic and responsive canvas handling.",
      de: "Zweidimensionales Browser-Game mit objektorientiertem JavaScript, Kollisionslogik und responsivem Canvas-Handling."
    }
  },
  {
    identifier: "memory-game",
    title: { en: "Memory", de: "Memory" },
    stack: ["Angular", "Firebase", "TypeScript"],
    githubUrl: "https://github.com/",
    liveUrl: "https://deine-live-url.de/",
    preview: {
      type: "text",
      text: { en: "Stay tuned", de: "Stay tuned" }
    },
    overlayQuestion: {
      en: "What is this project about?",
      de: "Worum geht es in diesem Projekt?"
    },
    description: {
      en: "Classic memory game implemented in Angular with a Firebase backend, featuring user authentication and real-time score tracking.",
      de: "Klassisches Memory-Spiel in Angular mit Firebase-Backend, Nutzer-Authentifizierung und Echtzeit-Score-Tracking."
    }
  }
];

const referencesData = [
  {
    text: {
      en: "Florian has proven to be a reliable group partner. His technical skills and proactive approach were crucial to the success of our project.",
      de: "Florian hat sich als zuverlässiger Gruppenpartner bewiesen. Seine technischen Fähigkeiten und seine proaktive Art waren entscheidend für den Erfolg unseres Projekts."
    },
    author: { en: "H. Janisch - Team Partner", de: "H. Janisch - Teampartner" }
  },
  {
    text: {
      en: "I had the good fortune of working on a project with Florian. He always stayed calm, focused and supportive, and he made teamwork feel easy and productive.",
      de: "Ich hatte das Glück, mit Florian an einem Projekt zu arbeiten. Er blieb immer ruhig, fokussiert und unterstützend, wodurch die Zusammenarbeit angenehm und produktiv war."
    },
    author: { en: "Developer Akademie - Team Project", de: "Developer Akademie - Teamprojekt" }
  },
  {
    text: {
      en: "Working with Florian was a great experience. He communicated clearly, kept the team aligned and delivered thoughtful frontend solutions.",
      de: "Die Zusammenarbeit mit Florian war eine tolle Erfahrung. Er kommunizierte klar, hielt das Team auf Kurs und lieferte durchdachte Frontend-Lösungen."
    },
    author: { en: "T. Schulz - Frontend Developer", de: "T. Schulz - Frontend Entwickler" }
  }
];

const languageSwitchImages = {
  en: {
    default: "assets/imgs/header/3. Language switch.png",
    hover: "assets/imgs/Header/Property 1=Default hover.png"
  },
  de: {
    default: "assets/imgs/Header/Property 1=Deutsch.png",
    hover: "assets/imgs/Header/Property 1=Deutsch hover.png"
  }
};

const pageTranslations = {
  en: {
    lang: "en",
    header: {
      switchLabel: "Switch language to German",
      navLabel: "Main navigation",
      about: "About me",
      skills: "Skills",
      projects: "Projects"
    },
    hero: {
      role: "Frontend Developer",
      buttons: ["Check my work", "Contact me"],
      arrowLabel: "Scroll to next section",
      ticker: [
        "Based in Rosenheim",
        "Open to work",
        "Available for remote work",
        "Frontend Developer"
      ]
    },
    about: {
      imageAlt: "Portfolio owner",
      eyebrow: "Who I Am",
      title: "About me",
      intro: "Hey there, I’m Florian. I build modern frontend interfaces with a clean structure, strong visual consistency and a focus on smooth user interaction.",
      items: [
        "I am based in Rosenheim and available for remote work.",
        "I enjoy learning new technologies and continuously improving my frontend workflow, code quality and design sense.",
        "I work in a structured, solution-oriented way and turn complex requirements into clear, thoughtful digital experiences."
      ]
    },
    skills: {
      eyebrow: "Technologies",
      title: "Skill Set",
      text: "I build responsive frontend solutions with semantic HTML, scalable styling, reusable components and an open mindset for new tools and workflows.",
      subtitle: "You need <span>another skill?</span>",
      smallText: "Feel free to contact me. I look forward to expanding my previous knowledge.",
      button: "Let&apos;s Talk"
    },
    projects: {
      eyebrow: "Portfolio",
      title: "Featured Projects",
      intro: "Explore a selection of my work here - interact with projects to see my skills in action.",
      openLabel: "open",
      overlayEyebrow: "Project Details",
      overlayTitle: "Project name",
      overlayText: "Content follows later.",
      overlayQuestion: "What is this project about?",
      githubLabel: "GitHub",
      liveTestLabel: "Live Test",
      nextProject: "Next project",
      closeLabel: "Close overlay"
    },
    references: {
      title: "What my colleagues say about me",
      previous: "Previous reference",
      next: "Next reference",
      dotLabel: "Go to reference"
    },
    contact: {
      eyebrow: "Contact me",
      title: "Let&apos;s work together",
      subtitle: "Got a problem to solve?",
      text: "Encourage people to contact you and describe what role you are interested in. Show that you will add value to their projects through your work.",
      smallText: 'Need a Frontend Developer? <a href="mailto:hello@floriannarr.dev">Let&apos;s talk!</a>',
      labels: [
        "What&apos;s your name?",
        "What&apos;s your email?",
        "How can I help you?"
      ],
      placeholders: [
        "Your name goes here",
        "youremail@email.com",
        "Hello Florian, I am interested in..."
      ],
      privacy: 'I&apos;ve read the <a href="#">privacy policy</a> and agree to the processing of my data as outlined.',
      button: "Say Hello ;)",
      errors: {
        name: "Oops! it seems your name is missing",
        emailRequired: "Hoppla! your email is required",
        emailInvalid: "Please enter a valid email address.",
        message: "What do you need to develop?",
        privacy: "Please accept the privacy policy."
      }
    },
    footer: {
      brandLabel: "Back to homepage",
      meta: ["Web Developer", "Rosenheim Germany"],
      navLabel: "Footer navigation",
      legal: "Legal Notice"
    }
  },
  de: {
    lang: "de",
    header: {
      switchLabel: "Sprache auf Englisch wechseln",
      navLabel: "Hauptnavigation",
      about: "Über mich",
      skills: "Fähigkeiten",
      projects: "Projekte"
    },
    hero: {
      role: "Frontend Entwickler",
      buttons: ["Meine Arbeiten ansehen", "Kontakt aufnehmen"],
      arrowLabel: "Zum nächsten Bereich scrollen",
      ticker: [
        "Aus Rosenheim",
        "Offen für neue Projekte",
        "Verfügbar für Remote-Arbeit",
        "Frontend Entwickler"
      ]
    },
    about: {
      imageAlt: "Portfolio Inhaber",
      eyebrow: "Wer ich bin",
      title: "Über mich",
      intro: "Hey, ich bin Florian. Ich entwickle moderne Frontend-Oberflächen mit sauberer Struktur, starker visueller Konsistenz und Fokus auf angenehme Nutzerinteraktionen.",
      items: [
        "Ich komme aus Rosenheim und bin für Remote-Arbeit verfügbar.",
        "Ich lerne gerne neue Technologien und verbessere kontinuierlich meinen Frontend-Workflow, meine Codequalität und mein Designverständnis.",
        "Ich arbeite strukturiert, lösungsorientiert und verwandle komplexe Anforderungen in klare, durchdachte digitale Erlebnisse."
      ]
    },
    skills: {
      eyebrow: "Technologien",
      title: "Skill Set",
      text: "Ich entwickle responsive Frontend-Lösungen mit semantischem HTML, skalierbarem Styling, wiederverwendbaren Komponenten und Offenheit für neue Tools und Workflows.",
      subtitle: "Du brauchst <span>einen anderen Skill?</span>",
      smallText: "Kontaktiere mich gerne. Ich freue mich darauf, mein bisheriges Wissen weiter auszubauen.",
      button: "Lass uns sprechen"
    },
    projects: {
      eyebrow: "Portfolio",
      title: "Ausgewählte Projekte",
      intro: "Hier findest du eine Auswahl meiner Arbeiten - klicke auf die Projekte, um meine Skills in Aktion zu sehen.",
      openLabel: "öffnen",
      overlayEyebrow: "Projektdetails",
      overlayTitle: "Projektname",
      overlayText: "Inhalt folgt später.",
      overlayQuestion: "Worum geht es in diesem Projekt?",
      githubLabel: "GitHub",
      liveTestLabel: "Live Test",
      nextProject: "Nächstes Projekt",
      closeLabel: "Overlay schließen"
    },
    references: {
      title: "Was meine Kollegen über mich sagen",
      previous: "Vorherige Referenz",
      next: "Nächste Referenz",
      dotLabel: "Gehe zu Referenz"
    },
    contact: {
      eyebrow: "Kontakt",
      title: "Lass uns zusammenarbeiten",
      subtitle: "Hast du ein Problem zu lösen?",
      text: "Erzähl mir gerne von deinem Projekt und davon, welche Unterstützung du suchst. Ich bringe Struktur, sauberen Code und ein gutes Gespür für Frontend-Lösungen mit.",
      smallText: 'Brauchst du einen Frontend Entwickler? <a href="mailto:hello@floriannarr.dev">Lass uns sprechen!</a>',
      labels: [
        "Wie heißt du?",
        "Wie lautet deine E-Mail?",
        "Wie kann ich dir helfen?"
      ],
      placeholders: [
        "Dein Name",
        "deineemail@email.com",
        "Hallo Florian, ich interessiere mich für..."
      ],
      privacy: 'Ich habe die <a href="#">Datenschutzerklärung</a> gelesen und stimme der Verarbeitung meiner Daten wie beschrieben zu.',
      button: "Absenden ;)",
      errors: {
        name: "Oops! Dein Name fehlt.",
        emailRequired: "Hoppla! Deine E-Mail wird benötigt.",
        emailInvalid: "Bitte gib eine gültige E-Mail-Adresse ein.",
        message: "Was möchtest du entwickeln?",
        privacy: "Bitte akzeptiere die Datenschutzerklärung."
      }
    },
    footer: {
      brandLabel: "Zur Startseite",
      meta: ["Web Entwickler", "Rosenheim Deutschland"],
      navLabel: "Footer Navigation",
      legal: "Impressum"
    }
  }
};