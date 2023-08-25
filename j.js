// JavaScript code for the stopwatch functionality
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapTimesList = document.getElementById('lapTimes');

let startTime = 0;
let pausedTime = 0;
let isRunning = false;
let interval;

function updateTimerDisplay() {
  const currentTime = isRunning ? Date.now() - startTime : pausedTime;
  const time = new Date(currentTime);
  const hours = time.getUTCHours().toString().padStart(2, '0');
  const minutes = time.getUTCMinutes().toString().padStart(2, '0');
  const seconds = time.getUTCSeconds().toString().padStart(2, '0');
  timerDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

function startTimer() {
  if (!isRunning) {
    startTime = Date.now() - pausedTime;
    interval = setInterval(updateTimerDisplay, 1000);
    isRunning = true;
  }
}

function pauseTimer() {
  if (isRunning) {
    clearInterval(interval);
    pausedTime = Date.now() - startTime;
    isRunning = false;
  }
}

function resetTimer() {
  clearInterval(interval);
  startTime = 0;
  pausedTime = 0;
  isRunning = false;
  updateTimerDisplay();
  lapTimesList.innerHTML = '';
}

function recordLapTime() {
  if (isRunning) {
    const lapTime = document.createElement('li');
    lapTime.classList.add('lapTime');
    lapTime.textContent = timerDisplay.textContent;
    lapTimesList.appendChild(lapTime);
  }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLapTime);
