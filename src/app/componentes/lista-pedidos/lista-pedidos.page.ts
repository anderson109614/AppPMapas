import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DatosService } from '../../servicios/datos.service';
@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.page.html',
  styleUrls: ['./lista-pedidos.page.scss'],
})
export class ListaPedidosPage implements OnInit {
  @Input() url;
  @Input() uuid;
  constructor(public modalController: ModalController,
    private datosSer: DatosService,
    public toastController: ToastController) { }

  ngOnInit() {
    this.cargarFecha();
  }


  regresarBTN() {
    this.modalController.dismiss({
      guardado: 0
    });
  }
  cargarFecha(){
    var txtdate = (<HTMLIonDatetimeElement>document.getElementById('dateBusqueda'));
    var f = new Date();
    var dia: string = f.getDate().toString();
    if (dia.length == 1) {
      dia = "0" + dia;
    }
    var mes: string = (f.getMonth() + 1).toString();
    if (mes.length == 1) {
      mes = "0" + mes;
    }
    var date = f.getFullYear() + "-" + mes + "-" + dia;
    txtdate.value=date;
    this.cklbuscar();

  }
  pedidos:any=[];
  cklbuscar(){
    var txtdate = (<HTMLIonDatetimeElement>document.getElementById('dateBusqueda'));
  var  fecha=txtdate.value.split('T')[0];
  console.log(fecha);
  this.datosSer.getPedido(this.url, fecha,this.uuid).subscribe(
    res => {
      this.pedidos=res;
      console.log(this.pedidos);


    },
    err => {
      console.log(err);
    }
  );
  }
}
