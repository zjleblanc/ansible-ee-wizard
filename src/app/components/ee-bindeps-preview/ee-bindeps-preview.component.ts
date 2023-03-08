import { Component, Input } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-ee-bindeps-preview',
  templateUrl: './ee-bindeps-preview.component.html',
  styleUrls: ['./ee-bindeps-preview.component.scss']
})
export class EEBindepsPreviewComponent {
  @Input() dependencies : FormArray<FormControl> = new FormArray<FormControl>([]);

  get bindeps() {
    let lines = [""];
    this.dependencies.controls.filter(ctrl => ctrl.value).forEach((control) => lines.push(control.value));
    return lines.join("\n")
  }
}
