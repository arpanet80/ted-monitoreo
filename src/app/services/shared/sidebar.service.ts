import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    // {
    //   titulo: 'INICIO', url: '/dashboard',
    //   icono: 'mdi mdi-gauge',
    //   submenu: [
    //     { titulo: 'dashboard', url: '/dashboard' },
    //     { titulo: 'progress', url: '/progress' }
    //   ]
    // },
    { titulo: 'INICIO', url: '/dashboard', rol:'Admin'},
    { titulo: 'ASISTENCIA TECNICA', url: '/asistencias'  },
    { titulo: 'ASISTENCIA TEC', url: '/asistenciastecnico'  },
    { titulo: 'ASISTENCIA ADMIN', url: '/asistenciasadmin'  },
    //{ titulo: 'ASISTENCIA GENERAL', url: '/progress'  },
    //{ titulo: 'REPORTES INFRA', url: '/dashboard'  }
  ];
  constructor() { }
}
