import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Dashboard } from './features/dashboard/dashboard/dashboard';
import { Projects } from './features/projects/projects/projects';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'projects', component: Projects },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
