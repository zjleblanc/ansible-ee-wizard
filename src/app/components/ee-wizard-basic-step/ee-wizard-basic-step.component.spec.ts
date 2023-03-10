import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EEWizardBasicStepComponent } from './ee-wizard-basic-step.component';

describe('EeWizardBasicStepComponent', () => {
  let component: EEWizardBasicStepComponent;
  let fixture: ComponentFixture<EEWizardBasicStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EEWizardBasicStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EEWizardBasicStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
