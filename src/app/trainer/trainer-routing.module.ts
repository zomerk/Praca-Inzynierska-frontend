import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainTrainerComponent} from './pages/main-trainer/main-trainer.component';
import {TrainerUserComponent} from './pages/trainer-user/trainer-user.component';
import {TrainerTrainingsComponent} from './pages/trainer-trainings/trainer-trainings-component';

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
      // {
      //   path: 'chat-with-client',
      //   component: JAKIS
      // }
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainerRoutingModule { }
