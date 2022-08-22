import {ResolutionInterface} from "./resolution.interface";

export interface DevicePayload {
  title: string;
  type: string;
  resolution: ResolutionInterface[];
  customOrder: number;
}
export interface DeviceInterface extends DevicePayload{
  id: number;
  updateTime: number;
}
