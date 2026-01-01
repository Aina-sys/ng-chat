import { Injectable, signal } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';
import { Ichat } from '../../interface/chat-response';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  supabase!: SupabaseClient;

  // Signal to hold the selected chat for deletion
  public savedChat = signal<Partial<Ichat>>({});

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  // Insert chat
  async chatMessage(text: string) {
    try {
      const { data, error } = await this.supabase.from('chat').insert({ text });
      if (error) alert(error.message);
      return data;
    } catch (err: any) {
      alert(err.message || err);
    }
  }

  // Fetch chat messages
  async listChat(): Promise<Ichat[] | null> {
    try {
      const { data, error } = await this.supabase
        .from('chat')
        .select('*, users(*)');

      if (error) {
        alert(error.message);
        return null;
      }

      return data as Ichat[];
    } catch (err: any) {
      alert(err.message || err);
      return null;
    }
  }

  // Delete chat by id
  async deleteChat(id: string) {
    try {
      const { data, error } = await this.supabase.from('chat').delete().eq('id', id);
      if (error) throw error;
      return data;
    } catch (err: any) {
      throw err;
    }
  }

  // Set selected chat for deletion
  selectedChats(msg: Ichat) {
    this.savedChat.set(msg);
  }
}
