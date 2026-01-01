import { Routes } from '@angular/router';
import { authGuard } from './auth-guard-guard';

export const routes: Routes = [
  {
    path: 'chat',
    canActivate: [authGuard], // Protect chat route
    loadComponent: () =>
      import('./pages/chat-component/chat-component').then((c) => c.ChatComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login-component/login-component').then((c) => c.LoginComponent),
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
