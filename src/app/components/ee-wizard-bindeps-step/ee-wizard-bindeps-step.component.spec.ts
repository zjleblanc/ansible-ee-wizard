import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EEWizardBindepsStepComponent } from './ee-wizard-bindeps-step.component';

describe('EeWizardBindepsStepComponent', () => {
  let component: EEWizardBindepsStepComponent;
  let fixture: ComponentFixture<EEWizardBindepsStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EEWizardBindepsStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EEWizardBindepsStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
