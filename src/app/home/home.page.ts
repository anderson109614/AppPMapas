import { AfterViewInit, Component } from '@angular/core';
import { Device } from '@capacitor/device';
import { Geolocation } from '@capacitor/geolocation';
import { ModalController, Platform, PopoverController, ToastController } from '@ionic/angular';

import {PedidoPage} from '../componentes/pedido/pedido.page';

import {ListaPedidosPage} from '../componentes/lista-pedidos/lista-pedidos.page';


import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {

  uuid: string = '...';
  manofactura: string = '...';
  modelo: string = '...';
  Latitud: string = '...';
  Longitud: string = '...';
  colorbad:string="danger";
 
  Estado: string = 'Pausa';
  
  socket: any;
  url: string = "";
  constructor(public modalController: ModalController) { }
  ngAfterViewInit(): void {
    var txtIp = (<HTMLInputElement>document.getElementById('txtIP'));
    var txtPuerto = (<HTMLInputElement>document.getElementById('txtPuerto'));
    this.url = "http://" + txtIp.value.toString() + ":" + txtPuerto.value.toString() + "/";
    this.getInfo();
    this.getFirtLocation();
  }

  async getInfo() {
    const info = await Device.getInfo();
    const id = await Device.getId();

    this.modelo = info.model;
    this.manofactura = info.manufacturer;
    this.uuid = id.uuid;
    console.log(info);
  }
  async getFirtLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.Latitud = coordinates.coords.latitude.toString();
    this.Longitud = coordinates.coords.longitude.toString();
    var btnIniciar = <HTMLButtonElement>document.getElementById('btnIniciar');
    btnIniciar.disabled=false;

  }
  async getLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.Latitud = coordinates.coords.latitude.toString();
    this.Longitud = coordinates.coords.longitude.toString();
    return { lat: this.Latitud, lon: this.Longitud }

  }
  listen(eventName: string) {
    return new Observable((Subscriber) => {
      this.socket.on(eventName, (data) => {
        Subscriber.next(data);
      })
    });
  }

   emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
  interval;
  clickenviar() {
    var btnIniciar = <HTMLButtonElement>document.getElementById('btnIniciar');
    var btnDetener = <HTMLButtonElement>document.getElementById('btnDetener');
    var txtIp = (<HTMLInputElement>document.getElementById('txtIP'));
    var txtPuerto = (<HTMLInputElement>document.getElementById('txtPuerto'));
    var txtTiempo= (<HTMLInputElement>document.getElementById('txtTiempo'));
    var tiempo=Number.parseInt(txtTiempo.value+"000");
    this.url = "http://" + txtIp.value.toString() + ":" + txtPuerto.value.toString() + "/";
    console.log(this.url);

    this.socket = io(this.url);
    btnIniciar.disabled = true;
    txtIp.disabled = true;
    txtPuerto.disabled = true;
    txtTiempo.disabled=true;
    btnDetener.disabled=false;
    this.Estado="Enviando";
    this.colorbad="success";
    let data = {
      UUID: this.uuid,
      manufacture: this.manofactura,
      model: this.modelo,
      Lat: this.Latitud,
      lon: this.Longitud,
      
    };
    console.log(data);
    this.emit('transmicion:Ubicacion', data);
    this.interval=setInterval(async function(){ 
      await this.getLocation();
      let data = {
        UUID: this.uuid,
        manufacture: this.manofactura,
        model: this.modelo,
        Lat: this.Latitud,
        lon: this.Longitud,
        
      };
      console.log(data);
      this.emit('transmicion:Ubicacion', data);



     }.bind(this), tiempo);


   

  }

  clickDetener(){
    var btnIniciar = <HTMLButtonElement>document.getElementById('btnIniciar');
    var btnDetener = <HTMLButtonElement>document.getElementById('btnDetener');
    var txtIp = (<HTMLInputElement>document.getElementById('txtIP'));
    var txtPuerto = (<HTMLInputElement>document.getElementById('txtPuerto'));
    var txtTiempo= (<HTMLInputElement>document.getElementById('txtTiempo'));
    btnIniciar.disabled = false;
    txtIp.disabled = false;
    txtPuerto.disabled = false;
    btnDetener.disabled=true;
    txtTiempo.disabled=false;
    this.Estado="Pausa";
    this.colorbad="danger"
    clearInterval(this.interval);
    this.socket.disconnect(this.uuid);
  }
  async cklVenta(){
    const modal = await this.modalController.create({
      component: PedidoPage,
      componentProps: {
        url: this.url,
        uuid:this.uuid
        
      }

    });
    await modal.present();
  }
  async cklLista(){
    const modal = await this.modalController.create({
      component: ListaPedidosPage,
      componentProps: {
        url: this.url,
        uuid:this.uuid
        
      }

    });
    await modal.present();
  }

}
