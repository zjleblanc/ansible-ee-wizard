import { Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ee-collections-preview',
  templateUrl: './ee-collections-preview.component.html',
  styleUrls: ['./ee-collections-preview.component.scss']
})
export class EECollectionsPreviewComponent {
  @Input() collections : FormArray<FormGroup> = new FormArray<FormGroup>([]);

  get requirements() {
    let lines = ["","---","collections:"];
    this.collections.controls.forEach((group) => {
      const name = group.get("name")?.value;
      const operator = group.get("operator")?.value ?? '';
      const version = group.get("version")?.value;

      let version_range = '*';
      if(version) {
        version_range = operator + version;
      }

      lines.push(`  - name: ${name}`);
      lines.push(`    version: "${version_range}"`);
    });
    return lines.join("\n")
  }
}
