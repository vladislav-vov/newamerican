import {
  setElementStyles,
  removeExcessElements,
  scrollToElement,
  isMobile,
  removeUnits,
  protectModule,
} from '../helpers/functions.js';

import { rootStyles } from '../utils/constants.js';

function stepNavigation() {
  const stepsContainer = document.querySelector('.tutorials__steps');
  const paginationDecor = document.querySelector(
    '.tutorials__pagination-decor',
  );
  const dotsContainer = document.querySelector('.tutorials__pagination');
  const steps = Array.from(document.querySelectorAll('.tutorials__step'));
  const contentBlocks = Array.from(
    document.querySelectorAll('.tutorials__content-block'),
  );

  if (!stepsContainer || !steps.length || !contentBlocks.length) {
    throw new Error(
      'Error in the stepNavigation function: missing elements - stepsContainer, steps, or contentBlocks',
    );
  }

  const animationTime = removeUnits(
    rootStyles.getPropertyValue('--animation-duration'),
  );

  let currentContentBlockIndex = 0;
  const dots = [];
  const classes = {
    stepActive: 'tutorials__step--active',
    stepHover: 'tutorials__step--hover',
    dotActive: 'tutorials__pagination-dot--active',
    dotHover: 'tutorials__pagination-dot--hover',
    contentBlockActive: 'tutorials__content-block--active',
    contentBlockHover: 'tutorials__content-block--hover',
    fadeOut: 'fadeOut',
    fadeIn: 'fadeIn',
  };

  if (contentBlocks.length > steps.length) {
    removeExcessElements(contentBlocks, steps.length);
  } else if (steps.length > contentBlocks.length) {
    removeExcessElements(steps, contentBlocks.length);
  }

  contentBlocks.forEach((block, index) => {
    if (index !== 0) {
      block.style.display = 'none';
    } else {
      block.classList.add(classes.fadeIn);
    }
  });

  function calculateHeights() {
    const stepsHeight = steps.reduce((sum, step) => sum + step.offsetHeight, 0);
    const stepGap =
      (stepsContainer.offsetHeight - stepsHeight) / (steps.length - 1);

    return steps.map((step, i) => {
      if (i + 1 === steps.length) return 0;

      const previousHeight = step.offsetHeight;
      const nextHeight = steps[i + 1].offsetHeight;
      return previousHeight / 2 + nextHeight / 2 + stepGap;
    });
  }

  function updateDotStyles() {
    const dots = document.querySelectorAll('.tutorials__pagination-dot');
    const heights = calculateHeights();

    setElementStyles(dots[0], {
      marginTop: steps[0].offsetHeight / 2 + 'px',
    });
    setElementStyles(paginationDecor, {
      marginTop: steps[0].offsetHeight / 2 + 'px',
      height:
        stepsContainer.offsetHeight -
        (steps[0].offsetHeight / 2 + steps[steps.length - 1].offsetHeight / 2) +
        'px',
    });

    dots.forEach((dot, index) => {
      setElementStyles(dot, {
        marginBottom: heights[index] - dot.offsetHeight + 'px',
      });
    });
  }

  function createDot(index) {
    const dot = document.createElement('div');
    dot.className = 'tutorials__pagination-dot';
    dotsContainer.appendChild(dot);
    dots.push(dot);
    updateDotStyles();

    dot.addEventListener('mouseenter', () => handleDotHover(index));
    dot.addEventListener('mouseleave', () => handleDotLeave(index));
    dot.addEventListener('click', () => handleDotClick(index));
  }

  function handleDotHover(index) {
    if (dots[index].classList.contains(classes.dotActive)) return;
    removeHoverSteps();
    resetDotColors();
    steps[index].classList.add(classes.stepHover);
    dots[index].classList.add(classes.dotHover);
  }

  function handleDotLeave(index) {
    if (dots[index].classList.contains(classes.dotActive)) return;
    dots[index].classList.remove(classes.dotHover);
    if (!steps[index].classList.contains(classes.stepActive)) {
      steps[index].classList.remove(classes.stepHover);
    }
  }

  function handleDotClick(index) {
    showBlock(index);
    setActiveItem(index);
  }

  function showBlock(index) {
    contentBlocks.forEach((block, i) => {
      block.classList.toggle(classes.fadeOut, !(i === index));
      block.classList.toggle(classes.fadeIn, i === index);
      setTimeout(() => {
        block.style.display = i === index ? 'grid' : 'none';
        currentContentBlockIndex = index;
      }, animationTime);
    });
  }

  function setActiveItem(index) {
    dots.forEach((dot, i) => {
      dot.classList.toggle(classes.dotActive, i === index);
      dot.classList.remove(classes.dotHover);
    });

    steps.forEach((step, i) => {
      step.classList.toggle(classes.stepActive, i === index);
      step.setAttribute('tabindex', i === index ? '' : '0');
      step.classList.remove(classes.stepHover);
    });
  }

  function removeHoverSteps() {
    steps.forEach((step) => {
      step.classList.remove(classes.stepHover);
    });
  }

  function resetDotColors() {
    dots.forEach((dot) => dot.classList.remove(classes.dotHover));
  }

  function adjustContentHeight(index) {
    const contentWrapper = document.querySelector('.tutorials__content');

    setTimeout(() => {
      const currentContentBlockHeight = contentBlocks[index].offsetHeight;

      contentWrapper.style.height = currentContentBlockHeight + 'px';
    }, animationTime);
  }

  steps.forEach((step, index) => {
    step.addEventListener('click', () => {
      if (step.classList.contains(classes.stepActive)) return;
      showBlock(index);
      setActiveItem(index);

      isMobile.any() && scrollToElement('.tutorials__content');

      adjustContentHeight(index);
    });

    ['mouseenter', 'focus'].forEach((eventType) => {
      step.addEventListener(eventType, () => {
        if (step.classList.contains(classes.stepActive)) return;
        removeHoverSteps();
        resetDotColors();
        dots[index].classList.add(classes.dotHover);
        step.classList.add(classes.stepHover);
      });
    });

    ['mouseleave', 'blur'].forEach((eventType) => {
      step.addEventListener(eventType, () => {
        if (step.classList.contains(classes.stepActive)) return;
        step.classList.remove(classes.stepHover);
        if (!dots[index].classList.contains(classes.dotActive)) {
          dots[index].classList.remove(classes.dotHover);
        }
      });
    });

    createDot(index);
  });

  setActiveItem(0);
  adjustContentHeight(0);

  dotsContainer.addEventListener('mouseleave', resetDotColors);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.classList.contains('tutorials-step')) {
      e.preventDefault();
      const activeIndex = steps.indexOf(e.target);
      showBlock(activeIndex);
      setActiveItem(activeIndex);
    }
  });

  window.addEventListener('resize', () => {
    updateDotStyles();
    adjustContentHeight(currentContentBlockIndex);
  });
}

export default protectModule(stepNavigation);
