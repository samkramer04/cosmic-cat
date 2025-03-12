const backgroundImage = new Image();
backgroundImage.src = 'assets/images/background.jpg';

function drawBackground() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}