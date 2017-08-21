
import { Observable } from "rxjs/Observable"
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { AfterViewInit, Component, Input, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import {Http, Response} from "@angular/http";
import { RequestWrapperService } from "../../../services/request-wrapper.services";
import { AlertPushHistoryOutputType } from '../../../models/services/push/AlertPushHistoryOutputType';
import { AlertHistPush } from '../../../models/services/push/AlertHistPush';
import { ClientService} from "../services/client.services";
import { environment } from '../../../../environments/environment';
import { URLSearchParams } from '@angular/http';
import * as moment from 'moment';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/filter';  
import 'rxjs/add/operator/debounceTime'; 
import 'rxjs/add/operator/distinct'; 
import 'rxjs/add/observable/merge'; 
import 'rxjs/add/operator/do'; 
import 'rxjs/add/operator/mergeMap'; 
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';
import {flatMap} from "lodash";

@Component({
  selector: 'history-push-for-client',
  template: `
 
  <div class="wrapper wrapper-content animated fadeInRight">
    <div class="ibox float-e-margins ">
         <div class="ibox-title">
              <i class="fa fa-chevron-left btn" (click)="goBack()">Volver</i>
                      
              <div class="row" >
                  <div class="col-md-3 col-md-offset-2"></div>
                  <div class="col-md-3"><h5>Historial de Envíos</h5></div>
                  <div class="col-md-3"></div>
             </div>

             
         <div class="ibox-content">
            <div class="row">
                 <div class="col-md-5">
                            <small>Seleccione fecha de Inicio</small>
                            <ng2-datepicker [(ngModel)]="dateIni" [options]="datePickerOptions"></ng2-datepicker>
                           
                    </div>
                 <div class="col-md-5">
                            <small>Seleccione fecha de Fin</small>
                            <ng2-datepicker [(ngModel)]="dateFin" [options]="datePickerOptions" ></ng2-datepicker>
                           
                 </div>
                <div class="col-md-2">
                            <a class="btn btn-primary btn-rounded" style="margin-right: 1px;"  (click)="launchSearchPush()"  ><i class="fa fa-check"></i>Aceptar</a>    
                 </div>
                 <div *ngIf="valueError"><small> <font color="red">{{ valueErrorText }}</font></small></div>
            </div>

             <div class="row" >
             <div id='history-div'  style="width:100%; height:300px; overflow: auto;" #historydiv>
                <table class="table table-bordered table-hover dataTables-example dataTable" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" role="grid">
                            <thead>
                            <tr role="row">
                                <th class="sorting_asc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Engine version: activate to sort column ascending" >Canal</th>
                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Engine version: activate to sort column ascending" >Tipo</th>
                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Rendering engine: activate to sort column descending" style="width: 40px; height: 30px">Secuencia</th>
                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Browser: activate to sort column ascending" style="width: 226px;">Destino</th>
                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Platform(s): activate to sort column ascending" >Leído</th>
                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Engine version: activate to sort column ascending" >F. Envío</th> 
                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Engine version: activate to sort column ascending" >F. Lectura</th>   
                             </thead>
                            <tbody>
                              <tr class="gradeA odd" *ngFor="let item of cache2; let i = index" 
                              (click)="selectedAlarm(item, i)" [ngClass]="{'table-selected-row': i === highlightedRow}"
                              [style.height]="itemHeight + 'px'"
                              role="button">
                                    <td>{{item.channel}}</td>
                                    <td style="width: 300px;">{{item.type}}</td>
                                    <td style="width: 40px;">{{item.alevsecu}}</td>
                                    <td style="width: 120px;">{{item.destiny}}</td>
                                    <td >{{item.read}}</td>
                                    <td>{{item.sendDate}} - {{item.sendTime}}</td>
                                    <td>{{item.readDate}} - {{item.readTime}}</td>
                                   
                                </tr>
                                <tr *ngIf="showLoading == true" [style.height]="itemHeight + 'px'">
                                            <td><img src="assets/img/rolling.gif" /></td>
                                </tr>
                            </tbody>
</table>
   </div>
   <div class="container-fluid">
    <div class="row" >
        <a  class="btn btn-primary btn-rounded" 
            style="margin-right: 1px;" 
            (click)="clickActionSeePush()" [class.disabled]="disableDetailButton"  ><i class="fa fa-eye"></i></a>
    </div>
</div>
</div>
</div>
</div>
</div>`
})
export class HistoryPushForClient implements AfterViewInit {

  datePickerOptions ={
    format: "DD-MM-YYYY",
    autoApply: true,
    locale: 'es',
    firstWeekdaySunday: false
  }


  public cache : any[] = []; 
  public cache2 : AlertHistPush [] = []; 
  public alarmDevice : AlertHistPush;
  private flatCache : any[] = []; 
  private pageByManual$ = new BehaviorSubject(1);
  private itemHeight = 40;
  private numberOfItems = 10; 
  public disableDetailButton :boolean= true;
  @Input()
  public codeUser : string;

  @ViewChild("historydiv") tracker: ElementRef;

  private pageByScroll$ :Observable<number>;
  private pageByResize$ :Observable<number>;
  private pageToLoad$ :Observable<number>;
  public itemResults$ :Observable<AlertHistPush []>;

  public paginationKey :string = "";
  public lastPaginationKey :string ="!";
  public paginationFlag :boolean = true;

  public showLoading : boolean = false;

  @Input() activated: boolean = false;


  public dateIni : any;
  public dateFin : any;

   listActions : [string] = ["Vizualizar" ];

  loading = false;


  highlightedRow: number;

  public valueErrorText: string;
  public valueError: boolean = false;


  
  constructor(private _request: RequestWrapperService, private http: Http, private elementRef: ElementRef, private clientService : ClientService){ 
      
  } 

  selectedAlarm( alarm : AlertHistPush, i: number){
        this.highlightedRow = i;
        this.alarmDevice = alarm;
        this.disableDetailButton=false; 
   }


   @Output() clickGoBack = new EventEmitter();




   goBack() {
 
        this.clickGoBack.emit();
   }


  ngAfterViewInit(){

 //Selecciono la div que tiene el scroll
  //let el = this.elementRef.nativeElement.children[0];
  let el = this.tracker.nativeElement;

/* Propiedades
 https://developer.mozilla.org/es/docs/Web/API/Element/scrollTop,
 https://developer.mozilla.org/es/docs/Web/API/Element/scrollHeight,
 https://developer.mozilla.org/es/docs/Web/API/Element/clientHeight
*/ 

  this.pageByScroll$ = Observable.fromEvent(el, "scroll")
      .map(() => {return el.scrollHeight;})
      .filter((current:number) => {
           console.log("David Filter1: " + current + " " + el.clientHeight +" " + el.scrollTop );
           return (current <=  el.clientHeight + el.scrollTop )})
      .filter(_ =>  {
          return this.paginationFlag
        } )
      .distinct() 
      .map((y:number) => {
        //calculo la siguiente la página a recibir
       this.showLoading = true;
       //return Math.ceil((y + el.clientHeight)/ (this.itemHeight * this.numberOfItems));
        return this.paginationKey
    }).distinct().map(_ =>  2);


this.pageByResize$ = 
	Observable.fromEvent(window, "resize")
	.debounceTime(200) 
	.map(_ =>
     Math.ceil((window.innerHeight + document.body.scrollTop) / (this.itemHeight * this.numberOfItems))
                
    );

 this.pageToLoad$ = Observable
    .merge(this.pageByManual$, this.pageByScroll$);
    


this.itemResults$ = this.pageToLoad$
    .filter(_=> {
        console.log(this.lastPaginationKey);
        return this.lastPaginationKey !== this.paginationKey;})
    .do(_ => this.loading = true)
   
    .flatMap((page: number) => {
       let pathComplete = "";  
        
       
        pathComplete = environment.baseUrl + 
                                environment.intermediateUrl + 
                                    `/alertPushHistory/getAlevHist/${this.clientService.getUser().getPersNumb()}` +
                                    `${this.paginationKey}`;


        let params: URLSearchParams = undefined;
         if( this.dateIni && this.dateFin ){
                params = new URLSearchParams();
                params.set('dateIni', this.dateIni.formatted);
                params.set('dateFin', this.dateFin.formatted);
          }


      return this._request.get(pathComplete,params)
          .map( response => this.extractData(response) )
          .catch(resp =>{
              this.showLoading = false;
              return Observable.throw("Se ha producido un error:" + resp.status);
          })
      		.do(resp => {
                  this.showLoading = false;
                  this.cache[this.cache.length] = resp;
          })
    })
    .map(resp => { 
       this.showLoading = false;
       return flatMap(resp);
    })

    this.start();
     
  }


private extractData(res: any) {
    let body = res;
    
    if( body.headerData  && (body.headerData.pagination.paginationFlag ==="true" || body.headerData.pagination.paginationFlag ===true) ) {
      this.lastPaginationKey = this.paginationKey;
      this.paginationKey = `/${body.headerData.pagination.paginationKey}`;
      this.paginationFlag = true;
    } else{
        this.paginationFlag = false;
    }

    
    return AlertPushHistoryOutputType.fromJson(body.alertPushHistoryOutputType).alertHistPush || {};
  }

  


  

  clickActionSeePush( ){
        window.open(this.alarmDevice.url,'_blank');
       
   }


   launchSearchPush(){
    this.initialize();
   
  
    if(this.dateIni && this.dateIni.formatted  && !moment(this.dateIni.formatted, 'DD-MM-YYYY',true).isValid() ){
        this.valueError = true;
        this.valueErrorText="(*)Fecha Inicio Incorrecta"
        return;


    }else if(this.dateIni && this.dateIni.formatted  && moment(this.dateIni.formatted, 'DD-MM-YYYY',true).isValid() ){
        if(!this.dateFin || !this.dateFin.formatted){
          this.valueError = true;
          this.valueErrorText="(*)Seleccione Fecha Fin."
          return;
        }
    }


    if(this.dateFin && this.dateFin.formatted  && !moment(this.dateFin.formatted, 'DD-MM-YYYY',true).isValid() ){
        this.valueError = true;
        this.valueErrorText="(*)Fecha Fin Incorrecta."
        return;


    }else if(this.dateFin && this.dateFin.formatted  && moment(this.dateFin.formatted, 'DD-MM-YYYY',true).isValid() ){
        if(!this.dateIni || !this.dateIni.formatted ){
          this.valueError = true;
          this.valueErrorText="(*)Seleccione Fecha Inicio."
          return;
        }
    }


    if( this.dateIni && this.dateFin ){
     if( moment(this.dateFin.formatted, 'DD-MM-YYYY').isBefore(moment(this.dateIni.formatted, 'DD-MM-YYYY')) ){
      this.valueError = true;
      this.valueErrorText="(*)Fecha Fin no puede ser mayor que la fecha Inicio.";
      return; 
     }
    }

      this.valueError = false;

      if( Math.floor(moment( this.dateFin ).diff(moment(this.dateIni),'years',true)) > 1 ){

        this.valueError = true;
        this.valueErrorText="(*)El intervalo de fechas no puede ser superior a un año.";
        return; 

      }








        this.start();

   }


   public start(){
    this.initialize();

    this.itemResults$.subscribe( 
       res => { this.cache2 = this.cache2.concat(res);}
     );

  }


  

  initialize(){

    this.cache2 = [];
    this.paginationKey = "";
    this.paginationFlag = false;
    this.lastPaginationKey  ="!";
    this.disableDetailButton= true;
   
  }
  
}