import {Pagination} from "./pagination";
export class HeaderData{

constructor(public pagination?:Pagination ){}


public static createHeaderData(json?:any): HeaderData {
         if (json && json.pagination)
                return new HeaderData(json.pagination);
         return undefined;
   }

}