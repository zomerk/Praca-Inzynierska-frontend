import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {HeaderUserComponent} from './components/header/headerUser.component';
import {MainUserComponent} from './pages/main/mainUser.component';
import { AvailableTrainersComponent } from './pages/available-trainers/available-trainers.component';


@NgModule({
  declarations: [
    HeaderUserComponent,
    MainUserComponent,
    AvailableTrainersComponent,
  ],
  exports:[
    HeaderUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
