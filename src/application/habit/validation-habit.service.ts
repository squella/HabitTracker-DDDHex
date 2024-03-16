import { HabitRepository } from "src/domain/habit/habit.repository";
import { CreateHabitCommand } from "./create-habit.command";
import { Id } from "src/domain/id";


export class HabitValidationService {
    constructor(private repository: HabitRepository) {}

    validateCreation(command: CreateHabitCommand) {
        const existingHabit = this.repository.findDuplicateForUser(command.userId, command.name);
        if (existingHabit) {
            throw new Error("Habit already exists for this user.");
        }
    }

    validateExistence(habitId: Id) {
        const habit = this.repository.findById(habitId);
        if (!habit) {
            throw new Error(`Habit with ID ${habitId} does not exist.`);
        }
    }
}

