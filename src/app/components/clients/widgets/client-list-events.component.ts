import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild} from "@angular/core";
import { ActivatedRoute, Params } from '@angular/router';
import { ClientService } from "../services/client.services";
import { DevicesRegistered } from '../../../models/services/devices/RegisteredDevicesOutputType'
import { Subscription } from 'rxjs/Subscription';

import { InfiniteScrollListComponent } from './infinite-scroll.component';

@Component({
    selector : "clientlistevents",
    templateUrl: "./client-list-events.component.html"
})
export class ClientListEvents implements  OnInit, OnDestroy{
  
  private subscription: Subscription;

  public loadTable : boolean = false;

  @Output() clickGoBack = new EventEmitter();
 
  @ViewChild(InfiniteScrollListComponent)
    private infiniteScrollListComponent: InfiniteScrollListComponent;

 constructor(private route: ActivatedRoute,public clientService : ClientService) {
  
 }

  ngOnInit(){
      this.subscription = this.clientService.receiveDevice$.subscribe( (device: DevicesRegistered) => {
       });
  }

  show(){
    this.loadTable = true;

  }


  goBack() {
        this.clickGoBack.emit();
   }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}


