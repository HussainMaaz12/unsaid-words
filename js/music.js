document.addEventListener('DOMContentLoaded', () => {

    // --- 1. BACKGROUND MAGIC ---
    const starContainer = document.getElementById('starfield-container');
    const floatContainer = document.getElementById('floating-container');
    
    function createStars() {
        for (let i = 0; i < 60; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.width = (Math.random() * 2 + 1) + 'px';
            star.style.height = star.style.width;
            star.style.top = Math.random() * 100 + '%';
            star.style.left = Math.random() * 100 + '%';
            star.style.animationDuration = (Math.random() * 5 + 3) + 's';
            star.style.animationDelay = (Math.random() * 5) + 's';
            starContainer.appendChild(star);
        }
    }

    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '💖'; 
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        floatContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 8000);
    }

    createStars();
    setInterval(createFloatingHeart, 800);

    // --- 2. MUSIC PLAYER & VISUALIZER ---
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const audio = document.getElementById('bg-music');
    const songTitleEl = document.getElementById('song-title');
    const visualizers = document.querySelectorAll('.visualizer');
    
    const playlist = [
        { title: "I think They Call this Love", src: "assets/music/m4.mp3" },
        { title: "O Sathi", src: "assets/music/m2.mp3" },
        { title: "Chori Kiya Re ziya", src: "assets/music/m1.mp3" },
    ];

    let currentSongIndex = 0;
    let isPlaying = false;
    let hasStarted = false;

    function loadSong(index) {
        audio.src = playlist[index].src;
        songTitleEl.textContent = playlist[index].title;
    }

    function playSong() {
        isPlaying = true;
        playBtn.classList.add('playing');
        audio.play();
        songTitleEl.style.opacity = 1;
        // Turn on visualizer
        visualizers.forEach(v => v.classList.remove('hidden'));
    }

    function pauseSong() {
        isPlaying = false;
        playBtn.classList.remove('playing');
        audio.pause();
        // Turn off visualizer
        visualizers.forEach(v => v.classList.add('hidden'));
    }

    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
            if (!hasStarted) {
                hasStarted = true;
                startRevealSequence();
            }
        }
    });

    nextBtn.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        loadSong(currentSongIndex);
        if(isPlaying) playSong();
    });

    prevBtn.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        loadSong(currentSongIndex);
        if(isPlaying) playSong();
    });

    loadSong(currentSongIndex);

    // --- 3. MEMORY SLIDESHOW (NEW FEATURE) ---
    // Make sure these filenames match exactly what you uploaded!
    const memories = [
        "assets/images/img1.jpeg",
        "assets/images/img2.jpeg", // You added this
        "assets/images/img3.jpeg"  // You added this
    ];
    
    const memoryImgEl = document.getElementById('memory-image');
    let currentMemoryIndex = 0;

    function startMemorySlideshow() {
        setInterval(() => {
            // Fade out
            memoryImgEl.style.opacity = 0;
            
            setTimeout(() => {
                // Change image
                currentMemoryIndex = (currentMemoryIndex + 1) % memories.length;
                memoryImgEl.src = memories[currentMemoryIndex];
                
                // Fade in
                memoryImgEl.style.opacity = 1;
            }, 500); // Wait for fade out to finish
            
        }, 4000); // Change every 4 seconds
    }

    // --- 4. TYPEWRITER MESSAGE REVEAL ---
    const lines = [
        { el: document.querySelector('.line-1'), text: "I wish I could undo some things…" },
        { el: document.querySelector('.line-2'), text: "But every mistake taught me how to value you." },
        { el: document.querySelector('.line-3'), text: "Now I’m a better person — because of you." },
        { el: document.querySelector('.line-4'), text: "Thank you, Deepshikha 💫" },
        { el: document.querySelector('.line-5'), text: "You’ll always be my unsaid words." }
    ];

    function startRevealSequence() {
        document.querySelector('.polaroid-wrapper').classList.add('show');
        
        // Start the slideshow when the photo appears
        startMemorySlideshow();
        
        let delay = 1000; 
        
        lines.forEach((lineObj) => {
            setTimeout(() => {
                lineObj.el.style.opacity = 1;
                typewriter(lineObj.el, lineObj.text);
            }, delay);
            delay += (lineObj.text.length * 50) + 1500;
        });
    }

    function typewriter(element, text, i = 0) {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            setTimeout(() => typewriter(element, text, i + 1), 50);
        }
    }
});