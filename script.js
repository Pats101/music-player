const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
    {
        name: 'So Good To Me',
        imgName: 'good2me',
        displayName: 'So Good To Me',
        artist: 'Chris Malinchak',
    },
    {
        name: 'Guru Josh Project - Infinity',
        imgName: 'infinity',
        displayName: 'Infinity (Ultra Music)',
        artist: 'Guru Josh Project',
    },
    {
        name: 'Hometown - Twenty One Pilots',
        imgName: 'darkTown',
        displayName: 'Hometown',
        artist: 'Twenty One Pilots',
    },
    {
        name: 'It is Yours (Ft. Tia London)',
        imgName: 'yours',
        displayName: 'It is Yours',
        artist: 'Twista Ft. Tia London',
    },
    {
        name: 'Mr Probz - Waves',
        imgName: 'waves1',
        displayName: 'Waves',
        artist: 'Mr Probz',
    },
    {
        name: 'No Pressure (Feat. Big Sean)',
        imgName: 'propose',
        displayName: 'No Pressure',
        artist: 'Justin Bieber Feat. Big Sean',
    }  
];

// Check if playing song
let isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

//  Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.imgName}.jpg`;
}

// Current Song
let songIndex = 0;

// Next Song
function nextSong() {
    songIndex++;
    if(songIndex > songs.length-1) { songIndex = 0; }
    loadSong(songs[songIndex]);
    playSong();
}

// Previous Song
function prevSong() {
    songIndex--;
    if(songIndex < 0) { songIndex = songs.length - 1; }
    loadSong(songs[songIndex]);
    playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
    if(isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // console.log(duration, currentTime);
        // Update progress bar width 
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`
    }
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);