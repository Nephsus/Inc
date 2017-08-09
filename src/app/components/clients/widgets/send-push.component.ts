import { Component, Input, Output, EventEmitter,ComponentFactoryResolver,ViewChild, Type} from "@angular/core";

import { EnviorementDashboardProvider } from "../../../services/enviorement-dashboard.provider";
import { DevicesAvailableService } from "../../../services/devices-available.services";
import { FunctionalSuccessDirective } from "../../../directives/functional-success.directive";
import { ClientService } from "../services/client.services";
import { ResultData } from "../../../models/services/generics/ResultData";
import { ResultDataType } from "../../../models/services/generics/ResultDataType";

@Component({
    selector : "sendpush",
    templateUrl: "./send-push.component.html"
})
export class SendPush{
   

public textPush: string;


@Output() clickGoBack = new EventEmitter();


constructor(private _enviorementDashboard : EnviorementDashboardProvider,
            private _devicesAvailableService: DevicesAvailableService,
            public clientService : ClientService){}

goBack() {
        this.clickGoBack.emit();
   }


resolve(){


    alert("aprietame fuerrre=>" + this.textPush + "::::" + this.clientService.getSelectedDevice().getPushToken());

    this._devicesAvailableService.sendPush(this.textPush, this.clientService.getSelectedDevice().getPushToken())
                .subscribe( resp =>{ 

                                        if (resp.headerData && resp.headerData.errorData){
                                               this._enviorementDashboard.receiveSuccessAction.next(new ResultData( ResultDataType.Error, "Error", resp.headerData.errorData.errorText, "", "Close"));
                                        }
                                        else
                                            this._enviorementDashboard.receiveSuccessAction.next( new ResultData( ResultDataType.Success, resp.status, resp.description, "", "Close") );
                                   
                                    });

    //this._enviorementDashboard.receiveSuccessAction.next( );
}   

}