import { protectModule } from '../helpers/functions.js';

import { baseUrl } from '../utils/constants.js';

function getMentor() {
  const mentorSection = document.querySelector('[data-mentor]');
  const container = mentorSection.querySelector('.mentor-card');

  let name = mentorSection.getAttribute('data-mentor');

  if (!name) return;

  fetch(`${baseUrl}/mentor/${name}`)
    .then((res) => res.json())
    .then((data) => {
      const { name, title, text, thumbnail, videoUrl } = data;

      const card = `
          <div class="mentor-card__body mentor-card__body--row">
            <div class="mentor-card__img">
              <img src="${baseUrl}/db/${thumbnail}" alt="">
            </div>
            <div>
              <div class="mentor-card__info">
                <div class="accent-subtitle">${title}</div>
                <h3 class="title title--h3 title--border">${name}</h3>
              </div>
              <div class="mentor-card__text">
                <p>${text}</p>
              </div>
              <div class="row row-20">
                <a href="${videoUrl}" target="_blank" class="play">
                  <svg width="11" height="16">
                    <use xlink:href="img/icons/icons.svg#play"></use>
                  </svg>
                </a>
                <div class="mentor-card__author">Meet ${name}</div>
              </div>
            </div>
          </div>
        `;

      container.innerHTML = card;
    })
    .catch((error) => {
      console.error('An error occurred during fetch:', error.message);
    });
}

export default protectModule(getMentor);
