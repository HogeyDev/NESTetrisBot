import { Game } from './game';
import { Piece } from './piece';

export const FRAME_TIMELINES = {
    '30HZ': 'X.',
    '20HZ': 'X..',
    '15HZ': 'X...',
    '12HZ': 'X....',
    '10HZ': 'X.....',
    '5HZ': 'X...........',
    '2HZ': 'X.............................',
    '1HZ': 'X...........................................................',
};

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

export function maximumFourTap(level: number = 18) {
    let maxHeightFound: boolean = false;
    let maxHeight: number = 0;
    while (!maxHeightFound) {
        let testGame = new Game();
        testGame.activePiece = new Piece(6 /* "I" */);
        for (let i = 0; i < maxHeight; i++) {
            testGame.board.setMinoXY('1', 8, 20 - i);
        }
        console.log('TESTGAME: ');
        console.log(testGame.getPrintable());
    }
    return maxHeight;
}

export function getScareHeight(level: number) {
    if (level >= 16 && level <= 18) return 12;
    return 0;
}