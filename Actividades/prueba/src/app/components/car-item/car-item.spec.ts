import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarItem } from './car-item';

describe('CarItem', () => {
  let component: CarItem;
  let fixture: ComponentFixture<CarItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarItem],
    }).compileComponents();

    fixture = TestBed.createComponent(CarItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
