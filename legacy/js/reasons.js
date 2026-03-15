document.addEventListener('DOMContentLoaded', () => {
    
    const stackContainer = document.getElementById('card-stack');
    const nextBtn = document.getElementById('nextBtn');
    const datingGif = document.getElementById('dating-gif'); // NEW: Reference to the GIF
    const progressBar = document.getElementById('progress-bar');

    // NEW: Background Container
    const bgContainer = document.getElementById('floating-container');

    // --- CONFIG: Cute Stickers for the cards ---
    const stickers = [
        "https://cdn-icons-gif.flaticon.com/11617/11617574.gif", // Cute Bear
        "https://cdn-icons-gif.flaticon.com/19035/19035552.gif", // box of teady
        "https://cdn-icons-gif.flaticon.com/11321/11321478.gif", // Heart
        "https://cdn-icons-gif.flaticon.com/11706/11706636.gif", // Bunny
        "https://cdn-icons-gif.flaticon.com/17904/17904507.gif"  // Flower
    ];

    const reasons = [
        {
            title: "Your presence heals me",
            desc: "Even after everything, when we talk or laugh together, it feels like all the chaos in my mind fades, and I just feel at home with you."
        },
        {
            title: "You challenge me",
            desc: "Your teasing, playful sarcasm, and sometimes sharp words push me to be better. You make me think and feel stronger."
        },
        {
            title: "You understand my silence",
            desc: "I don’t have to explain everything; you somehow sense when I’m happy, tired, or hurting. That connection is rare."
        },
        {
            title: "You are my light",
            desc: "Even when I feel lost or low, a simple message or a small joke from you can change the entire mood of my day."
        },
        {
            title: "Your laughter",
            desc: "There’s something about the way you laugh that stays with me—it’s warm, genuine, and I can’t help but smile when I hear it."
        },
        {
            title: "Your patience",
            desc: "Through my moods, my mistakes, and my fears, you've stayed. You proved that your care isn’t superficial—it’s real."
        },
        {
            title: "I believe in 'Us'",
            desc: "Talking to you again makes me feel hope, excitement, and certainty that what we share is truly special."
        }
    ];

    let totalCards = reasons.length;
    let cardsRead = 0;

    // --- NEW: Floating Background Logic ---
    function initFloatingBackground() {
        const icons = ['💖', '✨', '🌸', '☁️', '💌', '🩷'];
        
        setInterval(() => {
            const el = document.createElement('div');
            el.classList.add('floater');
            el.textContent = icons[Math.floor(Math.random() * icons.length)];
            
            // Randomize position and speed
            el.style.left = Math.random() * 100 + '%';
            el.style.fontSize = (Math.random() * 20 + 15) + 'px';
            el.style.animationDuration = (Math.random() * 5 + 5) + 's'; // 5-10s duration
            
            bgContainer.appendChild(el);
            
            // Cleanup
            setTimeout(() => el.remove(), 10000);
        }, 600); // Create one every 600ms
    }

    // 1. Create Cards
    function createCards() {
        // Reverse so the first index is visually on top
        [...reasons].reverse().forEach((reason, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            
            // Random Rotation for "messy stack" look
            const randomRotate = Math.random() * 6 - 3; // -3 to +3 deg
            card.style.transform = `translateX(-50%) rotate(${randomRotate}deg)`;
            
            // Random Sticker
            const randomSticker = stickers[Math.floor(Math.random() * stickers.length)];

            // UPDATED: Used 'heart2.gif' instead of emoji in card-icon
            card.innerHTML = `
                <img src="${randomSticker}" class="card-sticker" alt="sticker">
                <img src="assets/images/heart2.gif" class="card-icon-gif" alt="❤️">
                <h3>${reason.title}</h3>
                <p>${reason.desc}</p>
                <div class="click-hint">Tap to Next</div>
            `;
            
            stackContainer.appendChild(card);
        });

        // After creating, activate the top one
        updateInteraction();
    }

    // 2. The Robust "Activate Top Card" Logic (Preserved)
    function updateInteraction() {
        // Select all cards that haven't flown away yet
        const remainingCards = document.querySelectorAll('.card:not(.fly-out)');
        
        if (remainingCards.length === 0) {
            // No cards left? Show the final scene
            showFinalScene();
            return;
        }

        // The last element in the DOM is visually on top
        const topCard = remainingCards[remainingCards.length - 1];
        
        // Add the 'active' class (for Wiggle animation)
        topCard.classList.add('active-card');

        // Add Click Listener (One-time only)
        topCard.addEventListener('click', () => {
            // 1. Animate it away
            animateCardAway(topCard);
            
            // 2. Update Progress
            cardsRead++;
            updateProgress();

            // 3. Prepare the NEXT card
            updateInteraction();

        }, { once: true }); // Important: ensures it only clicks once
    }

    function animateCardAway(card) {
        card.classList.remove('active-card'); // Stop wiggling
        card.classList.add('fly-out');
        
        // Remove from DOM after animation to keep things clean
        setTimeout(() => {
            card.style.display = 'none';
        }, 600);
    }

    function updateProgress() {
        const percent = (cardsRead / totalCards) * 100;
        progressBar.style.width = `${percent}%`;
    }

    // UPDATED: Show the Dating GIF first, then the button
    function showFinalScene() {
        setTimeout(() => {
            // Show GIF
            datingGif.classList.remove('hidden');
            datingGif.classList.add('visible');
            
            // Show Button slightly after
            setTimeout(() => {
                nextBtn.classList.remove('hidden');
                nextBtn.classList.add('visible');
            }, 500);
        }, 500);
    }

    // 3. Navigation
    nextBtn.addEventListener('click', () => {
        document.body.classList.add('fade-out');
        setTimeout(() => {
            window.location.href = 'music.html';
        }, 800);
    });

    // Start
    createCards();
    initFloatingBackground();
});