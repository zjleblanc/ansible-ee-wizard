import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { APPEND_EXAMPLES, PREPEND_EXAMPLES } from 'src/app/constants/add-step-examples';

@Component({
  selector: 'app-ee-wizard-additionals-step',
  templateUrl: './ee-wizard-additionals-step.component.html',
  styleUrls: ['./ee-wizard-additionals-step.component.scss']
})
export class EEWizardAddtionalsStepComponent implements OnInit {
  @Input() addStepsFormGroup: FormGroup;
  @Output() addStepsFormGroupChange = new EventEmitter<FormGroup>();

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.addStepsFormGroup = this._formBuilder.group({
      prepend: this._formBuilder.array([]),
      append: this._formBuilder.array([])
    });

    this.addStepsFormGroup.valueChanges.subscribe(() => this.addStepsFormGroupChange.emit(this.addStepsFormGroup));
  }

  get prependSteps() {
    return this.addStepsFormGroup.get('prepend') as FormArray<FormControl>;
  }

  get appendSteps() {
    return this.addStepsFormGroup.get('append') as FormArray<FormControl>;
  }

  onAddStep(arr: FormArray<FormControl>) {
    arr.push(this._formBuilder.control(''));
  }

  getStepExample(idx: number, type: string) : string {
    if(type == "prepend") {
      let mod = idx % PREPEND_EXAMPLES.length;
      return PREPEND_EXAMPLES[mod];
    }
    let mod = idx % APPEND_EXAMPLES.length;
      return APPEND_EXAMPLES[mod];
  }
}
