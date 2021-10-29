import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    console.log('Paso por el canActivate AuthGuard');
    return this.usuarioService.validarToken()
      .pipe(
        tap( estaAutenticado => {
          if (!estaAutenticado) {
            this.router.navigateByUrl('/login');
          }
        })
      );
  }

}
