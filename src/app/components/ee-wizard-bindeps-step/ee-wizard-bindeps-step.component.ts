import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BINDEP_EXAMPLES } from 'src/app/constants/bindep-examples';

@Component({
  selector: 'app-ee-wizard-bindeps-step',
  templateUrl: './ee-wizard-bindeps-step.component.html',
  styleUrls: ['./ee-wizard-bindeps-step.component.scss']
})
export class EEWizardBindepsStepComponent implements OnInit {
  @Input() bindepFormArray: FormArray<FormControl>;
  @Output() bindepFormArrayChange = new EventEmitter<FormArray<FormControl>>();

  bindepFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.bindepFormGroup = this._formBuilder.group({
      bindeps: this.bindepFormArray
    });
    this.bindepFormArray.valueChanges.subscribe(() => this.bindepFormArrayChange.emit(this.bindepFormArray));
  }

  get bindeps() {
    return this.bindepFormGroup.get('bindeps') as FormArray<FormControl>;
  }

  onAddBindep() {
    this.bindepFormArray?.push(this._formBuilder.control(''));
  }

  getBindepExample(idx: number) : string {
    const mod = idx % BINDEP_EXAMPLES.length;
    return BINDEP_EXAMPLES[mod] + "   #example";
  }
}
