import { Component } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {TrainerDto} from '../../services/models/trainer-dto';
import {UserDto} from '../../services/models/user-dto';
import {Router} from '@angular/router';
import {AuthContorllerService} from '../../services/services/auth-contorller.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {

  userForm: UserDto ={email:"",firstName:"",lastName:"",password:"",age:0,goal:"",fitnessLevel:""};
  errorMsg: Array<string> = [];
  constructor(
    private router: Router,
    private authService: AuthContorllerService,
  )
  {}

  register(){
    this.errorMsg = [];
    this.authService.registerUser({
      body:this.userForm
    }).subscribe({
      next: result => {
        this.router.navigate(['/login']);
      },
      error: err => {
        if(err.status === 400) {
          this.errorMsg = (Object.values(err.error));
        }
        if(err.status === 409) {
          this.errorMsg.push(err.error);
        }
      }
    })


  }
  login(){
    this.router.navigate(['/login']);
  }
}
