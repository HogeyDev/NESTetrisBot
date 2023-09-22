import { Board } from './board';
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
        evaluation += ((20 - columnHeight) * (10 - x));
    }
    return evaluation;
}