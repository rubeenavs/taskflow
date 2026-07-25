import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Dashboard } from './features/dashboard/dashboard/dashboard';
import { Projects } from './features/projects/projects/projects';
import { authGuard } from './core/guards/auth-guard';
import { TaskList } from './features/tasks/task-list/task-list';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'projects', component: Projects, canActivate: [authGuard] },
  { path: 'projects/:id/tasks', component: TaskList, canActivate: [authGuard] },  //: is what turns the id into a variable instead of literal string.
  { path: '', redirectTo: '/login', pathMatch: 'full' }, //pathMatch: 'full' ensures that the entire URL path is matched before redirecting to /login
  { path: '**', redirectTo: '/login' } // wildcard — must be last
];