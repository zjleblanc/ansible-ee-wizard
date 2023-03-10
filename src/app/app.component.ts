import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { debounceTime, filter, map, Subscription, tap } from 'rxjs';
import { BINDEP_EXAMPLES } from './constants/bindep-examples';
import { PREPEND_EXAMPLES, APPEND_EXAMPLES } from './constants/add-step-examples';
import { GALAXY_OPERATORS } from './constants/galaxy-operators';
import { GalaxyService } from './services/galaxy/galaxy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  basicsFormGroup: FormGroup = new FormGroup([]);
  addStepsFormGroup: FormGroup = new FormGroup([]);
  packageFormGroup: FormGroup = new FormGroup([]);
  collectionFormGroup: FormGroup = new FormGroup([]);
  bindepFormArray: FormArray<FormControl> = new FormArray<FormControl>([]);

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.bindepFormArray = this._formBuilder.array([]);
    this.addStepsFormGroup = this._formBuilder.group({
      prepend: this._formBuilder.array([]),
      append: this._formBuilder.array([])
    });
  }

  get selectedPackages() {
    if(this.packageFormGroup.get('packages')) {
      return this.packageFormGroup.get('packages') as FormArray<FormGroup>;
    }
    return new FormArray<FormGroup>([]);
  }

  get selectedCollections() {
    if(this.collectionFormGroup.get('collections')) {
      return this.collectionFormGroup.get('collections') as FormArray<FormGroup>;
    }
    return new FormArray<FormGroup>([]);
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
