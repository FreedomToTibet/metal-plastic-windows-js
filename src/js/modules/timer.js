const timer = (id, deadline) => {
  const getTimeRemain = (endtime) => {
    const t = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((t / 1000) % 60);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const hours = Math.floor((t / 1000 / 60 / 60) % 24);
    const days = Math.floor(t / 1000 / 60 / 60 / 24);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  };

  const setClock = (selector, endtime) => {
    const timer = document.querySelector(selector);
    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');
    const timeInterval = setInterval(updateClock, 1000);

		updateClock();

    function updateClock() {
      const t = getTimeRemain(endtime);

			days.textContent = (t.days).toString().padStart(2, 0);
      hours.textContent = (t.hours).toString().padStart(2, 0);
      minutes.textContent = (t.minutes).toString().padStart(2, 0);
      seconds.textContent = (t.seconds).toString().padStart(2, 0);

      if (t.total <= 0) {
        days.textContent = '00';
        hours.textContent = '00';
        minutes.textContent = '00';
        seconds.textContent = '00';

        clearInterval(timeInterval);
      }
    }
  };
  setClock(id, deadline);
};

export default timer;
