import { Injectable } from "@nestjs/common";
import { Habit } from "../../domain/habit/habit";
import { HabitRepository } from "../../domain/habit/habit.repository";
import { CreateHabitCommand } from "./create-habit.command";
import { HabitValidationService } from "./validation-habit.service";


@Injectable()
export class CreateHabitCommandHandler{
    private validationService: HabitValidationService;

    constructor(private readonly repository: HabitRepository){
        this.validationService = new HabitValidationService(repository);
    }

    handle(command: CreateHabitCommand){
        this.validationService.validateCreation(command);

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