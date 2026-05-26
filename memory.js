const icons = ["🌸", "⭐", "🎧", "🎨", "💎", "🚀", "📚", "💡"];

const board = document.getElementById("memory-board");
const movesElement = document.getElementById("moves");
const timerElement = document.getElementById("timer");
const matchesElement = document.getElementById("matches");
const statusText = document.getElementById("status-text");
const resetButton = document.getElementById("reset-game");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matches = 0;
let seconds = 0;
let timerId = null;

function shuffle(cards) {
  return cards
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((card) => card.value);
}

function formatTime(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const remainingSeconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
}

function startTimer() {
  if (timerId) {
    return;
  }

  timerId = setInterval(() => {
    seconds += 1;
    timerElement.textContent = formatTime(seconds);
  }, 1000);
}

function stopTimer() {
  clearInterval(timerId);
  timerId = null;
}

function updateStats() {
  movesElement.textContent = moves;
  matchesElement.textContent = `${matches}/8`;
}

function createCard(icon, index) {
  const card = document.createElement("button");
  card.className = "memory-card";
  card.type = "button";
  card.dataset.icon = icon;
  card.setAttribute("aria-label", `Hidden memory card ${index + 1}`);

  card.innerHTML = `
    <span class="card-face card-back">?</span>
    <span class="card-face card-front" aria-hidden="true">${icon}</span>
  `;

  card.addEventListener("click", () => flipCard(card));
  return card;
}

function flipCard(card) {
  if (lockBoard || card === firstCard || card.classList.contains("is-matched")) {
    return;
  }

  startTimer();
  card.classList.add("is-flipped");
  card.setAttribute("aria-label", `Revealed ${card.dataset.icon} card`);

  if (!firstCard) {
    firstCard = card;
    statusText.textContent = "Pick another card to check the pair.";
    return;
  }

  secondCard = card;
  moves += 1;
  updateStats();
  checkMatch();
}

function checkMatch() {
  const isMatch = firstCard.dataset.icon === secondCard.dataset.icon;

  if (isMatch) {
    firstCard.classList.add("is-matched");
    secondCard.classList.add("is-matched");
    firstCard.disabled = true;
    secondCard.disabled = true;
    matches += 1;
    updateStats();
    statusText.textContent = "Nice match! Keep going.";
    resetTurn();

    if (matches === icons.length) {
      stopTimer();
      statusText.textContent = `You won in ${moves} moves and ${formatTime(seconds)}!`;
    }

    return;
  }

  lockBoard = true;
  statusText.textContent = "Not a match. Try to remember those cards.";

  setTimeout(() => {
    firstCard.classList.remove("is-flipped");
    secondCard.classList.remove("is-flipped");
    firstCard.setAttribute("aria-label", "Hidden memory card");
    secondCard.setAttribute("aria-label", "Hidden memory card");
    resetTurn();
  }, 850);
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function resetGame() {
  stopTimer();
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  moves = 0;
  matches = 0;
  seconds = 0;
  timerElement.textContent = "00:00";
  statusText.textContent = "Flip any two cards to find a matching pair.";
  updateStats();
  renderBoard();
}

function renderBoard() {
  board.innerHTML = "";
  const cards = shuffle([...icons, ...icons]);
  cards.forEach((icon, index) => {
    board.appendChild(createCard(icon, index));
  });
}

resetButton.addEventListener("click", resetGame);
resetGame();
