import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {RegisterUserComponent} from './pages/register-user/register-user.component';
import {RegisterTrainerComponent} from './pages/register-trainer/register-trainer.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register-user',
    component: RegisterUserComponent
  },
  {
    path: 'register-trainer',
    component: RegisterTrainerComponent
  },
  {
    path: 'user',
    loadChildren: ()=> import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'admin',
    loadChildren: ()=> import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'trainer',
    loadChildren: ()=> import('./trainer/trainer.module').then(m => m.TrainerModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
