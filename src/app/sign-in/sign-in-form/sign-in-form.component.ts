import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthApi } from '../../auth-api';
import { finalize } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-sign-in-form',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterLink,
    MatProgressSpinnerModule,
  ],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.scss',
})
export class SignInForm {
  private formBuilder = inject(FormBuilder).nonNullable;
  private router = inject(Router);
  private authApi = inject(AuthApi);

  isLoading = signal(false);
  errorMessages = signal<string[]>([]);

  signInForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    showPassword: [false],
  });

  toggleShowPassword(event: MouseEvent) {
    event.preventDefault();
    const currentValue = this.signInForm.value.showPassword;
    this.signInForm.controls.showPassword.setValue(!currentValue);
  }

  handleSubmit() {
    if (this.signInForm.invalid) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessages.set([]);

    const { email, password } = this.signInForm.getRawValue();

    this.authApi
      .signIn(email, password)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (data) => {
          // TODO: set user in app state
          console.log('Signed in successfully:', data);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Failed to sign in:', error);
          this.errorMessages.set(error.error?.errors ?? ['unknown error']);
        },
      });
  }
}
