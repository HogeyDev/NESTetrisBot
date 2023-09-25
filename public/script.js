const socket = io();

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.imageSmoothingEnabled = false;

const MINO_WIDTH = 30;
const MINO_HEIGHT = 30;
const BOARD_FRAME_SIZE = 10;

const icons = document.querySelector('.icons');

function drawBoard(board) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, MINO_WIDTH * 10, MINO_HEIGHT * 20);
    for (let i = 0; i < board.length; i++) {
        let mino = parseInt(board[i]);
        let x = i % 10;
        let y = Math.floor(i / 10);
        if (mino)
            ctx.drawImage(icons, 14, 0, 7, 7, MINO_WIDTH * x, MINO_HEIGHT * y, MINO_WIDTH, MINO_HEIGHT);
        // if (mino > 0) ctx.fillStyle = '#ff0000';
        // else ctx.fillStyle = '#000000';
        // ctx.drawImage(MINO_WIDTH * x + BOARD_FRAME_SIZE, MINO_HEIGHT * y + BOARD_FRAME_SIZE, MINO_WIDTH, MINO_HEIGHT);
    }
}

let board = '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001111000';
drawBoard(board);

socket.on('alert-for-me', () => {
    alert("Hello, World!");
});