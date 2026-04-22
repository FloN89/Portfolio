const skillsData = [
  { name: "HTML", icon: "assets/imgs/Skills/Property 1=HTML.png" },
  { name: "CSS", icon: "assets/imgs/Skills/Property 1=CSS.png" },
  { name: "JavaScript", icon: "assets/imgs/Skills/Property 1=JavaScript.png" },
  { name: "Material Design", icon: "assets/imgs/Skills/Property 1=Material Design.png" },
  { name: "Git", icon: "assets/imgs/Skills/Property 1=Git.png" },
  { name: "REST-API", icon: "assets/imgs/Skills/Property 1=Rest-Api.png" },
  { name: "Scrum", icon: "assets/imgs/Skills/Property 1=Scrum.png" },
  { name: "Growth mindset", icon: "assets/imgs/Skills/Property 1=GrowthMindset.png" }
];

const projectsData = [
  {
    identifier: "join",
    title: "Join",
    stack: ["JavaScript", "HTML", "CSS", "Firebase"],
    description: "Task management app with drag and drop board, authentication flow and a clean component structure."
  },
  {
    identifier: "el-pollo-loco",
    title: "El Pollo Loco",
    stack: ["HTML", "CSS", "JavaScript"],
    description: "Two-dimensional browser game with object oriented JavaScript, collision logic and responsive canvas handling."
  },
  {
    identifier: "memory-game",
    title: "Memory Game",
    stack: ["Angular", "Firebase", "TypeScript"],
    description: "Classic memory game implemented in Angular with a Firebase backend, featuring user authentication and real-time score tracking."
  }
];

const referencesData = [
  {
    text: "Florian has proven to be a reliable group partner. His technical skills and proactive approach were crucial to the success of our project.",
    author: "H. Janisch - Team Partner"
  },
  {
    text: "I had the good fortune of working on a project with Florian. He always stayed calm, focused and supportive, and he made teamwork feel easy and productive.",
    author: "Developer Akademie - Team Project"
  },
  {
    text: "Working with Florian was a great experience. He communicated clearly, kept the team aligned and delivered thoughtful frontend solutions.",
    author: "T. Schulz - Frontend Developer"
  }
];

const skillsGrid = document.getElementById("skillsGrid");
const projectsList = document.getElementById("projectsList");
const projectOverlay = document.getElementById("projectOverlay");
const projectOverlayTitle = document.getElementById("projectOverlayTitle");
const projectOverlayText = document.getElementById("projectOverlayText");
const projectOverlayStack = document.getElementById("projectOverlayStack");
const projectOverlayCloseButton = document.getElementById("projectOverlayClose");
const referencesStage = document.getElementById("referencesStage");
const referencesDots = document.getElementById("referencesDots");
const referencesPreviousButton = document.getElementById("referencesPreviousButton");
const referencesNextButton = document.getElementById("referencesNextButton");

let currentReferenceIndex = 0;

/* Create the markup for one skill item. */
function createSkillMarkup(skill) {
  return `
    <div class="skill-item">
      <div class="skill-icon-wrap">
        <img src="${skill.icon}" alt="${skill.name}" class="skill-icon" />
      </div>
      <span class="skill-name">${skill.name}</span>
    </div>
  `;
}

/* Render all skill items into the skills grid. */
function renderSkills() {
  if (!skillsGrid) return;
  skillsGrid.innerHTML = skillsData.map(createSkillMarkup).join("");
}

/* Create the markup for the project technology tags. */
function createProjectTagsMarkup(stack) {
  return stack.map(createProjectTagMarkup).join("");
}

/* Create the markup for one project technology tag. */
function createProjectTagMarkup(tag, index, stack) {
  const separator = index < stack.length - 1 ? '<span class="project-row__separator">|</span>' : "";
  return `<span class="project-row__tag">${tag}</span>${separator}`;
}

/* Create the markup for one project row. */
function createProjectMarkup(project) {
  return `
    <button type="button" class="project-row" data-project-identifier="${project.identifier}" aria-label="${project.title} öffnen">
      <span class="project-row__title">${project.title}</span>
      <span class="project-row__meta">${createProjectTagsMarkup(project.stack)}</span>
    </button>
  `;
}

/* Render all project rows into the project list. */
function renderProjects() {
  if (!projectsList) return;
  projectsList.innerHTML = projectsData.map(createProjectMarkup).join("");
}

/* Find one project by its identifier. */
function findProject(identifier) {
  return projectsData.find(function (project) {
    return project.identifier === identifier;
  });
}

