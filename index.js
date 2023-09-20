import { Game, pieceRng } from './game.js';

let game = new Game();

function frameTick() {
	console.clear();
	console.log(game.board.toString());
}

setInterval(frameTick, 1000 / 60);