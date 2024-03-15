import { HabitRepository } from "src/domain/habit/habit.repository";
import { CreateHabitCommand } from "./create-habit.command";


export class HabitValidationService {
    constructor(private repository: HabitRepository) {}

    validateCreation(command: CreateHabitCommand) {
        const existingHabit = this.repository.findDuplicateForUser(command.userId, command.name);
        if (existingHabit) {
            throw new Error("Habit already exists for this user.");
        }
    }
}
