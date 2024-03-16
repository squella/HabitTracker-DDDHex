

export class ReminderTime {
    private _value: Date;

    constructor(value: Date) {
        if (value < new Date()) {
            throw new Error("Reminder time must be in the future");
        }
        this._value = value;
    }

    get value(): Date {
        return this._value;
    }
}
