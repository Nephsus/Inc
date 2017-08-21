import {User} from "../enviorements/user";
import {HeaderData} from "../headerData";

export class RegisteredDevicesOutputType {



constructor( public user : User, public devices : DevicesRegistered[], public headerData?: HeaderData){
    
 }

static fromJson(json: any): RegisteredDevicesOutputType {
        return new RegisteredDevicesOutputType(this.createUserfromJson(json.registeredDevicesOutputType.user), 
                                                this.createArrayDevices(json.registeredDevicesOutputType), HeaderData.createHeaderData(json.headerData) );
    }

static createUserfromJson(json:any): User {
        return new User(json.code,json.name,json.lastName,json.documentID, json.persNum);
   }



static createArrayDevices(json:any): DevicesRegistered[]{
        let arrDevices : DevicesRegistered[]= [];
        if(json !==undefined && json.devicesRegistered !==undefined )
            for (let item of json.devicesRegistered) {
                arrDevices.push( new DevicesRegistered( item.deviceType,
                                                        item.platform,
                                                        item.dischargeDate,
                                                        item.lastCheckDate ,
                                                        item.pushToken,
                                                        item.deviceId) );
        }

        return arrDevices;

}

}



export class DevicesRegistered {

constructor(  public  deviceType : string, 
              public  platform : string, 
              public  dischargeDate : string, 
              public  lastCheckDate : string,
              public  pushToken: string,
              public  deviceId){

 }


 static fromJson(json: any): DevicesRegistered {
 
    return new DevicesRegistered(json.deviceType,json.platform,json.dischargeDate,json.lastCheckDate, json.pushToken, json.deviceId );
}

    getDeviceType():string{
        return this.deviceType || '';
    }

    getPlatform():string{
        return this.platform || '';
    }

    getDischargeDate():string{
        return this.dischargeDate || '';
    }

    getDateLastCheck():string{
        return this.lastCheckDate || '';
    }

    getPushToken():string{
        return this.pushToken || '';
    }


    getDeviceID():string{
        return this.deviceId || '';
    }


}
