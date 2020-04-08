var header = document.querySelector(".header");
var navToggle = document.querySelector(".header__burger-button");

header.classList.remove("header--menu-nojs");

navToggle.addEventListener("click", function () {
  if (header.classList.contains("header--menu-closed")) {
    header.classList.remove("header--menu-closed");
    header.classList.add("header--menu-opened");
  } else {
    header.classList.add("header--menu-closed");
    header.classList.remove("header--menu-opened");
  }
});
