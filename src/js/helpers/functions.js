export function calcScroll() {
  let div = document.createElement('div');

  div.style.width = '50px';
  div.style.height = '50px';
  div.style.overflowY = 'scroll';
  div.style.visibility = 'hidden';

  document.body.appendChild(div);
  let scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();

  return scrollWidth;
}

export function parseDurationISO(durationISO) {
  const match = durationISO.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;

  return hours * 3600 + minutes * 60 + seconds;
}

export function formatTime(secondsTime) {
  const minutes = Math.floor(secondsTime / 60);
  const seconds = Math.floor(secondsTime % 60);
  const hours = Math.floor(minutes / 60);

  const formattedMinutes = minutes % 60;
  const formattedSeconds = seconds.toString().padStart(2, '0');
  const formattedHours = hours.toString().padStart(2, '0');

  return hours
    ? `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
    : `${formattedMinutes}:${formattedSeconds}`;
}
