import { Component } from '@angular/core';
import {LoginDto} from '../../services/models/login-dto';
import {Router} from '@angular/router';
import {AuthContorllerService} from '../../services/services/auth-contorller.service';
import {HttpErrorResponse} from '@angular/common/http';
import {TokenService} from '../../services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authRequest: LoginDto = {email: '', password: ''};
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthContorllerService,
    private tokenService: TokenService
  )
  {}

  login() {
    this.errorMsg = [];
    this.authService.authenticate({
        body: this.authRequest
      }
    ).subscribe({
      next: result => {
        this.tokenService.token = result.token as string;
        this.router.navigate(['home']);
      },
      error: err => {
        if(err.status === 400) {
          this.errorMsg = (Object.values(err.error));
        }
        if(err.status === 401) {
          this.errorMsg.push(err.error.description);
        }
        if(err.status === 403) {
          this.errorMsg.push("The account is looked our waiting for approval.");
        }
        }
    })
  }

  registerUser() {
    this.router.navigate(['register-user']);
  }

  registerTrainer() {
    this.router.navigate(['register-trainer']);
  }
}
