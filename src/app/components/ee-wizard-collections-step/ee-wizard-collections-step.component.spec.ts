import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EEWizardCollectionsStepComponent } from './ee-wizard-collections-step.component';

describe('EeWizardCollectionsStepComponent', () => {
  let component: EEWizardCollectionsStepComponent;
  let fixture: ComponentFixture<EEWizardCollectionsStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EEWizardCollectionsStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EEWizardCollectionsStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
