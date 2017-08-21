import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { MainClient } from "./components/clients/main/main-client.component"
/*import { ClientList } from "./components/clients/widgets/client-list.component";*/
import { TechnicalError } from "./components/common/technical-error.component"

import { MainStatistics } from "./components/statistics/main/main-statistics.component";
import { StatisticsResolve} from "./services/statistics-resolve.service";
import { MainAudit } from "./components/audit/main/main-audit.component";
import { MainSandBox } from "./components/sandbox/main/main-sandbox.component";

const routes: Routes = [{
    path: "",
    component: MainStatistics,
    resolve:{
          lineChartsStatistics: StatisticsResolve
    }
},{ 
    path: "MainClient",
    component: MainClient
},{ 
    path: "MainAudit",
    component: MainAudit
},{ 
    path: "MainSandBox",
    component: MainSandBox
},{ 
    path: "technicalError",
    component: TechnicalError
},{ 
    path: "**",
    component: MainStatistics,
    resolve:{
          lineChartsStatistics: StatisticsResolve
    }
}];

@NgModule({
     imports: [ RouterModule.forRoot(routes, { useHash: true })],
     exports: [ RouterModule ]

})
export class AppRoutingModule{}