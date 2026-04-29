const pageElements = {
  skillsGrid: document.getElementById("skillsGrid"),
  projectsList: document.getElementById("projectsList"),
  projectOverlay: document.getElementById("projectOverlay"),
  projectOverlayTitle: document.getElementById("projectOverlayTitle"),
  projectOverlayText: document.getElementById("projectOverlayText"),
  projectOverlayStack: document.getElementById("projectOverlayStack"),
  projectOverlayCloseButton: document.getElementById("projectOverlayClose"),
  referencesStage: document.getElementById("referencesStage"),
  referencesDots: document.getElementById("referencesDots"),
  referencesPreviousButton: document.getElementById("referencesPreviousButton"),
  referencesNextButton: document.getElementById("referencesNextButton")
};

let currentLanguage = document.documentElement.lang === "de" ? "de" : "en";
let currentReferenceIndex = 0;
let currentProjectIdentifier = null;
let cursorShadowElement = null;
let cursorShadowTargetX = window.innerWidth / 2;
let cursorShadowTargetY = window.innerHeight / 2;
let cursorShadowCurrentX = cursorShadowTargetX;
let cursorShadowCurrentY = cursorShadowTargetY;