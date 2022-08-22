import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayButtonnComponent } from './play-button.component';

describe('PlayBtnComponent', () => {
  let component: PlayButtonnComponent;
  let fixture: ComponentFixture<PlayButtonnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayButtonnComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayButtonnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
