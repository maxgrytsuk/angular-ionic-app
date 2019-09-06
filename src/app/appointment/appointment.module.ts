import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppointmentPage } from './appointment.page';
import { ModalPageModule } from '../modal/modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalPageModule,
    RouterModule.forChild([
      {
        path: '',
        component: AppointmentPage
      }
    ])
  ],
  declarations: [AppointmentPage]
})
export class AppointmentPageModule {}
