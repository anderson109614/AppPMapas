import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewClientePage } from './new-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: NewClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewClientePageRoutingModule {}
