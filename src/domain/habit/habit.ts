import { Frequency } from '../frequency';
import { Id } from '../id';
import { WearableDeviceId } from '../wearable/wearable-device';

export class Habit{
    readonly wearableDeviceId?: WearableDeviceId;

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
        wearableDeviceId?: string,
    ){
        if (wearableDeviceId) this.wearableDeviceId = new WearableDeviceId(wearableDeviceId);

    }
}