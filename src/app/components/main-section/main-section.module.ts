//modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';



//routing
import { MainSectionRoutingModule } from './main-section-routing.module';

//components
import { ServiceReportFormComponent } from './service-report-form/service-report-form.component';
import { QueryHoursWeekComponent } from './query-hours-week/query-hours-week.component';

//materialize
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { TechnicianService } from 'src/app/shared/services/technician-service/technician.service';
import { ServicesService } from 'src/app/shared/services/services-service/services.service';
import { ServiceReportService } from 'src/app/shared/services/serviceReport-service/service-report.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    ServiceReportFormComponent,
    QueryHoursWeekComponent
  ],
  imports: [
    CommonModule,
    MainSectionRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  providers: [TechnicianService, ServicesService, ServiceReportService],
})
export class MainSectionModule { }
