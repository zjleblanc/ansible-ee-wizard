import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PypiPackageComponent } from './pypi-package.component';

describe('PypiPackageComponent', () => {
  let component: PypiPackageComponent;
  let fixture: ComponentFixture<PypiPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PypiPackageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PypiPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
