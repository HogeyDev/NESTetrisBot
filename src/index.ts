import { Game, pieceRng } from './game';
import { generateInputTimeline, getAllMovesWithEvaluation, getBestMove } from './movesearch';
import { FRAME_TIMELINES } from './util';
// import './interface'

let game = new Game();

// function tick() {
//     game.tick();
// }
function runInConsole() {
    let inputs: Array<any> = [];
    let i = 0;
    let oldPieceTotal = -1;
    setInterval(() => {
        if (game.totalPieces != oldPieceTotal) {
            oldPieceTotal = game.totalPieces;
            inputs = getBestMove(game);
            i = 0;
        }
        game.tick(inputs[0][i] || '.');
        console.clear();
        console.log(game.getPrintable());
        // console.log(getAllMovesWithEvaluation(game));
        // console.log(inputs);
        i++;
    }, 1000 / 60);
}

setTimeout(runInConsole, 1000);