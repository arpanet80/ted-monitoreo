import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogContent, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AsistenciaDetalle, Prioridad, TipoAsistencia, UserToken } from 'src/app/models';
import { EstadoAsistencia, OrigenAsistencia } from 'src/app/models/index';
import { AsistenciaService, UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {

  form: FormGroup;
  asistencia!: AsistenciaDetalle;

  tipoasistencia!: any[];
  tipoequipo!: any[];
  prioridad!: any[];
  origen!: any[];

  userToken!: UserToken;

  estadoEnum = EstadoAsistencia;
  origenEnum = OrigenAsistencia;
  tipoasistenciaEnum = TipoAsistencia;
  prioridadEnum = Prioridad;

  currentDateTime: string;

  constructor(
    private fbuilder: FormBuilder,
    private _asistenciaService: AsistenciaService,
    private router: Router,
    private toastr: ToastrService,
    private _usuarioService: UsuarioService,
    private datepipe: DatePipe,

    private dialogRef: MatDialogRef<NuevoComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    // Transforma la fecha a formato UTC compatible con la API
    this.currentDateTime = this.datepipe.transform((new Date), 'yyy-MM-ddThh:mm:ss')!;

    this.userToken = this._usuarioService.GetTokenDecoded();

    this.form = this.fbuilder.group({
      id: [0, Validators.required],
      idpersonal: [this.userToken.idUsuario, Validators.required],
      idestadoasistencia: this.estadoEnum.iniciada,
      idtipoasistencia: [this.tipoasistenciaEnum.software, Validators.required],
      idtipoequipo: ['', Validators.required],
      titulo: ['', Validators.required],
      descripcion: [''],   //['', Validators.required],
      idprioridad: [this.prioridadEnum.baja, Validators.required],
      idorigensolicitud: [this.origenEnum.web, Validators.required],
      fechasolicitud: this.currentDateTime, // '2022-10-11T03:56:47.827Z',
      idmostrado: "0"
    })
  }

  ngOnInit(): void {
    this.cargaCombos();
    this.cargaFormParaEditar(this.data.id);
  }

  cargaFormParaEditar(id: number) {

    if (id > 0) {
      this._asistenciaService.getAsistenciaDetalle(id)
        .subscribe({
          next: (resp) => {
            this.asistencia = resp;

            this.form.patchValue({
              id: this.asistencia.id,
              idpersonal: this.asistencia.idpersonal,
              idestadoasistencia: this.asistencia.idestadoasistencia,
              idprioridad: this.asistencia.idprioridad,
              idorigensolicitud: this.asistencia.idorigensolicitud,
              idtipoasistencia: this.asistencia.idtipoasistencia,
              idtipoequipo: this.asistencia.idtipoequipo,
              titulo: this.asistencia.titulo,
              descripcion: this.asistencia.descripcion,
              fechasolicitud: this.asistencia.fechasolicitud,
              idmostrado: this.asistencia.id
            });

            if (this.asistencia.idestadoasistencia == this.estadoEnum.resuelto) {
              this.form.controls['titulo'].disable();
              this.form.controls['descripcion'].disable();
              this.form.controls['idprioridad'].disable();
              this.form.controls['idorigensolicitud'].disable();
              this.form.controls['idtipoasistencia'].disable();
              this.form.controls['idtipoequipo'].disable();
            }

          }
        });
    }
  }

  registtrarAsistencia() {

    if (this.form.value.idestadoasistencia == this.estadoEnum.resuelto) {
      this.dialogRef.close({ event: 'close', data: false });
    }
    else
    if (this.form.valid) {

      //console.log(this.form.value);

      this._asistenciaService.insertAsistencia(this.form.value)
      .subscribe({
        next: (resp) => {

          this.toastr.success('El registro se inserto correctamente!', 'Exito!!!');
          this.form.reset();
          this.dialogRef.close({ event: 'save', data: true });
        },
          // error:(err) => {
          //   this.goToHome();
          // }
        });
    }
  }

  cargaCombos() {

    this._asistenciaService.getCombos()
      .subscribe({
        next: (resp) => {
          this.tipoasistencia = resp[0];
          this.tipoequipo = resp[1];
          this.prioridad = resp[2];
          this.origen = resp[3];

          //console.log(this.tipoasistencia[0].tipoasistencia);
        },
        error: (err) => {
          this.form.reset();
          this.dialogRef.close('save');
        }
      });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: false });       // this.fromDialog });
  }

}
