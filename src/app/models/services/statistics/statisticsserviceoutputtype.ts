import {CurrentMonth} from './CurrentMonth';

export class StatisticsServiceOutputType{

constructor( public lineChartData:Array<LineChartData>, public lineChartLabels:Array<string> , public currentMonth?: CurrentMonth ){

}
static fromJson(json: any): StatisticsServiceOutputType {
        return new StatisticsServiceOutputType(
            json.statisticsServiceOutputType.lineChartData, json.statisticsServiceOutputType.lineChartLabels, json.statisticsServiceOutputType.currentMonth
        );
    }
}

export class LineChartData{

   constructor( public data : Array<number>, public label: string){}
}


