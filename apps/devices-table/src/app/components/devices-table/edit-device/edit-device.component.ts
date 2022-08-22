import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'elvis-edit-device',
  templateUrl: './edit-device.component.html',
  styleUrls: ['./edit-device.component.scss'],
})
export class EditDeviceComponent implements OnInit {
  @Input()
  device: any;


  constructor() {}

  ngOnInit(): void {}

  save() {

  }
}
