import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesTableComponent } from './devices-table.component';
import { NgxsModule, Store } from '@ngxs/store';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DevicesTableComponent', () => {
  let component: DevicesTableComponent;
  let fixture: ComponentFixture<DevicesTableComponent>;
  let store: Store;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([]), MatDialogModule],
      providers: [MatDialog],
      declarations: [DevicesTableComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    store = TestBed.inject(Store);
    jest.spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(DevicesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });
});
