import { Board } from './board';
import { Game } from './game';
import { Piece } from './piece';
import { FRAME_TIMELINES } from './util';


export function generatePossibleMoves(game: Game) {
    let board: Board = game.board.clone();
    let piece: Piece = game.activePiece.clone();
    for (let rotationState = 0; rotationState < 4; rotationState++) {
        for (let xOffset = -5; xOffset <= 4; xOffset++) {
            if (isLegalPlacement(piece, board, xOffset, rotationState)) {

            }
        }
    }
}

// export function generateInputTimeline(frameTimeline: string, xOffset: number, rotationState: number) {
//     return 'X.';
// }

export function getStateAfterMovement() {

}

export function isLegalPlacement(piece: Piece, board: Board, xOffset: number, rotationState: number) {
    let game: Game = new Game();
    game.activePiece = piece;
    game.board = board;
    return !game.pieceCollidingWithBoard();
}