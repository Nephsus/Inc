
import { Component} from "@angular/core";

import { EnviorementDashboardProvider } from "../../services/enviorement-dashboard.provider"

@Component({
    selector : "technicalError",
    templateUrl: "./technical-error.component.html"
})
export class TechnicalError{

     constructor( public _enviorement : EnviorementDashboardProvider){}


}