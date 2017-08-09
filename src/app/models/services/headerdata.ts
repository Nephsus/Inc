import {Pagination} from "./pagination";
import {ErrorData} from "./ErrorData";

export class HeaderData{

constructor(public pagination?:Pagination, public errorData?:ErrorData ){}


public static createHeaderData(json?:any): HeaderData {
         if (json && json.pagination)
                 if(json.errorData)
                  return new HeaderData(json.pagination, new ErrorData(json.errorData.errorText, json.errorData.errorFlag, json.errorData.errorType));
                 else
                   return new HeaderData(json.pagination);
         else
            if (json && json.errorData )
                  return new HeaderData({}, new ErrorData(json.errorData.errorText, json.errorData.errorFlag, json.errorData.errorType));


         return undefined;
   }

}