import { HttpResponse } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { debounceTime, filter, map, Subscription, tap } from 'rxjs';
import { PypiService } from './services/pypi/pypi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  package_query = '';
  package_limit = 5;
  package_offset = 0;
  package_show_load_more = false;
  packages: string[];
  packageSearch$: Subscription | undefined;

  packageFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, private pypi: PypiService) {}

  ngOnInit() {
    this.packageFormGroup =this._formBuilder.group({
      packageSearch: [],
      packages: this._formBuilder.array([])
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['']
    });

    this.packageSearch$ = this.packageFormGroup.get('packageSearch')?.valueChanges.pipe(
      debounceTime(500),
      filter((query: string) => query.length >= 3),
      tap((query: string) => this.searchPypi(query))
    ).subscribe();
  }

  get packageSearch() {
    return this.packageFormGroup.get('packageSearch') as FormControl;
  }

  get selectedPackages() {
    return this.packageFormGroup.get('packages') as FormArray<FormGroup>;
  }

  onPackageSelected(event: MatAutocompleteSelectedEvent) {
    this.selectedPackages.push(this._formBuilder.group({
      name: [event.option.value, Validators.required],
      operator: [null, Validators.required],
      version: [null, Validators.required]
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
