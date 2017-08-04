import { Component, Input, Output, EventEmitter} from "@angular/core";




@Component({
    selector : "clientsearch",
    templateUrl: "./client-search.component.html"
})
export class ClientSearch {

    @Output() devicesLauncherSearch = new EventEmitter();
    @Output() reset = new EventEmitter();
    userCode : string;


getClient(){

   if( this.userCode !== undefined)
    this.devicesLauncherSearch.emit( this.userCode );
}

resetSearch(){
   this.reset.emit();
}

}