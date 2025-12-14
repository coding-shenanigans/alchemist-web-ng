import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

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
  signInForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    showPassword: new FormControl(false),
  });

  toggleShowPassword(event: MouseEvent) {
    event.preventDefault();
    const currentValue = this.signInForm.value.showPassword;
    this.signInForm.controls.showPassword.setValue(!currentValue);
  }

  onSubmit() {
    console.log(this.signInForm.value);
  }
}
