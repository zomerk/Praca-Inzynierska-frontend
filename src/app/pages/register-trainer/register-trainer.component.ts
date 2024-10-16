import { Component } from '@angular/core';
import {UserDto} from '../../services/models/user-dto';
import {Router} from '@angular/router';
import {AuthContorllerService} from '../../services/services/auth-contorller.service';
import {TrainerDto} from '../../services/models/trainer-dto';

@Component({
  selector: 'app-register-trainer',
  templateUrl: './register-trainer.component.html',
  styleUrl: './register-trainer.component.css'
})
export class RegisterTrainerComponent {
  trainerForm: TrainerDto = {email:"",firstName:"",lastName:"",password:"",specialization:"",experienceLevel:""};
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthContorllerService,
  )
  {}

  register(){
    this.errorMsg = [];
    this.authService.registerTrainer({
      body:this.trainerForm
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
