import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
declare const gapi: any;

import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public auth2: any;
  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]
  });

  constructor(private route: Router, private fb: FormBuilder, private usuarioService: UsuarioService) { }
  ngOnInit(): void {
    this.renderButton();
  }


  login() {
    this.usuarioService.login(this.loginForm.value).subscribe(resp => {

      if (this.loginForm.get('remember')?.value) {
        localStorage.setItem('email', this.loginForm.get('email')?.value);
        console.log('Sesión iniciada con éxito, remember');
      } else {
        localStorage.removeItem('email');
        console.log('Sesión iniciada con éxito, no remember');
      }

    },
      (err) => {
        //Si sucede un Error
        swal.fire('Error', err.error.msg, 'error');
      });

    // this.route.navigateByUrl('/');
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();
  }

  startApp() {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '605386480090-5953hmbuha0n0sbu6rgc2htr9pjbuu5g.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  }

  attachSignin(element: any) {
    this.auth2.attachClickHandler(element, {},
      (googleUser: any) => {
        const id_token = googleUser.getAuthResponse().id_token;
        // console.log(id_token);
        this.usuarioService.googleLogin(id_token).subscribe();

        // TODO:  Mover al dashboard

      }, (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

}
