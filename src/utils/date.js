export function formatDate(date) {
    if (!date) return "—";

    // Normalize Firebase Timestamp / ISO string / Date
    const parsedDate =
        typeof date.toDate === "function"
            ? date.toDate()
            : date instanceof Date
                ? date
                : new Date(date);

    if (isNaN(parsedDate.getTime())) return "—";

    return (
        parsedDate.toLocaleDateString("en-US", {
            weekday: "long",
            day: "2-digit",
            month: "short",
            year: "numeric",
        }) +
        " • " +
        parsedDate.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })
    );
}
