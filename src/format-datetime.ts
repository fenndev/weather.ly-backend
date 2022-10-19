function amOrPM(hour: number): string { return hour >= 12 ? 'PM' : 'AM' };

function timeZeroPad(time: number): string {
    return time < 10 ? `0${time}` : time.toString();
}

function toTwentyFourHour(hour: number): string {
    let parsedHour: number;
    if(hour > 12) parsedHour = hour - 12;
    else parsedHour = hour;
    return timeZeroPad(parsedHour);
}

function fullMonthName(month: number): string {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[month];
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

function formatDateTime(utcTime: number, timezoneOffset: number): string {
    const date = new Date(((utcTime * 1000) + timezoneOffset));
    const hours = toTwentyFourHour(date.getUTCHours() + timezoneOffset / 3600);
    const minutes = timeZeroPad(date.getUTCMinutes());
    const amPM = amOrPM(date.getUTCHours());
    const day = date.getUTCDate() + Math.floor(timezoneOffset / 86400);
    const suffix = ndSuffix(day);
    const month = fullMonthName(date.getUTCMonth() + Math.floor(timezoneOffset / 2592000));
    const year = date.getUTCFullYear() + Math.floor(timezoneOffset / 31536000);
    return `${month} ${day}${suffix}, ${year} ${hours}:${minutes} ${amPM}`;
}


export default formatDateTime;