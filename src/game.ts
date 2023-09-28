import { LFSR } from './rng';
import { Piece } from './piece';
import { Board } from './board';
import { getFramesUntilPieceDrop, baseScoringValues } from './util';
import { evaluationFunction, getEvaluationPartials } from './evaluation';

export class Game {
    level: number;
    score: number;
    lines: number;
    frames: number;
    startingTime: number;
    totalPieces: number;
    lastFrameTime: number;
    board: Board;
    activePiece: Piece;
    previewPiece: Piece;
    isOver: boolean;
    internalRng: LFSR;
    seed: number;
    linesLastCleared: number;
    constructor(level = 18, seed = 0) {
        this.seed = seed;
        this.internalRng = new LFSR(seed);
        this.level = level;
        this.lines = 0;
        this.score = 0;
        this.board = new Board();
        this.activePiece = this.generatePiece();
        this.previewPiece = this.generatePiece();
        this.frames = 0;
        this.startingTime = new Date().getTime();
        this.totalPieces = 0;
        this.lastFrameTime = this.startingTime;
        this.isOver = false;
        this.linesLastCleared = 0;
    }
    getPrintable() {
        // console.log(`Board State: ${this.board.boardState}`);
        let pieceMatrix: Array<Array<number>> | null = this.activePiece.getMatrix();
        if (pieceMatrix === null) {
            throw new Error("Cannot Get a Printable Board Because Piece Matrix is Null");
        }
        let str: string = '';
        // preview piece
        let newTime = new Date().getTime()
        let realTime = (newTime - this.startingTime) / 1000;
        let deltaTime = (newTime - this.lastFrameTime) / 1000;
        this.lastFrameTime = newTime;
        console.log(`FRAMES: ${this.frames}\nREALTIME: ${realTime}s\nFPS: ${Math.round(1 / deltaTime)}\nLEVEL: ${this.level}\nLINES: ${this.lines}\nSCORE: ${this.score}\nPIECES: ${this.totalPieces}\nLASTLINECLEAR: ${this.linesLastCleared}`);
        console.log('='.repeat(20));
        console.log(`SEED: ${this.seed}\nEVALUATION:`);
        console.log(getEvaluationPartials(this.clone()));
        console.log(`\nGAME OVER: ${this.isOver}`);
        console.log('='.repeat(20));
        console.log(this.previewPiece.getPrintableWithWhiteSpace());
        let mat = this.previewPiece.getMatrix();
        if (mat === null) throw new Error();
        if (mat.length == 3) console.log();
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

        console.log(new Board().toString(str));
        console.log('1 2 3 4 5 6 7 8 9 0');
    }
    clone() {
        let gameClone = new Game();
        gameClone.level = this.level;
        gameClone.score = this.score;
        gameClone.lines = this.lines;
        gameClone.frames = this.frames;
        gameClone.startingTime = this.startingTime;
        gameClone.totalPieces = this.totalPieces;
        gameClone.lastFrameTime = this.lastFrameTime;
        gameClone.board = this.board.clone();
        gameClone.activePiece = this.activePiece.clone();
        gameClone.previewPiece = this.previewPiece.clone();
        gameClone.isOver = this.isOver;
        gameClone.internalRng = this.internalRng.clone();
        gameClone.linesLastCleared = this.linesLastCleared;
        return gameClone;
    }
    getNewPiece() {
        this.totalPieces++;
        this.activePiece = this.previewPiece.clone();
        return (this.previewPiece = new Piece(Math.floor(this.internalRng.float() * 7)));
    }
    generatePiece() {
        this.totalPieces++;
        return new Piece(Math.floor(this.internalRng.float() * 7));
    }
	tickHidden(xOffset: number, rotationState: number) {
		
	}
    tick(movementCharacter: string) {
        if (this.isOver) return;
        if (movementCharacter != '.') this.handleMovementCharacter(movementCharacter);
        let gravityFrames = getFramesUntilPieceDrop(this.level)
        if (this.activePiece.frames % gravityFrames === gravityFrames - 1) {
            this.tryPieceDrop();
        }
		if (this.toppedOut()) {
			this.isOver = true;
			return;
		}
        this.activePiece.frames++;
        this.frames++;

        this.removeFilledLines();
    }
	tryPieceDrop() {
		this.activePiece.y++;
		if (this.pieceCollidingWithBoard()) {
			this.activePiece.y--;
			this.board.addPieceToBoard(this.activePiece);
			this.getNewPiece();
		}
	}
    removeFilledLines() {
        let rowsFilled = [];
        for (let y = 0; y < 20; y++) {
            let rowFilled = true;
            for (let x = 0; x < 10; x++) {
                if (!this.board.getMinoXY(x, y)) {
                    rowFilled = false;
                    break;
                }
            }
            if (rowFilled) {
                rowsFilled.push(y);
            }
        }
        // console.log('Got Here!');
        this.lines += rowsFilled.length;
        let matrix = this.board.get2D();
        for (let i = 0; i < rowsFilled.length; i++) {
            matrix.splice(rowsFilled[i], 1);
            matrix.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        }
        this.board.from2D(matrix);
        // this.score += baseScoringValues[rowsFilled.length] * (this.level + 1);
        if (rowsFilled.length > 0) this.linesLastCleared = rowsFilled.length;
    }
    handleMovementCharacter(movementCharacter: string) {
        // L = Left
        // R = Right
        // A = Rotation Clockwise
        // B = Rotation Counter-Clockwise
        // E = L + A
        // F = L + B
        // I = R + A
        // G = R + B
        switch (movementCharacter) {
            case 'L': this.tryXMovement(-1); break;
            case 'R': this.tryXMovement(1); break;
            case 'A': this.tryRotation(1); break;
            case 'B': this.tryRotation(-1); break;
            case 'E': this.tryXMovement(-1); this.tryRotation(1); break;
            case 'F': this.tryXMovement(-1); this.tryRotation(-1); break;
            case 'I': this.tryXMovement(1); this.tryRotation(1); break;
            case 'G': this.tryXMovement(1); this.tryRotation(-1); break;
            case '.': break;
            default: {
                throw new Error(`Unknown Character: ${movementCharacter} `);
            }
        }
    }
    tryXMovement(xDir: number) {
        this.activePiece.x += xDir;
        if (this.pieceCollidingWithBoard())
            this.activePiece.x -= xDir;
    }
    tryRotation(rDir: number) {
        this.activePiece.rotate(rDir);
        if (this.pieceCollidingWithBoard())
            this.activePiece.rotate(-rDir);
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
            throw new Error("Cannot Check Collision Because Piece Matrix is Null");
        }
        // console.log('checking for board collision');
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