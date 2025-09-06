import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";

document.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper(".swiper", {
    loop: true,
    spaceBetween: 270,
    pagination: {
      el: ".swiper-pagination",
    },
    modules: [Pagination],
  });

  const swiperReviews = new Swiper(".reviews-swiper", {
    loop: true,
    spaceBetween: 24,
    pagination: {
      el: ".swiper-pagination",
    },
    modules: [Pagination],
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      1025: {
        slidesPerView: 2.5,
      },
    },
  });
});
