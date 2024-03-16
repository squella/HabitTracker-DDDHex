import { Injectable } from "@nestjs/common";
import { HabitRepository } from "../../domain/habit/habit.repository";
import { CreateHabitCommand } from "./create-habit.command";
import { HabitValidationService } from "./validation-habit.service";
import { HabitFactory } from "../../domain/habit/habit.factory";
import { WearableDeviceRepository } from "src/domain/wearable/wearable.repository";



@Injectable()
export class CreateHabitCommandHandler {
    private validationService: HabitValidationService;

    constructor(
        private readonly repository: HabitRepository,
        private readonly wearableDeviceRepository?: WearableDeviceRepository
    ){
        this.validationService = new HabitValidationService(repository);
    }

    handle(command: CreateHabitCommand){
        this.validationService.validateCreation(command);

        if (command.deviceId && !this.wearableDeviceRepository.validateDevice(command.deviceId)) {
            throw new Error('Invalid wearable device ID.');
        }

        const habit = HabitFactory.create(command);
        this.repository.save(habit);
    }
}
