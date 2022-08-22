import { Injectable } from '@angular/core';
import {State, Action, StateContext, Selector} from '@ngxs/store';
import {AddDevicesAction, GetDevicesAction} from './devices.actions';
import {ApiService} from "../../services/api/api.service";
import {catchError, map, of, tap} from "rxjs";
import {ResponseInterface} from "./response.interface";
import {DeviceInterface} from "./device.interface";
import {patch} from "@ngxs/store/operators";

export class DevicesStateModel {
  public items!: DeviceInterface[];
  public loading!: boolean;
  public error?: string;
}

const defaults = {
  items: [],
  loading: true
};

@State<DevicesStateModel>({
  name: 'devices',
  defaults
})
@Injectable()
export class DevicesState {
  @Selector()
  static devices({items} : DevicesStateModel) {
    return items;
  }
  @Selector()
  static loading({loading}: DevicesStateModel) {
    return loading;
  }
  constructor(private readonly apiService :ApiService) {
  }
  @Action(AddDevicesAction)
  add({ getState, setState }: StateContext<DevicesStateModel>, { payload }: AddDevicesAction) {
    const state = getState();

    return this.apiService.post<ResponseInterface>(payload).pipe(tap(data => {
        setState(patch({ items: data.data }));
    }));
  }
  @Action(GetDevicesAction)
  get({setState}: StateContext<DevicesStateModel>) {
    return this.apiService.get<ResponseInterface>().pipe(map(data => {
      console.log(data);
      setState({items: data.data, loading: false})
    }), catchError((err) => {
      setState(patch({error: err.message}));
      return of([])
    }))
  }
}
