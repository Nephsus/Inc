import { Injectable  } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject }    from 'rxjs/Subject';

import { DevicesRegistered } from '../../../models/services/devices/RegisteredDevicesOutputType';
import { User } from '../../../models/services/enviorements/user';

@Injectable()
export class ClientService {

  // Observable number sources
  public receiveAction = new Subject<number>();

  // Observable Selected Device
  public receiveDevice = new Subject<DevicesRegistered>();
  
  // Observable Selected User
  public selectedUser = new Subject<User>();


  private _selectedDevices : DevicesRegistered;
  private _selectedUser : User;
  // Observable number streams
  receiveAction$ = this.receiveAction.asObservable();

  // Observable receiveDevice 
  receiveDevice$ = this.receiveDevice.asObservable();
 
  // Service message commands
  receiveActionEvent(action: number) {
    this.receiveAction.next( action );
  }
 

  setSelectedDevice(selectedDevices : DevicesRegistered){
    
    this._selectedDevices = selectedDevices;
    this.receiveDevice.next( selectedDevices );
  }

  getSelectedDevice(): DevicesRegistered{
    return this._selectedDevices;
  }

  setUser(user : User){
    this._selectedUser = user;
  }

  getUser(): User{
   return this._selectedUser;
  }





}