import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  UsuarioService,
  LoginGuardGuard
} from './service.index';

@NgModule({
  imports:[
    CommonModule
  ],
  providers: [
    UsuarioService,
    LoginGuardGuard
  ],
  declarations: []
})

export class ServiceModule {}
