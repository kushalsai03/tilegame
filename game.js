// Get the canvas element and its 2D context
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let objectX = Math.floor(Math.random() * canvas.width);
let objectY = 0;
const objectSize = 50;
let playerX = canvas.width / 2;
const playerSize = 100;
let score = 0;
let gameOver = false;

// Get score and game over elements
const scoreElement = document.querySelector('.score');
const gameOverElement = document.querySelector('.game-over');

// Game loop
function gameLoop() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move the falling object
  objectY += 5;

  // Draw the player
  ctx.fillRect(playerX - playerSize / 2, canvas.height - playerSize, playerSize, playerSize);

  // Draw the falling object
  ctx.fillRect(objectX - objectSize / 2, objectY, objectSize, objectSize);

  // Check for collision
  if (
    objectX > playerX - playerSize / 2 &&
    objectX < playerX + playerSize / 2 &&
    objectY + objectSize > canvas.height - playerSize
  ) {
    // Collision detected, increase the score
    score++;
    objectX = Math.floor(Math.random() * canvas.width);
    objectY = 0;
    scoreElement.textContent = `Score: ${score}`;
  } else if (objectY > canvas.height) {
    // Object missed, game over
    gameOver = true;
    objectX = Math.floor(Math.random() * canvas.width);
    objectY = 0;
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
    gameOverElement.style.display = 'block';
  }

  // If the game is not over, request the next frame
  if (!gameOver) {
    requestAnimationFrame(gameLoop);
  }
}

// Handle player movement
document.addEventListener('mousemove', (event) => {
  playerX = event.clientX - canvas.offsetLeft;
});

// Restart the game when the user clicks on the "Game Over" message
gameOverElement.addEventListener('click', () => {
  gameOver = false;
  gameOverElement.style.display = 'none';
  gameLoop();
});

// Start the game loop
gameLoop();