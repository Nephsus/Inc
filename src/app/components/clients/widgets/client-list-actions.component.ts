import { Component, Input, Output, EventEmitter} from "@angular/core";
import { Router , NavigationExtras} from "@angular/router";
import { ClientService} from "../services/client.services";


@Component({
    selector : "clientlistactions",
    templateUrl: "./client-list-actions.component.html"
})
export class ClientListActions {

 constructor( private router : Router, private clientService : ClientService) {}

 listActions : [string] = ["Vizualizar" , "Eliminar", "Envío Manual" ];

 @Output()deleteDevice = new EventEmitter();


   
  clickAction( index: number ){

    if( index === 2){
        this.deleteDevice.emit()
    }else{
        this.clientService.receiveActionEvent( index );

    }


}

}