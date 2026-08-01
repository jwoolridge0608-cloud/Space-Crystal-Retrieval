// Elements
const player = document.getElementById("player");
const crystal = document.getElementById("crystal");
const enemy = document.getElementById("enemy");

const game = document.getElementById("gameArea");
const crystalSound = new Audio("sounds/crystal.wav");
const hitSound = new Audio("sounds/hit.wav");

const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");

const message = document.getElementById("message");
const credits = document.getElementById("credits");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

// Game State
let score = 0;
let time = 60;
let timer;
let playing = false;

// Player
let playerX = 20;
let playerY = 20;
const playerSpeed = 5;

// Enemy
let enemyX = 650;
let enemyY = 300;
let enemySpeedX = -1.6;
let enemySpeedY = 1.2;

// Keyboard
const keys = {};

// -----------------------------
// Buttons
// -----------------------------

startBtn.onclick = startGame;
restartBtn.onclick = restartGame;

// -----------------------------
// Keyboard Input
// -----------------------------

document.addEventListener("keydown", (e) => {

    if (playing && e.key === "Tab") {
        e.preventDefault();
        return;
    }

    keys[e.key.toLowerCase()] = true;
});

document.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;
});

// -----------------------------
// Start Game
// -----------------------------

function startGame() {

    startBtn.blur();

    game.style.display = "block";

    // Hide instructions
    document.getElementById("instructions").style.display = "none";

    startBtn.style.display = "none";

    restartBtn.style.display = "none";

    credits.style.display = "none";

    message.innerHTML = "";

    playing = true;

    timer = setInterval(updateTimer, 1000);

}

// -----------------------------
// Timer
// -----------------------------

function updateTimer() {

    time--;

    timerDisplay.textContent = time;

    if (time <= 0) {

        loseGame();

    }

}

// -----------------------------
// Game Loop
// -----------------------------

function gameLoop() {

    if (playing) {

        updatePlayer();

        updateEnemy();

        checkCrystal();

        checkEnemyCollision();

    }

    requestAnimationFrame(gameLoop);

}

requestAnimationFrame(gameLoop);

// -----------------------------
// Player Movement
// -----------------------------

function updatePlayer() {

    let dx = 0;
    let dy = 0;

    if (keys["arrowup"] || keys["w"]) dy--;
    if (keys["arrowdown"] || keys["s"]) dy++;
    if (keys["arrowleft"] || keys["a"]) dx--;
    if (keys["arrowright"] || keys["d"]) dx++;

    if (dx !== 0 || dy !== 0) {

        const length = Math.sqrt(dx * dx + dy * dy);

        dx /= length;
        dy /= length;

        playerX += dx * playerSpeed;
        playerY += dy * playerSpeed;

    }

    const maxX = game.clientWidth - player.offsetWidth;
    const maxY = game.clientHeight - player.offsetHeight;

    playerX = Math.max(0, Math.min(maxX, playerX));
    playerY = Math.max(0, Math.min(maxY, playerY));

    player.style.left = playerX + "px";
    player.style.top = playerY + "px";

}

// -----------------------------
// Enemy Movement
// -----------------------------

function updateEnemy() {

    enemyX += enemySpeedX;
    enemyY += enemySpeedY;

    const maxX = game.clientWidth - enemy.offsetWidth;
    const maxY = game.clientHeight - enemy.offsetHeight;

    if (enemyX <= 0 || enemyX >= maxX) {

        enemySpeedX *= -1;

    }

    if (enemyY <= 0 || enemyY >= maxY) {

        enemySpeedY *= -1;

    }

    enemy.style.left = enemyX + "px";
    enemy.style.top = enemyY + "px";

}

// -----------------------------
// Crystal Collection
// -----------------------------

function checkCrystal() {

    const crystalX = crystal.offsetLeft;
    const crystalY = crystal.offsetTop;

    if (

    Math.abs(playerX - crystalX) < 40 &&
    Math.abs(playerY - crystalY) < 40

) {

        score++;

        crystalSound.currentTime = 0;
        crystalSound.play();

        scoreDisplay.textContent = score;

        moveCrystal();

        if (score >= 30) {

            winGame();

        }

    }

}

function moveCrystal() {

    const maxX = game.clientWidth - crystal.offsetWidth;
    const maxY = game.clientHeight - crystal.offsetHeight;

    crystal.style.left = Math.random() * maxX + "px";
    crystal.style.top = Math.random() * maxY + "px";

}

// -----------------------------
// Enemy Collision
// -----------------------------

function checkEnemyCollision() {

    if (
        Math.abs(playerX - enemyX) < 40 &&
        Math.abs(playerY - enemyY) < 40
    ) {
       
        hitSound.currentTime = 0;
        hitSound.play();
       
        loseGame();
    }

}

// -----------------------------
// Win / Lose
// -----------------------------

function winGame() {

    playing = false;

    clearInterval(timer);

    // Hide the game sprites
    player.style.display = "none";
    enemy.style.display = "none";
    crystal.style.display = "none";

    message.style.display = "block";
    message.innerHTML = "<br>MISSION COMPLETE!";

    restartBtn.style.display = "inline-block";
    credits.style.display = "block";

}

function loseGame(){

    if(!playing) return;

    playing = false;

    clearInterval(timer);

    message.style.display = "block";

    message.innerHTML = "💥<br>GAME OVER";

    restartBtn.style.display = "inline-block";
    credits.style.display = "block";

}

// -----------------------------
// Restart
// -----------------------------

function restartGame() {

    startBtn.blur();

    player.style.display = "block";
    enemy.style.display = "block";
    crystal.style.display = "block";

    score = 0;
    time = 60;

    scoreDisplay.textContent = score;
    timerDisplay.textContent = time;

    playerX = 20;
    playerY = 20;

    enemyX = 650;
    enemyY = 300;

    player.style.left = playerX + "px";
    player.style.top = playerY + "px";

    enemy.style.left = enemyX + "px";
    enemy.style.top = enemyY + "px";

    moveCrystal();

    message.innerHTML = "";

    restartBtn.style.display = "none";
    credits.style.display = "none";

    playing = true;

    clearInterval(timer);

    timer = setInterval(updateTimer, 1000);

}