import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  supabase!: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  // Function to insert a new chat message
  async chatMessage(text: string) {
    try {
      const { data, error } = await this.supabase
        .from('chat')
        .insert({ text });

      if (error) {
        alert(error.message);
        return;
      }

      return data;
    } catch (err: any) {
      alert(err.message || err);
    }
  }
}
