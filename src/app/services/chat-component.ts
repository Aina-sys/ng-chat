import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChatService } from '../services/chat-service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: '../pages/chat-component/chat-component.html', // Corrected path
  styleUrls: ['../pages/chat-component/chat-component.css'],
})
export class ChatComponent implements OnInit {
  chatForm!: FormGroup;
  private fb = inject(FormBuilder);
  private chatService = inject(ChatService);

  ngOnInit() {
    this.chatForm = this.fb.group({
      chat_message: ['', Validators.required],
    });
  }

  onSubmit() {
    const formValue = this.chatForm.value.chat_message;

    this.chatService
      .chatMessage(formValue)
      .then(() => {
        this.chatForm.reset();
      })
      .catch((err: any) => {
        alert(err.message || err);
      });
  }
}
