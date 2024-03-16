import { RegisterProgressCommandHandler } from "../../../src/application/progress/register-progress.command-handler";
import { ProgressMemoryRepository } from "./progress.in-memory.repository";
import { ProgressMother } from './progress.mother';
import { RegisterProgressCommand } from "../../../src/application/progress/register-progress.command";
import { HabitMemoryRepository } from "../habit/habit.in-memory.repository";



describe('RegisterProgressCommandHandler', () => {
    const progress = new ProgressMother().build()
    const repository = new ProgressMemoryRepository()
    const habitRepository = new HabitMemoryRepository()
    const command = new RegisterProgressCommand(progress.id,
                                                progress.userId,
                                                progress.habitId,
                                                progress.date,
                                                progress.progressDetail,
                                                progress.progressAmount
                                                )
    const handler = new RegisterProgressCommandHandler(repository)

    it('should register the progress', () => {
        handler.handle(command)
        const progressId = repository.findById(progress.id)
        const idExpected = progress.id.getValue()
        const idRecived = progressId.id.getValue()
        
        expect(idRecived).toEqual(idExpected)
    })

});
