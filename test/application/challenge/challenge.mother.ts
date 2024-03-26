import { Challenge } from "../../../src/domain/challenge/challenge";
import { Id } from "../../../src/domain/id";
import { ChallengeState } from "../../../src/domain/challenge/challenge-state";

export class ChallengeMother {
    static createDefault({
        challengeId = Id.fromExisting('challenge1'),
        habitId = Id.fromExisting('habit1'),
        userId = Id.fromExisting('user1'),
        description = 'Run 5K',
        timesToComplete = 1,
        startDate = new Date(),
        endDate = new Date(new Date().getTime() + 86400000), // Fecha de fin, mañana
        state = ChallengeState.Pending
    } = {}) {
        return new Challenge(
            challengeId,
            habitId,
            userId,
            description,
            timesToComplete,
            startDate,
            endDate,
            state
        );
    }
}
