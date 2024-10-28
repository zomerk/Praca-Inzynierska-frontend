import { Component, OnInit } from '@angular/core';
import { TrainerControllerService } from '../../../services/services/trainer-controller.service';
import { ActivatedRoute } from '@angular/router';
import { Feedback } from '../../../services/models/feedback';
import { Training } from '../../../services/models/training';
import {UserControllerService} from '../../../services/services/user-controller.service';

@Component({
  selector: 'app-trainer-training-feedback',
  templateUrl: './trainer-training-feedback.component.html',
  styleUrls: ['./trainer-training-feedback.component.css']
})
export class TrainerTrainingFeedbackComponent implements OnInit {
  training!: Training; // To store training details
  feedback: Feedback | null = null; // Initialize as null

  constructor(
    private trainerService: TrainerControllerService,
    private route: ActivatedRoute,
    private userController: UserControllerService
  ) {}

  ngOnInit(): void {
    const trainingId = this.route.snapshot.paramMap.get('trainingId');
    if (trainingId) {
      this.loadTraining(Number(trainingId)); // Load training details based on ID
      this.loadFeedback(trainingId); // Load associated feedback
    }
  }

  loadTraining(trainingId: number): void {
    this.userController.getTraining({trainingId:trainingId}).subscribe({
      next: (data) => {
        this.training = data; // Assign training object
      },
      error: (err) => {
        console.error('Error fetching training:', err);
      }
    });
  }

  loadFeedback(trainingId: string): void {
    this.trainerService.getTrainingFeedback(trainingId).subscribe({
      next: (data) => {
        this.feedback = data.feedback || null; // Assign feedback or null
      },
      error: (err) => {
        console.error('Error fetching feedback:', err);
      }
    });
  }

  deleteFeedback(): void {
    if (this.feedback) {
      this.trainerService.deleteFeedback(this.feedback.feedbackId).subscribe({
        next: () => {
          alert('Feedback deleted successfully.');
          this.feedback = null; // Reset feedback to null after deletion
        },
        error: (err) => {
          console.error('Error deleting feedback:', err);
        }
      });
    }
  }
}
