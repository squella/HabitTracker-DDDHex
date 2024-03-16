export class ChallengeDescription {
    private value: string;

    constructor(value: string) {
        if (!value || value.length > 30) {
            throw new Error("Description must be present and no more than 30 characters");
        }
        this.value = value;
    }

    get description() {
        return this.value;
    }
}