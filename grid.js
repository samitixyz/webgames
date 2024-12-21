// Canvas Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;

// Grid Settings
const size = 8;
const gridSize = canvas.width / size;
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;
let selected = null;

// Board Setup
let board = [
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0]
]; // 1 = Red, 2 = Blue

// Draw Grid and Pieces
function drawGrid() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            // Draw grid background
            ctx.fillStyle = (row + col) % 2 === 0 ? '#EEE' : "#555";
            ctx.fillRect(col * gridSize, row * gridSize, gridSize, gridSize);

            // Draw pieces
            if (board[row][col] === 1) drawPiece(col, row, 'yellow');
            if (board[row][col] === 2) drawPiece(col, row, 'blue');

            // Draw grid border
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 1;
            ctx.strokeRect(col * gridSize, row * gridSize, gridSize, gridSize);
        }
    }

    // Highlight selected cell
    if (selected) {
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 4;
        ctx.strokeRect(selected.col * gridSize, selected.row * gridSize, gridSize, gridSize);
    }
}

// Draw a Piece
function drawPiece(col, row, color) {
    ctx.beginPath();
    // arc(x, y, radius, startAngle, endAngle, counterclockwise)
    ctx.arc(
        col * gridSize + gridSize / 2,
        row * gridSize + gridSize / 2,
        gridSize / 3,
        0,
        Math.PI * 2
    );
    ctx.fillStyle = color;
    ctx.fill();
}

// Get Cell from Click
function getCell(offsetX, offsetY) {
    return {
        row: Math.floor(offsetY / gridSize),
        col: Math.floor(offsetX / gridSize)
    };
}

function movePiece(fromRow, fromCol, toRow, toCol) {
    board[toRow][toCol] = board[fromRow][fromCol];
    board[fromRow][fromCol] = 0;
}

// Handle Click
function handleClick(event) {
    const rect = canvas.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    if (offsetX >= 0 && offsetX <= canvas.width && offsetY >= 0 && offsetY <= canvas.height) {
        const { row, col } = getCell(offsetX, offsetY);
        console.log(`You clicked: ${JSON.stringify(selected)}`);

        if(selected) {
            movePiece(selected.row, selected.col, row, col);
            selected = null;
        }

        selected = { row, col };

    } else {
        console.log("Click is outside the canvas.");
    }



    drawGrid();
}

// Initial Draw
drawGrid();
document.addEventListener("click", handleClick);
