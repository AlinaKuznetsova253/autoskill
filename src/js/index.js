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
    const body = document.querySelector("body");

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
          body.style.overflowY = "inherit";
        }, time);

        window.removeEventListener("keydown", closeModal);
      }
    };

    const openModal = () => {
      modalElem.style.visibility = "visible";
      modalElem.style.opacity = 1;
      body.style.overflowY = "hidden";
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

  modalController({
    modal: ".services__modal-1",
    btnOpen: ".services__btn-1",
    btnClose: ".services__modal-close",
  });

  modalController({
    modal: ".services__modal-2",
    btnOpen: ".services__btn-2",
    btnClose: ".services__modal-close",
  });

  modalController({
    modal: ".services__modal-3",
    btnOpen: ".services__btn-3",
    btnClose: ".services__modal-close",
  });

  modalController({
    modal: ".gallery__modal",
    btnOpen: ".gallery__btn",
    btnClose: ".gallery__modal-close",
  });

  function setupTabsSelect({ root, buttonClass, contentClass, selectClass }) {
    const rootEl = document.querySelector(root);
    if (!rootEl) return;

    const buttons = Array.from(rootEl.querySelectorAll(buttonClass));
    const contents = Array.from(rootEl.querySelectorAll(contentClass));
    const selectEl = rootEl.querySelector(selectClass);
    if (!buttons.length || !contents.length || !selectEl) return;

    const selected = selectEl.querySelector(".selected");
    const options = selectEl.querySelector(".options");
    const optionItems = Array.from(selectEl.querySelectorAll(".option"));

    let current =
      buttons.find((b) => b.classList.contains("active"))?.dataset.tab ||
      optionItems[0]?.dataset.value ||
      "1";

    function show(index) {
      current = String(index);

      buttons.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.tab === current);
      });

      contents.forEach((panel) => {
        const isActive = panel.dataset.tabContent === current;
        panel.style.display = isActive ? "block" : "none";
        panel.classList.toggle("active", isActive);
      });

      const opt =
        optionItems.find((o) => o.dataset.value === current) || optionItems[0];
      if (selected && opt) selected.textContent = opt.textContent;
    }

    contents.forEach((c) => (c.style.display = "none"));
    show(current);

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => show(btn.dataset.tab));
    });

    if (selected && options) {
      selected.addEventListener("click", () => {
        options.classList.toggle("open");
        selected.classList.toggle("active");
      });

      optionItems.forEach((opt) => {
        opt.addEventListener("click", () => {
          options.classList.remove("open");
          selected.classList.remove("active");
          show(opt.dataset.value);
        });
      });

      document.addEventListener("click", (e) => {
        if (!selectEl.contains(e.target)) {
          options.classList.remove("open");
          selected.classList.remove("active");
        }
      });
    }
  }

  setupTabsSelect({
    root: ".services__modal-1",
    buttonClass: ".tab-btn-1",
    contentClass: ".tab-content-1",
    selectClass: ".select-1",
  });

  setupTabsSelect({
    root: ".services__modal-2",
    buttonClass: ".tab-btn-2",
    contentClass: ".tab-content-2",
    selectClass: ".select-2",
  });

  setupTabsSelect({
    root: ".services__modal-3",
    buttonClass: ".tab-btn-3",
    contentClass: ".tab-content-3",
    selectClass: ".select-3",
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
