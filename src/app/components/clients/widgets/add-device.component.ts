import { Component, Input, Output, EventEmitter,ComponentFactoryResolver,ViewChild, Type} from "@angular/core";

import { EnviorementDashboardProvider } from "../../../services/enviorement-dashboard.provider";
import { DevicesAvailableService } from "../../../services/devices-available.services";
import { ClientService } from "../services/client.services";
import { FunctionalSuccessDirective } from "../../../directives/functional-success.directive";
import { ResultData } from "../../../models/services/generics/ResultData";
import { ResultDataType } from "../../../models/services/generics/ResultDataType";


@Component({
    selector : "adddevice",
    templateUrl: "./add-device.component.html"
})
export class AddDevice{
   
public model:string;
public modelInvalid:boolean;
public platform:string;
public platformInvalid:boolean;
public idDevice:string;
public idDeviceInvalid:boolean;

@Output() clickGoBack = new EventEmitter();


constructor(private _enviorementDashboard : EnviorementDashboardProvider, 
            private _devicesAvailableService: DevicesAvailableService,
            private _clientService : ClientService){}

goBack() {
        this.clickGoBack.emit();
   }


resolve(){

    if( !this.model )
        this.modelInvalid = true;
    else
        this.modelInvalid = false;

    if( !this.platform  )
        this.platformInvalid = true;
    else
        this.platformInvalid = false;

    if( !this.idDevice )
        this.idDeviceInvalid = true;
     else
        this.idDeviceInvalid = false;


    if( this.platformInvalid ||   this.idDeviceInvalid ||  this.idDeviceInvalid )
        return;


    this._devicesAvailableService.addDeviceToUser( this._clientService.getUser().getCode(),
                                                    this.idDevice,
                                                    this.model,
                                                    this.platform  )
                                 .subscribe( resp => 

                                      this._enviorementDashboard.receiveSuccessAction.next( new ResultData( ResultDataType.Success, resp.status, resp.description, undefined, "Close") )
                                 );

}   

}