import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {HeaderUserComponent} from './components/header/headerUser.component';
import {MainUserComponent} from './pages/main/mainUser.component';
import { AvailableTrainersComponent } from './pages/available-trainers/available-trainers.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import { MyTrainingsComponent} from './pages/my-trainings/my-trainings-component';
import {RouterModule} from '@angular/router';
import { TrainingDetailsComponent } from './pages/training-details/training-details-component';
import {FormsModule} from '@angular/forms';
import { AccountComponent } from './pages/account/account.component';



@NgModule({
  declarations: [
    HeaderUserComponent,
    MainUserComponent,
    AvailableTrainersComponent,
    MyTrainingsComponent,
    TrainingDetailsComponent,
    TrainingDetailsComponent,
    AccountComponent
  ],
  exports:[
    HeaderUserComponent
  ],
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    UserRoutingModule,
    FullCalendarModule,
  ]
})
export class UserModule { }
