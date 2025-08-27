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

  ymaps.ready(init);

  function init() {
    const map = new ymaps.Map("map", {
      center: [44.956701, 34.089029],
      zoom: 14,
      controls: ["zoomControl", "fullscreenControl"],
    });
    const placemark = new ymaps.Placemark(
      [44.956701, 34.089029],
      {
        balloonContent: "город Симферополь, ул.Вымышленная 52 А",
      },
      {
        preset: "islands#redDotIcon",
      },
    );

    map.geoObjects.add(placemark);
  }

  const modalController = ({ modal, btnOpen, btnClose, time = 300 }) => {
    const buttonElems = document.querySelectorAll(btnOpen);
    const modalElem = document.querySelector(modal);

    modalElem.style.cssText = `
   display: flex;
   visibility: hidden;
   opacity: 0;
   transition: opacity ${time}ms ease-in-out;
   `;

    const closeModal = (event) => {
      const target = event.target;

      if (
        target === modalElem ||
        (btnClose && target.closest(btnClose)) ||
        event.code === "Escape"
      ) {
        modalElem.style.opacity = 0;

        setTimeout(() => {
          modalElem.style.visibility = "hidden";
        }, time);

        window.removeEventListener("keydown", closeModal);
      }
    };

    const openModal = () => {
      modalElem.style.visibility = "visible";
      modalElem.style.opacity = 1;
      window.addEventListener("keydown", closeModal);
    };

    buttonElems.forEach((btn) => {
      btn.addEventListener("click", openModal);
    });
    modalElem.addEventListener("click", closeModal);
  };

  modalController({
    modal: ".modal",
    btnOpen: ".hero__btn",
    btnClose: ".modal__close",
  });

  const consentCheckbox = document.getElementById("consent");
  const submitBtn = document.getElementById("submitBtn");
  const form = document.querySelector(".modal-form");

  consentCheckbox.addEventListener("change", function () {
    submitBtn.disabled = !consentCheckbox.checked;
  });

  form.addEventListener("submit", function (e) {
    if (!consentCheckbox.checked) {
      e.preventDefault();
      alert(
        "Пожалуйста, подтвердите согласие на обработку персональных данных.",
      );
    }
  });
});
