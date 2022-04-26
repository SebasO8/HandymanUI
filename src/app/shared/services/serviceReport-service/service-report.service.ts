import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceReportModel, weekQuery } from 'src/app/core/models/serviceReport.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class ServiceReportService {
  private readonly uriServices = `${environment.uriBase}create`;
  private readonly uriWeekServices =`${environment.uriBase}query-service-report`

  constructor(private readonly http: HttpClient) { }

  postServiceReport(body: ServiceReportModel): Observable<any> {
    return this.http.post(this.uriServices, body);
  }

  getWeekServiceReport(body: weekQuery): Observable<any> {
    const headers = new HttpHeaders({
      'technicianId': `${body.technicianId}`,
      'weekNumber': `${body.weekNumber}`
    });
    return this.http.get<ServiceReportModel>(this.uriWeekServices, {headers: headers});
  }


}
