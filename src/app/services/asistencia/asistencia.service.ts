import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})

// https://www.c-sharpcorner.com/blogs/dynamic-configuration-of-angular-api-url-using-docker-compose-yml-file
export class AsistenciaService {
  // confJson = {
  //   ApiUrl: ConfigJSon.apiServer.apiUrl,
  //   };
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  // Asistencias por Usuario y Tipo de asistencia 1 = Todas, 2 = Pendientes y 3 = Resueltas
  getAsistenciabyUser(idPersonal: number, tipo: number) {
    //let url = `${this.confJson.ApiUrl}Asistencia/getbyuser/${idPersonal}?tipo=${tipo}`;
    let url = `${environment.apiUrl}Asistencia/getbyuser/${idPersonal}?tipo=${tipo}`;
    return this.http.get<any>(url);
  }

  getAsistenciabyTecnico(idPersonal: number, tipo: number) {
    let url = `${environment.apiUrl}Asistencia/getbytecnico/${idPersonal}?tipo=${tipo}`;
    return this.http.get<any>(url);
  }

  getAsistenciaAdmin(tipo: number) {
    let url = `${environment.apiUrl}Asistencia/getbyadministrador?tipo=${tipo}`;
    return this.http.get<any>(url);
  }

  // Detalles de la asistencia
  getAsistenciaDetalle(idAsist: number) {
    let url = `${environment.apiUrl}Asistencia/getdetails/${idAsist}`;

    return this.http.get<any>(url);
  }

  getAsistenciaDetalleAtencion(idAsist: number) {
    let url = `${environment.apiUrl}Asistencia/getdetailsatencion/${idAsist}`;

    return this.http.get<any>(url);
  }

  getAsignacionTecnico(idTipoAsist: number) {
    let url = `${environment.apiUrl}Asistencia/getasignacion?idTipoAsistencia=${idTipoAsist}`;

    return this.http.get<any>(url);
  }

  getResumenUsuario(idUsuario: number) {
    let url = `${environment.apiUrl}Asistencia/resumenusuario/${idUsuario}`;

    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  getResumenTecnico(idUsuario: number) {
    let url = `${environment.apiUrl}Asistencia/resumentecnico/${idUsuario}`;

    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }



  // actualizaSolicittud(id: number, data: any) {
  //   let url = `${environment.apiUrl}Asistencia/updatesolicitud/${id}`;
  //   return this.http.put<any>(url, data);
  // }

  getResumen() {
    let url = `${environment.apiUrl}Asistencia/resumen`;

    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  getUsersByTipo(tipo: number) {
    let url = `${environment.apiUrl}Asistencia/getusersbytipo?tipo=${tipo}`;

    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  getUsersByTeam(tipo: number) {
    let url = `${environment.apiUrl}Asistencia/getusersbyteam?tipo=${tipo}`;

    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  insertAsistencia(data: any) {
    let url = `${environment.apiUrl}Asistencia`;
    return this.http.post<any>(url, data);
  }

  insertAsignacionEquipo(data: any[], tipo: number) {
    let url = `${environment.apiUrl}Asistencia/asignaequipo?tipo=${tipo}`;
    return this.http.post<any>(url, data);
  }

  insertAsignacionAsistencia(data: any) {
    let url = `${environment.apiUrl}Asistencia/asignarasistencia`;  //?tipo=${data.tipo}`;
    return this.http.post<any>(url, data);
  }

  insertAtencion(data: any) {
    let url = `${environment.apiUrl}Asistencia/atencion`;
    return this.http.post<any>(url, data);
  }

  deleteAsignacionEquipo(idresp: number) {
    let url = `${environment.apiUrl}Asistencia/deleteresponsable/${idresp}`;
    return this.http.put<any>(url, null);
  }

  // insertAsignacion(data: any) {
  //   let url = `${environment.apiUrl}Asistencia/asignacion`;
  //   return this.http.post<any>(url, data);
  // }


  getCombos() {
    let url = `${environment.apiUrl}Asistencia/getcombos`;

    return this.http.get<any>(url).pipe(
      map((resp) => resp) // no se esta filtrando nada en la respuesta
    );
  }

  //////////// ANTERIOR DESDE LA API DANTE ///////////////
  // getComboNombres() {
  //   let url = `${environment.apiUrl}Asistencia/getcombonombres`;

  //   return this.http.get<any>(url).pipe(
  //     map((resp) => resp)
  //   );
  // }

  getComboNombres() {
    let url = `${environment.apiUsuarios}usuario`;

    return this.http.get<any>(url).pipe(
      map((resp: any) => {

        // arreglo para guardar los objetos transformados
        let nombresArray: any[] = [];
        // iterar las keys del objeto
        Object.keys(resp).forEach(k => {
          // insertar el nuevo objeto
          nombresArray.push({
            id: resp[k].id,
            nombre: resp[k].nombres.toUpperCase() + ' ' + resp[k].apPaterno.toUpperCase() + ' ' + resp[k].apMaterno.toUpperCase()
          });
        });

        //console.log(nombresArray);
        return nombresArray;
      })
    );
  }

  getComboNombresTecnicos(tipo: number) {
    let url = `${environment.apiUrl}Asistencia/getlistatecnicos?tipo=${tipo}`;
    return this.http.get<any>(url).pipe(
      map((resp: any) => {

        // arreglo para guardar los objetos transformados
        let nombresArray: any[] = [];
        // iterar las keys del objeto
        Object.keys(resp).forEach(k => {
          // insertar el nuevo objeto
          nombresArray.push({
            id: resp[k].id,
            idtipoasistencia: resp[k].idtipoasistencia,
            activo: resp[k].activo,
            nombre: resp[k].nombre.toUpperCase()
          });
        });

        return nombresArray;
      })
    );
  }

}
