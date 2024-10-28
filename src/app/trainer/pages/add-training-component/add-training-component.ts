import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainerControllerService } from '../../../services/services/trainer-controller.service';
import { Training} from '../../../services/models/training';
import {Segment} from '../../../services/models/segment';

@Component({
  selector: 'app-add-training',
  templateUrl: './add-training-component.html',
  styleUrls: ['./add-training-component.css']
})
export class AddTrainingComponent implements OnInit {
  training: Training = {
    workoutName: '',
    scheduledAt: '',
    activityType: '',
    segmentList: []
  };
  userId!: number;
  initialDate: string = '';

  constructor(
    private trainerService: TrainerControllerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Extract userId and date from the URL
    this.userId = Number(window.location.pathname.split('/')[3]);
    const date = this.route.snapshot.paramMap.get('date');
    if (date) {
      // Set initial date for date input (only date part)
      this.initialDate = date;
      // Set scheduledAt to the initial date with default time
      this.training.scheduledAt = `${date}T00:00`; // default time
    }
  }

  // Update only the hour part of the scheduled date
  onTimeChange(event: any): void {
    const time = event.target.value;
    this.training.scheduledAt = `${this.initialDate}T${time}`;
  }

  // Method to add a new segment
  addSegment(): void {
    const newSegment: Segment = {
      segmentName: '',
      durationType: 'minutes',
      durationValue: 0,
      intensity: ''
    };
    this.training.segmentList!.push(newSegment);
  }

  // Method to remove a segment by index
  removeSegment(index: number): void {
    this.training.segmentList!.splice(index, 1);
  }

  // Submit the training details
  submitTraining(): void {
    console.log(this.training);
    if (this.userId) {
      this.trainerService.addTraining({
        userId: this.userId,
        body: this.training
      }).subscribe({
        next: () => {
          this.router.navigate(['/trainer/user-profile/'+ this.userId +'/clients-training']);
        },
        error: (err) => {
          this.router.navigate(['/trainer/user-profile/'+ this.userId +'/clients-training']);
        }
      });
    }
  }
}
