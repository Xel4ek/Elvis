import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {DevicesState} from "../../../state/devices/devices.state";
import {first, Observable} from "rxjs";
import {DeviceInterface} from "../../../state/devices/device.interface";
import {AddDevicesAction, ChangeDevicesAction, GetDevicesAction} from "../../../state/devices/devices.actions";
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {EditDeviceComponent} from "../edit-device/edit-device.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'elvis-devices-table',
  templateUrl: './devices-table.component.html',
  styleUrls: ['./devices-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevicesTableComponent implements OnInit {
  @Select(DevicesState.devices) devices?: Observable<DeviceInterface[]>;
  @Select(DevicesState.loading) loading?: Observable<boolean>;
  constructor(private readonly store:Store, private readonly dialog:MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(new GetDevicesAction()).pipe(first()).subscribe()
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event.previousIndex, event.currentIndex)
    // moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

  get() {
    this.store.dispatch(new GetDevicesAction()).subscribe(console.log);
  }

  edit(device?: DeviceInterface) {
      const dialogRef = this.dialog.open(EditDeviceComponent, {
        data: device
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (result.mode === 'change') {
            this.store.dispatch(new ChangeDevicesAction({
              title: result.form.title,
              resolutions: result.form.resolutions,
              type: result.form.type,
              id: device?.id ?? -1
            }))
          }
          if (result.mode === 'create') {
            this.store.dispatch(new AddDevicesAction({
              title: result.form.title,
              resolutions: result.form.resolutions,
              type: result.form.type,
            }))
          }
        }
      });
  }
}
