const headerNavigationSectionIds = ["about", "skills", "projects"];
let headerNavigationScrollFrame = null;

/* Return all hash links in the header navigation. */
function getHeaderNavigationLinks() {
  return Array.from(document.querySelectorAll('.site-header__link[href^="#"]'));
}

/* Mark one header navigation link as active. */
function setActiveHeaderNavigationLink(hash) {
  getHeaderNavigationLinks().forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === hash);
  });
}

/* Return the section hash that is currently nearest to the viewport top. */
function getCurrentHeaderNavigationHash() {
  const activationLine = Math.min(window.innerHeight * 0.42, 320);
  let currentHash = "#about";

  headerNavigationSectionIds.forEach((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section?.getBoundingClientRect().top <= activationLine) currentHash = `#${sectionId}`;
  });

  return currentHash;
}

/* Update the active header link after scrolling. */
function updateActiveHeaderNavigationFromScroll() {
  setActiveHeaderNavigationLink(getCurrentHeaderNavigationHash());
  headerNavigationScrollFrame = null;
}

/* Request one animation-frame based header navigation update. */
function requestHeaderNavigationScrollUpdate() {
  if (headerNavigationScrollFrame !== null) return;
  headerNavigationScrollFrame = window.requestAnimationFrame(updateActiveHeaderNavigationFromScroll);
}

/* Update the active header link immediately after a navigation click. */
function handleHeaderNavigationClick(event) {
  const link = event.target.closest('.site-header__link[href^="#"]');
  if (link) setActiveHeaderNavigationLink(link.getAttribute("href"));
}

/* Return the initial hash for the active header navigation state. */
function getInitialHeaderNavigationHash() {
  const hashId = window.location.hash.slice(1);
  if (headerNavigationSectionIds.includes(hashId)) return window.location.hash;
  return getCurrentHeaderNavigationHash();
}

/* Prepare active-state handling for the header navigation. */
function initializeHeaderNavigation() {
  const nav = document.querySelector(".site-header__nav");
  if (!nav) return;

  nav.addEventListener("click", handleHeaderNavigationClick);
  window.addEventListener("scroll", requestHeaderNavigationScrollUpdate, { passive: true });
  window.addEventListener("resize", requestHeaderNavigationScrollUpdate);

  setActiveHeaderNavigationLink(getInitialHeaderNavigationHash());
  requestHeaderNavigationScrollUpdate();
}

/* Return localized accessibility labels for the mobile menu button. */
function getMobileMenuLabels() {
  if (currentLanguage === "de") return { open: "Navigation öffnen", close: "Navigation schließen" };
  return { open: "Open navigation", close: "Close navigation" };
}

/* Check whether the mobile menu is currently open. */
function isMobileMenuOpen() {
  return document.body.classList.contains("mobile-menu-open");
}

/* Refresh the mobile menu button label for the current state. */
function refreshMobileMenuLabel() {
  const menuButton = document.querySelector(".site-header__menu-toggle");
  const labels = getMobileMenuLabels();

  if (!menuButton) return;

  menuButton.setAttribute("aria-label", isMobileMenuOpen() ? labels.close : labels.open);
}

/* Set the open or closed state of the mobile menu. */
function setMobileMenuState(isOpen) {
  const menuButton = document.querySelector(".site-header__menu-toggle");

  document.body.classList.toggle("mobile-menu-open", isOpen);

  if (menuButton) menuButton.setAttribute("aria-expanded", String(isOpen));

  refreshMobileMenuLabel();
}

/* Close the mobile menu overlay. */
function closeMobileMenu() {
  setMobileMenuState(false);
}

/* Toggle the mobile menu overlay. */
function toggleMobileMenu() {
  setMobileMenuState(!isMobileMenuOpen());
}

/* Close the mobile menu when desktop layout returns. */
function handleMobileMenuResize() {
  if (window.innerWidth > 768) closeMobileMenu();
}

/* Close the mobile menu when Escape is pressed. */
function handleMobileMenuKeydown(event) {
  if (event.key === "Escape") closeMobileMenu();
}

/* Check if a click happened outside the responsive menu and burger button. */
function isMobileMenuOutsideClick(event, mobileMenu, menuButton) {
  if (!isMobileMenuOpen()) return false;
  if (!(event.target instanceof Element)) return false;

  const clickedInsideMenu = mobileMenu.contains(event.target);
  const clickedMenuButton = menuButton.contains(event.target);

  return !clickedInsideMenu && !clickedMenuButton;
}

/* Close the responsive menu when clicking outside. */
function handleMobileMenuOutsideClick(event, mobileMenu, menuButton) {
  if (isMobileMenuOutsideClick(event, mobileMenu, menuButton)) closeMobileMenu();
}

/* Close the mobile menu after a menu link click. */
function registerMobileMenuLinks(mobileMenu) {
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });
}

/* Prepare the burger button and responsive menu overlay. */
function initializeMobileHeaderMenu() {
  const menuButton = document.querySelector(".site-header__menu-toggle");
  const mobileMenu = document.getElementById("siteHeaderMobileMenu");

  if (!menuButton || !mobileMenu) return;

  refreshMobileMenuLabel();

  menuButton.addEventListener("click", toggleMobileMenu);
  registerMobileMenuLinks(mobileMenu);

  window.addEventListener("resize", handleMobileMenuResize);
  document.addEventListener("keydown", handleMobileMenuKeydown);
  document.addEventListener("click", (event) => handleMobileMenuOutsideClick(event, mobileMenu, menuButton));
}

const navigationApplyPageLanguage = applyPageLanguage;

/* Extend language updates with mobile menu label refreshes. */
function applyPageLanguageWithNavigation(language) {
  navigationApplyPageLanguage(language);
  refreshMobileMenuLabel();
}

applyPageLanguage = applyPageLanguageWithNavigation;