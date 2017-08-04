import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router"
import { StatisticsServiceOutputType }   from "../models/services/statistics/statisticsserviceoutputType";
import { Observable } from "rxjs/Observable"
import { StatisticsService } from "./statistics.services"

@Injectable()
export class StatisticsResolve implements Resolve<StatisticsServiceOutputType>{

      constructor(private statisticsService: StatisticsService){}


      resolve( route: ActivatedRouteSnapshot) : Observable<StatisticsServiceOutputType> {
              return this.statisticsService.getStadisticsResponse();

      }

}