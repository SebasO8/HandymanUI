import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceReportModel } from 'src/app/core/models/serviceReport.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class ServiceReportService {
  private readonly uriServices = `${environment.uriBase}create`;

  constructor(private readonly http: HttpClient) { }

  postServiceReport(body: ServiceReportModel): Observable<any> {
    return this.http.post(this.uriServices, body);
  }
}
