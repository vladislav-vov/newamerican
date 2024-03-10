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

export function setElementStyles(element, styles) {
  for (const [key, value] of Object.entries(styles)) {
    element.style[key] = value;
  }
}

export function removeExcessElements(nodes, i) {
  nodes.slice(i).forEach((node) => node.remove());
  nodes.splice(i);
}

export function scrollToElement(selector) {
  const targetElem = document.querySelector(selector);

  let targetElemPosition =
    targetElem.getBoundingClientRect().top + window.scrollY - 60;

  if (targetElem) {
    window.scrollTo({
      top: targetElemPosition,
      behavior: 'smooth',
    });
  }
}

export function removeUnits(value) {
  return parseFloat(value.replace(/[^\d.-]/g, ''));
}

export function protectModule(moduleFunction) {
  return function (...args) {
    try {
      return moduleFunction.apply(this, args);
    } catch (error) {}
  };
}

export function throttle(func, ms) {
  let isThrottling = false;
  let savedArgs;
  let savedThis;

  return function wrapper() {
    if (isThrottling) {
      savedArgs = arguments;
      savedThis = this;

      return;
    }

    func.apply(this, arguments);

    isThrottling = true;

    setTimeout(() => {
      isThrottling = false;

      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);

        savedArgs = savedThis = null;
      }
    }, ms);
  };
}

export let isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};
