import { Id } from '../id';

export class Progress {
    constructor(
        readonly id: Id,
        readonly userId: Id,
        readonly habitId: Id,
        private _date: Date,
        private _progressDetail?: string,
        private _progressAmount?: number
    ) {
        this.setDate(_date);
        this.setProgressDetail(_progressDetail);
        this.setProgressAmount(_progressAmount);
    }

    get date(): Date {
        return this._date;
    }

    get progressDetail(): string | undefined {
        return this._progressDetail;
    }

    get progressAmount(): number | undefined {
        return this._progressAmount;
    }

    private setDate(value: Date): void {
        if (value > new Date()) {
            throw new Error('The progress recording date must be equal to or earlier than the current date');
        }
        this._date = value;
    }

    private setProgressDetail(value?: string): void {
        if (value && (value.length < 10 || value.length > 200)) {
            throw new Error('Observations must be a minimum of 10 characters and a maximum of 200 characters');
        }
        this._progressDetail = value;
    }

    private setProgressAmount(value?: number): void {
        if (value !== undefined && value < 0) {
            throw new Error('The amount of progress cannot be negative');
        }
        this._progressAmount = value;
    }

    updateProgress(detail?: string, amount?: number): void {
        if (detail !== undefined) {
            this.setProgressDetail(detail);
        }
        if (amount !== undefined) {
            this.setProgressAmount(amount);
        }
    }
}
