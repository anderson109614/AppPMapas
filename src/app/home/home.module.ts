import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import {PedidoPageModule}from '../componentes/pedido/pedido.module';
import {PedidoPage}from '../componentes/pedido/pedido.page';

import {ListaPedidosPage}from '../componentes/lista-pedidos/lista-pedidos.page';
import {ListaPedidosPageModule}from '../componentes/lista-pedidos/lista-pedidos.module';

@NgModule({
  entryComponents:[ListaPedidosPage,PedidoPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ListaPedidosPageModule,
    PedidoPageModule

  ],
  declarations: [HomePage]
})
export class HomePageModule {}
