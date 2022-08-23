import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesTableComponent } from './table/devices-table.component';
import { DeviceComponent } from './device/device.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EditDeviceComponent } from './edit-device/edit-device.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatChipsModule} from "@angular/material/chips";

@NgModule({
  declarations: [DevicesTableComponent, DeviceComponent, EditDeviceComponent],
  imports: [CommonModule, MatProgressSpinnerModule, DragDropModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatSelectModule, MatInputModule, ReactiveFormsModule, MatIconModule, MatChipsModule],
  exports: [DevicesTableComponent],
})
export class DevicesTableModule {}
