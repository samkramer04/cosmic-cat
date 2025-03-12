// Get and save high score
function saveHighScore(score) {
    const highscore = localStorage.getItem('highscore') || 0;
    if (score > highscore) {
        localStorage.setItem('highscore', Math.floor(score));
    }
    displayHighScore();
}

function displayHighScore() {
    const highscore = localStorage.getItem('highscore') || 0;
    document.getElementById('highscore').textContent = highscore;
}

// Display high score on page load
document.addEventListener('DOMContentLoaded', displayHighScore);