import { Id } from "../../../src/domain/id";
import { AddReminderCommandHandler } from "../../../src/application/reminder/add-reminder.command-handler";
import { HabitMemoryRepository } from "../habit/habit.in-memory.repository";
import { ReminderInMemoryRepository } from "./reminder.in-memory.repository";
import { AddReminderCommand } from "../../../src/application/reminder/add-reminder.command";
import { HabitMother } from "../habit/habit.mother";

describe('AddReminderCommandHandler Tests', () => {
    let reminderRepository: ReminderInMemoryRepository;
    let habitRepository: HabitMemoryRepository;
    let handler: AddReminderCommandHandler;

    beforeEach(() => {
        reminderRepository = new ReminderInMemoryRepository();
        habitRepository = new HabitMemoryRepository();
        handler = new AddReminderCommandHandler(reminderRepository, habitRepository);

        // Usando HabitMother para preparar un hábito existente
        const existingHabit = new HabitMother().build();
        habitRepository.save(existingHabit);
    });

    afterEach(() => {
        reminderRepository.clear();
        habitRepository.clear();
    });

    it('should add a reminder successfully when all validations pass', () => {
        // Suponiendo que getAllHabits() devuelve una lista de hábitos correctamente
        const existingHabitId = habitRepository.getAllHabits()[0].id;
        const command = new AddReminderCommand(
            existingHabitId,
            'Drink Water Reminder',
            'active',
            new Date(Date.now() + 1000 * 60 * 60) // Una hora en el futuro
        );
    
        expect(() => handler.handle(command)).not.toThrow();
        // Suponiendo que getAllReminders() devuelve una lista de recordatorios correctamente
        const allReminders = reminderRepository.getAllReminders();
        expect(allReminders.length).toBe(1);
        // Accede a la propiedad message directamente, sin usar ()
        expect(allReminders[0].message.message).toBe('Drink Water Reminder');
    });
    

    it('should throw an error if the habit does not exist', () => {
        const command = new AddReminderCommand(
            Id.create(), // Usando el método correcto para generar un nuevo Id
            'Go Running',
            'active',
            new Date(Date.now() + 1000 * 60 * 60)
        );

        expect(() => handler.handle(command)).toThrow('Habit does not exist');
    });

});
