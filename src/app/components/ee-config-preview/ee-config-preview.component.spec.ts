import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EEConfigPreviewComponent } from './ee-config-preview.component';

describe('EEConfigPreviewComponent', () => {
  let component: EEConfigPreviewComponent;
  let fixture: ComponentFixture<EEConfigPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EEConfigPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EEConfigPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
