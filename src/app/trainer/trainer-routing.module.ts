import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainTrainerComponent} from './pages/main-trainer/main-trainer.component';
import {TrainerUserComponent} from './pages/trainer-user/trainer-user.component';
import {TrainerTrainingsComponent} from './pages/trainer-trainings/trainer-trainings-component';
import {AddTrainingComponent} from './pages/add-training-component/add-training-component';
import {
  TrainerTrainingFeedbackComponent
} from './pages/trainer-training-feedback-component/trainer-training-feedback-component';
import {ChatComponent} from './pages/chat/chat.component';

const routes: Routes = [
  {
    path: '',
    component: MainTrainerComponent
  },
  {
    path: 'user-profile/:id',
    component:TrainerUserComponent,
    children:[
      {
        path: 'my-clients',
        component: MainTrainerComponent
      },
      {
        path: 'clients-training',
        component: TrainerTrainingsComponent
      },
      {
        path: 'add-training/:date',
        component: AddTrainingComponent
      },
      {
        path: 'training-details/:TrainingId',
        component: TrainerTrainingFeedbackComponent
      },
      {
        path: 'chat-with-client',
        component: ChatComponent
      }
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainerRoutingModule { }
