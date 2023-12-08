import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const sliderTeam = () => {
  const swiper = new Swiper('#team-swiper', {
    modules: [Navigation, Pagination],
    slidesPerView: 4,
    spaceBetween: 30,
    loop: true,
    keyboard: {
      enabled: true
    },
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '#team-slider-next',
      prevEl: '#team-slider-prev'
    },
    // breakpoints: {
		// 	425: {
		// 		slidesPerView: 2,
		// 		spaceBetween: 20,
		// 	},
		// 	768: {
		// 		slidesPerView: 4,
		// 		spaceBetween: 40,
		// 	}
		// },
  });
};

export default sliderTeam;