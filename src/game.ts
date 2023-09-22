import { LFSR } from './rng';
import { Piece } from './piece';
import { Board } from './board';
import { getFramesUntilPieceDrop } from './util';
import { evaluationFunction } from './evaluation';

export let pieceRng = new LFSR(0);

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
	constructor(level = 18) {
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
	}
	getPrintable() {
		console.log(`Board State: ${this.board.boardState}`);
		let pieceMatrix: Array<Array<number>> | null = this.activePiece.getMatrix();
		if (pieceMatrix === null) {
			throw new Error("Cannot Get a Printable Board Because Piece Matrix is Null");
		}
		let str: string = '';
		// preview piece
		console.log(this.previewPiece.getPrintableWithWhiteSpace());
		let mat = this.previewPiece.getMatrix();
		if (mat === null) throw new Error();
		if (mat.length == 3) console.log();
		console.log('='.repeat(20));
		let newTime = new Date().getTime()
		let realTime = (newTime - this.startingTime) / 1000;
		let deltaTime = (newTime - this.lastFrameTime) / 1000;
		this.lastFrameTime = newTime;
		console.log(`FRAMES: ${this.frames}\nREALTIME: ${realTime}s\nFPS: ${Math.round(1 / deltaTime)}\nLEVEL: ${this.level}\nLINES: ${this.lines}\nSCORE: ${this.score}`);
		console.log('='.repeat(20));
		console.log(`EVALUATION: ${evaluationFunction(this.board.clone())}`);
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
		return gameClone;
	}
	getNewPiece() {
		this.totalPieces++;
		this.activePiece = this.previewPiece.clone();
		return (this.previewPiece = new Piece(Math.floor(pieceRng.float() * 7)));
	}
	generatePiece() {
		this.totalPieces++;
		return new Piece(Math.floor(pieceRng.float() * 7));
	}
	tick(movementCharacter: string) {
		this.handleMovementCharacter(movementCharacter);
		let gravityFrames = getFramesUntilPieceDrop(this.level)
		if (this.activePiece.frames % gravityFrames === gravityFrames - 1) {
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
		this.activePiece.frames++;
		this.frames++;
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
				throw new Error(`Unknown Character: ${movementCharacter}`);
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