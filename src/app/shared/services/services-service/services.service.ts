import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicesModel } from 'src/app/core/models/services.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class ServicesService {
  private readonly uriServices = `${environment.uriBase}all-services`;

  constructor(private readonly http: HttpClient) { }

  getAllServices(): Observable<ServicesModel> {
    return this.http.get<ServicesModel>(this.uriServices);
  }
}
