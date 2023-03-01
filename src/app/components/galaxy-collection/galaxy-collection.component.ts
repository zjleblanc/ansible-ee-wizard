import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { map, Observable, of, startWith } from 'rxjs';
import { GALAXY_OPERATORS } from 'src/app/constants/galaxy-operators';
import { GalaxyService } from 'src/app/services/galaxy/galaxy.service';

@Component({
  selector: 'app-galaxy-collection',
  templateUrl: './galaxy-collection.component.html',
  styleUrls: ['./galaxy-collection.component.scss']
})
export class GalaxyCollectionComponent implements OnInit {
  @Input() collectionGroup: FormGroup;

  operators = GALAXY_OPERATORS;
  operatorTrigger = '';

  versions : string[] = [];
  filteredVersions$ : Observable<string[]>;

  onOperatorSelected(event: MatSelectChange) {
    this.operatorTrigger = event.value
  }

  constructor(private galaxy: GalaxyService) {}

  ngOnInit() {
    const collection_name = this.collectionGroup.get('name')?.value
    this.galaxy.getVersions(collection_name)
      .subscribe((resp) => {
        this.versions = resp.body ?? [];
        this.collectionGroup.get('version')?.setValue('');
      })

    this.filteredVersions$ = this.collectionGroup.get('version')?.valueChanges.pipe(
      map(value => {
        if(typeof value === 'string') {
          return this.versions.filter((version) => version.includes(value));
        }
        return [];
      }),
    ) ?? of([]);
  }
}
