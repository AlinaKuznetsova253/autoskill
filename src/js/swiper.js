import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";

document.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper(".swiper", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
    },
    modules: [Pagination],
  });

  const swiperReviews = new Swiper(".reviews-swiper", {
    loop: true,
    slidesPerView: 2.5,
    spaceBetween: 24,
  });
});
