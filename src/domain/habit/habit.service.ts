import { CreateHabitCommand } from "src/application/habit/create-habit.command";
import { Id } from "../id";
import { UserRepository } from "../user/user.repository";
import { HabitFactory } from "./habit.factory";
import { HabitRepository } from "./habit.repository";
import { GetHabitsQuery } from "src/application/habit/get-habits.query";

export class HabitService {
    constructor(
        private userRepository: UserRepository,
        private habitRepository: HabitRepository,
    ){}

    addHabitToUser(userId: Id, habitData: CreateHabitCommand): void {
        const user = this.userRepository.findById(userId)
        if (!user) {
            throw new Error("User not found");
        }

        const duplicate = this.habitRepository.findDuplicateForUser(userId, habitData.name);
        if (duplicate) {
            throw new Error("Duplicate habit");
        }
        const habit = HabitFactory.create(habitData)
        this.habitRepository.save(habit)

    }

    getHabitsByUser(query: GetHabitsQuery) {
        const user = this.userRepository.findById(query.userId);
        if (!user) {
            throw new Error("User not found");
        }

        const habits = this.habitRepository.findHabitsByUserId(query.userId);
        return habits;
    }

    exists(habitId: Id): void {
        const habit = this.habitRepository.findById(habitId);
        if (!habit) {
            throw new Error("Habit does not exist. Consider creating the habit first.");
        }
    }
}