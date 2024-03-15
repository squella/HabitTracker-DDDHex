import { Injectable } from "@nestjs/common";
import { Habit } from "../../domain/habit/habit";
import { HabitRepository } from "../../domain/habit/habit.repository";
import { CreateHabitCommand } from "./create-habit.command";


@Injectable()
export class CreateHabitCommandHandler{

    constructor(private readonly repository: HabitRepository){}

    handle(command: CreateHabitCommand){
        const existingHabit = this.repository.findDuplicateForUser(command.userId, command.name);
        if (existingHabit) {
            throw new Error("Habit already exists for this user.");
        }
        const habit = new Habit(
            command.id,
            command.name,
            command.description,
            command.frequency,
            command.estimatedTimeInSeconds,
            command.restTimeAfterPracticingHabit,
            command.userId,
            command.creationdate,
            command.dateForLastUpdate
            )
        this.repository.save(habit)
    }
}