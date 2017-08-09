import {HeaderData} from "../headerData";

export class SendPushOutputType{


    constructor( public status: string, public description: string, public headerData?: HeaderData){
    
 }

static fromJson(json: any): SendPushOutputType {
        return new SendPushOutputType( json.sendPushOutputType.status,
                                           json.sendPushOutputType.description,
                                            HeaderData.createHeaderData(json.headerData) );
    }



}