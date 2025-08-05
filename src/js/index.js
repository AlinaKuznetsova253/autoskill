import "./swiper";

document.addEventListener("DOMContentLoaded", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const menuBtn = document.querySelector(".menu__btn");
  const menuMobile = document.querySelector(".menu__mobile");
  const menuLinks = document.querySelectorAll("[data-link='mobile-menu']");

  const toggleMobileMenu = () => {
    if (!isMenuOpen) {
      menuMobile.classList.remove("menu-closing");
      menuMobile.classList.add("menu-open");
      menuBtn.classList.add("menu-open");
      document.body.style.overflow = "hidden";
      isMenuOpen = true;
    } else {
      menuMobile.classList.add("menu-closing");
      menuBtn.classList.remove("menu-open");
      document.body.style.overflow = "inherit";

      setTimeout(() => {
        menuMobile.classList.remove("menu-closing");
        menuMobile.classList.remove("menu-open");
        isMenuOpen = false;
      }, 500);
    }
  };

  let isMenuOpen = false;

  menuBtn.addEventListener("click", toggleMobileMenu);

  menuLinks.forEach((link) => link.addEventListener("click", toggleMobileMenu));
});
