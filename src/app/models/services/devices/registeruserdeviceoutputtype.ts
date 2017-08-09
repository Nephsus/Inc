import {HeaderData} from "../headerData";

export class RegisterUserDeviceOutputType {

constructor( public status: string, public description: string, public headerData?: HeaderData){
    
 }

static fromJson(json: any): RegisterUserDeviceOutputType {
        return new RegisterUserDeviceOutputType( json.registerUserDeviceOutputType.status,
                                           json.registerUserDeviceOutputType.description,
                                            HeaderData.createHeaderData(json.headerData) );
    }


}
