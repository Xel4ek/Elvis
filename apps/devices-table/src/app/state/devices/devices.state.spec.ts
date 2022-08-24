import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { DevicesState } from './devices.state';
import { ApiService } from '../../services/api/api.service';
import {
  AddDevicesAction,
  ChangeDevicesAction,
  GetDevicesAction,
} from './devices.actions';
import { of } from 'rxjs';

const mockDevices = [
  {
    id: 1,
    title: 'test1',
    type: 'testType',
    resolutions: [
      {
        width: 12,
        height: 43,
      },
    ],
  },
];
const mockApiService = {
  get: jest.fn().mockImplementation(() => of({ data: mockDevices })),
  post: jest.fn().mockImplementation(() => of({ data: mockDevices })),
  put: jest.fn().mockImplementation(() => of({ data: mockDevices })),
};
describe('Devices actions', () => {
  let store: Store;
  let apiService: ApiService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([DevicesState])],
      providers: [{ provide: ApiService, useValue: mockApiService }],
    }).compileComponents();
    store = TestBed.inject(Store);
    apiService = TestBed.inject(ApiService);
  });

  it('should create store', () => {
    expect(store.selectSnapshot((state) => state.devices)).toEqual({
      items: [],
      loading: true,
    });
  });
  it('should load devices', () => {
    store.dispatch(new GetDevicesAction());
    expect(apiService.get).toHaveBeenCalled();
    expect(store.selectSnapshot((state) => state.devices.items)).toEqual(
      mockDevices
    );
    expect(store.selectSnapshot((state) => state.devices.loading)).toBe(false);
  });
  it('should change devices', () => {
    const updated = { ...mockDevices[0], id: 12 };
    store.dispatch(new ChangeDevicesAction(updated));
    expect(apiService.put).toBeCalledWith(updated);
    expect(store.selectSnapshot((state) => state.devices.items)).toEqual(
      mockDevices
    );
  });

  it('should add devices', () => {
    store.dispatch(new AddDevicesAction(mockDevices[0]));
    expect(apiService.post).toBeCalledWith(mockDevices[0]);
    expect(store.selectSnapshot((state) => state.devices.items)).toEqual(
      mockDevices
    );
  });

  it('should selectors work', () => {
    const devices = {
      loading: false,
      items: [
        {
          id: 1,
          title: 'test1',
          type: '',
          resolutions: [],
        },
        {
          id: 2,
          title: 'testa2',
          type: '',
          resolutions: [],
        },
        {
          id: 3,
          title: 'testb3',
          type: '',
          resolutions: [],
        },
        {
          id: 4,
          title: 'testa4',
          type: '',
          resolutions: [],
        },
      ],
    };
    expect(DevicesState.loading(devices)).toBe(false);
    const filter = {
      pattern: '',
    };
    expect(
      DevicesState.devices(devices, filter, {
        direction: 'ASC',
      })
    ).toEqual(devices.items);
    expect(
      DevicesState.devices(devices, filter, {
        direction: 'DESC',
      })
    ).toEqual([...devices.items].reverse());
    filter.pattern = 'a';
    const filtered = [
      {
        id: 2,
        title: 'testa2',
        type: '',
        resolutions: [],
      },
      {
        id: 4,
        title: 'testa4',
        type: '',
        resolutions: [],
      },
    ];
    expect(
      DevicesState.devices(devices, filter, {
        direction: 'DESC',
      })
    ).toEqual([...filtered].reverse());

    expect(
      DevicesState.devices(devices, filter, {
        direction: 'ASC',
      })
    ).toEqual(filtered);
  });
});
