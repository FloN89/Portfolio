const skillHoverIconMarkup = {
  python: `<img class="skill-growth-overlay__brand-icon" src="assets/imgs/Skills/python.png" alt="" aria-hidden="true" onerror="this.remove()" />`,
  typescript: `<img class="skill-growth-overlay__brand-icon" src="assets/imgs/Skills/Property 1=TypeScript.png" alt="" aria-hidden="true" onerror="this.remove()" />`
};

const technologyIconPaths = {
  HTML: "assets/imgs/Skills/Property 1=HTML.png",
  CSS: "assets/imgs/Skills/Property 1=CSS.png",
  JavaScript: "assets/imgs/Skills/Property 1=JavaScript.png",
  Angular: "assets/imgs/Skills/Property 1=Angular.png",
  TypeScript: "assets/imgs/Skills/Property 1=TypeScript.png",
  Firebase: "assets/imgs/Skills/Property 1=Firebase.png"
};

/* Return the icon markup for a skill shown inside the growth overlay. */
function getSkillHoverIconMarkup(hoverSkill) {
  if (hoverSkill.icon && skillHoverIconMarkup[hoverSkill.icon]) return skillHoverIconMarkup[hoverSkill.icon];
  return `<span class="skill-growth-overlay__fallback-icon">${hoverSkill.shortLabel || hoverSkill.label}</span>`;
}

/* Create the markup for one extra skill in the growth overlay. */
function createSkillHoverSkillMarkup(hoverSkill) {
  const modifierClass = hoverSkill.icon ? ` skill-growth-overlay__item--${hoverSkill.icon}` : "";
  return `<span class="skill-growth-overlay__item${modifierClass}"><span class="skill-growth-overlay__icon">${getSkillHoverIconMarkup(hoverSkill)}</span><span class="skill-growth-overlay__name">${hoverSkill.label}</span></span>`;
}

/* Create the optional growth overlay for one skill card. */
function createSkillHoverOverlayMarkup(skill) {
  if (!skill.hoverSkills?.length) return "";
  const headline = readTranslatedText(skill.hoverHeadline);
  const skills = skill.hoverSkills.map(createSkillHoverSkillMarkup).join("");
  return `<div class="skill-growth-overlay" aria-hidden="true"><span class="skill-growth-overlay__headline">${headline}</span><div class="skill-growth-overlay__list">${skills}</div></div>`;
}

/* Return the modifier class for one skill item. */
function getSkillModifierClass(skill) {
  return skill.modifier ? ` skill-item--${skill.modifier}` : "";
}

/* Return interaction attributes for skills with overlay content. */
function getSkillInteractionAttributes(skill) {
  if (!skill.hoverSkills?.length) return "";
  return ' tabindex="0" role="button" aria-expanded="false" data-growth-overlay-item';
}

/* Create the complete markup for one skill card. */
function createSkillMarkup(skill) {
  const skillName = readTranslatedText(skill.names);
  const modifierClass = getSkillModifierClass(skill);
  const interactionAttributes = getSkillInteractionAttributes(skill);
  const overlay = createSkillHoverOverlayMarkup(skill);
  return `<div class="skill-item${modifierClass}"${interactionAttributes}><div class="skill-icon-wrap"><img src="${skill.icon}" alt="${skillName}" class="skill-icon" /></div><span class="skill-name">${skillName}</span>${overlay}</div>`;
}

/* Render all skill cards into the skills grid. */
function renderSkills() {
  if (pageElements.skillsGrid) pageElements.skillsGrid.innerHTML = skillsData.map(createSkillMarkup).join("");
}

/* Return a separator when another project technology follows. */
function createProjectTechnologySeparator(index, technologies) {
  return index < technologies.length - 1 ? '<span class="project-row__separator">|</span>' : "";
}

/* Create the markup for one project technology tag. */
function createProjectTechnologyMarkup(technology, index, technologies) {
  const separator = createProjectTechnologySeparator(index, technologies);
  return `<span class="project-row__tag">${technology}</span>${separator}`;
}

/* Create all technology tags for one project row. */
function createProjectTechnologiesMarkup(technologies) {
  return technologies.map(createProjectTechnologyMarkup).join("");
}

/* Create an image preview for a project row. */
function createProjectImagePreviewMarkup(preview) {
  const previewAlt = readTranslatedText(preview.alt);
  return `<img src="${preview.src}" alt="${previewAlt}" class="project-row__preview-image" />`;
}

