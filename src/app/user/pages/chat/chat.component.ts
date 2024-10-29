import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessageControllerService} from '../../../services/services/message-controller.service';
import {interval, Subscription} from 'rxjs';
import {UserControllerService} from '../../../services/services/user-controller.service';
import {User} from '../../../services/models/user';
import {numbers} from '@material/dialog';
import {Message} from '../../../services/models/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  newMessage: string = '';
  trainerName!: number; // Replace with actual trainer ID
  userUsername!: number; // Replace with actual user ID
  pollSubscription!: Subscription;

  user: any = {
    userId: '',
    firstName: '',
    lastName: '',
    password: '',
    age: 0,
    fitnessLevel: '',
    goal: '',
    trainer: ''
  };


  constructor(private messageService: MessageControllerService,private userService: UserControllerService) {}

  ngOnInit(): void {
    // Start polling every 5 seconds
    this.loadUserProfile()
    this.pollSubscription = interval(50).subscribe(() => {
      this.getChatHistory();
    });
  }

  ngOnDestroy(): void {
    this.pollSubscription.unsubscribe(); // Stop polling when component is destroyed
  }
  loadUserProfile(): void {
    console.log("zabawa");
    this.userService.getUser().subscribe({
      next: (userData) => {
        this.user = userData;
        this.userUsername = this.user.userId;
        console.log(this.userUsername);
      },
      error: (err) => {
        console.error('Error loading user profile:', err);
      }
    });
    this.userService.getTrainerId().subscribe({
      next: (userData) => {
        this.trainerName = userData as number
      },
      error: (err) => {
        console.error('Error loading user profile:', err);
      }
    });
  }
  sendMessage(): void {
    if (!this.newMessage.trim()) {
      return; // Prevent sending if message is empty or only whitespace
    }
    this.messageService.sendMessageFromUserToTrainer({trainerName:this.trainerName, content:this.newMessage})
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
