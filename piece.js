/*
0 L
1 J
2 O
3 S
4 Z
5 T
6 I
*/

export class Piece {
	constructor(pieceId = Math.floor(Math.random() * 7)) {
		this.pieceId = pieceId;
		this.rotationState = 0;
		this.y = (this.getName() == 'I' ? -1 : 0);
		this.x = 0;
	}
	getName(pieceId = this.pieceId) {
		return ['L', 'J', 'O', 'S', 'Z', 'T', 'I'][pieceId];
	}
	getRotationStates(id = this.pieceId) {
		switch (id) {
			case 0:
			case 1:
			case 5:
				return 4;
			case 2:
				return 1;
			case 3:
			case 4:
			case 6:
				return 2;
		}
	}
	getColor(id = this.pieceId) {
		switch (id) {
			case 2:
			case 5:
			case 6:
			default:
				return 1;
			case 0:
			case 4:
				return 2;
			case 1:
			case 3:
				return 3;
		}
	}
	getMatrix(id = this.pieceId, rot = this.rotationState) {
		if (id == 0) {
			if (rot == 0) return [
				[0, 0, 0],
				[1, 1, 1],
				[1, 0, 0]
			];
			if (rot == 1) return [
				[1, 1, 0],
				[0, 1, 0],
				[0, 1, 0]
			];
			if (rot == 2) return [
				[0, 0, 1],
				[1, 1, 1],
				[0, 0, 0]
			];
			if (rot == 3) return [
				[0, 1, 0],
				[0, 1, 0],
				[0, 1, 1]
			];
		}
		if (id == 1) {
			if (rot == 0) return [
				[0, 0, 0],
				[1, 1, 1],
				[0, 0, 1]
			];
			if (rot == 1) return [
				[0, 1, 0],
				[0, 1, 0],
				[1, 1, 0]
			];
			if (rot == 2) return [
				[1, 0, 0],
				[1, 1, 1],
				[0, 0, 0]
			];
			if (rot == 3) return [
				[0, 1, 1],
				[0, 1, 0],
				[0, 1, 0]
			];
		}
		if (id == 2) {
			if (rot == 0) return [
				[0, 0, 0, 0],
				[0, 1, 1, 0],
				[0, 1, 1, 0],
				[0, 0, 0, 0]
			];
		}
		if (id == 3) {
			if (rot == 0) return [
				[0, 0, 0],
				[0, 1, 1],
				[1, 1, 0]
			];
			if (rot == 1) return [
				[0, 1, 0],
				[0, 1, 1],
				[0, 0, 1]
			];
		}
		if (id == 4) {
			if (rot == 0) return [
				[0, 0, 0],
				[1, 1, 0],
				[0, 1, 1]
			];
			if (rot == 1) return [
				[0, 0, 1],
				[0, 1, 1],
				[0, 1, 0]
			];
		}
		if (id == 5) {
			if (rot == 0) return [
				[0, 0, 0],
				[1, 1, 1],
				[0, 1, 0]
			];
			if (rot == 1) return [
				[0, 1, 0],
				[1, 1, 0],
				[0, 1, 0]
			];
			if (rot == 2) return [
				[0, 1, 0],
				[1, 1, 1],
				[0, 0, 0]
			];
			if (rot == 3) return [
				[0, 1, 0],
				[0, 1, 1],
				[0, 1, 0]
			];
		}
		if (id == 6) {
			if (rot == 0) return [
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[1, 1, 1, 1],
				[0, 0, 0, 0]
			];
			if (rot == 1) return [
				[0, 0, 1, 0],
				[0, 0, 1, 0],
				[0, 0, 1, 0],
				[0, 0, 1, 0]
			];
		}
	}
	rotate() {
		this.rotationState = (this.rotationState + 1) % this.rotationStates();
		return this.rotationState;
	}
}