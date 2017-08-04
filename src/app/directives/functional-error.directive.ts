import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[functional-error]',
})
export class FunctionalErrorDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}