import { Id } from "src/domain/id"

export class CreateHabitCommand {
    readonly id: Id
    readonly name: string
    readonly description: string
    readonly frequency: string
    readonly estimatedTimeInSeconds: string
    readonly restTimeAfterPracticingHabit: string
    readonly userId: string
    readonly creationdate: string
    readonly dateForLastUpdate: string
}