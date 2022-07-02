const audio = document.querySelector('audio');
const playStopBtn = document.querySelector('#play-pause');
const nextBtn = document.querySelector('#next-song');
const previousBtn = document.querySelector('#previous-song');
const progress = document.querySelector('#progress-bar');
let isPlay = false;
let playNum = 0;
const musicList = ['assets/audio/beyonce.mp3', 'assets/audio/dontstartnow.mp3', 'assets/audio/diamonds.mp3'];
const musicLogoList = ['assets/img/lemonade.png', 'assets/img/dontstartnow.png', 'assets/img/diamonds.png'];
const artistList = ["Beyonce", "Dua Lipa", "Rihanna"];
const songList = ["Don't Hurt Yourself", "Don't Start Now", "Diamonds"];

function playAudio(i) {
    audio.src = musicList[i];
    audio.currentTime = 0;
    audio.play();
}

function playPause() {
  if (!isPlay) {
    isPlay = true;
    setTimeout(function() {
        document.getElementById('play-pause').src = "./assets/svg/pause.png";
        document.getElementById('audio-logo').style = "transform: scale(1.15)";
    }, 100);
    return audio.play();
  } else {
    isPlay = false;
    setTimeout(function() {
        document.getElementById('play-pause').src = "./assets/svg/play.png";
        document.getElementById('audio-logo').style = "transform: scale(1)";
    }, 100);
    return audio.pause();
  }
}

function playNext() {
    isPlay = true;
    setTimeout(function() { document.getElementById('play-pause').src = "./assets/svg/pause.png";}, 100);
    playNum = playNum + 1;
    if (playNum >= musicList.length) {
        playNum = 0;
        playAudio(playNum);
        setTimeout(function() {
            document.getElementById('background').src = musicLogoList[playNum];
            document.getElementById('audio-logo').src = musicLogoList[playNum];
            document.getElementById('song-artist').innerHTML = artistList[playNum];
            document.getElementById('song-title').innerHTML = songList[playNum];
            document.getElementById('audio-logo').style = "transform: scale(1.15)";
        }, 100);
    } else {
        playAudio(playNum);
        setTimeout(function() {
            document.getElementById('background').src = musicLogoList[playNum];
            document.getElementById('audio-logo').src = musicLogoList[playNum];
            document.getElementById('song-artist').innerHTML = artistList[playNum];
            document.getElementById('song-title').innerHTML = songList[playNum];
            document.getElementById('audio-logo').style = "transform: scale(1.15)";
        }, 100);
    }
}

function playPrev() {
    isPlay = true;
    playNum = playNum - 1;
    setTimeout(function() { document.getElementById('play-pause').src = "./assets/svg/pause.png";}, 100);
    if (playNum < 0) {
        playNum = musicList.length - 1;
        playAudio(playNum);
        setTimeout(function() {
            document.getElementById('background').src = musicLogoList[playNum];
            document.getElementById('audio-logo').src = musicLogoList[playNum];
            document.getElementById('song-artist').innerHTML = artistList[playNum];
            document.getElementById('song-title').innerHTML = songList[playNum];
            document.getElementById('audio-logo').style = "transform: scale(1.15)";
        }, 100);
    } else {
        playAudio(playNum);
        setTimeout(function() {
            document.getElementById('background').src = musicLogoList[playNum];
            document.getElementById('audio-logo').src = musicLogoList[playNum];
            document.getElementById('song-artist').innerHTML = artistList[playNum];
            document.getElementById('song-title').innerHTML = songList[playNum];
            document.getElementById('audio-logo').style = "transform: scale(1.15)";
        }, 100);
    }
}

playStopBtn.addEventListener('click', playPause);
nextBtn.addEventListener('click', playNext);
previousBtn.addEventListener('click', playPrev);


const startTime = document.querySelector(".current-time");
const finishTime = document.querySelector(".duration-time");
const audioP = document.querySelector(".audio-container");
const timeline = document.querySelector("#progress-bar");

audio.addEventListener("loadeddata", () => {
    audioP.querySelector(".duration-time").textContent = getTimeCodeFromNum(audio.duration);
    audio.volume = .75;
    },
    false
  );

timeline.addEventListener("click", e => {
  const timelineWidth = window.getComputedStyle(timeline).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
  audio.currentTime = timeToSeek;
}, false);

setInterval(() => {
    timeline.max = audio.duration;
    timeline.value = audio.currentTime;
    document.querySelector(".current-time").textContent = getTimeCodeFromNum(audio.currentTime);
  }, 0);

function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;
  
    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
      seconds % 60
    ).padStart(2, 0)}`;
}
