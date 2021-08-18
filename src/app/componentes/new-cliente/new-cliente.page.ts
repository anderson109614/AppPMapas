import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import {DatosService} from '../../servicios/datos.service';
@Component({
  selector: 'app-new-cliente',
  templateUrl: './new-cliente.page.html',
  styleUrls: ['./new-cliente.page.scss'],
})
export class NewClientePage implements OnInit {
  @Input() url;
  @Input() ci;
  constructor(public modalController: ModalController,
   private datosSer:DatosService,
    public toastController: ToastController) { }

  ngOnInit() {
  }
  regresarBTN() {
    this.modalController.dismiss({
      est: 0
    });
  }

  cklGuardar(){
    let cliente={
    Nombre: (<HTMLInputElement>document.getElementById('txtNombreNew')).value,
    Cedula: (<HTMLInputElement>document.getElementById('txtCedulanNew')).value,
    Tienda: (<HTMLInputElement>document.getElementById('txtTiendaNew')).value,
    Direccion: (<HTMLInputElement>document.getElementById('txtDireccionNew')).value};

    console.log(cliente);

    this.datosSer.guardarCliente(this.url,cliente).subscribe(
      res => {
        
        this.modalController.dismiss({
          est: 1
        });

      },
      err => {
       console.log(err);
       this.presentToast('Error al guardar');
      }
    );

  }
  async presentToast(msj: string) {

    const toast = await this.toastController.create({
      message: msj,
      duration: 5000
    });
    toast.present();



  }



}
