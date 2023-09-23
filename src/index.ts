import { Game } from './game';
import { getBestMove } from './movesearch';
import { searchDepth } from './params';
import { LFSR } from './rng';

const evalMax = Infinity;

let game = new Game(29, Math.round(Math.random() * 101010));
// let game = new Game(18);

// function tick() {
//     game.tick();
// }
function runInConsole() {
    let inputs: Array<any> = [];
    let i = 0;
    let oldPieceTotal = -1;
    let mainLoop = setInterval(() => {
        if (game.totalPieces != oldPieceTotal) {
            oldPieceTotal = game.totalPieces;
            inputs = getBestMove(game, searchDepth);
            i = 0;
        }

        game.tick(inputs[0][i] || '.');
        console.clear();
        console.log(game.getPrintable());
        // console.log(getAllMovesWithEvaluation(game));
        // console.log(inputs);
        if (game.isOver || inputs[1] > evalMax) {
            clearInterval(mainLoop);
            game = new Game(29, Math.round(Math.random() * 101010));
            runInConsole();
        }
        i++;
    }, 1000 / 60);
}

let fullSecondBuffer = true;
setTimeout(runInConsole, (fullSecondBuffer ? 1000 : 0));