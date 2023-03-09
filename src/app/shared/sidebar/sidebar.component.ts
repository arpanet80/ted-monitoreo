import { Component, OnInit } from '@angular/core';
import { UserToken } from 'src/app/models';
import { UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  userToken!: UserToken;

  constructor(
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.userToken = this._usuarioService.GetTokenDecoded();
  }

}
