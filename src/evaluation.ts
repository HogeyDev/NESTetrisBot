import { Game } from './game';

export function evaluationFunction(game: Game) {
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
        evaluation += ((20 - columnHeight) * x);
    }
    evaluation -= game.lines * 3000;
    // evaluation += game.totalPieces * 1000;
    let totalHoleCount = 0;
    for (let x = 0; x < 10; x++) {
        for (let y = 19; y >= 0; y--) {
            if (!game.board.getMinoXY(x, y)) {
                if (
                    game.board.getMinoXY(x - 1, y) &&
                    game.board.getMinoXY(x + 1, y) &&
                    game.board.getMinoXY(x, y - 1)
                ) {
                    totalHoleCount++;
                }
            }
        }
    }
    evaluation += totalHoleCount * 100;
    evaluation -= game.score;
    return evaluation;
}