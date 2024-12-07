// Canvas Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800; 
canvas.height = 600; 

// Grid Settings
const gridSize = 50; 
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    ctx.strokeStyle = '#ddd'; 
    ctx.font = '12px Arial';
    ctx.fillStyle = 'black'; 

    for (let y = 0; y <= canvasHeight; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y); 
        ctx.lineTo(canvasWidth, y); 
        ctx.stroke();

        ctx.fillText(`${y}`, 5, y - 5); 
    }

    for( let x = 0; x <= canvasWidth; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
        ctx.stroke();
        ctx.fillText(`${x}`, x + 5, 15);
    }
}

drawGrid();
