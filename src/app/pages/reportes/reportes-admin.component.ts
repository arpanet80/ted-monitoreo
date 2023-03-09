import { Platform } from '@angular/cdk/platform';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { AsistenciaService } from 'src/app/services/service.index';

@Component({
  selector: 'app-reportes-admin',
  templateUrl: './reportes-admin.component.html',
  styleUrls: ['./reportes-admin.component.css']

})
export class ReportesAdminComponent implements OnInit {

  //source : any = {report:"HelpDesk/rptMensual.trdp",parameters:"mes: '02'"};
  events: string[] = [];
  public botones = true;
  public selfecha = false;
  public selfechafunc = false;
  public selFuncionario = false;
  public selTecnico = false;
  selectedDate: Date = new Date();    // crea fecha actual
  nombres!: any[];
  nombresTecnicos!: any[];

  viewerContainerStyle = {
    position: 'relative',
    width: '1000px',
    height: '500px',
    left: '100px',
    right: '5px',
    ['font-family']: 'ms sans serif'
  };

  constructor(
    public datepipe: DatePipe,
    private _asistenciaService: AsistenciaService
    ) { }

  ngOnInit(): void {
    this.cargaNombresTecnicosCombo(4);    // Parametro 4 todos los tecnicos
    this.cargaNombresCombo();    // Parametro 4 todos los tecnicos
  }
  cargaNombresCombo() {
    this._asistenciaService.getComboNombres().subscribe({
      next: (resp) => {
        this.nombres = resp;
      },
    });
  }

  cargaNombresTecnicosCombo(tipo: number) {
    this._asistenciaService.getComboNombresTecnicos(tipo).subscribe({
      next: (resp) => {
        this.nombresTecnicos = resp;
        //console.log(this.nombresTecnicos);
      },
    });
  }

  /*addEvent(event: MatDatepickerInputEvent<Date>) {
    //this.isDisabled = true;
    //this.events.push(`${type}: ${event.value}`);
    let latest_date = this.datepipe.transform(`${event.value}`, 'dd-MM-yyyy');
    console.log(latest_date);
    //this.events.push(latest_date);
  }*/

  /*comboEvent(idpersonal: number){
    console.log(idpersonal);
  }*/

  reporteMensual(){
    this.selfecha = true;
    this.selFuncionario = false;
    this.selTecnico = false;
  }

  reporteFuncionario(){
    this.selfecha = false;
    this.selFuncionario = true;
    this.selTecnico = false;
  }

  reporteTecnico(){
    //console.log("Reporte Tecnico");
    this.selfecha = false;
    this.selFuncionario = false;
    this.selTecnico = true;
  }

  escondeTodo(){
    this.selfecha = false;
    this.selFuncionario = false;
    this.selTecnico = false;
  }

  escondeMensual(){
    //this.botones = true;
    this.selfecha = false;

    //console.log(this.datepipe.transform(this.selectedDate, 'yyyyMMdd'));
  }
  escondeSelFuncionario(){
    //this.botones = true;
    //this.selfechafunc = false;
    this.selFuncionario = false;
  }
  
  /*cargaReporteGeneral(){
    this.viewer1.refreshReport()
    this.source = {report:"HelpDesk/RptAsistencias.trdp",
                  parameters: {}};

    this.esVisible = true;
  }*/

  /*cargaReporteMensual(){
    this.source = {report:"HelpDesk/rptMensual.trdp",
                   parameters:"mes: '02'"};
    //this.esVisible = true;
  }*/


  ready() {
    //console.log('Reporte cargado');
  }
  viewerToolTipOpening(e: any, args: any) {
    //console.log('viewerToolTipOpening ' + args.toolTip.text);
  }

}