/* Create a text preview for a project row. */
function createProjectTextPreviewMarkup(preview) {
  return `<span class="project-row__preview-text">${readTranslatedText(preview.text)}</span>`;
}

/* Create the preview block for one project row. */
function createProjectPreviewMarkup(project) {
  if (!project.preview) return "";
  const preview = project.preview.type === "image" ? createProjectImagePreviewMarkup(project.preview) : createProjectTextPreviewMarkup(project.preview);
  return `<span class="project-row__preview" aria-hidden="true"><span class="project-row__preview-frame">${preview}</span></span>`;
}

/* Create the complete markup for one project row button. */
function createProjectMarkup(project) {
  const title = readTranslatedText(project.title);
  const technologies = createProjectTechnologiesMarkup(project.stack);
  const preview = createProjectPreviewMarkup(project);
  return `<button type="button" class="project-row" data-project-identifier="${project.identifier}"><span class="project-row__title">${title}</span><span class="project-row__meta">${technologies}</span>${preview}</button>`;
}

/* Render all project rows and refresh their accessibility labels. */
function renderProjects() {
  if (!pageElements.projectsList) return;
  pageElements.projectsList.innerHTML = projectsData.map(createProjectMarkup).join("");
  updateGeneratedAriaLabels();
}

/* Find one project by its identifier. */
function findProject(identifier) {
  return projectsData.find((project) => project.identifier === identifier);
}

/* Find the index of one project by its identifier. */
function findProjectIndex(identifier) {
  return projectsData.findIndex((project) => project.identifier === identifier);
}

/* Wrap an index so carousel navigation can loop endlessly. */
function getWrappedIndex(index, length) {
  return (index + length) % length;
}

/* Return the identifier of the next project in the overlay loop. */
function getNextProjectIdentifier() {
  const currentIndex = findProjectIndex(currentProjectIdentifier);
  const nextIndex = getWrappedIndex(currentIndex + 1, projectsData.length);
  return projectsData[nextIndex]?.identifier;
}

/* Create the icon markup for one overlay technology. */
function createOverlayTechnologyIconMarkup(iconPath) {
  return `<img class="project-overlay__stack-icon" src="${iconPath}" alt="" aria-hidden="true" onerror="this.remove()" />`;
}

/* Create one technology item for the project overlay. */
function createOverlayTechnologyMarkup(technology) {
  const iconPath = technologyIconPaths[technology];
  if (!iconPath) return `<span class="project-overlay__stack-item">${technology}</span>`;
  return `<span class="project-overlay__stack-item">${createOverlayTechnologyIconMarkup(iconPath)}<span>${technology}</span></span>`;
}

/* Create an image preview for the project overlay. */
function createOverlayImagePreviewMarkup(preview) {
  const previewAlt = readTranslatedText(preview.alt);
  return `<img class="project-overlay__preview-image" src="${preview.src}" alt="${previewAlt}" />`;
}

/* Create the correct overlay preview for the active project. */
function createOverlayPreviewMarkup(project) {
  if (!project.preview) return "";
  if (project.preview.type === "image") return createOverlayImagePreviewMarkup(project.preview);
  return `<span class="project-overlay__preview-text">${readTranslatedText(project.preview.text)}</span>`;
}

/* Update one overlay link while keeping a safe fallback URL. */
function updateOverlayLink(linkElement, url) {
  if (linkElement) linkElement.href = url || "#";
}

/* Return the project-specific overlay question or the default translation. */
function getProjectOverlayQuestion(project, translations) {
  if (project.overlayQuestion) return readTranslatedText(project.overlayQuestion);
  return translations.projects.overlayQuestion;
}

/* Update the overlay headline, number, question and description. */
function updateProjectOverlayTexts(project, projectIndex, question) {
  pageElements.projectOverlayNumber.textContent = String(projectIndex + 1).padStart(2, "0");
  pageElements.projectOverlayTitle.textContent = readTranslatedText(project.title);
  pageElements.projectOverlayQuestion.textContent = question;
  pageElements.projectOverlayText.textContent = readTranslatedText(project.description);
}

/* Update the overlay technology stack and preview area. */
function updateProjectOverlayContent(project) {
  pageElements.projectOverlayStack.innerHTML = project.stack.map(createOverlayTechnologyMarkup).join("");
  pageElements.projectOverlayPreview.innerHTML = createOverlayPreviewMarkup(project);
}

