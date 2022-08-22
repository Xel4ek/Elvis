import { DevicePayload} from "./device.interface";

export class AddDevicesAction {
  static readonly type = '[Devices] Add item';
  constructor(public payload: DevicePayload) { }
}

export class GetDevicesAction {
  static readonly type = '[Devices] Get item';
}
