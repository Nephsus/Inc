import {User} from "../enviorements/user";
import {HeaderData} from "../headerData";
import {DeleteUserDevicesOutputType} from "./DeleteUserDevicesOutputType";

export class DeleteUserDevicesResponseType {



constructor( public deleteUserDevicesOutputType: DeleteUserDevicesOutputType, public headerData?: HeaderData){
    
 }

static fromJson(json: any): DeleteUserDevicesResponseType {
        return new DeleteUserDevicesResponseType( json.deleteUserDevicesOutputType, HeaderData.createHeaderData(json.headerData) );
    }


}
