// Canvas Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800; 
canvas.height = 600; 

// Grid Settings
const size = 8;
const gridSize = canvas.width / 8;
// const gridSize = 50; 
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;
let selected = null;

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    ctx.strokeStyle = '#ddd'; 
    ctx.font = '12px Arial';
    ctx.fillStyle = 'black'; 

    // for (let y = 0; y <= canvasHeight; y += gridSize) {
    //     ctx.beginPath();
    //     ctx.moveTo(0, y); 
    //     ctx.lineTo(canvasWidth, y); 
    //     ctx.stroke();
    //     ctx.fillText(`${y}`, 5, y - 5); 
    // }

    // for( let x = 0; x <= canvasWidth; x += gridSize) {
    //     ctx.beginPath();
    //     ctx.moveTo(x, 0);
    //     ctx.lineTo(x, canvasHeight);
    //     ctx.stroke();
    //     ctx.fillText(`${x}`, x + 5, 15);
    // }

    for (let row = 0; row <= size; row++) {
        for(let col = 0; col <= size; col++) {
            ctx.fillStyle = (row + col) % 2 === 0 ? 'rgba(20,20,20,0.2)': "red";
            ctx.fillRect(row * gridSize, col * gridSize, gridSize, gridSize);

            ctx.strokeStyle = 'white'; // Border color
            ctx.lineWidth = 1; // Border width
            ctx.strokeRect(row * gridSize, col * gridSize, gridSize, gridSize);
            
            ctx.font = "16px Arial"; // Adjust font size as needed
            ctx.fillStyle = "black"; // Text color
     
            // Measure text and calculate position for centering
            const text = "(" + Math.floor( (col * gridSize) / gridSize) + ", " + Math.floor( (row * gridSize) / gridSize) + ")" ;
            const textWidth = ctx.measureText(text).width;
            const textX = row * gridSize + (gridSize - textWidth) / 2;
            const textY = col * gridSize + (gridSize + 16) / 2; // Adjust 16 to match font size

            // Draw the text
            ctx.fillText(text, textX, textY);
        }
    }

    if(selected) {
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 4;
        ctx.strokeRect(selected.col * gridSize, selected.row * gridSize, gridSize, gridSize)
    }
}

function getCell(offsetX, offsetY) {
    return {
        row: Math.floor(offsetY / gridSize),
        col: Math.floor(offsetX / gridSize)
    }
}

function handleClick(event) {
    const rect = canvas.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    if (offsetX >= 0 && offsetX <= canvas.width && offsetY >= 0 && offsetY <= canvas.height) {
        selected = getCell(offsetX, offsetY);
        alert(`You clicked: ${JSON.stringify(selected)}`);
    } else {
        console.log("Click is outside the canvas.");
    }

    drawGrid();
}

drawGrid();

document.addEventListener("click", handleClick)