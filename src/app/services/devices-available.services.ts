import { Injectable  } from "@angular/core";
import { Http, Response,URLSearchParams  } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap"
import { RegisteredDevicesOutputType } from "../models/services/devices/RegisteredDevicesOutputType";
import { RegisterUserDeviceRequestType } from "../models/services/devices/RegisterUserDeviceRequestType";
import { DeleteUserDevicesOutputType } from "../models/services/devices/DeleteUserDevicesOutputType";
import { DeleteUserDevicesResponseType} from "../models/services/devices/DeleteUserDevicesResponseType"
import { RegisterUserDeviceOutputType } from "../models/services/devices/RegisterUserDeviceOutputType";
import { SendPushInputType } from "../models/services/devices/SendPushInputType";
import { SendPushOutputType } from "../models/services/devices/SendPushOutputType";
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


  deleteUserDevice( codeuser : string, deviceId: string) : Observable<DeleteUserDevicesResponseType>{
       return this._request.get( environment.baseUrl + environment.intermediateUrl + `/deleteUserDevice/getDevices/${codeuser}/${deviceId}` )
                              .map( response =>  DeleteUserDevicesResponseType.fromJson(response))

  }
  

  addDeviceToUser( codeuser : string, deviceId: string, model:string, platform:string, tokenPush:string ){

       let param = new RegisterUserDeviceRequestType( codeuser, model, platform, deviceId, tokenPush )

       return this._request.post( environment.baseUrl + environment.intermediateUrl + '/registereddevices/insertDevice', param )
                              .map( response => {
                                console.log(response);

                                return  RegisterUserDeviceOutputType.fromJson(response); });
      


  }

   sendPush( textPush : string, tokenPush: string){

       let param = new SendPushInputType( textPush, tokenPush )

       return this._request.post( environment.baseUrl + environment.intermediateUrl + '/msgPush/sendMsgPush', param )
                              .map( response => {
                                console.log(response);

                                return  SendPushOutputType.fromJson(response); });
      


  }


}