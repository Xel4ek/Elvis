import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
export interface Device {
  title: string;
  resolutions: [{width: number, height: number}],
  type: string;
}
@Component({
  selector: 'elvis-edit-device',
  templateUrl: './edit-device.component.html',
  styleUrls: ['./edit-device.component.scss'],
})
export class EditDeviceComponent implements OnInit {
  // @Input()
  // data: any;
  // title: any;
  mode = {action: 'create', title: 'Создайте'};
  form: FormGroup;
  readonly MAX_RESOLUTIONS = 4;
  constructor(private readonly fb:FormBuilder, @Inject(MAT_DIALOG_DATA) public data: Device) {
    this.form = fb.group({
      title: [this.data?.title, [Validators.required]],
      type: [this.data?.type, [Validators.required]],
      resolutions: fb.array(this.data?.resolutions ? this.data.resolutions.map(({width, height}) => this.resolutionsForm(width, height)) : [this.resolutionsForm()])
    })
  }
  private resolutionsForm(width?: number, height?: number) {
    return this.fb.group({
      width: [width, [Validators.required]], height: [height, [Validators.required]]
    })
  }
  appendResolution() {
    if (this.form.controls['resolutions'].value.length < 4) {
      this.resolutions.push(this.resolutionsForm())
    }
  }
  removeResolution(index: number) {
    if (this.resolutions.length > 1) {
      this.resolutions.removeAt(index);
    }
  }
  ngOnInit(): void {
    if (this.data) {
      this.mode = {action: 'change', title: 'Измените'};
    }
  }

  get resolutionsHaveError() { return this.resolutions.controls.some(el => el.invalid)}
  get formTitle() {return this.form.get('title')}
  get formType() {return this.form.get('type')}
  get resolutions() { return this.form.get('resolutions') as FormArray}
}
