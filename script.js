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

/* Validate one normal text field. */
function validateContactField(control) {
  const messages = getContactErrorMessages();
  const value = control.input.value.trim();

  if (!value) {
    const message = control.errorKey === "email" ? messages.emailRequired : messages[control.errorKey];
    showContactError(control, message);
    return false;
  }

  if (control.errorKey === "email" && !isValidEmailAddress(value)) {
    showContactError(control, messages.emailInvalid);
    return false;
  }

  hideContactError(control);
  return true;
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

/* Register contact validation events. */
function initializeContactValidation() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  form.setAttribute("novalidate", "novalidate");

  const controls = [
    createFieldValidationControl("contactName", "name"),
    createFieldValidationControl("contactEmail", "email"),
    createFieldValidationControl("contactMessage", "message"),
    createPrivacyValidationControl()
  ].filter(Boolean);

  contactValidationControls.push(...controls);

  controls.forEach((control) => {
    const eventName = control.errorKey === "privacy" ? "change" : "input";
    control.input.addEventListener(eventName, () => {
      if (!control.errorElement.hidden) validateContactControl(control);
    });
  });

  form.addEventListener("submit", validateContactForm);
  form.querySelector(".contact-form__submit")?.addEventListener("click", validateContactForm);
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