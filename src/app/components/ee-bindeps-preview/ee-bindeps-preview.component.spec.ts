import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EEBindepsPreviewComponent } from './ee-bindeps-preview.component';

describe('EeBindepsPreviewComponent', () => {
  let component: EEBindepsPreviewComponent;
  let fixture: ComponentFixture<EEBindepsPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EEBindepsPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EEBindepsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
