import { Achievement } from "../../../src/domain/challenge/achievement";
import { AchievementRepository } from "../../../src/domain/challenge/achievement.repository";

export class InMemoryAchievementRepository implements AchievementRepository {
    private achievements: Achievement[] = [];

    save(achievement: Achievement): void {
        this.achievements.push(achievement);
    }
}