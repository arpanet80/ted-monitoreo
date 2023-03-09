import { NgModule } from "@angular/core";
import { ShareModule } from "../shared/shared.module";
import { PAGES_ROUTES } from "./pages.routes";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PipesModule } from "../pipes/pipes.module";
import { MaterialSharedModule } from "../material-shared.module";
import { CommonModule } from "@angular/common";
import { DatePipe } from '@angular/common';
import { TelerikReportingModule } from "@progress/telerik-angular-report-viewer";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProfileComponent } from './profile/profile.component';
import { PagesComponent } from "./pages.component";
import { NuevoComponent } from './asistencias/nuevo.component';
import { AsistenciasListaUserComponent } from "./asistencias/asistencias-lista-user.component";
import { ReportesAdminComponent } from './reportes/reportes-admin.component';


@
NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    ProfileComponent,
    AsistenciasListaUserComponent,
    NuevoComponent,
    ReportesAdminComponent,
  ],
  exports: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    ShareModule,
    MaterialSharedModule,
    PAGES_ROUTES,
    FormsModule,
    PipesModule,
    ReactiveFormsModule,
    TelerikReportingModule,
  ],
  providers: [DatePipe],
})

export  class PagesModule {}
