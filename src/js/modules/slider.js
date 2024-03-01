import Swiper from 'swiper';
import { Navigation, Pagination, Manipulation } from 'swiper/modules';

import { rootStyles, baseUrl } from '../utils/constants.js';

import { removeUnits, setElementStyles } from '../helpers/functions.js';

import 'swiper/css';
import 'swiper/css/pagination';

function slider() {
  const section = document.querySelector('.reviews');
  const slider = document.querySelector('.reviews__slider');
  const items = document.querySelector('.reviews__items');
  const sliderActionsBlock = document.querySelector('.reviews__slider-actions');
  const reviewsBody = document.querySelector('.reviews__body');
  const currentSlide = document.querySelector('.reviews__slider-current');
  const totalSlides = document.querySelector('.reviews__slider-total');

  const containerWidth = rootStyles.getPropertyValue('--containerWidth');
  const containerPadding = rootStyles.getPropertyValue('--containerPadding');
  const tablet = removeUnits(rootStyles.getPropertyValue('--tablet'));
  const mobile = removeUnits(rootStyles.getPropertyValue('--mobileSmall'));

  const spaceBetween = 24;

  new Swiper('.swiper', {
    modules: [Navigation, Pagination, Manipulation],
    loop: true,
    spaceBetween,
    slidesPerView: 'auto',
    pagination: {
      el: '.reviews__slider-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.reviews__slider-btn--next',
      prevEl: '.reviews__slider-btn--prev',
    },
    on: {
      init: async function (swiper) {
        const data = await getData();

        totalSlides.textContent = data.length;

        data.forEach((obj) => {
          swiper.appendSlide(createSlide(obj));
        });

        handleResize();
      },
      slideChange: function (swiper) {
        const index =
          swiper.realIndex < 9
            ? `0${swiper.realIndex + 1}`
            : swiper.realIndex + 1;

        currentSlide.textContent = index;
      },
    },
  });

  async function getData() {
    return await fetch(`${baseUrl}/reviews`)
      .then((res) => res.json())
      .then((data) => data.reviews);
  }

  function createSlide(obj) {
    const { city, thumbnail, name, specialty, text, companyIcon } = obj;

    const slide = `
      <div class="swiper-slide reviews__slider-slide reviews-slide">
        <div class="reviews-slide__head">
          <div class="reviews-slide__avatar">
            <img src="${thumbnail}" alt="">
          </div>
          <div class="reviews-slide__info">
            <div class="accent-subtitle">${city}</div>
            <div class="reviews-slide__title title title--h3">
              ${name} <img src="${companyIcon}" alt="">
            </div>
            <div>${specialty}</div>
          </div>
        </div>
        <div class="reviews-slide__content">
          <div class="reviews-slide__text">
            <p>${text}</p>
          </div>
        </div>
      </div>`;

    return slide;
  }

  function setSectionMargin() {
    const margin = getSectionMargin();

    setElementStyles(section, {
      margin:
        document.body.clientWidth > containerWidth
          ? `0 0 0 ${margin}px`
          : `0 ${margin}px`,
    });
  }

  function getSectionMargin() {
    return document.body.clientWidth > containerWidth
      ? (document.body.clientWidth - containerWidth) / 2
      : containerPadding / 2;
  }

  function setSliderWidth() {
    const clientWidth = document.body.clientWidth;
    const bodyGap = removeUnits(getComputedStyle(reviewsBody).gap);
    const margin = getSectionMargin();

    const slides = Array.from(
      document.querySelectorAll('.reviews__slider-slide'),
    );

    const totalSlidesWidth = slides.reduce(
      (acc, slide) => acc + slide.offsetWidth,
      0,
    );

    const maxSliderWidth =
      totalSlidesWidth + spaceBetween * (slides.length - 1);

    let width =
      clientWidth < containerWidth
        ? clientWidth -
          containerPadding / 2 -
          items.offsetWidth -
          bodyGap -
          sliderActionsBlock.offsetWidth
        : clientWidth -
          items.offsetWidth -
          bodyGap -
          margin -
          sliderActionsBlock.offsetWidth;

    width = Math.min(width, maxSliderWidth);

    setElementStyles(slider, {
      width: `${width}px`,
    });
  }

  function handleResize() {
    setSectionMargin();
    setSliderWidth();

    if (window.innerWidth < tablet) {
      setElementStyles(slider, {
        width: '100%',
      });
    }

    if (window.innerWidth < mobile) {
      setElementStyles(slider, {
        width: `calc(100% - ${containerPadding}px)`,
      });
    }
  }

  window.addEventListener('resize', handleResize);
}

export default slider;
