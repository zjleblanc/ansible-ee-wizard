import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { PEP_OPERATORS } from 'src/app/constants/pep-operators';

@Component({
  selector: 'app-pypi-package',
  templateUrl: './pypi-package.component.html',
  styleUrls: ['./pypi-package.component.scss']
})
export class PypiPackageComponent {
  @Input() packageGroup: FormGroup;

  operators = PEP_OPERATORS;
  operatorTrigger = '';

  onOperatorSelected(event: MatSelectChange) {
    this.operatorTrigger = event.value
  }
}
