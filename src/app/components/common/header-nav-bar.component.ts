import { Component} from "@angular/core";

import { Device} from "../../models/services/enviorements/device";
import { User} from "../../models/services/enviorements/user";
import { ClientService } from "../clients/services/client.services";

@Component({
    selector : "headernavbar",
    templateUrl: "./header-nav-bar.component.html"
})
export class HeaderNavBar{

    private user : User;
    private udid : Device;
    

    constructor(public _clientService : ClientService ){

       

    }

 




}


