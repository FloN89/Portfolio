const contactValidationControls = [];

/* Return the currently active contact error messages. */
function getContactErrorMessages() {
  const translations = getLanguageTranslations(currentLanguage);
  return translations.contact.errors || pageTranslations.en.contact.errors;
}

/* Insert one element directly after another element. */
function insertAfter(referenceElement, newElement) {
  referenceElement.parentNode.insertBefore(newElement, referenceElement.nextSibling);
}

/* Create one reusable error message element. */
function createContactErrorElement(id) {
  const errorElement = document.createElement("p");
  errorElement.className = "contact-form__error";
  errorElement.id = id;
  errorElement.hidden = true;
  errorElement.setAttribute("aria-live", "polite");
  return errorElement;
}

/* Prepare the error message under a normal input or textarea label. */
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

/* Prepare the error message under the privacy checkbox. */
function createPrivacyValidationControl() {
  const input = document.getElementById("contactPrivacy");
  const wrapper = input?.closest(".contact-form__privacy");

  if (!input || !wrapper) return null;

  const errorElement = createContactErrorElement("contactPrivacyError");
  wrapper.appendChild(errorElement);
  input.setAttribute("aria-describedby", errorElement.id);

  return { input, wrapper, errorElement, errorKey: "privacy" };
}

/* Show one validation message. */
function showContactError(control, message) {
  control.errorElement.textContent = message;
  control.errorElement.hidden = false;
  control.wrapper.classList.add("is-invalid");
  control.input.setAttribute("aria-invalid", "true");
}

/* Hide one validation message. */
function hideContactError(control) {
  control.errorElement.textContent = "";
  control.errorElement.hidden = true;
  control.wrapper.classList.remove("is-invalid");
  control.input.removeAttribute("aria-invalid");
}

/* Check if an email address has a valid basic format. */
function isValidEmailAddress(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/* Return the required message for one field. */
function getRequiredContactMessage(control, messages) {
  if (control.errorKey === "email") return messages.emailRequired;
  return messages[control.errorKey];
}

/* Show the required message for one empty field. */
function showRequiredContactError(control, messages) {
  const message = getRequiredContactMessage(control, messages);
  showContactError(control, message);
}

/* Check if one email field contains an invalid email. */
function hasInvalidContactEmail(control, value) {
  return control.errorKey === "email" && !isValidEmailAddress(value);
}

/* Validate one normal text field. */
function validateContactField(control) {
  const messages = getContactErrorMessages();
  const value = control.input.value.trim();

  if (!value) return showEmptyContactField(control, messages);
  if (hasInvalidContactEmail(control, value)) return showInvalidContactEmail(control, messages);

  hideContactError(control);
  return true;
}

/* Show the validation message for one empty field. */
function showEmptyContactField(control, messages) {
  showRequiredContactError(control, messages);
  return false;
}

/* Show the validation message for one invalid email. */
function showInvalidContactEmail(control, messages) {
  showContactError(control, messages.emailInvalid);
  return false;
}

/* Validate the privacy policy checkbox. */
function validatePrivacyCheckbox(control) {
  const messages = getContactErrorMessages();

  if (!control.input.checked) {
    showContactError(control, messages.privacy);
    return false;
  }

  hideContactError(control);
  return true;
}

/* Validate one contact control. */
function validateContactControl(control) {
  if (control.errorKey === "privacy") return validatePrivacyCheckbox(control);
  return validateContactField(control);
}

/* Validate the complete contact form. */
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

/* Refresh visible validation texts after language changes. */
function refreshContactValidationMessages() {
  contactValidationControls.forEach((control) => {
    if (!control.errorElement.hidden) validateContactControl(control);
  });
}

/* Create all contact validation controls. */
function createContactValidationControls() {
  return [
    createFieldValidationControl("contactName", "name"),
    createFieldValidationControl("contactEmail", "email"),
    createFieldValidationControl("contactMessage", "message"),
    createPrivacyValidationControl()
  ].filter(Boolean);
}

/* Validate one control again when an error is visible. */
function validateVisibleContactError(control) {
  if (!control.errorElement.hidden) validateContactControl(control);
}

/* Register one contact control event. */
function registerContactControlEvent(control) {
  const eventName = control.errorKey === "privacy" ? "change" : "input";
  control.input.addEventListener(eventName, () => validateVisibleContactError(control));
}

/* Register all contact form events. */
function registerContactFormEvents(form, controls) {
  controls.forEach(registerContactControlEvent);
  form.addEventListener("submit", validateContactForm);
  form.querySelector(".contact-form__submit")?.addEventListener("click", validateContactForm);
}

/* Register contact validation events. */
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

initializePage();
initializeLanguageSwitch();
initializeContactValidation();
initializeCursorShadow();