import { Component, OnInit } from '@angular/core';
import { UserControllerService } from '../../../services/services/user-controller.service';
import { Router } from '@angular/router';
import {UserDto} from '../../../services/models/user-dto';
import {UserChangeDto} from '../../../services/models/user-change-dto';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: any = {
    firstName: '',
    lastName: '',
    password: '',
    age: 0,
    fitnessLevel: '',
    goal: ''
  };

  userDTO!: UserChangeDto; // To store original user data for comparison
  isEditing: boolean = false; // To track edit mode
  errorMsg: Array<string> = [];
  constructor(
    private userService: UserControllerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  // Load the user profile from the backend
  loadUserProfile(): void {
    this.userService.getUser().subscribe({
      next: (userData) => {
        this.user = userData;
        console.log(this.user);
        this.userDTO = {age: this.user.age, firstName: this.user.firstName, fitnessLevel: this.user.fitnessLevel, goal: this.user.goal, lastName: this.user.lastName}; // Store a copy of the original data
      },
      error: (err) => {
        console.error('Error loading user profile:', err);
      }
    });
  }

  // Toggle edit mode
  toggleEdit(): void {
    if (this.isEditing) {

      //this.updateProfile(); // Save the changes when toggling off edit mode
    }
    this.isEditing = !this.isEditing;
  }

  // Update the profile based on changed fields
  updateProfile(): void {
    // Collect only changed fields
    const updatedFields: any = {};

    if (this.user.firstName !== this.userDTO.firstName) {
      this.userDTO.firstName = this.user.firstName;
    }

    if (this.user.lastName !== this.userDTO.lastName) {
      this.userDTO.lastName = this.user.lastName;
    }

    if (this.user.age !== this.userDTO.age) {
      this.userDTO.age = this.user.age;
    }

    if (this.user.fitnessLevel !== this.userDTO.fitnessLevel) {
      this.userDTO.fitnessLevel = this.user.fitnessLevel;
    }

    if (this.user.goal !== this.userDTO.goal) {
      this.userDTO.goal = this.user.goal;
    }

    // If no fields were changed, alert the user and return
    if (Object.keys(this.userDTO).length === 0) {
      alert("No changes were made.");
      return;
    }

    this.userService.updateUser({body:this.userDTO}).subscribe({
      next: () => {
        alert('Profile updated successfully!');
        this.isEditing = false; // Exit edit mode
        this.loadUserProfile(); // Reload updated profile
      },
      error: (err) => {
        if(err.status === 400) {
          this.errorMsg = (Object.values(err.error));
          console.log(err.error);
        }
        if(err.status === 401) {
          this.errorMsg.push(err.error.detail);
          console.log(err.error);
        }
        if(err.status === 403) {
          this.errorMsg.push("The account is looked our waiting for approval.");
        }
        console.error('Error updating profile:', err);
      }
    });
  }

}
