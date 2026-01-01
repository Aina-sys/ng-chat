import { Component, inject, signal } from '@angular/core';
import { ChatService } from '../../services/chat-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal-component.html',
})
export class ModalComponent {
  private chatService = inject(ChatService);
  private router = inject(Router);
  dismiss = signal(false);

  deleteChat() {
    const id = (this.chatService.savedChat() as { id: string }).id;
    if (!id) return;

    this.chatService
      .deleteChat(id)
      .then(() => {
        const currentUrl = this.router.url;
        this.dismiss.set(true);
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => this.router.navigate([currentUrl]));
      })
      .catch((err) => alert(err.message || err));
  }
}
