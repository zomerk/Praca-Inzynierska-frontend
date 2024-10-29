import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainerRoutingModule } from './trainer-routing.module';
import { MainTrainerComponent } from './pages/main-trainer/main-trainer.component';
import { HeaderTrainerComponent } from './components/header-trainer/header-trainer.component';
import { TrainerUserComponent } from './pages/trainer-user/trainer-user.component';
import { TrainerTrainingsComponent } from './pages/trainer-trainings/trainer-trainings-component';
import {FormsModule} from '@angular/forms';
import {FullCalendarModule} from '@fullcalendar/angular';
import { AddTrainingComponent } from './pages/add-training-component/add-training-component';
import {
  TrainerTrainingFeedbackComponent
} from './pages/trainer-training-feedback-component/trainer-training-feedback-component';
import { ChatComponent } from './pages/chat/chat.component';



@NgModule({
  declarations: [
    MainTrainerComponent,
    HeaderTrainerComponent,
    TrainerUserComponent,
    TrainerTrainingsComponent,
    AddTrainingComponent,
    TrainerTrainingFeedbackComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    TrainerRoutingModule,
    FormsModule,
    FullCalendarModule,
  ]
})
export class TrainerModule { }
