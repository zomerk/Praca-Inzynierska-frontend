import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainerRoutingModule } from './trainer-routing.module';
import { MainTrainerComponent } from './pages/main-trainer/main-trainer.component';
import { HeaderTrainerComponent } from './components/header-trainer/header-trainer.component';
import { TrainerUserComponent } from './pages/trainer-user/trainer-user.component';


@NgModule({
  declarations: [
    MainTrainerComponent,
    HeaderTrainerComponent,
    TrainerUserComponent,
  ],
  imports: [
    CommonModule,
    TrainerRoutingModule
  ]
})
export class TrainerModule { }
