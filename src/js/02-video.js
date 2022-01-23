const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const throttle = require('lodash.throttle');


document.addEventListener('DOMContentLoaded', setVideoTime);


//the funciton sets saved video position on page load.
function setVideoTime() {
  currentTimePosition = localStorage.getItem("videoplayer-current-time");
  if (currentTimePosition) {
    player.setCurrentTime(Number(currentTimePosition)).then(function (seconds) {
      // seconds = the actual time that the player seeked to
    }).catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          // the time was less than 0 or greater than the video’s duration
          break;

        default:
          // some other error occurred
          break;
      }
    });
  }


}

//this function saves in localStorage current vieo positon in seconds
const saveCurrentVideoPosition = function () {
  player.getCurrentTime()
    .then(function (seconds) {
      localStorage.setItem("videoplayer-current-time", seconds);
    })
    .catch(function (error) { })
};

player.on('timeupdate', throttle(saveCurrentVideoPosition, 1000)); //save current video played time

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});


