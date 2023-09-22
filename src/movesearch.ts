import { Board } from './board';
import { evaluationFunction } from './evaluation';
import { Game } from './game';
import { Piece } from './piece';
import { FRAME_TIMELINES } from './util';

export function getBestMove(game: Game) {
    let possibleMoves = generatePossibleMoves(game);
    let bestMove = ['', Infinity];
    for (let i = 0; i < possibleMoves.length; i++) {
        // lower is better
        let gameCopy = testMoveSequence(game.clone(), possibleMoves[i]);
        let evaluatedScore = evaluationFunction(gameCopy.clone());
        if (evaluatedScore < (bestMove[1] as number)) {
            bestMove[0] = possibleMoves[i];
            bestMove[1] = evaluatedScore;
        }
    }
    return bestMove;
}

export function getAllMovesWithEvaluation(game: Game) {
    let possibleMoves = generatePossibleMoves(game);
    let moveList = [];
    for (let i = 0; i < possibleMoves.length; i++) {
        let gameCopy = testMoveSequence(game.clone(), possibleMoves[i]);
        let evaluatedScore = evaluationFunction(gameCopy.clone());
        moveList.push([possibleMoves[i], evaluatedScore]);
    }
    return moveList;
}

export function testMoveSequence(game: Game, inputTimeline: string) {
    let gameCopy = game.clone();
    let pieceCount = gameCopy.totalPieces;
    for (let i = 0; i < inputTimeline.length; i++) {
        gameCopy.tick(inputTimeline[i]);
    }
    while (pieceCount == gameCopy.totalPieces) {
        gameCopy.tick('.');
    }
    return gameCopy;
}

export function generatePossibleMoves(game: Game) {
    let board: Board = game.board.clone();
    let piece: Piece = game.activePiece.clone();
    let possibleMoves = [];
    for (let rotationState = -1; rotationState <= 2; rotationState++) {
        for (let xOffset = -5; xOffset <= 4; xOffset++) {
            if (isLegalPlacement(piece, board, xOffset, rotationState)) {
                possibleMoves.push(generateInputTimeline(FRAME_TIMELINES["12HZ"], xOffset, rotationState));
            }
        }
    }
    return possibleMoves;
}

export function generateInputTimeline(frameTimeline: string, xOffset: number, rotationState: number) {
    // L = Left
    // R = Right
    // A = Rotation Clockwise
    // B = Rotation Counter-Clockwise
    // E = L + A
    // F = L + B
    // I = R + A
    // G = R + B
    let outputString = '';
    let realFrameTimeline = frameTimeline;

    let rotationDirection = Math.sign(rotationState);
    let movementDirection = Math.sign(xOffset);

    let rotationsRemaining = Math.abs(rotationState);
    let movementsRemaining = Math.abs(xOffset);

    let inputsRemaining = () => {
        return (movementsRemaining + rotationsRemaining);
    }
    let getInput = () => {
        let character = '';
        if (movementsRemaining && rotationsRemaining) {
            // E = L + A
            // F = L + B
            // I = R + A
            // G = R + B
            if (movementDirection == -1) {
                if (rotationDirection == 1) {
                    character = 'E';
                } else if (rotationDirection == -1) {
                    character = 'F';
                }
            } else if (movementDirection == 1) {
                if (rotationDirection == 1) {
                    character = 'I';
                } else if (rotationDirection == -1) {
                    character = 'G';
                }
            }
        } else if (movementsRemaining) {
            // L = Left
            // R = Right
            if (movementDirection == -1) {
                character = 'L';
            } else if (movementDirection == 1) {
                character = 'R';
            }
        } else if (rotationsRemaining) {
            // A = Rotation Clockwise
            // B = Rotation Counter-Clockwise
            if (rotationDirection == -1) {
                character = 'B';
            } else if (rotationDirection == 1) {
                character = 'A';
            }
        }
        if (character == '') throw new Error("No Move Found");
        if (rotationsRemaining > 0) rotationsRemaining--;
        if (movementsRemaining > 0) movementsRemaining--;
        return character;
    }

    let i = 0;
    while (inputsRemaining() > 0) {
        if (i == realFrameTimeline.length) realFrameTimeline += frameTimeline;
        if (realFrameTimeline[i] == 'X' && inputsRemaining()) {
            outputString += getInput();
        } else {
            outputString += '.';
        }

        i++;
    }
    return outputString;
}

export function getStateAfterMovement(game: Game, inputTimeline: string) {

}

export function isLegalPlacement(piece: Piece, board: Board, xOffset: number, rotationState: number) {
    let game: Game = new Game();
    game.activePiece = piece;
    game.board = board;
    return !game.pieceCollidingWithBoard();
}