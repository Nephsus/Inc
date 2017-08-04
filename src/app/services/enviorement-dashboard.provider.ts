import { Injectable, ViewChild   } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject }    from 'rxjs/Subject';
import { Http, Response  } from "@angular/http";
import { Device } from "../models/services/enviorements/device";
import { User } from "../models/services/enviorements/user";
import { Employee } from "../models/services/enviorements/employee";
import { ErrorData } from "../models/services/generics/errordata";
import { SuccessData } from "../models/services/generics/successdata";
import { EmployeeService } from "./employee.services";




@Injectable()
export class EnviorementDashboardProvider{

    private selectedDevice :  Device;
    private selectedUser :  User;
    private employeeLogIn : Employee;


    public technicalError : ErrorData;
    public successData : SuccessData;

    // Observables
     public receiveErrorAction = new Subject<ErrorData>();
    // Observables
     public receiveSuccessAction = new Subject<SuccessData>();
     public receiveCloseAction = new Subject<void>();

     receiveErrorAction$ = this.receiveErrorAction.asObservable();
     receiveSuccessAction$ = this.receiveSuccessAction.asObservable();
     receiveCloseAction$ = this.receiveCloseAction.asObservable();
    

     

}
