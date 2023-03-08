import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EECollectionsPreviewComponent } from './ee-collections-preview.component';

describe('EeCollectionsPreviewComponent', () => {
  let component: EECollectionsPreviewComponent;
  let fixture: ComponentFixture<EECollectionsPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EECollectionsPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EECollectionsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
