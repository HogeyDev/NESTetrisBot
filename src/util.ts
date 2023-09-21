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