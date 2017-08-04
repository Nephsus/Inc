import { Injectable  } from "@angular/core";
import { Http, Response,URLSearchParams  } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap"
import { RegisteredDevicesOutputType } from "../models/services/devices/RegisteredDevicesOutputType";
import { DeleteUserDevicesOutputType } from "../models/services/devices/DeleteUserDevicesOutputType";
import { InsertDeviceOutputType } from "../models/services/devices/InsertDeviceOutputType";
import { RequestWrapperService } from "./request-wrapper.services"
import { environment } from '../../environments/environment';

@Injectable()
export class DevicesAvailableService {

 constructor( private _http:Http, private _request: RequestWrapperService){}


 getDevicesResponse( codeuser : string): Observable<RegisteredDevicesOutputType> {
      let pathComplete;
       if(codeuser === undefined){
            pathComplete = environment.baseUrl + environment.intermediateUrl + '/registereddevices/getDevices'
       }else{
            pathComplete = environment.baseUrl + environment.intermediateUrl + '/registereddevices/getDevices/' + codeuser
       }

       return this._request.get( pathComplete ).map( response =>  RegisteredDevicesOutputType.fromJson(response))

 } 


  deleteUserDevice( codeuser : string, deviceId: string) : Observable<DeleteUserDevicesOutputType>{
       return this._request.get( environment.baseUrl + environment.intermediateUrl + `/deleteUserDevice/getDevices/${codeuser}/${deviceId}` )
                              .map( response =>  DeleteUserDevicesOutputType.fromJson(response))

  }
  

  addDeviceToUser( codeuser : string, deviceId: string, model:string, platform:string ){
       return this._request.post( environment.baseUrl + environment.intermediateUrl + '/registereddevices/insertDevice' )
                              .map( response =>  InsertDeviceOutputType.fromJson(response))
      


  }


}