import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formSubmit = document.querySelector('.form');
formSubmit.addEventListener('submit', testPromise);

function testPromise(e) {
e.preventDefault();

  let timeDelay = Number(formSubmit.delay.value);

  for(i = 1; i <= formSubmit.amount.value; i += 1) {
    createPromise(i, timeDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    timeDelay += Number(formSubmit.step.value);
  }
}

function createPromise(position, delay) {  // створення проміса
  const obj = { position, delay };
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve(obj);
      } else {
        // Reject
        reject(obj);
      }
    }, delay);
  });
}
