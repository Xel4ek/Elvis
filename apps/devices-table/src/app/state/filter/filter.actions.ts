export class FilterAction {
  static readonly type = '[Filter] Add item';
  constructor(public payload: string) { }
}
