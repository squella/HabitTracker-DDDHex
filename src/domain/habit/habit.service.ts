import { Id } from "../id";
import { UserRepository } from "../user/user.repository";
import { HabitData } from "./habit-data.dto";
import { HabitFactory } from "./habit.factory";
import { HabitRepository } from "./habit.repository";

export class HabitService {
    constructor(
        private userRepository: UserRepository,
        private habitRepository: HabitRepository
    ){}

    addHabitToUser(userId: Id, habitData: HabitData): void {
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
}