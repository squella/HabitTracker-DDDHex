import { Id } from "src/domain/id";
import { Habit } from "../../../src/domain/habit/habit";
import { HabitRepository } from "../../../src/domain/habit/habit.repository";


export class HabitMemoryRepository implements HabitRepository{
    private habits: Habit[] = []
    
    save(habit: Habit): void {
        this.habits.push(habit)
    }

    findByName(name: string): Habit {
        return this.habits.find((habit: Habit): boolean => habit.name === name)
    }

    isHabitSaved(habit: Habit): boolean {
        return this.habits.some((h: Habit): boolean => h.id === habit.id)
    }

    findDuplicateForUser(userId: Id, name: string): Habit | undefined {
        return this.habits.find(habit => habit.userId === userId && habit.name === name);
    }
    
    findHabitsByUserId(userId: Id): Habit[] {
        return this.habits.filter(habit => habit.userId.getValue() === userId.getValue());
    }
    
}