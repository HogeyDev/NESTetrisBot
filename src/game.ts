import { LFSR } from './rng';
import { Piece } from './piece';
import { Board } from './board';

export let pieceRng = new LFSR(0);

export class Game {
    level: number;
    score: number;
    board: Board;
    activePiece: Piece;
    constructor(level = 18) {
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