/* Update the project overlay with project content. */
function fillProjectOverlay(project) {
  projectOverlayTitle.textContent = project.title;
  projectOverlayText.textContent = project.description;
  projectOverlayStack.innerHTML = project.stack.map(createOverlayTagMarkup).join("");
}

/* Create the markup for one overlay technology tag. */
function createOverlayTagMarkup(technology) {
  return `<span class="project-overlay__stack-item">${technology}</span>`;
}

/* Open the project overlay for the selected project. */
function openProjectOverlay(identifier) {
  const project = findProject(identifier);
  if (!project || !projectOverlay) return;
  fillProjectOverlay(project);
  projectOverlay.classList.add("is-open");
  projectOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("overlay-is-open");
}

/* Close the project overlay. */
function closeProjectOverlay() {
  if (!projectOverlay) return;
  projectOverlay.classList.remove("is-open");
  projectOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("overlay-is-open");
}

/* Calculate a safe wrapped index for the slider. */
function getWrappedIndex(index, length) {
  return (index + length) % length;
}

/* Create the markup for one reference card. */
function createReferenceMarkup(reference, modifierClass) {
  return `
    <article class="reference-card ${modifierClass}">
      <span class="reference-card__quote" aria-hidden="true">“</span>
      <p class="reference-card__text">${reference.text}</p>
      <div class="reference-card__footer">
        <span class="reference-card__line" aria-hidden="true"></span>
        <span class="reference-card__author">${reference.author}</span>
      </div>
    </article>
  `;
}

/* Render the slider dots below the references. */
function renderReferenceDots() {
  if (!referencesDots) return;
  referencesDots.innerHTML = referencesData.map(createReferenceDotMarkup).join("");
}

/* Create the markup for one reference dot. */
function createReferenceDotMarkup(reference, index) {
  const isActive = index === currentReferenceIndex;
  const imagePath = isActive ? "assets/imgs/references/Ellipse 2.png" : "assets/imgs/references/Ellipse 3.png";
  return `
    <button type="button" class="references-dot" data-reference-index="${index}" aria-label="Gehe zu Referenz ${index + 1}" aria-pressed="${isActive}">
      <img src="${imagePath}" alt="" />
    </button>
  `;
}

/* Render the visible reference cards. */
function renderReferences() {
  if (!referencesStage || referencesData.length === 0) return;
  const previousIndex = getWrappedIndex(currentReferenceIndex - 1, referencesData.length);
  const nextIndex = getWrappedIndex(currentReferenceIndex + 1, referencesData.length);
  referencesStage.innerHTML = `
    ${createReferenceMarkup(referencesData[previousIndex], "reference-card--side")}
    ${createReferenceMarkup(referencesData[currentReferenceIndex], "reference-card--active")}
    ${createReferenceMarkup(referencesData[nextIndex], "reference-card--side")}
  `;
  renderReferenceDots();
}

/* Move the slider to the previous reference. */
function showPreviousReference() {
  currentReferenceIndex = getWrappedIndex(currentReferenceIndex - 1, referencesData.length);
  renderReferences();
}

/* Move the slider to the next reference. */
function showNextReference() {
  currentReferenceIndex = getWrappedIndex(currentReferenceIndex + 1, referencesData.length);
  renderReferences();
}

/* Open a project or change the reference by click. */
function handleDocumentClick(event) {
  const projectButton = event.target.closest("[data-project-identifier]");
  const closeOverlayButton = event.target.closest("[data-close-overlay]");
  const referenceDot = event.target.closest("[data-reference-index]");
  if (projectButton) openProjectOverlay(projectButton.dataset.projectIdentifier);
  if (closeOverlayButton) closeProjectOverlay();
  if (referenceDot) updateReferenceIndex(referenceDot.dataset.referenceIndex);
}

/* Update the active reference index and re-render. */
function updateReferenceIndex(index) {
  currentReferenceIndex = Number(index);
  renderReferences();
}

/* Close the overlay with the escape key. */
function handleDocumentKeydown(event) {
  if (event.key === "Escape") closeProjectOverlay();
}

/* Connect all page level event listeners. */
function registerEventListeners() {
  document.addEventListener("click", handleDocumentClick);
  document.addEventListener("keydown", handleDocumentKeydown);
  if (projectOverlayCloseButton) projectOverlayCloseButton.addEventListener("click", closeProjectOverlay);
  if (referencesPreviousButton) referencesPreviousButton.addEventListener("click", showPreviousReference);
  if (referencesNextButton) referencesNextButton.addEventListener("click", showNextReference);
}

/* Render the dynamic sections and start interactions. */
function initializePage() {
  renderSkills();
  renderProjects();
  renderReferences();
  registerEventListeners();
}

initializePage();