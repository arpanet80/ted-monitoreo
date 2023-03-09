import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TokenInterceptorService } from './interceptors/token-interceptor.service';
import { ErrorInterceptor } from './interceptors/error.interceptor';

// Angular Material
import { MaterialSharedModule } from './material-shared.module';

// Modulos
import { PagesModule } from './pages/pages.module';


// Servicios
import { ServiceModule } from './services/service.module';


// Rutas
import { APP_ROUTES } from 'src/app/app.routes';

// ngx-toastr
//import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// JWT Decode
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    APP_ROUTES,
    PagesModule,
    ServiceModule,
    MaterialSharedModule,
    FormsModule,
    ReactiveFormsModule,

    //------------ Para ngx-toastr ----------
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi:true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
