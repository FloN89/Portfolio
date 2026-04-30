const skillHoverIconMarkup = {
  react: `
    <svg class="skill-growth-overlay__brand-icon" viewBox="-11.5 -10.23174 23 20.46348" aria-hidden="true" focusable="false">
      <circle cx="0" cy="0" r="2.05" fill="currentColor"></circle>
      <g stroke="currentColor" stroke-width="1" fill="none">
        <ellipse rx="11" ry="4.2"></ellipse>
        <ellipse rx="11" ry="4.2" transform="rotate(60)"></ellipse>
        <ellipse rx="11" ry="4.2" transform="rotate(120)"></ellipse>
      </g>
    </svg>
  `,
  vue: `
    <svg class="skill-growth-overlay__brand-icon" viewBox="0 0 256 221" aria-hidden="true" focusable="false">
      <path fill="#41B883" d="M204.8 0H256L128 220.8 0 0h97.9L128 51.2 157.4 0h47.4Z"></path>
      <path fill="#35495E" d="M0 0 128 220.8 256 0h-51.2L128 132.5 50.6 0H0Z"></path>
      <path fill="#41B883" d="M50.6 0 128 132.5 204.8 0h-47.4L128 51.2 97.9 0H50.6Z"></path>
    </svg>
  `
};

/* Return the icon markup for one Growth Mindset overlay skill. */
function getSkillHoverIconMarkup(hoverSkill) {
  if (hoverSkill.icon && skillHoverIconMarkup[hoverSkill.icon]) {
    return skillHoverIconMarkup[hoverSkill.icon];
  }

  return `<span class="skill-growth-overlay__fallback-icon">${hoverSkill.shortLabel || hoverSkill.label}</span>`;
}

/* Create the markup for one skill hover item. */
function createSkillHoverSkillMarkup(hoverSkill) {
  const modifierClass = hoverSkill.icon ? ` skill-growth-overlay__item--${hoverSkill.icon}` : "";

  return `
    <span class="skill-growth-overlay__item${modifierClass}">
      <span class="skill-growth-overlay__icon">${getSkillHoverIconMarkup(hoverSkill)}</span>
      <span class="skill-growth-overlay__name">${hoverSkill.label}</span>
    </span>
  `;
}

/* Create the optional Growth Mindset hover overlay. */
function createSkillHoverOverlayMarkup(skill) {
  if (!skill.hoverSkills || skill.hoverSkills.length === 0) return "";
  const hoverHeadline = readTranslatedText(skill.hoverHeadline);
  const hoverSkillsMarkup = skill.hoverSkills.map(createSkillHoverSkillMarkup).join("");

  return `
    <div class="skill-growth-overlay" aria-hidden="true">
      <span class="skill-growth-overlay__headline">${hoverHeadline}</span>
      <div class="skill-growth-overlay__list">${hoverSkillsMarkup}</div>
    </div>
  `;
}

/* Create the markup for one skill item. */
function createSkillMarkup(skill) {
  const skillName = readTranslatedText(skill.names);
  const modifierClass = skill.modifier ? ` skill-item--${skill.modifier}` : "";
  const focusAttribute = skill.hoverSkills ? ' tabindex="0"' : "";
  const hoverOverlay = createSkillHoverOverlayMarkup(skill);

  return `
    <div class="skill-item${modifierClass}"${focusAttribute}>
      <div class="skill-icon-wrap">
        <img src="${skill.icon}" alt="${skillName}" class="skill-icon" />
      </div>
      <span class="skill-name">${skillName}</span>
      ${hoverOverlay}
    </div>
  `;
}

/* Render all skill items into the skills grid. */
function renderSkills() {
  if (!pageElements.skillsGrid) return;
  pageElements.skillsGrid.innerHTML = skillsData.map(createSkillMarkup).join("");
}

/* Create one project technology separator. */
function createProjectTechnologySeparator(index, technologies) {
  const hasNextTechnology = index < technologies.length - 1;
  return hasNextTechnology ? '<span class="project-row__separator">|</span>' : "";
}

/* Create the markup for one project technology tag. */
function createProjectTechnologyMarkup(technology, index, technologies) {
  const separator = createProjectTechnologySeparator(index, technologies);
  return `<span class="project-row__tag">${technology}</span>${separator}`;
}

/* Create the markup for all project technology tags. */
function createProjectTechnologiesMarkup(technologies) {
  return technologies.map(createProjectTechnologyMarkup).join("");
}

/* Create an image preview for one project row. */
function createProjectImagePreviewMarkup(preview) {
  const previewAlt = readTranslatedText(preview.alt);
  return `<img src="${preview.src}" alt="${previewAlt}" class="project-row__preview-image" />`;
}

/* Create a text preview for one project row. */
function createProjectTextPreviewMarkup(preview) {
  const previewText = readTranslatedText(preview.text);
  return `<span class="project-row__preview-text">${previewText}</span>`;
}

