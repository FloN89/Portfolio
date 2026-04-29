/* Select one matching element from the page. */
function selectElement(selector) {
  return document.querySelector(selector);
}

/* Select all matching elements from the page. */
function selectAllElements(selector) {
  return Array.from(document.querySelectorAll(selector));
}

/* Read translated text from a translation object. */
function readTranslatedText(translatedText) {
  return translatedText[currentLanguage] || translatedText.en;
}

/* Set plain text for one matching element. */
function setElementText(selector, text) {
  const element = selectElement(selector);
  if (element) element.textContent = text;
}

/* Set markup for one matching element. */
function setElementMarkup(selector, markup) {
  const element = selectElement(selector);
  if (element) element.innerHTML = markup;
}

/* Set an attribute for one matching element. */
function setElementAttribute(selector, attribute, value) {
  const element = selectElement(selector);
  if (element) element.setAttribute(attribute, value);
}

/* Set plain text for one element inside a matching list. */
function setElementTextByPosition(selector, position, text) {
  const element = selectAllElements(selector)[position];
  if (element) element.textContent = text;
}

/* Set markup for one element inside a matching list. */
function setElementMarkupByPosition(selector, position, markup) {
  const element = selectAllElements(selector)[position];
  if (element) element.innerHTML = markup;
}