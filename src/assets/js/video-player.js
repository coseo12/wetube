import getBlobDuration from 'get-blob-duration';

const videoContainer = document.querySelector('#js-video-player');

const registerView = () => {
  const [_, id] = window.location.pathname.split('/videos/');
  fetch(`/api/${id}/view`, {
    method: 'POST',
  });
};

const handlePlayClick = (videoPlayer, playBtn) => () => {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = `<i class="fas fa-play"></i>`;
  }
};

const handleVolumeClick = (videoPlayer, volumeBtn, volumeRange) => () => {
  if (videoPlayer.muted) {
    const value = videoPlayer.volume;
    videoPlayer.muted = false;
    volumeRange.value = value;
    if (value > 0.6) {
      volumeBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
    } else if (value > 0.3) {
      volumeBtn.innerHTML = `<i class="fas fa-volume-down"></i>`;
    } else {
      volumeBtn.innerHTML = `<i class="fas fa-volume-off"></i>`;
    }
  } else {
    videoPlayer.muted = true;
    volumeBtn.innerHTML = `<i class="fas fa-volume-mute"></i>`;
    volumeRange.value = 0;
  }
};
const exitFullScreen = fullScrnBtn => () => {
  document.exitFullscreen();
  fullScrnBtn.innerHTML = `<i class="fas fa-expand"></i>`;
  fullScrnBtn.removeEventListener('click', exitFullScreen(fullScrnBtn));
  fullScrnBtn.addEventListener('click', goFullScreen(fullScrnBtn));
};

const goFullScreen = fullScrnBtn => () => {
  videoContainer.requestFullscreen();
  fullScrnBtn.innerHTML = `<i class="fas fa-compress"></i>`;
  fullScrnBtn.removeEventListener('click', goFullScreen(fullScrnBtn));
  fullScrnBtn.addEventListener('click', exitFullScreen(fullScrnBtn));
};

const formatDate = seconds => {
  const secondsNumber = parseInt(seconds, 10);
  const hours = Math.floor(secondsNumber / 3600);
  const minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  const totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${totalSeconds.toString().padStart(2, '0')}`;
};

const setTotalTime = (totalTime, videoPlayer) => async () => {
  const blob = await fetch(videoPlayer.src).then(res => res.blob());
  const duration = await getBlobDuration(blob);
  totalTime.innerHTML = formatDate(duration);
};

const setCurrentTime = (currentTime, videoPlayer) => () => {
  currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
};

const handleEnded = (videoPlayer, currentTime, playBtn) => () => {
  videoPlayer.currentTime = 0;
  currentTime.innerHTML = formatDate(videoPlayer.currentTime);
  playBtn.innerHTML = `<i class="fas fa-play"></i>`;
  registerView();
};

const handleDrag = (videoPlayer, volumeBtn) => event => {
  const {
    target: { value },
  } = event;
  videoPlayer.volume = value;
  if (value > 0.6) {
    volumeBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
  } else if (value > 0.3) {
    volumeBtn.innerHTML = `<i class="fas fa-volume-down"></i>`;
  } else {
    volumeBtn.innerHTML = `<i class="fas fa-volume-off"></i>`;
  }
};

const init = () => {
  const videoPlayer = videoContainer.querySelector('video');
  const playBtn = videoContainer.querySelector('#js-play-button');
  const volumeBtn = videoContainer.querySelector('#js-volume-button');
  const fullScrnBtn = videoContainer.querySelector('#js-full-screen');
  const currentTime = videoContainer.querySelector('#js-current-time');
  const totalTime = videoContainer.querySelector('#js-total-time');
  const volumeRange = videoContainer.querySelector('#js-volume');

  videoPlayer.volume = 0.5;

  playBtn.addEventListener('click', handlePlayClick(videoPlayer, playBtn));
  volumeBtn.addEventListener(
    'click',
    handleVolumeClick(videoPlayer, volumeBtn, volumeRange)
  );
  fullScrnBtn.addEventListener('click', goFullScreen(fullScrnBtn));
  videoPlayer.addEventListener(
    'loadedmetadata',
    setTotalTime(totalTime, videoPlayer)
  );
  videoPlayer.addEventListener(
    'timeupdate',
    setCurrentTime(currentTime, videoPlayer)
  );
  videoPlayer.addEventListener(
    'ended',
    handleEnded(videoPlayer, currentTime, playBtn)
  );
  volumeRange.addEventListener('input', handleDrag(videoPlayer, volumeBtn));
};

if (videoContainer) {
  init();
}
