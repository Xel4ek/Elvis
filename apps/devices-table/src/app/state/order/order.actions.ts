export class OrderAction {
  static readonly type = '[Order] Add item';
  constructor(public payload: string) { }
}
