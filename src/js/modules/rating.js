import { setElementStyles } from '../helpers/functions.js';

function rating() {
  function createRating(ratingContainer, totalElem) {
    const stars = ratingContainer.querySelectorAll('svg');

    function createShadowRating() {
      const div = document.createElement('div');
      div.classList.add('rating__shadow');
      ratingContainer.append(div);

      for (let i = 0; i < stars.length; i++) {
        const star = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'svg',
        );
        const use = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'use',
        );
        use.setAttributeNS(
          'http://www.w3.org/1999/xlink',
          'xlink:href',
          'img/icons/icons.svg#star-fill',
        );
        star.appendChild(use);
        div.append(star);
      }
    }

    createShadowRating();

    const shadowStars = ratingContainer.querySelectorAll('.rating__shadow svg');
    const total = +totalElem.textContent.replace(/[^0-9.]/g, '');
    const totalArr = splitNumber(stars.length, total);

    for (let i = 0; i < shadowStars.length; i++) {
      setElementStyles(shadowStars[i], {
        clipPath: `polygon(0% 0%, ${totalArr[i] * 100}% 0%, ${totalArr[i] * 100}% 100%, 0% 100%)`,
      });
    }
  }

  function splitNumber(count, num) {
    const resultArray = Array(count).fill(0);
    let remainder = num % 1;

    for (let i = 1; i <= Math.floor(num); i++) {
      resultArray[i - 1] = 1;
    }

    resultArray[Math.floor(num)] = remainder;

    return resultArray;
  }

  const ratings = document.querySelectorAll('.rating');
  const totalElems = document.querySelectorAll('.reviews__item-total');

  ratings.forEach((rating, i) => {
    createRating(rating, totalElems[i]);
  });
}

export default rating;
