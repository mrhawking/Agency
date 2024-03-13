import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const sliderTeam = () => {
  const swiper = new Swiper('#team-swiper', {
    modules: [Navigation, Pagination],
    slidesPerView: 'auto',
    spaceBetween: 20,
    loop: true,
    keyboard: {
      enabled: true
    },
    navigation: {
      nextEl: '#team-slider-next',
      prevEl: '#team-slider-prev'
    },
  });
};

export default sliderTeam;