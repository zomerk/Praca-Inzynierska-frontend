import { Component, OnInit } from '@angular/core';
import { TrainerControllerService } from '../../../services/services/trainer-controller.service';
import { ActivatedRoute } from '@angular/router';
import { Feedback } from '../../../services/models/feedback';
import { Training } from '../../../services/models/training';

@Component({
  selector: 'app-trainer-training-feedback',
  templateUrl: './trainer-training-feedback-component.html',
  styleUrls: ['./trainer-training-feedback-component.css']
})
export class TrainerTrainingFeedbackComponent implements OnInit {
  training!: Training; // To store training details
  feedback: Feedback | null = null; // Initialize as null

  constructor(
    private trainerService: TrainerControllerService,
  ) {}

  ngOnInit(): void {
    const trainingId = window.location.pathname.split('/')[5];
    console.log(trainingId);
    if (trainingId) {
      this.loadTraining(Number(trainingId)); // Load training details based on ID
      this.loadFeedback(Number(trainingId)); // Load associated feedback
    }
  }

  loadTraining(trainingId: number): void {
    this.trainerService.getTraining1({trainingId:trainingId}).subscribe({
      next: (data) => {
        this.training = data;
        },
      error: (err) => {
        console.error('Error fetching training:', err);
      }
    });
  }

  loadFeedback(trainingId: number): void {
    this.trainerService.getFeedback({trainingId:trainingId}).subscribe({
      next: (data) => {
        this.feedback = data // Assign feedback or null
      },
      error: (err) => {
        console.error('Error fetching feedback:', err);
      }
    });
  }
}
