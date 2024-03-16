import { Progress } from '../../src/domain/progress/progress';
import { Id } from '../../src/domain/id';

describe('Progress Entity', () => {
    const userId = new Id('user-123');
    const habitId = new Id('habit-123');
    const validDate = new Date();
    const validDetail = 'This is a valid progress detail.';
    const validAmount = 50;

    it('should create a valid Progress instance', () => {
        const progress = new Progress(Id.create(), userId, habitId, validDate, validDetail, validAmount);
        expect(progress).toBeDefined();
        expect(progress.date).toEqual(validDate);
        expect(progress.progressDetail).toEqual(validDetail);
        expect(progress.progressAmount).toEqual(validAmount);
    });

    it('should throw an error for a future date', () => {
        const futureDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000); // One day in the future
        expect(() => new Progress(Id.create(), userId, habitId, futureDate, validDetail, validAmount)).toThrow('The progress recording date must be equal to or earlier than the current date');
    });

    it('should throw an error for invalid progress detail length', () => {
        const invalidDetailShort = 'Short';
        const invalidDetailLong = 'L'.repeat(201); // 201 characters long
        expect(() => new Progress(Id.create(), userId, habitId, validDate, invalidDetailShort, validAmount)).toThrow('Observations must be a minimum of 10 characters and a maximum of 200 characters');
        expect(() => new Progress(Id.create(), userId, habitId, validDate, invalidDetailLong, validAmount)).toThrow('Observations must be a minimum of 10 characters and a maximum of 200 characters');
    });

    it('should throw an error for a negative progress amount', () => {
        const negativeAmount = -10;
        expect(() => new Progress(Id.create(), userId, habitId, validDate, validDetail, negativeAmount)).toThrow('The amount of progress cannot be negative');
    });

    it('should update progress detail and amount correctly', () => {
        const progress = new Progress(Id.create(), userId, habitId, validDate, validDetail, validAmount);
        const updatedDetail = 'Updated progress detail.';
        const updatedAmount = 60;
        progress.updateProgress(updatedDetail, updatedAmount);

        expect(progress.progressDetail).toEqual(updatedDetail);
        expect(progress.progressAmount).toEqual(updatedAmount);
    });
});
