import { evaluationFunction } from './evaluation';
import { Game } from './game';
import { tapTimeline } from './params';

export function getBestMove(game: Game, depth: number = 2) {
    // let possibleMoves = generatePossibleMoves(game);
    // // console.log('Generated Possible Moves');
    // let bestMove = ['', Infinity];
    // for (let i = 0; i < possibleMoves.length; i++) {
    //     // lower is better
    //     let gameCopy = testMoveSequence(game.clone(), possibleMoves[i]);
    //     // console.log('Tested Move');

    //     if (depth > 1) {
    //         let nextBestMove = getBestMove(gameCopy, depth - 1);
    //         // console.log(`Got Next Best Move: ${nextBestMove}`);
    //         gameCopy = testMoveSequence(gameCopy, nextBestMove[0] as string);
    //         // console.log('Tested Move Sequence');
    //     }
    //     let evaluatedScore = evaluationFunction(gameCopy.clone());
    //     // console.log('Evaluated Board State');
    //     if (evaluatedScore < (bestMove[1] as number)) {
    //         bestMove[0] = possibleMoves[i];
    //         bestMove[1] = evaluatedScore;
    //     }
    //     // console.log('Updated Best Move');
    // }
    // if (possibleMoves.length == 0) throw new Error("No Possible Moves Somehow");
    // console.log('\nBEST MOVE:\n');
    // console.log(bestMove);

    let moves = getSortedMoveList(game.clone());
    let bestMove = ['', Infinity];
    for (let i = 0; i < moves.length; i++) {
        let gameCopy = testMoveSequence(game.clone(), moves[i][0] as string);
        if (depth > 1) {
            let bestMoves = getBestMove(gameCopy, depth - 1);
            gameCopy = testMoveSequence(gameCopy, bestMoves[0] as string);
        }
        let evaluatedScore = evaluationFunction(gameCopy.clone());
        if (evaluatedScore < (bestMove[1] as number)) {
            bestMove[0] = moves[i][0];
            bestMove[1] = evaluatedScore;
        }
    }
    return bestMove;
}

export function getSortedMoveList(game: Game) {
    let movesWithEval = getAllMovesWithEvaluation(game.clone());
    return movesWithEval.sort((a: any, b: any) => {
        if (a[1] > b[1]) return -1;
        return 1;
    });
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
    // console.log('Got Here!');
    let gameCopy = game.clone();
    let pieceCount = gameCopy.totalPieces;
    // console.log('Initialized Variables (testMoveSequence)');
    for (let i = 0; i < inputTimeline.length; i++) {
        gameCopy.tick(inputTimeline[i]);
    }
    // console.log('Moved Piece (testMoveSequece)');
    while (pieceCount == gameCopy.totalPieces) {
        gameCopy.tick('.');
        if (gameCopy.isOver) break;
    }
    // console.log('Finished Piece Lifetime (testMoveSequence)');
    return gameCopy;
}

export function generatePossibleMoves(game: Game) {
    let possibleMoves = [];
    for (let rotationState = -1; rotationState <= 2; rotationState++) {
        for (let xOffset = -5; xOffset <= 4; xOffset++) {
            if (isLegalPlacement(game.clone(), xOffset, rotationState)) {
                possibleMoves.push(generateInputTimeline(tapTimeline, xOffset, rotationState));
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

export function isLegalPlacement(game: Game, xOffset: number, rotationState: number) {
    return true;
    let gameCopy = game.clone();
    return !gameCopy.pieceCollidingWithBoard();
}