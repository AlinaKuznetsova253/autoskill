import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";

document.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper(".swiper", {
    loop: true,
    spaceBetween: 300,
    pagination: {
      el: ".swiper-pagination",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    modules: [Pagination, Autoplay, Navigation],
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
