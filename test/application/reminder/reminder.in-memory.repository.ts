import { Id } from "../../../src/domain/id";
import { Reminder } from "../../../src/domain/reminder/reminder";
import { ReminderRepository } from "../../../src/domain/reminder/reminder.repository";


export class ReminderInMemoryRepository implements ReminderRepository {
    private reminders: Reminder[] = [];

    save(reminder: Reminder): void {
        const index = this.reminders.findIndex(r => r.id.getValue() === reminder.id.getValue());
        if (index !== -1) {
            this.reminders[index] = reminder;
        } else {
            this.reminders.push(reminder);
        }
    }

    findById(id: Id): Reminder | null {
        return this.reminders.find(r => r.id.getValue() === id.getValue()) || null;
    }

    findByHabitId(habitId: Id): Reminder[] {
        return this.reminders.filter(r => r.habitId.getValue() === habitId.getValue());
    }

    public getAllReminders(): Reminder[] {
        return this.reminders;
    }

    public clear(): void {
        this.reminders = [];
    }

}