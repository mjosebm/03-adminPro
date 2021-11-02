import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public profileForm!: FormGroup;
  public usuario: Usuario;
  public imageChange!: File;
  public imgTemp : any = null;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private fileUploadService: FileUploadService) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [this.usuario.name, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    })
  }

  profileUpdate() {
    console.log(this.profileForm.value);
    this.usuarioService.actualizarUsuario(this.profileForm.value).subscribe(() => {
      const { name, email } = this.profileForm.value;
      this.usuario.name = name;
      this.usuario.email = email;

      Swal.fire('Saved', 'The changes have been saved', 'success');
    },
    (err)=>{
      Swal.fire('¡Error!', err.error.msg, 'error');

    });

  }

  onChangeImagen(event: any) {
    this.imageChange = event.target!.files[0];

    if (!this.imageChange) { return this.imgTemp = null; }

    const reader = new FileReader();
    reader.readAsDataURL(this.imageChange);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

    return;
  }

  imageUpdate() {

    this.fileUploadService.actualizarImagen(this.imageChange, 'usuarios', this.usuario.uid!).then(img => {
      this.usuario.img = img;
      Swal.fire('Saved', 'The image has been updated', 'success');
    }).catch( err => {
      console.log(err);
      Swal.fire('¡Error!', 'No se pudo actualizar la imagen', 'error');
    });

  }

}
