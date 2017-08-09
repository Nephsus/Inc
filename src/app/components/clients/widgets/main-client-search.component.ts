import { Component, OnDestroy, ViewChild, ViewContainerRef} from '@angular/core'
import { Observable } from "rxjs/Observable"
import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/retry";

import { DevicesAvailableService } from '../../../services/devices-available.services';
import { DevicesRegistered } from '../../../models/services/devices/RegisteredDevicesOutputType';
import { RegisteredDevicesOutputType } from '../../../models/services/devices/RegisteredDevicesOutputType';
import { DeleteUserDevicesOutputType } from '../../../models/services/devices/DeleteUserDevicesOutputType';
import { ClientService} from "../services/client.services";

import { InfiniteScrollListComponent } from './infinite-scroll.component';
import { RequestWrapperService } from "../../../services/request-wrapper.services";
import { environment } from '../../../../environments/environment';

@Component({
    selector : "mainclientsearch",
    templateUrl: "./main-client-search.component.html"
})
export class MainClientSearch implements OnDestroy{

 devicesResponse : RegisteredDevicesOutputType;

 private codeUser : string;

  @ViewChild(InfiniteScrollListComponent)
    private infiniteScrollListComponent: InfiniteScrollListComponent;


 private _clientNameStream$: Subject<string> = new Subject<string>();
 public showResponse:boolean = false;

constructor( private devicesAvailableService : DevicesAvailableService,  private clientService : ClientService, private request : RequestWrapperService  ){}

launchDeviceService( codeUser: string ){




  
  this.codeUser = codeUser;
  this.showResponse = true;
  //this._clientNameStream$.next(codeUser);
  this.infiniteScrollListComponent.codeUser = codeUser;
  this.infiniteScrollListComponent.start();
}

launchDeleteDevice( ){

        this.devicesAvailableService.deleteUserDevice(this.clientService.getUser().getCode(),
                        this.clientService.getSelectedDevice().getDeviceType() ).subscribe( );

        
  
}

 ngOnInit(): void {
     this.subscribeAndRecovery();
 }

subscribeAndRecovery(): void {
    this._clientNameStream$.asObservable().switchMap( 
                                (codeUser : string) => {    
                                    return this.executeQuery(codeUser);  }  )
                                        .subscribe( res => {
                                                            this.devicesResponse =  res;
                                                            this.clientService.setUser( this.devicesResponse.user );  
                                                        }, 
                                                    (error?: any) =>{
                                                         this.subscribeAndRecovery();} );

 }

executeQuery( codeuser : string ) : Observable<RegisteredDevicesOutputType> {
    return this.devicesAvailableService.getDevicesResponse( codeuser );
}

reset(){
 this.infiniteScrollListComponent.initialize();
}

 ngOnDestroy() {
    
    this._clientNameStream$.unsubscribe();
  }

}