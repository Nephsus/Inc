
import {AlertHistPush} from "./alerthistpush";
import {HeaderData} from "../headerData";

export class AlertPushHistoryOutputType {


constructor( public alertHistPush: AlertHistPush[], public headerData?: HeaderData){
    
 }

static fromJson(json: any): AlertPushHistoryOutputType {
        return new AlertPushHistoryOutputType( json.alertHistPush, HeaderData.createHeaderData(json.headerData) );
    }


}



