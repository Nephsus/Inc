import { ResultDataType } from "./ResultDataType";

export class ResultData{
       constructor( public messageType: ResultDataType, public successTitle : string,  
                    public successText: string, public titleOK : string, public titleClose: string){} 
}