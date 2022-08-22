import {Injectable, Logger} from '@nestjs/common';

interface Resolution {
  width: number,
  height: number
}
interface Device {
  id: number;
  title: string;
  type: string;
  resolution: Resolution[];
  updateTime: number;
  customOrder: number;
  removed: boolean;
}

interface Response {
  status: 'OK' | 'ERROR',
  data: Device[];
  message?: string;
}
@Injectable()
export class AppService {
  private dataHolder: Device[] = [];
  private id: number;
  constructor() {
    this.id = this.dataHolder.length;
  }
  getData(): Response {
    return {data: this.dataHolder, status: 'OK'};
  }

  updateDevice(device): Response {
    const entry = this.dataHolder.find(({id}) => id === device.id);
    if (entry) {
      this.dataHolder[device.id] = {...device, updateTime: Date.now()};
    }
    return {status: 'OK', message: JSON.stringify(device), data: this.dataHolder}
  }

  saveData(device): Response {
    ++this.id;
    this.dataHolder.push({...device, removed: false, id: this.id, updateTime: Date.now() });
    return {status: 'OK', message: JSON.stringify(device), data: this.dataHolder}
  }

  removeData(idToRemove: number): Response {
    Logger.log('input id', idToRemove);
    const entry = this.dataHolder.find(({id}) => id === idToRemove);
    if (entry) {
      entry.removed = true;
    }
    return {status: 'OK', message: idToRemove.toString(), data: this.dataHolder}
  }
}
