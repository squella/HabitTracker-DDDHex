
export class Habit{
    private constructor(
        readonly id: string,
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