import { Id } from "src/domain/id";

export class AddReminderCommand {
    constructor(
        public readonly habitId: Id,
        public readonly message: string,
        public readonly state: "active" | "inactive",
        public readonly time: Date
    ) {}
}