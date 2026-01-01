import { Component, effect, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChatService } from '../../services/chat-service';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { Ichat } from '../../interface/chat-response';
import { ModalComponent } from '../layout/modal-component/modal-component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ReactiveFormsModule, ModalComponent],
  templateUrl: './chat-component.html',
  styleUrls: ['./chat-component.css'],
})
export class ChatComponent implements OnInit {
  chatForm!: FormGroup;
  private fb = inject(FormBuilder);
  private chatService = inject(ChatService);
  private auth = inject(AuthService);
  private router = inject(Router);

  // Signal to hold chat messages
  chats = signal<Ichat[]>([]);

  ngOnInit() {
    this.chatForm = this.fb.group({
      chat_message: ['', Validators.required],
    });

    effect(() => {
      this.onListChat();
    });
  }

  // Submit new chat
  onSubmit() {
    const message = this.chatForm.value.chat_message;
    this.chatService
      .chatMessage(message)
      .then(() => {
        this.chatForm.reset();
        this.onListChat(); // Refresh messages
      })
      .catch((err) => alert(err.message || err));
  }

  // Fetch chat messages
  onListChat() {
    this.chatService
      .listChat()
      .then((res: Ichat[] | null) => {
        if (res) this.chats.set(res);
      })
      .catch((err) => alert(err.message || err));
  }

  // Select chat for deletion
  openDropDown(msg: Ichat) {
    this.chatService.selectedChats(msg);
  }

  // 🔒 Logout function
  async logOut() {
    try {
      await this.auth.signOut();
      this.router.navigate(['/login']);
    } catch (err: any) {
      alert(err.message || err);
    }
  }
}
