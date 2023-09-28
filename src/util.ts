import { Game } from './game';
import { generateInputTimeline } from './timeline';
import { tapTimeline } from './params';
import { Piece } from './piece';

export function getFramesUntilPieceDrop(level: number) {
    let frames: number = 0;
    if (level == 18) frames = 3;
    if (level >= 19 && level <= 28) frames = 2;
    if (level >= 29) frames = 1;
    return frames;
}

export function replaceAt(str: string, index: number, replacement: string) {
    return str.substring(0, index) + replacement + str.substring(index + replacement.length);
}

export const baseScoringValues = [
    40,
    100,
    300,
    1200,
];

export function getMaximumNTap(numberOfTaps: number = 4, level: number = 18) {
    let maxHeightFound: boolean = false;
    let maxHeight: number = 0;
    let inputSequence = generateInputTimeline(tapTimeline, 4, 1);
    while (!maxHeightFound && maxHeight < 20) {
        let testGame = new Game();
        testGame.activePiece = new Piece(6 /* "I" */);
        for (let i = 0; i < maxHeight; i++) {
            testGame.board.setMinoXY(1, 8, 19 - i);
        }
        // console.log(testGame.board.boardState);

        let pieceCount: number = testGame.totalPieces;
        let i = 0;
        while (pieceCount == testGame.totalPieces) {
            testGame.tick(inputSequence[i] || '.');
            i++;
        }
        if (!testGame.board.getMinoXY(9, 19)) {
            maxHeightFound = true;
            break;
        }
        maxHeight++;
    }
    return Math.max(0, maxHeight - 1);
}

export function getScareHeight(level: number) {
    if (level >= 16 && level <= 18) return 12;
    return 0;
}