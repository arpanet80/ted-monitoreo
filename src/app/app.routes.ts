import { RouterModule, Routes } from "@angular/router";
import { NopagefoundComponent } from "./shared/nopagefound/nopagefound.component";
import { LoguedGuardGuard } from "./services/service.index";
import { LoginComponent } from "./login/login.component";

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [ LoguedGuardGuard ] },
  { path: '**', component: NopagefoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true })

