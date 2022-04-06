import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QueryHoursWeekComponent } from './query-hours-week/query-hours-week.component';
import { ServiceReportFormComponent } from './service-report-form/service-report-form.component';

const routes: Routes = [
  {path: '', redirectTo: 'service-report', pathMatch: 'full'},
  {path: 'service-report', component: ServiceReportFormComponent},
  {path: 'query-hours-week', component: QueryHoursWeekComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainSectionRoutingModule { }
