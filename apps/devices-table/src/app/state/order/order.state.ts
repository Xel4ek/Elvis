import { Injectable } from '@angular/core';
import {State, Action, StateContext, Selector} from '@ngxs/store';
import {ToggleOrder} from './order.actions';

export class OrderStateModel {
  public direction!: 'ASC' | 'DESC';
}

const defaults: {direction: 'ASC' | 'DESC'} = {
  direction: 'ASC'
};

@State<OrderStateModel>({
  name: 'order',
  defaults
})
@Injectable()
export class OrderState {
  @Selector()
  static direction({direction}: OrderStateModel) {
    return direction;
  }

  @Action(ToggleOrder)
  change({ getState, setState }: StateContext<OrderStateModel>) {
    const direction = getState().direction;
    if (direction === 'ASC')
      setState({ direction: "DESC" });
    if (direction === 'DESC')
      setState({direction: "ASC"});
  }
}
