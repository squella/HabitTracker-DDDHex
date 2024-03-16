import { WearableDeviceId } from "./wearable-device";


export interface WearableDeviceRepository {
    validateDevice(deviceId: WearableDeviceId): boolean;
}
