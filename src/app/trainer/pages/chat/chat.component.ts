import { Component, OnInit, OnDestroy } from '@angular/core';

import { interval, Subscription } from 'rxjs';
import {MessageControllerService} from '../../../services/services/message-controller.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: any[] = [];
  newMessage: string = '';
  trainerName: number = 1; // Replace with actual trainer ID
  userUsername: number = Number(window.location.pathname.split('/')[3]); // Replace with actual user ID
  pollSubscription!: Subscription;

  constructor(private messageService: MessageControllerService) {}

  ngOnInit(): void {
    // Start polling every 5 seconds
    this.pollSubscription = interval(50).subscribe(() => {
      this.getChatHistory();
    });
  }

  ngOnDestroy(): void {
    this.pollSubscription.unsubscribe(); // Stop polling when component is destroyed
  }

  sendMessage(): void {
    if (!this.newMessage.trim()) {
      return; // Prevent sending if message is empty or only whitespace
    }
    this.messageService.sendMessageFromTrainerToUser({userUsername:this.userUsername, content:this.newMessage})
      .subscribe(() => {
        this.newMessage = ''; // Clear the input field after sending
        this.getChatHistory();
      });
  }

  getChatHistory(): void {
    this.messageService.getChatHistory({userUsername:this.userUsername, trainerName:this.trainerName})
      .subscribe((messages) => {
        this.messages = messages;
      });
  }
}
