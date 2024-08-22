import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../core/services/authentication.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import swal from 'sweetalert';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule ,NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly _AuthenticationService = inject(AuthenticationService);

  private readonly _Router = inject (Router);

  private readonly _FormBuilder = inject(FormBuilder);

  isLoading:boolean = false;

  loginForm:FormGroup = this._FormBuilder.group({
    email:[null , [Validators.required , Validators.email]],
    password: [null , [Validators.required , Validators.pattern(/^\w{6,}$/)]]
  })

  loginSubmit():void{
    this._AuthenticationService.setLoginForm(this.loginForm.value).subscribe({
      next: (res)=>{
        this.isLoading = true;
        swal({
          text: 'logged in',
          icon: "success",
          timer:1000
        });
        if(res.message == "success"){
          setTimeout(()=>{
            localStorage.setItem('userToken' , res.token);
            this._AuthenticationService.saveUserData();
            this._Router.navigate(['/home'])
          } ,1000)
        }
      }
    })
  }

}