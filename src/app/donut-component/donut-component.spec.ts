import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutComponent } from './donut-component';

describe('DonutComponent', () => {
  let component: DonutComponent;
  let fixture: ComponentFixture<DonutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
