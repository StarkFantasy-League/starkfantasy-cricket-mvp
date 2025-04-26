function formatDate(dateString: string | Date) {
    // Create a new Date object from the input string
    const date = new Date(dateString);

    // Array of day names
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    // Array of month names
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    // Create the formatted object
    const formattedDate = {
        day: days[date.getDay()],
        dayNumber: date.getDate(),
        month: months[date.getMonth()],
        year: date.getFullYear(),
    };

    return formattedDate;
}
export { formatDate };
