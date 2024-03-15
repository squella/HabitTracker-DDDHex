import { Injectable } from "@nestjs/common";
import { Habit } from "../../domain/habit/habit";
import { HabitRepository } from "../../domain/habit/habit.repository";
import { CreateHabitCommand } from "./create-habit.command";
import { HabitValidationService } from "./validation-habit.service";
import { HabitFactory } from "../../domain/habit/habit.factory";



@Injectable()
export class CreateHabitCommandHandler{
    private validationService: HabitValidationService;

    constructor(private readonly repository: HabitRepository){
        this.validationService = new HabitValidationService(repository);
    }

    handle(command: CreateHabitCommand){
        this.validationService.validateCreation(command);

        const habit = HabitFactory.create(command);
        this.repository.save(habit);

    }
}