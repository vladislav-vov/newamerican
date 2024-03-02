import { protectModule } from '../helpers/functions.js';

function popup() {
  const popup = document.querySelector('.popup');

  function handleScroll() {
    const elem = document.querySelector('.tutorials');

    if (!elem) return;

    const contentBottom = elem.getBoundingClientRect().bottom;

    if (Math.floor(contentBottom) <= window.innerHeight) {
      popup.classList.add('popup--show');

      window.removeEventListener('scroll', handleScroll);
    }
  }

  window.addEventListener('scroll', handleScroll);
}

export default protectModule(popup);
