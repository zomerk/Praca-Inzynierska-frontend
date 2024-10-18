import { Component } from '@angular/core';
import {LoginDto} from '../../services/models/login-dto';
import {Router} from '@angular/router';
import {AuthContorllerService} from '../../services/services/auth-contorller.service';
import {HttpErrorResponse} from '@angular/common/http';
import {TokenService} from '../../token/token.service';
import { jwtDecode } from "jwt-decode";

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
        console.log(this.tokenService.token);
        const decodedToken: any = jwtDecode(this.tokenService.token);
        console.log(decodedToken.roles[0].authority);
        switch (decodedToken.roles[0].authority) {
          case 'ROLE_USER':
            this.router.navigate(['user']);
            break;
          case 'ROLE_ADMIN':
            this.router.navigate(['admin']);
            break;
          case 'ROLE_TRAINER':
            this.router.navigate(['trainer']);
            break;
        }
      },
      error: err => {
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
