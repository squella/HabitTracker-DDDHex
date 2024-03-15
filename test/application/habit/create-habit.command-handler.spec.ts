import { CreateHabitCommandHandler } from "../../../src/application/habit/create-habit.command-handle";
import { CreateHabitCommand } from "../../../src/application/habit/create-habit.command";
import { HabitMemoryRepository } from "./habit.in-memory.repository";
import { HabitMother } from "./habit.mother";
import { HabitFactory } from "../../../src/domain/habit/habit.factory";
import { Id } from "../../../src/domain/id";
import { Frequency } from "../../../src/domain/frequency";


describe('CreateHabitCommandHandler', () => {
    let repository;
    let handler;
    let habitData;
    let command;

    beforeEach(() => {
        repository = new HabitMemoryRepository();
        handler = new CreateHabitCommandHandler(repository);
        habitData = new HabitMother().build();
        command = new CreateHabitCommand(
            habitData.id, 
            habitData.name, 
            habitData.description, 
            habitData.frequency, 
            habitData.estimatedTimeInSeconds, 
            habitData.restTimeAfterPracticingHabit, 
            habitData.userId, 
            habitData.creationdate, 
            habitData.dateForLastUpdate
        );
    });
    it('should create the habit if all required information is provided and valid', () => {
        
        handler.handle(command);

        const savedHabit = repository.findByName(habitData.name);
        expect(savedHabit).toBeDefined();
        expect(savedHabit.userId).toBe(habitData.userId);
    });

    it('users should be able to view the new habit in their list', () => {

        handler.handle(command);

        const savedHabits = repository.findHabitsByUserId(habitData.userId);
        const isHabitSaved = savedHabits.some(habit =>
            habit.name === habitData.name && habit.userId.getValue() === habitData.userId.getValue());

        expect(isHabitSaved).toBeTruthy();
    });

    it('should not allow adding a duplicate habit for the same user', () => {
        handler.handle(command);

        // Intenta añadir el mismo hábito por segunda vez y verifica que se lance una excepción
        expect(() => {
            handler.handle(command);
        }).toThrow("Habit already exists for this user.");
    
        // Verifica que solo haya una instancia del hábito en el repositorio para ese usuario,
        // es decir, que la excepción haya prevenido la adición del duplicado
        const habitsForUser = repository.findHabitsByUserId(habitData.userId);
        const duplicateHabits = habitsForUser.filter(habit => habit.name === habitData.name);
    
        expect(duplicateHabits.length).toBe(1);
    });
    
});

describe('HabitFactory', () => {
    it('should correctly create a Habit instance from HabitData', () => {
        const habitData = {
            id: Id.create(),
            name: "Test Habit",
            description: "Test Description",
            frequency: new Frequency(1, 'day'),
            estimatedTimeInSeconds: "600",
            restTimeAfterPracticingHabit: "300",
            userId: Id.create(),
            creationdate: "creationdate",
            dateForLastUpdate: "dateForLastUpdate"
        };

        const habit = HabitFactory.create(habitData);

        expect(habit.userId.getValue()).toBe(habitData.userId.getValue());
        expect(habit.name).toBe(habitData.name);
        expect(habit.description).toBe(habitData.description);
        expect(habit.frequency).toBe(habitData.frequency);
        expect(habit.estimatedTimeInSeconds).toBe(habitData.estimatedTimeInSeconds);
        expect(habit.restTimeAfterPracticingHabit).toBe(habitData.restTimeAfterPracticingHabit);

        expect(habit.id).toBeDefined();
        expect(habit.creationdate).toBeDefined();
        expect(habit.dateForLastUpdate).toBeDefined();
    });
});

