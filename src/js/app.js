import './libs/dynamicAdapt.js';

import { menu, fetchMentors, updateVideoBlocksTime } from './modules/index.js';

import '../scss/style.scss';

window.addEventListener('DOMContentLoaded', () => {
  menu();
  fetchMentors();
  updateVideoBlocksTime();
});
