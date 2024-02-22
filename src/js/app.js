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
  const videoBlocks = document.querySelectorAll('[data-video-block]');

  if (videoBlocks.length) {
    videoBlocks.forEach((videoBlock) => {
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
    });
  }

  // Fetch mentors from the server
  const mentorsContainer = document.querySelector('.mentors__cards');

  fetch('http://localhost:3000/mentors')
    .then((res) => res.json())
    .then((data) => {
      data.forEach((mentor) => {
        const { name, title, text, thumbnail, videoUrl, skills } = mentor;

        const skillsList = skills
          .map(
            (skill) => `
            <li class="mentor-card__item">
              <div class="mentor-card__item-img">
                <img src="${skill.icon}" alt="Icon">
              </div>
              <p class="mentor-card__item-text">${skill.name}</p>
            </li>
          `,
          )
          .join('');

        const card = `
          <div class="mentor-card">
            <div class="mentor-card__head">
              <img src="${thumbnail}" alt="Portrait of ${name}">
              <div class="mentor-card__action">
                <a href="${videoUrl}" target="_blank" class="play">
                  <svg>
                    <use xlink:href="img/icons/icons.svg#play"></use>
                  </svg>
                </a>
                <div class="mentor-card__author">Meet ${name}</div>
              </div>
            </div>
            <div class="mentor-card__body">
              <div class="mentor-card__info">
                <div class="accent-subtitle">${title}</div>
                <h3 class="title title--h3 title--border">${name}</h3>
              </div>
              <div class="mentor-card__text">
                <p>${text}</p>
              </div>
              <div>
                <div class="title title--h5">Skills</div>
                <ul class="mentor-card__items">
                  ${skillsList}
                </ul>
              </div>
            </div>
          </div>
        `;

        mentorsContainer.innerHTML += card;
      });
    });
});
