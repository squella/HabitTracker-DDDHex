import { Id } from "../id";
import { Habit } from "./habit";
import { HabitData } from "./habit-data.dto";

export class HabitFactory {
    public static create(habitData: HabitData): Habit {
        const id = Id.create();
        const currentDate = new Date().toISOString();
        const userId = Id.fromExisting(habitData.userId)

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