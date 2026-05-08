const aosStylesheetHref = "https://unpkg.com/aos@2.3.4/dist/aos.css";
const aosScriptSrc = "https://unpkg.com/aos@2.3.4/dist/aos.js";
let aosLoadPromise = null;
let scrollAnimationsInitialized = false;

/* Add one attribute map to one element. */
function setScrollAnimationAttributes(element, attributes) {
  if (!element) return;
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
}

/* Add one attribute map to every element matching one selector. */
function setScrollAnimationAttributesForSelector(selector, attributes) {
  document.querySelectorAll(selector).forEach((element) => setScrollAnimationAttributes(element, attributes));
}

/* Add AOS attributes to static page blocks. */
function applyStaticScrollAnimationAttributes() {
  const staticAnimationTargets = [
    [".hero__center", { "data-aos": "fade-up", "data-aos-delay": "120" }],
    [".hero__left-rail", { "data-aos": "fade-down", "data-aos-delay": "360" }],
    [".hero__right-rail", { "data-aos": "fade-down", "data-aos-delay": "420" }],
    [".hero__ticker-wrap", { "data-aos": "fade-up", "data-aos-delay": "520" }],
    [".about__media", { "data-aos": "fade-right" }],
    [".about__content", { "data-aos": "fade-left", "data-aos-delay": "120" }],
    [".skills-left", { "data-aos": "fade-right" }],
    [".skills-right", { "data-aos": "fade-left", "data-aos-delay": "140" }],
    [".projects-header", { "data-aos": "fade-up" }],
    [".references-eyebrow", { "data-aos": "fade-up" }],
    [".references-stage", { "data-aos": "zoom-in", "data-aos-delay": "120" }],
    [".references-controls", { "data-aos": "fade-up", "data-aos-delay": "180" }],
    [".contact-copy", { "data-aos": "fade-right" }],
    [".contact-form", { "data-aos": "fade-left", "data-aos-delay": "120" }],
    [".site-footer__inner", { "data-aos": "fade-up" }]
  ];

  staticAnimationTargets.forEach(([selector, attributes]) => setScrollAnimationAttributesForSelector(selector, attributes));
}

/* Add staggered AOS attributes to the rendered skill cards. */
function applySkillScrollAnimationAttributes() {
  document.querySelectorAll(".skill-item").forEach((skillItem, index) => {
    setScrollAnimationAttributes(skillItem, {
      "data-aos": "zoom-in",
      "data-aos-delay": String(Math.min(index * 55, 440)),
      "data-aos-anchor": "#skills"
    });
  });
}

/* Add staggered AOS attributes to the rendered project rows. */
function applyProjectScrollAnimationAttributes() {
  document.querySelectorAll(".project-row").forEach((projectRow, index) => {
    setScrollAnimationAttributes(projectRow, {
      "data-aos": "fade-up",
      "data-aos-delay": String(Math.min(index * 90, 360)),
      "data-aos-anchor": "#projects"
    });
  });
}

/* Add all AOS attributes that can safely be applied after rendering. */
function applyPortfolioScrollAnimationAttributes() {
  applyStaticScrollAnimationAttributes();
  applySkillScrollAnimationAttributes();
  applyProjectScrollAnimationAttributes();
}

/* Refresh AOS after dynamic page content is rendered again. */
function refreshPortfolioScrollAnimations() {
  if (!window.AOS || !scrollAnimationsInitialized) return;
  window.requestAnimationFrame(() => window.AOS.refreshHard());
}

/* Keep dynamic skills animated after initial render and after language changes. */
function patchSkillRenderForScrollAnimations() {
  const originalRenderSkills = renderSkills;
  renderSkills = function renderSkillsWithScrollAnimations() {
    originalRenderSkills();
    applySkillScrollAnimationAttributes();
    refreshPortfolioScrollAnimations();
  };
}

/* Keep dynamic projects animated after initial render and after language changes. */
function patchProjectRenderForScrollAnimations() {
  const originalRenderProjects = renderProjects;
  renderProjects = function renderProjectsWithScrollAnimations() {
    originalRenderProjects();
    applyProjectScrollAnimationAttributes();
    refreshPortfolioScrollAnimations();
  };
}

/* Patch dynamic render functions before the page is rendered. */
function patchDynamicRenderFunctionsForScrollAnimations() {
  patchSkillRenderForScrollAnimations();
  patchProjectRenderForScrollAnimations();
}

/* Add the AOS stylesheet once. */
function loadAosStylesheet() {
  if (document.querySelector(`link[href="${aosStylesheetHref}"]`)) return;

  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = aosStylesheetHref;
  document.head.appendChild(stylesheet);
}

/* Load the AOS script once and resolve even if the CDN is unavailable. */
function loadAosScript() {
  if (window.AOS) return Promise.resolve();
  if (aosLoadPromise) return aosLoadPromise;

  aosLoadPromise = new Promise((resolve) => {
    const existingScript = document.querySelector(`script[src="${aosScriptSrc}"]`);
    const script = existingScript || document.createElement("script");

    script.addEventListener("load", resolve, { once: true });
    script.addEventListener("error", resolve, { once: true });

    if (!existingScript) {
      script.src = aosScriptSrc;
      script.defer = true;
      document.head.appendChild(script);
    }
  });

  return aosLoadPromise;
}

/* Load AOS assets. */
function loadAosLibrary() {
  loadAosStylesheet();
  return loadAosScript();
}

/* Start AOS with a subtle portfolio-wide motion setup. */
function initializeScrollAnimations() {
  loadAosLibrary().then(() => {
    if (!window.AOS) return;

    window.AOS.init({
      duration: 720,
      easing: "ease-out-cubic",
      once: true,
      offset: 90,
      delay: 0,
      anchorPlacement: "top-bottom"
    });

    scrollAnimationsInitialized = true;
    refreshPortfolioScrollAnimations();
  });
}

/* Start every page module after all deferred files are available. */
function startPortfolioPage() {
  patchDynamicRenderFunctionsForScrollAnimations();
  initializePage();
  applyPortfolioScrollAnimationAttributes();
  initializeLanguageSwitch();
  initializeContactValidation();
  initializeHeaderNavigation();
  initializeCursorShadow();
  initializeMobileHeaderMenu();
  initializeScrollAnimations();
}

startPortfolioPage();