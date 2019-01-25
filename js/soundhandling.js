const bgMusic = document.querySelector('#bgMusic')

var isPlaying = false;
var music;

function togglePlay() {
  if (isPlaying) {
    bgMusic.pause()
  } else {
    music = bgMusic.play();
    
  }
};

bgMusic.onplaying = function() {
  isPlaying = true;
};
bgMusic.onpause = function() {
  isPlaying = false;
};

bgMusic.addEventListener('ended', function() {
  this.currentTime = 0;
  this.play();
}, false);