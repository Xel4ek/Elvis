import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get devices', (done) => {
    const devices = [
      {
        id: 1,
        title: 'test',
      },
    ];
    service.get().subscribe((dev) => {
      expect(dev).toEqual(devices);
      done();
    });

    const req = httpMock.expectOne(`${environment.apiUrl + '/devices'}`);
    expect(req.request.method).toBe('GET');
    req.flush(devices);
  });
  it('should post devices', (done) => {
    const devices = [
      {
        id: 1,
        title: 'test',
      },
    ];
    service.post({ title: 'cool' }).subscribe((dev) => {
      expect(dev).toEqual(devices);
      done();
    });

    const req = httpMock.expectOne(`${environment.apiUrl + '/devices'}`);
    expect(req.request.method).toBe('POST');
    req.flush(devices);
  });

  it('should put devices', (done) => {
    const devices = [
      {
        id: 1,
        title: 'test',
      },
    ];
    service.put({ title: 'cool' }).subscribe((dev) => {
      expect(dev).toEqual(devices);
      done();
    });

    const req = httpMock.expectOne(`${environment.apiUrl + '/devices'}`);
    expect(req.request.method).toBe('PUT');
    req.flush(devices);
  });
});
