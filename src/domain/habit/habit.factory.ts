import { CreateHabitCommand } from "src/application/habit/create-habit.command";
import { Id } from "../id";
import { Habit } from "./habit";

export class HabitFactory {
    public static create(habitData: CreateHabitCommand): Habit {
        const id = Id.create();
        const currentDate = new Date().toISOString();
        const userId = habitData.userId

        return new Habit(
            id,
            habitData.name,
            habitData.description,
            habitData.frequency,
            habitData.estimatedTimeInSeconds,
            habitData.restTimeAfterPracticingHabit,
            userId,
            currentDate, 
            currentDate  
        );
    }
}