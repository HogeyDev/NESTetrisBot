import { Game } from './game';
import { getBestMove } from './movesearch';
import { searchDepth } from './params';

let game = new Game(29);

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
        if (game.isOver) {
            clearInterval(mainLoop);
        }
        i++;
    }, 1000 / 60);
}

let fullSecondBuffer = false;
setTimeout(runInConsole, (fullSecondBuffer ? 1000 : 0));