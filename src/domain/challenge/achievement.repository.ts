import { Achievement } from "./achievement";

export interface AchievementRepository {
    save(achievement: Achievement): void;
}
