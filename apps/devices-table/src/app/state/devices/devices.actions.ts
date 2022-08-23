import { DevicePayload} from "./device.interface";

export class AddDevicesAction {
  static readonly type = '[Devices] Add item';
  constructor(public payload: DevicePayload) { }
}

export class ChangeDevicesAction {
  static readonly type = '[Devices] Change item'
  constructor(public payload: DevicePayload & { id: number }) {
  }
}

export class GetDevicesAction {
  static readonly type = '[Devices] Get item';
}
