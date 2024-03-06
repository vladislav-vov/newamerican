import { removeUnits, protectModule } from '../helpers/functions.js';

function calcPromoHeight() {
  const promoContainer = document.querySelector('.ebook-promo__container');
  const promoBg = document.querySelector('.ebook-promo__bg');
  const promoContent = document.querySelector('.ebook-promo__head');
  const header = document.querySelector('.header');

  const updatePromoHeight = () => {
    const paddingTop = removeUnits(getComputedStyle(promoContainer).paddingTop);
    const contentHeight = promoContent.offsetHeight;
    const headerHeight = header.offsetHeight;

    promoBg.style.height = `${paddingTop + contentHeight + headerHeight}px`;
  };

  window.addEventListener('resize', updatePromoHeight);
  window.addEventListener('load', updatePromoHeight);
}

export default protectModule(calcPromoHeight);
