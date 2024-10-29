import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainTrainerComponent} from '../admin/pages/main/mainTrainer.component';
import {TrainerRequestsComponent} from '../admin/pages/trainer-requests/trainer-requests.component';
import {MainUserComponent} from './pages/main/mainUser.component';
import {AvailableTrainersComponent} from './pages/available-trainers/available-trainers.component';
import {MyTrainingsComponent} from './pages/my-trainings/my-trainings-component';
import {TrainingDetailsComponent} from './pages/training-details/training-details-component';
import {AccountComponent} from './pages/account/account.component';
import {ChatComponent} from './pages/chat/chat.component';

const routes: Routes =  [{
  path: '',
  component:MainUserComponent,
  children:[
    {
      path: 'available-trainers',
      component: AvailableTrainersComponent,
    },
    {
      path:'trainings',
      component:MyTrainingsComponent
    },
    {
      path:'training-details/:id',
      component: TrainingDetailsComponent
    },
    {
      path:'account',
      component: AccountComponent,
    },
    {
      path:'messages',
      component: ChatComponent,
    }
  ]
}
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
