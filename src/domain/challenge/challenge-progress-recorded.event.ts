import { Id } from "../id";

export class ChallengeProgressRecordedEvent {
    constructor(
        public readonly challengeId: Id,
        public readonly userId: Id,
        public readonly attemptDate: Date
    ) {}
}
