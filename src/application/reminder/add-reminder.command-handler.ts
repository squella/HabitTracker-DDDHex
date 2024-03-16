import { HabitRepository } from "../../domain/habit/habit.repository";
import { ReminderRepository } from "../../domain/reminder/reminder.repository";
import { AddReminderCommand } from "./add-reminder.command";
import { Id } from "../../domain/id";
import { ReminderMessage } from "../../domain/reminder/reminder-message";
import { ReminderTime } from "../../domain/reminder/reminder-time";
import { Reminder } from "../../domain/reminder/reminder";

export class AddReminderCommandHandler {
    constructor(
        private readonly reminderRepository: ReminderRepository,
        private readonly habitRepository: HabitRepository
    ) {}

    handle(command: AddReminderCommand): void {
        this.validateHabitExists(command.habitId);
        this.validateReminderLimitNotReached(command.habitId);
        this.validateNoDuplicateReminder(command);

        const reminder = new Reminder(
            Id.create(),
            command.habitId,
            new ReminderMessage(command.message),
            command.state,
            new ReminderTime(command.time)
        );

        this.reminderRepository.save(reminder);
    }

    private validateHabitExists(habitId: Id): void {
        const habit = this.habitRepository.findById(habitId);
        if (!habit) {
            throw new Error("Habit does not exist");
        }
    }

    private validateReminderLimitNotReached(habitId: Id): void {
        const reminders = this.reminderRepository.findByHabitId(habitId);
        if (reminders.length >= 3) {
            throw new Error("Maximum number of reminders reached for this habit");
        }
    }

    private validateNoDuplicateReminder(command: AddReminderCommand): void {
        const reminders = this.reminderRepository.findByHabitId(command.habitId);
        const duplicate = reminders.some(reminder =>
            reminder.time.value.getTime() === command.time.getTime());
        if (duplicate) {
            throw new Error("A reminder for this time already exists for the habit");
        }
    }
    
}