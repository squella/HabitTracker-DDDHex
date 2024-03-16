import { Frequency } from "src/domain/frequency";
import { Id } from "src/domain/id"
import { WearableDeviceId } from "src/domain/wearable/wearable-device";

export class CreateHabitCommand {
    constructor(
        readonly id: Id,
        readonly name: string,
        readonly description: string,
        readonly frequency: Frequency,
        readonly estimatedTimeInSeconds: string,
        readonly restTimeAfterPracticingHabit: string,
        readonly userId: Id,
        readonly creationdate: string,
        readonly dateForLastUpdate: string,
        readonly deviceId?: WearableDeviceId

    ){}
}