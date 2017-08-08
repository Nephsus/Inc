
import { Observable } from "rxjs/Observable"
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { AfterViewInit, Component, Input, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import {Http, Response} from "@angular/http";
import { RequestWrapperService } from "../../../services/request-wrapper.services";
import { AlertPushHistoryOutputType } from '../../../models/services/push/AlertPushHistoryOutputType';
import { AlertHistPush } from '../../../models/services/push/AlertHistPush';
import { ClientService} from "../services/client.services";
import { environment } from '../../../../environments/environment';


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
            </div>

             <div class="row" >
             <div id='history-div'  style="width:100%; height:300px; overflow: auto;" #historydiv>
                <table class="table table-bordered table-hover dataTables-example dataTable" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" role="grid">
                            <thead>
                            <tr role="row">
                                <th class="sorting_asc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Rendering engine: activate to sort column descending" style="width: 40px; height: 30px">Secuencia</th>
                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Browser: activate to sort column ascending" style="width: 226px;">Destino</th>
                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Platform(s): activate to sort column ascending" >Leído</th>
                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Engine version: activate to sort column ascending" >F. Envío</th> 
                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Engine version: activate to sort column ascending" >F. Lectura</th>
                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Engine version: activate to sort column ascending" >Respuesta</th></tr>   
                             </thead>
                            <tbody>
                              <tr class="gradeA odd" *ngFor="let item of cache2; let i = index" 
                              (click)="selectedDevice(item, i)" [ngClass]="{'table-selected-row': i === highlightedRow}"
                              [style.height]="itemHeight + 'px'">
                                    <td style="width: 40px;">{{item.alevsecu}}</td>
                                    <td style="width: 120px;">{{item.destiny}}</td>
                                    <td >{{item.read}}</td>
                                    <td>{{item.sendDate}}</td>
                                    <td>{{item.readDate}}</td>
                                    <td>{{item.response}}</td>
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
            (click)="clickActionSeePush()"  ><i class="fa fa-eye"></i></a>
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
  private flatCache : any[] = []; 
  private pageByManual$ = new BehaviorSubject(1);
  private itemHeight = 40;
  private numberOfItems = 10; 
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

   //@Input() devicesRegistered : [DevicesRegistered];


  
  constructor(private _request: RequestWrapperService, private http: Http, private elementRef: ElementRef, private clientService : ClientService){ 
      
  } 

  /*selectedDevice( device : DevicesRegistered, i: number){
        this.highlightedRow = i;
        this.clientService.setSelectedDevice( device );
   }*/


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
       return Math.ceil((y + el.clientHeight)/ (this.itemHeight * this.numberOfItems));
    });


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
                                    `/alertPushHistory/getAlevHist/${this.codeUser}` +
                                    `${this.paginationKey}`;

      return this._request.get(pathComplete)
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

  public start(){
    
    this.itemResults$.subscribe( 
       res => { this.cache2 = this.cache2.concat(res);}
     );

  }


  public deleteRow( ){
    
    this.cache2.splice( this.highlightedRow,1);

    if((this.itemHeight * this.cache2.length + 50 ) < this.tracker.nativeElement.offsetHeight){
        if( this.paginationFlag )
	     this.start();		           
    }

  }

  clickActionSeePush( ){
        window.open('http://www.google.es','_blank');
       
   }


   launchSearchPush(){
        console.log("David Ini" + this.dateIni);
        console.log("David" + this.dateFin);


   }
  
}