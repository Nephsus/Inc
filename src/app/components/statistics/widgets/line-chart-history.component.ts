import { Component, OnInit, OnChanges, Output, EventEmitter,ViewChild } from "@angular/core";
import { StatisticsService } from "../../../services/statistics.services"
import { StatisticsServiceOutputType } from "../../../models/services/statistics/statisticsserviceoutputType";
import { CurrentMonth } from "../../../models/services/statistics/CurrentMonth";
import { ActivatedRoute } from "@angular/router";
import { URLSearchParams  } from "@angular/http";
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

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


  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
 
  public listSenders: CurrentMonth;



  @Output()
  private refreshList : EventEmitter<CurrentMonth> =  new EventEmitter(); 

  constructor(public statisticsService : StatisticsService, public activatedRoute: ActivatedRoute ) {}


  ngOnInit() : void{
     this.activatedRoute.data.forEach(( data: { 
                  lineChartsStatistics: StatisticsServiceOutputType })=>{
                  this.lineChartData   = data.lineChartsStatistics.lineChartData;
                  this.lineChartLabels = data.lineChartsStatistics.lineChartLabels;
                  this.listSenders =  data.lineChartsStatistics.currentMonth;
                  this.refreshList.emit( this.listSenders );
     });
  }

  ngAfterViewInit() {
    
    
  

  }


  refresh(dateIni:any, dateFin:any, monthSelected?:any, alarmSelected?: any ): void{

    let params: URLSearchParams = new URLSearchParams();
    
    
    if( dateIni && dateFin ){
      params.set('dateIni', dateIni.formatted);
     params.set('dateFin', dateFin.formatted);
   }
   // params.set('monthSelected', monthSelected.key);
    
    if( alarmSelected !== undefined)
      params.set('alarmaSelected', alarmSelected.key);
    
      this.statisticsService.getStadisticsResponse( params ).subscribe( 
                            (lineChartsStatistics: StatisticsServiceOutputType) =>
                             {this.lineChartData = lineChartsStatistics.lineChartData; 
                              this.lineChartLabels = lineChartsStatistics.lineChartLabels; 
                               this.chart.chart.config.data.labels = this.lineChartLabels;
                              this.chart.chart.update();
                            } );

  }
 
  public lineChartOptions:any = { responsive: true };
  public lineChartColors:Array<any> = [
    { 
      backgroundColor: 'rgba(28,132,198,0.2)',
      borderColor: '#1C84C6 ',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { 
      backgroundColor: 'rgba(35,198,200,0.2)',
      borderColor: '#23C6C8',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { 
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