import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { AuthenticationService } from '../../core/services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import swal from 'sweetalert';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{

    private readonly _AuthenticationService =  inject(AuthenticationService);

    private readonly _FormBuilder = inject(FormBuilder);

    private readonly _Router = inject(Router);

    msgError:string = "";

    isLoading:boolean = false;


    constructor(private _FlowbiteService:FlowbiteService){
    }


    ngOnInit(): void {
        this._FlowbiteService.loadFlowbite((flow)=>{})
    }

    registerForm:FormGroup = this._FormBuilder.group({
      name:[null,[Validators.required , Validators.minLength(3) , Validators.maxLength(20)]],

      email: [null , [Validators.required , Validators.email]],

      password: [null , [Validators.required , Validators.pattern(/^\w{6,}$/)]],

      rePassword: [null],

      phone: [null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]]
    }
    ,{validators:[this.confirmPassword]}
  )

    // registerForm:FormGroup = new FormGroup({

    //   name:new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]),

    //   email:new FormControl(null , [Validators.required , Validators.email]),

    //   password:new FormControl(null , [Validators.required , Validators.pattern(/^\w{6,}$/)]),

    //   rePassword:new FormControl(null,[Validators.required , Validators.pattern(/^\w{6,}$/)]),

    //   phone:new FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
    // } , this.confirmPassword);


    registerSubmit():void{
        if(this.registerForm.valid){
          this.isLoading = true;
          this._AuthenticationService.setRegisterForm(this.registerForm.value).subscribe(
            {
              next: (res)=>{
                console.log(res);
                this.isLoading=false;
                swal({
                  text: 'registration completed successfully',
                  icon: "success",
                  timer:1000
                });
                if(res.message == "success"){
                  setTimeout(
                    ()=>{
                      this._Router.navigate(['/login'])
                    }
                    ,1000)
                }

              }

              ,
              error: (err : HttpErrorResponse) => {
                this.msgError = err.message;
                this.isLoading=false;
                swal({
                  text: this.msgError,
                  icon: "error",
                });
              },


            }
          );

        }else{
          this.registerForm.setErrors({mismatch:true});
          this.registerForm.markAllAsTouched()
        }
    }

    confirmPassword (g:AbstractControl){
      return g.get('password')?.value == g.get('rePassword')?.value ? null : {'mismatch' : true};
    }

}
