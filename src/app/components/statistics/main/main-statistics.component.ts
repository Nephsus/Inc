import { Component,ElementRef, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { Observable } from "rxjs/Observable"
import { Subject } from "rxjs/Subject";
import { Subscription } from 'rxjs/Subscription';
import { StatisticsService } from "../../../services/statistics.services";
import { StatisticsServiceFilterOutputType } from "../../../models/services/statistics/statisticsservicefilteroutputtype";
import { StatisticsServiceOutputType }  from "../../../models/services/statistics/statisticsserviceoutputtype";
import { SendAlarmsOutputType } from "../../../models/services/statistics/sendalarmsoutputtype";
import { LineChartHistory } from "../widgets/line-chart-history.component";  

import { DatePickerOptions, DateModel } from 'ng2-datepicker';

@Component({
    templateUrl: "./main-statistics.component.html"
})
export class MainStatistics implements OnInit {


public elementsFilter: StatisticsServiceFilterOutputType;

public selectedValueMonth:any;
public selectedValueAlarm:any;


// Doughnut
  public doughnutChartLabels:string[] = ['Notificaciones email', 'Notificaciones sms', 'Notificaciones push'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';
  public doughnutChartOptions:any = { responsive: true };

  public optionsDatePicker : DatePickerOptions;
  

  public doughnutChartColors:Array<any> = [
    { 
      backgroundColor: ['#1c84c6','#23c6c8','#1ab394'],
      borderColor: '#FFFFFF'
    }
  ];

  public dateSearch : string;
  public date : any;

//public subjectST = new Subject<StatisticsServiceFilterOutputType>();

constructor(private elementRef:ElementRef, private statisticsService: StatisticsService) {

 this.optionsDatePicker = new DatePickerOptions();
this.optionsDatePicker.format = 'DD/MM/YYYY';

this.dateSearch='hoy';
};

mychange(val)
{

  this.dateSearch=val.formatted;

  this.statisticsService.getSendAlarm( this.dateSearch ).subscribe( (response: SendAlarmsOutputType) =>{
                this.doughnutChartData = [ response.sendSms,response.sendEmail,response.sendPush];
                this.selectedValueMonth = this.elementsFilter.monthFilter[this.elementsFilter.monthFilter.length -1 ];
            });

}

@ViewChild(LineChartHistory)
  private childLine: LineChartHistory;


  ngAfterViewInit() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.innerText =" var mapData = {US: 298,SA: 200};$('#world-map').vectorMap({map: 'world_mill_en',backgroundColor: 'transparent',regionStyle: {initial: {fill: '#e4e4e4','fill-opacity': 0.9,stroke: 'none','stroke-width': 0,'stroke-opacity': 0}},series: {regions: [{values: mapData,scale: [ '#22d6b1'],normalizeFunction: 'polynomial'}]},});";
    this.elementRef.nativeElement.appendChild(s);
  }

  ngOnInit(){

        this.statisticsService.getStadisticsResponseFilter().subscribe( 
            (filterParam: StatisticsServiceFilterOutputType) =>{
                this.elementsFilter = filterParam;
                this.selectedValueMonth = this.elementsFilter.monthFilter[this.elementsFilter.monthFilter.length -1 ];
            });


        this.statisticsService.getSendAlarm( ).subscribe( (response: SendAlarmsOutputType) =>{
                this.doughnutChartData = [ response.sendSms,response.sendEmail,response.sendPush];
               
            });    
    }

   executeFilter(){
         this.childLine.refresh(this.selectedValueMonth,this.selectedValueAlarm );
   }
    


    
}