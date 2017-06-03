var timer = document.getElementById('timer');
var toggleBtn = document.getElementById('toggle');
var resetBtn = document.getElementById('reset');

let watch = new Stopwatch(timer);

let start = () => {
  watch.start();
  toggleBtn.textContent = "Stop";
};
let stop = () => {
  watch.stop();
  toggleBtn.textContent = "Start";
};

toggleBtn.addEventListener("click", () => {
  (watch.isOn) ? stop() : start();
});

resetBtn.addEventListener("click", () => {
  if (!watch.isOn) {
    watch.reset();
  };
});
