import { Progress } from './progress';
import { Id } from '../id';

export interface ProgressRepository {
    save(progress: Progress):void
    findById(id: Id): Progress | undefined
    findByUserId(userId: Id): Progress[]
    findByHabitId(habitId: Id): Progress[]
    update(progress: Progress): void
    delete(id: Id): void
}
