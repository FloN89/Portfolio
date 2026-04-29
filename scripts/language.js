/* Return all texts for the given language. */
function getLanguageTranslations(language) {
  return pageTranslations[language] || pageTranslations.en;
}

/* Update header texts and accessible labels. */
function applyHeaderTexts(translations) {
  setElementAttribute(".site-header__nav", "aria-label", translations.header.navLabel);
  setElementAttribute('.site-header__link[href="#about"]', "aria-label", translations.header.about);
  setElementAttribute('.site-header__link[href="#skills"]', "aria-label", translations.header.skills);
  setElementAttribute('.site-header__link[href="#projects"]', "aria-label", translations.header.projects);
  setElementAttribute('.site-header__link[href="#about"] .site-header__link-image', "alt", translations.header.about);
  setElementAttribute('.site-header__link[href="#skills"] .site-header__link-image', "alt", translations.header.skills);
  setElementAttribute('.site-header__link[href="#projects"] .site-header__link-image', "alt", translations.header.projects);
}

/* Update ticker texts in the hero section. */
function applyHeroTickerTexts(tickerTexts) {
  selectAllElements(".hero__ticker-item").forEach((item, index) => {
    item.textContent = tickerTexts[index % tickerTexts.length];
  });
}

/* Update hero section texts and labels. */
function applyHeroTexts(translations) {
  setElementText(".hero__role", translations.hero.role);
  setElementTextByPosition(".hero__button-text", 0, translations.hero.buttons[0]);
  setElementTextByPosition(".hero__button-text", 1, translations.hero.buttons[1]);
  setElementAttribute(".hero__arrow", "aria-label", translations.hero.arrowLabel);
  applyHeroTickerTexts(translations.hero.ticker);
}

/* Update about section list items. */
function applyAboutItemTexts(itemTexts) {
  itemTexts.forEach((itemText, index) => {
    setElementTextByPosition(".about__item p", index, itemText);
  });
}

/* Update about section texts and image text. */
function applyAboutTexts(translations) {
  setElementAttribute(".about__image", "alt", translations.about.imageAlt);
  setElementText(".about__eyebrow", translations.about.eyebrow);
  setElementText(".about__title", translations.about.title);
  setElementText(".about__intro", translations.about.intro);
  applyAboutItemTexts(translations.about.items);
}

/* Update skills section texts. */
function applySkillsTexts(translations) {
  setElementText(".skills-eyebrow", translations.skills.eyebrow);
  setElementText(".skills-title", translations.skills.title);
  setElementText(".skills-text", translations.skills.text);
  setElementMarkup(".skills-subtitle", translations.skills.subtitle);
  setElementText(".skills-small-text", translations.skills.smallText);
  setElementMarkup(".skills-btn", translations.skills.button);
}

/* Update projects section texts. */
function applyProjectsTexts(translations) {
  setElementText(".projects-eyebrow", translations.projects.eyebrow);
  setElementText(".projects-title", translations.projects.title);
  setElementText(".projects-intro", translations.projects.intro);
  setElementText(".project-overlay__eyebrow", translations.projects.overlayEyebrow);
  setElementText(".project-overlay__title", translations.projects.overlayTitle);
  setElementText(".project-overlay__text", translations.projects.overlayText);
  setElementAttribute(".project-overlay__close", "aria-label", translations.projects.closeLabel);
}

/* Update references section labels and texts. */
function applyReferencesTexts(translations) {
  setElementText(".references-eyebrow", translations.references.title);
  setElementText(".references-title", translations.references.title);
  setElementAttribute("#referencesPreviousButton", "aria-label", translations.references.previous);
  setElementAttribute("#referencesNextButton", "aria-label", translations.references.next);
}

/* Update all contact form labels. */
function applyContactLabelTexts(labelTexts) {
  labelTexts.forEach((labelText, index) => {
    setElementMarkupByPosition(".contact-form__label", index, labelText);
  });
}

/* Update all contact form placeholders. */
function applyContactPlaceholderTexts(placeholderTexts) {
  setElementAttribute("#contactName", "placeholder", placeholderTexts[0]);
  setElementAttribute("#contactEmail", "placeholder", placeholderTexts[1]);
  setElementAttribute("#contactMessage", "placeholder", placeholderTexts[2]);
}

