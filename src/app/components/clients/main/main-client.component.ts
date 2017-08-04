import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core'
import { DevicesAvailableService } from '../../../services/devices-available.services'
import { RegisteredDevicesOutputType } from '../../../models/services/devices/RegisteredDevicesOutputType';
import { Observable } from "rxjs/Observable"
import { Subject } from "rxjs/Subject";
import { Subscription } from 'rxjs/Subscription';
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/retry";
import { ClientService} from "../services/client.services";
import { DevicesRegistered } from '../../../models/services/devices/RegisteredDevicesOutputType';
import { ClientListEvents } from "../widgets/client-list-events.component";


@Component({
    templateUrl: "./main-client.component.html"
})
export class MainClient implements OnInit,OnDestroy{
   
    public windowsToShow : number = 0;
 
    private subscription: Subscription;


    parentSubject:Subject<any> = new Subject();



    @ViewChild(ClientListEvents)
    private clientListEvents: ClientListEvents;


    constructor( public clientService : ClientService ){
           
    }


    notifyChildren() {
        this.parentSubject.next('some value');
    }

    ngOnInit(){
        this.windowsToShow = 0;
        this.subscription = this.clientService.receiveAction$.subscribe( (action:number) => {
                this.loadwindowsToShow( action );
            });
    }

    loadwindowsToShow( action:number ){
        this.windowsToShow = action;

        if(action === 1)
          this.clientListEvents.show();
        
           

    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
  }

    restore(anything : any){
        this.windowsToShow = 0;
    }

} 