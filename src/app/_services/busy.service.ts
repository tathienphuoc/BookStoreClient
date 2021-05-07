import { Injectable } from '@angular/core';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { AtomSpinnerModule } from 'angular-epic-spinners';
import { AtomSpinnerComponent } from 'angular-epic-spinners/src/app/atom-spinner/atom-spinner.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestCount = 0;

  constructor(private spinnerService: NgxSpinnerService) { }

  busy() {
    this.busyRequestCount++;
    this.spinnerService.show(undefined, {
      bdColor:"rgba(0, 0, 0, 0.8)",
      size:"medium",
      color:"#fff",
      type:"ball-running-dots"
    });
  }

  idle() {
    setTimeout(() => {
      this.busyRequestCount--;
      if (this.busyRequestCount <= 0) {
        this.busyRequestCount = 0;
        this.spinnerService.hide();
      }
    }, 500);
  }
}
