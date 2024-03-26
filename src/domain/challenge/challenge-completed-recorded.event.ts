import { Id } from "../id";

export class ChallengeCompletedEvent {
    constructor(
        public readonly challengeId: Id,
        public readonly userId: Id,
        public readonly completionDate: Date
    ) {}
}