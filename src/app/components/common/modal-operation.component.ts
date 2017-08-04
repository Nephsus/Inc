import { Component, EventEmitter, Output } from '@angular/core';

import { EnviorementDashboardProvider } from '../../services/enviorement-dashboard.provider'
import { SuccessData } from '../../models/services/generics/successdata';

@Component({
   
    templateUrl: "./modal-operation.component.html"
})
export class ModalOperation {

    public successdata: SuccessData;

    constructor(public _enviorementDashboard : EnviorementDashboardProvider){}

    onCloseEvent(){
        this._enviorementDashboard.receiveCloseAction.next();
    }

 
}