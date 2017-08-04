export class StatisticsServiceOutputType{

constructor( public lineChartData:Array<LineChartData>, public lineChartLabels:Array<string> ){

}
static fromJson(json: any): StatisticsServiceOutputType {
        return new StatisticsServiceOutputType(
            json.statisticsServiceOutputType.lineChartData, json.statisticsServiceOutputType.lineChartLabels
        );
    }
}

export class LineChartData{

   constructor( public data : Array<number>, public label: string){}
}


