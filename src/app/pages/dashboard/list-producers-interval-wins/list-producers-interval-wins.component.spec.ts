import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProducersIntervalWinsComponent } from './list-producers-interval-wins.component';

describe('ListProducersIntervalWinsComponent', () => {
  let component: ListProducersIntervalWinsComponent;
  let fixture: ComponentFixture<ListProducersIntervalWinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProducersIntervalWinsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProducersIntervalWinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
