import { Id } from "src/domain/id";

export class RecordChallengeProgressCommand {
    constructor(
        public readonly challengeId: Id,
        public readonly userId: Id,
        public readonly progressTimes: number
    ) {}
}
