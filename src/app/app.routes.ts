import { Routes } from '@angular/router';
import { Layout } from './layout/layout.component';
import { SignIn } from './sign-in/sign-in.component';
import { SignUp } from './sign-up/sign-up.component';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
  },
  {
    path: 'signin',
    component: SignIn,
  },
  {
    path: 'signup',
    component: SignUp,
  },
];
