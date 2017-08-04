import { Component, AfterViewInit,  OnInit, OnDestroy, ComponentFactoryResolver, ViewChild, ViewContainerRef } from "@angular/core";

import { EnviorementDashboardProvider } from "./services/enviorement-dashboard.provider";
import { EmployeeService } from "./services/employee.services";
import { SuccessData } from "./models/services/generics/successdata";
import { Subscription } from 'rxjs/Subscription';
import { ModalOperation } from "./components/common/modal-operation.component";
import { FunctionalSuccessDirective } from "./directives/functional-success.directive";
import { Employee } from "./models/services/enviorements/employee";


//let loadJquery = <any>require('../assets/js/inspinia.js');



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{

  private subscriptionSuccess: Subscription;  
 private subscriptionClose: Subscription;  

 private modalComponent: ModalOperation;
 private viewContainerRef: ViewContainerRef;


 public employee : Employee;

 @ViewChild(FunctionalSuccessDirective) directiveModal: FunctionalSuccessDirective;

 constructor(private _componentFactoryResolver: ComponentFactoryResolver,
             public _enviorementDashboard : EnviorementDashboardProvider,
             public _employeeService : EmployeeService){

 }

ngOnInit(){

 this.subscriptionSuccess = this._enviorementDashboard.receiveSuccessAction.subscribe( ( successdata : SuccessData ) =>{
                     let componentFactory = this._componentFactoryResolver.resolveComponentFactory(ModalOperation);
                     this.viewContainerRef = this.directiveModal.viewContainerRef;
                     this.viewContainerRef.clear();
                     let component = this.viewContainerRef.createComponent(componentFactory);
                     this.modalComponent =  (<ModalOperation>component.instance); //Casting a saco paco
                     this.modalComponent.successdata = successdata;
  } );

this.subscriptionClose = this._enviorementDashboard.receiveCloseAction.subscribe( () =>{
                 this.viewContainerRef.clear(); 
    });
                
  this._employeeService.getEmployee().subscribe(response => this.employee = response );              

}

ngAfterViewInit() {
     //loadJquery.alreadyDom();

     System.import('../assets/js/inspinia.js').then(file => {
   file.alreadyDom();
});
  }
}
