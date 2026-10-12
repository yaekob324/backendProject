export function isChronolical(date1: Date, date2: Date): boolean {
    if (date1 > date2) {
        return false;
    }
    return true;
}
    