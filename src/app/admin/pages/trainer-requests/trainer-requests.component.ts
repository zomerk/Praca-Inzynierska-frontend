import {Component, OnInit} from '@angular/core';
import {AdminControllerService} from '../../../services/services/admin-controller.service';
import {Router} from '@angular/router';
import {PageTrainer} from '../../../services/models/page-trainer';
import {acceptTrainer} from '../../../services/fn/admin-controller/accept-trainer';

@Component({
  selector: 'app-trainer-requests',
  templateUrl: './trainer-requests.component.html',
  styleUrl: './trainer-requests.component.css'
})
export class TrainerRequestsComponent implements OnInit {
  trainer:PageTrainer = {}
  page: number = 0;
  size: number= 9;
  sortBy: string = "trainerId";
  sortDir: string = "asc";
  totalItems: number = 0;


  constructor(
    private adminService: AdminControllerService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
      this.findAllRequests();
    }

  private findAllRequests() {
    this.adminService.getUnverifiedTrainers({
      page:this.page,
      size:this.size,
      sortBy:this.sortBy,
      sortDir:this.sortDir
    }).subscribe({
      next: data => {
        console.log(data);
        this.totalItems = data.totalElements!
        this.trainer = data;
      }
    })
  }
  public acceptTrainer(trainerId: number) {
    this.adminService.acceptTrainer({trainerId:trainerId, verified:true}).subscribe({
      next: response => {
        console.log('True', response);
        this.findAllRequests(); // Refresh the trainer list after updating the status
      },
      error: err => {
        console.error('Error updating trainer status', err);
      }
    });
  }

  public declineTrainer(trainerId: number) {
    this.adminService.acceptTrainer({trainerId:trainerId, verified:false}).subscribe({
      next: response => {
        console.log('False', response);
        this.findAllRequests(); // Refresh the trainer list after updating the status
      },
      error: err => {
        console.error('Error updating trainer status', err);
      }
    });
  }

  // Method to change page
  changePage(page: number) {
    this.page = page;
    this.findAllRequests();
  }

  // Method to change sort order
  changeSort(sortBy: string) {
    this.sortBy = sortBy;
    this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc'; // Toggle sort direction
    this.findAllRequests();
  }

  protected readonly Math = Math;
}
