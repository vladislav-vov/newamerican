import { calcScroll } from '../helpers/functions.js';

import { protectModule } from '../helpers/functions.js';

function menu() {
  const menuBtn = document.querySelector('.menu-btn');
  const menuClose = document.querySelector('.menu__close');
  const menu = document.querySelector('.menu');
  const scroll = calcScroll();

  function openMenu() {
    menu.classList.add('menu--active');
    document.body.style.overflowY = 'hidden';
    document.body.style.marginRight = `${scroll}px`;
  }

  function closeMenu() {
    menu.classList.remove('menu--active');
    document.body.style.overflowY = 'scroll';
    document.body.style.marginRight = '0';
  }

  menuBtn.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });
}

export default protectModule(menu);
