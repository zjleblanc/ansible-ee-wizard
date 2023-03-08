import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ee-config-preview',
  templateUrl: './ee-config-preview.component.html',
  styleUrls: ['./ee-config-preview.component.scss']
})
export class EEConfigPreviewComponent {
  @Input() packages : FormArray<FormGroup> = new FormArray<FormGroup>([]);
  @Input() collections : FormArray<FormGroup> = new FormArray<FormGroup>([]);
  @Input() bindeps : FormArray<FormControl> = new FormArray<FormControl>([]);

  @Input() version = "1";
  @Input() baseImage = "quay.io/ansible/ansible-runner:latest";
  @Input() ansibleCfg = "ansible.cfg";

  get hasDependencies() { return this.packages.length || this.collections.length || this.bindeps.length }

  get config() {
    let lines = ["", "---"];
    lines.push(`version: ${this.version}`, "");
    lines.push("build_arg_defaults:", `  EE_BASE_IMAGE: ${this.baseImage}`, "");
    lines.push(`ansible_config: ${this.ansibleCfg}`, "");

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

    return lines.join("\n");
  }
}
