import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MainTrainerComponent } from './pages/main/mainTrainer.component';
import { HeaderComponent } from './components/header/header.component';
import { TrainerRequestsComponent } from './pages/trainer-requests/trainer-requests.component';


@NgModule({
  declarations: [
    MainTrainerComponent,
    HeaderComponent,
    TrainerRequestsComponent
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
