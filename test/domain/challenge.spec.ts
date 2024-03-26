import { Challenge } from "../../src/domain/challenge/challenge";
import { Id } from "../../src/domain/id";

describe('Challenge', () => {
    let challenge: Challenge;
    const challengeId = Id.create();
    const habitId = Id.create();
    let today, yesterday, tomorrow, newEndDate;

    beforeAll(() => {
        jest.useFakeTimers();
    });

    beforeEach(() => {
        today = new Date();
        yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        newEndDate = new Date(tomorrow);
        newEndDate.setDate(newEndDate.getDate() + 5);

        challenge = new Challenge(
            challengeId,
            habitId,
            habitId,
            'Test Challenge',
            5,
            yesterday,
            tomorrow
        );
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should create a challenge with correct initial values', () => {
        expect(challenge.id).toBe(challengeId);
        expect(challenge.habitId).toBe(habitId);
        expect(challenge.description.description).toBe('Test Challenge');
        expect(challenge.timesToComplete).toBe(5);
        expect(challenge.completedTimes).toBe(0);
        expect(challenge.isWithinDuration()).toBe(true);
    });

    it('should record an attempt correctly', () => {
        challenge.recordAttempt();
        expect(challenge.completedTimes).toBe(1);
    });

    it('should throw error when recording an attempt outside the challenge duration', () => {
        const farFutureDate = new Date();
        farFutureDate.setDate(farFutureDate.getDate() + 100);
        jest.setSystemTime(farFutureDate);
        expect(() => challenge.recordAttempt()).toThrow('Cannot record attempt outside the challenge duration');
    });

    it('should check challenge completion correctly', () => {
        for (let i = 0; i < 5; i++) {
            challenge.recordAttempt();
        }
        expect(challenge.isCompleted()).toBe(true);
    });

    it('should extend the end date correctly', () => {
        challenge.extendEndDate(newEndDate);
        expect(challenge.duration.endDate).toEqual(newEndDate);
    });

    it('should throw error when extending the end date to a date before the current end date', () => {
        expect(() => challenge.extendEndDate(yesterday)).toThrow('New end date must be after the current end date');
    });
});
