import { APIS } from './../../common/constants';
import { LoaderService } from '../services/loader.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastMessageService } from '../../core/services/toast-message.service';
import { SpinnerService } from 'src/app/common/spinner/spinner.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    private requests: HttpRequest<any>[] = [];
    requestCount = 0;
    constructor(
        public router: Router,
        public authService: AuthService,
        public toastrService: ToastMessageService,
        private spinner: SpinnerService
    ) { }

    /** Request interceptor **/
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // LoaderService.showLoader();
        this.spinner.showSpinner();
        // Clone the request to add the new header.
        const token = sessionStorage.getItem("token");
        if (token) {
            req = req.clone({
                headers: req.headers.set("authorization", token)
            });
        }
        return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                if (
                    !event.url.includes(APIS.WAREHOUSE.WAREHOUSE_LIST) &&
                    !event.url.includes(APIS.WAREHOUSE.FETCH_WAREHOUSE_BY_CODE) &&
                    !event.url.includes(APIS.WAREHOUSE.SEARCH_WAREHOUSE) &&
                    !event.url.includes(APIS.USER.USER_DETAILS) &&
                    !event.url.includes(APIS.WAREHOUSE.FILTERS) &&
                    // !event.url.includes(APIS.USER.GET_PERMISSIONS) &&
                    event.url.includes(APIS.AUTH.FORGOT_PASSWORD)
                ) {
                    const message = event.body.msg;
                    this.toastrService.showSuccess(message);
                }
                // LoaderService.hideLoader();
                this.spinner.HideSpinner();
            }
        },
            async (err: any) => {
                // LoaderService.hideLoader();
                this.spinner.HideSpinner();
                if (err) {
                    const status = err.error.statusCode;
                    const message = err.error.msg;
                    if (status === 401) {
                        this.toastrService.showError(message);
                        sessionStorage.clear();
                        this.router.navigateByUrl('auth')
                    } else {
                        this.toastrService.showError(message);
                    }
                }
            }));
    }
}