import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTopStudiosWinnersComponent } from './list-top-studios-winners.component';

describe('ListTopStudiosWinnersComponent', () => {
  let component: ListTopStudiosWinnersComponent;
  let fixture: ComponentFixture<ListTopStudiosWinnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTopStudiosWinnersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTopStudiosWinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
