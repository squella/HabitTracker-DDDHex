export class ChallengeDuration {
    readonly startDate: Date;
    readonly endDate: Date;

    constructor(startDate: Date, endDate: Date) {
        if (startDate >= endDate) {
            throw new Error("Start date must be before end date");
        }
        this.startDate = startDate;
        this.endDate = endDate;
    }
}