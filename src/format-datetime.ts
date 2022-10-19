function amOrPM(date: Date): string { return date.getHours() < 12 ? 'AM' : 'PM' };

function timeZeroPad(time: number): string {
    return time < 10 ? `0${time}` : time.toString();
}

function fullMonthName(month: number): string {
    switch (month) {
        case 0: return 'January';
        case 1: return 'February';
        case 2: return 'March';
        case 3: return 'April';
        case 4: return 'May';
        case 5: return 'June';
        case 6: return 'July';
        case 7: return 'August';
        case 8: return 'September';
        case 9: return 'October';
        case 10: return 'November';
        case 11: return 'December';
        default: return 'Unknown';
    }
}

function ndSuffix(num: number): string {
    if (num > 3 && num < 21) return 'th';
    switch (num % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

function formatDateTime(date: Date): string {
    return `${fullMonthName(date.getMonth())} ${date.getDate()}${ndSuffix(date.getDate())}, ${date.getFullYear()} ${timeZeroPad(date.getHours())}:${timeZeroPad(date.getMinutes())} ${amOrPM(date)}`;
}

export default formatDateTime;