import { HttpResponse } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, filter, map, Observable, startWith, Subscription, tap } from 'rxjs';
import { PypiService } from './services/pypi/pypi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  package_limit = 50;
  package_offset = 0;
  packages: string[];
  packageSearch$: Subscription | undefined;

  packageFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, private pypi: PypiService) {}

  ngOnInit() {
    this.packageFormGroup =this._formBuilder.group({
      packageSearch: []
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

  private searchPypi(query: string) {
    this.pypi.search(query, this.package_limit, this.package_offset)
      .pipe(
        map((resp: HttpResponse<string[]>) => resp.body ?? [])
      ).subscribe(
        (packages: string[]) => {
          console.log(packages);
          this.packages = packages;
        }
      );
  }
}
