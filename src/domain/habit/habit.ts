import { Frequency } from '../frequency';
import { Id } from '../id';

export class Habit{
    constructor(
        readonly id: Id,
        readonly name: string,
        readonly description: string,
        readonly frequency: Frequency,
        readonly estimatedTimeInSeconds: string,
        readonly restTimeAfterPracticingHabit: string,
        readonly userId: Id,
        readonly creationdate: string,
        readonly dateForLastUpdate: string
    ){}
}