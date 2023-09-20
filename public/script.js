const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const MINO_WIDTH = 30;
const MINO_HEIGHT = 30;
const BOARD_FRAME_SIZE = 10;

const icons = document.querySelector('.icons');

function drawBoard(board) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, MINO_WIDTH * 10 + 2 * BOARD_FRAME_SIZE, MINO_HEIGHT * 20 + 2 * BOARD_FRAME_SIZE);
    for (let i = 0; i < board.length; i++) {
        let mino = parseInt(board[i]);
        let x = i % 10;
        let y = Math.floor(i / 10);
        if (mino > 0) ctx.fillStyle = '#ff0000';
        else ctx.fillStyle = '#000000';
        ctx.fillRect(MINO_WIDTH * x + BOARD_FRAME_SIZE, MINO_HEIGHT * y + BOARD_FRAME_SIZE, MINO_WIDTH, MINO_HEIGHT);
    }
}

let board = '';
for (let i = 0; i < 200; i++) {
    board += (Math.round(Math.random()));
}
drawBoard(board);