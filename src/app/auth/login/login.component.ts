import { Component, NgZone, OnInit } from '@angular/core';
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

  constructor(private route: Router, private fb: FormBuilder, private usuarioService: UsuarioService, private ngZone: NgZone) { }
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

      // Navegar al Dashboard
      this.route.navigateByUrl('/');

    },
      (err) => {
        //Si sucede un Error
        swal.fire('Error', err.error.msg, 'error');
      });


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

  async startApp() {

    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));

  }

  attachSignin(element: any) {
    this.auth2.attachClickHandler(element, {},
      (googleUser: any) => {
        const id_token = googleUser.getAuthResponse().id_token;
        this.usuarioService.googleLogin(id_token).subscribe(resp => {

          this.ngZone.run(() => {

            // Navegar al Dashboard
            this.route.navigateByUrl('/');

            console.log('Sesión exitosa con google');

          })
        });


      }, (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

}
