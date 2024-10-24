import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TrainerControllerService} from '../../../services/services/trainer-controller.service';
import {PageUser} from '../../../services/models/page-user';

@Component({
  selector: 'app-main-trainer',
  templateUrl: './main-trainer.component.html',
  styleUrl: './main-trainer.component.css'
})
export class MainTrainerComponent implements OnInit {
  users: PageUser = {}; // Change to 'users' for clarity
  page: number = 0;
  size: number = 9;
  sortBy: string = "userId"; // Change to your user ID property
  sortDir: string = "asc";
  totalItems: number = 0;

  constructor(
    private trainerService: TrainerControllerService,
    protected router: Router,
  ) {}

  ngOnInit(): void {
    this.findAllUsers(); // Fetch users on initialization
  }

  private findAllUsers() {
    this.trainerService.getUsersByTrainer({
      page: this.page,
      size: this.size,
    }).subscribe({
      next: data => {
        console.log(data);
        this.totalItems = data.totalElements!;
        this.users = data; // Ensure it's an array of users
      },
      error: err => {
        console.error('Error fetching trainer users:', err);
      }
    });
  }

  // Method to change page
  changePage(page: number) {
    this.page = page;
    this.findAllUsers();
  }

  // Method to change sort order
  changeSort(sortBy: string) {
    this.sortBy = sortBy;
    this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc'; // Toggle sort direction
    this.findAllUsers();
  }

  // Helper methods for pagination
  get pageCount(): number {
    return Math.ceil(this.totalItems / this.size);
  }
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  protected readonly Math = Math;
}

