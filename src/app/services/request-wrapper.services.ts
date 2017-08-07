
import { Injectable } from '@angular/core';
import { Http, Response,URLSearchParams  } from "@angular/http";
import { Observable } from "rxjs/Observable"
import { Router , NavigationExtras} from "@angular/router";

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

import { EnviorementDashboardProvider } from './enviorement-dashboard.provider'

@Injectable()
export class RequestWrapperService {

    /*
 "DevicesServiceResponse":   
 {"headerData" :{"errorData" :
 {"errorCode":"ER994","errorType":"T","errorText" : 
 "Cuenta origen inexistente."}}} 
*/

constructor( private _http:Http, private _router : Router, private _enviorement : EnviorementDashboardProvider){}

     get(url:string, params?:URLSearchParams, headers?:any){



            return this._http.get(url,  { search: params } )
                      .map( resp =>{
                            let body = resp.json();
                             if (body.headerData && body.headerData.errorData && body.headerData.errorData.errorType==='T'){
                                this._enviorement.technicalError = body.headerData.errorData;
                                throw new Error(body.headerData.errorData.errorText);
                             }else{
                                return body;
                            }
                      })
                      .catch((error: any) =>{
                            if (this._enviorement.technicalError.errorType === "F")
                                this._router.navigate(['/technicalError']);
                            else
                                return Observable.throw( this._enviorement.technicalError );

                            return Observable.empty();                
          })


     }

      post(url:string, params?:any, headers?:any){
            alert(url);
            return this._http.post(url,{},{})
                      .map( resp =>{
                            let body = resp.json();
                             if (body.headerData && body.headerData.errorData){
                                this._enviorement.technicalError = body.headerData.errorData;
                                throw new Error(body.headerData.errorData.errorText);
                             }else{
                                return body;
                            }
                      })
                      .catch((error: any) =>{
                            if (this._enviorement.technicalError.errorType === "F")
                                this._router.navigate(['/technicalError']);
                            else
                                return Observable.throw( this._enviorement.technicalError );

                            return Observable.empty();                
          })


     }

}