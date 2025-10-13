export default class PhoneFormatter {
    static getOnlyNumbers(phone: string) {
        return phone.replace(/\D/g, "");
    }

    static format(phone: string) {
        const onlyNumbers = this.getOnlyNumbers(phone);
        const formatted = onlyNumbers.replace(/^(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3");

        return formatted;
    }
}
