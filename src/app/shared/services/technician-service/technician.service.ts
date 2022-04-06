import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TechnicianModel } from 'src/app/core/models/technician.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class TechnicianService {

  private readonly uriTechnicians = `${environment.uriBase}all-technician`;

  constructor(private readonly http: HttpClient) { }

  getAllTechnicians(): Observable<TechnicianModel>{
    return this.http.get<TechnicianModel>(this.uriTechnicians);
  }
}
