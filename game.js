import { LFSR } from './rng.js';
import { Piece } from './piece.js';
import { Board } from './board.js';

export let pieceRng = new LFSR(0);

export class Game {
	constructor(level=18) {
		this.level = level;
		this.score = 0;
		this.board = new Board();
		this.activePiece = this.getNewPiece();
	}
	getNewPiece() {
		return (this.activePiece = new Piece(Math.floor(pieceRng.float() * 7)));
	}
	tick() {
		this.activePiece.y++;
	}
}