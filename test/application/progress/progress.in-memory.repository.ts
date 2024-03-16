import { Id } from "../../../src/domain/id";
import { Progress } from "../../../src/domain/progress/progress";
import { ProgressRepository } from "../../../src/domain/progress/progress.repository";


export class ProgressMemoryRepository implements ProgressRepository {
    private progresses: Progress[] = [];

    save(progress: Progress): void {
        this.progresses.push(progress);
    }

    findById(id: Id): Progress | undefined {
        return this.progresses.find(p => p.id === id);
    }

    findByUserId(userId: Id): Progress[] {
        return this.progresses.filter(p => p.userId === userId);
    }

    findByHabitId(habitId: Id): Progress[] {
        return this.progresses.filter(p => p.habitId === habitId);
    }

    update(progress: Progress): void {
        const index = this.progresses.findIndex(p => p.id === progress.id);
        if (index !== -1) {
            this.progresses[index] = progress;
        } else {
            throw new Error('Progress not found for update.');
        }
    }

    delete(id: Id): void {
        const index = this.progresses.findIndex(p => p.id === id);
        if (index !== -1) {
            this.progresses.splice(index, 1);
        } else {
            throw new Error('Progress not found for deletion.');
        }
    }
}
