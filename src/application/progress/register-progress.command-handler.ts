import { ProgressRepository } from "src/domain/progress/progress.repository";
import { RegisterProgressCommand } from "./register-progress.command";
import { Injectable } from "@nestjs/common";
import { Progress } from "../../domain/progress/progress";


@Injectable()
export class RegisterProgressCommandHandler {
    constructor(
        private progressRepository: ProgressRepository,

    ) {}

    handle(command: RegisterProgressCommand): void {

        if (!command.habitId) {
            throw new Error("Habit does not exist. Consider creating the habit first.");
        }

        const progress = new Progress(
                                command.id, 
                                command.userId,
                                command.habitId,
                                command.date,
                                command.progressDetail,
                                command.progressAmount
                                )
        this.progressRepository.save(progress);
    }

}

