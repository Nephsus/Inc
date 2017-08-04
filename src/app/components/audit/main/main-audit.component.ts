import { Component} from '@angular/core'


@Component({
    templateUrl: "./main-audit.component.html"
})
export class MainAudit {
//implements OnInit,OnDestroy{
   
  /*  private windowsToShow : number = 0;
 
    private subscription: Subscription;


    parentSubject:Subject<any> = new Subject();

   /* constructor( private clientService : ClientService ){
           
    }*/


   /* notifyChildren() {
        this.parentSubject.next('some value');
    }

    ngOnInit(){
        this.windowsToShow = 0;
        this.subscription = this.clientService.receiveAction$.subscribe( (action:number) => {
                this.loadwindowsToShow( action );
            });
    }

    loadwindowsToShow( action:number ){
        this.windowsToShow = action;

    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
  }

    restore(anything : any){
        this.windowsToShow = 0;
    }*/

} 