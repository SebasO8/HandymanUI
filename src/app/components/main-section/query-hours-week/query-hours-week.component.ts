import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, Observable, Subscription, tap, throwError } from 'rxjs';
import { ServiceReportModel, weekQuery } from 'src/app/core/models/serviceReport.model';
import { TechnicianModel } from 'src/app/core/models/technician.model';
import { ServiceReportService } from 'src/app/shared/services/serviceReport-service/service-report.service';
import { TechnicianService } from 'src/app/shared/services/technician-service/technician.service';

@Component({
  selector: 'app-query-hours-week',
  templateUrl: './query-hours-week.component.html',
  styleUrls: ['./query-hours-week.component.css']
})
export class QueryHoursWeekComponent implements OnInit, OnDestroy {
  serviceReports: Array<ServiceReportModel> = [];
  formQueryHours!: FormGroup;
  technicians: Array<TechnicianModel> = [];
  suscribeTechnicians$!: Subscription;
  suscribeServicesOfWeek$!: Subscription;
  weekNumberArray: Array<number> = [];
  daysOfWeek: Array<number> = [1, 2, 3, 4, 5, 6, 7];
  months: Array<String> = ['ENERO','FEBRERO','MARZO','ABRIL', 'MAYO', 'JUNIO', 'JULO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];

  constructor(private fb: FormBuilder,
    private readonly techniciansService: TechnicianService,
    private readonly ServiceReportService: ServiceReportService) {
    this.weekNumberArray = Array(53).fill(1).map((x, i) => i);
  }

  ngOnInit(): void {
    this.createForm();
    this.suscribeTechnicians$ = this.getObservableAllTechnicians().subscribe();
  }

  createForm(): void {
    this.formQueryHours = this.fb.group({
      technicianId: ["", Validators.required],
      weekNumber: ["", Validators.required],
    })
  }

  getObservableAllTechnicians(): Observable<TechnicianModel> {
    return this.techniciansService.getAllTechnicians().pipe(
      tap((technicians: any) => {
        for (const item in technicians) {
          this.technicians.push(technicians[item]);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.log('Executin error...', error)
        alert('Error al consumir el servicio');
        return throwError(error);
      })
    );
  }

  onClickSubmitReport(): void {
    const queryReport: weekQuery = this.formQueryHours.value;
    this.suscribeServicesOfWeek$ = this.getServicesOfWeek(queryReport).subscribe();
    console.log('array of services onClickSubmit')
    console.log(this.serviceReports)
    this.formQueryHours.reset();
  }

  getServicesOfWeek(body: weekQuery): Observable<ServiceReportModel> {
    return this.ServiceReportService.getWeekServiceReport(body).pipe(
      tap(serviceReport => {
        let serviceReportSort = this.sortArray(serviceReport)
        this.serviceReports = this.sortDifferentDateOfWeek(serviceReportSort, Number(body.weekNumber))
        console.log('array of services getservices')
        console.log(this.serviceReports)
      }),
      catchError((error: HttpErrorResponse) => {
        console.log('Executin error...', error)
        alert('Error al consumir el servicio');
        return throwError(error);
      })
    );
  }

  sortArray(array: Array<ServiceReportModel>): Array<ServiceReportModel> {
    for (let i = 0; i < array.length; i++) {
      array[i].startDate = array[i].startDate.slice(0, -13);
      array[i].finalDate = array[i].finalDate.slice(0, -13);
      let dateStartForSort = this.getDateForSort(array[i].startDate);
      array[i].startDay = this.getDayOfDate(dateStartForSort);
      let dateFinalForSort = this.getDateForSort(array[i].finalDate);
      array[i].finalDay = this.getDayOfDate(dateFinalForSort);
    }
    return array.sort(function (a, b) {
      if (a.startDay! > b.startDay!) { return 1; }
      if (a.startDay! < b.startDay!) { return -1; }
      return 0;
    })
  }

  getDateForSort(date: String): Date {
    let yearStartDate = date.slice(0, 4);
    let monthStartDate = (Number(date.slice(5, 7)) - 1);
    let dayStartDate = date.slice(8, 10);
    let dateStartForSort = new Date(Number(yearStartDate), Number(monthStartDate), Number(dayStartDate));
    return dateStartForSort
  }

  getDayOfDate(date: Date): number {
    let dateNumber = date.getDay()
    if (dateNumber === 0) {
      return 7
    } else {
      return dateNumber
    }
  }

  sortDifferentDateOfWeek(array: Array<ServiceReportModel>, numberOfWeek: number): Array<ServiceReportModel> {
    for (let i = 0; i < array.length; i++) {
      let element = array[i];
      let startDateParsed = this.getTransformedDate(array[i].startDate)
      let numberOfWeekStartDate = this.getNumberOfWeek(startDateParsed)
      let finalDateParsed = this.getTransformedDate(array[i].finalDate)
      let numberOfWeekFinalDate = this.getNumberOfWeek(finalDateParsed)
      if (numberOfWeekStartDate != numberOfWeek) {
        array.splice(i, 1);
        array.unshift(element);
      }
      if (numberOfWeekFinalDate != numberOfWeek) {
        array.splice(i, 1);
        array.push(element);
      }
    }
    return array
  }

  getNumberOfWeek(date: any): number {
    const DAY_IN_MILLISECOND = 1000 * 60 * 60 * 24;
    const DAYS_IN_A_WEEK = 7;
    const THURSDAY = 4;
    date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    let dayOfTheWeek = date.getUTCDay();
    if (dayOfTheWeek === 0) {
      dayOfTheWeek = 7;
    }
    date.setUTCDate(date.getUTCDate() - dayOfTheWeek + THURSDAY);
    let beginningOfTheYear: any = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    let differenceOfDatesInMilliseconds = date - beginningOfTheYear;
    return Math.ceil(((differenceOfDatesInMilliseconds / DAY_IN_MILLISECOND) + 1) / DAYS_IN_A_WEEK);
  }

  getTransformedDate(date: String): Date {
    let inicialYear = date.slice(0, -12)
    let inicialMonth = date.slice(5, 7)
    let inicialDay = date.slice(8, 10)
    let hour = date.slice(11, 13)
    let min = date.slice(14, 16)
    return new Date(Number(inicialYear), (Number(inicialMonth) - 1), Number(inicialDay), Number(hour), Number(min))
  }

  toNumber(number: String): number {
    return Number(number);
  }

  ngOnDestroy(): void {
    this.suscribeTechnicians$.unsubscribe();;
  }

}
