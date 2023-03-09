import { Routes, RouterModule } from "@angular/router";
import { LoginGuardGuard } from "../services/service.index";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PagesComponent } from "./pages.component";

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [ LoginGuardGuard ],
    children: [
      //{ path: 'dashboard', component: DashboardComponent , data: {titulo: 'Dashboard'} },
      { path: 'dashboard', component: DashboardComponent, data: {titulo: ''} },
      // { path: 'asistencias', component: AsistenciasListaUserComponent, data: {titulo: 'Asistencias Tecnicas'}  },
      // { path: 'asistenciastecnico', component: AsistenciasListaTecComponent, data: {titulo: 'Asistencias Tecnicas (Tecnico)'}  },
    ]
  }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes )

