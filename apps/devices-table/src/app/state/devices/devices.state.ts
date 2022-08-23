import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {AddDevicesAction, ChangeDevicesAction, GetDevicesAction} from './devices.actions';
import {ApiService} from "../../services/api/api.service";
import {map, tap} from "rxjs";
import {ResponseInterface} from "./response.interface";
import {DeviceInterface} from "./device.interface";
import {patch} from "@ngxs/store/operators";
import {FilterState, FilterStateModel} from "../filter/filter.state";
import {OrderState, OrderStateModel} from "../order/order.state";

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
  @Selector([FilterState, OrderState])
  static devices({items}: DevicesStateModel, {pattern}: FilterStateModel, {direction}: OrderStateModel) {
    return items.filter(el => el.title.search(pattern) !== -1).sort((a, b) => {
      if (direction === 'ASC') {
        return a.id - b.id;
      }
      if (direction === 'DESC') {
        return  b.id - a.id
      }
      return 0;
    });
  }

  @Selector()
  static loading({loading}: DevicesStateModel) {
    return loading;
  }

  constructor(private readonly apiService: ApiService) {
  }

  @Action(AddDevicesAction)
  add({setState}: StateContext<DevicesStateModel>, {payload}: AddDevicesAction) {
    return this.apiService.post<ResponseInterface>(payload).pipe(tap(data => {
      setState(patch({items: data.data}));
    }));
  }

  @Action(GetDevicesAction)
  get({setState}: StateContext<DevicesStateModel>) {
    return this.apiService.get<ResponseInterface>().pipe(map(data => {
      setState({items: data.data, loading: false})
    }))
  }

  @Action(ChangeDevicesAction)
  change({setState}: StateContext<DevicesStateModel>, {payload}: ChangeDevicesAction) {
    return this.apiService.put<ResponseInterface>(payload).pipe(tap(data => {
      setState(patch<DevicesStateModel>({items: data.data}))
    }))
  }
}
