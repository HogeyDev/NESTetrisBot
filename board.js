export class Board {
	constructor(boardState = '0'.repeat(200)) {
		this.boardState = boardState;
	}
	getMinoXY(x, y) {
		return parseInt(this.boardState[y * 10 + x]);
	}
	getMino(offset) {
		return parseInt(this.boardState[offset]);
	}
	get2D() {
		let ret = [];
		for (let y = 0; y < 20; y++) {
			let tmp = [];
			for (let x = 0; x < 10; x++) {
				tmp.push(getMinoXY(x, y));
			}
			ret.push([...tmp]);
		}
		return ret;
	}
	toString() {
		let matrix = this.get2D();
		let str = '';
		for (let i = 0; i < this.boardState.length; i++) {
			if ((i > 0) && (i % 10 == 0))
				str += '\n';
			str += (this.getMino(i) ? '[]' : '  ');
		}

		return str;
	}
}