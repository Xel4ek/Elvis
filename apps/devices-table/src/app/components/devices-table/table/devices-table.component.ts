import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {DevicesState} from "../../../state/devices/devices.state";
import {first, Observable, Subscription, tap} from "rxjs";
import {DeviceInterface} from "../../../state/devices/device.interface";
import {AddDevicesAction, ChangeDevicesAction, GetDevicesAction} from "../../../state/devices/devices.actions";
import {EditDeviceComponent} from "../edit-device/edit-device.component";
import {MatDialog} from "@angular/material/dialog";
import {FormControl} from "@angular/forms";
import {UpdateFilter} from "../../../state/filter/filter.actions";
import {ToggleOrder} from "../../../state/order/order.actions";
import {OrderState} from "../../../state/order/order.state";

@Component({
  selector: 'elvis-devices-table',
  templateUrl: './devices-table.component.html',
  styleUrls: ['./devices-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevicesTableComponent implements OnInit, OnDestroy {
  @Select(DevicesState.devices) $devices?: Observable<DeviceInterface[]>;
  @Select(DevicesState.loading) $loading?: Observable<boolean>;
  @Select(OrderState.direction) $direction?: Observable<'ASC' | 'DESC'>
  searchFilter: FormControl;
  subscription: Subscription;
  constructor(private readonly store:Store, private readonly dialog:MatDialog) {
    this.searchFilter = new FormControl('');
    this.subscription = this.searchFilter.valueChanges.pipe(tap(value =>
      this.store.dispatch(new UpdateFilter(value))
    )).subscribe()
  }

  ngOnInit(): void {
    this.store.dispatch(new GetDevicesAction()).pipe(first()).subscribe()
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


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  changeOrder() {
    this.store.dispatch(new ToggleOrder())
  }
}
