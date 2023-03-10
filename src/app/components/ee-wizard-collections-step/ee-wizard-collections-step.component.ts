import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Subscription, debounceTime, filter, map, tap } from 'rxjs';
import { GALAXY_OPERATORS } from 'src/app/constants/galaxy-operators';
import { GalaxyService } from 'src/app/services/galaxy/galaxy.service';

@Component({
  selector: 'app-ee-wizard-collections-step',
  templateUrl: './ee-wizard-collections-step.component.html',
  styleUrls: ['./ee-wizard-collections-step.component.scss']
})
export class EEWizardCollectionsStepComponent implements OnInit {
  @Input() collectionsFormGroup: FormGroup;
  @Output() collectionsFormGroupChange = new EventEmitter<FormGroup>();

  galaxy: GalaxyService;
  galaxy_operators = GALAXY_OPERATORS;
  collection_query = '';
  collections_loading = false;
  collections: string[];
  collectionSearch$: Subscription | undefined;

  constructor(private _formBuilder: FormBuilder, _galaxy: GalaxyService) {
    this.galaxy = _galaxy;
  }

  get selectedCollections() {
    return this.collectionsFormGroup.get('collections') as FormArray<FormGroup>;
  }

  get collectionSearch() {
    return this.collectionsFormGroup.get('collectionSearch') as FormControl;
  }

  ngOnInit(): void {
    this.collectionsFormGroup = this._formBuilder.group({
      collectionSearch: [],
      collections: this._formBuilder.array([])
    });

    this.collectionsFormGroupChange.emit(this.collectionsFormGroup);
    this.collectionsFormGroup.valueChanges.subscribe(() => this.collectionsFormGroupChange.emit(this.collectionsFormGroup));

    this.collectionSearch$ = this.collectionsFormGroup.get('collectionSearch')?.valueChanges.pipe(
      debounceTime(500),
      filter((query: string) => query.length >= 3),
      tap((query: string) => this.searchGalaxy(query))
    ).subscribe();
  }

  onCollectionSelected(event: MatAutocompleteSelectedEvent) {
    this.selectedCollections.push(this._formBuilder.group({
      name: [event.option.value, Validators.required],
      operator: [null],
      version: [null]
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

}
