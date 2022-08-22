import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesTableComponent } from './table/devices-table.component';
import { DeviceComponent } from './device/device.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EditDeviceComponent } from './edit-device/edit-device.component';

@NgModule({
  declarations: [DevicesTableComponent, DeviceComponent, EditDeviceComponent],
  imports: [CommonModule, MatProgressSpinnerModule, DragDropModule],
  exports: [DevicesTableComponent],
})
export class DevicesTableModule {}
