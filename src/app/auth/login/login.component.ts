import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public formSubmitted = false;

  public loginForm = this.fb.group({
    email : ['test@majo.com', [Validators.required,Validators.email]],
    password : ['12345', Validators.required],
    remember: [false]
  });

  constructor(private route: Router, private fb: FormBuilder, private usuarioService : UsuarioService) { }


  login() {
    this.usuarioService.login( this.loginForm.value ).subscribe( resp => {
      console.log('Sesión iniciada con éxito');
      console.log(resp);

    },
    (err) => {
//Si sucede un Error
swal.fire('Error', err.error.msg, 'error');
    });
    
    // this.route.navigateByUrl('/');
  }

}
