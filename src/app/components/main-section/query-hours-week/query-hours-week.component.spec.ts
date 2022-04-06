import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryHoursWeekComponent } from './query-hours-week.component';

describe('QueryHoursWeekComponent', () => {
  let component: QueryHoursWeekComponent;
  let fixture: ComponentFixture<QueryHoursWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryHoursWeekComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryHoursWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
