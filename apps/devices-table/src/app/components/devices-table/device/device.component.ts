import {ChangeDetectionStrategy, Component, Input} from '@angular/core';


@Component({
  selector: 'elvis-device[device]',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeviceComponent {
  @Input()
  device: any;
}
