import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserControllerService } from '../../../services/services/user-controller.service';

@Component({
  selector: 'app-end-collaboration',
  templateUrl: './end-collaboration.component.html',
  styleUrls: ['./end-collaboration.component.css']
})
export class EndCollaborationComponent implements OnInit {
  trainerId!: number;
  trainerName: string = 'Trainer Name'; // Set dynamically if available
  ratingValue!: number;
  ratingComment: string = '';
  complaintText: string = '';

  constructor(
    private userControllerService: UserControllerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Set trainerId and trainerName from route params or user data
  }

  submitRating() {
    const ratingData = {
      ratingValue: this.ratingValue,
      comment: this.ratingComment
    };
    this.userControllerService.addRating({trainerId:this.trainerId,body:ratingData}).subscribe({
      next: () => alert('Rating submitted successfully'),
      error: err => console.error('Failed to submit rating', err),
    });
  }

  submitComplaint() {
    this.userControllerService.postComplaint({trainerId:this.trainerId,body:{complaintText:this.complaintText,status:"OPEN"}}).subscribe({
      next: () => alert('Complaint submitted successfully'),
      error: err => console.error('Failed to submit complaint', err),
    });
  }

  endCollaboration() {
    this.userControllerService.(this.trainerId).subscribe({
      next: () => {
        alert('Collaboration ended successfully');
        this.router.navigate(['/user/trainers']);
      },
      error: err => console.error('Failed to end collaboration', err),
    });
  }
}
