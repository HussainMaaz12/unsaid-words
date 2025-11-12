// --- Elements ---
const boardEl = document.getElementById('board');
const modal = document.getElementById('modal');
const nextBtn = document.getElementById('nextBtn');
const heartContainer = modal.querySelector('.hearts');
const revealedTextEl = document.getElementById('revealedText');

// --- Game State ---
// "💖" = You (Deepshikha), "✨" = Me
let board = [
  "💖", "✨", "💖",
  "✨", "", "✨",
  "💖", "✨", "💖"
];
let winningIndex = 4; // She has to place 💖 in center
let winningMove = "💖";
const winMessage = "Every word unspoken still whispers your name.";

// --- Background Emojis (Starts Immediately) ---
const bgEmojis = ['💖', '🌸', '💫', '🩷', '💌', '✨'];

function createFloatingEmoji() {
  const e = document.createElement('div');
  e.textContent = bgEmojis[Math.floor(Math.random() * bgEmojis.length)];
  e.style.position = 'fixed';
  e.style.left = Math.random() * 100 + 'vw';
  e.style.top = '110vh'; // Start just below screen
  e.style.fontSize = (12 + Math.random() * 18) + 'px';
  e.style.opacity = 0.15 + Math.random() * 0.1;
  e.style.pointerEvents = 'none';
  e.style.zIndex = 0; // Behind the page content
  e.style.transition = 'opacity 1s linear';

  document.body.appendChild(e);

  const duration = 8000 + Math.random() * 5000; // 8-13s
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

// Create a new floating emoji every 700ms
setInterval(createFloatingEmoji, 700);


// --- Board Logic ---

function renderBoard() {
  boardEl.innerHTML = '';
  board.forEach((val, idx) => {
    const sq = document.createElement('div');
    sq.className = 'square';
    sq.dataset.idx = idx;
    sq.dataset.value = val; // For CSS styling
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

// Handle clicking on a square
function placeMove(idx) {
  if (idx !== winningIndex || board[idx] !== "") return;

  board[idx] = winningMove;
  
  const sq = boardEl.querySelector(`[data-idx="${idx}"]`);
  sq.textContent = winningMove;
  sq.dataset.value = winningMove;
  sq.style.animation = 'stampIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';

  // --- NEW SPARKLE LOGIC ---
  // 1. Play the sparkle animation
  playSparkleAnimation(sq);

  // 2. Show the win modal *after* the animation
  setTimeout(showWin, 700); // Delayed to let sparkles play
}

// Shake a square if it's the wrong one
function shakeSquare(sq) {
    if(!sq) return;
    sq.classList.add('shake');
    setTimeout(() => sq.classList.remove('shake'), 400);
}

// --- NEW: Function to play sparkle animation ---
function playSparkleAnimation(squareElement) {
  // Create 5 sparkles
  for (let i = 0; i < 5; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      
      // Position them randomly within the square
      sparkle.style.top = (Math.random() * 80 + 10) + '%'; // 10% to 90%
      sparkle.style.left = (Math.random() * 80 + 10) + '%'; // 10% to 90%
      
      // Add a random delay
      sparkle.style.animationDelay = (Math.random() * 0.3) + 's';
      
      squareElement.appendChild(sparkle);
      
      // Remove the sparkle after animation
      setTimeout(() => {
          sparkle.remove();
      }, 1000); // 0.7s animation + 0.3s max delay
  }
}

// --- Win Modal Logic ---

function showWin() {
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');

  // Auto-scroll to the modal
  setTimeout(() => {
    modal.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 300);

  setInterval(createModalHeart, 400);
  
  typewriter(revealedTextEl, winMessage);
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

// --- Event Listeners ---
nextBtn.addEventListener('click', () => {
  window.location.href = 'reasons.html';
});

// --- Initial Render ---
renderBoard();