/* Create the hover preview markup for one project row. */
function createProjectPreviewMarkup(project) {
  if (!project.preview) return "";
  const previewContent = project.preview.type === "image"
    ? createProjectImagePreviewMarkup(project.preview)
    : createProjectTextPreviewMarkup(project.preview);

  return `
    <span class="project-row__preview" aria-hidden="true">
      <span class="project-row__preview-frame">${previewContent}</span>
    </span>
  `;
}

/* Create the markup for one project row. */
function createProjectMarkup(project) {
  const projectTitle = readTranslatedText(project.title);
  const projectTechnologies = createProjectTechnologiesMarkup(project.stack);
  const projectPreview = createProjectPreviewMarkup(project);

  return `
    <button type="button" class="project-row" data-project-identifier="${project.identifier}">
      <span class="project-row__title">${projectTitle}</span>
      <span class="project-row__meta">${projectTechnologies}</span>
      ${projectPreview}
    </button>
  `;
}

/* Render all project rows into the project list. */
function renderProjects() {
  if (!pageElements.projectsList) return;
  pageElements.projectsList.innerHTML = projectsData.map(createProjectMarkup).join("");
  updateGeneratedAriaLabels();
}

const technologyIconPaths = {
  HTML: "assets/imgs/Skills/Property 1=HTML.png",
  CSS: "assets/imgs/Skills/Property 1=CSS.png",
  JavaScript: "assets/imgs/Skills/Property 1=JavaScript.png",
  Angular: "assets/imgs/Skills/Property 1=Angular.png",
  TypeScript: "assets/imgs/Skills/Property 1=TypeScript.png",
  Firebase: "assets/imgs/Skills/Property 1=Firebase.png"
};

/* Find one project by its identifier. */
function findProject(identifier) {
  return projectsData.find((project) => project.identifier === identifier);
}

/* Find the index of one project. */
function findProjectIndex(identifier) {
  return projectsData.findIndex((project) => project.identifier === identifier);
}

/* Get the next project identifier for the overlay navigation. */
function getNextProjectIdentifier() {
  const currentIndex = findProjectIndex(currentProjectIdentifier);
  const nextIndex = getWrappedIndex(currentIndex + 1, projectsData.length);
  return projectsData[nextIndex]?.identifier;
}

/* Create the markup for one overlay technology tag. */
function createOverlayTechnologyMarkup(technology) {
  const iconPath = technologyIconPaths[technology];

  if (!iconPath) {
    return `<span class="project-overlay__stack-item">${technology}</span>`;
  }

  return `
    <span class="project-overlay__stack-item">
      <img
        class="project-overlay__stack-icon"
        src="${iconPath}"
        alt=""
        aria-hidden="true"
        onerror="this.remove()"
      />
      <span>${technology}</span>
    </span>
  `;
}

/* Create the preview markup for the overlay. */
function createOverlayPreviewMarkup(project) {
  if (!project.preview) return "";

  if (project.preview.type === "image") {
    const previewAlt = readTranslatedText(project.preview.alt);

    return `
      <img
        class="project-overlay__preview-image"
        src="${project.preview.src}"
        alt="${previewAlt}"
      />
    `;
  }

  const previewText = readTranslatedText(project.preview.text);

  return `<span class="project-overlay__preview-text">${previewText}</span>`;
}

/* Update one overlay link. */
function updateOverlayLink(linkElement, url) {
  if (!linkElement) return;
  linkElement.href = url || "#";
}

/* Update the project overlay with project content. */
function fillProjectOverlay(project) {
  const projectIndex = findProjectIndex(project.identifier);
  const translations = getLanguageTranslations(currentLanguage);
  const projectQuestion = project.overlayQuestion
    ? readTranslatedText(project.overlayQuestion)
    : translations.projects.overlayQuestion;

  pageElements.projectOverlayNumber.textContent = String(projectIndex + 1).padStart(2, "0");
  pageElements.projectOverlayTitle.textContent = readTranslatedText(project.title);
  pageElements.projectOverlayQuestion.textContent = projectQuestion;
  pageElements.projectOverlayText.textContent = readTranslatedText(project.description);
  pageElements.projectOverlayStack.innerHTML = project.stack.map(createOverlayTechnologyMarkup).join("");
  pageElements.projectOverlayPreview.innerHTML = createOverlayPreviewMarkup(project);

  pageElements.projectOverlayGithub.innerHTML = `${translations.projects.githubLabel} <span aria-hidden="true">↗</span>`;
  pageElements.projectOverlayLive.innerHTML = `${translations.projects.liveTestLabel} <span aria-hidden="true">↗</span>`;
  pageElements.projectOverlayNextText.textContent = translations.projects.nextProject;

  updateOverlayLink(pageElements.projectOverlayGithub, project.githubUrl);
  updateOverlayLink(pageElements.projectOverlayLive, project.liveUrl);
}

