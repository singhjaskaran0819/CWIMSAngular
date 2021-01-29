import { EventEmitter, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { APIS } from '../../common/constants';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { Event, NavigationEnd, Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public currentUrl = new BehaviorSubject<string>(undefined);
  private accountSubject = new Subject<any>();

  constructor(private httpService: HttpService, private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  getHeaderDetails() {
    return this.httpService.getData(APIS.USER.USER_DETAILS);
  }

  accountUpdated() {
    this.accountSubject.next();
  }

  getAccountUpdates(): Observable<any> {
    return this.accountSubject.asObservable();
  }

}
