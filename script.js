/* Start every page module after all deferred files are available. */
function startPortfolioPage() {
  initializePage();
  initializeLanguageSwitch();
  initializeContactValidation();
  initializeHeaderNavigation();
  initializeCursorShadow();
  initializeMobileHeaderMenu();
}

startPortfolioPage();