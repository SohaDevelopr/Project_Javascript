let container = document.querySelector(".container"),
  video = container.querySelector("video"),
  wrapper = container.querySelector(".wrapper"),
  progressBar = container.querySelector(".progress-bar"),
  progress = container.querySelector(".progress"),
  voluemBtn = container.querySelector(".volume i"),
  current_Time = container.querySelector(".current-time"),
  video_duration = container.querySelector(".video-duration"),
  playPauseBtn = container.querySelector(".play-btn i"),
  fullscreenBtn = container.querySelector(".fullscreen i"),
  timer;

// EventListener

// hide controls

const hideControls = () => {
  if (video.paused) return;
  timer = setTimeout(() => {
    container.classList.remove("show-controls");
  }, 3000);
};

container.addEventListener("mousemove", () => {
  container.classList.add("show-controls");
  clearTimeout(timer);
  hideControls();
});


const formatTime = (time) => {
  let secs = Math.floor(time % 60),
    mins = Math.floor(time / 60) % 60,
    hors = Math.floor(time / 3600);
  secs = secs < 10 ? `0${secs}` : secs;
  hors = hors < 10 ? `0${hors}` : hors;

  if (hors == 0) {
    return `${mins}:${secs}`;
  }
  return `${hors}:${mins}:${secs}`;
};

video.addEventListener("timeupdate", (e) => {
  // getting currentTime & duration of the video
  let { currentTime, duration } = e.target;
  console.log(currentTime);
  let percent = (currentTime / duration) * 100;
  progress.style.width = `${percent}%`;
  current_Time.innerHTML = formatTime(currentTime);
});

video.addEventListener("loadeddata", (e) => {
  video_duration.innerHTML = formatTime(e.target.duration);
});


// move progress bar on click
progressBar.addEventListener("click", (e) => {
  let timelineWidth = progressBar.clientWidth;
  video.currentTime = (e.offsetX / timelineWidth) * video.duration;
});


// play and pause video
playPauseBtn.addEventListener("click", () => {
  video.paused ? video.play() : video.pause();
});

video.addEventListener("play", () => {
  playPauseBtn.textContent = "pause";
});

video.addEventListener("pause", () => {
  playPauseBtn.textContent = "play_arrow";
});

let isClickVoluemBtn = false;

voluemBtn.addEventListener("click", () => {
  if (!isClickVoluemBtn) {
    video.volume = 0.0;
    voluemBtn.textContent = "volume_off";
    isClickVoluemBtn = true;
  } else {
    video.volume = 0.5;
    voluemBtn.textContent = "volume_up";
    isClickVoluemBtn = false;
  }
});

fullscreenBtn.addEventListener("click", () => {
  container.classList.toggle("fullscreen");
  if (document.fullscreenElement) {
    fullscreenBtn.textContent = "fullscreen";
    return document.exitFullscreen();
  } else {
    fullscreenBtn.textContent = "fullscreen_exit";
    container.requestFullscreen();
  }
});
