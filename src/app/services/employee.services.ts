import { Injectable  } from "@angular/core";
import { Http, Response  } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { RequestWrapperService } from "./request-wrapper.services"
import { Employee } from "../models/services/enviorements/employee"
import { environment } from '../../environments/environment';

@Injectable()
export class EmployeeService {

private employeeLogIn : Employee;

constructor(private _request: RequestWrapperService){}

 getEmployee(): Observable<Employee>{
        return  this._request.get(environment.baseUrl + environment.intermediateUrl + '/enviorementdash/getEmployeeResponse')
                    .map( response =>  Employee.fromJson(response));

      
    }

 setEmployee(employee : Employee){
       this.employeeLogIn = employee;
    }

    
}
