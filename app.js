const orders = [0, 1, 2, 5, 8, 7, 6, 3];
const boxes = document.querySelectorAll('.game .box');
const button = boxes[4];

const MAX_SPEED = 50;
const MIN_SPEED = 300;
let speed = 200;
let isSpeedUp = true;
let isFinished = false;
let flag = 0;
let lastIndex = 0;
let currentIndex = 0;

const speedControl = () => {
  const fast = Math.floor(Math.random() * 20 + 10);
  const slow = Math.floor(Math.random() * 20 + 50);

  if (speed > MAX_SPEED) {
    if (isSpeedUp) {
      speed -= fast;
    } else if (!isSpeedUp && speed < MIN_SPEED) {
      speed += slow;
    }
  } else {
    isSpeedUp = false;
    speed += fast;
  }
  // console.log(speed);
};

const run = () => {
  speedControl();

  boxes[lastIndex].classList.remove('active');
  boxes[currentIndex].classList.add('active');

  flag += 1;
  if (flag === orders.length) {
    flag = 0;
  }
  lastIndex = currentIndex;
  currentIndex = orders[flag];
};

const game = () => {
  console.log(isFinished);
  if (!isFinished) {
    run();
  }

  setTimeout(!isFinished && game, speed);
};

const reset = () => {
  boxes[lastIndex].classList.remove('active');
  // boxes.forEach(box => box.classList.remove('active'));

  speed = 200;
  isSpeedUp = true;
  isFinished = false;
  flag = 0;
  lastIndex = 0;
  currentIndex = 0;
};

const begin = () => {
  reset();
  game();
  setTimeout(() => {
    isFinished = true;
  }, 5000);
};

button.addEventListener('click', begin);
