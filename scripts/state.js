const pageElements = {
  skillsGrid: document.getElementById("skillsGrid"),
  projectsList: document.getElementById("projectsList"),

  projectOverlay: document.getElementById("projectOverlay"),
  projectOverlayNumber: document.getElementById("projectOverlayNumber"),
  projectOverlayTitle: document.getElementById("projectOverlayTitle"),
  projectOverlayQuestion: document.getElementById("projectOverlayQuestion"),
  projectOverlayText: document.getElementById("projectOverlayText"),
  projectOverlayStack: document.getElementById("projectOverlayStack"),
  projectOverlayPreview: document.getElementById("projectOverlayPreview"),
  projectOverlayGithub: document.getElementById("projectOverlayGithub"),
  projectOverlayLive: document.getElementById("projectOverlayLive"),
  projectOverlayCloseButton: document.getElementById("projectOverlayClose"),
  projectOverlayNextButton: document.getElementById("projectOverlayNext"),
  projectOverlayNextText: document.getElementById("projectOverlayNextText"),

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