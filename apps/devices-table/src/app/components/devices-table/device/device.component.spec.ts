import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceComponent } from './device.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('DeviceComponent', () => {
  let component: DeviceComponent;
  let fixture: ComponentFixture<DeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeviceComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DeviceComponent);
    component = fixture.componentInstance;
    component.device = {id: 1, title: 'Test title', resolutions: [{width: 90, height: 100}], type: 'Стационарная камера'}
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
