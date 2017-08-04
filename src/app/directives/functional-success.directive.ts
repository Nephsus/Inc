import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[functional-success]',
})
export class FunctionalSuccessDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}