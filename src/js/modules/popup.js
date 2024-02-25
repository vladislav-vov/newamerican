function popup() {
  const popup = document.querySelector('.popup');

  function handleScroll() {
    const contentBottom = document
      .querySelector('.tutorials')
      .getBoundingClientRect().bottom;

    if (Math.floor(contentBottom) <= window.innerHeight) {
      popup.classList.add('popup--show');

      window.removeEventListener('scroll', handleScroll);
    }
  }

  window.addEventListener('scroll', handleScroll);
}

export default popup;
