import {Component, OnInit} from '@angular/core';
import {UserControllerService} from '../../../services/services/user-controller.service';
@Component({
  selector: 'app-header-user',
  templateUrl: './headerUser.component.html',
  styleUrl: './headerUser.component.css'
})
export class HeaderUserComponent implements OnInit {
  hasTrainer: boolean = false; // Initialize based on user's trainer status

  constructor(private userService: UserControllerService) { }

  ngOnInit(): void {
    // Call a service to check if the user has a trainer assigned
    this.userService.getTrainer().subscribe({
      next: (response) => {
        console.log(response);
        this.hasTrainer = response;
      },
      error: (err) => {
        console.error('Error checking trainer status', err);
      }
    });
  }

  logout() {
    // Implement logout logic here
    //this.userService.logout();
  }
}
