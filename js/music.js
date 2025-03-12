const bgm = new Audio('assets/sounds/bgm.mp3');
const crashSound = new Audio('assets/sounds/crash.wav');
bgm.loop = true;
bgm.play();

// In checkCollisions, play sound on collision
crashSound.play();