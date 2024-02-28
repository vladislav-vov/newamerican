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

  const section = document.querySelector('.reviews');
  const slider = document.querySelector('.reviews__slider');
  const items = document.querySelector('.reviews__items');
  const sliderActionsBlock = document.querySelector('.reviews__slider-actions');
  const reviewsBody = document.querySelector('.reviews__body');

  const rootStyles = getComputedStyle(document.documentElement);
  const containerWidth = rootStyles.getPropertyValue('--containerWidth');
  const containerPadding = rootStyles.getPropertyValue('--containerPadding');

  function calcSectionMarginLeft() {
    const marginLeft =
      window.innerWidth > containerWidth
        ? (window.innerWidth - containerWidth) / 2
        : containerPadding / 2;

    section.style.marginLeft = marginLeft + 'px';
  }

  calcSectionMarginLeft();

  function calcSliderWidth() {
    slider.style.width =
      document.body.clientWidth -
      containerPadding / 2 -
      items.offsetWidth -
      getComputedStyle(reviewsBody).gap.replace('px', '') -
      sliderActionsBlock.offsetWidth +
      'px';
  }

  calcSliderWidth();

  window.addEventListener('resize', () => {
    calcSectionMarginLeft();

    if (document.body.clientWidth <= containerWidth) {
      calcSliderWidth();
    } else {
      slider.style.width = '100%';
    }
  });
});
