import accordion from "./modules/faq-accordion";
import customSelect from "./modules/custom-select";
accordion();
customSelect();


import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const swiper = new Swiper('.team__slider', {
  modules: [Navigation, Pagination],
  slidesPerView: 4,
  // loop: true,

  // pagination: {
  //   el: '.swiper-pagination',
  //   type: 'bullets',
  // },
  
    // Navigation arrows
    navigation: {
      nextEl: '#team-slider-next',
      prevEl: '#team-slider-prev'
    },

});















// while (true) {
//   accordionBtn[0].addEventListener('click', () => {
//     console.log('hi')
//   })
// }

// accordionBtn[0].addEventListener('click', () => {
//   console.log('hi')
// })




// import hello from './modules/hello.js';
// import AirDatepicker from 'air-datepicker';
// import 'air-datepicker/air-datepicker.css';

// const navToggle = document.querySelector('.main-nav__toggle');
// const mainNav = document.querySelector('.main-nav');

// // mainNav.classList.remove('main-nav--nojs');

// navToggle.addEventListener('click', () => {
//   if (mainNav.classList.contains('main-nav--closed-js')) {
//     mainNav.classList.remove('main-nav--closed-js');
//     mainNav.classList.add('main-nav--opened-js');
//   } else {
//     mainNav.classList.remove('main-nav--opened-js');
//     mainNav.classList.add('main-nav--closed-js');
//   }
// })

