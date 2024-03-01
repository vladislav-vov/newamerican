import './libs/dynamicAdapt.js';

import {
  menu,
  fetchMentors,
  updateVideoBlocksTime,
  stepNavigation,
  popup,
  rating,
  slider,
} from './modules/index.js';

import '../scss/style.scss';

window.addEventListener('DOMContentLoaded', () => {
  menu();
  fetchMentors();
  updateVideoBlocksTime();
  stepNavigation();
  // popup();
  rating();
  slider();
});
