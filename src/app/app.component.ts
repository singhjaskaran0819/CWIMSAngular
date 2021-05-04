import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { BnNgIdleService } from 'bn-ng-idle';
import { Router } from '@angular/router';
import { ModalService } from './core/services/modal.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router, private authService: AuthService, private bnIdle: BnNgIdleService, private modalService: ModalService) { }

  isLoggedIn;

  ngOnInit(): void {

    this.bnIdle.startWatching(1800).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        // alert('session expired');
        // this.modalService.closeModal();

        var data = { "idleSystem": true }
        this.authService.logout(data).subscribe(res => {
          console.log(res)
          sessionStorage.clear();
          this.router.navigateByUrl("auth");
        });

      }
    });

    this.authService.isLoggedIn.subscribe((res) => {
      this.isLoggedIn = res;

    })
    if (window.location.href.includes('/otp')) {

    }
  }
}
