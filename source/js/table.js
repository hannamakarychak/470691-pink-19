function actualResizeHandler() {
  const offersCells = document.querySelectorAll(
    ".offers__name--js:not(.offers__name--blank-js)"
  );
  const offersCellsArray = Array.prototype.slice.call(offersCells);

  const width = window.innerWidth;

  for (let index = 0; index < offersCellsArray.length; index++) {
    const cell = offersCellsArray[index];
    cell.setAttribute("colspan", width >= 660 ? 1 : 2);
  }
}

var resizeTimeout;

function resizeThrottler() {
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(function () {
      resizeTimeout = null;
      actualResizeHandler();
    }, 66);
  }
}

actualResizeHandler();
window.addEventListener("resize", resizeThrottler, false);
