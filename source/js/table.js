function actualResizeHandler() {
  const offersCells = document.querySelectorAll(
    ".offers__name:not(.offers__name--blank)"
  );
  const offersCellsArray = Array.prototype.slice.call(offersCells);

  const width = window.innerWidth;

  offersCellsArray.forEach((cell) =>
    cell.setAttribute("colspan", width >= 660 ? 1 : 2)
  );
}

var resizeTimeout;

function resizeThrottler() {
  // ignore resize events as long as an actualResizeHandler execution is in the queue
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(function () {
      resizeTimeout = null;
      actualResizeHandler();

      // The actualResizeHandler will execute at a rate of 15fps
    }, 66);
  }
}

actualResizeHandler();
window.addEventListener("resize", resizeThrottler, false);
