import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EEPackagesPreviewComponent } from './ee-packages-preview.component';

describe('EePackagesPreviewComponent', () => {
  let component: EEPackagesPreviewComponent;
  let fixture: ComponentFixture<EEPackagesPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EEPackagesPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EEPackagesPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
