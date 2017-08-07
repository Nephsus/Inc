import { Component, EventEmitter, Output } from '@angular/core';

import { EnviorementDashboardProvider } from '../../services/enviorement-dashboard.provider'
import { ResultData } from '../../models/services/generics/ResultData';

@Component({
   
    templateUrl: "./modal-operation.component.html"
})
export class ModalOperation {

    public successdata: ResultData;

    constructor(public _enviorementDashboard : EnviorementDashboardProvider){}

    onCloseEvent(){
        this._enviorementDashboard.receiveCloseAction.next();
    }

 
}