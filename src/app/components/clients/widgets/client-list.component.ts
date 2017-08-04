import { Component, Input, Renderer, ElementRef } from "@angular/core";
import { DevicesRegistered } from '../../../models/services/devices/RegisteredDevicesOutputType'
import { ClientService} from "../services/client.services";


@Component({
    selector : "clientlist",
    templateUrl: "./client-list.component.html",
    styleUrls: ['../../../../assets/css/plugins/dataTables/datatables.min.css']
})
export class ClientList{

   public titleNav: string ="Buscador de Clientes";
   public links: Array<any> = [{url:"index.html",name:"administracion"}];
   
   highlightedRow: number;

   @Input() devicesRegistered : [DevicesRegistered];

   constructor( private clientService : ClientService){}

   selectedDevice( device : DevicesRegistered, i: number){
        this.highlightedRow = i;
        this.clientService.setSelectedDevice( device );
   }


  
   



}