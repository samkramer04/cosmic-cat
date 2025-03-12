// js/cat.js
const catImage = new Image();
catImage.src = 'assets/images/cat.png';

const meteorImage = new Image();
meteorImage.src = 'assets/images/meteor.png';

// Debug loading issues
catImage.onerror = () => console.error("Failed to load cat.png at assets/images/cat.png");
meteorImage.onerror = () => console.error("Failed to load meteor.png at assets/images/meteor.png");

function drawCat() {
    if (catImage.complete) {
        ctx.drawImage(catImage, cat.x, cat.y, cat.width, cat.height);
    } else {
        console.log("Cat image not loaded yet");
        // Fallback to placeholder if image isn't loaded
        ctx.fillStyle = 'yellow';
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'yellow';
        ctx.fillRect(cat.x, cat.y, cat.width, cat.height);
        ctx.shadowBlur = 0;
    }
}

function drawMeteors() {
    if (meteorImage.complete) {
        meteors.forEach(meteor => {
            ctx.drawImage(meteorImage, meteor.x, meteor.y, meteor.width, meteor.height);
        });
    } else {
        console.log("Meteor image not loaded yet");
        // Fallback to placeholder if image isn't loaded
        meteors.forEach(meteor => {
            ctx.fillStyle = 'red';
            ctx.fillRect(meteor.x, meteor.y, meteor.width, meteor.height);
        });
    }
}