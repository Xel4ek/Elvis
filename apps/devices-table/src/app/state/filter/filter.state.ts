import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import {UpdateFilter} from './filter.actions';

export class FilterStateModel {
  public pattern!: string;
}

const defaults = {
  pattern: ''
};

@State<FilterStateModel>({
  name: 'filter',
  defaults
})
@Injectable()
export class FilterState {
  @Action(UpdateFilter)
  update({ setState }: StateContext<FilterStateModel>, { payload }: UpdateFilter) {
    setState({ pattern: payload });
  }
}
