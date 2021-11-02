import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";

import { environment } from 'src/environments/environment';
import { CargarUsuariosResp } from '../interfaces/cargar-usuarios.interface';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.model';

declare const gapi: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario!: Usuario;


  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {

    this.googleInit();

  }

  get token(): string {
    return localStorage.getItem('token') || '';

  }
  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }


  validarToken(): Observable<boolean> {

    return this.http.get(`${base_url}/login/renew`, this.headers).pipe(
      map((resp: any) => {
        const { name, email, google, img, role, uid } = resp.usuario;
        this.usuario = new Usuario(name, email, '', google, img, role, uid);
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError(error => of(false))
    );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token)
      })
    )

  }

  actualizarUsuario(data: { email: string, name: string, role: string }) {

    data = {
      ...data,
      role: this.usuario.role!
    };

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers)

  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token)
      })
    )
  }

  googleInit() {

    return new Promise<void>(resolve => {

      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '605386480090-5953hmbuha0n0sbu6rgc2htr9pjbuu5g.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin'
        });

        resolve();
      });

    })
  }

  googleLogin(googleToken: any) {
    return this.http.post(`${base_url}/login/google`, { token: googleToken })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      )
  }

  logout() {
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {

        this.router.navigateByUrl('/login');

      })
    });
  }

  cargarUsuarios(desde: number = 0, numRegistros: number = 5) {
    const url = `${base_url}/usuarios?desde=${desde}&numRegistros=${numRegistros}`;
    return this.http.get<CargarUsuariosResp>(url, this.headers);

  }



}
