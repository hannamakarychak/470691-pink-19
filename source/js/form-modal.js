// FORM POPUP
var formModal = document.querySelector(".modal");
// var openModalButton = document.querySelector(".button--modal-open");
var closeModalButton = document.querySelector(".button--close");

// openModalButton.addEventListener("click", function (evt) {
//   evt.preventDefault();
//   formModal.classList.add("modal--show");
// });

closeModalButton.addEventListener("click", function () {
  formModal.classList.remove("modal--show");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (formModal.classList.contains("modal--show")) {
      evt.preventDefault();
      formModal.classList.remove("modal--show");
    }
  }
});
