import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MainTrainerComponent } from './pages/main/mainTrainer.component';
import { HeaderComponent } from './components/header/header.component';
import { TrainerRequestsComponent } from './pages/trainer-requests/trainer-requests.component';
import {CreateAdministratorComponent} from './pages/create-administrator/create-administrator-component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    MainTrainerComponent,
    HeaderComponent,
    TrainerRequestsComponent,
    CreateAdministratorComponent
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
