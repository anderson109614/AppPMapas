import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewClientePageRoutingModule } from './new-cliente-routing.module';

import { NewClientePage } from './new-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewClientePageRoutingModule
  ],
  declarations: [NewClientePage]
})
export class NewClientePageModule {}
