import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { FilterState } from './filter.state';
import { UpdateFilter } from './filter.actions';

describe('Filter actions', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([FilterState])],
    }).compileComponents();
    store = TestBed.inject(Store);
  });

  it('should create an action Update Filter', async () => {
    expect(store.selectSnapshot((state) => state.filter.pattern)).toBe('');
    store.dispatch(new UpdateFilter('hello'));
    expect(store.selectSnapshot((state) => state.filter.pattern)).toBe('hello');
    store.dispatch(new UpdateFilter(''));
    expect(store.selectSnapshot((state) => state.filter.pattern)).toBe('');
  });
});
