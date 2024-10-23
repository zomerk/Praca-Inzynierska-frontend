import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainTrainerComponent} from '../admin/pages/main/mainTrainer.component';
import {TrainerRequestsComponent} from '../admin/pages/trainer-requests/trainer-requests.component';
import {MainUserComponent} from './pages/main/mainUser.component';
import {AvailableTrainersComponent} from './pages/available-trainers/available-trainers.component';
import {MyTrainingsComponent} from './pages/my-trainings/my-trainings-component';

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
    }
  ]
}
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
