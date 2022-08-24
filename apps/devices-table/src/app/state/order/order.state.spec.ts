import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { OrderState } from './order.state';
import { ToggleOrder } from './order.actions';

describe('Order actions', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([OrderState])],
    }).compileComponents();
    store = TestBed.inject(Store);
  });

  it('should create an action ToggleOrder', () => {
    expect(store.selectSnapshot((state) => state.order.direction)).toBe('ASC');
    store.dispatch(new ToggleOrder());
    expect(store.selectSnapshot((state) => state.order.direction)).toBe('DESC');
    store.dispatch(new ToggleOrder());
    expect(store.selectSnapshot((state) => state.order.direction)).toBe('ASC');
  });
  it('should selector work', () => {
    expect(OrderState.direction({ direction: 'ASC' })).toBe('ASC');
  });
});
