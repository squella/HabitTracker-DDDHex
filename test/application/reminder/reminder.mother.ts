import { Id } from "../../../src/domain/id";
import { Reminder } from "../../../src/domain/reminder/reminder";
import { ReminderMessage } from "../../../src/domain/reminder/reminder-message";
import { ReminderTime } from "../../../src/domain/reminder/reminder-time";


export class ReminderMother {
    static create(
        id: Id = Id.create(),
        habitId: Id = Id.create(),
        message: string = "Test Reminder",
        state: "active" | "inactive" = "active",
        time: Date = new Date(new Date().getTime() + 1000 * 60 * 60)
    ): Reminder {
        return new Reminder(
            id,
            habitId,
            new ReminderMessage(message),
            state,
            new ReminderTime(time)
        );
    }
}
