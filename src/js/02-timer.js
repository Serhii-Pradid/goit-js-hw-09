import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/dark.css";  // додано мінімальні стилі календаря
import Notiflix from 'notiflix';

const setNewDate = document.querySelector('#datetime-picker');
const onBtnStart = document.querySelector('[data-start]');
const onSetDay = document.querySelector('[data-days]');
const onSetHours = document.querySelector('[data-hours]');
const onSetMinutes = document.querySelector('[data-minutes]');
const onSetSeconds = document.querySelector('[data-seconds]');

let timerId = null;    
let selectDate = null;


onBtnStart.disabled = true;   // кнопка не активна по замовчуванню

const options = {
    enableTime: true,             // вмикає засіб вибору часу
    time_24hr: true,              // формат часу
    defaultDate: new Date(),      // встановлює початкові вибрані дати
    minuteIncrement: 1,           // Регулює крок для введення хвилин (включно з прокручуванням)
           
    onClose(selectedDates) {
      selectDate = selectedDates[0]; 

      if(selectDate < new Date()) {
    onBtnStart.disabled = true; 
    Notiflix.Notify.failure("Please choose a date in the future");
      } else {
      onBtnStart.disabled = false;
      console.log(selectDate);
      return;
           }
       }
       }

flatpickr(setNewDate, options); // активує календар в інпуті

onBtnStart.addEventListener('click', btnStart);

function btnStart() {         // таймер з кроком 1 сек                  
    timerId = setInterval(startTimer, 1000);
  }

function startTimer() {      // функція таймер
  onBtnStart.disabled = true;
  const startTime = new Date();
  const timeDifference = selectDate - startTime;
  const formatDate = convertMs(timeDifference);
   
    console.log(formatDate);

    onSetSeconds.style.color = "red";   // виділено секунди червоним (додатовий стиль)

    onSetSeconds.textContent = formatDate.seconds;
    onSetMinutes.textContent = formatDate.minutes;
    onSetHours.textContent = formatDate.hours;
    onSetDay.textContent = formatDate.days;

  if (onSetSeconds.textContent === '00' && 
    onSetMinutes.textContent === '00' &&
    onSetHours.textContent === '00' &&
    onSetDay.textContent === '00') {
    Notiflix.Notify.success('Time is up!');
    clearInterval(timerId);
     return;
  }
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }

  function addLeadingZero(value) {  // функція додавання 0 перед числом
  return String(value).padStart(2 , '0');
  }
  //console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  //console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  //console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
  
  