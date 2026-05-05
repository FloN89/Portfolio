const contactValidationControls = [];
const contactStatusMessages = {
  en: {
    sending: "Sending...",
    success: "Thank you! Your message was sent successfully.",
    error: "Sorry, your message could not be sent. Please try again later."
  },
  de: {
    sending: "Wird gesendet...",
    success: "Danke! Deine Nachricht wurde erfolgreich gesendet.",
    error: "Sorry, deine Nachricht konnte nicht gesendet werden. Bitte versuche es später erneut."
  }
};

let contactStatusElement = null;
let currentContactStatusState = null;

/* Return localized validation messages for the contact form. */
function getContactErrorMessages() {
  const translations = getLanguageTranslations(currentLanguage);
  return translations.contact.errors || pageTranslations.en.contact.errors;
}

/* Return the localized status text for one form state. */
function getContactStatusMessage(status) {
  return contactStatusMessages[currentLanguage]?.[status] || contactStatusMessages.en[status];
}

/* Insert one element directly after another element. */
function insertAfter(referenceElement, newElement) {
  referenceElement.parentNode.insertBefore(newElement, referenceElement.nextSibling);
}

/* Create one hidden validation message element. */
function createContactErrorElement(id) {
  const errorElement = document.createElement("p");
  errorElement.className = "contact-form__error";
  errorElement.id = id;
  errorElement.hidden = true;
  errorElement.setAttribute("aria-live", "polite");
  return errorElement;
}

/* Insert the contact status element before the submit button. */
function insertContactStatusElement(form, statusElement) {
  const submitButton = form.querySelector(".contact-form__submit");
  if (submitButton) form.insertBefore(statusElement, submitButton);
  if (!submitButton) form.appendChild(statusElement);
}

/* Create the form status live region. */
function createContactStatusElement(form) {
  const statusElement = document.createElement("p");
  statusElement.className = "contact-form__status";
  statusElement.hidden = true;
  statusElement.setAttribute("aria-live", "polite");
  statusElement.setAttribute("role", "status");
  insertContactStatusElement(form, statusElement);
  return statusElement;
}

/* Clear the currently visible contact status message. */
function clearContactStatusElement() {
  contactStatusElement.textContent = "";
  contactStatusElement.hidden = true;
  contactStatusElement.classList.remove("is-success", "is-error", "is-sending");
}

/* Apply the matching visual class for a contact status. */
function applyContactStatusClasses(status) {
  contactStatusElement.classList.toggle("is-success", status === "success");
  contactStatusElement.classList.toggle("is-error", status === "error");
  contactStatusElement.classList.toggle("is-sending", status === "sending");
}

/* Update or hide the form status message. */
function updateContactStatus(status) {
  currentContactStatusState = status;
  if (!contactStatusElement) return;
  if (!status) return clearContactStatusElement();
  contactStatusElement.textContent = getContactStatusMessage(status);
  contactStatusElement.hidden = false;
  applyContactStatusClasses(status);
}

/* Refresh the current status text after a language change. */
function refreshContactStatusMessage() {
  if (currentContactStatusState) updateContactStatus(currentContactStatusState);
}

/* Create validation state for a text, email or message field. */
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

/* Create validation state for the privacy checkbox. */
function createPrivacyValidationControl() {
  const input = document.getElementById("contactPrivacy");
  const wrapper = input?.closest(".contact-form__privacy");
  if (!input || !wrapper) return null;
  const errorElement = createContactErrorElement("contactPrivacyError");
  wrapper.appendChild(errorElement);
  input.setAttribute("aria-describedby", errorElement.id);
  return { input, wrapper, errorElement, errorKey: "privacy" };
}

/* Show one validation error next to its field. */
function showContactError(control, message) {
  control.errorElement.textContent = message;
  control.errorElement.hidden = false;
  control.wrapper.classList.add("is-invalid");
  control.input.setAttribute("aria-invalid", "true");
}

/* Hide one validation error next to its field. */
function hideContactError(control) {
  control.errorElement.textContent = "";
  control.errorElement.hidden = true;
  control.wrapper.classList.remove("is-invalid");
  control.input.removeAttribute("aria-invalid");
}

