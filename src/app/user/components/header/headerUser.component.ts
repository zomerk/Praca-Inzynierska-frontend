import {ChangeDetectorRef, Component, Injectable, OnInit} from '@angular/core';
import {UserControllerService} from '../../../services/services/user-controller.service';
@Injectable(
  {providedIn: 'root'}
)
@Component({
  selector: 'app-header-user',
  templateUrl: './headerUser.component.html',
  styleUrl: './headerUser.component.css'
})
export class HeaderUserComponent implements OnInit {
  hasTrainer: boolean = false; // To hold the user's trainer status

  constructor(private userService: UserControllerService) { }

  ngOnInit(): void {
    this.checkTrainerStatus();  // Call the function to check if the user has a trainer
  }

  // Function to check if the user has a trainer
  checkTrainerStatus(): void {
    this.userService.getTrainer().subscribe({
      next: (response: boolean) => { // Adjusted to match the expected response type (boolean)
        console.log('Trainer status:', response);
        this.hasTrainer = true; // Set the hasTrainer property to the boolean value returned
      },
      error: (err) => {
        this.hasTrainer = false;
        console.error('Error checking trainer status:', err);
      }
    });
  }


  logout() {
    // Implement logout logic here
    //this.userService.logout();
  }
}
