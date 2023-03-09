import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserLogin } from '../models';
import { UsuarioService } from '../services/service.index';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  form: FormGroup;
  loading: boolean;

  constructor(
    private router: Router,
    private fbuilder: FormBuilder,
    public _usuarioService: UsuarioService,
    private _snackBar: MatSnackBar,
    private toastr: ToastrService,

  ) {
    this.loading = false;
    this.form = this.fbuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    //this.toastr.success('Usuario registrado correctamente');
  }

  login() {

    // El boton de enviar solo se habilita si el frmulario es valido por lo que
    // el submit solo se hara con formulario valido

    const usuario = this.form.value.usuario;
    const password = this.form.value.password;

    let usuarioModelo = new UserLogin(usuario, password)

//console.log(usuarioModelo);

    this.loading = true;

    this._usuarioService.iniciaSesion(usuarioModelo)
            .subscribe( ok => {
                console.log("Respuesta", ok);

                          this.router.navigate(['/dashboard'])
                        },
                        error => {
                          this.loading = false;
                          this.error();
                          this.form.reset();
                        }
            );
  }

  error(){
    this._snackBar.open('Error en el inicio de sesion, revise los datos ingresados', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

}
