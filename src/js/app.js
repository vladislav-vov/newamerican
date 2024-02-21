import './libs/dynamicAdapt.js';

import {
  calcScroll,
  parseDurationISO,
  formatTime,
} from './helpers/functions.js';

import '../scss/style.scss';

window.addEventListener('DOMContentLoaded', () => {
  // Menu
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

  // VideoBlock
  const videoBlock = document.querySelector('[data-video-block]');

  if (videoBlock) {
    const url = videoBlock.querySelector('a').href;
    const timeBlock = videoBlock.querySelector('.time');

    timeBlock.textContent = '0:00';

    const apiKey = 'AIzaSyDiZlApJHg0WGNzxQ_UKNSKG7O12JQGgmA';
    const videoId = url.match(/[?]v=([^&?]+)/)[1];

    fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=contentDetails`,
    )
      .then((response) => response.json())
      .then((data) => {
        const durationISO = data.items[0].contentDetails.duration;
        const durationSeconds = parseDurationISO(durationISO);
        const formattedTime = formatTime(durationSeconds);

        timeBlock.textContent = formattedTime;
      })
      .catch((e) => console.error(e.message));
  }
});
