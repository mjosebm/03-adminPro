import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  public desde : number = 0;
  public numRegistros : number = 5;

  public totalUsuarios : number = 0
  public usuarios : Usuario[] = [];

  constructor(private usuarioService : UsuarioService) {

    
   }

  ngOnInit(): void {

    this.usuarioService.cargarUsuarios(this.desde, this.numRegistros).subscribe( ({totalRegistros, usuarios}) => {
      this.totalUsuarios = totalRegistros;
      this.usuarios = usuarios;
    });

  }

}
