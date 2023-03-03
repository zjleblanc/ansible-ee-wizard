import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionFormGroupComponent } from './version-form-group.component';

describe('VersionFormGroupComponent', () => {
  let component: VersionFormGroupComponent;
  let fixture: ComponentFixture<VersionFormGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersionFormGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VersionFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
