import { Injectable } from "@angular/core";
import {NgxSpinnerService} from 'ngx-spinner'
@Injectable({
    providedIn:'root'
})
export class SpinnerService{
    constructor(
        private spinner:NgxSpinnerService 
    ){}

    showSpinner(){
        this.spinner.show(undefined,
            {
              type: 'square-jelly-box',
              size: 'medium',
              bdColor: 'rgba(12, 11, 11, 0.849)',
              color: 'white',
              fullScreen: true
            }
          );
    }

    HideSpinner(){
        this.spinner.hide();
    }
}