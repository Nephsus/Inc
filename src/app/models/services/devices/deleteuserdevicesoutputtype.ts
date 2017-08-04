import {User} from "../enviorements/user";
import {HeaderData} from "../headerData";

export class DeleteUserDevicesOutputType {



constructor( public numDeletedDevices: number, public headerData?: HeaderData){
    
 }

static fromJson(json: any): DeleteUserDevicesOutputType {
        return new DeleteUserDevicesOutputType( json.numDeletedDevices, HeaderData.createHeaderData(json.headerData) );
    }


}
