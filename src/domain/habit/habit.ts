import { Id } from '../id';

export class Habit{
    constructor(
        readonly id: Id,
        readonly name: string,
        readonly description: string,
        readonly frequency: string,
        readonly EstimatedTimeInSeconds: string,
        readonly RestTimeAfterPracticingHabit: string,
        readonly userId: string,
        readonly creationdate: string,
        readonly dateForLastUpdate: string
    ){}
}