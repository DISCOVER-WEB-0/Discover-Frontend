import { Component } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { usuario } from 'src/app/models/usuario.interface';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  myForm!:FormGroup;
  id!:number;
  currentDate: Date;

  constructor(private formBuilder:FormBuilder, private UsuarioService:UsuarioService,
    private router:Router, private activatedRoute:ActivatedRoute,
    private snackBar:MatSnackBar){
      this.currentDate = new Date();
    }

    ngOnInit(){
      this.reactiveForm();
    }

    reactiveForm():void{
      this.myForm = this.formBuilder.group({
        name:["",[Validators.required, Validators.maxLength(60)]],
        apellidop:["",[Validators.required, Validators.maxLength(60)]],
        apellidom:["",[Validators.required, Validators.maxLength(60)]],
        email:["",[Validators.required, Validators.maxLength(60)]],
        password:["",[Validators.required, Validators.maxLength(20)]],
        phone:["",[Validators.required, Validators.maxLength(9)]],
        dni:["",[Validators.required, Validators.maxLength(8)]]
      });
  }
  saveUsuario():void{
    const usuario:usuario ={
      id: parseInt(this.myForm.get("id")!.value),
      nombre: this.myForm.get("name")!.value,
      apellido_paterno: this.myForm.get("apellidop")!.value,
      apellido_materno: this.myForm.get("apellidom")!.value,
      correo:this.myForm.get("email")!.value,
      password: this.myForm.get("password")!.value,
      telefono: this.myForm.get("phone")!.value,
      dni: this.myForm.get("dni")!.value,
      fecha_nacimiento:(this.currentDate!.valueOf.toString()),
      fecha_inscripcion:(this.currentDate!.valueOf.toString()),
      link_foto_dni: this.myForm.get("")!.value,
      link_foto_perfil:this.myForm.get("")!.value,
    }

    this.UsuarioService.addUsuario(usuario).subscribe({
      next: (data) =>{
        this.router.navigate(["/register"]);
        this.snackBar.open("El usuario se ingresó correctamente","OK",{duration:3000});
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  volverLogin():void{
    this.router.navigate(["/login"]);
  }





}
