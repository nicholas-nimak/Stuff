class Stopwatch {
  constructor(elem) {
    let time = 0;
    let interval;
    let offset;

    let update = () => {
      if(this.isOn) {
        time += delta();
      }
      let formattedTime = timeFormatter(time);
      elem.textContent = formattedTime;
    };

    let delta = () => {
      let now = Date.now();
      let timePassed = now - offset;
      offset = now;
      return timePassed;
    };

    let timeFormatter = (timeInMilliseconds) => {
      let time = new Date(timeInMilliseconds);
      let minutes = time.getMinutes().toString();
      let seconds = time.getSeconds().toString();
      let milliseconds = time.getMilliseconds().toString();

      if (minutes.length < 2) {
            minutes = '0' + minutes;
          }

          if (seconds.length < 2) {
            seconds = '0' + seconds;
          }

          while (milliseconds.length < 3) {
            milliseconds = '0' + milliseconds;
          }

      return minutes + ":" + seconds + ":" + milliseconds;
    };

    this.isOn = false;

    this.start = () => {
      this.isOn = true;
      interval = setInterval(update, 123);
      offset = Date.now();
    };

    this.stop = () => {
      clearInterval(interval);
      interval = null;
      this.isOn = false;
    };

    this.reset = () => {
      time = 0;
      update();
    };
  };

};
