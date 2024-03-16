
export class ReminderMessage {
    private value: string;

    constructor(value: string) {
        if (!value || value.length > 100) {
            throw new Error("Message must be present and no more than 100 characters");
        }
        this.value = value;
    }

    get message() {
        return this.value;
    }
}
