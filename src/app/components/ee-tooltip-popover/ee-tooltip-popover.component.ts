import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-ee-tooltip-popover',
  templateUrl: './ee-tooltip-popover.component.html',
  styleUrls: ['./ee-tooltip-popover.component.scss']
})
export class EeTooltipPopoverComponent {
  @Input() link: string;
  visible = false;
}
