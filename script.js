const skillsData = [
  {
    name: "HTML",
    icon: "assets/imgs/Skills/Property 1=HTML.png",
  },
  {
    name: "CSS",
    icon: "assets/imgs/Skills/Property 1=CSS.png",
  },
  {
    name: "JavaScript",
    icon: "assets/imgs/Skills/Property 1=JavaScript.png",
  },
  {
    name: "Firebase",
    icon: "assets/imgs/Skills/Property 1=Firebase.png",
  },
  {
    name: "REST-API",
    icon: "assets/imgs/Skills/Property 1=Rest-Api.png",
  },
  {
    name: "Scrum",
    icon: "assets/imgs/Skills/Property 1=Scrum.png",
  },
  {
    name: "Git",
    icon: "assets/imgs/Skills/Property 1=Git.png",
  },
  {
    name: "Growth mindset",
    icon: "assets/imgs/Skills/Property 1=GrowthMindset.png",
  },
];

const projectsData = [
  {
    id: "join",
    title: "Join",
    stack: ["Angular", "TypeScript", "HTML", "CSS", "Firebase"],
    description:
      "Für dieses Projekt ist das Overlay schon vorbereitet. Hier kannst du später deine Projektbeschreibung, Screenshots, Links und besondere Features einfügen.",
  },
  {
    id: "el-pollo-loco",
    title: "El Pollo Loco",
    stack: ["HTML", "CSS", "JavaScript"],
    description:
      "Hier kannst du später z. B. Gameplay, technische Herausforderungen und deinen Lösungsansatz ergänzen.",
  },
  {
    id: "da-bubble",
    title: "DA Bubble",
    stack: ["Angular", "Firebase", "TypeScript"],
    description:
      "Das Overlay ist bereits klickbar. Später kannst du hier Projektinfos, Rollen, Learnings oder einen Live-Link ergänzen.",
  },
];

const referencesData = [
  {
    text: "Florian has proven to be a reliable group partner. His technical skills and proactive approach were crucial to the success of our project.",
    author: "H. Janisch - Team Partner",
  },
  {
    text: "Working with Florian was a very positive experience. He stayed calm, focused and solution-oriented throughout the project and always contributed strong ideas to the team.",
    author: "M. Becker - Frontend Developer",
  },
  {
    text: "Florian is structured, dependable and easy to collaborate with. He communicates clearly, takes responsibility and always looks for efficient solutions.",
    author: "T. Schulz - Frontend Developer",
  },
  {
    text: "Florian quickly understands requirements and turns them into clean frontend solutions. I especially appreciated his reliability and thoughtful way of working.",
    author: "A. Weber - Project Partner",
  },
];

const skillsGrid = document.getElementById("skillsGrid");
const projectsList = document.getElementById("projectsList");
const projectOverlay = document.getElementById("projectOverlay");
const projectOverlayTitle = document.getElementById("projectOverlayTitle");
const projectOverlayText = document.getElementById("projectOverlayText");
const projectOverlayStack = document.getElementById("projectOverlayStack");
const projectOverlayClose = document.getElementById("projectOverlayClose");

const referencesStage = document.getElementById("referencesStage");
const referencesDots = document.getElementById("referencesDots");
const referencesPrev = document.getElementById("referencesPrev");
const referencesNext = document.getElementById("referencesNext");

let currentReferenceIndex = 0;

function renderSkills() {
  if (!skillsGrid) return;

  skillsGrid.innerHTML = skillsData
    .map(
      (skill) => `
        <div class="skill-item">
          <div class="skill-icon-wrap">
            <img src="${skill.icon}" alt="${skill.name}" class="skill-icon" />
          </div>
          <span class="skill-name">${skill.name}</span>
        </div>
      `
    )
    .join("");
}

function createProjectTags(stack) {
  return stack
    .map((tag, index) => {
      const isLast = index === stack.length - 1;

      return `
        <span class="project-row__tag">${tag}</span>
        ${!isLast ? '<span class="project-row__separator">|</span>' : ""}
      `;
    })
    .join("");
}

