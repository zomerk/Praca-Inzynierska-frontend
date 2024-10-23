import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserControllerService } from '../../../services/services/user-controller.service';
import { Training } from '../../../services/models/training';
import {Feedback} from '../../../services/models/feedback';

@Component({
  selector: 'app-training-details',
  templateUrl: './training-details-component.html',
  styleUrls: ['./training-details-component.css'],
})
export class TrainingDetailsComponent implements OnInit {
  training!: Training;// To hold the training data
  feedback: Feedback = {
    feedbackText: '',
    feeling: 'NEUTRAL',
    ratingValue: 0,
    feedbackId: 0 // If needed, or it can be generated server-side
  }; // For storing user feedback

  constructor(private route: ActivatedRoute, private trainingService: UserControllerService) {
    route.params.subscribe(val => {
      this.loadTrainingDetails(this.route.snapshot.params['id'])
    });
  }

  ngOnInit(): void {
    this.loadTrainingDetails(this.route.snapshot.params['id']); // Load training details
  }

  loadTrainingDetails(id: string): void {
    if (id) {
      this.trainingService.getTraining().subscribe({
        next: (training) => {
          let listOfTraining = training as Training[];
          listOfTraining.find((training) =>{
            if(training.trainingId!.toString() === id){
             this.training = training;
            }
          });
          console.log(this.training);
        },
        error: (err) => {
          console.error('Error fetching training details:', err);
        }
      });
    }
  }


  submitFeedback(): void {
    if (this.training && this.feedback) {
      // Include the training ID with the feedback (if needed)
      const feedbackData = {
        body:this.feedback,
        trainingId: this.training.trainingId! // Assuming the feedback should be linked to the training ID
      };

      this.trainingService.feedbackAfterTraining(feedbackData).subscribe({
        next: (response) => {
          console.log('Feedback submitted successfully', response);
          alert('Feedback submitted!');
        },
        error: (err) => {
          console.error('Error submitting feedback:', err);
        }
      });
    }
  }
}
