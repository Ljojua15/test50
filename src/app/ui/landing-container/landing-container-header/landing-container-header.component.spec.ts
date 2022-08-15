import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingContainerHeaderComponent } from './landing-container-header.component';

describe('LandingContainerHeaderComponent', () => {
  let component: LandingContainerHeaderComponent;
  let fixture: ComponentFixture<LandingContainerHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingContainerHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingContainerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
