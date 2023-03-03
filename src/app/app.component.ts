import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { debounceTime, filter, map, Subscription, tap } from 'rxjs';
import { BINDEP_EXAMPLES } from './constants/bindep-examples';
import { GALAXY_OPERATORS } from './constants/galaxy-operators';
import { PEP_OPERATORS } from './constants/pep-operators';
import { GalaxyService } from './services/galaxy/galaxy.service';
import { PypiService } from './services/pypi/pypi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  pypi: PypiService;
  pypi_operators = PEP_OPERATORS;
  package_query = '';
  package_limit = 5;
  package_offset = 0;
  package_show_load_more = false;
  packages: string[];
  packageSearch$: Subscription | undefined;

  galaxy: GalaxyService;
  galaxy_operators = GALAXY_OPERATORS;
  collection_query = '';
  collections_loading = false;
  collections: string[];
  collectionSearch$: Subscription | undefined;

  bindepExamples = BINDEP_EXAMPLES;

  packageFormGroup: FormGroup;
  collectionFormGroup: FormGroup;
  bindepFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    _pypi: PypiService,
    _galaxy: GalaxyService
  ) {
    this.pypi = _pypi;
    this.galaxy = _galaxy;
  }

  ngOnInit() {
    this.packageFormGroup =this._formBuilder.group({
      packageSearch: [],
      packages: this._formBuilder.array([])
    });
    this.collectionFormGroup = this._formBuilder.group({
      collectionSearch: [],
      collections: this._formBuilder.array([])
    });
    this.bindepFormGroup = this._formBuilder.group({
      bindeps: this._formBuilder.array([])
    });

    this.packageSearch$ = this.packageFormGroup.get('packageSearch')?.valueChanges.pipe(
      debounceTime(500),
      filter((query: string) => query.length >= 3),
      tap((query: string) => this.searchPypi(query))
    ).subscribe();

    this.collectionSearch$ = this.collectionFormGroup.get('collectionSearch')?.valueChanges.pipe(
      debounceTime(500),
      filter((query: string) => query.length > 0),
      tap((query: string) => this.searchGalaxy(query))
    ).subscribe();
  }

  get packageSearch() {
    return this.packageFormGroup.get('packageSearch') as FormControl;
  }

  get selectedPackages() {
    return this.packageFormGroup.get('packages') as FormArray<FormGroup>;
  }

  get collectionSearch() {
    return this.collectionFormGroup.get('collectionSearch') as FormControl;
  }

  get selectedCollections() {
    return this.collectionFormGroup.get('collections') as FormArray<FormGroup>;
  }

  get bindeps() {
    return this.bindepFormGroup.get('bindeps') as FormArray<FormControl>;
  }

  onAddBindep() {
    this.bindeps.push(this._formBuilder.control({
      dependency: ['', Validators.required]
    }))
  }

  getBindepExample(idx: number) : string {
    const mod = idx % this.bindepExamples.length;
    return this.bindepExamples[mod] + "   #example";
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

  onCollectionSelected(event: MatAutocompleteSelectedEvent) {
    this.selectedCollections.push(this._formBuilder.group({
      name: [event.option.value, Validators.required],
      operator: [null, Validators.required],
      version: [null, Validators.required]
    }));

    this.collectionSearch.setValue('');
    this.collection_query = '';
    this.collections = [];
  }

  private searchGalaxy(query: string) {
    if(query == this.collection_query) {
      return;
    }

    this.collections = [];
    this.collections_loading = true;
    this.collection_query = query;
    this.galaxy.search(query)
      .pipe(
        map((resp: HttpResponse<string[]>) => {
          return resp.body ?? []
        })
      ).subscribe({
        next: (results: string[]) => {
          this.collections = results;
          this.collections_loading = false;
        },
        error: (err: any) => {
          console.log(err);
          this.collections = [];
          this.collections_loading = false;
        }
      })
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
