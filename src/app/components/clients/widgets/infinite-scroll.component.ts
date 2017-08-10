
import { Observable } from "rxjs/Observable"
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { AfterViewInit, Component, Input, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import {Http, Response} from "@angular/http";
import { RequestWrapperService } from "../../../services/request-wrapper.services";
import { RegisteredDevicesOutputType } from "../../../models/services/devices/RegisteredDevicesOutputType";
import { DevicesRegistered } from '../../../models/services/devices/RegisteredDevicesOutputType';
import { ClientService} from "../services/client.services";
import { environment } from '../../../../environments/environment';
import { EnviorementDashboardProvider } from "../../../services/enviorement-dashboard.provider";
import { ResultData } from "../../../models/services/generics/ResultData";
import { ResultDataType } from "../../../models/services/generics/ResultDataType";
import { DevicesAvailableService } from '../../../services/devices-available.services';


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
import { Subscription } from 'rxjs/Subscription';
import {flatMap} from "lodash";

@Component({
  selector: 'infinite-scroll-list',
  template: `<p *ngIf="this.clientService.getUser()">Usuario encontrado con nombre {{this.clientService.getUser().getName()}} {{this.clientService.getUser().getLastName()}}  
                </p>
                <div id='infinite-div'  style="width:100%; height:300px; overflow: auto;" #infinitediv>
<table class="table table-bordered table-hover dataTables-example dataTable" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" role="grid">
                            <thead>
                            <tr role="row">
                                <th class="sorting_asc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Rendering engine: activate to sort column descending" style="width: 181px; height: 50px">Tipo de Dispositivo</th>
                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Browser: activate to sort column ascending" style="width: 226px;">Plataforma</th>
                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Platform(s): activate to sort column ascending" style="width: 204px;">Fecha Alta</th>
                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Engine version: activate to sort column ascending" style="width: 154px;">Fecha Última Comprobación</th></tr>   
                             </thead>
                            <tbody>
                              <tr class="gradeA odd" *ngFor="let item of cache2; let i = index" 
                              (click)="selectedDevice( i)" [ngClass]="{'table-selected-row': i === highlightedRow}"
                              [style.height]="itemHeight + 'px'"
                              role="button">
                                    <td style="width: 254px;">{{item.deviceType}}</td>
                                    <td style="width: 318px;">{{item.platform}}</td>
                                    <td style="width: 287px;"> {{item.dischargeDate}}</td>
                                    <td>{{item.lastCheckDate}}</td>
                                </tr>
                                <tr *ngIf="showLoading == true" [style.height]="itemHeight + 'px'">
                                            <td><img src="assets/img/rolling.gif" /></td>
                                </tr>
                            </tbody>
</table>
   </div>
   <div class="container-fluid">
    <div class="row" >
            <a class="btn btn-primary btn-rounded"  data-toggle="tooltip" data-placement="bottom" title="Vizualizar"
            style="margin-right: 5px;" [class.disabled]="disableOneButton"
            (click)="clickAction( 1 )"  ><i class="fa fa-eye"></i> </a>

            <a class="btn btn-primary btn-rounded" data-toggle="tooltip" data-placement="bottom" title="Enviar Push"
            style="margin-right: 5px;"  [class.disabled]="disableThirdButton"
            (click)="clickAction( 3 )"  ><i class="fa fa-send"></i> </a>

            <a class="btn btn-primary btn-rounded" data-toggle="tooltip" data-placement="bottom" title="Añadir Dispositivo"
            style="margin-right: 5px;"  [class.disabled]="disableFourButton"
            (click)="clickAction( 4 )"  ><i class="fa fa-plus"></i> </a>

             <a class="btn btn-primary btn-rounded" data-toggle="tooltip" data-placement="bottom" title="Eliminar Dispositivo"
            style="margin-right: 5px;"  [class.disabled]="disableSecondButton"
            (click)="clickAction( 2 )"  ><i class="fa fa-minus"></i> </a>

            <a class="btn btn-primary btn-rounded" data-toggle="tooltip" data-placement="bottom" title="Historial Envíos Push"
            style="margin-right: 5px;" [class.disabled]="disableFiveButton"
            (click)="clickAction( 5 )"  ><i class="fa fa-book"></i> </a>

    </div>
</div>`
})
export class InfiniteScrollListComponent implements AfterViewInit,OnDestroy {
  public cache : any[] = []; 
  public cache2 : DevicesRegistered [] = []; 
  private flatCache : any[] = []; 
  private pageByManual$ = new BehaviorSubject(1);
  private itemHeight = 40;
  private numberOfItems = 10; 
  
  //@Input()
  public codeUser : string;

  @ViewChild("infinitediv") tracker: ElementRef;

  private pageByScroll$ :Observable<number>;
  private pageByResize$ :Observable<number>;
  private pageToLoad$ :Observable<number>;
  public itemResults$ :Observable<DevicesRegistered []>;

  public paginationKey :string = "";
  public lastPaginationKey :string ="!";
  public paginationFlag :boolean = true;

  public showLoading : boolean = false;
  public devicesResponse : RegisteredDevicesOutputType;


  public disableOneButton : boolean = true;
  public disableSecondButton : boolean = true;
  public disableThirdButton : boolean = true;
  public disableFourButton : boolean = true;
  public disableFiveButton : boolean = true;

 private subscriptionOkButton: Subscription;  

   listActions : [string] = ["Vizualizar" , "Eliminar", "Envío Manual", "Añadir Dispositivo" , "Consultar Historial" ];

  loading = false;


  highlightedRow: number;

   @Input() devicesRegistered : [DevicesRegistered];


  
  constructor(private _request: RequestWrapperService, private http: Http, 
              private elementRef: ElementRef, public clientService : ClientService,
             private _enviorementDashboard : EnviorementDashboardProvider,
              private devicesAvailableService : DevicesAvailableService
            ){ 
      
  } 

  selectedDevice( i: number){
        this.highlightedRow = i;
        this.clientService.setSelectedDevice( this.cache2[ i ] );

        this.disableOneButton  = false;
        this.disableSecondButton  = false;
        this.disableThirdButton = false;
        this.disableFourButton  = false;
        this.disableFiveButton  = false;
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
          //console.log("David Filter2:" + this.paginationFlag )
          return this.paginationFlag
        } )
      //.debounceTime(200) 
      .distinct() 
      .map((y:number) => {
        //calculo la siguiente la página a recibir
       this.showLoading = true;
       console.log("Entro y:" + y );
       return Math.ceil((y + el.clientHeight)/ (this.itemHeight * this.numberOfItems));
      
    });


this.pageByResize$ = 
	Observable.fromEvent(window, "resize")
	.debounceTime(200) 
	.map(_ =>
     Math.ceil((window.innerHeight + document.body.scrollTop) / (this.itemHeight * this.numberOfItems))
                
    );

 this.pageToLoad$ = Observable
    //.merge(this.pageByManual$, this.pageByScroll$, this.pageByResize$)
    .merge(this.pageByManual$, this.pageByScroll$);
    //.distinct(); 
    //.filter(page => this.cache[page-1] === undefined); 


this.itemResults$ = this.pageToLoad$
    .filter(_=> {
        console.log(this.lastPaginationKey);
        return this.lastPaginationKey !== this.paginationKey;})
    .do(_ => this.loading = true)
    //.debounceTime(100)
    .flatMap((page: number) => {
      //return this.http.get(`https://swapi.co/api/people?page=${page}`)
      //ponemos el wrapperwebservice
      //return this.http.get('http://localhost:3005/services/registereddevices/getDevices')
       let pathComplete = "";
    //  if( this.codeUser !== undefined )
   
        console.log("llamando a ws con pagination key" + this.paginationKey);
        pathComplete = environment.baseUrl + 
                                environment.intermediateUrl + 
                                    `/registereddevices/getDevices/${this.codeUser}` +
                                    `${this.paginationKey}`;
     /* else
       pathComplete = environment.baseUrl + 
                                environment.intermediateUrl + 
                                    `/registereddevices/getDevices` +
                                    `${this.paginationKey}`;
*/

      return this._request.get(pathComplete)
          .map( response => this.extractData(response) )
          .catch(resp =>{
              this.showLoading = false;
              return Observable.throw("Se ha producido un error:" + resp.status);
          })
      		.do(resp => {
                  this.showLoading = false;
                  this.cache[this.cache.length] = resp;
				         /* this.cache[page -1] = resp;
				          if((this.itemHeight * this.numberOfItems * page) < window.innerHeight){
					            this.pageByManual$.next(page + 1);
			            	}*/
          })
    })
    .map(resp => { 
       this.showLoading = false;


      // this.flatCache = flatMap(this.cache);
       //  this.flatCache = RegisteredDevicesOutputType.createArrayDevices(flatMap(this.cache));
       // return  RegisteredDevicesOutputType.createArrayDevices(flatMap(this.cache));   

       //return flatMap(this.cache)
       return flatMap(resp);
    })

    //this.start();
     
  }





