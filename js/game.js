// Initialize canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load images
const backgroundImage = new Image();
backgroundImage.src = 'assets/images/background.jpg';
backgroundImage.onerror = () => console.error("Failed to load background.jpg at assets/images/background.jpg");

const catImage = new Image();
catImage.src = 'assets/images/cat.png';
catImage.onerror = () => console.error("Failed to load cat.png");

const meteorImage = new Image();
meteorImage.src = 'assets/images/meteor.png';
meteorImage.onerror = () => console.error("Failed to load meteor.png");

// Load audio
const bgm = new Audio('assets/sounds/bgm.mp3');
const crashSound = new Audio('assets/sounds/crash.wav');
bgm.loop = true;

// Wait for images to load before starting the game
let imagesLoaded = 0;
const totalImages = 3;

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        bgm.play(); // Start background music when images are loaded
        gameLoop(); // Start the game loop
    }
}

catImage.onload = imageLoaded;
meteorImage.onload = imageLoaded;
backgroundImage.onload = imageLoaded;

// Game state
let cat = { x: 200, y: 300, width: 70, height: 70, speed: 5 };
let meteors = [];
let score = 0;
let lives = 3;
let gameOver = false;
let meteorSpawnRate = 0.5;
let meteorSpeed = 2;
let lastSpawn = Date.now();
let gameStartTime = Date.now();

// Player movement
let keys = {};
document.addEventListener('keydown', (e) => keys[e.key] = true);
document.addEventListener('keyup', (e) => keys[e.key] = false);

function moveCat() {
    if (keys['ArrowUp'] && cat.y > 0) cat.y -= cat.speed;
    if (keys['ArrowDown'] && cat.y < canvas.height - cat.height) cat.y += cat.speed;
    if (keys['ArrowLeft'] && cat.x > 0) cat.x -= cat.speed;
    if (keys['ArrowRight'] && cat.x < canvas.width - cat.width) cat.x += cat.speed;
}

// Spawn meteors
function spawnMeteor() {
    const now = Date.now();
    if ((now - lastSpawn) / 1000 > meteorSpawnRate) {
        const size = Math.random() * 30 + 20;
        meteors.push({
            x: canvas.width,
            y: Math.random() * (canvas.height - size),
            width: size,
            height: size,
            speed: meteorSpeed + Math.random() * 2
        });
        lastSpawn = now;
    }
}

// Update meteors
function updateMeteors() {
    meteors.forEach((meteor, index) => {
        meteor.x -= meteor.speed;
        if (meteor.x + meteor.width < 0) {
            meteors.splice(index, 1);
        }
    });
}

// Collision detection
function checkCollisions() {
    meteors.forEach((meteor, index) => {
        if (
            cat.x < meteor.x + meteor.width &&
            cat.x + cat.width > meteor.x &&
            cat.y < meteor.y + meteor.height &&
            cat.y + cat.height > meteor.y
        ) {
            lives--;
            crashSound.play(); // Play crash sound on collision
            meteors.splice(index, 1);
            if (lives <= 0) {
                endGame();
            }
        }
    });
}

// Draw functions
function drawBackground() {
    if (backgroundImage.complete) {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    } else {
        // Fallback gradient if background image isn't loaded
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#111');
        gradient.addColorStop(1, '#330033');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'white';
        for (let i = 0; i < 50; i++) {
            ctx.beginPath();
            ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

function drawCat() {
    if (catImage.complete) {
        ctx.drawImage(catImage, cat.x, cat.y, cat.width, cat.height);
    } else {
        // Fallback to yellow rectangle if image not loaded
        ctx.fillStyle = 'yellow';
        ctx.fillRect(cat.x, cat.y, cat.width, cat.height);
    }
}

function drawMeteors() {
    meteors.forEach(meteor => {
        if (meteorImage.complete) {
            ctx.drawImage(meteorImage, meteor.x, meteor.y, meteor.width, meteor.height);
        } else {
            // Fallback to red rectangle
            ctx.fillStyle = 'red';
            ctx.fillRect(meteor.x, meteor.y, meteor.width, meteor.height);
        }
    });
}

function drawScore() {
    document.getElementById('score').textContent = Math.floor(score);
}

// Game loop
function gameLoop() {
    if (!gameOver) {
        moveCat();
        spawnMeteor();
        updateMeteors();
        checkCollisions();

        const elapsed = (Date.now() - gameStartTime) / 1000;
        meteorSpawnRate = Math.max(0.2, 0.5 - elapsed * 0.01);
        meteorSpeed = 2 + elapsed * 0.1;

        score += 0.016;

        drawBackground();
        drawCat(); 
        drawMeteors();
        drawScore();

        requestAnimationFrame(gameLoop);
    }
}

// End game
function endGame() {
    gameOver = true;
    saveHighScore(score);
    document.getElementById('final-score').textContent = Math.floor(score);
    document.getElementById('game-over').classList.remove('hidden');
}

// Restart game
function restartGame() {
    cat = { x: 200, y: 300, width: 70, height: 70, speed: 5 };
    meteors = [];
    score = 0;
    lives = 3;
    gameOver = false;
    meteorSpawnRate = 0.5;
    meteorSpeed = 2;
    lastSpawn = Date.now();
    gameStartTime = Date.now();
    document.getElementById('game-over').classList.add('hidden');
    gameLoop();
}