import { baseUrl } from '../utils/constants.js';

function fetchMentors() {
  const mentorsContainer = document.querySelector('.mentors__cards');

  if (!mentorsContainer) return;

  fetch(`${baseUrl}/mentors`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((mentor) => {
        const { name, title, text, thumbnail, videoUrl, skills } = mentor;

        const skillsList = skills
          .map(
            (skill) => `
            <li class="mentor-card__item">
              <div class="mentor-card__item-img">
                <img src="${baseUrl}/db/${skill.icon}" alt="Icon">
              </div>
              <p class="mentor-card__item-text">${skill.name}</p>
            </li>
          `,
          )
          .join('');

        const card = `
          <div class="mentor-card">
            <div class="mentor-card__head">
              <div class="mentor-card__img">
                <img src="${baseUrl}/db/${thumbnail}" alt="Portrait of ${name}">
              </div>
              <div class="mentor-card__action">
                <a href="${videoUrl}" target="_blank" class="play">
                  <svg width="11" height="16">
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
    })
    .catch((error) => {
      console.error('An error occurred during fetch:', error.message);
    });
}

export default fetchMentors;
