/* Create the markup for one skill item. */
function createSkillMarkup(skill) {
  const skillName = readTranslatedText(skill.names);
  return `
    <div class="skill-item">
      <div class="skill-icon-wrap">
        <img src="${skill.icon}" alt="${skillName}" class="skill-icon" />
      </div>
      <span class="skill-name">${skillName}</span>
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

/* Create the markup for one project row. */
function createProjectMarkup(project) {
  const projectTitle = readTranslatedText(project.title);
  const projectTechnologies = createProjectTechnologiesMarkup(project.stack);
  return `
    <button type="button" class="project-row" data-project-identifier="${project.identifier}">
      <span class="project-row__title">${projectTitle}</span>
      <span class="project-row__meta">${projectTechnologies}</span>
    </button>
  `;
}

/* Render all project rows into the project list. */
function renderProjects() {
  if (!pageElements.projectsList) return;
  pageElements.projectsList.innerHTML = projectsData.map(createProjectMarkup).join("");
  updateGeneratedAriaLabels();
}

/* Find one project by its identifier. */
function findProject(identifier) {
  return projectsData.find((project) => project.identifier === identifier);
}

/* Create the markup for one overlay technology tag. */
function createOverlayTechnologyMarkup(technology) {
  return `<span class="project-overlay__stack-item">${technology}</span>`;
}

/* Update the project overlay with project content. */
function fillProjectOverlay(project) {
  pageElements.projectOverlayTitle.textContent = readTranslatedText(project.title);
  pageElements.projectOverlayText.textContent = readTranslatedText(project.description);
  pageElements.projectOverlayStack.innerHTML = project.stack.map(createOverlayTechnologyMarkup).join("");
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

/* Close the overlay when the backdrop is clicked. */
function handleOverlayCloseClick(event) {
  const closeButton = event.target.closest("[data-close-overlay]");
  if (closeButton) closeProjectOverlay();
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