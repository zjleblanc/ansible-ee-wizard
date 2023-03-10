import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EEWizardPackagesStepComponent } from './ee-wizard-packages-step.component';

describe('EeWizardPackagesStepComponent', () => {
  let component: EEWizardPackagesStepComponent;
  let fixture: ComponentFixture<EEWizardPackagesStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EEWizardPackagesStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EEWizardPackagesStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
