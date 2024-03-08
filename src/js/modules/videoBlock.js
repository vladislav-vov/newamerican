import { parseDurationISO, formatTime } from '../helpers/functions.js';

import { baseUrl } from '../utils/constants.js';

function updateVideoBlocksTime() {
  const videoBlocks = document.querySelectorAll('[data-video-block]');

  if (videoBlocks.length) {
    videoBlocks.forEach((videoBlock) => {
      const url = videoBlock.querySelector('a').href;
      const timeBlock = videoBlock.querySelector('.time span');

      timeBlock.textContent = '0:00';

      const videoId = url.match(/[?]v=([^&?]+)/)[1];

      fetch(`${baseUrl}/youtube-api/${videoId}`)
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
}

export default updateVideoBlocksTime;
