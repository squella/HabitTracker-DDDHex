import { Injectable } from "@nestjs/common";
import { ChallengeRepository } from "src/domain/challenge/challenge.repository";
import { HabitValidationService } from "../habit/validation-habit.service";
import { CreateChallengeCommand } from "./create-challenge.commad";
import { Id } from "src/domain/id";
import { Challenge } from "src/domain/challenge/challenge";


@Injectable()
export class CreateChallengeCommandHandler {
    constructor(
        private readonly challengeRepository: ChallengeRepository,
        private readonly habitValidationService: HabitValidationService
    ) {}

    handle(command: CreateChallengeCommand): void {
        this.habitValidationService.validateExistence(command.habitId);

        const challenge = new Challenge(
            Id.create(),
            command.habitId,
            command.description,
            command.timesToComplete,
            command.startDate,
            command.endDate
        );

        if (!challenge.isWithinDuration()) {
            throw new Error("Challenge dates are not valid");
        }

        this.challengeRepository.save(challenge);
    }
}
