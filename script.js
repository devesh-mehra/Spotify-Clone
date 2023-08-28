console.log("Welcome to Spotify");
//Initialize the variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let songs = [
  {
    songName: "Warriyo - Mortals [NCS Release]",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songName: "Cielo - Huma-Huma",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
  },
  {
    songName: "DEAF KEV - Invincible [NCS Release]",
    filePath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
  },
  {
    songName: "Different Heaven & EH!DE - My Heart [NCS Release]",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
  },
  {
    songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
  },
  {
    songName: "Aunty Ji - Ek Main Aur Ekk Tu ",
    filePath: "songs/6.mp3",
    coverPath: "covers/6.jpg",
  },
  {
    songName: "Suit Suit - Guru Randhawa",
    filePath: "songs/7.mp3",
    coverPath: "covers/7.jpg",
  },
  {
    songName: "Happy- Pharrell Williams ",
    filePath: "songs/8.mp3",
    coverPath: "covers/8.jpg",
  },
  {
    songName: "Aadat Se Majboor - Ladies Vs Ricky Bahl",
    filePath: "songs/9.mp3",
    coverPath: "covers/9.jpg",
  },
  {
    songName: "Amplifier - Imran Khan ",
    filePath: "songs/10.mp3",
    coverPath: "covers/10.jpg",
  },
];

//handle play /pause/click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
});
//Listen to events
audioElement.addEventListener("timeupdate", () => {
  // Update Seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);

  myProgressBar.value = progress;
});
//changing the song when progess bar changes
myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});
songItems.forEach((element, i) => {
  // console.log(element,i);
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});
// make all plays function make other songs pause button play if they are playing
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.add("fa-play-circle");
      element.classList.remove("fa-pause-circle");
    }
  );
};
Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();
      songIndexindex = parseInt(e.target.id);
      e.target.classList.remove("fa-play-circle");
      e.target.classList.add("fa-pause-circle");
      masterSongName.innerText = songs[songIndex].songName;
      audioElement.src = songs[songIndex].filePath;
      audioElement.currentTime = 0; // beacause the songs is changed
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.add("fa-pause-circle");
      masterPlay.classList.remove("fa-play-circle");
    });
  }
);
document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  audioElement.currentTime = 0; // beacause the songs is changed
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.add("fa-pause-circle");
  masterPlay.classList.remove("fa-play-circle");
});
document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  audioElement.currentTime = 0; // beacause the songs is changed
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.add("fa-pause-circle");
  masterPlay.classList.remove("fa-play-circle");
});
// Select all play icons with class 'songItemPlay'
// Select all play icons with class 'songItemPlay'
const playIcons = document.querySelectorAll('.songItemPlay');

// Add click event listeners to each play icon
playIcons.forEach((playIcon, index) => {
  playIcon.addEventListener('click', () => {
    // Pause the currently playing song
    audioElement.pause();

    // Set the new song index based on the clicked play icon's ID
    songIndex = index;

    // Update the song name displayed
    masterSongName.innerText = songs[songIndex].songName;

    // Update the audio source to the selected song
    audioElement.src = songs[songIndex].filePath;

    // Reset the playback time
    audioElement.currentTime = 0;

    // Play the selected song
    audioElement.play();

    // Reset all play icons to play state
    playIcons.forEach((icon) => {
      icon.classList.remove('fa-circle-pause');
      icon.classList.add('fa-circle-play');
    });

    // Change the clicked play icon's appearance to pause
    playIcon.classList.remove('fa-circle-play');
    playIcon.classList.add('fa-circle-pause');

    // Display the GIF associated with the song
    gif.style.opacity = 1;

    // Update the main play button's appearance to show pause
    masterPlay.classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle');
  });
});

