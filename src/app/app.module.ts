import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { ToastrModule } from 'ngx-toastr';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { HttpRequestInterceptor } from './core/interceptors/http-request.interceptor';
//modules
import { MainModule } from './modules/main/main.module';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './modules/shared/shared.module';

//components
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';

// services
import { HttpService } from './core/services/http.service';
import { LoaderService } from './core/services/loader.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
// import { NgxCaptchaModule } from 'ngx-captcha';
import { SpinnerComponent } from './common/spinner/spinner.component';
import { BnNgIdleService } from 'bn-ng-idle';
import { ComingSoonComponent } from './common/coming-soon/coming-soon.component';
import { MainComponent } from './modules/main/main.component';


// import { ApprovalStatusPipe } from './core/pipes/approval-status.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    SpinnerComponent,
    ComingSoonComponent

    // ApprovalStatusPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule,
    AuthModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    NgxIntlTelInputModule,
    BsDropdownModule,
    BrowserAnimationsModule,
    NgbModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      maxOpened: 6
    }),
    // NgxCaptchaModule,
    NgxSpinnerModule
  ],
  providers: [
    BnNgIdleService,
    HttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
