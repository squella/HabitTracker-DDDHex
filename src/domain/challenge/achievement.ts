import { Id } from "../id";

export class Achievement {
    constructor(
        public readonly challengeId: Id,
        public readonly userId: Id,
        public readonly dateAchieved: Date
    ) {}
}