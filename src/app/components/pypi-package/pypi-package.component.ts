import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { filter, map, Observable, of, startWith } from 'rxjs';
import { PEP_OPERATORS } from 'src/app/constants/pep-operators';
import { PypiService } from 'src/app/services/pypi/pypi.service';

@Component({
  selector: 'app-pypi-package',
  templateUrl: './pypi-package.component.html',
  styleUrls: ['./pypi-package.component.scss']
})
export class PypiPackageComponent implements OnInit {
  @Input() packageGroup: FormGroup;

  operators = PEP_OPERATORS;
  operatorTrigger = '';

  versions : string[] = [];
  filteredVersions$ : Observable<string[]>;

  onOperatorSelected(event: MatSelectChange) {
    this.operatorTrigger = event.value
  }

  constructor(private pypi: PypiService) {}

  ngOnInit() {
    const package_name = this.packageGroup.get('name')?.value
    this.pypi.getVersions(package_name)
      .subscribe((resp) => {
        this.versions = resp.body ?? [];
        this.packageGroup.get('version')?.setValue('');
      })

    this.filteredVersions$ = this.packageGroup.get('version')?.valueChanges.pipe(
      map(value => {
        if(typeof value === 'string') {
          return this.versions.filter((version) => version.includes(value));
        }
        return [];
      }),
    ) ?? of([]);
  }
}
