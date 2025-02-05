import moment from 'moment';

export const convertDateToTimezone = (date, timezone) => {
    if (date && timezone) {
        const newDate = new Date(date);
        newDate && newDate.setHours(newDate.getHours() + Number(timezone.replace('UTC', '')));
        const formattedDate = moment(newDate).format('YYYY-MM-DDTHH:mm:ss');
        console.log(newDate, formattedDate);
        return formattedDate;
    } else {
        return ''
    }
}

export const getTimezoneOffset = (date) => {
  const offset = date.getTimezoneOffset() / 60;
  const sign = offset < 0 ? '+' : '-';
   const d = `UTC${sign}${Math.abs(offset).toString()}`;
   console.log(d);
   return d
}