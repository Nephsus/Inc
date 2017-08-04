import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LineChartHistory } from "./components/statistics/widgets/line-chart-history.component"
import { ClientSearch } from "./components/clients/widgets/client-search.component"
import { ClientList } from "./components/clients/widgets/client-list.component"
import { ClientListActions } from "./components/clients/widgets/client-list-actions.component"
import { ClientService } from "./components/clients/services/client.services"
import { SendPush } from "./components/clients/widgets/send-push.component";
import { AddDevice } from "./components/clients/widgets/add-device.component";
import { MainClient } from "./components/clients/main/main-client.component"
import { MainClientSearch } from "./components/clients/widgets/main-client-search.component"
import { HeaderNavBar } from "./components/common/header-nav-bar.component"
import { MainStatistics } from "./components/statistics/main/main-statistics.component"
import { ChartsModule } from "ng2-charts/ng2-charts";
import { StatisticsService } from "./services/statistics.services";
import { StatisticsResolve } from "./services/statistics-resolve.service";
import { DevicesAvailableService }  from "./services/devices-available.services";
import { ClientListEvents } from "./components/clients/widgets/client-list-events.component";
import { EnviorementDashboardProvider } from "./services/enviorement-dashboard.provider";
import { RequestWrapperService } from "./services/request-wrapper.services";
import { InfiniteScrollListComponent } from "./components/clients/widgets/infinite-scroll.component";
import { HistoryPushForClient } from "./components/clients/widgets/history-push-for-client.component";
import { TechnicalError } from "./components/common/technical-error.component";
import { FunctionalErrorDirective } from "./directives/functional-error.directive";
import { FunctionalSuccessDirective } from "./directives/functional-success.directive";
import { ModalOperation } from "./components/common/modal-operation.component";
import { MainAudit } from "./components/audit/main/main-audit.component";
import { ListEventsAudit } from "./components/audit/widgets/list-events-audit.component";
import { EmployeeService } from "./services/employee.services";
import { DatePickerModule } from 'ng2-datepicker';



@NgModule({
    imports: [
        BrowserModule,ChartsModule,HttpModule,AppRoutingModule,FormsModule,DatePickerModule
    ],
    declarations: [
        AppComponent,LineChartHistory,
        MainStatistics,ClientList,ClientSearch,
        MainClient,ClientListActions,ClientListEvents,InfiniteScrollListComponent,
        FunctionalErrorDirective,MainClientSearch,SendPush,
        FunctionalSuccessDirective,HeaderNavBar,MainAudit,ListEventsAudit,ModalOperation,TechnicalError,
        AddDevice,HistoryPushForClient
    ],
    entryComponents: [  ModalOperation  ],
    providers: [ RequestWrapperService, StatisticsService,StatisticsResolve, 
                 DevicesAvailableService, EnviorementDashboardProvider, ClientService, EmployeeService],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {  }
