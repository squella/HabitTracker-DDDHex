import { Injectable } from "@nestjs/common";
import { Habit } from "src/domain/habit/habit";
import { HabitRepository } from "src/domain/habit/habit.repository";
import { CreateHabitCommand } from "./create-habit.command";


@Injectable()
export class CreateHabitCommandHandler{

    constructor(private readonly repository: HabitRepository){}

    handler(command: CreateHabitCommand){
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