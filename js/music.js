document.addEventListener('DOMContentLoaded', () => {

    // --- 1. "EXTRA ORDINARY" GALAXY GENERATOR ---
    const starContainer = document.getElementById('starfield-container');
    const numStars = 50; 
    const colors = ['white', 'var(--accent)', 'var(--star-gold)'];

    if (starContainer) {
        // Create the drifting stars
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            const size = Math.random() * 30+ 1; // 1px to 4px
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.top = (Math.random() * 100) + '%';
            star.style.left = (Math.random() * 100) + '%';
            star.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // NEW: Randomize duration and delay for parallax
            star.style.animationDuration = (Math.random() * 10 + 10) + 's'; // 10-20s duration
            star.style.animationDelay = (Math.random() * 10) + 's'; // 0-10s delay
            
            starContainer.appendChild(star);
        }

        // NEW: Function to create a shooting star
        function createShootingStar() {
            const shooter = document.createElement('div');
            shooter.className = 'shooting-star';
            
            // Start from a random horizontal position
            shooter.style.left = (Math.random() * 60 + 20) + 'vw'; // 20% to 80%
            // Random delay for the animation
            shooter.style.animationDelay = (Math.random() * 5 + 2) + 's'; // 2-7s delay
            
            starContainer.appendChild(shooter);
            
            // Remove after animation (3s) + max delay (7s)
            setTimeout(() => {
                shooter.remove();
            }, 10000);
        }

        // Create a new shooting star every 7 seconds
        setInterval(createShootingStar, 7000);
        createShootingStar(); // Create one immediately
    }

    // --- 2. Music Player Logic ---
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const audio = document.getElementById('bg-music');
    const songTitleEl = document.getElementById('song-title');
    
    // --- !!! NEW: ADD TIMESTAMPS HERE !!! ---
    // Find the start/end time in seconds (e.g., 1m 30s = 90)
    const playlist = [
        { title: "I think They Call this Love", src: "assets/music/m4.mp3", start: 34, end: 64 },
        { title: "O Sathi", src: "assets/music/m2.mp3", start: 32, end: 95 },
        { title: "Chori Kiya Re ziya", src: "assets/music/m1.mp3", start: 100, end: 140 },
    ];
    // (You'll need to find the *exact* seconds you want)


    let currentSongIndex = 0;
    let isPlaying = false;
    let hasStarted = false;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    function loadSong(index) {
        audio.src = playlist[index].src;
        songTitleEl.textContent = playlist[index].title;

        // --- NEW: Set start time when song loads ---
        audio.onloadedmetadata = () => {
            const currentSong = playlist[currentSongIndex];
            // If a start time is defined, set it
            if (currentSong.start) {
                audio.currentTime = currentSong.start;
            }
        };
    }

    function playSong() {
        isPlaying = true;
        playBtn.classList.add('playing');
        audio.play();
        songTitleEl.style.opacity = 1;
    }

    function pauseSong() {
        isPlaying = false;
        playBtn.classList.remove('playing');
        audio.pause();
        songTitleEl.style.opacity = 0;
    }

    function playNextSong() {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        loadSong(currentSongIndex);
        playSong();
    }

    function playPrevSong() {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        loadSong(currentSongIndex);
        playSong();
    }

    // Event listener for the play button
    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
            
            if (!hasStarted) {
                hasStarted = true;
                revealMessage();
            }
        }
    });

    nextBtn.addEventListener('click', () => {
        playNextSong();
        if (!hasStarted) {
            hasStarted = true;
            revealMessage();
        }
    });
    
    prevBtn.addEventListener('click', () => {
        playPrevSong();
        if (!hasStarted) {
            hasStarted = true;
            revealMessage();
        }
    });

    // When one song *naturally* ends (if no end time), play the next
    audio.addEventListener('ended', playNextSong);

    // --- NEW: Check timestamps as song plays ---
    audio.addEventListener('timeupdate', () => {
        const currentSong = playlist[currentSongIndex];
        
        // If an end time is set and we've passed it, play next song
        if (currentSong.end && audio.currentTime >= currentSong.end) {
            playNextSong();
        }
    });

    // Load the first song
    shuffle(playlist);
    loadSong(currentSongIndex);


    // --- 3. Message Reveal Logic ---
    const messageContainer = document.getElementById('message-container');
    const memoryImage = document.getElementById('memory-image');
    const lines = document.querySelectorAll('.line');

    function revealMessage() {
        if (messageContainer.classList.contains('show')) return; 

        // Reveal image first
        memoryImage.classList.add('show');
        messageContainer.classList.add('show');

        // Auto-scroll to the image/message
        setTimeout(() => {
            memoryImage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);

        let delay = 500;
        lines.forEach((line) => {
            setTimeout(() => {
                line.classList.add('show');
            }, delay);
            
            if (line.classList.contains('line-3')) {
                delay += 2500;
            } else if (line.classList.contains('line-4')) {
                delay += 1500;
            } else {
                delay += 2000;
            }
        });
    }

});