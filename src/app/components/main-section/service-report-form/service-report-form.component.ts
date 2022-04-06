import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { catchError, Observable, Subscription, tap, throwError } from 'rxjs';
import { DateModel, ServiceReportModel, ServiceReportUIModel } from 'src/app/core/models/serviceReport.model';
import { ServicesModel } from 'src/app/core/models/services.model';
import { TechnicianModel } from 'src/app/core/models/technician.model';
import { ServiceReportService } from 'src/app/shared/services/serviceReport-service/service-report.service';
import { ServicesService } from 'src/app/shared/services/services-service/services.service';
import { TechnicianService } from 'src/app/shared/services/technician-service/technician.service';

@Component({
  selector: 'app-service-report-form',
  templateUrl: './service-report-form.component.html',
  styleUrls: ['./service-report-form.component.css']
})
export class ServiceReportFormComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  technicians: Array<TechnicianModel> = [];
  services: Array<ServicesModel> = [];
  form!: FormGroup;
  suscribeTechnicians$!: Subscription;
  suscribeServices$!: Subscription;
  suscribeServiceReport$!: Subscription;

  constructor(private fb: FormBuilder,
    private readonly techniciansService: TechnicianService,
    private readonly ServicesService: ServicesService,
    private _snackBar: MatSnackBar,
    private readonly serviceReportService: ServiceReportService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.suscribeTechnicians$ = this.getObservableAllTechnicians().subscribe();
    this.suscribeServices$ = this.getObservableAllServices().subscribe();
  }

  createForm(): void {
    this.form = this.fb.group({
      technicianId: ["", Validators.required],
      serviceId: ["", Validators.required],
      startDate: ["", Validators.required],
      startHour: ["", Validators.required],
      finalDate: ["", Validators.required],
      finalHour: ["", Validators.required],
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

  getObservableAllServices(): Observable<ServicesModel> {
    return this.ServicesService.getAllServices().pipe(
      tap((services: any) => {
        for (const item in services) {
          this.services.push(services[item]);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.log('Executin error...', error)
        alert('Error al consumir el servicio');
        return throwError(error);
      })
    );
  }

  onClickSubmit(): void {
    const report: ServiceReportUIModel = this.form.value;
    let dateisValid = this.validateDates(report)
    if (dateisValid) {
      let serviceReport = this.parseServiReport(report);
      this.suscribeServiceReport$ = this.postServiceReport(serviceReport).subscribe();
      this.form.reset();
      this.suscribeServiceReport$.unsubscribe();
    } else {
      this.openSnackBar("La fecha final no puede ser mayor a la fecha inicial");
      this.form.reset();
    }
  }

  validateDates(report: ServiceReportUIModel): Boolean {
    let starDateParse = this.getDates(report.startDate, report.startHour);
    let finalDateParse = this.getDates(report.finalDate, report.finalHour);
    let startDate = this.parseDate(starDateParse);
    let finalDate = this.parseDate(finalDateParse);
    if (startDate <= finalDate) {
      return true
    } else {
      return false;
    }
  }

  parseServiReport(report: ServiceReportUIModel) {
    return {
      technicianId: report.technicianId,
      serviceId: report.serviceId,
      startDate: `${report.startDate}T${report.startHour}`,
      finalDate: `${report.finalDate}T${report.finalHour}`
    }
  }

  postServiceReport(body: ServiceReportModel): Observable<ServiceReportModel> {
    return this.serviceReportService.postServiceReport(body).pipe(
      tap((serviceReport) => {
        this.openSnackBar(`Se guardo el reporte de servicio ${serviceReport.id}`);
      }),
      catchError((error: HttpErrorResponse) => {
        console.log('Executin error...', error)
        alert('Error al consumir el servicio');
        return throwError(error);
      })
    );
  }

  getDates(date: String, hours: String): DateModel {
    return {
      inicialYear: date.slice(0, -6),
      inicialMonth: date.slice(5, 7),
      inicialDay: date.slice(8, 10),
      hour: hours.slice(0, 2),
      min: hours.slice(3, 5)
    }
  }

  parseDate(date: DateModel): any {
    return new Date(
      Number(date.inicialYear),
      Number(date.inicialMonth) - 1,
      Number(date.inicialDay),
      Number(date.hour),
      Number(date.min),
    );
  }

  openSnackBar(message: string): void {
    this._snackBar.open(`${message}`, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 4000,
    });
  }

  ngOnDestroy(): void {
    this.suscribeTechnicians$.unsubscribe();
    this.suscribeServices$.unsubscribe();
  }

}
