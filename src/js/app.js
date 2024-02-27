import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';

import './libs/dynamicAdapt.js';

import {
  menu,
  fetchMentors,
  updateVideoBlocksTime,
  stepNavigation,
  popup,
  rating,
} from './modules/index.js';

import '../scss/style.scss';

window.addEventListener('DOMContentLoaded', () => {
  menu();
  fetchMentors();
  updateVideoBlocksTime();
  stepNavigation();
  // popup();
  rating();

  const currentSlide = document.querySelector('.reviews__slider-current');
  const totalSlides = document.querySelector('.reviews__slider-total');

  new Swiper('.swiper', {
    modules: [Navigation, Pagination],
    loop: true,
    spaceBetween: 24,
    slidesPerView: 'auto',
    pagination: {
      el: '.reviews__slider-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.reviews__slider-btn--next',
      prevEl: '.reviews__slider-btn--prev',
    },
    on: {
      init: function (swiper) {
        totalSlides.textContent = swiper.slides.length;
      },
      slideChange: function (swiper) {
        const index =
          swiper.realIndex < 10
            ? `0${swiper.realIndex + 1}`
            : swiper.realIndex + 1;
        currentSlide.textContent = index;
      },
    },
  });
});
