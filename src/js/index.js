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

  function initTabs(config) {
    const tabButtons = document.querySelectorAll(config.buttonClass);
    const tabContents = document.querySelectorAll(config.contentClass);

    function activateTab(tabIndex) {
      tabButtons.forEach((btn) => {
        if (btn.dataset.tab === tabIndex) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });
      tabContents.forEach((content) => {
        if (content.dataset.tabContent === tabIndex) {
          content.style.display = "block";
        } else {
          content.style.display = "none";
        }
      });
    }

    tabButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        const tabIndex = this.dataset.tab;
        activateTab(tabIndex);
      });
    });

    if (tabButtons.length > 0) {
      activateTab(tabButtons[0].dataset.tab);
    }
  }

  initTabs({ buttonClass: ".tab-btn-1", contentClass: ".tab-content-1" });
  initTabs({ buttonClass: ".tab-btn-2", contentClass: ".tab-content-2" });
  initTabs({ buttonClass: ".tab-btn-3", contentClass: ".tab-content-3" });

  function createCustomSelectManager(config) {
    const selectBlock = document.querySelector(config.selectClass);
    const selected = selectBlock.querySelector(".selected");
    const options = selectBlock.querySelector(".options");
    const optionItems = options.querySelectorAll(".option");
    const content = document.querySelector(config.contentClass);
    let currentValue = optionItems[0].getAttribute("data-value");

    function updateContent() {
      Array.from(content.children).forEach((p) => {
        if (p.classList.contains("item-" + currentValue)) {
          p.classList.add("active");
        } else {
          p.classList.remove("active");
        }
      });
    }

    selected.textContent = optionItems[0].textContent;
    updateContent();

    selected.addEventListener("click", () => {
      options.classList.toggle("open");
      selected.classList.toggle("active");
    });

    optionItems.forEach((option) => {
      option.addEventListener("click", () => {
        currentValue = option.getAttribute("data-value");
        selected.textContent = option.textContent;
        options.classList.remove("open");
        selected.classList.remove("active");
        updateContent();
      });
    });

    document.addEventListener("click", (e) => {
      if (!selectBlock.contains(e.target)) {
        options.classList.remove("open");
        selected.classList.remove("active");
      }
    });
  }

  createCustomSelectManager({
    selectClass: ".select-1",
    contentClass: ".content-1",
  });
  createCustomSelectManager({
    selectClass: ".select-2",
    contentClass: ".content-2",
  });
  createCustomSelectManager({
    selectClass: ".select-3",
    contentClass: ".content-3",
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
