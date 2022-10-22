import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import advancedFormat from 'dayjs/plugin/advancedFormat.js';
dayjs.extend(advancedFormat);
dayjs.extend(utc);

function formatDateTime(utcTime: number, timezoneOffset: number): string { 
    return dayjs.utc(dayjs.unix(utcTime)).utcOffset(timezoneOffset / 60).format('dddd, MMMM Do, YYYY h:mm A');
}

export default formatDateTime;