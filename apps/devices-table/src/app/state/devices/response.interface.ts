import {DeviceInterface} from "./device.interface";

export interface ResponseInterface {
  status: 'OK' | 'ERROR',
  data: DeviceInterface[];
  message?: string;
}
