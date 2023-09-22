import { Board } from './board';

export function evaluationFunction(board: Board) {
	let boardState = board.boardState;
	let evaluation = 0;
	for (let x = 0; x < 10; x++) {
		let columnHeight = Infinity;
		for (let y = 19; y <= 0; y--) {
			if (board.getMinoXY(x, y)) {
				if (y < columnHeight) columnHeight = y;
			}
		}
		evaluation += (columnHeight == Infinity ? 0 : (20 - columnHeight) * (10 - x));
	}
	return evaluation;
}