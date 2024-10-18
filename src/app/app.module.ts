import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import {FormsModule} from '@angular/forms';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { RegisterTrainerComponent } from './pages/register-trainer/register-trainer.component';
import {httpTokenInterceptor} from './interceptor/http-token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterUserComponent,
    RegisterTrainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [provideHttpClient(withInterceptors([httpTokenInterceptor])),],
  bootstrap: [AppComponent]
})
export class AppModule { }
