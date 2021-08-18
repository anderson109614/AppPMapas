import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor(private http: HttpClient) { }
  
  getListProductos(url) { 
   
    return this.http.get<any>(url + 'Productos')
  }
  getClienteCI(url,ci) { 
   
    return this.http.get<any>(url + 'Clientes/'+ci)
  }
  guardarCliente(url,cliente) { 
   
    return this.http.post<any>(url + 'Clientes/',cliente)
  }
  guardarPedido(url,pedido) { 
   
    return this.http.post<any>(url + 'Pedido/',pedido)
  }
  getPedido(url,fecha,uuid) { 
   
    return this.http.get<any>(url + 'Pedido/'+fecha+"*"+uuid)
  }

}
