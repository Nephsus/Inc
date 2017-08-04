import { Component, OnInit, OnChanges } from "@angular/core";
import { StatisticsService } from "../../../services/statistics.services"
import { StatisticsServiceOutputType } from "../../../models/services/statistics/statisticsserviceoutputType";
import { ActivatedRoute } from "@angular/router";
import { URLSearchParams  } from "@angular/http";

@Component({
    selector: "line-chart-history",
    templateUrl: "./line-chart-history.component.html"
})
export class LineChartHistory implements OnInit { 

  public myLine: StatisticsServiceOutputType;
  public lineChartData:Array<any>;

  public lineChartLabels:Array<String>;
  // ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 
  //'Junio', 'Julio', 'Agosto', 'Septiembre' , 'Octubre', 'Noviembre', 'Diciembre'];



  constructor(public statisticsService : StatisticsService, public activatedRoute: ActivatedRoute ) {}


  ngOnInit() : void{
     this.activatedRoute.data.forEach(( data: { 
                  lineChartsStatistics: StatisticsServiceOutputType })=>{
                  this.lineChartData   = data.lineChartsStatistics.lineChartData;
                  this.lineChartLabels = data.lineChartsStatistics.lineChartLabels;
     });
  }


  refresh(monthSelected?:any, alarmSelected?: any ): void{

    let params: URLSearchParams = new URLSearchParams();
    params.set('monthSelected', monthSelected.key);
    
    if( alarmSelected !== undefined)
      params.set('alarmaSelected', alarmSelected.key);
    
      this.statisticsService.getStadisticsResponse( params ).subscribe( 
                            (lineChartsStatistics: StatisticsServiceOutputType) =>
                             {this.lineChartData = lineChartsStatistics.lineChartData;  
                             this.lineChartLabels =  lineChartsStatistics.lineChartLabels;} );

  }
 
    public lineChartOptions:any = { responsive: true };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(28,132,198,0.2)',
      borderColor: '#1C84C6 ',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(35,198,200,0.2)',
      borderColor: '#23C6C8',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(26,179,148,0.2)',
      borderColor: '#1AB394',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = false;
  public lineChartType:string = 'line';
 
 
 // events
  public chartClicked(e:any):void {
    //console.log(e);
  }
 
  public chartHovered(e:any):void {
    //console.log(e);
  }
 

}