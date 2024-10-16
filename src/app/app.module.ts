import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule, provideHttpClient} from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import {FormsModule} from '@angular/forms';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { RegisterTrainerComponent } from './pages/register-trainer/register-trainer.component';

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
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
