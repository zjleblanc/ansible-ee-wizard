import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Subscription, debounceTime, filter, map, tap } from 'rxjs';
import { PEP_OPERATORS } from 'src/app/constants/pep-operators';
import { PypiService } from 'src/app/services/pypi/pypi.service';

@Component({
  selector: 'app-ee-wizard-packages-step',
  templateUrl: './ee-wizard-packages-step.component.html',
  styleUrls: ['./ee-wizard-packages-step.component.scss']
})
export class EEWizardPackagesStepComponent implements OnInit {
  pypi: PypiService;
  pypi_operators = PEP_OPERATORS;
  package_query = '';
  package_limit = 5;
  package_offset = 0;
  package_show_load_more = false;
  packages: string[];
  packageSearch$: Subscription | undefined;

  @Input() packagesFormGroup: FormGroup;
  @Output() packagesFormGroupChange = new EventEmitter<FormGroup>();

  constructor(private _formBuilder: FormBuilder, _pypi: PypiService) {
    this.pypi = _pypi;
  }

  ngOnInit(): void {
    this.packagesFormGroup = this._formBuilder.group({
      packageSearch: [],
      packages: this._formBuilder.array([])
    });

    this.packagesFormGroupChange.emit(this.packagesFormGroup);
    this.packagesFormGroup.valueChanges.subscribe(() => this.packagesFormGroupChange.emit(this.packagesFormGroup));

    this.packageSearch$ = this.packagesFormGroup.get('packageSearch')?.valueChanges.pipe(
      debounceTime(500),
      filter((query: string) => query.length >= 3),
      tap((query: string) => this.searchPypi(query))
    ).subscribe();
  }

  get packageSearch() {
    return this.packagesFormGroup.get('packageSearch') as FormControl;
  }

  get selectedPackages() {
    if(this.packagesFormGroup.get('packages')) {
      return this.packagesFormGroup.get('packages') as FormArray<FormGroup>;
    }
    return new FormArray<FormGroup>([]);
  }

  onPackageSelected(event: MatAutocompleteSelectedEvent) {
    this.selectedPackages.push(this._formBuilder.group({
      name: [event.option.value, Validators.required],
      operator: [null],
      version: [null]
    }));

    this.packageSearch.setValue('');
    this.packages = [];
  }

  onPackageLoadMore(event: Event) {
    event.stopImmediatePropagation();
    this.searchPypi(this.package_query);
  }

  private searchPypi(query: string) {
    let newQuery = query != this.package_query;
    if(newQuery) {
      this.package_offset = 0;
      this.package_query = query;
    }

    this.pypi.search(query, this.package_limit, this.package_offset)
      .pipe(
        map((resp: HttpResponse<string[]>) => resp.body ?? [])
      ).subscribe(
        (packages: string[]) => {
          if(newQuery) {
            this.packages = packages;
            this.package_offset = this.package_limit;
          }
          else {
            this.packages = this.packages.concat(packages);
            this.package_offset += packages.length;
          }
          this.package_show_load_more = packages.length == this.package_limit;
        }
      );
  }
}
