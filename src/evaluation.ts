import { Game } from './game';
import { getScareHeight } from './util';

export function evaluationFunction(game: Game) {
    return getEvaluationPartials(game).total;
}

export function getEvaluationPartials(gameReal: Game) {
    let evaluation = {
        total: 0,
        isOver: 0,
        columnHeight: 0,
        minosAboveHole: 0,
        totalHoleCount: 0,
        bumpiness: 0,
        wells: 0,
        linesCleared: 0,
    };

    let game = gameReal.clone();
    let board = game.board.clone();
    if (game.isOver) evaluation.isOver = Infinity;
    for (let x = 0; x < 10; x++) {
        let columnHeight = 0;
        for (let y = 0; y < 20; y++) {
            if (board.getMinoXY(x, y)) {
                columnHeight = (19 - y);
                break;
            }
        }
        evaluation.columnHeight += (columnHeight >= getScareHeight(game.level) ? columnHeight : 0);
    }
    // evaluation += game.totalPieces * 1000;
    for (let x = 0; x < 10; x++) {
        let hasHole = false;
        for (let y = 19; y >= 0; y--) {
            if (hasHole && game.board.getMinoXY(x, y)) {
                evaluation.minosAboveHole++;
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
                    evaluation.totalHoleCount++;
                }
            }
        }
    }
    let heights = [];
    let deltaHeights = [];
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
        evaluation.bumpiness += Math.abs(Math.pow(deltaHeights[i], 2));
        if (i <= deltaHeights.length - 1) {
            if (deltaHeights[i] <= -3 && deltaHeights[i + 1] >= 3) {
                evaluation.wells++;
            }
        }
    }

    evaluation.linesCleared = (game.linesLastCleared == 4 ? -1200 : Math.pow(game.linesLastCleared, 2) * 200);
    evaluation.bumpiness = evaluation.bumpiness * 3;
    evaluation.totalHoleCount = evaluation.totalHoleCount * 1000;
    evaluation.minosAboveHole = evaluation.minosAboveHole * 1000;
    evaluation.wells = (evaluation.wells > 0 ? evaluation.wells : 0) * 500;
    evaluation.columnHeight = evaluation.columnHeight * 100;

    evaluation.total += evaluation.columnHeight;
    evaluation.total += evaluation.bumpiness;
    evaluation.total += evaluation.totalHoleCount + evaluation.minosAboveHole;
    evaluation.total += evaluation.linesCleared;
    evaluation.total += evaluation.wells;
    evaluation.total += evaluation.isOver;
    return evaluation;
}