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