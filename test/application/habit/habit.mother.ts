import { Frequency } from "../../../src/domain/frequency"
import { Habit } from "../../../src/domain/habit/habit"
import { Id } from "../../../src/domain/id"


export class HabitMother{
    private id: Id = Id.create()
    private name: string = 'name'
    private description: string = 'description'
    private frequency: Frequency = new Frequency(1, 'day')
    private estimatedTimeInSeconds: string = 'estimatedTimeInSeconds'
    private restTimeAfterPracticingHabit: string = 'restTimeAfterPracticingHabit'
    private userId: Id = Id.create()
    private creationdate: string = 'creationdate'
    private dateForLastUpdate: string = 'dateForLastUpdate'

    withId(id: Id){
        this.id = id
        return this
    }

    withName(name: string){
        this.name = name
        return this
    }

    withDescription(description: string){
        this.description = description
        return this
    }

    withFrequency(frequency: Frequency){
        this.frequency = frequency
        return this
    }
    withEstimatedTimeInSeconds(estimatedTimeInSeconds: string){
        this.estimatedTimeInSeconds = estimatedTimeInSeconds
        return this
    }
    withRestTimeAfterPracticingHabit(restTimeAfterPracticingHabit: string){
        this.restTimeAfterPracticingHabit = restTimeAfterPracticingHabit
        return this
    }

    withUserId(userId: Id){
        this.userId = userId
        return this
    }

    withCreationdate(creationdate: string){
        this.creationdate = creationdate
        return this
    }

    withDateForLastUpdate(dateForLastUpdate: string){
        this.dateForLastUpdate = dateForLastUpdate
        return this
    }

    build(): Habit{
        return new Habit(
                this.id, 
                this.name,
                this.description,
                this.frequency,
                this.estimatedTimeInSeconds,
                this.restTimeAfterPracticingHabit,
                this.userId,
                this.creationdate,
                this.dateForLastUpdate
                )
    }

}