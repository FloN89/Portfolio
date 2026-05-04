const contactValidationControls = [];

function getContactErrorMessages() {
  const translations = getLanguageTranslations(currentLanguage);
  return translations.contact.errors || pageTranslations.en.contact.errors;
}

function insertAfter(referenceElement, newElement) {
  referenceElement.parentNode.insertBefore(newElement, referenceElement.nextSibling);
}

function createContactErrorElement(id) {
  const errorElement = document.createElement("p");
  errorElement.className = "contact-form__error";
  errorElement.id = id;
  errorElement.hidden = true;
  errorElement.setAttribute("aria-live", "polite");
  return errorElement;
}

function createFieldValidationControl(inputId, errorKey) {
  const input = document.getElementById(inputId);
  const field = input?.closest(".contact-form__field");
  const label = field?.querySelector(".contact-form__label");

  if (!input || !field || !label) return null;

  const errorElement = createContactErrorElement(`${inputId}Error`);
  insertAfter(label, errorElement);
  input.setAttribute("aria-describedby", errorElement.id);

  return { input, wrapper: field, errorElement, errorKey };
}

function createPrivacyValidationControl() {
  const input = document.getElementById("contactPrivacy");
  const wrapper = input?.closest(".contact-form__privacy");

  if (!input || !wrapper) return null;

  const errorElement = createContactErrorElement("contactPrivacyError");
  wrapper.appendChild(errorElement);
  input.setAttribute("aria-describedby", errorElement.id);

  return { input, wrapper, errorElement, errorKey: "privacy" };
}

function showContactError(control, message) {
  control.errorElement.textContent = message;
  control.errorElement.hidden = false;
  control.wrapper.classList.add("is-invalid");
  control.input.setAttribute("aria-invalid", "true");
}

function hideContactError(control) {
  control.errorElement.textContent = "";
  control.errorElement.hidden = true;
  control.wrapper.classList.remove("is-invalid");
  control.input.removeAttribute("aria-invalid");
}

function isValidEmailAddress(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getRequiredContactMessage(control, messages) {
  if (control.errorKey === "email") return messages.emailRequired;
  return messages[control.errorKey];
}

function showRequiredContactError(control, messages) {
  const message = getRequiredContactMessage(control, messages);
  showContactError(control, message);
}

function hasInvalidContactEmail(control, value) {
  return control.errorKey === "email" && !isValidEmailAddress(value);
}

function validateContactField(control) {
  const messages = getContactErrorMessages();
  const value = control.input.value.trim();

  if (!value) return showEmptyContactField(control, messages);
  if (hasInvalidContactEmail(control, value)) return showInvalidContactEmail(control, messages);

  hideContactError(control);
  return true;
}

function showEmptyContactField(control, messages) {
  showRequiredContactError(control, messages);
  return false;
}

function showInvalidContactEmail(control, messages) {
  showContactError(control, messages.emailInvalid);
  return false;
}

function validatePrivacyCheckbox(control) {
  const messages = getContactErrorMessages();

  if (!control.input.checked) {
    showContactError(control, messages.privacy);
    return false;
  }

  hideContactError(control);
  return true;
}

function validateContactControl(control) {
  if (control.errorKey === "privacy") return validatePrivacyCheckbox(control);
  return validateContactField(control);
}

function validateContactForm(event) {
  event.preventDefault();

  const validationResults = contactValidationControls.map(validateContactControl);
  const firstInvalidControl = contactValidationControls.find((control, index) => !validationResults[index]);

  if (firstInvalidControl) {
    firstInvalidControl.input.focus();
    return false;
  }

  return true;
}

function refreshContactValidationMessages() {
  contactValidationControls.forEach((control) => {
    if (!control.errorElement.hidden) validateContactControl(control);
  });
}

function createContactValidationControls() {
  return [
    createFieldValidationControl("contactName", "name"),
    createFieldValidationControl("contactEmail", "email"),
    createFieldValidationControl("contactMessage", "message"),
    createPrivacyValidationControl()
  ].filter(Boolean);
}

function validateVisibleContactError(control) {
  if (!control.errorElement.hidden) validateContactControl(control);
}

function registerContactControlEvent(control) {
  const eventName = control.errorKey === "privacy" ? "change" : "input";
  control.input.addEventListener(eventName, () => validateVisibleContactError(control));
}

function registerContactFormEvents(form, controls) {
  controls.forEach(registerContactControlEvent);
  form.addEventListener("submit", validateContactForm);
  form.querySelector(".contact-form__submit")?.addEventListener("click", validateContactForm);
}

function initializeContactValidation() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  form.setAttribute("novalidate", "novalidate");
  const controls = createContactValidationControls();
  contactValidationControls.push(...controls);
  registerContactFormEvents(form, controls);
}

