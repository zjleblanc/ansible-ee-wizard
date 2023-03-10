import { Component, Input } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ee-config-preview',
  templateUrl: './ee-config-preview.component.html',
  styleUrls: ['./ee-config-preview.component.scss']
})
export class EEConfigPreviewComponent {
  @Input() basics : FormGroup = new FormGroup([]);
  @Input() packages : FormArray<FormGroup> = new FormArray<FormGroup>([]);
  @Input() collections : FormArray<FormGroup> = new FormArray<FormGroup>([]);
  @Input() bindeps : FormArray<FormControl> = new FormArray<FormControl>([]);
  @Input() prependSteps : FormArray<FormControl> = new FormArray<FormControl>([]);
  @Input() appendSteps : FormArray<FormControl> = new FormArray<FormControl>([]);

  get validPrependSteps() { return this.prependSteps.controls.filter(s => s.value) }
  get validAppendSteps() { return this.appendSteps.controls.filter(s => s.value) }

  get hasDependencies() { return this.packages.length || this.collections.length || this.bindeps.length }
  get hasAdditionalSteps() { return this.validPrependSteps.length || this.validAppendSteps.length }

  get config() {
    let lines = ["", "---"];
    lines.push(`version: ${this.basics.get('version')?.value}`, "");

    lines.push("build_arg_defaults:");
    lines.push(`  EE_BASE_IMAGE: ${this.basics.get('base_image')?.value}`);
    if(this.basics.get('builder_image')?.value) {
      lines.push(`  EE_BUILDER_IMAGE: ${this.basics.get('builder_image')?.value}`);
    }
    lines.push("");

    lines.push(`ansible_config: ${this.basics.get('ansible_cfg')?.value}`, "");

    if(this.hasDependencies) {
      lines.push("dependencies:");
      if(this.packages.length)
        lines.push("  python: requirements.txt");
      if(this.collections.length)
        lines.push("  galaxy: requirements.yml");
      if(this.bindeps.length)
        lines.push("  system: bindep.txt");
      lines.push("");
    }

    if(this.hasAdditionalSteps) {
      lines.push("additional_build_steps:");
      if(this.validPrependSteps.length) {
        lines.push("  prepend:");
        this.validPrependSteps.forEach((step) => {
          lines.push(`    - ${step.value}`);
        });
      }
      if(this.validAppendSteps.length) {
        lines.push("  append:");
        this.validAppendSteps.forEach((step) => {
          lines.push(`    - ${step.value}`);
        });
      }
    }

    return lines.join("\n");
  }
}
