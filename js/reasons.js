document.addEventListener('DOMContentLoaded', () => {

    // --- 1. PRO-LEVEL: Interactive Glow Aura ---
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    // Fade the glow in after page loads
    setTimeout(() => {
        glow.classList.add('glow-visible');
    }, 500);

    // Follows the mouse
    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            // We move the *center* of the glow to the cursor
            glow.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
        });
    });

    // Follows touch on mobile
    document.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            requestAnimationFrame(() => {
                glow.style.transform = `translate(${e.touches[0].clientX - 150}px, ${e.touches[0].clientY - 150}px)`;
            });
        }
    }, { passive: true });


    // --- 2. PRO-LEVEL: Two-Part "Reveal" Logic ---
    const reasonsContainer = document.getElementById('reasons-container');
    const nextBtn = document.getElementById('nextBtn');
    
    // Your reasons, now split into title and description
    const reasons = [
        {
            title: "Your presence heals me",
            desc: "Even after everything, when we talk or laugh together, it feels like all the chaos in my mind fades, and I just feel at home with you."
        },
        {
            title: "You challenge me in the best way",
            desc: "Your teasing, playful sarcasm, and sometimes sharp words push me to be better, to think more, and to become stronger emotionally."
        },
        {
            title: "You understand my silence",
            desc: "I don’t have to explain everything; you somehow sense when I’m happy, tired, or hurting, and that connection is rare and precious."
        },
        {
            title: "You bring light to my darkest days",
            desc: "Even when I feel lost or low, a simple message or a small joke from you can change the entire mood of my day."
        },
        {
            title: "Your laughter is unforgettable",
            desc: "There’s something about the way you laugh that stays with me—it’s warm, genuine, and contagious, and I can’t help but smile whenever I hear it."
        },
        {
            title: "You've been patient with my flaws",
            desc: "Through my moods, my mistakes, and my fears, you've stayed, proving that your care isn’t superficial—it’s real and deep."
        },
        {
            title: "You make me believe in “us” again",
            desc: "Despite past challenges and distance, the fact that we’re talking again makes me feel hope, excitement, and certainty that what we share is truly special."
        }
    ];

    let current = 0;
    // Longer delay to allow reading both parts
    const reasonDelay = 3000; // 3 seconds

    function showNextReason() {
        if (current >= reasons.length) {
            // All reasons shown, show the button
            nextBtn.classList.add('show');
            return;
        }

        const reasonData = reasons[current];
        
        // 1. Create the parent div
        const reasonEl = document.createElement('div');
        reasonEl.className = 'reason';

        // 2. Create the title
        const titleEl = document.createElement('p');
        titleEl.className = 'reason-title';
        titleEl.textContent = reasonData.title;

        // 3. Create the description
        const descEl = document.createElement('p');
        descEl.className = 'reason-desc';
        descEl.textContent = reasonData.desc;

        // 4. Append them all
        reasonEl.appendChild(titleEl);
        reasonEl.appendChild(descEl);
        reasonsContainer.appendChild(reasonEl);

        // 5. Trigger the animation
        // This tiny delay forces the browser to render the element *before*
        // adding the class, allowing the transition to play.
        setTimeout(() => {
            reasonEl.classList.add('show');
        }, 10); 

        current++;
        
        // Wait before showing the next one
        setTimeout(showNextReason, reasonDelay);
    }

    // Start after a brief delay for page title to animate
    setTimeout(showNextReason, 1200);

    // Button navigation
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Stop the link from firing immediately
        
        // Fade out the page
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = 0;
        
        // Go to the next page after the fade
        setTimeout(() => {
            window.location.href = 'music.html'; // Go to Page 4
        }, 500);
    });
});