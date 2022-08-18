import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingContainerBodyComponent } from './landing-container-body.component';

describe('LandingContainerBodyComponent', () => {
  let component: LandingContainerBodyComponent;
  let fixture: ComponentFixture<LandingContainerBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingContainerBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingContainerBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
