import { Piece } from "./piece";
import { replaceAt } from "./util";

export class Board {
    boardState: string;
    constructor(boardState = "0".repeat(200)) {
        this.boardState = boardState;
    }
    setMinoXY(value: number | string, x: number, y: number) {
        return replaceAt(this.boardState, y * 10 + x, value.toString());
    }
    getMinoXY(x: number, y: number) {
        return parseInt(this.boardState[y * 10 + x]);
    }
    getMino(offset: number) {
        return parseInt(this.boardState[offset]);
    }
    get2D() {
        let ret: Array<Array<number>> = [];
        for (let y = 0; y < 20; y++) {
            let tmp: Array<number> = [];
            for (let x = 0; x < 10; x++) {
                tmp.push(this.getMinoXY(x, y));
            }
            ret.push([...tmp]);
        }
        return ret;
    }
    toString(boardState: string = this.boardState) {
        let str = "";
        for (let i = 0; i < boardState.length; i++) {
            if (i > 0 && i % 10 == 0) str += "\n";
            str += parseInt(boardState[i]) ? "[]" : "  ";
        }

        return str;
    }
    addPieceToBoard(piece: Piece) {
        let pieceMatrix: Array<Array<number>> | null = piece.getMatrix();
        if (pieceMatrix === null) {
            throw new Error("Piece Matrix is Null");
        }
        for (let y = 0; y < pieceMatrix.length; y++) {
            for (let x = 0; x < pieceMatrix[0].length; x++) {
                if (pieceMatrix[y][x])
                    this.boardState = this.setMinoXY(pieceMatrix[y][x], piece.x + x, piece.y + y);
            }
        }
    }
}
