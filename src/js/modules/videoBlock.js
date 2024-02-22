import { parseDurationISO, formatTime } from '../helpers/functions.js';

function updateVideoBlocksTime() {
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
}

export default updateVideoBlocksTime;
