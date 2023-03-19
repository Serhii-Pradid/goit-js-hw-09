const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const bodyColor = document.querySelector('body');

btnStart.addEventListener('click', getStart);
btnStop.addEventListener('click', getStop);

function getStart() {
  colorId = setInterval(getBodyColor, 1000);
  btnStart.toggleAttribute('disabled');
};

function getStop() {
  clearTimeout(colorId);
  btnStart.removeAttribute('disabled');
};

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  };

  function getBodyColor() {
    bodyColor.style.backgroundColor = getRandomHexColor()
  };
