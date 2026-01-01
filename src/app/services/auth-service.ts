import { Injectable, inject, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase: SupabaseClient;
  private router = inject(Router);
  private ngZone = inject(NgZone);

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth event:', event);
      console.log('Session:', session);

      if (session?.user) {
        localStorage.setItem('session', JSON.stringify(session.user));
        this.ngZone.run(() => this.router.navigate(['/chat']));
      } else {
        localStorage.removeItem('session');
        this.ngZone.run(() => this.router.navigate(['/login']));
      }
    });
  }

  get isLoggedIn(): boolean {
    const user = localStorage.getItem('session');
    return !!user && user !== 'undefined';
  }

  async signInWithGoogle() {
    const { error } = await this.supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) console.error('Login error:', error.message);
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    localStorage.removeItem('session');
    this.ngZone.run(() => this.router.navigate(['/login']));
    if (error) console.error('Logout error:', error.message);
  }
}