/* Open the project overlay for the selected project. */
function openProjectOverlay(identifier) {
  const project = findProject(identifier);
  if (!project || !pageElements.projectOverlay) return;

  currentProjectIdentifier = identifier;
  fillProjectOverlay(project);

  pageElements.projectOverlay.classList.add("is-open");
  pageElements.projectOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("overlay-is-open");
}

/* Close the project overlay. */
function closeProjectOverlay() {
  if (!pageElements.projectOverlay) return;

  currentProjectIdentifier = null;
  pageElements.projectOverlay.classList.remove("is-open");
  pageElements.projectOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("overlay-is-open");
}

/* Show the next project inside the overlay. */
function showNextProjectInOverlay() {
  const nextProjectIdentifier = getNextProjectIdentifier();
  if (nextProjectIdentifier) openProjectOverlay(nextProjectIdentifier);
}

/* Refresh project content when the language changes. */
function refreshOpenProjectOverlay() {
  const project = findProject(currentProjectIdentifier);
  if (project && pageElements.projectOverlay) fillProjectOverlay(project);
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
      <p class="reference-card__text">${readTranslatedText(reference.text)}</p>
      <div class="reference-card__footer">
        <span class="reference-card__line" aria-hidden="true"></span>
        <span class="reference-card__author">${readTranslatedText(reference.author)}</span>
      </div>
    </article>
  `;
}

/* Create the markup for one reference dot. */
function createReferenceDotMarkup(reference, index) {
  const isActive = index === currentReferenceIndex;
  const imagePath = isActive ? "assets/imgs/references/Ellipse 2.png" : "assets/imgs/references/Ellipse 3.png";
  return `
    <button type="button" class="references-dot" data-reference-index="${index}" aria-pressed="${isActive}">
      <img src="${imagePath}" alt="" />
    </button>
  `;
}

/* Render the slider dots below the references. */
function renderReferenceDots() {
  if (!pageElements.referencesDots) return;
  pageElements.referencesDots.innerHTML = referencesData.map(createReferenceDotMarkup).join("");
}

/* Render the visible reference cards. */
function renderReferences() {
  if (!pageElements.referencesStage || referencesData.length === 0) return;
  const previousIndex = getWrappedIndex(currentReferenceIndex - 1, referencesData.length);
  const nextIndex = getWrappedIndex(currentReferenceIndex + 1, referencesData.length);
  pageElements.referencesStage.innerHTML = `
    ${createReferenceMarkup(referencesData[previousIndex], "reference-card--side")}
    ${createReferenceMarkup(referencesData[currentReferenceIndex], "reference-card--active")}
    ${createReferenceMarkup(referencesData[nextIndex], "reference-card--side")}
  `;
  renderReferenceDots();
  updateGeneratedAriaLabels();
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

/* Update the active reference index and render again. */
function updateReferenceIndex(rawIndex) {
  currentReferenceIndex = Number(rawIndex);
  renderReferences();
}

/* Open a project when a project row is clicked. */
function handleProjectButtonClick(event) {
  const projectButton = event.target.closest("[data-project-identifier]");
  if (projectButton) openProjectOverlay(projectButton.dataset.projectIdentifier);
}

/* Close the overlay when the backdrop or close button is clicked. */
function handleOverlayCloseClick(event) {
  const closeTarget = event.target.closest("[data-close-overlay]");
  if (closeTarget) closeProjectOverlay();
}

/* Change the reference when a dot is clicked. */
function handleReferenceDotClick(event) {
  const referenceDot = event.target.closest("[data-reference-index]");
  if (referenceDot) updateReferenceIndex(referenceDot.dataset.referenceIndex);
}

/* Handle all delegated document clicks. */
function handleDocumentClick(event) {
  handleProjectButtonClick(event);
  handleOverlayCloseClick(event);
  handleReferenceDotClick(event);
}

/* Close the overlay with the escape key. */
function handleDocumentKeydown(event) {
  if (event.key === "Escape") closeProjectOverlay();
}

/* Connect all page level event listeners. */
function registerPageEventListeners() {
  document.addEventListener("click", handleDocumentClick);
  document.addEventListener("keydown", handleDocumentKeydown);
  pageElements.projectOverlayCloseButton?.addEventListener("click", closeProjectOverlay);
  pageElements.projectOverlayNextButton?.addEventListener("click", showNextProjectInOverlay);
  pageElements.referencesPreviousButton?.addEventListener("click", showPreviousReference);
  pageElements.referencesNextButton?.addEventListener("click", showNextReference);
}

/* Render dynamic sections and start interactions. */
function initializePage() {
  renderSkills();
  renderProjects();
  renderReferences();
  registerPageEventListeners();
}