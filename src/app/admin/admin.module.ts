import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MainComponent } from './pages/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { TrainerRequestsComponent } from './pages/trainer-requests/trainer-requests.component';


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    TrainerRequestsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
