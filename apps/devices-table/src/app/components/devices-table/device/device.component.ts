import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";

// class Resolutoion implements ResolutionInterface {
//   height: number;
//   width: number;
// }
//
// class Device implements DeviceInterface {
//   customOrder: number;
//   id: number;
//   resolution: Resolutoion[];
//   title: string;
//   type: string;
//   updateTime: number;
// }

@Component({
  selector: 'elvis-device[device]',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeviceComponent implements OnInit {
  @Input()
  device: any;

  constructor(private readonly store: Store) {
  }

  ngOnInit(): void {}



}