/* Update overlay button labels for the current language. */
function updateProjectOverlayButtons(translations) {
  pageElements.projectOverlayGithub.innerHTML = `${translations.projects.githubLabel} <span aria-hidden="true">↗</span>`;
  pageElements.projectOverlayLive.innerHTML = `${translations.projects.liveTestLabel} <span aria-hidden="true">↗</span>`;
  pageElements.projectOverlayNextText.textContent = translations.projects.nextProject;
}

/* Update overlay GitHub and live preview links. */
function updateProjectOverlayLinks(project) {
  updateOverlayLink(pageElements.projectOverlayGithub, project.githubUrl);
  updateOverlayLink(pageElements.projectOverlayLive, project.liveUrl);
}

/* Fill the overlay with all content for one project. */
function fillProjectOverlay(project) {
  const projectIndex = findProjectIndex(project.identifier);
  const translations = getLanguageTranslations(currentLanguage);
  const question = getProjectOverlayQuestion(project, translations);
  updateProjectOverlayTexts(project, projectIndex, question);
  updateProjectOverlayContent(project);
  updateProjectOverlayButtons(translations);
  updateProjectOverlayLinks(project);
}

/* Open the project overlay for a selected project. */
function openProjectOverlay(identifier) {
  const project = findProject(identifier);
  if (!project || !pageElements.projectOverlay) return;
  currentProjectIdentifier = identifier;
  fillProjectOverlay(project);
  pageElements.projectOverlay.classList.add("is-open");
  pageElements.projectOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("overlay-is-open");
}

/* Close the project overlay and reset its active state. */
function closeProjectOverlay() {
  if (!pageElements.projectOverlay) return;
  currentProjectIdentifier = null;
  pageElements.projectOverlay.classList.remove("is-open");
  pageElements.projectOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("overlay-is-open");
}

/* Show the next project inside the already opened overlay. */
function showNextProjectInOverlay() {
  const nextProjectIdentifier = getNextProjectIdentifier();
  if (nextProjectIdentifier) openProjectOverlay(nextProjectIdentifier);
}

/* Refresh the open overlay after a language change. */
function refreshOpenProjectOverlay() {
  const project = findProject(currentProjectIdentifier);
  if (project && pageElements.projectOverlay) fillProjectOverlay(project);
}

/* Return the growth mindset card from one event target. */
function getGrowthMindsetCard(target) {
  if (!(target instanceof Element)) return null;
  return target.closest("[data-growth-overlay-item]");
}

/* Set the visible state for one growth mindset overlay. */
function setGrowthMindsetOverlayOpen(card, isOpen) {
  const overlay = card.querySelector(".skill-growth-overlay");
  card.classList.toggle("is-growth-overlay-open", isOpen);
  card.setAttribute("aria-expanded", String(isOpen));
  if (overlay) overlay.setAttribute("aria-hidden", String(!isOpen));
}

/* Close every open growth mindset overlay except one optional card. */
function closeOpenGrowthMindsetOverlay(exceptCard = null) {
  selectAllElements("[data-growth-overlay-item].is-growth-overlay-open").forEach((card) => {
    if (card !== exceptCard) setGrowthMindsetOverlayOpen(card, false);
  });
}

/* Toggle the growth mindset overlay for one card. */
function toggleGrowthMindsetOverlay(card) {
  const isOpen = card.classList.contains("is-growth-overlay-open");
  closeOpenGrowthMindsetOverlay(card);
  setGrowthMindsetOverlayOpen(card, !isOpen);
}

/* Handle click and tap interaction for the growth mindset card. */
function handleGrowthMindsetClick(event) {
  const card = getGrowthMindsetCard(event.target);
  if (!card) return closeOpenGrowthMindsetOverlay();
  toggleGrowthMindsetOverlay(card);
}

/* Check whether one key should toggle the growth overlay. */
function isGrowthMindsetToggleKey(event) {
  return event.key === "Enter" || event.key === " ";
}

/* Handle keyboard interaction for the growth mindset card. */
function handleGrowthMindsetKeydown(event) {
  const card = getGrowthMindsetCard(event.target);
  if (!card || !isGrowthMindsetToggleKey(event)) return;
  event.preventDefault();
  toggleGrowthMindsetOverlay(card);
}

/* Create the markup for one reference card. */
function createReferenceMarkup(reference, modifierClass) {
  return `<article class="reference-card ${modifierClass}"><span class="reference-card__quote" aria-hidden="true">“</span><p class="reference-card__text">${readTranslatedText(reference.text)}</p><div class="reference-card__footer"><span class="reference-card__line" aria-hidden="true"></span><span class="reference-card__author">${readTranslatedText(reference.author)}</span></div></article>`;
}

