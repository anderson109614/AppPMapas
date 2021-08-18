import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DatosService } from '../../servicios/datos.service';
import { NewClientePage } from '../new-cliente/new-cliente.page';
import { Geolocation } from '@capacitor/geolocation';
@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

  numeros: number[] = [];
  productos: any = [];
  @Input() url;
  @Input() uuid;

  Latitud = "";
  Longitud = "";
  constructor(public modalController: ModalController, private datosSer: DatosService,

    public toastController: ToastController) { }

  ngOnInit() {
    this.cargarNumeros();
    this.cargarProductos();
    this.getFirtLocation();
  }
  cargarNumeros() {
    for (let index = 1; index < 100; index++) {
      this.numeros.push(index);

    }
  }
  async getFirtLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.Latitud = coordinates.coords.latitude.toString();
    this.Longitud = coordinates.coords.longitude.toString();
    var btnIniciar = <HTMLButtonElement>document.getElementById('btnGuardarPEdido');
    btnIniciar.disabled = false;

  }
  regresarBTN() {
    this.modalController.dismiss({
      guardado: 0
    });
  }
  cargarProductos() {
    console.log('url', this.url);
    this.datosSer.getListProductos(this.url).subscribe(
      res => {
        console.log(res);
        this.productos = res;


      },
      err => {
        console.log(err);
      }
    );
  }
  cliente: {
    _id: "",
    Nombre: "",
    Cedula: "",
    Tienda: "",
    Direccion: ""
  } = {
      _id: "",
      Nombre: "",
      Cedula: "",
      Tienda: "",
      Direccion: ""
    };

  BuscarCLiente() {
    var ci = (<HTMLInputElement>document.getElementById('txtCedulaBus')).value;

    this.datosSer.getClienteCI(this.url, ci).subscribe(
      res => {
        if (res.length > 0) {
          this.cliente = res[0]
        } else {
          this.modalAñadir(ci);


        }


      },
      err => {
        console.log(err);
      }
    );
  }
  async modalAñadir(ci) {
    const modal = await this.modalController.create({
      component: NewClientePage,
      componentProps: {
        ci: ci,
        url: this.url

      }

    });
    await modal.present();
    const { data } = await modal.onDidDismiss();

    try {


      if (data.est == '1') {
        await this.BuscarCLiente();

      }



    } catch (error) {

    }

  }
  async presentToast(msj: string) {

    const toast = await this.toastController.create({
      message: msj,
      duration: 5000
    });
    toast.present();



  }
  cklGuardar() {
    let listaProductos = [];
    let listacheck = document.getElementsByClassName('chk');
    for (let index = 0; index < listacheck.length; index++) {
      let checkUso = <HTMLIonCheckboxElement>listacheck[index];
      if (checkUso.checked) {
        let pro = this.buscarProducto(checkUso.id);
        pro.Cantidad = (<HTMLIonSelectElement>document.getElementById('sel-' + checkUso.id)).value;
        listaProductos.push(pro);
      }

    }
    console.log(listaProductos);

    if (this.cliente.Cedula.length > 0 && listaProductos.length > 0) {
      var currentdate = new Date();
      var dia = currentdate.getDate().toString();
      if (dia.length == 1) {
        dia = "0" + dia;
      }
      var mes = (currentdate.getMonth() + 1).toString();
      if (mes.length == 1) {
        mes = "0" + mes;
      }
      var date = currentdate.getFullYear() + "-" + mes + "-" + dia;
      var time = currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
      let pedido = { Productos: listaProductos, Cliente: this.cliente, Lat: this.Latitud, Lon: this.Longitud, Date: date, Time: time,UUID:this.uuid };
      this.datosSer.guardarPedido(this.url, pedido).subscribe(
        res => {
          this.regresarBTN();


        },
        err => {
          console.log(err);
        }
      );




    } else {
      this.presentToast('Datos Incompletos');
    }

  }
  buscarProducto(nom) {
    for (let index = 0; index < this.productos.length; index++) {
      if (this.productos[index].Nombre == nom) {
        return this.productos[index]
      }

    }
  }

}
