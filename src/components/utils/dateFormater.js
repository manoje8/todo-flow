export const getWeek = (date) => {
    if(!date) return;
    const day = new Date(date)

    return day.toDateString();
}