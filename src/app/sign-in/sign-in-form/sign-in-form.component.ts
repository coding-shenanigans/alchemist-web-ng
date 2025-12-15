import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth-service';

@Component({
  selector: 'app-sign-in-form',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.scss',
})
export class SignInForm {
  errorMessage = signal('');

  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    showPassword: new FormControl(false),
  });

  constructor(private authService: AuthService) {}

  toggleShowPassword(event: MouseEvent) {
    event.preventDefault();
    const currentValue = this.signInForm.value.showPassword;
    this.signInForm.controls.showPassword.setValue(!currentValue);
  }

  onSubmit() {
    if (this.signInForm.invalid) {
      return;
    }

    this.errorMessage.set('');

    // TODO: do not submit the exclamation marks!
    this.authService
      .signIn(this.signInForm.value.email!, this.signInForm.value.password!)
      .subscribe({
        next: (data) => {
          console.log('Data fetched successfully:', data);
        },
        error: (err) => {
          console.error('Error fetching data:', err);
        },
        complete: () => {
          console.log('Observable completed.');
        },
      });
  }

  // onSubmit2(): void {
  //   const credentials: SignInCredentials = this.signInForm.value;

  //   // 1. Call the service to send the request
  //   this.authService.signIn(credentials).subscribe({
  //     next: (response) => {
  //       // 2. SUCCESS: Handle successful sign-in
  //       console.log('Sign-in successful!', response);

  //       // A common step is to store the received token (e.g., in localStorage)
  //       // localStorage.setItem('auth_token', response.token);

  //       // 3. Redirect the user
  //       this.router.navigate(['/dashboard']);
  //     },
  //     error: (error) => {
  //       // 4. ERROR: Handle API errors (e.g., invalid credentials)
  //       console.error('Sign-in error:', error);
  //       // Display a user-friendly error message from the backend response
  //       this.errorMessage = error.error?.message || 'Invalid email or password.';
  //     },
  //   });
  // }
}
