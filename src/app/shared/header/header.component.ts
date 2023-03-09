import { Component, OnInit } from '@angular/core';
import { UserToken } from 'src/app/models';
import { UsuarioService, SidebarService } from 'src/app/services/service.index';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userToken!: UserToken;

  constructor(
    public _usuarioService: UsuarioService,
    public _menu: SidebarService
  ) { }

  ngOnInit(): void {
    this.userToken = this._usuarioService.GetTokenDecoded();
  }

}
