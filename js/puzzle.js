// --- Elements ---
const boardEl = document.getElementById('board');
const modal = document.getElementById('modal');
const nextBtn = document.getElementById('nextBtn');
const openBtn = document.getElementById('openBtn'); // NEW
const envelopeView = document.getElementById('envelope-view'); // NEW
const letterView = document.getElementById('letter-view'); // NEW
const heartContainer = modal.querySelector('.hearts');
const revealedTextEl = document.getElementById('revealedText');

// --- Game State ---
let board = [
  "💖", "✨", "💖",
  "✨", "", "✨",
  "💖", "✨", "💖"
];
let winningIndex = 4; 
let winningMove = "💖";
const winMessage = "Every word unspoken still whispers your name.";

// --- Background Emojis ---
const bgEmojis = ['💖', '🌸', '💫', '🩷', '💌', '✨'];

function createFloatingEmoji() {
  const e = document.createElement('div');
  e.textContent = bgEmojis[Math.floor(Math.random() * bgEmojis.length)];
  e.style.position = 'fixed';
  e.style.left = Math.random() * 100 + 'vw';
  e.style.top = '110vh'; 
  e.style.fontSize = (12 + Math.random() * 18) + 'px';
  e.style.opacity = 0.15 + Math.random() * 0.1;
  e.style.pointerEvents = 'none';
  e.style.zIndex = 0; 
  e.style.transition = 'opacity 1s linear';

  document.body.appendChild(e);

  const duration = 8000 + Math.random() * 5000; 
  const endLeft = (parseFloat(e.style.left) + (Math.random() * 40 - 20)) + 'vw';

  e.animate([
    { transform: 'translate(0, 0) rotate(0deg)' },
    { transform: `translate(${endLeft}, -120vh) rotate(360deg)` }
  ], {
    duration: duration,
    iterations: 1,
    easing: 'linear'
  });

  setTimeout(() => e.remove(), duration);
}

setInterval(createFloatingEmoji, 700);

// --- Board Logic ---
function renderBoard() {
  boardEl.innerHTML = '';
  board.forEach((val, idx) => {
    const sq = document.createElement('div');
    sq.className = 'square';
    sq.dataset.idx = idx;
    sq.dataset.value = val; 
    sq.textContent = val;
    
    if (val === "") {
        sq.addEventListener('click', () => placeMove(idx));
    } else {
        sq.addEventListener('click', () => shakeSquare(sq));
    }
    
    sq.style.animationDelay = `${idx * 0.05}s`;
    boardEl.appendChild(sq);
  });
}

function placeMove(idx) {
  if (idx !== winningIndex || board[idx] !== "") return;

  board[idx] = winningMove;
  
  const sq = boardEl.querySelector(`[data-idx="${idx}"]`);
  sq.textContent = winningMove;
  sq.dataset.value = winningMove;
  sq.style.animation = 'stampIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';

  playSparkleAnimation(sq);
  setTimeout(showWin, 700); 
}

function shakeSquare(sq) {
    if(!sq) return;
    sq.classList.add('shake');
    setTimeout(() => sq.classList.remove('shake'), 400);
}

function playSparkleAnimation(squareElement) {
  for (let i = 0; i < 5; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.top = (Math.random() * 80 + 10) + '%'; 
      sparkle.style.left = (Math.random() * 80 + 10) + '%'; 
      sparkle.style.animationDelay = (Math.random() * 0.3) + 's';
      squareElement.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1000); 
  }
}

// --- Win Logic (Updated) ---
function showWin() {
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');

  // Ensure we start with the Envelope view
  envelopeView.style.display = 'block';
  letterView.style.display = 'none';

  setTimeout(() => {
    modal.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 300);
  
  setInterval(createModalHeart, 400);
}

// --- NEW: Open Mail Function ---
openBtn.addEventListener('click', () => {
    // 1. Hide Envelope
    envelopeView.style.display = 'none';
    
    // 2. Show Letter with animation
    letterView.style.display = 'block';
    letterView.classList.add('fade-in-up'); // We will add this class in CSS

    // 3. Trigger Confetti NOW (when mail opens)
    triggerConfetti();

    // 4. Start Typing the message
    typewriter(revealedTextEl, winMessage);
});


function triggerConfetti() {
  const duration = 3000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors: ['#ff4d6d', '#ffb3c1', '#f6c43c'] 
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors: ['#ff4d6d', '#ffb3c1', '#f6c43c']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
}


function createModalHeart() {
  const heart = document.createElement('div');
  heart.innerHTML = '💖';
  heart.style.setProperty('--x-pos', (Math.random() * 80 + 10) + '%');
  heartContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 3800);
}

function typewriter(element, text, i = 0) {
    if (i === 0) element.textContent = '';
    if (i < text.length) {
        element.textContent += text.charAt(i);
        setTimeout(() => typewriter(element, text, i + 1), 60);
    }
}

// --- Navigation ---
nextBtn.addEventListener('click', () => {
    document.body.classList.add('fade-out');
    setTimeout(() => {
        window.location.href = 'reasons.html';
    }, 800);
});

renderBoard();