/* Create one navigation dot for the references carousel. */
function createReferenceDotMarkup(reference, index) {
  const isActive = index === currentReferenceIndex;
  const imagePath = isActive ? "assets/imgs/references/Ellipse 2.png" : "assets/imgs/references/Ellipse 3.png";
  return `<button type="button" class="references-dot" data-reference-index="${index}" aria-pressed="${isActive}"><img src="${imagePath}" alt="" /></button>`;
}

/* Render all reference navigation dots. */
function renderReferenceDots() {
  if (pageElements.referencesDots) pageElements.referencesDots.innerHTML = referencesData.map(createReferenceDotMarkup).join("");
}

/* Return the current visible reference indexes. */
function getVisibleReferenceIndexes() {
  const previousIndex = getWrappedIndex(currentReferenceIndex - 1, referencesData.length);
  const nextIndex = getWrappedIndex(currentReferenceIndex + 1, referencesData.length);
  return [previousIndex, currentReferenceIndex, nextIndex];
}

/* Render the visible reference cards and their navigation dots. */
function renderReferences() {
  if (!pageElements.referencesStage || referencesData.length === 0) return;
  const [previousIndex, activeIndex, nextIndex] = getVisibleReferenceIndexes();
  pageElements.referencesStage.innerHTML = createReferenceMarkup(referencesData[previousIndex], "reference-card--side") + createReferenceMarkup(referencesData[activeIndex], "reference-card--active") + createReferenceMarkup(referencesData[nextIndex], "reference-card--side");
  renderReferenceDots();
  updateGeneratedAriaLabels();
}

/* Move the references carousel to the previous item. */
function showPreviousReference() {
  currentReferenceIndex = getWrappedIndex(currentReferenceIndex - 1, referencesData.length);
  renderReferences();
}

/* Move the references carousel to the next item. */
function showNextReference() {
  currentReferenceIndex = getWrappedIndex(currentReferenceIndex + 1, referencesData.length);
  renderReferences();
}

/* Move the references carousel to a selected dot index. */
function updateReferenceIndex(rawIndex) {
  currentReferenceIndex = Number(rawIndex);
  renderReferences();
}

/* Open a project overlay when a project row was clicked. */
function handleProjectButtonClick(event) {
  const projectButton = event.target.closest("[data-project-identifier]");
  if (projectButton) openProjectOverlay(projectButton.dataset.projectIdentifier);
}

/* Close the overlay when a close target was clicked. */
function handleOverlayCloseClick(event) {
  const closeTarget = event.target.closest("[data-close-overlay]");
  if (closeTarget) closeProjectOverlay();
}

/* Update the active reference when a dot was clicked. */
function handleReferenceDotClick(event) {
  const referenceDot = event.target.closest("[data-reference-index]");
  if (referenceDot) updateReferenceIndex(referenceDot.dataset.referenceIndex);
}

/* Route document click events to the matching page handler. */
function handleDocumentClick(event) {
  handleProjectButtonClick(event);
  handleOverlayCloseClick(event);
  handleReferenceDotClick(event);
  handleGrowthMindsetClick(event);
}

/* Close all open overlays when Escape is pressed. */
function closeAllOpenOverlays() {
  closeProjectOverlay();
  closeOpenGrowthMindsetOverlay();
}

/* Handle keyboard shortcuts for global page interactions. */
function handleDocumentKeydown(event) {
  if (event.key === "Escape") return closeAllOpenOverlays();
  handleGrowthMindsetKeydown(event);
}

/* Register all page-level click and keyboard interactions. */
function registerPageEventListeners() {
  document.addEventListener("click", handleDocumentClick);
  document.addEventListener("keydown", handleDocumentKeydown);
  pageElements.projectOverlayCloseButton?.addEventListener("click", closeProjectOverlay);
  pageElements.projectOverlayNextButton?.addEventListener("click", showNextProjectInOverlay);
  pageElements.referencesPreviousButton?.addEventListener("click", showPreviousReference);
  pageElements.referencesNextButton?.addEventListener("click", showNextReference);
}

/* Render the dynamic page areas and connect their events. */
function initializePage() {
  renderSkills();
  renderProjects();
  renderReferences();
  registerPageEventListeners();
}