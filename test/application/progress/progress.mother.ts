import { Id } from "../../../src/domain/id"
import { Progress } from "../../../src/domain/progress/progress"



export class ProgressMother{
    private id: Id = Id.create()
    private userId: Id = Id.create()
    private habitId: Id = Id.create()
    private date: Date = new Date()
    private progressDetail?: string = "_progressDetail?"
    private progressAmount?: number = 10

    withId(id: Id){
        this.id = id
        return this
    }

    withUserId(userId: Id){
        this.userId = userId
        return this
    }
    withHabitId(habitId: Id){
        this.habitId = habitId
        return this
    }
    withDate(date: Date){
        this.date = date
        return this
    }
    withProgressDetail(progressDetail: string){
        this.progressDetail = progressDetail
        return this
    }
    withProgressAmount(progressAmount: number){
        this.progressAmount = progressAmount
        return this
    }

    build(): Progress{
        return new Progress(
                this.id, 
                this.userId,
                this.habitId,
                this.date,
                this.progressDetail,
                this.progressAmount
                )
    }

}