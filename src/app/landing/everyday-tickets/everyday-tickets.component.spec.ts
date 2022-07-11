import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EverydayTicketsComponent } from './everyday-tickets.component';

describe('EverydayTicketsComponent', () => {
  let component: EverydayTicketsComponent;
  let fixture: ComponentFixture<EverydayTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EverydayTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EverydayTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
