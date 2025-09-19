export class dateFormat {
    public static normalizeDate(date: string) {
        if (!date) {
            const now = new Date(Date.now());
            return now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate();
        }
        const [day, month, year] = date.split("/").map(Number);
        if (!day || !month || !year) {
            const now = new Date(Date.now());
            return now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate();
        }

        return `${year}-${month}-${day};`;
    }
}
