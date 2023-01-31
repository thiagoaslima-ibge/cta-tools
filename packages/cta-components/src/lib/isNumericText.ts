export function isNumericText(value: string): boolean {
    return String(Number.parseInt(value, 10)) === value;
}
