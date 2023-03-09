import { Pipe, PipeTransform } from '@angular/core';
//import { UsuarioService } from '../services/service.index';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  // constructor(
  //   public _servicioUsuario: UsuarioService
  // ){}

  transform(img: string, ...args: unknown[]): unknown {

    //let url = 'https://es.web.img2.acsta.net/c_310_420/pictures/17/01/20/12/42/192403.jpg';

    // Aqui se hacen transformaciones a la url si se requiere

    return img;
  }

}
