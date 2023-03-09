import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatRadioChange } from '@angular/material/radio';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ResumenAsistencia, AsistenciaModel } from 'src/app/models';
import { AsistenciaService, UsuarioService } from 'src/app/services/service.index';
import { NuevoComponent } from './nuevo.component';

@Component({
  selector: 'app-asistencias-lista-user',
  templateUrl: './asistencias-lista-user.component.html',
  styleUrls: ['./asistencias-lista-user.component.css']
})
export class AsistenciasListaUserComponent implements AfterViewInit {

  btnStyle = 'btn btn-default';
  loading: boolean;
  valorRadio: number = 0;

  resumenAsistencias!: ResumenAsistencia;
  //resumenAsistencias!: Observable<ResumenAsistencia>;


  // Definicion d la tabla
  displayedColumns: string[] = ['id', 'titulo', 'prioridad', 'estadoasistencia', 'fechasolicitud', 'responsable', 'acciones'];
  dataSource = new MatTableDataSource<AsistenciaModel>([]);
  //dataSource!: MatTableDataSource<AsistenciaModel>;         // datos para la tabla

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _asistenciaService: AsistenciaService,
    private _userService: UsuarioService,
    public dialog: MatDialog,
  ) {
    this.getResumen();
    this.loading = false;
   }

   ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.cargaAsistencias(1);
  }

  getResumen() {

    this._asistenciaService.getResumenUsuario(this._userService.GetTokenDecoded().idUsuario).subscribe(
      resp => {
        this.resumenAsistencias = resp;
      }
    );

    //this.resumenAsistencias = JSON.parse(localStorage.getItem('resumen')!);
    //localStorage.removeItem('resumen');

  }

  cargaAsistencias(tipo: number) {

    this.loading = true;

    //console.log(this._userService.GetTokenDecoded().idUsuario);

    this._asistenciaService.getAsistenciabyUser(this._userService.GetTokenDecoded().idUsuario, tipo)
      .subscribe({
        next: (resp) => {
          this.dataSource.data = resp;
          this.loading = false;

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(idAsist: number) {

    let dialogRef = this.dialog.open(NuevoComponent, {
      width: '50%',
      autoFocus: true,
      panelClass: 'custom-dialog-panel-class',
      disableClose: true,
      //backdropClass: 'custom-dialog-backdrop-class',

      data: {                        // Envia al modal
        id: idAsist
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.data) {
        this.cargaAsistencias(this.valorRadio);
      }

      //console.log('The dialog was closed', result);
      //this.dialogValue = result.data;
    });

  }

  radioChange(event: MatRadioChange, data: any) {
    console.log(event.value);
    this.valorRadio = event.value;
    this.cargaAsistencias(event.value);

  }

}
