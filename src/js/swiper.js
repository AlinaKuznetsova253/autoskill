import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";

document.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper(".swiper", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    modules: [Navigation, Pagination],
  });

  console.log("hello");
});
