import { Game } from './game';

export function evaluationFunction(gameReal: Game) {
    let game = gameReal.clone();
    let board = game.board.clone();
    let evaluation = 0;
    if (game.isOver) return Infinity;
    for (let x = 0; x < 10; x++) {
        let columnHeight = 20;
        for (let y = 0; y < 20; y++) {
            if (board.getMinoXY(x, y)) {
                columnHeight = y;
                break;
            }
        }
        evaluation += (x < 10 ? ((19 - columnHeight) * Math.pow(x, 2)) : Math.pow(20 - columnHeight, 2) * 16) * 10;
    }
    // evaluation += game.totalPieces * 1000;
    let totalHoleCount = 0;
    let minosAboveHole = 0;
    for (let x = 0; x < 10; x++) {
        let hasHole = false;
        for (let y = 19; y >= 0; y--) {
            if (hasHole && game.board.getMinoXY(x, y)) {
                minosAboveHole++;
            }
            if (game.board.getMinoXY(x, y) == 0) {
                if (
                    (
                        game.board.getMinoXY(x - 1, y) ||
                        game.board.getMinoXY(x + 1, y)
                    ) &&
                    game.board.getMinoXY(x, y - 1)
                ) {
                    hasHole = true;
                    totalHoleCount++;
                }
            }
        }
    }
    let bumpiness = 0;
    let heights = [];
    let deltaHeights = [];
    let wells = 0;
    for (let x = 0; x < 10; x++) {
        let height = 0;
        for (let y = 0; y < 20; y++) {
            if (game.board.getMinoXY(x, y)) {
                height = (19 - y);
                break;
            }
        }
        heights.push(height);
    }
    for (let i = 0; i < heights.length - 1; i++) {
        deltaHeights.push(heights[i] - heights[i + 1]);
    }
    for (let i = 0; i < deltaHeights.length; i++) {
        bumpiness += Math.abs(Math.pow(deltaHeights[i], 2));
        if (i <= deltaHeights.length - 1) {
            if (deltaHeights[i] <= -3 && deltaHeights[i + 1] >= 3) {
                wells++;
            }
        }
    }

    evaluation += bumpiness * 3;
    evaluation += (totalHoleCount + minosAboveHole) * 1000;
    evaluation -= (game.linesLastCleared == 4 ? 1200 : -Math.pow(game.linesLastCleared, 2) * 200);
    evaluation += wells * 50;
    return evaluation;
}