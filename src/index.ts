import { Game, pieceRng } from './game';
import { generateInputTimeline, getBestMove } from './movesearch';
import { FRAME_TIMELINES } from './util';
// import './interface'

let game = new Game();

// function tick() {
//     game.tick();
// }
function runInConsole() {
    let inputs = generateInputTimeline(FRAME_TIMELINES["5HZ"], -4, 2);
	let i = 0;
	let oldPieceTotal = 0;
	setInterval(() => {
		if (game.totalPieces != oldPieceTotal) {
			oldPieceTotal = game.totalPieces;
			inputs = getBestMove(game);
			i = 0;
		}
        game.tick(inputs[i] || '.');
        console.clear();
        console.log(game.getPrintable());
		i++;
    }, 1000 / 60);
}

setTimeout(runInConsole, 1000);