import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainTrainerComponent} from './pages/main/mainTrainer.component';
import {TrainerRequestsComponent} from './pages/trainer-requests/trainer-requests.component';
import {CreateAdministratorComponent} from './pages/create-administrator/create-administrator-component';

const routes: Routes = [
  {
    path: '',
    component:MainTrainerComponent,
    children:[
      {
        path: 'trainer-requests',
        component: TrainerRequestsComponent,
      },
      {
        path: 'create-administrator',
        component: CreateAdministratorComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
