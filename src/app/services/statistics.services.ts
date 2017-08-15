
import { Injectable  } from "@angular/core";
import { Http, Response, URLSearchParams  } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { StatisticsServiceOutputType } from "../models/services/statistics/statisticsserviceoutputType";
import { environment } from '../../environments/environment';
import { RequestWrapperService } from "./request-wrapper.services"
import { StatisticsServiceFilterOutputType } from "../models/services/statistics/StatisticsServiceFilterOutputType";
import { SendAlarmsOutputType } from "../models/services/statistics/SendAlarmsOutputType";
@Injectable()
export class StatisticsService {


 constructor(  private _http:Http, private _request: RequestWrapperService){}


 getStadisticsResponse(params?: URLSearchParams ): Observable<StatisticsServiceOutputType> {

          return this._request.get(environment.baseUrl + environment.intermediateUrl + '/statistics/getStadisticsResponse', params)
                     .map(data => StatisticsServiceOutputType.fromJson(data));        
 
 }

 getStadisticsResponseFilter(): Observable<StatisticsServiceFilterOutputType> {
        return  this._request.get(environment.baseUrl + environment.intermediateUrl + '/statistics/getStadisticsResponseFilter')
                    .map( response =>  StatisticsServiceFilterOutputType.fromJson(response));

 
 }

 getSendAlarm( day: string = undefined): Observable<SendAlarmsOutputType> {
        let dayQuery = day === undefined ? '' : day ;
        return  this._request.get(environment.baseUrl + environment.intermediateUrl + '/statistics/getSendAlarmsResponse/' + dayQuery)
                    .map( response =>  SendAlarmsOutputType.fromJson(response));

 
 }



}