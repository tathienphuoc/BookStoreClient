import { Directive } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appIgnoreDirty]'
})
export class IgnoreDirtyDirective {

  constructor(private control: NgControl) {
    this.control.valueChanges.subscribe(v => {
        if (this.control.dirty) {
            this.control.control.markAsPristine();
        }
    });
}

}
