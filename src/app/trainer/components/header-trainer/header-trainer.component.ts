import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header-trainer',
  templateUrl: './header-trainer.component.html',
  styleUrl: './header-trainer.component.css'
})
export class HeaderTrainerComponent {
  constructor(private router: Router) {
  }
  // Method to handle the redirection to My Clients
  goToClients() {
    this.router.navigate(['/trainer']);
  }
  logout() {
    // Handle logout logic
    localStorage.clear()// Assuming you have an AuthService
    this.router.navigate(['/login']); // Redirect to login page
  }

}
