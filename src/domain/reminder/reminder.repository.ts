import { Id } from "../id";
import { Reminder } from "./reminder";

export interface ReminderRepository {
    save(reminder: Reminder): void;
    findById(id: Id): Reminder | null;
    findByHabitId(habitId: Id): Reminder[];
}
