import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const setNewDate = document.querySelector('#datetime-picker');
const onBtnStart = document.querySelector('[data-start]');
const onSetDay = document.querySelector('[data-days]');
const onSetHours = document.querySelector('[data-hours]');
const onSetMinutes = document.querySelector('[data-seconds]');



const options = {
    enableTime: true,             // вмикає засіб вибору часу
    time_24hr: true,              // формат часу
    defaultDate: new Date(),      // встановлює початкові вибрані дати
    minuteIncrement: 1,           // Регулює крок для введення хвилин (включно з прокручуванням)
    onClose(selectedDates) {
      console.log(selectedDates[0]);
    },
  };

flatpickr(setNewDate, options); // активує календар в інпуті

onBtnStart.setAttribute('disabled', true);   // кнопка не активна по замовчуванню

 





setNewDate.addEventListener('input', () => {});

onBtnStart.addEventListener('click', () => {});

function flatpickr(selector, options) {

}






  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}