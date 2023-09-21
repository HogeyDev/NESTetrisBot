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
    pieceId: number;
    rotationState: number;
    y: number;
    x: number;
    frames: number;
    constructor(pieceId = Math.floor(Math.random() * 7)) {
        this.pieceId = pieceId;
        this.rotationState = 0;
        this.y = this.getName() == "I" ? -2 : -1;
        this.x = 3;
        this.frames = 0;
    }
    getPrintableWithWhiteSpace() {
        let pieceMatrix = this.getMatrix();
        if (pieceMatrix === null) {
            throw new Error("piece matrix again");
        }
        let str = '';
        for (let y = 0; y < pieceMatrix.length; y++) {
            for (let x = 0; x < pieceMatrix[0].length; x++) {
                str += (pieceMatrix[y][x] ? '[]' : '  ');
            }
            if (y < pieceMatrix.length - 1) str += '\n';
        }
        return str;
    }
    clone() {
        let ret = new Piece();
        ret.pieceId = this.pieceId;
        ret.rotationState = this.rotationState;
        ret.y = this.y;
        ret.x = this.x;
        return ret;
    }
    getName(pieceId = this.pieceId) {
        return ["L", "J", "O", "S", "Z", "T", "I"][pieceId];
    }
    getRotationStates(id: number = this.pieceId) {
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
            default:
                return 0;
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
            if (rot == 0)
                return [
                    [0, 0, 0],
                    [1, 1, 1],
                    [1, 0, 0],
                ];
            if (rot == 1)
                return [
                    [1, 1, 0],
                    [0, 1, 0],
                    [0, 1, 0],
                ];
            if (rot == 2)
                return [
                    [0, 0, 1],
                    [1, 1, 1],
                    [0, 0, 0],
                ];
            if (rot == 3)
                return [
                    [0, 1, 0],
                    [0, 1, 0],
                    [0, 1, 1],
                ];
        }
        if (id == 1) {
            if (rot == 0)
                return [
                    [0, 0, 0],
                    [1, 1, 1],
                    [0, 0, 1],
                ];
            if (rot == 1)
                return [
                    [0, 1, 0],
                    [0, 1, 0],
                    [1, 1, 0],
                ];
            if (rot == 2)
                return [
                    [1, 0, 0],
                    [1, 1, 1],
                    [0, 0, 0],
                ];
            if (rot == 3)
                return [
                    [0, 1, 1],
                    [0, 1, 0],
                    [0, 1, 0],
                ];
        }
        if (id == 2) {
            if (rot == 0)
                return [
                    [0, 0, 0, 0],
                    [0, 1, 1, 0],
                    [0, 1, 1, 0],
                    [0, 0, 0, 0],
                ];
        }
        if (id == 3) {
            if (rot == 0)
                return [
                    [0, 0, 0],
                    [0, 1, 1],
                    [1, 1, 0],
                ];
            if (rot == 1)
                return [
                    [0, 1, 0],
                    [0, 1, 1],
                    [0, 0, 1],
                ];
        }
        if (id == 4) {
            if (rot == 0)
                return [
                    [0, 0, 0],
                    [1, 1, 0],
                    [0, 1, 1],
                ];
            if (rot == 1)
                return [
                    [0, 0, 1],
                    [0, 1, 1],
                    [0, 1, 0],
                ];
        }
        if (id == 5) {
            if (rot == 0)
                return [
                    [0, 0, 0],
                    [1, 1, 1],
                    [0, 1, 0],
                ];
            if (rot == 1)
                return [
                    [0, 1, 0],
                    [1, 1, 0],
                    [0, 1, 0],
                ];
            if (rot == 2)
                return [
                    [0, 1, 0],
                    [1, 1, 1],
                    [0, 0, 0],
                ];
            if (rot == 3)
                return [
                    [0, 1, 0],
                    [0, 1, 1],
                    [0, 1, 0],
                ];
        }
        if (id == 6) {
            if (rot == 0)
                return [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [1, 1, 1, 1],
                    [0, 0, 0, 0],
                ];
            if (rot == 1)
                return [
                    [0, 0, 1, 0],
                    [0, 0, 1, 0],
                    [0, 0, 1, 0],
                    [0, 0, 1, 0],
                ];
        }
        return null;
    }
    rotate() {
        this.rotationState = (this.rotationState + 1) % this.getRotationStates();
        return this.rotationState;
    }
}
