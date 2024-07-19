import moment from "moment";


export function changesDateFormat(date: string) {
    const dateToFormat = date;
    const formattedDate = moment(dateToFormat).format('MMMM Do YYYY');
    return formattedDate || "";
}