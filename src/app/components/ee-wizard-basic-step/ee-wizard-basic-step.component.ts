import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ee-wizard-basic-step',
  templateUrl: './ee-wizard-basic-step.component.html',
  styleUrls: ['./ee-wizard-basic-step.component.scss']
})
export class EEWizardBasicStepComponent implements OnInit {
  @Input() basicsFormGroup: FormGroup;
  @Output() basicsFormGroupChange = new EventEmitter<FormGroup>();

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.basicsFormGroup = this._formBuilder.group({
      version: ['1', Validators.required],
      base_image: ['quay.io/ansible/ansible-runner:latest', Validators.required],
      builder_image: [null],
      ansible_cfg: ["ansible.cfg"]
    });
    this.basicsFormGroupChange.emit(this.basicsFormGroup);
    this.basicsFormGroup.valueChanges.subscribe(() => this.basicsFormGroupChange.emit(this.basicsFormGroup));
  }
}
