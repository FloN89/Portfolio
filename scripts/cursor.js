/* Create the cursor shadow element. */
function createCursorShadowElement() {
  cursorShadowElement = document.createElement("div");
  cursorShadowElement.className = "cursor-shadow";
  document.body.appendChild(cursorShadowElement);
}

/* Store the cursor target position. */
function handlePointerMove(event) {
  cursorShadowTargetX = event.clientX;
  cursorShadowTargetY = event.clientY;
  document.body.classList.add("cursor-shadow-visible");
}

/* Hide the cursor shadow when the pointer leaves. */
function handlePointerLeave() {
  document.body.classList.remove("cursor-shadow-visible");
}

/* Move current shadow values toward the target. */
function updateCursorShadowCoordinates() {
  cursorShadowCurrentX += (cursorShadowTargetX - cursorShadowCurrentX) * 0.18;
  cursorShadowCurrentY += (cursorShadowTargetY - cursorShadowCurrentY) * 0.18;
}

/* Write the cursor shadow position to the page. */
function positionCursorShadowElement() {
  if (!cursorShadowElement) return;
  cursorShadowElement.style.transform = `translate3d(${cursorShadowCurrentX}px, ${cursorShadowCurrentY}px, 0) translate(-50%, -50%)`;
}

/* Animate the soft cursor shadow. */
function animateCursorShadow() {
  updateCursorShadowCoordinates();
  positionCursorShadowElement();
  requestAnimationFrame(animateCursorShadow);
}

/* Prepare the custom cursor shadow for precise pointers. */
function initializeCursorShadow() {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  createCursorShadowElement();
  window.addEventListener("pointermove", handlePointerMove);
  window.addEventListener("pointerleave", handlePointerLeave);
  animateCursorShadow();
}