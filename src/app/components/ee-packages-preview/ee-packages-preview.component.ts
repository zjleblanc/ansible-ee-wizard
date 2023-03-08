import { Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ee-packages-preview',
  templateUrl: './ee-packages-preview.component.html',
  styleUrls: ['./ee-packages-preview.component.scss']
})
export class EEPackagesPreviewComponent {
  @Input() packages : FormArray<FormGroup> = new FormArray<FormGroup>([]);

  get requirements() {
    let lines = [""];
    this.packages.controls.forEach((group) => {
      const name = group.get("name")?.value;
      const operator = group.get("operator")?.value ?? '';
      const version = group.get("version")?.value ?? '';

      lines.push(name + operator + version);
    });
    return lines.join("\n")
  }
}