//private extractData(res: Response) {
private extractData(res: any) {
    //let body = res.json();
    let body = res;
    

     if (body.headerData && body.headerData.errorData){
        let rel = new ResultData( ResultDataType.Error, "Error", body.headerData.errorData.errorText, "", "Close");

        this._enviorementDashboard.receiveSuccessAction.next( rel );
        return {};
     }

      

    if( body.headerData  && (body.headerData.pagination.paginationFlag ==="true" || body.headerData.pagination.paginationFlag ===true) ) {
      this.lastPaginationKey = this.paginationKey;
      this.paginationKey = `/${body.headerData.pagination.paginationKey}`;
      this.paginationFlag = true;
    } else{
        this.paginationFlag = false;
    }

   
    if(body.registeredDevicesOutputType && body.registeredDevicesOutputType.user ){
        this.clientService.setUser( RegisteredDevicesOutputType.createUserfromJson (body.registeredDevicesOutputType.user ) );
        this.disableFourButton = false;
    }
    return RegisteredDevicesOutputType.createArrayDevices(body.registeredDevicesOutputType) || {};
  }

 


  public start(){
    this.initialize();

    this.itemResults$.subscribe( 
       res => { this.cache2 = this.cache2.concat(res);}
     );

  }


  public deleteRow( ){


   this._enviorementDashboard.receiveSuccessAction.next( new ResultData( ResultDataType.Information, "Atención", "Va a Eliminar un dispositivo de un usuario. ¿Desea Continuar?", "Sí", "No") );

   

    this.subscriptionOkButton = this._enviorementDashboard.receiveSuccessAction.subscribe( () =>{
               this.subscriptionOkButton.unsubscribe();
               this.devicesAvailableService.deleteUserDevice(this.clientService.getUser().getCode(),
                        this.clientService.getSelectedDevice().getDeviceType() ).subscribe( resp => {
                            console.error("davvvv" + resp);

                              if (resp.headerData && resp.headerData.errorData && (resp.headerData.errorData.errorFlag === true)){
                                               this._enviorementDashboard.receiveSuccessAction.next(new ResultData( ResultDataType.Error, "Error", resp.headerData.errorData.errorText, "", "Close"));
                                        }
                              else{
                                            this._enviorementDashboard.receiveSuccessAction.next( new ResultData( ResultDataType.Success, "OK", "Dispositivo Borrado Correctamente", "", "Close") );
                                   
                                             this.cache2.splice( this.highlightedRow,1);  
                                                if((this.itemHeight * this.cache2.length + 50 ) < this.tracker.nativeElement.offsetHeight){
                                                     if( this.paginationFlag )
	                                                      this.start();	
                                        }
                                }               	           
    } ); 
    });

    

  }

  initialize(){

    this.cache2 = [];
    this.paginationKey = "";
    this.paginationFlag = false;
    this.lastPaginationKey  ="!";

    this.clientService.setUser(null);

  }


  clickAction( index: number ){
   if( index === 2){
        this.deleteRow( );
    }else{
        this.clientService.receiveActionEvent( index );

    }
   }
  ngOnDestroy() {
    if( this.subscriptionOkButton )
        this.subscriptionOkButton.unsubscribe();

}
  
}