import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {HeaderUserComponent} from './components/header/headerUser.component';
import {MainUserComponent} from './pages/main/mainUser.component';
import { AvailableTrainersComponent } from './pages/available-trainers/available-trainers.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import { MyTrainingsComponent} from './pages/my-trainings/my-trainings-component';



@NgModule({
  declarations: [
    HeaderUserComponent,
    MainUserComponent,
    AvailableTrainersComponent,
    MyTrainingsComponent
  ],
  exports:[
    HeaderUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FullCalendarModule,
  ]
})
export class UserModule { }
