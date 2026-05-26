const choices = ["stone", "paper", "scissors"];
const labels = {
  stone: "Stone",
  paper: "Paper",
  scissors: "Scissors"
};

let playerScore = 0;
let computerScore = 0;

const playerScoreElement = document.getElementById("player-score");
const computerScoreElement = document.getElementById("computer-score");
const roundText = document.getElementById("round-text");
const playerMove = document.getElementById("player-move");
const computerMove = document.getElementById("computer-move");
const resetButton = document.getElementById("reset-game");

function getComputerChoice() {
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function getWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "draw";
  }

  const playerWins =
    (playerChoice === "stone" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "stone") ||
    (playerChoice === "scissors" && computerChoice === "paper");

  return playerWins ? "player" : "computer";
}

function playRound(playerChoice) {
  const computerChoice = getComputerChoice();
  const winner = getWinner(playerChoice, computerChoice);

  playerMove.textContent = `You: ${labels[playerChoice]}`;
  computerMove.textContent = `Computer: ${labels[computerChoice]}`;

  if (winner === "draw") {
    roundText.textContent = "It's a draw. Try again!";
  } else if (winner === "player") {
    playerScore += 1;
    roundText.textContent = "You won this round!";
  } else {
    computerScore += 1;
    roundText.textContent = "Computer won this round.";
  }

  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = computerScore;
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  playerScoreElement.textContent = "0";
  computerScoreElement.textContent = "0";
  roundText.textContent = "Make your first move.";
  playerMove.textContent = "You: -";
  computerMove.textContent = "Computer: -";
}

document.querySelectorAll(".choice-button").forEach((button) => {
  button.addEventListener("click", () => {
    playRound(button.dataset.choice);
  });
});

resetButton.addEventListener("click", resetGame);
