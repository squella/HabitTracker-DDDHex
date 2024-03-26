import { AchievementRepository } from "../../../src/domain/challenge/achievement.repository";
import { ChallengeRepository } from "../../../src/domain/challenge/challenge.repository";
import { RecordChallengeProgressCommand } from "./record-challenge.command";
import { Achievement } from "../../../src/domain/challenge/achievement";

export class RecordChallengeProgressCommandHandler {
    constructor(
        private challengeRepository: ChallengeRepository,
        private achievementRepository: AchievementRepository
    ) {}

    handle(command: RecordChallengeProgressCommand): void {
        const challenge = this.challengeRepository.findById(command.challengeId);
        if (!challenge) {
            throw new Error("Challenge does not exist.");
        }

        challenge.recordAttempt();
        this.challengeRepository.save(challenge); // Aseguramos de persistir cualquier cambio

        if (challenge.isCompleted()) {
            const achievement = new Achievement(
                challenge.id,
                command.userId,
                new Date() // La fecha actual como la fecha del logro
            );
            this.achievementRepository.save(achievement);
        }
    }
}