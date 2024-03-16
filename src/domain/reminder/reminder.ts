import { Id } from "../id";
import { ReminderMessage } from "./reminder-message";
import { ReminderTime } from "./reminder-time";


export class Reminder {
    constructor(
        public readonly id: Id,
        public readonly habitId: Id,
        public readonly message: ReminderMessage,
        public state: "active" | "inactive",
        public readonly time: ReminderTime
    ) {}

    activate() {
        this.state = "active";
    }

    deactivate() {
        this.state = "inactive";
    }
}