function renderProjects() {
  if (!projectsList) return;

  projectsList.innerHTML = projectsData
    .map(
      (project) => `
        <button
          type="button"
          class="project-row"
          data-project-id="${project.id}"
          aria-label="${project.title} öffnen"
        >
          <span class="project-row__title">${project.title}</span>
          <span class="project-row__meta">
            ${createProjectTags(project.stack)}
          </span>
        </button>
      `
    )
    .join("");
}

function openProjectOverlay(projectId) {
  if (
    !projectOverlay ||
    !projectOverlayTitle ||
    !projectOverlayText ||
    !projectOverlayStack
  ) {
    return;
  }

  const project = projectsData.find((item) => item.id === projectId);
  if (!project) return;

  projectOverlayTitle.textContent = project.title;
  projectOverlayText.textContent = project.description;
  projectOverlayStack.innerHTML = project.stack
    .map(
      (tech) => `<span class="project-overlay__stack-item">${tech}</span>`
    )
    .join("");

  projectOverlay.classList.add("is-open");
  projectOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("overlay-is-open");
}

function closeProjectOverlay() {
  if (!projectOverlay) return;

  projectOverlay.classList.remove("is-open");
  projectOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("overlay-is-open");
}

function getWrappedIndex(index, length) {
  return (index + length) % length;
}

function createReferenceCard(reference, modifierClass) {
  return `
    <article class="reference-card ${modifierClass}">
      <span class="reference-card__quote" aria-hidden="true">“</span>

      <p class="reference-card__text">
        ${reference.text}
      </p>

      <div class="reference-card__footer">
        <span class="reference-card__line" aria-hidden="true"></span>
        <span class="reference-card__author">${reference.author}</span>
      </div>
    </article>
  `;
}

function renderReferenceDots() {
  if (!referencesDots) return;

  referencesDots.innerHTML = referencesData
    .map((_, index) => {
      const isActive = index === currentReferenceIndex;
      const dotImage = isActive
        ? "assets/imgs/references/Ellipse 2.png"
        : "assets/imgs/references/Ellipse 3.png";

      return `
        <button
          type="button"
          class="references-dot"
          data-reference-dot="${index}"
          aria-label="Gehe zu Referenz ${index + 1}"
          aria-pressed="${isActive}"
        >
          <img src="${dotImage}" alt="" />
        </button>
      `;
    })
    .join("");
}

function renderReferences() {
  if (!referencesStage || referencesData.length === 0) return;

  const previousIndex = getWrappedIndex(
    currentReferenceIndex - 1,
    referencesData.length
  );
  const nextIndex = getWrappedIndex(
    currentReferenceIndex + 1,
    referencesData.length
  );

  referencesStage.innerHTML = `
    ${createReferenceCard(
      referencesData[previousIndex],
      "reference-card--side"
    )}
    ${createReferenceCard(
      referencesData[currentReferenceIndex],
      "reference-card--active"
    )}
    ${createReferenceCard(referencesData[nextIndex], "reference-card--side")}
  `;

  renderReferenceDots();
}

function showPreviousReference() {
  currentReferenceIndex = getWrappedIndex(
    currentReferenceIndex - 1,
    referencesData.length
  );
  renderReferences();
}

function showNextReference() {
  currentReferenceIndex = getWrappedIndex(
    currentReferenceIndex + 1,
    referencesData.length
  );
  renderReferences();
}

document.addEventListener("click", (event) => {
  const projectButton = event.target.closest("[data-project-id]");
  const closeTrigger = event.target.closest("[data-close-overlay]");
  const referenceDot = event.target.closest("[data-reference-dot]");

  if (projectButton) {
    openProjectOverlay(projectButton.dataset.projectId);
  }

  if (closeTrigger) {
    closeProjectOverlay();
  }

  if (referenceDot) {
    currentReferenceIndex = Number(referenceDot.dataset.referenceDot);
    renderReferences();
  }
});

if (projectOverlayClose) {
  projectOverlayClose.addEventListener("click", closeProjectOverlay);
}

if (referencesPrev) {
  referencesPrev.addEventListener("click", showPreviousReference);
}

if (referencesNext) {
  referencesNext.addEventListener("click", showNextReference);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeProjectOverlay();
  }
});

renderSkills();
renderProjects();
renderReferences();