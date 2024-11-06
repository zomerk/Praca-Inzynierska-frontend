import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {} from '../../../services/services/admin-controller.service';
import {UserControllerService} from '../../../services/services/user-controller.service';
import {TrainerControllerService} from '../../../services/services/trainer-controller.service';
import {HeaderUserComponent} from '../../components/header/headerUser.component';
import {Trainer} from '../../../services/models/trainer';
import {Rating} from '../../../services/models/rating';

@Component({
  selector: 'app-available-trainers',
  templateUrl: './available-trainers.component.html',
  styleUrls: ['./available-trainers.component.css']
})
export class AvailableTrainersComponent implements OnInit {
  trainers: any[] = [];
  page: number = 0;
  size: number = 10;
  totalPages: number = 0;
  totalPagesArray: number[] = [];
  ratting?: number|string;

  constructor(private trainerControllerService: TrainerControllerService,private userControllerService: UserControllerService, private router: Router, private head:HeaderUserComponent) { }

  ngOnInit(): void {
    this.loadTrainers();
  }

  loadTrainers() {
    this.trainerControllerService.getPaginatedTrainers({page:this.page, size:this.size}).subscribe({
      next: (response: any) => {
        this.trainers = response.content; // Assuming content contains the list of trainers
        this.totalPages = response.totalPages;
        this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i);
        this.trainers.forEach(trainer => this.loadTrainerRating(trainer));
      },
      error: err => console.error('Failed to load trainers', err)
    });
  }

  signUpToTrainer(trainerId: number) {
    this.userControllerService.signUpToTrainer({trainerId:trainerId}).subscribe({
      next: () => {
        alert('Successfully signed up to trainer');
       // window.location.reload();

        this.router.navigate(['/user/trainings']);
        // Redirect or show confirmation
      },
      error: err => console.error('Failed to sign up', err)
    });
  }

  loadTrainerRating(trainer: Trainer) {
    this.userControllerService.getRating({trainerId:trainer.trainerId!}).subscribe({
      next: (ratings: any) => {
        const meanRating = ratings.length ? (ratings.reduce((rating:Rating) => rating.ratingValue, 0) / ratings.length).toFixed(1) : 'No ratings';
        trainer.ratting = meanRating;
      },
      error: err => console.error('Failed to load ratings', err)
    });
  }
  changePage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.page = page;
      this.loadTrainers();
    }
  }
}
