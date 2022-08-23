import {ResolutionInterface} from "./resolution.interface";

export interface DevicePayload {
  title: string;
  type: string;
  resolutions: ResolutionInterface[];
}
export interface DeviceInterface extends DevicePayload{
  id: number;
  updateTime: number;
}