/* Update contact section texts and fields. */
function applyContactTexts(translations) {
  setElementText(".contact-eyebrow", translations.contact.eyebrow);
  setElementMarkup(".contact-title", translations.contact.title);
  setElementText(".contact-subtitle", translations.contact.subtitle);
  setElementTextByPosition(".contact-copy .contact-text", 0, translations.contact.text);
  setElementMarkupByPosition(".contact-copy .contact-text", 1, translations.contact.smallText);
  applyContactLabelTexts(translations.contact.labels);
  applyContactPlaceholderTexts(translations.contact.placeholders);
  setElementMarkup(".contact-checkbox__text", translations.contact.privacy);
  setElementText(".contact-form__submit", translations.contact.button);
}

/* Update footer texts and labels. */
function applyFooterTexts(translations) {
  setElementAttribute(".site-footer__brand", "aria-label", translations.footer.brandLabel);
  setElementTextByPosition(".site-footer__meta span", 0, translations.footer.meta[0]);
  setElementTextByPosition(".site-footer__meta span", 1, translations.footer.meta[1]);
  setElementAttribute(".site-footer__nav", "aria-label", translations.footer.navLabel);
  setElementTextByPosition(".site-footer__nav a", 3, translations.footer.legal);
}

/* Update every static page text for one language. */
function applyStaticPageTexts(language) {
  const translations = getLanguageTranslations(language);
  document.documentElement.lang = translations.lang;
  applyHeaderTexts(translations);
  applyHeroTexts(translations);
  applyAboutTexts(translations);
  applySkillsTexts(translations);
  applyProjectsTexts(translations);
  applyReferencesTexts(translations);
  applyContactTexts(translations);
  applyFooterTexts(translations);
}

/* Update generated project row labels. */
function updateProjectAriaLabels(translations) {
  selectAllElements(".project-row").forEach((button) => {
    const projectTitle = button.querySelector(".project-row__title")?.textContent || "";
    button.setAttribute("aria-label", `${projectTitle} ${translations.projects.openLabel}`);
  });
}

/* Update generated reference dot labels. */
function updateReferenceDotAriaLabels(translations) {
  selectAllElements(".references-dot").forEach((dot, index) => {
    dot.setAttribute("aria-label", `${translations.references.dotLabel} ${index + 1}`);
  });
}

/* Update labels that belong to generated markup. */
function updateGeneratedAriaLabels(language = currentLanguage) {
  const translations = getLanguageTranslations(language);
  updateProjectAriaLabels(translations);
  updateReferenceDotAriaLabels(translations);
}

/* Update the language switch image for its state. */
function updateLanguageSwitchImage(isHovering = false) {
  const image = selectElement(".site-header__lang-switch");
  const imageSet = languageSwitchImages[currentLanguage];
  if (!image || !imageSet) return;
  image.src = isHovering ? imageSet.hover : imageSet.default;
}

/* Update the language button state and label. */
function updateLanguageButton() {
  const button = selectElement(".site-header__lang-button");
  const translations = getLanguageTranslations(currentLanguage);
  if (!button) return;
  button.setAttribute("aria-label", translations.header.switchLabel);
  button.setAttribute("aria-pressed", currentLanguage === "de" ? "true" : "false");
  updateLanguageSwitchImage(false);
}

/* Apply one language to all page sections. */
function applyPageLanguage(language) {
  currentLanguage = language;
  applyStaticPageTexts(language);
  renderSkills();
  renderProjects();
  renderReferences();
  refreshOpenProjectOverlay();
  updateGeneratedAriaLabels(language);
  updateLanguageButton();
}

/* Toggle between English and German. */
function handleLanguageButtonClick() {
  const nextLanguage = currentLanguage === "de" ? "en" : "de";
  applyPageLanguage(nextLanguage);
}

/* Show the hover image for the language switch. */
function showLanguageSwitchHoverImage() {
  updateLanguageSwitchImage(true);
}

/* Show the default image for the language switch. */
function showLanguageSwitchDefaultImage() {
  updateLanguageSwitchImage(false);
}

/* Connect language switch events. */
function registerLanguageButtonEvents(button) {
  button.addEventListener("click", handleLanguageButtonClick);
  button.addEventListener("mouseenter", showLanguageSwitchHoverImage);
  button.addEventListener("mouseleave", showLanguageSwitchDefaultImage);
  button.addEventListener("focus", showLanguageSwitchHoverImage);
  button.addEventListener("blur", showLanguageSwitchDefaultImage);
}

/* Prepare the language switch. */
function initializeLanguageSwitch() {
  const button = selectElement(".site-header__lang-button");
  applyPageLanguage(currentLanguage);
  if (!button) return;
  registerLanguageButtonEvents(button);
}