export class StatisticsServiceFilterOutputType{

constructor( public monthFilter:Array<MonthFilter>, public alarmTypes:Array<AlarmTypes> ){}

static fromJson(json: any): StatisticsServiceFilterOutputType {
        return new StatisticsServiceFilterOutputType(
            json.statisticsServiceFilterOutputType.monthFilter, json.statisticsServiceFilterOutputType.alarmTypes   
        );
    }
}

export class MonthFilter{

   constructor( public key : string, public value: string){}
}

export class AlarmTypes{

   constructor( public key : string, public value: string){}
}