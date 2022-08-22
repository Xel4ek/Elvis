import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { FilterAction } from './filter.actions';

export class FilterStateModel {
  public items!: string[];
}

const defaults = {
  items: []
};

@State<FilterStateModel>({
  name: 'filter',
  defaults
})
@Injectable()
export class FilterState {
  @Action(FilterAction)
  add({ getState, setState }: StateContext<FilterStateModel>, { payload }: FilterAction) {
    const state = getState();
    setState({ items: [ ...state.items, payload ] });
  }
}
