import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
dayjs.extend(utc);

function formatDateTime(utcTime: number, timezoneOffset: number): Date { 
    return dayjs.utc(dayjs.unix(utcTime)).utcOffset(timezoneOffset / 60).toDate();
}

export default formatDateTime;