/* Check whether a value looks like an email address. */
function isValidEmailAddress(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/* Return the required-message text for one validation control. */
function getRequiredContactMessage(control, messages) {
  if (control.errorKey === "email") return messages.emailRequired;
  return messages[control.errorKey];
}

/* Show the required-message text for one empty field. */
function showRequiredContactError(control, messages) {
  const message = getRequiredContactMessage(control, messages);
  showContactError(control, message);
}

/* Check whether the email field contains an invalid value. */
function hasInvalidContactEmail(control, value) {
  return control.errorKey === "email" && !isValidEmailAddress(value);
}

/* Show the error state for an empty field. */
function showEmptyContactField(control, messages) {
  showRequiredContactError(control, messages);
  return false;
}

/* Show the error state for an invalid email field. */
function showInvalidContactEmail(control, messages) {
  showContactError(control, messages.emailInvalid);
  return false;
}

/* Validate one standard contact form field. */
function validateContactField(control) {
  const messages = getContactErrorMessages();
  const value = control.input.value.trim();
  if (!value) return showEmptyContactField(control, messages);
  if (hasInvalidContactEmail(control, value)) return showInvalidContactEmail(control, messages);
  hideContactError(control);
  return true;
}

/* Validate the privacy checkbox field. */
function validatePrivacyCheckbox(control) {
  const messages = getContactErrorMessages();
  if (!control.input.checked) {
    showContactError(control, messages.privacy);
    return false;
  }
  hideContactError(control);
  return true;
}

/* Validate one contact form control by type. */
function validateContactControl(control) {
  if (control.errorKey === "privacy") return validatePrivacyCheckbox(control);
  return validateContactField(control);
}

/* Focus the first invalid contact form control. */
function focusFirstInvalidControl(validationResults) {
  const invalidControl = contactValidationControls.find((control, index) => !validationResults[index]);
  if (invalidControl) invalidControl.input.focus();
  return Boolean(invalidControl);
}

/* Validate the whole contact form before submit. */
function validateContactForm() {
  const validationResults = contactValidationControls.map(validateContactControl);
  if (focusFirstInvalidControl(validationResults)) return false;
  return true;
}

/* Build the payload that is sent to the mail endpoint. */
function getContactFormPayload(form) {
  const formData = new FormData(form);
  return {
    name: String(formData.get("name") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    message: String(formData.get("message") || "").trim()
  };
}

/* Toggle the loading state of the submit button. */
function setContactFormPendingState(form, isPending) {
  const submitButton = form.querySelector(".contact-form__submit");
  if (!submitButton) return;
  submitButton.disabled = isPending;
  submitButton.classList.toggle("is-loading", isPending);
}

/* Create fetch options for the contact form request. */
function createContactRequestOptions(form) {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(getContactFormPayload(form))
  };
}

/* Read a JSON response without failing on empty or invalid JSON. */
async function readContactResponseJson(response) {
  try {
    return await response.json();
  } catch (error) {
    return null;
  }
}

/* Throw when the contact endpoint did not accept the request. */
function ensureContactResponseSucceeded(response, result) {
  if (!response.ok || !result?.success) {
    throw new Error(result?.error || "Mail delivery failed");
  }
}

/* Submit the contact form data to the configured endpoint. */
async function submitContactForm(form) {
  const endpoint = form.getAttribute("action") || "contact_form_mail.php";
  const response = await fetch(endpoint, createContactRequestOptions(form));
  const result = await readContactResponseJson(response);
  ensureContactResponseSucceeded(response, result);
}

/* Reset the form after a successful submit. */
function handleContactSubmitSuccess(form) {
  form.reset();
  contactValidationControls.forEach(hideContactError);
  updateContactStatus("success");
}

/* Send the form and update the status state. */
async function runContactFormSubmit(form) {
  setContactFormPendingState(form, true);
  updateContactStatus("sending");
  try {
    await submitContactForm(form);
    handleContactSubmitSuccess(form);
  } catch (error) {
    updateContactStatus("error");
  } finally {
    setContactFormPendingState(form, false);
  }
}

/* Handle contact form submit events. */
async function handleContactFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  updateContactStatus(null);
  if (!validateContactForm()) return;
  await runContactFormSubmit(form);
}

/* Refresh visible validation messages after a language change. */
function refreshContactValidationMessages() {
  contactValidationControls.forEach((control) => {
    if (!control.errorElement.hidden) validateContactControl(control);
  });
}

/* Create every validation control for the contact form. */
function createContactValidationControls() {
  return [
    createFieldValidationControl("contactName", "name"),
    createFieldValidationControl("contactEmail", "email"),
    createFieldValidationControl("contactMessage", "message"),
    createPrivacyValidationControl()
  ].filter(Boolean);
}

/* Revalidate a control only when its error is already visible. */
function validateVisibleContactError(control) {
  if (!control.errorElement.hidden) validateContactControl(control);
}

/* Reset status and validate a changed contact control. */
function handleContactControlChange(control) {
  updateContactStatus(null);
  validateVisibleContactError(control);
}

/* Register input or change handling for one contact control. */
function registerContactControlEvent(control) {
  const eventName = control.errorKey === "privacy" ? "change" : "input";
  control.input.addEventListener(eventName, () => handleContactControlChange(control));
}

/* Register all events used by the contact form. */
function registerContactFormEvents(form, controls) {
  controls.forEach(registerContactControlEvent);
  form.addEventListener("submit", handleContactFormSubmit);
}

/* Set safe defaults for the contact form element. */
function prepareContactFormElement(form) {
  form.setAttribute("novalidate", "novalidate");
  if (!form.getAttribute("action")) form.setAttribute("action", "contact_form_mail.php");
  if (!form.getAttribute("method")) form.setAttribute("method", "post");
}

/* Prepare validation and ajax submit for the contact form. */
function initializeContactValidation() {
  const form = document.querySelector(".contact-form");
  if (!form) return;
  prepareContactFormElement(form);
  contactStatusElement = createContactStatusElement(form);
  const controls = createContactValidationControls();
  contactValidationControls.push(...controls);
  registerContactFormEvents(form, controls);
}

const contactApplyPageLanguage = applyPageLanguage;

/* Extend language updates with contact validation refreshes. */
function applyPageLanguageWithContactValidation(language) {
  contactApplyPageLanguage(language);
  refreshContactValidationMessages();
  refreshContactStatusMessage();
}

applyPageLanguage = applyPageLanguageWithContactValidation;