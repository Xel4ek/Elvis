import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { OrderAction } from './order.actions';

export class OrderStateModel {
  public items!: string[];
}

const defaults = {
  items: []
};

@State<OrderStateModel>({
  name: 'order',
  defaults
})
@Injectable()
export class OrderState {
  @Action(OrderAction)
  add({ getState, setState }: StateContext<OrderStateModel>, { payload }: OrderAction) {
    const state = getState();
    setState({ items: [ ...state.items, payload ] });
  }
}
