import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceReportFormComponent } from './service-report-form.component';

describe('ServiceReportFormComponent', () => {
  let component: ServiceReportFormComponent;
  let fixture: ComponentFixture<ServiceReportFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceReportFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
