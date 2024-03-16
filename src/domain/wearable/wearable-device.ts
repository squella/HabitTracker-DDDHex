
export class WearableDeviceId {
    readonly value: string;

    constructor(value: string) {
        if (!value) throw new Error("WearableDeviceId cannot be empty");
        this.value = value;
    }
}