const originalApplyPageLanguage = applyPageLanguage;

applyPageLanguage = function applyPageLanguageWithValidation(language) {
  originalApplyPageLanguage(language);
  refreshContactValidationMessages();
};

const headerNavigationSectionIds = ["about", "skills", "projects"];
let headerNavigationScrollFrame = null;

function getHeaderNavigationLinks() {
  return Array.from(document.querySelectorAll('.site-header__link[href^="#"]'));
}

function setActiveHeaderNavigationLink(hash) {
  const links = getHeaderNavigationLinks();

  links.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === hash);
  });
}

function getCurrentHeaderNavigationHash() {
  const activationLine = Math.min(window.innerHeight * 0.42, 320);
  let currentHash = "#about";

  headerNavigationSectionIds.forEach((sectionId) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop <= activationLine) currentHash = `#${sectionId}`;
  });

  return currentHash;
}

function updateActiveHeaderNavigationFromScroll() {
  setActiveHeaderNavigationLink(getCurrentHeaderNavigationHash());
  headerNavigationScrollFrame = null;
}

function requestHeaderNavigationScrollUpdate() {
  if (headerNavigationScrollFrame !== null) return;
  headerNavigationScrollFrame = window.requestAnimationFrame(updateActiveHeaderNavigationFromScroll);
}

function handleHeaderNavigationClick(event) {
  const link = event.target.closest('.site-header__link[href^="#"]');
  if (!link) return;
  setActiveHeaderNavigationLink(link.getAttribute("href"));
}

function getInitialHeaderNavigationHash() {
  const hashId = window.location.hash.slice(1);
  if (headerNavigationSectionIds.includes(hashId)) return window.location.hash;
  return getCurrentHeaderNavigationHash();
}

function initializeHeaderNavigation() {
  const nav = document.querySelector(".site-header__nav");
  if (!nav) return;
  nav.addEventListener("click", handleHeaderNavigationClick);
  window.addEventListener("scroll", requestHeaderNavigationScrollUpdate, { passive: true });
  window.addEventListener("resize", requestHeaderNavigationScrollUpdate);
  setActiveHeaderNavigationLink(getInitialHeaderNavigationHash());
  requestHeaderNavigationScrollUpdate();
}

function initializeMobileHeaderMenu() {
  const menuButton = document.querySelector(".site-header__menu-toggle");
  const mobileMenu = document.getElementById("siteHeaderMobileMenu");

  if (!menuButton || !mobileMenu) return;

  function getMobileMenuLabels() {
    return currentLanguage === "de"
      ? { open: "Navigation öffnen", close: "Navigation schließen" }
      : { open: "Open navigation", close: "Close navigation" };
  }

  function setMobileMenuState(isOpen) {
    const labels = getMobileMenuLabels();

    document.body.classList.toggle("mobile-menu-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? labels.close : labels.open);
  }

  function closeMobileMenu() {
    setMobileMenuState(false);
  }

  function toggleMobileMenu() {
    setMobileMenuState(!document.body.classList.contains("mobile-menu-open"));
  }

  menuButton.addEventListener("click", toggleMobileMenu);

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeMobileMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMobileMenu();
  });
}

initializePage();
initializeLanguageSwitch();
initializeContactValidation();
initializeHeaderNavigation();
initializeCursorShadow();
initializeMobileHeaderMenu();