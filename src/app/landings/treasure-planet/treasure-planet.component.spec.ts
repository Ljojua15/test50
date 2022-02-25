import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasurePlanetComponent } from './treasure-planet.component';

describe('TreasurePlanetComponent', () => {
  let component: TreasurePlanetComponent;
  let fixture: ComponentFixture<TreasurePlanetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreasurePlanetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreasurePlanetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
