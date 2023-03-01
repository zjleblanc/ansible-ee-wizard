import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalaxyCollectionComponent } from './galaxy-collection.component';

describe('GalaxyCollectionComponent', () => {
  let component: GalaxyCollectionComponent;
  let fixture: ComponentFixture<GalaxyCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalaxyCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalaxyCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
