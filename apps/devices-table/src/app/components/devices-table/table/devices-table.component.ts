import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {DevicesState} from "../../../state/devices/devices.state";
import {first, Observable} from "rxjs";
import {DeviceInterface} from "../../../state/devices/device.interface";
import {AddDevicesAction, GetDevicesAction} from "../../../state/devices/devices.actions";
import {CdkDragDrop} from "@angular/cdk/drag-drop";

@Component({
  selector: 'elvis-devices-table',
  templateUrl: './devices-table.component.html',
  styleUrls: ['./devices-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevicesTableComponent implements OnInit {
  @Select(DevicesState.devices) devices?: Observable<DeviceInterface[]>;
  @Select(DevicesState.loading) loading?: Observable<boolean>;
  constructor(private readonly store:Store) {}

  ngOnInit(): void {
    this.store.dispatch(new GetDevicesAction()).pipe(first()).subscribe()
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event.previousIndex, event.currentIndex)
    // moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

  add() {
    this.store.dispatch(new AddDevicesAction({
      customOrder: 1,
      resolution: [{height: 12, width: 13}],
      title: 'test1',
      type: 'someType',
    }))
  }
  get() {
    this.store.dispatch(new GetDevicesAction()).subscribe(console.log);
  }
}
