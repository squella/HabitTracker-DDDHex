import { Id } from "src/domain/id";

export class CreateChallengeCommand {
    constructor(
        public readonly userId: Id,
        public readonly habitId: Id,
        public readonly description: string,
        public readonly timesToComplete: number,
        public readonly startDate: Date,
        public readonly endDate: Date
    ) {}
}
