import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthenticationService = inject(AuthenticationService);
  private readonly _Router = inject(Router)

  userEmail: string = "";
  isLoading: boolean = false;
  step: number = 1;

  emailVerificationForm: FormGroup = this._FormBuilder.group({
    email: [null, Validators.email],
  });

  codeVerificationForm: FormGroup = this._FormBuilder.group({
    resetCode: [null]
  });

  ResetPasswordForm: FormGroup = this._FormBuilder.group({
    email: [this.userEmail, Validators.email],
    newPassword: [null, Validators.pattern(/^\w{6,}$/)]
  });

  verifyEmail(): void {
    this.isLoading = true;
    this._AuthenticationService.verifyUserEmail(this.emailVerificationForm.value).subscribe({
      next: (res) => {
        this.userEmail = this.emailVerificationForm.get('email')?.value;
        console.log(this.userEmail);

        // Update the email field in ResetPasswordForm
        this.ResetPasswordForm.get('email')?.setValue(this.userEmail);

        this.isLoading = false;
        this.step = 2;
        console.log(res);
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      }
    });
  }

  verifyCode(): void {
    this.isLoading = true;
    console.log(this.codeVerificationForm.value);

    this._AuthenticationService.verifyRestCode(this.codeVerificationForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.step = 3;
        console.log(res);
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      }
    });
  }

  changePassword(): void {
    this.isLoading = true;
    console.log(this.ResetPasswordForm.value);
    this._AuthenticationService.resetPassword(this.ResetPasswordForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        console.log(res);
        localStorage.setItem('userToken' , res.token);
        this._AuthenticationService.saveUserData();
        this._Router.navigate(['/home'])

      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      }
    });
  }
}
