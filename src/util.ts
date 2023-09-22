export const FRAME_TIMELINES = {
    '30HZ': 'X.',
    '20HZ': 'X..',
    '15HZ': 'X...',
    '12HZ': 'X....',
    '10HZ': 'X.....',
	'5HZ': 'X...........',
	'2HZ': 'X.............................',
	'1HZ': 'X...........................................................',
}

export function getFramesUntilPieceDrop(level: number) {
    let frames: number = 0;
    if (level == 18) frames = 3;
    if (level >= 19 && level <= 28) frames = 2;
    if (level >= 29) frames = 1;
    return frames + 1;
}

export function replaceAt(str: string, index: number, replacement: string) {
    return str.substring(0, index) + replacement + str.substring(index + replacement.length);
}