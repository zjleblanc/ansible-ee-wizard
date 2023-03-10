import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EeTooltipPopoverComponent } from './ee-tooltip-popover.component';

describe('EeTooltipPopoverComponent', () => {
  let component: EeTooltipPopoverComponent;
  let fixture: ComponentFixture<EeTooltipPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EeTooltipPopoverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EeTooltipPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
