export const formatTime = (time: Date) => {
    const date = new Date(time);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const getOrdinalSuffix = (day: number): string => {
        if (day > 3 && day < 21) return "th";
        switch (day % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    };
    const formattedDay = `${day}${getOrdinalSuffix(day)}`;
    const monthName = monthNames[month];

    return `${formattedDay} ${monthName} ${year}`;
}