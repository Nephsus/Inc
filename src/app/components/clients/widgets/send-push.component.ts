import { Component, Input, Output, EventEmitter,ComponentFactoryResolver,ViewChild, Type} from "@angular/core";

import { EnviorementDashboardProvider } from "../../../services/enviorement-dashboard.provider";
import { FunctionalSuccessDirective } from "../../../directives/functional-success.directive";


@Component({
    selector : "sendpush",
    templateUrl: "./send-push.component.html"
})
export class SendPush{
   



@Output() clickGoBack = new EventEmitter();


constructor(private _enviorementDashboard : EnviorementDashboardProvider){}

goBack() {
        this.clickGoBack.emit();
   }


resolve(){
    this._enviorementDashboard.receiveSuccessAction.next( );
}   

}