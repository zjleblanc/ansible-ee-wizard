import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { map, Observable, of } from 'rxjs';
import { IVersionOperator } from 'src/app/interfaces/version-operator.interface';
import { IVersionSource } from 'src/app/interfaces/version-source.interface';

@Component({
  selector: 'app-version-form-group',
  templateUrl: './version-form-group.component.html',
  styleUrls: ['./version-form-group.component.scss']
})
export class VersionFormGroupComponent implements OnInit {
  @Input() parentArray: FormArray<FormGroup<any>>;
  @Input() versionIndex: number;
  @Input() versionGroup: FormGroup;
  @Input() operators: IVersionOperator[];
  @Input() versionSource: IVersionSource;

  operatorTrigger = '';

  versions : string[] = [];
  filteredVersions$ : Observable<string[]>;

  onOperatorSelected(event: MatSelectChange) {
    this.operatorTrigger = event.value
  }

  ngOnInit() {
    const name = this.versionGroup.get('name')?.value
    this.versionSource.getVersions(name)
      .subscribe((resp) => {
        this.versions = resp.body ?? [];
        this.versionGroup.get('version')?.setValue('');
        this.versionGroup.get('version')?.markAsUntouched();
      })

    this.filteredVersions$ = this.versionGroup.get('version')?.valueChanges.pipe(
      map(value => {
        if(typeof value === 'string') {
          return this.versions.filter((version) => version.includes(value));
        }
        return [];
      }),
    ) ?? of([]);
  }
}
