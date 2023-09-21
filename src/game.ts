import { LFSR } from './rng';
import { Piece } from './piece';
import { Board } from './board';
import { getFramesUntilPieceDrop } from './util';

export let pieceRng = new LFSR(0);

export class Game {
    level: number;
    score: number;
    lines: number;
    frames: number;
    board: Board;
    activePiece: Piece;
    previewPiece: Piece;
    constructor(level = 18) {
        this.level = level;
        this.lines = 0;
        this.score = 0;
        this.board = new Board();
        this.activePiece = this.generatePiece();
        this.previewPiece = this.generatePiece();
        this.frames = 0;
    }
    getPrintable() {
        console.log(`Board State: ${this.board.boardState}`);
        let pieceMatrix: Array<Array<number>> | null = this.activePiece.getMatrix();
        if (pieceMatrix === null) {
            throw new Error("Piece Matrix is Null");
        }
        let str: string = '';
        // preview piece
        console.log(this.previewPiece.getPrintableWithWhiteSpace());
        let mat = this.previewPiece.getMatrix();
        if (mat === null) throw new Error();
        if (mat.length == 3) console.log();
        console.log('='.repeat(20));
        console.log(`LEVEL: ${this.level}\nLINES: ${this.lines}\nSCORE: ${this.score}`);
        console.log('='.repeat(20));
        // str += this.previewPiece.getPrintableWithWhiteSpace();
        // board
        for (let y = 0; y < 20; y++) {
            let char: number;
            for (let x = 0; x < 10; x++) {
                char = this.board.getMinoXY(x, y);
                // piece_x + internal_x == x;
                // x within piece:
                // piece_y + internal_y == y;
                let iy: number = y - this.activePiece.y;
                let ix: number = x - this.activePiece.x;
                if (iy >= 0 && iy < pieceMatrix.length)
                    if (ix >= 0 && ix < pieceMatrix[0].length)
                        if (pieceMatrix[iy][ix])
                            char = pieceMatrix[iy][ix];
                str += char;
            }
        }

        return new Board().toString(str);
    }
    getNewPiece() {
        this.activePiece = this.previewPiece.clone();
        return (this.previewPiece = new Piece(Math.floor(pieceRng.float() * 7)));
    }
    generatePiece() {
        return new Piece(Math.floor(pieceRng.float() * 7));
    }
    tick() {
        if (this.frames % getFramesUntilPieceDrop(this.level) == 0) {
            if (this.pieceCanDrop()) {
                this.activePiece.y++;
            } else {
                this.board.addPieceToBoard(this.activePiece);
                this.getNewPiece();
                if (this.toppedOut()) {
                    throw new Error("Game is Over!");
                }
            }
        }
        this.frames++;
    }
    pieceCanDrop() {
        this.activePiece.y++;
        let c = !this.pieceCollidingWithBoard();
        this.activePiece.y--;
        return c;
    }
    pieceCollidingWithBoard() {
        let pieceMatrix: Array<Array<number>> | null = this.activePiece.getMatrix();
        if (pieceMatrix === null) {
            throw new Error("Piece Matrix is Null");
        }
        console.log('checking for board collision');
        for (let iy = 0; iy < pieceMatrix.length; iy++) {
            for (let ix = 0; ix < pieceMatrix[0].length; ix++) {
                let x: number = this.activePiece.x + ix;
                let y: number = this.activePiece.y + iy;
                if (pieceMatrix[iy][ix] > 0) {
                    if (y > 19 || (x < 0 || x > 9)) return true;
                    if (this.board.getMinoXY(x, y)) return true;
                }
            }
        }
        return false;
    }
    toppedOut() {
        if (this.pieceCollidingWithBoard()) return true;
        return false;
    }
}