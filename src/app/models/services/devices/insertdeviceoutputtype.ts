import {HeaderData} from "../headerData";

export class InsertDeviceOutputType {

constructor( public status: string, public description: string, public headerData?: HeaderData){
    
 }

static fromJson(json: any): InsertDeviceOutputType {
        return new InsertDeviceOutputType( json.insertDeviceOutputType.status,
                                           json.insertDeviceOutputType.description,
                                            HeaderData.createHeaderData(json.headerData) );
    }


}
