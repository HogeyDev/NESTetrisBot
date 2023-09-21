export function getFramesUntilPieceDrop(level: number) {
    if (level == 18) return 3;
    if (level >= 19 && level <= 28) return 2;
    if (level >= 29) return 1;
    return 1;
}

export function replaceAt(str: string, index: number, replacement: string) {
    return str.substring(0, index) + replacement + str.substring(index + replacement.length);
}