import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EEWizardAddtionalsStepComponent } from './ee-wizard-additionals-step.component';

describe('EeWizardAddtionalsStepComponent', () => {
  let component: EEWizardAddtionalsStepComponent;
  let fixture: ComponentFixture<EEWizardAddtionalsStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EEWizardAddtionalsStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EEWizardAddtionalsStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
